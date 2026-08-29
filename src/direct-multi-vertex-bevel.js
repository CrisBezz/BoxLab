import * as THREE from 'three';

const button=document.querySelector('#vertexBevelBtn'), canvas=document.querySelector('#viewport'), width=document.querySelector('#vertexBevelWidth'), out=document.querySelector('#vertexBevelWidthOut'), multiToggle=document.querySelector('#multiSelectToggle'), status=document.querySelector('#selectionStatus');
const PICK_PX=20;
let armed=false, drag=null;

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function selectedVertexIds(){const b=bridge();return b?.mode?.()==='vertex'?[...(b.indices?.()||[])]:[];}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function restore(mesh,snapshot){mesh.vertices=snapshot.vertices.map(v=>v.clone());mesh.faces=snapshot.faces.map(f=>[...f]);mesh.creases=new Map(snapshot.creases);if(snapshot.looseEdges instanceof Set)mesh.looseEdges=new Set(snapshot.looseEdges);if(snapshot.looseVertices instanceof Set)mesh.looseVertices=new Set(snapshot.looseVertices);mesh.edges?.();}
function screenPoint(v,camera){const p=v.clone().project(camera),r=canvas.getBoundingClientRect();return new THREE.Vector2(r.left+(p.x*.5+.5)*r.width,r.top+(-p.y*.5+.5)*r.height);}
function hitVertex(event){const s=state(),mesh=s?.mesh,camera=s?.camera;if(!mesh||!camera)return null;const p=new THREE.Vector2(event.clientX,event.clientY);let best=null;mesh.vertices.forEach((v,index)=>{const q=screenPoint(v,camera),d=q.distanceTo(p);if(d<=PICK_PX&&(!best||d<best.distance))best={index,distance:d};});return best?.index??null;}
function disarm(){armed=false;drag=null;button?.classList.remove('active');}

button?.addEventListener('click',event=>{
  event.preventDefault();event.stopImmediatePropagation();
  armed=!armed;
  if(armed&&bridge()?.mode?.()!=='vertex')document.querySelector('#selectionModes button[data-mode="vertex"]')?.click();
  button.classList.toggle('active',armed);
  const count=selectedVertexIds().length,useMulti=!!multiToggle?.checked&&count>1;
  if(status)status.textContent=armed?(useMulti?`Bevel ${count} vertices • drag any selected vertex`:'Bevel Vertex • drag a vertex'):'Vertex mode';
},true);

document.addEventListener('click',event=>{if(!armed||!event.isTrusted||event.target?.closest?.('#vertexBevelBtn'))return;if(event.target?.closest?.('button'))disarm();},true);

canvas?.addEventListener('pointerdown',event=>{
  if(!armed||!event.isPrimary)return;
  const mesh=state()?.mesh,index=hitVertex(event);if(!mesh||!Number.isInteger(index))return;
  event.preventDefault();event.stopImmediatePropagation();
  const existing=selectedVertexIds(),useMulti=!!multiToggle?.checked&&existing.length>1&&existing.includes(index),ids=useMulti?existing:[index];
  if(!useMulti)bridge()?.set?.('vertex',[index]);
  const valid=mesh.multiVertexBevelInfo?.(ids);
  if(!valid){if(status)status.textContent=ids.length>1?'Selected vertices cannot be bevelled together':'This vertex cannot be bevelled';return;}
  drag={pointerId:event.pointerId,startX:event.clientX,startWidth:Number(width?.value||20),mesh,before:mesh.clone(),ids:[...valid.ids],preview:false};
  canvas.setPointerCapture?.(event.pointerId);
},true);

canvas?.addEventListener('pointermove',event=>{
  if(!drag||drag.pointerId!==event.pointerId)return;
  event.preventDefault();event.stopImmediatePropagation();
  const value=Math.max(2,Math.min(49,drag.startWidth+(event.clientX-drag.startX)*.25)),amount=Math.round(value);
  if(width)width.value=String(amount);if(out)out.textContent=`${amount}%`;
  restore(drag.mesh,drag.before);
  drag.preview=!!drag.mesh.bevelVertices?.(drag.ids,amount/100);
  if(status)status.textContent=drag.preview?`Vertex Bevel • ${drag.ids.length} vert${drag.ids.length===1?'ex':'ices'} • ${amount}%`:(drag.ids.length>1?'Selected vertices cannot be bevelled together':'This vertex cannot be bevelled');
  render();
},true);

function end(event){
  if(!drag||drag.pointerId!==event.pointerId)return;
  event.preventDefault();event.stopImmediatePropagation();
  const current=drag;drag=null;
  if(current.preview&&event.type==='pointerup')globalThis.__boxlabHistory?.push(current.before);else restore(current.mesh,current.before);
  bridge()?.set?.('vertex',[]);
  if(status)status.textContent=armed?'Bevel Vertex • drag a vertex':'Vertex mode';
  render();
}
canvas?.addEventListener('pointerup',end,true);canvas?.addEventListener('pointercancel',end,true);
