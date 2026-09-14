// BoxLab v0.36.18.213 — keep Object selection in the same persistent Selection panel as components.
const VERSION='0.36.18.213';
const selectionDrawer=document.querySelector('#selectionDrawer');
const componentTools=document.querySelector('#componentSelectionTools');
const title=document.querySelector('#selectionDrawer .always-selection-title');

function currentMode(){return document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
function toolbar(){return document.querySelector('#objectManagementTools');}
function installStyle(){
  if(document.querySelector('#boxlabObjectSelectionLayoutStyle'))return;
  const style=document.createElement('style');style.id='boxlabObjectSelectionLayoutStyle';style.textContent=`
#selectionDrawer #objectManagementTools{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:5px!important;margin:0!important;padding:0!important}
#selectionDrawer #objectManagementTools button{min-width:0!important;width:100%!important;padding:5px 5px!important;font-size:10px!important}
#selectionDrawer #objectManagementTools .object-management-count{grid-column:1/-1!important;padding:1px 1px 0!important;margin:0!important;font-size:10px!important;opacity:.62!important}
#selectionDrawer.object-selection-active #componentSelectionTools{display:none!important}
#selectionDrawer:not(.object-selection-active) #objectManagementTools{display:none!important}
`;
  document.head.appendChild(style);
}
function reorder(t){
  if(!t)return;
  const buttons=[...t.querySelectorAll(':scope > button')];
  const byText=text=>buttons.find(b=>b.textContent.trim()===text);
  for(const text of ['Multi','All','Clear','Hide','Show','Lock','Unlock']){
    const b=byText(text);if(b&&b.parentElement===t)t.appendChild(b);
  }
  const count=t.querySelector('.object-management-count');if(count)t.appendChild(count);
}
function sync(){
  installStyle();
  const t=toolbar();
  if(t&&selectionDrawer&&t.parentElement!==selectionDrawer){selectionDrawer.appendChild(t);reorder(t);}
  const objectMode=currentMode()==='object';
  selectionDrawer?.classList.toggle('object-selection-active',objectMode);
  if(title)title.textContent=objectMode?'Selection • Object':'Selection';
  if(componentTools)componentTools.setAttribute('aria-hidden',objectMode?'true':'false');
  return !!t;
}

function schedule(){[0,40,120,350,800].forEach(delay=>setTimeout(sync,delay));}
schedule();
window.addEventListener('boxlab-object-manager-ready',schedule);
window.addEventListener('boxlab-bridge-state',()=>setTimeout(sync,0));
document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',()=>queueMicrotask(sync)));
new MutationObserver(()=>queueMicrotask(sync)).observe(document.body,{childList:true,subtree:true});

globalThis.__boxlabObjectSelectionLayout={version:VERSION,sync};
