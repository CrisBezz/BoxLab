import * as THREE from 'three';
import {createFaceBevelPreview,disposeFaceBevelPreview} from './bevel-face-preview.js?v=0.36.18.716';

const button=document.querySelector('#vertexBevelBtn'), canvas=document.querySelector('#viewport'), width=document.querySelector('#vertexBevelWidth'), out=document.querySelector('#vertexBevelWidthOut'), multiToggle=document.querySelector('#multiSelectToggle'), status=document.querySelector('#selectionStatus');
const PICK_PX=20;
let armed=false, drag=null, popupPreview=false, preview=null;

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function selectedVertexIds(){const b=bridge();return b?.mode?.()==='vertex'?[...(b.indices?.()||[])]:[];}
function syncButton(){button?.classList.toggle('active',armed);}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));queueMicrotask(syncButton);}
function restore(mesh,snapshot){mesh.vertices=snapshot.vertices.map(v=>v.clone());mesh.faces=snapshot.faces.map(f=>[...f]);mesh.faceGroups=[...snapshot.faceGroups];mesh.creases=new Map(snapshot.creases);if(snapshot.looseEdges instanceof Set)mesh.looseEdges=new Set(snapshot.looseEdges);if(snapshot.looseVertices instanceof Set)mesh.looseVertices=new Set(snapshot.looseVertices);mesh.edges?.();}
function screenPoint(v,camera){const p=v.clone().project(camera),r=canvas.getBoundingClientRect();return new THREE.Vector2(r.left+(p.x*.5+.5)*r.width,r.top+(-p.y*.5+.5)*r.height);}
function hitVertex(event){const s=state(),mesh=s?.mesh,camera=s?.camera;if(!mesh||!camera)return null;const p=new THREE.Vector2(event.clientX,event.clientY);let best=null;mesh.vertices.forEach((v,index)=>{const q=screenPoint(v,camera),d=q.distanceTo(p);if(d<=PICK_PX&&(!best||d<best.distance))best={index,distance:d};});return best?.index??null;}
function disarm(){
  discardPreview();popupPreview=false;
  if(drag){const d=drag;drag=null;if(dragSourceOwned(d))restore(d.mesh,d.before);try{canvas.releasePointerCapture?.(d.pointerId);}catch{}render();}
  armed=false;syncButton();
}
// Use the existing Vertex kernel and the same blue preview renderer as Face.
function discardPreview(){disposeFaceBevelPreview(preview?.ghost);preview=null;}
function selectionKey(){return selectedVertexIds().slice().sort((a,b)=>a-b).join(',');}
function unchanged(a=preview?.before,b=preview?.mesh){
  return !!(a&&b&&a.vertices.length===b.vertices.length&&a.faces.length===b.faces.length
    &&a.vertices.every((v,i)=>v.equals(b.vertices[i]))
    &&a.faces.every((f,i)=>f.length===b.faces[i]?.length&&f.every((v,j)=>v===b.faces[i][j]))
    &&a.faceGroups.length===b.faceGroups.length&&a.faceGroups.every((group,i)=>group===b.faceGroups[i])
    &&a.creases.size===b.creases.size&&[...a.creases].every(([k,v])=>b.creases.get(k)===v));
}
// A live drag may roll back only the last values it produced, never a newer edit.
function dragSourceOwned(d){
  return !!(d&&unchanged(d.owned||d.before,d.mesh)
    &&['looseEdges','looseVertices'].every(key=>((d.owned||d.before)[key]?.size||0)===(d.mesh[key]?.size||0)
      &&[...((d.owned||d.before)[key]||[])].every(value=>d.mesh[key]?.has(value))));
}
function editable(){return !document.querySelector('#app')?.classList?.contains('boxlab-active-locked');}
function dragContextValid(){
  return !!(drag&&editable()&&state()?.mesh===drag.mesh&&bridge()?.mode?.()==='vertex'
    &&globalThis.__boxlabObjectManager?.activeId===drag.object&&dragSourceOwned(drag));
}
function previewWidth(value=Number(width?.value||20)){
  discardPreview();
  const mesh=state()?.mesh,ids=selectedVertexIds();
  if(!popupPreview||drag||!armed||document.querySelector('#app')?.classList?.contains('boxlab-active-locked'))return{ok:false};
  const valid=mesh?.multiVertexBevelInfo?.(ids),percent=Math.max(2,Math.min(49,Number(value)));
  if(!valid||!Number.isFinite(percent))return{ok:false,reason:'Select valid Vertex/Vertices'};
  const before=mesh.clone(),candidate=before.clone(),ok=!!candidate.bevelVertices?.(valid.ids,percent/100);
  preview={mesh,before,candidate,ids:[...valid.ids],key:selectionKey(),object:globalThis.__boxlabObjectManager?.activeId,
    result:{ok,percent,reason:ok?'':'Vertex preview unavailable'},ghost:ok?createFaceBevelPreview(state()?.scene,candidate,before):null};
  return preview.result;
}
function syncPreview(){
  if(drag)return;
  if(preview&&(state()?.mesh!==preview.mesh||globalThis.__boxlabObjectManager?.activeId!==preview.object||!unchanged())){discardPreview();return;}
  if(!preview||preview.key!==selectionKey())previewWidth();
}
function applyPreview(value){
  if(drag)return{ok:false,reason:'Release the Pencil before applying'};
  if(preview&&(state()?.mesh!==preview.mesh||globalThis.__boxlabObjectManager?.activeId!==preview.object||!unchanged())){discardPreview();return{ok:false,reason:'Geometry changed; preview again'};}
  const result=previewWidth(value);
  if(!result.ok||!globalThis.__boxlabHistory)return{ok:false,reason:result.reason||'History unavailable'};
  const saved=preview;
  globalThis.__boxlabHistory.push(saved.before);restore(saved.mesh,saved.candidate);
  discardPreview();bridge()?.set?.('vertex',[]);render();
  return result;
}
for(const type of ['input','change'])width?.addEventListener(type,()=>{if(popupPreview&&!drag)previewWidth();});
function updateStatus(){const count=selectedVertexIds().length,useMulti=!!multiToggle?.checked&&count>1;if(status)status.textContent=armed?(useMulti?`Bevel ${count} vertices • drag any selected vertex`:'Bevel Vertex • drag a vertex'):'Vertex mode';}

