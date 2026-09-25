import * as THREE from 'three';
import {surfaceTransformMesh,cycleSurfaceTransformMode} from './surface-transform-core.js?v=0.36.18.445';

const VERSION='0.36.18.445';
const canvas=document.querySelector('#viewport');
const status=document.querySelector('#selectionStatus');
const objectTools=document.querySelector('.mode-tools[data-mode-tools="object"]');
const DRAG_THRESHOLD=8;

const launchRow=document.createElement('div');
launchRow.className='outliner-actions surface-transform-launch-row';
launchRow.style.gridTemplateColumns='1fr';
launchRow.innerHTML='<button id="surfaceTransformBtn" type="button">Transform</button>';
objectTools?.appendChild(launchRow);
const launchButton=launchRow.querySelector('#surfaceTransformBtn');

const controls=document.createElement('div');
controls.id='surfaceTransformSession';
controls.className='boxlab-tool-session-shell surface-transform-session';
controls.hidden=true;
controls.innerHTML=`
  <div class="boxlab-tool-session-title"><span>Transform</span><span class="boxlab-tool-session-subtitle">Pick surface · drag · tap to cycle</span></div>
  <div class="boxlab-tool-session-section">Mode</div>
  <div class="outliner-actions" style="grid-template-columns:repeat(3,1fr)">
    <button id="surfaceTransformMove" type="button" class="active">Move</button>
    <button id="surfaceTransformRotate" type="button">Rotate</button>
    <button id="surfaceTransformScale" type="button">Scale</button>
  </div>
  <div class="boxlab-tool-session-subtitle" id="surfaceTransformHint">Tap a target face</div>
  <div class="outliner-actions" style="grid-template-columns:repeat(2,1fr)">
    <button id="surfaceTransformCancel" type="button">Cancel</button>
    <button id="surfaceTransformApply" class="boxlab-tool-session-primary" type="button">Apply</button>
  </div>
`;
objectTools?.appendChild(controls);

const moveButton=controls.querySelector('#surfaceTransformMove');
const rotateButton=controls.querySelector('#surfaceTransformRotate');
const scaleButton=controls.querySelector('#surfaceTransformScale');
const hint=controls.querySelector('#surfaceTransformHint');
const cancelButton=controls.querySelector('#surfaceTransformCancel');
const applyButton=controls.querySelector('#surfaceTransformApply');

let active=false,sourceId=null,sourceMesh=null,sourceCenter=new THREE.Vector3(),sourceFace=null,beforeScene=null;
let target=null,phase='source',mode='move',state={point:new THREE.Vector3(),normal:new THREE.Vector3(0,1,0),spin:0,scale:1};
let gesture=null;
const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();

