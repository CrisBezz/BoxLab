import {boundarySelectionInfo,extrudeBoundaryEdges,perpendicularAxisDirection,projectPerpendicularDelta} from './edge-extrude-core.js?v=0.36.18.426';
import * as THREE from 'three';

// BoxLab v0.36.18.423 — direct boundary Edge Extrude / ribbon workflow.
// Select one or more compatible boundary/loose edges, arm Extrude, then
// Pencil/mouse/touch-drag a selected edge. The newly-created outer rail
// remains selected and Extrude stays armed for rapid repeated pulls.

const VERSION='0.36.18.510';
const canvas=document.querySelector('#viewport');
const edgeTools=document.querySelector('[data-mode-tools="edge"]');
const moveRow=edgeTools?.querySelector('.edge-move-actions');
const status=document.querySelector('#selectionStatus');
const SNAP_START_PX=7;
const raycaster=new THREE.Raycaster();
const pointer=new THREE.Vector2();
raycaster.params.Line.threshold=.12;

const precision=document.querySelector('#transformPrecision');
const planeButton=document.createElement('button');
planeButton.id='edgeExtrudePlaneConstraintBtn';
planeButton.type='button';
planeButton.dataset.constraint='plane';
planeButton.textContent='Plane';
planeButton.hidden=true;
precision?.insertBefore(planeButton,precision.querySelector('[data-constraint="auto"]')||null);
let armed=false;
let drag=null;

if(!canvas||!edgeTools||!moveRow)throw new Error('Edge Extrude UI dependencies missing');

