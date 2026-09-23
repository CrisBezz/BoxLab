import {analyzeMeshHealth} from './mesh-health-core.js?v=0.36.18.439';

const VERSION='0.36.18.439';
const objectTools=document.querySelector('.mode-tools[data-mode-tools="object"]');
const status=document.querySelector('#selectionStatus');

const launchRow=document.createElement('div');
launchRow.className='outliner-actions mesh-health-launch-row';
launchRow.style.gridTemplateColumns='1fr';
launchRow.innerHTML='<button id="meshHealthBtn" type="button">Mesh Health</button>';
objectTools?.appendChild(launchRow);
const launchButton=launchRow.querySelector('#meshHealthBtn');

const panel=document.createElement('div');
panel.id='meshHealthSession';
panel.className='boxlab-tool-session-shell mesh-health-session';
panel.hidden=true;
panel.innerHTML=`
  <div class="boxlab-tool-session-title"><span>Mesh Health</span><span class="boxlab-tool-session-subtitle">Inspect · non-destructive</span></div>
  <div id="meshHealthVerdict" style="font-size:16px;font-weight:750;padding:4px 0"></div>
  <div id="meshHealthSummary" class="boxlab-tool-session-subtitle"></div>
  <div class="boxlab-tool-session-section">Topology</div>
  <div id="meshHealthTopology" style="display:grid;grid-template-columns:1fr auto;gap:4px 10px;font-size:11px"></div>
  <div class="boxlab-tool-session-section">Findings</div>
  <div id="meshHealthFindings" style="display:flex;flex-direction:column;gap:4px;font-size:11px"></div>
  <div class="outliner-actions" style="grid-template-columns:repeat(2,1fr)">
    <button id="meshHealthRefresh" type="button">Refresh</button>
    <button id="meshHealthClose" class="boxlab-tool-session-primary" type="button">Close</button>
  </div>
`;
objectTools?.appendChild(panel);

const verdict=panel.querySelector('#meshHealthVerdict');
const summary=panel.querySelector('#meshHealthSummary');
const topology=panel.querySelector('#meshHealthTopology');
const findings=panel.querySelector('#meshHealthFindings');
const refreshButton=panel.querySelector('#meshHealthRefresh');
const closeButton=panel.querySelector('#meshHealthClose');
let active=false,last=null,objectId=null;

function manager(){return globalThis.__boxlabObjectManager;}
function toolSession(){return globalThis.__boxlabToolSession;}
function currentMode(){return document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
function activeObject(){const m=manager();return m?.objects?.find(o=>o.id===m.activeId)||null;}
function liveMesh(){return globalThis.__boxlabBridgeState?.mesh||null;}
function setStatus(text){if(status)status.textContent=text;}
function addMetric(label,value){
  const a=document.createElement('span'),b=document.createElement('strong');
  a.textContent=label;b.textContent=String(value);
  topology.append(a,b);
}
function addFinding(kind,item){
  const row=document.createElement('div');
  row.dataset.healthKind=kind;
  row.textContent=`${kind==='issue'?'⚠':'•'} ${item.label}: ${item.count}`;
  findings.append(row);
}
function renderReport(){
  const object=activeObject(),mesh=liveMesh();
  if(!active||!object||object.id!==objectId||!mesh)return false;
  manager()?.saveActive?.();
  last=analyzeMeshHealth(mesh);
  verdict.textContent=last.label;
  verdict.dataset.healthState=last.state;
  summary.textContent=`${object.name} · ${last.vertices} verts · ${last.faces} faces · ${last.edges} edges`;
  topology.replaceChildren();
  addMetric('Triangles',last.triangles);addMetric('Quads',last.quads);addMetric('Ngons',last.ngons);
  addMetric('Boundary edges',last.boundaryEdges);addMetric('Non-manifold edges',last.nonManifoldEdges);
  addMetric('Orphan vertices',last.orphanVertices);
  findings.replaceChildren();
  for(const item of last.issues)addFinding('issue',item);
  for(const item of last.warnings)addFinding('warning',item);
  if(!last.issues.length&&!last.warnings.length){
    const row=document.createElement('div');row.textContent='✓ No topology findings';findings.append(row);
  }
  setStatus(`Mesh Health • ${object.name} • ${last.label} • ${last.boundaryEdges} boundary • ${last.nonManifoldEdges} non-manifold`);
  return true;
}
function close(){
  if(!active)return;
  active=false;objectId=null;panel.hidden=true;toolSession()?.end?.('mesh-health');
  setStatus('Mesh Health closed • no geometry changed');
}
function launch(){
  const object=activeObject(),mesh=liveMesh();
  if(currentMode()!=='object'||!object||!mesh)return;
  objectId=object.id;active=true;panel.hidden=false;
  toolSession()?.begin?.({id:'mesh-health',title:'Mesh Health',node:panel,subtitle:'Non-destructive topology inspection'});
  renderReport();
}
launchButton?.addEventListener('click',launch);
refreshButton?.addEventListener('click',renderReport);
closeButton?.addEventListener('click',close);
window.addEventListener('boxlab-bridge-state',()=>{
  if(!active)return;
  const object=activeObject();
  if(currentMode()!=='object'||!object||object.id!==objectId)close();
});
document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',()=>{if(active&&currentMode()!=='object')close();}));

globalThis.__boxlabMeshHealth={version:VERSION,analyze:analyzeMeshHealth,get active(){return active;},get last(){return last;},refresh:renderReport,close};
