import * as THREE from 'three';

// BoxLab v0.36.18.294 — rendered-marker Vertex tap picking with always-additive component selection.
// The visible cage marker is authoritative so newly added vertices cannot be
// displaced by a stale bridge mesh/index position.

const canvas=document.querySelector('#viewport');
const status=document.querySelector('#selectionStatus');
const PICK_RADIUS_PX=22;
const TAP_MOVE_PX=12;
const raycaster=new THREE.Raycaster();
const pointer=new THREE.Vector2();
const visibilityRay=new THREE.Raycaster();
const world=new THREE.Vector3();
let press=null;

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mode(){return bridge()?.mode?.()||document.querySelector('#selectionModes button.active')?.dataset?.mode;}
function addVertexSessionActive(){return !!globalThis.__boxlabAddVertex?.sessionActive?.();}
function directToolActive(){return !!document.querySelector('#extrudeBtn.active,#insetBtn.active,#bevelBtn.active,#vertexBevelBtn.active,#loopCutBtn.active,#applyCreaseBtn.active,#addVertexBtn.active,#buildEdgeBtn.active,#vertexSlideBtn.active,#edgeSlideBtn.active,#offsetLoopBtn.active,#bridgeEdgesBtn.active,#fillFaceBtn.active,#dissolveLoopBtn.active,#dissolveEdgeBtn.active,#deleteEdgeBtn.active,#addEdgeBtn.active,#connectVertexBtn.active,#weldVertexBtn.active,#deleteVertexBtn.active');}
function transformArmed(){
  const api=globalThis.__boxlabTransformArming;
  if(api?.active?.())return true;
  return !!document.querySelector('#toolModes button.active[data-tool]');
}
function screenPoint(v,camera){const p=v.clone().project(camera),r=canvas.getBoundingClientRect();return{x:r.left+(p.x*.5+.5)*r.width,y:r.top+(-p.y*.5+.5)*r.height,z:p.z};}
function renderedVertexObjects(){const out=[];state()?.scene?.traverse?.(object=>{if(object?.visible&&object.userData?.kind==='vertex'&&Number.isInteger(object.userData.index))out.push(object);});return out;}
function nearestVertexAt(x,y){
  const s=state(),camera=s?.camera;
  if(!camera||!canvas)return null;
  const r=canvas.getBoundingClientRect();
  const markers=renderedVertexObjects().filter(marker=>{
    for(let parent=marker;parent;parent=parent.parent)if(parent.visible===false)return false;
    marker.getWorldPosition(world);
    const p=screenPoint(world,camera);
    if(p.z<-1||p.z>1||Math.hypot(p.x-x,p.y-y)>PICK_RADIUS_PX)return false;
    const bodies=(marker.parent?.children||[]).filter(object=>object.visible!==false&&object.userData?.kind==='body');
    if(!bodies.length)return true; // loose scaffold has no occluding surface
    visibilityRay.setFromCamera(new THREE.Vector2(((p.x-r.left)/r.width)*2-1,-(((p.y-r.top)/r.height)*2-1)),camera);
    const surface=visibilityRay.intersectObjects(bodies,false)[0];
    const distance=visibilityRay.ray.origin.distanceTo(world);
    return !surface||surface.distance>=distance-Math.max(1e-5,distance*1e-5);
  });
  if(!markers.length)return null;
  pointer.set(((x-r.left)/r.width)*2-1,-(((y-r.top)/r.height)*2-1));
  raycaster.setFromCamera(pointer,camera);
  const rayHit=raycaster.intersectObjects(markers,false)[0];
  if(rayHit&&Number.isInteger(rayHit.object?.userData?.index))return{i:rayHit.object.userData.index,d:0,z:rayHit.distance};
  let best=null;
  for(const marker of markers){
    marker.getWorldPosition(world);
    const p=screenPoint(world,camera);
    if(p.z<-1||p.z>1)continue;
    const d=Math.hypot(p.x-x,p.y-y);
    if(d>PICK_RADIUS_PX)continue;
    const cameraDistance=camera.position.distanceTo(world);
    if(!best||d<best.d-.75||(Math.abs(d-best.d)<=.75&&cameraDistance<best.cameraDistance))best={i:marker.userData.index,d,z:p.z,cameraDistance};
  }
  return best;
}
function selected(){return [...new Set(bridge()?.indices?.()||[])];}
function applyPick(index){const current=selected(),has=current.includes(index),next=has?current.filter(i=>i!==index):[...current,index];bridge()?.set?.('vertex',next);if(status)status.textContent=next.length?`Vertex mode • ${next.length} selected`:'Vertex mode • nothing selected';}

// Shared with main's earlier window background classifier; one assist hit policy.
function assistedPick(event){
  if(event.target!==canvas||!event.isPrimary||mode()!=='vertex'||addVertexSessionActive()||directToolActive()||transformArmed())return null;
  if(event.pointerType==='pen'&&!(event.pressure>0))return null;
  return nearestVertexAt(event.clientX,event.clientY);
}

document.addEventListener('pointerdown',event=>{
  const hit=assistedPick(event);
  if(!hit)return;
  press={id:event.pointerId,x:event.clientX,y:event.clientY,index:hit.i,pointerType:event.pointerType};
  event.preventDefault();
  event.stopImmediatePropagation();
},true);

document.addEventListener('pointermove',event=>{
  if(!press||press.id!==event.pointerId)return;
  if(addVertexSessionActive()||transformArmed()){press=null;return;}
  if(Math.hypot(event.clientX-press.x,event.clientY-press.y)>TAP_MOVE_PX){press.moved=true;return;}
  event.preventDefault();
  event.stopImmediatePropagation();
},true);

document.addEventListener('pointerup',event=>{
  if(!press||press.id!==event.pointerId)return;
  const p=press;press=null;
  if(p.moved||addVertexSessionActive()||transformArmed())return;
  event.preventDefault();
  event.stopImmediatePropagation();
  if(event.target!==canvas||mode()!=='vertex'||directToolActive())return;
  if(Math.hypot(event.clientX-p.x,event.clientY-p.y)>TAP_MOVE_PX)return;
  applyPick(p.index);
},true);

document.addEventListener('pointercancel',event=>{if(!press||press.id===event.pointerId)press=null;},true);
document.addEventListener('pointerleave',event=>{if(event.pointerType==='pen'&&event.pressure===0)press=null;},true);

globalThis.__boxlabVertexPickAssist={version:'0.36.18.786',nearestVertexAt,pick:assistedPick};
