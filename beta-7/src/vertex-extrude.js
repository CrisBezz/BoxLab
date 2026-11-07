import * as THREE from 'three';
import {buildVertexExtrude} from './vertex-extrude-core.js?v=0.36.18.752';

// One gesture owner, before canvas navigation/selection. Reuses rendered Vertex
// picking, loose topology, selection bridge, history and contextual Vertex panel.
const canvas=document.querySelector('#viewport'),status=document.querySelector('#selectionStatus');
const button=document.createElement('button');button.id='vertexExtrudeBtn';button.type='button';button.textContent='Extrude';
const row=document.createElement('div');row.className='outliner-actions';row.appendChild(button);
document.querySelector('[data-mode-tools="vertex"]')?.appendChild(row);
const state=()=>globalThis.__boxlabBridgeState,bridge=()=>globalThis.__boxlabSelectionBridge;
const selected=()=>bridge()?.mode?.()==='vertex'?[...new Set(bridge()?.indices?.()||[])]:[];
const editable=()=>!document.querySelector('#app')?.classList.contains('boxlab-active-locked');
let armed=false,drag=null,direction='free',last=null,repeat=false;
const touches=new Set();
const axis=a=>new THREE.Vector3(a==='x'?1:0,a==='y'?1:0,a==='z'?1:0);
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function restore(m,s){
  m.vertices=s.vertices.map(v=>v.clone());m.faces=s.faces.map(f=>[...f]);m.faceGroups=[...(s.faceGroups||[])];
  m.creases=new Map(s.creases||[]);m.looseEdges=new Set(s.looseEdges||[]);m.looseVertices=new Set(s.looseVertices||[]);m.edges?.();
}
function validContext(d){return state()?.mesh===d.mesh&&globalThis.__boxlabObjectManager?.activeId===d.object&&bridge()?.mode?.()==='vertex'&&editable();}
function notify(){window.dispatchEvent(new CustomEvent('boxlab-vertex-extrude-state'));}
function sync(){button.disabled=!armed&&(!editable()||bridge()?.mode?.()!=='vertex'||!selected().length);button.classList.toggle('active',armed);}
function available(){const m=state()?.mesh;return editable()&&bridge()?.mode?.()==='vertex'&&!!m?.addLooseVertex&&!!globalThis.__boxlabHistory&&selected().length>0&&selected().every(i=>Number.isInteger(i)&&!!m.vertices[i]);}
function disarm(){
  if(drag)cancelDrag();
  armed=false;repeat=false;sync();notify();return true;
}
function arm(){
  if(!available())return false;
  globalThis.__boxlabAddVertex?.stop?.(false);globalThis.__boxlabBuildEdge?.disarm?.();
  globalThis.__boxlabDirectVertexBevel?.disarm?.();globalThis.__boxlabVertexSlidePolish?.disarm?.({cancelDrag:true});
  globalThis.__boxlabTransformArming?.disarm?.();
  document.dispatchEvent(new CustomEvent('boxlab-direct-tool-exclusive',{detail:{tool:'vertex-extrude'}}));
  armed=true;repeat=false;sync();notify();return true;
}
function commit(before,result,m=state()?.mesh){
  if(!result.ok||!globalThis.__boxlabHistory)return result;
  // Build and validate privately; history changes only on a successful commit.
  restore(m,result.mesh);globalThis.__boxlabHistory.push(before);
  last=result.delta.clone();repeat=false;
  bridge()?.set?.('vertex',result.tips);render();globalThis.__boxlabObjectManager?.saveActive?.();
  if(status)status.textContent=`Vertex Extrude • ${result.tips.length} new edge${result.tips.length===1?'':'s'} • tips selected • drag again`;
  sync();notify();return result;
}
function exactVector(value){
  const n=Number(value);if(!Number.isFinite(n))return null;
  if(direction!=='free')return axis(direction).multiplyScalar(n);
  const dir=last?.clone()?.normalize()||new THREE.Vector3(0,1,0).applyQuaternion(state()?.camera?.quaternion||new THREE.Quaternion());
  return dir.multiplyScalar(n);
}
function apply(value){
  if(!armed||drag||!available())return {ok:false,reason:'Select vertices and release the drag first'};
  const before=state().mesh.clone(),delta=exactVector(value);
  const result=buildVertexExtrude(before,selected(),delta);
  return result.ok?commit(before,result):result;
}
function screen(v){const p=v.clone().project(state().camera),r=canvas.getBoundingClientRect();return new THREE.Vector2(r.left+(p.x*.5+.5)*r.width,r.top+(-p.y*.5+.5)*r.height);}
function planePoint(e,plane){
  const r=canvas.getBoundingClientRect(),ray=new THREE.Raycaster(),p=new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height*2-1)),out=new THREE.Vector3();
  ray.setFromCamera(p,state().camera);return ray.ray.intersectPlane(plane,out)?out:null;
}
function consume(e){e.preventDefault();e.stopImmediatePropagation();}
function release(d){try{canvas.releasePointerCapture?.(d.pointerId);}catch{}if(d.controls)d.controls.enabled=d.controlsEnabled;}
function cancelDrag(){
  if(!drag)return;const d=drag;drag=null;
  restore(d.mesh,d.before);release(d);
  if(state()?.mesh===d.mesh){bridge()?.set?.('vertex',d.previous);render();}
  notify();
}
document.addEventListener('pointerdown',e=>{
  if(e.pointerType==='touch'){touches.add(e.pointerId);if(drag){cancelDrag();return;}}
  if(e.target!==canvas||!armed||!e.isPrimary||!editable()||bridge()?.mode?.()!=='vertex'||touches.size>1)return;
  if(e.pointerType==='mouse'&&e.button!==0||e.pointerType==='pen'&&!(e.pressure>0||(e.buttons&1)))return;
  const s=state(),hit=globalThis.__boxlabVertexPickAssist?.nearestVertexAt?.(e.clientX,e.clientY);
  if(!s?.mesh||!s.camera||!Number.isInteger(hit?.i)||!s.mesh.vertices[hit.i])return;
  const previous=selected(),ids=previous.includes(hit.i)?previous:[hit.i],center=s.mesh.vertices[hit.i].clone();
  const normal=new THREE.Vector3();s.camera.getWorldDirection(normal);
  const plane=new THREE.Plane().setFromNormalAndCoplanarPoint(normal,center),start=planePoint(e,plane);
  if(!start)return;
  consume(e);bridge()?.set?.('vertex',ids);
  const controls=s.controls;
  drag={pointerId:e.pointerId,mesh:s.mesh,before:s.mesh.clone(),previous,ids,seed:hit.i,object:globalThis.__boxlabObjectManager?.activeId,
    x:e.clientX,y:e.clientY,plane,start,center,direction,controls,controlsEnabled:controls?.enabled,result:null,repeat:repeat&&!!last};
  if(controls)controls.enabled=false;
  canvas.setPointerCapture?.(e.pointerId);notify();
},true);
document.addEventListener('pointermove',e=>{
  if(!drag||drag.pointerId!==e.pointerId)return;
  consume(e);if(!validContext(drag)){cancelDrag();disarm();return;}
  const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.hypot(dx,dy)<8&&!drag.result)return;
  let delta;
  if(drag.direction==='free'){const p=planePoint(e,drag.plane);if(!p)return;delta=p.sub(drag.start);}
  else{const v=axis(drag.direction),rail=screen(drag.center.clone().add(v)).sub(screen(drag.center));
    if(rail.lengthSq()<4){if(status)status.textContent='Vertex Extrude • axis points into view • orbit or choose another direction';return;}
    delta=v.multiplyScalar(new THREE.Vector2(dx,dy).dot(rail)/rail.lengthSq());}
  const result=buildVertexExtrude(drag.before,drag.ids,delta);
  restore(drag.mesh,result.ok?result.mesh:drag.before);drag.result=result.ok?result:null;
  render();bridge()?.set?.('vertex',result.ok?result.tips:drag.ids);
  if(status)status.textContent=result.ok?`Vertex Extrude • ${delta.length().toFixed(3)} • preview`:result.reason;
  notify();
},true);
function finish(e){
  touches.delete(e.pointerId);
  if(!drag||drag.pointerId!==e.pointerId)return;
  consume(e);if(e.type!=='pointerup'||!validContext(drag)){cancelDrag();return;}
  const d=drag;drag=null;release(d);
  if(d.result)commit(d.before,d.result,d.mesh);
  else if(d.repeat&&Math.hypot(e.clientX-d.x,e.clientY-d.y)<8){
    const result=buildVertexExtrude(d.before,[d.seed],last);if(result.ok)commit(d.before,result,d.mesh);
    // Repeat remains ready for more source taps, matching Face Repeat Previous.
    repeat=true;notify();
  }else{
    restore(d.mesh,d.before);
    const ids=d.previous.includes(d.seed)?d.previous.filter(i=>i!==d.seed):[...d.previous,d.seed];
    bridge()?.set?.('vertex',ids);render();sync();notify();
  }
}
document.addEventListener('pointerup',finish,true);document.addEventListener('pointercancel',finish,true);
// Capture cancellation even if a peer consumes release before document capture.
window.addEventListener('pointerup',e=>{touches.delete(e.pointerId);},true);
window.addEventListener('pointercancel',e=>{touches.delete(e.pointerId);if(drag?.pointerId===e.pointerId)cancelDrag();},true);
document.addEventListener('boxlab-direct-tool-exclusive',e=>{
  if(armed&&e.detail?.tool!=='vertex-extrude'){
    globalThis.__boxlabVertexViewportSession?.close?.({cancelDrag:true,preserveOwners:true});disarm();
  }
},true);
canvas?.addEventListener('lostpointercapture',e=>{if(drag?.pointerId===e.pointerId)cancelDrag();});
window.addEventListener('blur',()=>{touches.clear();if(armed)globalThis.__boxlabVertexViewportSession?.close?.({cancelDrag:true});});
document.addEventListener('keydown',e=>{if(armed&&e.key==='Escape'){consume(e);globalThis.__boxlabVertexViewportSession?.close?.({cancelDrag:true});}},true);
window.addEventListener('boxlab-bridge-state',()=>{
  if(armed&&(bridge()?.mode?.()!=='vertex'||!editable()||drag&&!validContext(drag)))disarm();sync();
});
document.addEventListener('click',e=>{
  if(e.target?.closest?.('#vertexExtrudeBtn')){
    consume(e);if(globalThis.__boxlabVertexViewportSession?.active?.())globalThis.__boxlabVertexViewportSession.close();
    else globalThis.__boxlabVertexViewportSession?.openFromHub?.({tool:'Extrude'});return;
  }
  if(armed&&e.target?.closest?.('#toolModes button,#selectionModes button,.mode-tools button')){
    globalThis.__boxlabVertexViewportSession?.close?.({complete:false,cancelDrag:true});disarm();
  }
},true);
globalThis.__boxlabVertexExtrude={version:'0.36.18.752',available,arm,disarm,busy:()=>!!drag,isArmed:()=>armed,apply,
  ownsPoint:e=>armed&&!!((drag&&drag.pointerId===e?.pointerId)||([e?.clientX,e?.clientY].every(Number.isFinite)&&Number.isInteger(globalThis.__boxlabVertexPickAssist?.nearestVertexAt?.(e.clientX,e.clientY)?.i))),
  setDirection:value=>{if(!drag&&['free','x','y','z'].includes(value)){direction=value;repeat=false;notify();}},direction:()=>direction,
  last:()=>last?.clone()||null,repeat:()=>repeat,toggleRepeat:()=>{if(!drag&&last){repeat=!repeat;notify();}},sync};
sync();