const button=document.createElement('button');
button.id='edgeExtrudeBtn';
button.type='button';
button.textContent='Extrude';
moveRow.style.gridTemplateColumns='repeat(3,minmax(0,1fr))';
moveRow.prepend(button);

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function camera(){return state()?.camera||null;}
function history(){return globalThis.__boxlabHistory;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function unique(values){return[...new Set(values)];}
function selectedEdges(){const b=bridge();return b?.mode?.()==='edge'?unique(b.indices?.()||[]):[];}
function syncPlaneButton(){
  if(!planeButton)return;
  planeButton.hidden=!armed;
  const on=armed&&transformConstraint()==='plane';
  planeButton.classList.toggle('active',on);
  planeButton.setAttribute('aria-pressed',on?'true':'false');
}
function transformConstraint(){
  return globalThis.__boxlabTransformArming?.constraint?.()||'free';
}
function axisSnapOn(){return !!document.querySelector('#axisSnapToggle')?.checked;}
function axisVector(axis){
  return new THREE.Vector3(axis==='x'?1:0,axis==='y'?1:0,axis==='z'?1:0);
}
function seedEdgeDirection(m,info,seedIndex){
  const seed=info?.infos?.find(edge=>edge.index===seedIndex)||info?.infos?.[0];
  if(!seed||!m?.vertices?.[seed.a]||!m?.vertices?.[seed.b])return null;
  const dir=m.vertices[seed.b].clone().sub(m.vertices[seed.a]);
  return dir.lengthSq()>1e-12?dir.normalize():null;
}
function constrainedDirection(drag,axis){
  if(!['x','y','z'].includes(axis))return null;
  return perpendicularAxisDirection(drag.edgeDirection,axisVector(axis));
}
function screenDirection(center,dir){
  const a=screenPoint(center),b=screenPoint(center.clone().add(dir));
  return a&&b?b.sub(a):null;
}
function chooseAutoAxis(drag,dx,dy){
  const motion=new THREE.Vector2(dx,dy);
  if(motion.lengthSq()<1)return null;
  motion.normalize();
  let best=null;
  for(const axis of ['x','y','z']){
    const dir=constrainedDirection(drag,axis);
    if(!dir)continue;
    const rail=screenDirection(drag.center,dir);
    if(!rail||rail.lengthSq()<4)continue;
    const score=Math.abs(motion.dot(rail.clone().normalize()));
    if(!best||score>best.score)best={axis,dir,rail,score};
  }
  return best;
}
function constrainedDelta(drag,event,dx,dy){
  const constraint=drag.constraint;
  if(constraint==='plane'){
    const now=rayPlanePoint(event,drag.edgePlane);
    if(!now||!drag.planeStart)return{invalid:true,axis:'plane'};
    const delta=projectPerpendicularDelta(now.clone().sub(drag.planeStart),drag.edgeDirection);
    if(!delta)return{invalid:true,axis:'plane'};
    return{delta,axis:'plane'};
  }
  if(constraint==='free'&&!drag.axisSnap)return null;
  if(['x','y','z'].includes(constraint)){
    const dir=constrainedDirection(drag,constraint);
    if(!dir)return{invalid:true,axis:constraint};
    const rail=screenDirection(drag.center,dir);
    if(!rail||rail.lengthSq()<4)return{invalid:true,axis:constraint};
    const amount=new THREE.Vector2(dx,dy).dot(rail)/rail.lengthSq();
    return{delta:dir.multiplyScalar(amount),axis:constraint};
  }
  if(constraint==='auto'||drag.axisSnap){
    if(!drag.autoChoice)drag.autoChoice=chooseAutoAxis(drag,dx,dy);
    if(!drag.autoChoice)return{invalid:true,axis:'auto'};
    const {axis,dir,rail}=drag.autoChoice;
    const amount=new THREE.Vector2(dx,dy).dot(rail)/rail.lengthSq();
    return{delta:dir.clone().multiplyScalar(amount),axis};
  }
  return null;
}

function screenPoint(v){
  const cam=camera();
  if(!cam||!v)return null;
  const p=v.clone().project(cam),r=canvas.getBoundingClientRect();
  return new THREE.Vector2(r.left+(p.x*.5+.5)*r.width,r.top+(-p.y*.5+.5)*r.height);
}
function setPointer(event){
  const r=canvas.getBoundingClientRect();
  pointer.x=((event.clientX-r.left)/r.width)*2-1;
  pointer.y=-((event.clientY-r.top)/r.height)*2+1;
}
function hitSelectedEdge(event,ids){
  const s=state(),objects=s?.edgeObjects,cam=camera();
  if(!objects||!cam)return null;
  setPointer(event);raycaster.setFromCamera(pointer,cam);
  const candidates=ids.map(i=>objects.get?.(i)).filter(Boolean);
  const hit=raycaster.intersectObjects(candidates,false)[0];
  return Number.isInteger(hit?.object?.userData?.index)?hit.object.userData.index:null;
}
function hitAnyEdge(event){
  const s=state(),objects=s?.edgeObjects,cam=camera();
  if(!objects||!cam)return null;
  setPointer(event);raycaster.setFromCamera(pointer,cam);
  const hit=raycaster.intersectObjects([...(objects.values?.()||[])].filter(Boolean),false)[0];
  return Number.isInteger(hit?.object?.userData?.index)?hit.object.userData.index:null;
}
function edgePlaneAt(point,edgeDirection){
  if(!edgeDirection||edgeDirection.lengthSq()<1e-12)return null;
  return new THREE.Plane().setFromNormalAndCoplanarPoint(edgeDirection.clone().normalize(),point);
}
function screenPlaneAt(point){
  const normal=new THREE.Vector3();camera()?.getWorldDirection(normal);
  if(normal.lengthSq()<1e-12)return null;
  return new THREE.Plane().setFromNormalAndCoplanarPoint(normal.normalize(),point);
}
function rayPlanePoint(event,plane){
  const cam=camera();if(!cam||!plane)return null;
  setPointer(event);raycaster.setFromCamera(pointer,cam);
  const out=new THREE.Vector3();
  return raycaster.ray.intersectPlane(plane,out)?out:null;
}
function centerOfSelection(m,info){
  const ids=unique(info.infos.flatMap(e=>[e.a,e.b])),c=new THREE.Vector3();
  ids.forEach(i=>c.add(m.vertices[i]));
  return ids.length?c.multiplyScalar(1/ids.length):c;
}
function restore(target,snapshot){
  target.vertices=snapshot.vertices.map(v=>v.clone());
  target.faces=snapshot.faces.map(f=>[...f]);
  target.creases=new Map(snapshot.creases||[]);
  target.looseEdges=new Set(snapshot.looseEdges||[]);
  target.looseVertices=new Set(snapshot.looseVertices||[]);
  target.edges?.();
}

function validate(m){
  const topology=globalThis.__boxlabTopology,gate=globalThis.__boxlabTopologyGate;
  const a=topology?.validateTopology?.(m,{allowBoundary:true})||null;
  const b=gate?.validate?.(m)||null;
  if(a&&!a.ok)return{ok:false,reason:a.reason||'Topology validation failed'};
  if(b&&!b.valid)return{ok:false,reason:b.reason||'Topology validation failed'};
  return{ok:true};
}

function syncButton(){
  const valid=!!boundarySelectionInfo(mesh(),selectedEdges());
  button.disabled=!armed&&!valid;
  button.classList.toggle('active',armed);
  syncPlaneButton();
}
function setArmed(next){
  const wasArmed=armed;
  armed=!!next;
  if(armed&&!wasArmed){
    globalThis.__boxlabTransformArming?.activateRealMove?.();
    globalThis.__boxlabTransformArming?.setConstraint?.('plane');
  }
  button.classList.toggle('active',armed);
  syncPlaneButton();
  if(status)status.textContent=armed?'Edge Extrude • Move armed • Plane constraint • drag selected boundary edge(s)':'Edge mode';
}
precision?.querySelectorAll('[data-constraint]').forEach(control=>control.addEventListener('click',()=>queueMicrotask(syncPlaneButton),true));

planeButton.addEventListener('click',event=>{
  if(!armed)return;
  event.preventDefault();event.stopImmediatePropagation();
  if(!globalThis.__boxlabTransformArming?.active?.())globalThis.__boxlabTransformArming?.activateRealMove?.();
  globalThis.__boxlabTransformArming?.setConstraint?.('plane');
  syncPlaneButton();
  if(status)status.textContent='Edge Extrude • Plane constraint • free movement perpendicular to edge';
},true);

button.addEventListener('click',event=>{
  event.preventDefault();event.stopImmediatePropagation();
  if(!boundarySelectionInfo(mesh(),selectedEdges()))return;
  setArmed(!armed);
},true);

document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(()=>{
  if(bridge()?.mode?.()!=='edge')setArmed(false);
  syncButton();
})));
window.addEventListener('boxlab-bridge-state',syncButton);
window.addEventListener('boxlab-transform-constraint',syncPlaneButton);
document.addEventListener('click',event=>{
  if(!armed||event.target===button||event.target?.closest?.('#edgeExtrudeBtn'))return;
  if(event.target?.closest?.('#transformPrecision,#toolModes,.quick-snap'))return;
  if(event.target?.closest?.('button')&&!event.target?.closest?.('#selectionModes'))setArmed(false);
},true);

