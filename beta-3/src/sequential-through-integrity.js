// BoxLab v0.36.18.237 — final-state integrity watchdog for persistent Extrude/Through.
// Runs after the existing direct-tool commit path. Any Extrude that begins from a
// closed shell must finish closed/manifold, be safely conformed, or be rolled back.
import {gateClosedEdit,topologySummary} from './topology-seam-conformance.js?v=0.36.18.236';

const VERSION='0.36.18.237';
const canvas=document.querySelector('#viewport');
const extrudeButton=document.querySelector('#extrudeBtn');
const status=document.querySelector('#selectionStatus');
let session=null;
let last={applied:false,repaired:false,splits:0,reason:'Not run'};

function state(){return globalThis.__boxlabBridgeState||null;}
function bridge(){return globalThis.__boxlabSelectionBridge||null;}
function liveMesh(){return state()?.mesh||null;}
function extrudeArmed(){return !!(extrudeButton?.classList.contains('boxlab-direct-stable')||extrudeButton?.classList.contains('active'));}
function selectedFaces(){const b=bridge();return b?.mode?.()==='face'?[...new Set(b.indices?.()||[])]:[];}
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
function restoreHistory(snapshot){
  const h=globalThis.__boxlabHistory;if(!h||!snapshot)return;
  if(Array.isArray(snapshot.undo)&&Array.isArray(h.undoStack))h.undoStack.splice(0,h.undoStack.length,...snapshot.undo);
  if(Array.isArray(snapshot.redo)&&Array.isArray(h.redoStack))h.redoStack.splice(0,h.redoStack.length,...snapshot.redo);
}
function begin(event){
  if(event.target!==canvas||!event.isPrimary||!extrudeArmed())return;
  const mesh=liveMesh();if(!mesh?.clone)return;
  const before=mesh.clone(),summary=topologySummary(before);
  if(!summary.closed){session=null;return;}
  const h=globalThis.__boxlabHistory;
  session={pointerId:event.pointerId,mesh,before,faces:selectedFaces(),undo:h?.undoStack?.slice?.()||null,redo:h?.redoStack?.slice?.()||null};
}
function validate(current){
  const mesh=current.mesh;
  if(!mesh||mesh!==liveMesh()||!changed(current.before,mesh))return;
  const raw=topologySummary(mesh);
  if(raw.closed){last={applied:true,repaired:false,splits:0,reason:'Final Extrude result closed',raw};return;}
  const gated=gateClosedEdit(current.before,mesh);
  last={applied:true,repaired:!!gated.repaired,splits:gated.splits||0,reason:gated.reason,before:gated.before,raw:gated.raw||raw,after:gated.after};
  if(gated.ok&&gated.after?.closed){
    restore(mesh,gated.mesh);render();globalThis.__boxlabTopologyGate?.sync?.();
    if(status)status.textContent=`Extrude Through • final seam conformance • ${gated.splits||0} split${gated.splits===1?'':'s'} • CLOSED`;
    return;
  }
  restore(mesh,current.before);restoreHistory(current);bridge()?.set?.('face',current.faces);render();globalThis.__boxlabTopologyGate?.sync?.();
  if(status)status.textContent='Extrude Through • rollback • sequential cut would open mesh';
}
function finish(event){
  if(!session||session.pointerId!==event.pointerId)return;
  const current=session;session=null;
  if(event.type!=='pointerup')return;
  // Wait until the direct controller and any same-event microtasks have completed,
  // then validate the actual final live mesh rather than the drag preview.
  setTimeout(()=>validate(current),0);
}

window.addEventListener('pointerdown',begin,true);
window.addEventListener('pointerup',finish,true);
window.addEventListener('pointercancel',finish,true);

globalThis.__boxlabSequentialThroughIntegrity={version:VERSION,topologySummary,get last(){return last;}};
