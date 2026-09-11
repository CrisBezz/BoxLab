// BoxLab v0.36.18.139 — Face Repair drawer foundation.
// UI-only: groups existing corrective Face operations into a default-collapsed
// Repair drawer. Existing handlers, topology logic, History and selection behavior
// remain untouched.

const VERSION='0.36.18.139';
const faceTools=document.querySelector('[data-mode-tools="face"]');

function ensureDrawer(){
  if(!faceTools)return null;
  let details=document.querySelector('#faceRepairDrawer');
  if(details)return details;

  details=document.createElement('details');
  details.id='faceRepairDrawer';
  details.open=false;
  details.style.cssText='margin:6px 0 4px;border:1px solid rgba(255,255,255,.08);border-radius:5px;background:rgba(255,255,255,.02)';

  const summary=document.createElement('summary');
  summary.id='faceRepairDrawerLabel';
  summary.textContent='REPAIR';
  summary.style.cssText='cursor:pointer;list-style:none;padding:6px 7px;font-size:10px;letter-spacing:.3px;user-select:none';

  const body=document.createElement('div');
  body.id='faceRepairDrawerBody';
  body.style.cssText='padding:0 6px 6px';

  details.append(summary,body);
  const inspect=document.querySelector('#faceInspectDrawer');
  if(inspect?.parentElement===faceTools)inspect.insertAdjacentElement('afterend',details);
  else{
    const health=document.querySelector('#meshHealthSummary');
    if(health?.parentElement===faceTools)health.insertAdjacentElement('afterend',details);
    else faceTools.appendChild(details);
  }
  return details;
}

function category(id,label){
  const body=document.querySelector('#faceRepairDrawerBody');
  if(!body)return null;
  let section=body.querySelector(`#${id}`);
  if(section)return section;
  section=document.createElement('div');
  section.id=id;
  section.style.cssText='margin-top:5px';
  const title=document.createElement('div');
  title.textContent=label;
  title.style.cssText='font-size:9px;line-height:1.1;letter-spacing:.35px;opacity:.55;margin:0 0 4px 1px';
  const row=document.createElement('div');
  row.className='outliner-actions';
  row.style.cssText='grid-template-columns:repeat(2,minmax(0,1fr));gap:4px;margin:0';
  section.append(title,row);
  body.appendChild(section);
  return row;
}

function moveButton(button,row){
  if(!button||!row)return false;
  const oldParent=button.parentElement;
  if(button.parentElement!==row)row.appendChild(button);
  button.style.minWidth='0';
  button.style.width='100%';
  if(oldParent&&oldParent!==row&&oldParent.classList?.contains('outliner-actions')){
    const remaining=[...oldParent.children].filter(node=>node.tagName==='BUTTON');
    if(remaining.length)oldParent.style.gridTemplateColumns=`repeat(${remaining.length},minmax(0,1fr))`;
    else oldParent.remove();
  }
  return true;
}

function moveWholeRow(source,row){
  if(!source||!row)return false;
  const buttons=[...source.querySelectorAll(':scope > button')];
  if(buttons.length!==1)return false;
  return moveButton(buttons[0],row);
}

function sync(){
  const details=ensureDrawer();
  if(!details)return false;

  const planar=category('faceRepairPlanar','PLANAR');
  const normals=category('faceRepairNormals','NORMALS');

  moveButton(document.querySelector('#joinSelectedCoplanarFacesBtn'),planar);
  moveWholeRow(document.querySelector('#makePlanarRow'),planar);
  moveButton(document.querySelector('#orientFacesBtn'),normals);
  moveWholeRow(document.querySelector('#orientShellOutwardRow'),normals);

  const count=details.querySelectorAll('#faceRepairDrawerBody button').length;
  const label=details.querySelector('#faceRepairDrawerLabel');
  if(label)label.textContent=count?`REPAIR • ${count}`:'REPAIR';
  return true;
}

window.addEventListener('boxlab-bridge-state',()=>queueMicrotask(sync));
document.addEventListener('pointerup',()=>setTimeout(sync,0),true);
document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',()=>queueMicrotask(sync)));
[0,60,160,360,800,1300,1900].forEach(delay=>setTimeout(sync,delay));

globalThis.__boxlabFaceRepairDrawer={version:VERSION,sync};
