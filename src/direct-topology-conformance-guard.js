// BoxLab v0.36.18.235 — closed-shell guard for direct Inset / Extrude commits.
// Runs outside the proven Through kernel: repair boundary T-junctions or roll back cleanly.
import {gateClosedEdit,topologySummary} from './topology-seam-conformance.js?v=0.36.18.235.1';

const VERSION='0.36.18.235';
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
function restore(target,source){
  if(!target||!source)return false;
  target.vertices=source.vertices.map(v=>v?.clone?v.clone():{...v});
  target.faces=source.faces.map(f=>[...f]);
  target.creases=new Map(source.creases||[]);
  target.looseEdges=new Set(source.looseEdges||[]);
  target.looseVertices=new Set(source.looseVertices||[]);
  target.edges?.();
  return true;
}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function selectedFaces(){const b=bridge();return b?.mode?.()==='face'?[...new Set(b.indices?.()||[])]:[];}
function changed(before,after){
  if(!before||!after)return false;
  if(before.vertices.length!==after.vertices.length||before.faces.length!==after.faces.length)return true;
  for(let i=0;i<before.vertices.length;i++){
    const a=before.vertices[i],b=after.vertices[i];
    if(!a||!b||Math.abs(a.x-b.x)>1e-12||Math.abs(a.y-b.y)>1e-12||Math.abs(a.z-b.z)>1e-12)return true;
  }
  for(let i=0;i<before.faces.length;i++){
    const a=before.faces[i],b=after.faces[i];
    if(a.length!==b.length||a.some((v,j)=>v!==b[j]))return true;
  }
  return false;
}
function begin(event){
  if(event.target!==canvas||!event.isPrimary)return;
  const tool=armedTool(),mesh=liveMesh();if(!tool||!mesh?.clone)return;
  const before=mesh.clone(),summary=topologySummary(before);
  if(!summary.closed){session=null;return;}
  const history=globalThis.__boxlabHistory;
  session={pointerId:event.pointerId,tool,mesh,before,faces:selectedFaces(),undo:history?.undoStack?.slice?.()||null,redo:history?.redoStack?.slice?.()||null};
}
function restoreHistory(snapshot){
  const history=globalThis.__boxlabHistory;if(!history||!snapshot)return;
  if(Array.isArray(snapshot.undo)&&Array.isArray(history.undoStack))history.undoStack.splice(0,history.undoStack.length,...snapshot.undo);
  if(Array.isArray(snapshot.redo)&&Array.isArray(history.redoStack))history.redoStack.splice(0,history.redoStack.length,...snapshot.redo);
}
function finish(event){
  if(!session||session.pointerId!==event.pointerId)return;
  const current=session;session=null;
  if(event.type!=='pointerup')return;
  queueMicrotask(()=>{
    const mesh=current.mesh;
    if(!mesh||!changed(current.before,mesh)){last={applied:false,repaired:false,splits:0,reason:'No committed geometry change'};return;}
    const gated=gateClosedEdit(current.before,mesh);
    last={applied:true,repaired:!!gated.repaired,splits:gated.splits||0,reason:gated.reason,before:gated.before,raw:gated.raw,after:gated.after};
    if(gated.ok){
      if(gated.repaired){
        restore(mesh,gated.mesh);render();
        if(status)status.textContent=`${current.tool==='inset'?'Inset':'Extrude'} • seam conformance • ${gated.splits} split${gated.splits===1?'':'s'} • CLOSED`;
      }
      return;
    }
    restore(mesh,current.before);restoreHistory(current);
    bridge()?.set?.('face',current.faces);render();
    if(status)status.textContent=`${current.tool==='inset'?'Inset':'Extrude'} • rollback • open topology refused`;
  });
}

window.addEventListener('pointerdown',begin,true);
window.addEventListener('pointerup',finish,true);
window.addEventListener('pointercancel',finish,true);

globalThis.__boxlabDirectTopologyConformanceGuard={version:VERSION,topologySummary,get last(){return last;}};
