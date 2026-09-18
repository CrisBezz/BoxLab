// BoxLab v0.36.18.290 — Object > Quad Clean UI.

import { quadCleanTrianglePairs } from './quad-clean-core.js?v=0.36.18.290';

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
  const result=quadCleanTrianglePairs(mesh);
  if(!result.ok){setStatus(result.reason||'Quad Clean failed');return;}
  if(result.changed&&topology?.validateTopology){
    const validation=topology.validateTopology(mesh,{allowBoundary:true});
    if(!validation?.ok){
      if(topology.restoreMeshState)topology.restoreMeshState(mesh,before);
      else{mesh.vertices=before.vertices;mesh.faces=before.faces;mesh.creases=before.creases;}
      setStatus('Quad Clean rolled back • topology guard rejected result');
      globalThis.__boxlabQuadCleanLastResult={...result,ok:false,rolledBack:true,reason:'topology-rejected'};
      forceRender();return;
    }
  }
  manager()?.saveActive?.();
  globalThis.__boxlabQuadCleanLastResult={version:'0.36.18.290',...result};
  if(result.changed)setStatus(`Quad Clean • ${result.merged} triangle pair${result.merged===1?'':'s'} → quads • triangles ${result.before.triangles}→${result.after.triangles} • quads ${result.before.quads}→${result.after.quads}`);
  else setStatus(`Quad Clean • no safe triangle pairs found • ${result.before.triangles} triangles • ${result.before.quads} quads`);
  forceRender();
});

window.addEventListener('boxlab-object-manager-ready',update);
window.addEventListener('boxlab-bridge-state',update);
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(update)));
update();
