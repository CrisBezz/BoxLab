// BoxLab v0.36.18.143 — Vertex/Edge Inspect + Repair containment.
// UI-only: groups existing diagnostic selectors under default-collapsed Inspect
// drawers and existing deterministic corrective controls under Repair.
// Existing tool handlers, topology logic, selection and History are untouched.

const VERSION='0.36.18.143';

function modeTools(mode){return document.querySelector(`[data-mode-tools="${mode}"]`);}

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

  // Match Face mode: normal modelling/topology controls stay first.
  // Inspect is appended after all real tools; Repair sits immediately after Inspect.
  if(type==='Inspect'){
    host.appendChild(details);
  }else{
    const inspect=document.querySelector(`#${mode}InspectDrawer`);
    if(inspect?.parentElement===host)inspect.insertAdjacentElement('afterend',details);
    else host.appendChild(details);
  }
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
  moveDiagnostics('vertex');
  moveDiagnostics('edge');
  moveVertexRepairs();
  syncEdgeRepair();

  // Reassert Face-style ordering after any moved diagnostic/repair rows.
  for(const mode of ['vertex','edge']){
    const host=modeTools(mode),inspect=document.querySelector(`#${mode}InspectDrawer`),repair=document.querySelector(`#${mode}RepairDrawer`);
    if(host&&inspect)host.appendChild(inspect);
    if(host&&repair)host.appendChild(repair);
  }
}

// Let legacy feature modules finish their own startup placement, then contain once.
setTimeout(sync,1900);
window.addEventListener('boxlab-bridge-state',()=>queueMicrotask(sync));
document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',()=>queueMicrotask(sync)));

globalThis.__boxlabComponentInspectRepairDrawers={version:VERSION,sync};