canvas.addEventListener('pointerdown',event=>{
  if(!armed||!event.isPrimary)return;
  if(event.pointerType==='mouse'&&event.button!==0)return;
  const m=mesh();if(!m)return;
  const previousIds=selectedEdges();
  const hit=hitAnyEdge(event);
  if(!Number.isInteger(hit))return;
  const wasSelected=previousIds.includes(hit);
  let ids=previousIds,info=null;
  if(wasSelected){
    info=boundarySelectionInfo(m,ids);
    if(!info)return;
  }else{
    const candidate=boundarySelectionInfo(m,[hit]);
    if(!candidate)return;
    ids=[hit];
    info=candidate;
    bridge()?.set?.('edge',ids);
  }
  const seed=hit;
  const center=centerOfSelection(m,info),plane=screenPlaneAt(center),start=rayPlanePoint(event,plane);
  if(!plane||!start)return;
  event.preventDefault();event.stopImmediatePropagation();
  const edgeDirection=seedEdgeDirection(m,info,seed);if(!edgeDirection)return;
  const edgePlane=edgePlaneAt(center,edgeDirection);
  const planeStart=edgePlane?rayPlanePoint(event,edgePlane):null;
  drag={pointerId:event.pointerId,mesh:m,before:m.clone(),info,seed,previousIds,switched:!wasSelected,start,startX:event.clientX,startY:event.clientY,plane,center,edgeDirection,edgePlane,planeStart,constraint:transformConstraint(),axisSnap:axisSnapOn(),autoChoice:null,preview:false,result:null};
  state().controls&&(state().controls.enabled=false);
  canvas.setPointerCapture?.(event.pointerId);
},true);

