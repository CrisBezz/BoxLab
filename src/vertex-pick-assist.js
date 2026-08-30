import * as THREE from 'three';

const canvas=document.querySelector('#viewport');
const multiToggle=document.querySelector('#multiSelectToggle');
const status=document.querySelector('#selectionStatus');
const PICK_RADIUS_PX=24;
const TAP_MOVE_PX=12;
let press=null;

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mode(){return bridge()?.mode?.()||document.querySelector('#selectionModes button.active')?.dataset?.mode;}
function directToolActive(){return !!document.querySelector('#extrudeBtn.active,#insetBtn.active,#bevelBtn.active,#vertexBevelBtn.active,#loopCutBtn.active,#applyCreaseBtn.active,#addVertexBtn.active,#vertexSlideBtn.active,#edgeSlideBtn.active,#offsetLoopBtn.active,#bridgeEdgesBtn.active,#fillFaceBtn.active,#dissolveLoopBtn.active,#dissolveEdgeBtn.active,#deleteEdgeBtn.active,#addEdgeBtn.active,#connectVertexBtn.active,#weldVertexBtn.active,#deleteVertexBtn.active');}
function screenPoint(v,camera){const p=v.clone().project(camera),r=canvas.getBoundingClientRect();return{x:r.left+(p.x*.5+.5)*r.width,y:r.top+(-p.y*.5+.5)*r.height,z:p.z};}
function nearestVertex(event){const s=state(),mesh=s?.mesh,camera=s?.camera;if(!mesh||!camera)return null;let best=null;for(let i=0;i<mesh.vertices.length;i++){const p=screenPoint(mesh.vertices[i],camera);if(p.z<-1||p.z>1)continue;const dx=p.x-event.clientX,dy=p.y-event.clientY,d=Math.hypot(dx,dy);if(d>PICK_RADIUS_PX)continue;if(!best||d<best.d-.75||(Math.abs(d-best.d)<=.75&&p.z<best.z))best={i,d,z:p.z};}return best;}
function selected(){return [...new Set(bridge()?.indices?.()||[])];}
function applyPick(index){const current=selected(),has=current.includes(index),multi=!!multiToggle?.checked;let next;if(multi)next=has?current.filter(i=>i!==index):[...current,index];else next=has?[]:[index];bridge()?.set?.('vertex',next);if(status)status.textContent=next.length?`Vertex mode • ${next.length} selected`:'Vertex mode • nothing selected';}

document.addEventListener('pointerdown',event=>{if(event.target!==canvas||!event.isPrimary||event.pointerType==='touch'||mode()!=='vertex'||directToolActive())return;press={id:event.pointerId,x:event.clientX,y:event.clientY};},true);
document.addEventListener('pointerup',event=>{if(!press||press.id!==event.pointerId)return;const p=press;press=null;if(event.target!==canvas||mode()!=='vertex'||directToolActive())return;if(Math.hypot(event.clientX-p.x,event.clientY-p.y)>TAP_MOVE_PX)return;const hit=nearestVertex(event);if(!hit)return;event.preventDefault();event.stopImmediatePropagation();applyPick(hit.i);},true);
document.addEventListener('pointercancel',()=>{press=null;},true);
