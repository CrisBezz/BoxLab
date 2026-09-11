// BoxLab v0.36.18.138 — Face Inspect drawer containment.
// UI-only: collects existing Face selection/diagnostic helpers into one
// default-collapsed Inspect drawer. Existing detector and selection handlers
// remain untouched; modelling and repair controls are deliberately excluded.

const VERSION='0.36.18.138';
const faceTools=document.querySelector('[data-mode-tools="face"]');

function ensureDrawer(){
  if(!faceTools)return null;
  let details=document.querySelector('#faceInspectDrawer');
  if(details)return details;

  details=document.createElement('details');
  details.id='faceInspectDrawer';
  details.open=false;
  details.style.cssText='margin:6px 0 4px;border:1px solid rgba(255,255,255,.08);border-radius:5px;background:rgba(255,255,255,.02)';

  const summary=document.createElement('summary');
  summary.id='faceInspectDrawerLabel';
  summary.textContent='INSPECT';
  summary.style.cssText='cursor:pointer;list-style:none;padding:6px 7px;font-size:10px;letter-spacing:.3px;user-select:none';

  const body=document.createElement('div');
  body.id='faceInspectDrawerBody';
  body.style.cssText='padding:0 6px 6px';

  details.append(summary,body);

  const health=document.querySelector('#meshHealthSummary');
  if(health?.parentElement===faceTools)health.insertAdjacentElement('afterend',details);
  else{
    const precision=document.querySelector('#precisionFaceReadout');
    if(precision?.parentElement===faceTools)precision.insertAdjacentElement('afterend',details);
    else faceTools.appendChild(details);
  }
  return details;
}

function candidateRoots(){
  if(!faceTools)return[];
  const drawer=document.querySelector('#faceInspectDrawer');
  const health=document.querySelector('#meshHealthSummary');
  const roots=[];

  const helperGroup=document.querySelector('#faceSelectionHelpersGroup');
  if(helperGroup&&helperGroup.parentElement===faceTools)roots.push(helperGroup);

  for(const button of faceTools.querySelectorAll('button[id^="select"]')){
    if(drawer?.contains(button)||health?.contains(button))continue;
    let node=button.closest('.outliner-actions')||button.parentElement;
    if(!node||node===faceTools||node===drawer||drawer?.contains(node))continue;
    while(node.parentElement&&node.parentElement!==faceTools&&node.parentElement!==drawer){
      const parent=node.parentElement;
      if(parent.id==='faceSelectionHelpersGroup'){node=parent;break;}
      if(parent.classList?.contains('mode-tools'))break;
      node=parent;
    }
    if(node&&node.parentElement===faceTools&&!roots.includes(node))roots.push(node);
  }
  return roots;
}

function sync(){
  const details=ensureDrawer();
  const body=details?.querySelector('#faceInspectDrawerBody');
  if(!details||!body)return false;

  for(const root of candidateRoots()){
    if(root===details||root===document.querySelector('#meshHealthSummary'))continue;
    body.appendChild(root);
  }

  const rows=[...body.querySelectorAll('.outliner-actions')];
  rows.forEach(row=>{
    row.style.setProperty('margin-top',row.style.marginTop||'4px');
    row.querySelectorAll('button').forEach(button=>{
      button.style.setProperty('min-width','0');
    });
  });

  const count=body.querySelectorAll('button[id^="select"]').length;
  const label=details.querySelector('#faceInspectDrawerLabel');
  if(label)label.textContent=count?`INSPECT • ${count}`:'INSPECT';
  return true;
}

function stampVersion(){
  const version=document.querySelector('#appVersion');
  if(version)version.textContent=`v${VERSION}`;
  document.title=`BoxLab v${VERSION}`;
}

window.addEventListener('boxlab-bridge-state',()=>queueMicrotask(sync));
document.addEventListener('pointerup',()=>setTimeout(sync,0),true);
document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',()=>queueMicrotask(sync)));
[0,50,140,320,700,1100,1700].forEach(delay=>setTimeout(sync,delay));
[250,900,1800].forEach(delay=>setTimeout(stampVersion,delay));

globalThis.__boxlabFaceInspectDrawer={version:VERSION,sync};