canvas.addEventListener('pointermove',event=>{
  if(!drag||drag.pointerId!==event.pointerId)return;
  event.preventDefault();event.stopImmediatePropagation();
  const dx=event.clientX-drag.startX,dy=event.clientY-drag.startY;
  if(!drag.preview&&Math.hypot(dx,dy)<SNAP_START_PX)return;
  let delta;
  const constrained=constrainedDelta(drag,event,dx,dy);
  if(constrained?.invalid){if(status)status.textContent=`Edge Extrude • ${String(constrained.axis).toUpperCase()} is parallel to this edge • choose another axis`;return;}
  if(constrained?.delta)delta=constrained.delta;
  else{const now=rayPlanePoint(event,drag.plane);if(!now)return;delta=now.clone().sub(drag.start);}
  restore(drag.mesh,drag.before);
  const result=extrudeBoundaryEdges(drag.mesh,drag.before,drag.info,delta);
  if(!result){restore(drag.mesh,drag.before);drag.result=null;drag.preview=false;render();return;}
  drag.result=result;drag.preview=true;
  render();
  bridge()?.set?.('edge',result.outer);
  const axisLabel=constrained?.axis==='plane'?' • Plane ⟂ edge':constrained?.axis?` • ${String(constrained.axis).toUpperCase()} ⟂ edge`:drag.constraint==='free'&&!drag.axisSnap?' • Free':'';
  if(status)status.textContent=`Edge Extrude • ${drag.info.ids.length} edge${drag.info.ids.length===1?'':'s'} • ribbon preview${axisLabel}`;
},true);

function finish(event,cancel=false){
  if(!drag||drag.pointerId!==event.pointerId)return;
  event.preventDefault();event.stopImmediatePropagation();
  const current=drag;drag=null;
  if(state()?.controls)state().controls.enabled=true;
  try{canvas.releasePointerCapture?.(event.pointerId);}catch{}
  if(cancel){
    restore(current.mesh,current.before);
    render();
    bridge()?.set?.('edge',current.previousIds||current.info.ids);
    if(status)status.textContent='Edge Extrude • cancelled';
    return;
  }
  if(!current.preview||!current.result){
    restore(current.mesh,current.before);
    render();
    if(current.switched){
      bridge()?.set?.('edge',[current.seed]);
      if(status)status.textContent='Edge Extrude • edge switched • tool + constraint preserved';
    }else{
      const remaining=(current.previousIds||current.info.ids).filter(index=>index!==current.seed);
      bridge()?.set?.('edge',remaining);
      if(status)status.textContent=remaining.length?'Edge Extrude • edge deselected • tool + constraint preserved':'Edge Extrude • no edge selected • choose another boundary edge';
    }
    setArmed(true);
    return;
  }
  const check=validate(current.mesh);
  if(!check.ok){
    restore(current.mesh,current.before);
    render();
    bridge()?.set?.('edge',current.info.ids);
    if(status)status.textContent='Edge Extrude • validation failed • rolled back';
    return;
  }
  history()?.push(current.before);
  globalThis.__boxlabObjectManager?.saveActive?.();
  render();
  const edges=current.mesh.edges(),map=new Map(edges.map((e,i)=>[current.mesh.edgeKey(e.a,e.b),i]));
  const next=current.result.outerKeys.map(k=>map.get(k)).filter(Number.isInteger);
  bridge()?.set?.('edge',next);
  setArmed(true);
  const mode=current.constraint==='plane'?'plane':current.autoChoice?.axis||(['x','y','z'].includes(current.constraint)?current.constraint:current.axisSnap?'auto':'free');
  if(status)status.textContent=`Edge Extrude committed • ${next.length} outer edge${next.length===1?'':'s'} selected • ${String(mode).toUpperCase()} • drag again`;
}
canvas.addEventListener('pointerup',event=>finish(event,false),true);
canvas.addEventListener('pointercancel',event=>finish(event,true),true);

syncButton();
globalThis.__boxlabEdgeExtrude={version:VERSION,isArmed:()=>armed,setArmed,boundarySelectionInfo,extrudeBoundaryEdges};