// Capture at document level so the legacy main.js button handler never gets a
// chance to clear Multi or the selected vertices before this direct tool arms.
document.addEventListener('click',event=>{
  const bevelButton=event.target?.closest?.('#vertexBevelBtn');
  if(bevelButton){
    event.preventDefault();event.stopImmediatePropagation();
    if(bridge()?.mode?.()!=='vertex')document.querySelector('#selectionModes button[data-mode="vertex"]')?.click();
    armed=!armed;syncButton();updateStatus();
    return;
  }
  if(!armed||!event.isTrusted)return;
  if(event.target?.closest?.('#vertexToolViewportSession'))return;
  if(event.target?.closest?.('button'))disarm();
},true);

canvas?.addEventListener('pointerdown',event=>{
  if(!armed||!event.isPrimary||!editable()||bridge()?.mode?.()!=='vertex')return;
  const mesh=state()?.mesh,index=hitVertex(event);if(!mesh||!Number.isInteger(index))return;
  event.preventDefault();event.stopImmediatePropagation();
  const existing=selectedVertexIds(),useMulti=!!multiToggle?.checked&&existing.length>1&&existing.includes(index),ids=useMulti?existing:[index];
  if(!useMulti)bridge()?.set?.('vertex',[index]);
  const valid=mesh.multiVertexBevelInfo?.(ids);
  if(!valid){if(status)status.textContent=ids.length>1?'Selected vertices cannot be bevelled together':'This vertex cannot be bevelled';return;}
  discardPreview();
  drag={pointerId:event.pointerId,startX:event.clientX,startWidth:Number(width?.value||20),mesh,before:mesh.clone(),ids:[...valid.ids],object:globalThis.__boxlabObjectManager?.activeId,preview:false};
  canvas.setPointerCapture?.(event.pointerId);
},true);

canvas?.addEventListener('pointermove',event=>{
  if(!drag||drag.pointerId!==event.pointerId)return;
  event.preventDefault();event.stopImmediatePropagation();
  if(!dragContextValid()){disarm();return;}
  const value=Math.max(2,Math.min(49,drag.startWidth+(event.clientX-drag.startX)*.25)),amount=Math.round(value);
  if(width)width.value=String(amount);if(out)out.textContent=`${amount}%`;
  restore(drag.mesh,drag.before);
  drag.preview=!!drag.mesh.bevelVertices?.(drag.ids,amount/100);
  drag.owned=drag.mesh.clone();
  if(status)status.textContent=drag.preview?`Vertex Bevel • ${drag.ids.length} vert${drag.ids.length===1?'ex':'ices'} • ${amount}%`:(drag.ids.length>1?'Selected vertices cannot be bevelled together':'This vertex cannot be bevelled');
  render();
},true);

function end(event){
  if(!drag||drag.pointerId!==event.pointerId)return;
  event.preventDefault();event.stopImmediatePropagation();
  if(!dragContextValid()){disarm();return;}
  const current=drag;drag=null;
  try{canvas.releasePointerCapture?.(current.pointerId);}catch{}
  if(current.preview&&event.type==='pointerup')globalThis.__boxlabHistory?.push(current.before);else restore(current.mesh,current.before);
  bridge()?.set?.('vertex',event.type==='pointerup'&&current.preview?[]:current.ids);
  updateStatus();render();
  window.dispatchEvent(new CustomEvent('boxlab-vertex-tool-complete',{detail:{tool:'Bevel',committed:current.preview&&event.type==='pointerup'}}));
}
canvas?.addEventListener('pointerup',end,true);canvas?.addEventListener('pointercancel',end,true);

// Public lifecycle used by contextual controls; this remains the drag owner.
globalThis.__boxlabDirectVertexBevel={version:'0.36.18.710',isArmed:()=>armed,busy:()=>!!drag,disarm,previewWidth,syncPreview,applyPreview,previewState:()=>preview?.result||null,setPopupPreview:value=>{popupPreview=!!value;if(popupPreview)previewWidth();else discardPreview();},info:()=>state()?.mesh?.multiVertexBevelInfo?.(selectedVertexIds())};