function manager(){return globalThis.__boxlabObjectManager;}
function objectSelection(){return globalThis.__boxlabObjectSelection;}
function toolSession(){return globalThis.__boxlabToolSession;}
function bridge(){return globalThis.__boxlabBridgeState;}
function activeObject(){const m=manager();return m?.objects?.find(o=>o.id===m.activeId)||null;}
function liveMesh(){return bridge()?.mesh||null;}
function currentMode(){return document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
function setStatus(text){if(status)status.textContent=text;}
function sceneCamera(){return bridge()?.camera||null;}
function setPointer(event){
  const cam=sceneCamera(),r=canvas?.getBoundingClientRect();if(!cam||!r?.width||!r?.height)return false;
  pointer.x=((event.clientX-r.left)/r.width)*2-1;
  pointer.y=-((event.clientY-r.top)/r.height)*2+1;
  raycaster.setFromCamera(pointer,cam);return true;
}
function objectCenter(mesh){
  const box=new THREE.Box3().setFromPoints(mesh?.vertices||[]),c=new THREE.Vector3();
  return box.isEmpty()?c:box.getCenter(c);
}
function forceRender(){
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));
  globalThis.__boxlabObjectSelection?.refresh?.();
}
function beginSession(){controls.hidden=false;toolSession()?.begin?.({id:'surface-transform',title:'Transform',node:controls,subtitle:'Surface-relative Move · Rotate · Scale'});}
function endSession(){controls.hidden=true;toolSession()?.end?.('surface-transform');}
function updateModeUI(){
  moveButton?.classList.toggle('active',mode==='move');
  rotateButton?.classList.toggle('active',mode==='rotate');
  scaleButton?.classList.toggle('active',mode==='scale');
  if(hint)hint.textContent=phase==='source'?'Tap a face on selected object':phase==='target'?'Tap a target face':`${mode[0].toUpperCase()+mode.slice(1)} on surface · tap to cycle`;
}
function setMode(next){mode=next;updateModeUI();setStatus(`Transform • ${mode[0].toUpperCase()+mode.slice(1)} • surface frame`);}
function cycleMode(){setMode(cycleSurfaceTransformMode(mode));}
function sourceValid(){
  const object=activeObject();
  return currentMode()==='object'&&object&&object.id===sourceId&&!object.locked&&object.kind!=='reference';
}
function cancel({silent=false}={}){
  if(!active)return;
  const history=globalThis.__boxlabObjectHistory,live=liveMesh();
  const snapshot=beforeScene?.objects?.find?.(o=>o.id===beforeScene?.activeId)||null;
  if(beforeScene)history?.restore?.(beforeScene);
  if(live&&snapshot?.mesh){
    live.vertices=snapshot.mesh.vertices.map(v=>v.clone());
    live.faces=snapshot.mesh.faces.map(f=>[...f]);
    live.creases=new Map(snapshot.mesh.creases||[]);
    forceRender();
  }
  gesture=null;target=null;sourceFace=null;phase='source';active=false;sourceId=null;sourceMesh=null;beforeScene=null;mode='move';endSession();
  if(!silent)setStatus('Transform cancelled');
}
function finishApply(){
  if(!active||!sourceValid())return cancel({silent:true});
  if(!sourceFace||!target){setStatus('Transform • pick source and target faces first');return;}
  globalThis.__boxlabObjectHistory?.checkpointSnapshot?.(beforeScene);
  manager()?.saveActive?.();
  active=false;gesture=null;beforeScene=null;sourceMesh=null;sourceId=null;sourceFace=null;target=null;phase='source';mode='move';endSession();forceRender();
  setStatus('Transform applied • one Object Undo step');
}
function sourceFaceHit(event){
  if(!sourceMesh?.faces?.length||!setPointer(event))return null;
  const geometry=sourceMesh.triangulatedGeometry?.();if(!geometry)return null;
  const material=new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
  const display=new THREE.Mesh(geometry,material);
  const hit=raycaster.intersectObject(display,false)[0]||null;
  let out=null;
  if(hit){
    let faceIndex=null,cursor=0;
    for(let fi=0;fi<sourceMesh.faces.length;fi++){
      const triCount=Math.max(0,sourceMesh.faces[fi].length-2);
      if(hit.faceIndex<cursor+triCount){faceIndex=fi;break;}
      cursor+=triCount;
    }
    if(Number.isInteger(faceIndex)){
      const normal=sourceMesh.faceNormal(faceIndex);
      const center=sourceMesh.faceCenter(faceIndex);
      if(normal?.lengthSq?.()>1e-12)out={faceIndex,center:center.clone(),normal:normal.clone().normalize()};
    }
  }
  geometry.dispose?.();material.dispose?.();
  return out;
}
function targetFaceHit(event){
  if(!setPointer(event))return null;
  const m=manager();if(!m)return null;
  const temporary=[];
  for(const object of m.objects||[]){
    if(!object||object.id===sourceId||object.visible===false)continue;
    if(m.soloId!=null&&object.id!==m.soloId)continue;
    const mesh=object.mesh;if(!mesh?.faces?.length)continue;
    const geometry=mesh.triangulatedGeometry?.();if(!geometry)continue;
    const material=new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
    const display=new THREE.Mesh(geometry,material);
    display.userData.boxlabTargetObject=object;
    temporary.push(display);
  }
  const hit=temporary.length?raycaster.intersectObjects(temporary,false)[0]:null;
  let out=null;
  if(hit){
    const object=hit.object.userData.boxlabTargetObject;
    const mesh=object.mesh;
    let faceIndex=null,cursor=0;
    for(let fi=0;fi<mesh.faces.length;fi++){
      const triCount=Math.max(0,mesh.faces[fi].length-2);
      if(hit.faceIndex<cursor+triCount){faceIndex=fi;break;}
      cursor+=triCount;
    }
    const normal=Number.isInteger(faceIndex)?mesh.faceNormal(faceIndex):hit.face?.normal?.clone?.();
    if(normal?.lengthSq?.()>1e-12)out={objectId:object.id,faceIndex,point:hit.point.clone(),normal:normal.clone().normalize()};
  }
  for(const display of temporary){display.geometry?.dispose?.();display.material?.dispose?.();}
  return out;
}
function rebuild(){
  if(!active||!sourceMesh)return;
  const live=liveMesh();if(!live)return;
  const transformed=surfaceTransformMesh(sourceMesh,{
    sourceCenter,
    sourceAnchor:sourceFace?.center||sourceCenter,
    sourceNormal:sourceFace?.normal||new THREE.Vector3(0,1,0),
    point:state.point,normal:state.normal,spin:state.spin,scale:state.scale,
    oppose:true
  });
  if(!transformed)return;
  live.vertices=transformed.vertices.map(v=>v.clone());
  live.faces=transformed.faces.map(f=>[...f]);
  live.creases=new Map(transformed.creases||[]);
  manager()?.saveActive?.();forceRender();
}
function placeOnTarget(hit){
  target=hit;phase='placed';
  state.point.copy(hit.point);state.normal.copy(hit.normal);state.spin=0;state.scale=1;
  mode='move';updateModeUI();rebuild();
  setStatus(`Transform • face-to-face on ${manager()?.objects?.find(o=>o.id===hit.objectId)?.name||'surface'} • Move`);
}
function rayPlanePoint(event,plane){
  if(!setPointer(event))return null;
  const out=new THREE.Vector3();
  return raycaster.ray.intersectPlane(plane,out)?out:null;
}
function screenPoint(v){
  const cam=sceneCamera(),r=canvas?.getBoundingClientRect();if(!cam||!r)return null;
  const p=v.clone().project(cam);
  return new THREE.Vector2(r.left+(p.x*.5+.5)*r.width,r.top+(-p.y*.5+.5)*r.height);
}
function beginGesture(event){
  if(!active||event.target!==canvas||!event.isPrimary||event.pointerType==='touch')return;
  if(!sourceValid())return cancel({silent:true});
  if(phase==='source'){
    event.preventDefault();event.stopImmediatePropagation();
    const hit=sourceFaceHit(event);
    if(hit){
      sourceFace=hit;phase='target';updateModeUI();
      setStatus(`Transform • source Face ${hit.faceIndex+1} selected • tap target face`);
    }else setStatus('Transform • tap a face on the selected object');
    return;
  }
  if(phase==='target'){
    event.preventDefault();event.stopImmediatePropagation();
    const hit=targetFaceHit(event);
    if(hit)placeOnTarget(hit);else setStatus('Transform • tap a face on another visible object');
    return;
  }
  event.preventDefault();event.stopImmediatePropagation();
  const plane=new THREE.Plane().setFromNormalAndCoplanarPoint(state.normal,state.point);
  const startOnPlane=rayPlanePoint(event,plane);
  const centerScreen=screenPoint(state.point);
  gesture={
    id:event.pointerId,startX:event.clientX,startY:event.clientY,moved:false,
    startPoint:state.point.clone(),startSpin:state.spin,startScale:state.scale,
    plane,startOnPlane,centerScreen,
    startVector:centerScreen?new THREE.Vector2(event.clientX,event.clientY).sub(centerScreen):new THREE.Vector2()
  };
  bridge().controls.enabled=false;
  canvas.setPointerCapture?.(event.pointerId);
}
function moveGesture(event){
  const g=gesture;if(!g||g.id!==event.pointerId)return;
  event.preventDefault();event.stopImmediatePropagation();
  const dx=event.clientX-g.startX,dy=event.clientY-g.startY,dist=Math.hypot(dx,dy);
  if(!g.moved&&dist<DRAG_THRESHOLD)return;
  g.moved=true;
  if(mode==='move'){
    const now=rayPlanePoint(event,g.plane);if(!now||!g.startOnPlane)return;
    state.point.copy(g.startPoint).add(now.sub(g.startOnPlane));
  }else if(mode==='rotate'){
    const current=g.centerScreen?new THREE.Vector2(event.clientX,event.clientY).sub(g.centerScreen):new THREE.Vector2();
    let angle;
    if(g.startVector.length()>18&&current.length()>18){
      const a=g.startVector.clone().normalize(),b=current.clone().normalize();
      angle=Math.atan2(a.x*b.y-a.y*b.x,THREE.MathUtils.clamp(a.dot(b),-1,1));
    }else angle=dx*.012;
    if(document.querySelector('#transformSnapBtn')?.classList.contains('active'))angle=THREE.MathUtils.degToRad(Math.round(THREE.MathUtils.radToDeg(angle)/15)*15);
    state.spin=g.startSpin+angle;
  }else{
    state.scale=THREE.MathUtils.clamp(g.startScale*Math.exp((dx-dy)*.006),.05,20);
  }
  rebuild();
  setStatus(`Transform • ${mode[0].toUpperCase()+mode.slice(1)} • ${mode==='rotate'?`${THREE.MathUtils.radToDeg(state.spin).toFixed(0)}°`:mode==='scale'?`${state.scale.toFixed(2)}×`:'surface slide'}`);
}
function endGesture(event){
  const g=gesture;if(!g||g.id!==event.pointerId)return;
  event.preventDefault();event.stopImmediatePropagation();
  if(bridge()?.controls)bridge().controls.enabled=true;
  gesture=null;
  if(!g.moved)cycleMode();
}
function cancelGesture(event){
  const g=gesture;if(!g||g.id!==event.pointerId)return;
  event.preventDefault();event.stopImmediatePropagation();
  state.point.copy(g.startPoint);state.spin=g.startSpin;state.scale=g.startScale;rebuild();
  if(bridge()?.controls)bridge().controls.enabled=true;
  gesture=null;
}

