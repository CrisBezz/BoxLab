// BoxLab v0.36.18.305 — Clean for SubD with bounded sixteen-triangle local retopo.

import { quadCleanMesh } from './quad-clean-core.js?v=0.36.18.305';

const button=document.querySelector('#quadCleanBtn');
const status=document.querySelector('#selectionStatus');

function manager(){return globalThis.__boxlabObjectManager;}
function liveMesh(){return globalThis.__boxlabBridgeState?.mesh||null;}
function activeObject(){const m=manager();return m?.objects?.find(o=>o.id===m.activeId)||null;}
function setStatus(text){if(status)status.textContent=text;}
function forceRender(){
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));
  window.dispatchEvent(new CustomEvent('boxlab-quad-clean',{detail:globalThis.__boxlabQuadCleanLastResult||null}));
}
function update(){
  const object=activeObject();
  if(button)button.disabled=!object||object.locked||object.kind==='reference';
}
button?.addEventListener('click',()=>{
  const object=activeObject(),mesh=liveMesh();
  if(!object||!mesh||object.locked||object.kind==='reference')return;
  const topology=globalThis.__boxlabTopology;
  const before=topology?.cloneMeshState?.(mesh)||{
    vertices:mesh.vertices.map(v=>v.clone()),faces:mesh.faces.map(f=>[...f]),creases:new Map(mesh.creases||[])
  };
  const result=quadCleanMesh(mesh);
  if(!result.ok){setStatus(result.reason||'Clean for SubD failed');return;}
  if(result.changed&&topology?.validateTopology){
    const validation=topology.validateTopology(mesh,{allowBoundary:true});
    if(!validation?.ok){
      if(topology.restoreMeshState)topology.restoreMeshState(mesh,before);
      else{mesh.vertices=before.vertices;mesh.faces=before.faces;mesh.creases=before.creases;}
      setStatus('Clean for SubD rolled back • topology guard rejected result');
      globalThis.__boxlabQuadCleanLastResult={...result,ok:false,rolledBack:true,reason:'topology-rejected'};
      forceRender();return;
    }
  }
  manager()?.saveActive?.();
  globalThis.__boxlabQuadCleanLastResult={version:'0.36.18.305',workflow:'clean-for-subd',...result};
  if(result.changed){
    const parts=[];
    if(result.fanRepairs)parts.push(`${result.fanRepairs} quad fan${result.fanRepairs===1?'':'s'} repaired`);
    if(result.removedVertices)parts.push(`${result.removedVertices} redundant vert${result.removedVertices===1?'ex':'ices'} removed`);
    if(result.sliverRepairs)parts.push(`${result.sliverRepairs} sliver${result.sliverRepairs===1?'':'s'} repaired`);
    if(result.patchRepairs)parts.push(`${result.patchTriangles||0} tris in ${result.patchRepairs} local patch${result.patchRepairs===1?'':'es'} → quads`);
    if(result.patchRejected)parts.push(`${result.patchRejected} low-quality patch${result.patchRejected===1?'':'es'} preserved`);
    if(result.pairRejected)parts.push(`${result.pairRejected} context-poor pair${result.pairRejected===1?'':'s'} preserved`);
    if(result.merged)parts.push(`${result.merged} triangle pair${result.merged===1?'':'s'} → quads`);
    if(result.relaxedVertices)parts.push(`${result.relaxedVertices} flow-relaxed vert${result.relaxedVertices===1?'ex':'ices'}`);
    parts.push(`tris ${result.before.triangles}→${result.after.triangles}`);
    parts.push(`quads ${result.before.quads}→${result.after.quads}`);
    parts.push(`faces ${result.before.faces}→${result.after.faces}`);
    setStatus(`Clean for SubD • ${parts.join(' • ')}`);
  }else setStatus(`Clean for SubD • no safe repairs found • ${result.after.triangles} tris • ${result.after.quads} quads • ${result.after.ngons} ngons`);
  forceRender();
});

window.addEventListener('boxlab-object-manager-ready',update);
window.addEventListener('boxlab-bridge-state',update);
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(update)));
update();
