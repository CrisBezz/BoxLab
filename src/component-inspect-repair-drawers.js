// BoxLab v0.36.18.173 — Vertex/Edge Mesh Health + Inspect + Repair containment.
// UI-only: normal modelling/topology tools stay first, followed by Mesh Health,
// Inspect and Repair. Mesh Health findings can hand off to existing Inspect selectors.

const VERSION='0.36.18.173';

function modeTools(mode){return document.querySelector(`[data-mode-tools="${mode}"]`);}

function ensureHealth(mode){
  const host=modeTools(mode);if(!host)return null;
  const id=`${mode}MeshHealthSummary`;
  let details=document.querySelector(`#${id}`);if(details)return details;
  details=document.createElement('details');
  details.id=id;details.open=false;
  details.style.cssText='margin:6px 0 4px;border:1px solid rgba(255,255,255,.08);border-radius:5px;background:rgba(255,255,255,.025)';
  const summary=document.createElement('summary');
  summary.id=`${id}Label`;
  summary.textContent='MESH HEALTH';
  summary.style.cssText='cursor:pointer;list-style:none;padding:6px 7px;font-size:10px;letter-spacing:.3px;user-select:none';
  const body=document.createElement('div');
  body.id=`${id}Body`;
  body.style.cssText='padding:0 7px 7px;font-size:10px;line-height:1.45;opacity:.88';
  details.append(summary,body);
  host.appendChild(details);
  details.addEventListener('toggle',()=>{if(details.open)syncHealth(mode,true);});
  return details;
}

function healthRow(text,muted=false){
  const div=document.createElement('div');div.textContent=text;if(muted)div.style.opacity='.62';return div;
}
function healthFindingRow(item,muted=false){
  const inspectFinding=globalThis.__boxlabMeshHealth?.inspectFinding;
  if(!item?.actionable||typeof inspectFinding!=='function')return healthRow(`${item?.kind==='issue'?'⚠':'•'} ${item?.count||0} ${item?.label||''}`,muted);
  const button=document.createElement('button');
  button.type='button';button.textContent=`${item.kind==='issue'?'⚠':'•'} ${item.count} ${item.label} ›`;
  button.title=`Select ${item.label.toLowerCase()} in Inspect`;
  button.style.cssText='display:block;width:100%;border:0;background:transparent;color:inherit;font:inherit;text-align:left;padding:1px 0;cursor:pointer';
  if(muted)button.style.opacity='.72';
  button.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();inspectFinding(item.id);});
  return button;
}

function appendTopology(body,info){
  const t=info?.topology;if(!t)return;
  body.appendChild(healthRow(`${t.vertices} verts • ${t.edges} edges • ${t.faces} faces`,true));
  body.appendChild(healthRow(`${t.boundaryEdges} boundary edges`,true));
}

function renderHealth(mode,info){
  const details=ensureHealth(mode);if(!details)return false;
  const label=details.querySelector(`#${mode}MeshHealthSummaryLabel`);
  const body=details.querySelector(`#${mode}MeshHealthSummaryBody`);
  if(!label||!body)return false;
  body.replaceChildren();
  if(!info?.available){label.textContent='MESH HEALTH';body.appendChild(healthRow('No editable mesh',true));return true;}
  const issueText=info.issueCount===1?'1 issue':`${info.issueCount} issues`;
  const warningText=info.warningCount===1?'1 warning':`${info.warningCount} warnings`;
  if(info.issueCount)label.textContent=`MESH HEALTH • ${issueText}`;
  else if(info.warningCount)label.textContent=`MESH HEALTH • ${warningText}`;
  else label.textContent='MESH HEALTH • CLEAN';
  appendTopology(body,info);
  if(!info.totalFindings){body.appendChild(healthRow('✓ No recognised mesh-health issues',true));return true;}
  info.issues?.forEach(item=>body.appendChild(healthFindingRow(item)));
  info.warnings?.forEach(item=>body.appendChild(healthFindingRow(item,true)));
  return true;
}

function syncHealth(mode,force=false){
  const details=ensureHealth(mode);if(!details)return false;
  if(!force&&!details.open)return false;
  const inspect=globalThis.__boxlabMeshHealth?.inspect;
  if(!inspect)return renderHealth(mode,{available:false});
  let info=null;
  try{info=inspect();}catch(error){console.warn(`[${mode} Mesh Health] inspect failed`,error);}
  return renderHealth(mode,info||{available:false});
}

function ensureDrawer(mode,type){
  const host=modeTools(mode);if(!host)return null;
  const id=`${mode}${type}Drawer`;
  let details=document.querySelector(`#${id}`);if(details)return details;
  details=document.createElement('details');
  details.id=id;details.open=false;
  details.style.cssText='margin:6px 0 4px;border:1px solid rgba(255,255,255,.08);border-radius:5px;background:rgba(255,255,255,.02)';
  const summary=document.createElement('summary');
  summary.id=`${id}Label`;
  summary.textContent=type.toUpperCase();
  summary.style.cssText='cursor:pointer;list-style:none;padding:6px 7px;font-size:10px;letter-spacing:.3px;user-select:none';
  const body=document.createElement('div');
  body.id=`${id}Body`;body.style.cssText='padding:0 6px 6px';
  details.append(summary,body);
  host.appendChild(details);
  return details;
}

