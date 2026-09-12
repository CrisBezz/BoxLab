// BoxLab v0.36.18.142 — Face Repair diagnose→repair linkage expansion.
// Existing repair handlers remain untouched. Cleanable Verts feeds Clean Vertices,
// and Mergeable Verts feeds the existing safe Merge by Distance operation.
// The expensive Mergeable Verts scan runs only while Repair is open.

const VERSION='0.36.18.142';
const faceTools=document.querySelector('[data-mode-tools="face"]');
let settled=false;

function state(){return globalThis.__boxlabBridgeState;}
function mesh(){return state()?.mesh||null;}
function bridge(){return globalThis.__boxlabSelectionBridge;}

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

function category(id,label,columns=2){
  const body=document.querySelector('#faceRepairDrawerBody');
  if(!body)return null;
  let section=body.querySelector(`#${id}`);
  if(section)return section.querySelector('.outliner-actions');
  section=document.createElement('div');
  section.id=id;
  section.style.cssText='margin-top:5px';
  const title=document.createElement('div');
  title.textContent=label;
  title.style.cssText='font-size:9px;line-height:1.1;letter-spacing:.35px;opacity:.55;margin:0 0 4px 1px';
  const row=document.createElement('div');
  row.className='outliner-actions';
  row.style.cssText=`grid-template-columns:repeat(${columns},minmax(0,1fr));gap:4px;margin:0`;
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

function ensureCleanVerticesButton(row){
  if(!row)return null;
  let button=document.querySelector('#repairCleanVerticesBtn');
  if(!button){
    button=document.createElement('button');
    button.id='repairCleanVerticesBtn';
    button.type='button';
    button.textContent='Clean Vertices';
    button.disabled=true;
    button.style.cssText='width:100%;min-width:0';
    button.addEventListener('click',()=>globalThis.__boxlabCleanVertices?.apply?.());
  }
  if(button.parentElement!==row)row.appendChild(button);
  return button;
}

function syncCleanup(button){
  if(!button)return;
  const m=mesh();
  const inspect=globalThis.__boxlabSelectCleanableVerts?.inspect;
  let count=0;
  try{count=m&&inspect?Number(inspect(m)?.count)||0:0;}catch{count=0;}
  const plan=globalThis.__boxlabCleanVertices?.plan?.(m);
  const available=!!plan;
  button.disabled=!available;
  button.textContent=count?`Clean Vertices • ${count}`:'Clean Vertices';
  button.title=available
    ?count
      ?`Repair ${count} cleanable redundant vertex${count===1?'':'es'} using the existing safe Clean Vertices operation`
      :`Run safe Clean Vertices cleanup${plan?.totalRemoved?` • ${plan.totalRemoved} removable`:''}`
    :'No safe redundant vertices found';
}

function ensureMergeButton(row){
  if(!row)return null;
  let button=document.querySelector('#repairMergeByDistanceBtn');
  if(!button){
    button=document.createElement('button');
    button.id='repairMergeByDistanceBtn';
    button.type='button';
    button.textContent='Merge by Distance';
    button.disabled=true;
    button.style.cssText='width:100%;min-width:0';
    button.addEventListener('click',()=>{
      const m=mesh(),inspect=globalThis.__boxlabSelectMergeableVerts?.inspect;
      let info=null;
      try{info=m&&inspect?inspect(m):null;}catch{info=null;}
      if(!info?.indices?.length)return;
      const vertexMode=document.querySelector('#selectionModes button[data-mode="vertex"]');
      if(vertexMode&&!vertexMode.classList.contains('active'))vertexMode.click();
      queueMicrotask(()=>{
        const multi=document.querySelector('#multiSelectToggle');
        const wanted=info.indices.length>1;
        if(multi&&multi.checked!==wanted){multi.checked=wanted;multi.dispatchEvent(new Event('change',{bubbles:true}));}
        bridge()?.set?.('vertex',info.indices);
        setTimeout(()=>globalThis.__boxlabMergeByDistance?.apply?.(),0);
      });
    });
  }
  if(button.parentElement!==row)row.appendChild(button);
  return button;
}

function syncMerge(button,details){
  if(!button)return;
  if(!details?.open){
    button.disabled=true;
    button.textContent='Merge by Distance';
    button.title='Open Repair to scan for safely mergeable vertex clusters';
    return;
  }
  const m=mesh(),inspect=globalThis.__boxlabSelectMergeableVerts?.inspect;
  let info=null;
  try{info=m&&inspect?inspect(m):null;}catch{info=null;}
  const clusters=info?.clusters?.length||0;
  const verts=info?.indices?.length||0;
  button.disabled=!clusters;
  button.textContent=clusters?`Merge by Distance • ${clusters}`:'Merge by Distance';
  button.title=clusters
    ?`Merge ${clusters} safe nearby cluster${clusters===1?'':'s'} • ${verts} vert${verts===1?'':'s'} at the current Merge Dist`
    :'No safe mergeable vertex clusters found at the current Merge Dist';
}

function sync(){
  const details=ensureDrawer();
  if(!details)return false;

  const cleanup=category('faceRepairCleanup','CLEANUP',2);
  const planar=category('faceRepairPlanar','PLANAR');
  const normals=category('faceRepairNormals','NORMALS');

  const cleanButton=ensureCleanVerticesButton(cleanup);
  const mergeButton=ensureMergeButton(cleanup);
  syncCleanup(cleanButton);
  syncMerge(mergeButton,details);

  moveButton(document.querySelector('#joinSelectedCoplanarFacesBtn'),planar);
  moveWholeRow(document.querySelector('#makePlanarRow'),planar);
  moveButton(document.querySelector('#orientFacesBtn'),normals);
  moveWholeRow(document.querySelector('#orientShellOutwardRow'),normals);

  const count=details.querySelectorAll('#faceRepairDrawerBody button').length;
  const label=details.querySelector('#faceRepairDrawerLabel');
  if(label)label.textContent=count?`REPAIR • ${count}`:'REPAIR';
  return true;
}

function requestSync(){if(settled)queueMicrotask(sync);}

const drawer=ensureDrawer();
drawer?.addEventListener('toggle',()=>{if(settled&&drawer.open)queueMicrotask(sync);});
setTimeout(()=>{sync();settled=true;},1850);
window.addEventListener('boxlab-bridge-state',()=>{if(settled&&drawer?.open)queueMicrotask(sync);});
document.addEventListener('pointerup',()=>{if(settled&&drawer?.open)setTimeout(sync,0);},true);
document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',requestSync));
document.querySelector('#mergeByDistanceValue')?.addEventListener('input',()=>{if(settled&&drawer?.open)queueMicrotask(sync);});

globalThis.__boxlabFaceRepairDrawer={version:VERSION,sync};
