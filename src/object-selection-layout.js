// BoxLab v0.36.18.258 — native Object selection toolbar lives in Selection.
const VERSION='0.36.18.258';
const selectionDrawer=document.querySelector('#selectionDrawer');
const componentTools=document.querySelector('#componentSelectionTools');
const title=document.querySelector('#selectionDrawer .always-selection-title');

function currentMode(){return document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
function toolbar(){return selectionDrawer?.querySelector('#objectManagementTools,.object-management-tools')||null;}
function installStyle(){
  if(document.querySelector('#boxlabObjectSelectionLayoutStyle'))return;
  const style=document.createElement('style');
  style.id='boxlabObjectSelectionLayoutStyle';
  style.textContent=`
#selectionDrawer #objectManagementTools,#selectionDrawer .object-management-tools{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:5px!important;margin:0!important;padding:0!important}
#selectionDrawer #objectManagementTools button,#selectionDrawer .object-management-tools button{min-width:0!important;width:100%!important;padding:5px 5px!important;font-size:10px!important}
#selectionDrawer #objectManagementTools .object-management-count,#selectionDrawer .object-management-tools .object-management-count{grid-column:1/-1!important;padding:1px 1px 0!important;margin:0!important;font-size:10px!important;opacity:.62!important}
#selectionDrawer.object-selection-active #componentSelectionTools{display:none!important}
#selectionDrawer:not(.object-selection-active) #objectManagementTools,#selectionDrawer:not(.object-selection-active) .object-management-tools{display:none!important}
`;
  document.head.appendChild(style);
}
function sync(){
  installStyle();
  const objectMode=currentMode()==='object';
  selectionDrawer?.classList.toggle('object-selection-active',objectMode);
  if(title)title.textContent=objectMode?'Selection • Object':'Selection';
  if(componentTools)componentTools.setAttribute('aria-hidden',objectMode?'true':'false');
  return !!toolbar();
}
function schedule(){[0,20,60,160,400,900].forEach(delay=>setTimeout(sync,delay));}
schedule();
window.addEventListener('boxlab-object-manager-ready',schedule);
window.addEventListener('boxlab-bridge-state',()=>setTimeout(sync,0));
document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',()=>queueMicrotask(sync)));
globalThis.__boxlabObjectSelectionLayout={version:VERSION,sync,toolbar};
