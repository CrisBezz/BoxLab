import * as THREE from 'three';

const canvas=document.querySelector('#viewport');
const multiToggle=document.querySelector('#multiSelectToggle');
const status=document.querySelector('#selectionStatus');
const PICK_RADIUS_PX=22;
const TAP_MOVE_PX=12;
let press=null;

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mode(){return bridge()?.mode?.()||document.querySelector('#selectionModes button.active')?.dataset?.mode;}
function addVertexSessionActive(){return !!globalThis.__boxlabAddVertex?.sessionActive?.();}
function directToolActive(){return !!document.querySelector('#extrudeBtn.active,#insetBtn.active,#bevelBtn.active,#vertexBevelBtn.active,#loopCutBtn.active,#applyCreaseBtn.active,#addVertexBtn.active,#buildEdgeBtn.active,#vertexSlideBtn.active,#edgeSlideBtn.active,#offsetLoopBtn.active,#bridgeEdgesBtn.active,#fillFaceBtn.active,#dissolveLoopBtn.active,#dissolveEdgeBtn.active,#deleteEdgeBtn.active,#addEdgeBtn.active,#connectVertexBtn.active,#weldVertexBtn.active,#deleteVertexBtn.active');}
function screenPoint(v,camera){const p=v.clone().project(camera),r=canvas.getBoundingClientRect();return{x:r.left+(p.x*.5+.5)*r.width,y:r.top+(-p.y*.5+.5)*r.height,z:p.z};}
function nearestVertexAt(x,y){const s=state(),mesh=s?.mesh,camera=s?.camera;if(!mesh||!camera)return null;let best=null;for(let i=0;i<mesh.vertices.length;i++){const p=screenPoint(mesh.vertices[i],camera);if(p.z<-1||p.z>1)continue;const d=Math.hypot(p.x-x,p.y-y);if(d>PICK_RADIUS_PX)continue;if(!best||d<best.d-.75||(Math.abs(d-best.d)<=.75&&p.z<best.z))best={i,d,z:p.z};}return best;}
function selected(){return [...new Set(bridge()?.indices?.()||[])];}
function applyPick(index){const current=selected(),has=current.includes(index),multi=!!multiToggle?.checked;let next;if(multi)next=has?current.filter(i=>i!==index):[...current,index];else next=has?[]:[index];bridge()?.set?.('vertex',next);if(status)status.textContent=next.length?`Vertex mode • ${next.length} selected`:'Vertex mode • nothing selected';}

// Normal vertex picking is completely suspended while the persistent Add Vertex
// session is active. Add owns canvas gestures until the session ends.
document.addEventListener('pointerdown',event=>{
  if(event.target!==canvas||!event.isPrimary||mode()!=='vertex'||addVertexSessionActive()||directToolActive())return;
  if(event.pointerType==='pen'&&!(event.pressure>0))return;
  const hit=nearestVertexAt(event.clientX,event.clientY);
  if(!hit)return;
  press={id:event.pointerId,x:event.clientX,y:event.clientY,index:hit.i,pointerType:event.pointerType};
  event.preventDefault();
  event.stopImmediatePropagation();
},true);

document.addEventListener('pointermove',event=>{
  if(!press||press.id!==event.pointerId)return;
  if(addVertexSessionActive()){press=null;return;}
  if(Math.hypot(event.clientX-press.x,event.clientY-press.y)>TAP_MOVE_PX){press.moved=true;return;}
  event.preventDefault();
  event.stopImmediatePropagation();
},true);

document.addEventListener('pointerup',event=>{
  if(!press||press.id!==event.pointerId)return;
  const p=press;press=null;
  if(p.moved||addVertexSessionActive())return;
  event.preventDefault();
  event.stopImmediatePropagation();
  if(event.target!==canvas||mode()!=='vertex'||directToolActive())return;
  if(Math.hypot(event.clientX-p.x,event.clientY-p.y)>TAP_MOVE_PX)return;
  applyPick(p.index);
},true);

document.addEventListener('pointercancel',event=>{if(!press||press.id===event.pointerId)press=null;},true);
document.addEventListener('pointerleave',event=>{if(event.pointerType==='pen'&&event.pressure===0)press=null;},true);
