// BoxLab v0.36.18.238 — capture-phase closed-shell integrity for direct Inset / Extrude / Through.
// Window capture runs before multi-face-direct's document-capture owner, then validates
// the actual committed live mesh after that event completes.
import {gateClosedEdit,topologySummary} from './topology-seam-conformance.js?v=0.36.18.236';

const VERSION='0.36.18.238';
const canvas=document.querySelector('#viewport');
const extrudeButton=document.querySelector('#extrudeBtn');
const insetButton=document.querySelector('#insetBtn');
const status=document.querySelector('#selectionStatus');
let session=null;
let last={applied:false,repaired:false,splits:0,reason:'Not run'};

function state(){return globalThis.__boxlabBridgeState||null;}
function bridge(){return globalThis.__boxlabSelectionBridge||null;}
function liveMesh(){return state()?.mesh||null;}
function armedTool(){
  if(extrudeButton?.classList.contains('boxlab-direct-stable')||extrudeButton?.classList.contains('active'))return'extrude';
  if(insetButton?.classList.contains('boxlab-direct-stable')||insetButton?.classList.contains('active'))return'inset';
  return null;
}
function selectedFaces(){const b=bridge();return b?.mode?.()==='face'?[...new Set(b.indices?.()||[])]:[];}
function cloneStack(stack){return Array.isArray(stack)?stack.map(item=>item?.clone?item.clone():item):null;}
function restoreHistory(snapshot){
  const h=globalThis.__boxlabHistory;if(!h||!snapshot)return;
  if(Array.isArray(snapshot.undo)&&Array.isArray(h.undoStack))h.undoStack.splice(0,h.undoStack.length,...cloneStack(snapshot.undo));
  if(Array.isArray(snapshot.redo)&&Array.isArray(h.redoStack))h.redoStack.splice(0,h.redoStack.length,...cloneStack(snapshot.redo));
}
function restore(target,source){
  if(!target||!source)return false;
  target.vertices=source.vertices.map(v=>v?.clone?v.clone():{...v});
  target.faces=source.faces.map(f=>[...f]);
  target.creases=new Map(source.creases||[]);
  target.looseEdges=new Set(source.looseEdges||[]);
  target.looseVertices=new Set(source.looseVertices||[]);
  target.edges?.();return true;
}
function changed(before,after){
  if(!before||!after)return false;
  if(before.vertices.length!==after.vertices.length||before.faces.length!==after.faces.length)return true;
  for(let i=0;i<before.vertices.length;i++){
    const a=before.vertices[i],b=after.vertices[i];
    if(!a||!b||Math.abs(a.x-b.x)>1e-12||Math.abs(a.y-b.y)>1e-12||Math.abs(a.z-b.z)>1e-12)return true;
  }
  for(let i=0;i<before.faces.length;i++){
    const a=before.faces[i],b=after.faces[i];if(a.length!==b.length||a.some((v,j)=>v!==b[j]))return true;
  }
  return false;
}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function begin(event){
  if(event.target!==canvas||!event.isPrimary)return;
  const tool=armedTool(),mesh=liveMesh();if(!tool||!mesh?.clone)return;
  const before=mesh.clone(),summary=topologySummary(before);
  if(!summary.closed){session=null;return;}
  const h=globalThis.__boxlabHistory;
  session={pointerId:event.pointerId,tool,mesh,before,faces:selectedFaces(),undo:cloneStack(h?.undoStack),redo:cloneStack(h?.redoStack)};
}
function validate(current){
  const mesh=liveMesh();
  if(!mesh||mesh!==current.mesh||!changed(current.before,mesh)){
    last={applied:false,repaired:false,splits:0,reason:'No committed geometry change'};return;
  }
  const raw=topologySummary(mesh);
  if(raw.closed){last={applied:true,repaired:false,splits:0,reason:'Committed result closed',raw};return;}
  const gated=gateClosedEdit(current.before,mesh);
  last={applied:true,repaired:!!gated.repaired,splits:gated.splits||0,reason:gated.reason,before:gated.before,raw:gated.raw||raw,after:gated.after};
  if(gated.ok&&gated.after?.closed){
    restore(mesh,gated.mesh);render();globalThis.__boxlabTopologyGate?.sync?.();
    if(status)status.textContent=`${current.tool==='inset'?'Inset':'Extrude Through'} • direct seam conformance • ${gated.splits||0} split${gated.splits===1?'':'s'} • CLOSED`;
    return;
  }
  restore(mesh,current.before);restoreHistory(current);bridge()?.set?.('face',current.faces);render();globalThis.__boxlabTopologyGate?.sync?.();
  if(status)status.textContent=`${current.tool==='inset'?'Inset':'Extrude Through'} • rollback • open topology refused`;
}
function finish(event){
  if(!session||session.pointerId!==event.pointerId)return;
  const current=session;session=null;
  if(event.type!=='pointerup')return;
  queueMicrotask(()=>validate(current));
}

window.addEventListener('pointerdown',begin,true);
window.addEventListener('pointerup',finish,true);
window.addEventListener('pointercancel',finish,true);

globalThis.__boxlabDirectCommitIntegrity238={version:VERSION,topologySummary,get last(){return last;}};