function diagnosticRoots(mode){
  const host=modeTools(mode),drawer=document.querySelector(`#${mode}InspectDrawer`);
  if(!host)return[];
  const roots=[];
  for(const button of host.querySelectorAll('button[id^="select"]')){
    if(drawer?.contains(button))continue;
    let node=button.closest('.outliner-actions')||button.parentElement;
    if(!node||node===host||drawer?.contains(node))continue;
    while(node.parentElement&&node.parentElement!==host&&node.parentElement!==drawer){
      const parent=node.parentElement;
      if(parent.classList?.contains('mode-tools'))break;
      node=parent;
    }
    if(node?.parentElement===host&&!roots.includes(node))roots.push(node);
  }
  return roots;
}

function moveDiagnostics(mode){
  const drawer=ensureDrawer(mode,'Inspect');
  const body=drawer?.querySelector(`#${mode}InspectDrawerBody`);
  if(!drawer||!body)return 0;
  for(const root of diagnosticRoots(mode))body.appendChild(root);
  body.querySelectorAll('.outliner-actions').forEach(row=>{
    row.style.setProperty('margin-top',row.style.marginTop||'4px');
    row.querySelectorAll('button').forEach(button=>button.style.setProperty('min-width','0'));
  });
  const count=body.querySelectorAll('button[id^="select"]').length;
  const label=drawer.querySelector(`#${mode}InspectDrawerLabel`);
  if(label)label.textContent=count?`INSPECT • ${count}`:'INSPECT';
  return count;
}

function ensureRepairBody(mode){
  const drawer=ensureDrawer(mode,'Repair');
  return drawer?.querySelector(`#${mode}RepairDrawerBody`)||null;
}

function repairSection(body,id,label){
  if(!body)return null;
  let section=body.querySelector(`#${id}`);if(section)return section;
  section=document.createElement('div');section.id=id;section.style.cssText='margin-top:5px';
  const title=document.createElement('div');title.textContent=label;
  title.style.cssText='font-size:9px;line-height:1.1;letter-spacing:.35px;opacity:.55;margin:0 0 4px 1px';
  section.appendChild(title);body.appendChild(section);return section;
}

function moveVertexRepairs(){
  const drawer=ensureDrawer('vertex','Repair'),body=ensureRepairBody('vertex');
  if(!drawer||!body)return 0;
  const cleanup=repairSection(body,'vertexRepairCleanup','CLEANUP');
  const cleanButton=document.querySelector('#cleanVerticesBtn');
  const cleanHost=cleanButton?.parentElement;
  if(cleanHost&&cleanHost!==cleanup&&!cleanup.contains(cleanHost))cleanup.appendChild(cleanHost);
  const mergeRow=document.querySelector('#mergeByDistanceRow');
  if(mergeRow&&mergeRow.parentElement!==cleanup)cleanup.appendChild(mergeRow);
  cleanup.querySelectorAll('button,input').forEach(node=>node.style?.setProperty?.('min-width','0'));
  const count=body.querySelectorAll('button').length;
  const label=drawer.querySelector('#vertexRepairDrawerLabel');
  if(label)label.textContent=count?`REPAIR • ${count}`:'REPAIR';
  return count;
}

function syncEdgeRepair(){
  const drawer=ensureDrawer('edge','Repair'),body=ensureRepairBody('edge');
  if(!drawer||!body)return;
  let note=body.querySelector('#edgeRepairEmptyNote');
  if(!note){
    note=document.createElement('div');note.id='edgeRepairEmptyNote';
    note.textContent='No safe automatic edge repairs yet';
    note.style.cssText='font-size:10px;opacity:.5;padding:5px 1px 2px';
    body.appendChild(note);
  }
  const label=drawer.querySelector('#edgeRepairDrawerLabel');if(label)label.textContent='REPAIR';
}

function sync(){
  for(const mode of ['vertex','edge'])ensureHealth(mode);
  moveDiagnostics('vertex');
  moveDiagnostics('edge');
  moveVertexRepairs();
  syncEdgeRepair();

  // Face-style order: real tools first, then Mesh Health, Inspect, Repair.
  for(const mode of ['vertex','edge']){
    const host=modeTools(mode);
    const health=document.querySelector(`#${mode}MeshHealthSummary`);
    const inspect=document.querySelector(`#${mode}InspectDrawer`);
    const repair=document.querySelector(`#${mode}RepairDrawer`);
    if(host&&health)host.appendChild(health);
    if(host&&inspect)host.appendChild(inspect);
    if(host&&repair)host.appendChild(repair);
    if(health?.open)syncHealth(mode,true);
  }
}

// Let legacy feature modules finish their own startup placement, then contain once.
setTimeout(sync,1900);
window.addEventListener('boxlab-bridge-state',()=>queueMicrotask(sync));
document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',()=>queueMicrotask(sync)));

globalThis.__boxlabComponentInspectRepairDrawers={version:VERSION,sync,syncHealth};