launchButton?.addEventListener('click',()=>{
  const object=activeObject(),live=liveMesh(),sel=objectSelection();
  if(active||currentMode()!=='object'||!object||!live||object.locked||object.kind==='reference'||sel?.multi&&sel.ids?.size>1)return;
  beforeScene=globalThis.__boxlabObjectHistory?.capture?.()||null;
  if(!beforeScene){setStatus('Transform • object history unavailable');return;}
  sourceId=object.id;sourceMesh=live.clone();sourceCenter=objectCenter(sourceMesh);
  active=true;sourceFace=null;target=null;phase='source';mode='move';state={point:sourceCenter.clone(),normal:new THREE.Vector3(0,1,0),spin:0,scale:1};
  beginSession();updateModeUI();
  globalThis.__boxlabTransformArming?.disarm?.();
  setStatus('Transform • tap a face on the selected object');
});
moveButton?.addEventListener('click',()=>setMode('move'));
rotateButton?.addEventListener('click',()=>setMode('rotate'));
scaleButton?.addEventListener('click',()=>setMode('scale'));
cancelButton?.addEventListener('click',()=>cancel());
applyButton?.addEventListener('click',finishApply);

window.addEventListener('pointerdown',beginGesture,true);
window.addEventListener('pointermove',moveGesture,true);
window.addEventListener('pointerup',endGesture,true);
window.addEventListener('pointercancel',cancelGesture,true);
window.addEventListener('boxlab-bridge-state',()=>{if(active&&!sourceValid())cancel({silent:true});});
window.addEventListener('beforeunload',()=>{if(active)cancel({silent:true});});

globalThis.__boxlabSurfaceTransform={
  version:VERSION,
  get active(){return active;},
  get mode(){return mode;},
  get target(){return target?{...target,point:target.point.clone(),normal:target.normal.clone()}:null;},
  cycle:cycleMode,
  cancel
};
