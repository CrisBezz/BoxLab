// BoxLab v0.36.18.255 — single-owner Object selection layout.
// The live toolbar is created by object-management.js. Always prefer the instance
// still inside the Objects drawer, remove stale duplicates, then move that exact
// DOM node (and its listeners/state) into the persistent Selection drawer.
const VERSION='0.36.18.255';
const selectionDrawer=document.querySelector('#selectionDrawer');
const componentTools=document.querySelector('#componentSelectionTools');
const title=document.querySelector('#selectionDrawer .always-selection-title');
const objectsDrawerContent=document.querySelector('#objectsDrawer .drawer-content');
let ownedToolbar=null;
let syncing=false;

function currentMode(){return document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
function allToolbars(){return [...document.querySelectorAll('#objectManagementTools,.object-management-tools')];}
function liveToolbar(){
  const inObjects=objectsDrawerContent?.querySelector('#objectManagementTools,.object-management-tools');
  if(inObjects)return inObjects;
  if(ownedToolbar?.isConnected)return ownedToolbar;
  return selectionDrawer?.querySelector('#objectManagementTools,.object-management-tools')||null;
}
function installStyle(){
  if(document.querySelector('#boxlabObjectSelectionLayoutStyle'))return;
  const style=document.createElement('style');style.id='boxlabObjectSelectionLayoutStyle';style.textContent=`
#selectionDrawer #objectManagementTools,#selectionDrawer .object-management-tools{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:5px!important;margin:0!important;padding:0!important}
#selectionDrawer #objectManagementTools button,#selectionDrawer .object-management-tools button{min-width:0!important;width:100%!important;padding:5px 5px!important;font-size:10px!important}
#selectionDrawer #objectManagementTools .object-management-count,#selectionDrawer .object-management-tools .object-management-count{grid-column:1/-1!important;padding:1px 1px 0!important;margin:0!important;font-size:10px!important;opacity:.62!important}
#selectionDrawer.object-selection-active #componentSelectionTools{display:none!important}
#selectionDrawer:not(.object-selection-active) #objectManagementTools,#selectionDrawer:not(.object-selection-active) .object-management-tools{display:none!important}
`;
  document.head.appendChild(style);
}
function reorder(t){
  if(!t)return;
  const buttons=[...t.querySelectorAll(':scope > button')];
  const take=(...texts)=>buttons.find(b=>texts.includes(b.textContent.trim()));
  for(const button of [take('Multi'),take('All','None'),take('Clear'),take('Hide','Show'),take('Lock','Unlock')])if(button&&button.parentElement===t)t.appendChild(button);
  const count=t.querySelector('.object-management-count');if(count)t.appendChild(count);
}
function removeStaleExcept(keep){
  for(const candidate of allToolbars()){
    if(candidate===keep)continue;
    // Only remove duplicate Object-selection toolbars. Never touch Origin/Pivot/etc.
    if(candidate.matches('#objectManagementTools,.object-management-tools'))candidate.remove();
  }
}
function sync(){
  if(syncing)return !!ownedToolbar;
  syncing=true;
  try{
    installStyle();
    const t=liveToolbar();
    if(t){
      ownedToolbar=t;
      removeStaleExcept(t);
      if(selectionDrawer&&t.parentElement!==selectionDrawer)selectionDrawer.appendChild(t);
      if(t.id!=='objectManagementTools')t.id='objectManagementTools';
      reorder(t);
    }
    const objectMode=currentMode()==='object';
    selectionDrawer?.classList.toggle('object-selection-active',objectMode);
    if(title)title.textContent=objectMode?'Selection • Object':'Selection';
    if(componentTools)componentTools.setAttribute('aria-hidden',objectMode?'true':'false');
    return !!t;
  }finally{syncing=false;}
}

function schedule(){[0,20,60,160,400,900].forEach(delay=>setTimeout(sync,delay));}
schedule();
window.addEventListener('boxlab-object-manager-ready',schedule);
window.addEventListener('boxlab-bridge-state',()=>setTimeout(sync,0));
document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',()=>queueMicrotask(sync)));
if(objectsDrawerContent)new MutationObserver(()=>{if(!syncing)queueMicrotask(sync);}).observe(objectsDrawerContent,{childList:true});
if(selectionDrawer)new MutationObserver(()=>{if(!syncing)queueMicrotask(sync);}).observe(selectionDrawer,{childList:true});

globalThis.__boxlabObjectSelectionLayout={version:VERSION,sync,toolbar:()=>ownedToolbar};
