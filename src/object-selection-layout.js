// BoxLab v0.36.18.256 — Object selection proxy toolbar.
// object-management.js remains the single owner of Object selection state/actions.
// Its native toolbar stays in the Objects drawer but is hidden; this module renders
// the Selection-drawer controls and delegates directly to the public selection API.
const VERSION='0.36.18.256';
const selectionDrawer=document.querySelector('#selectionDrawer');
const componentTools=document.querySelector('#componentSelectionTools');
const title=document.querySelector('#selectionDrawer .always-selection-title');
let proxy=null;
let observer=null;

function currentMode(){return document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
function api(){return globalThis.__boxlabObjectSelection;}

function installStyle(){
  if(document.querySelector('#boxlabObjectSelectionLayoutStyle'))return;
  const style=document.createElement('style');
  style.id='boxlabObjectSelectionLayoutStyle';
  style.textContent=`
#objectsDrawer #objectManagementTools,#objectsDrawer .object-management-tools{display:none!important}
#objectSelectionProxyTools{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:5px;margin:0;padding:0}
#objectSelectionProxyTools button{min-width:0;width:100%;padding:5px 5px;font-size:10px}
#objectSelectionProxyTools button.active{outline:1px solid currentColor}
#objectSelectionProxyTools .object-management-count{grid-column:1/-1;padding:1px 1px 0;margin:0;font-size:10px;opacity:.62}
#selectionDrawer.object-selection-active #componentSelectionTools{display:none!important}
#selectionDrawer:not(.object-selection-active) #objectSelectionProxyTools{display:none!important}
`;
  document.head.appendChild(style);
}

function buildProxy(){
  if(proxy||!selectionDrawer)return proxy;
  proxy=document.createElement('div');
  proxy.id='objectSelectionProxyTools';
  proxy.innerHTML='<button type="button" data-object-action="multi">Multi</button><button type="button" data-object-action="all">All</button><button type="button" data-object-action="clear">Clear</button><button type="button" data-object-action="visibility">Hide</button><button type="button" data-object-action="lock">Lock</button><div class="object-management-count">Single object selection</div>';
  selectionDrawer.appendChild(proxy);
  proxy.addEventListener('click',event=>{
    const button=event.target.closest('button[data-object-action]');
    if(!button)return;
    event.preventDefault();
    event.stopPropagation();
    const objectApi=api();
    if(!objectApi)return;
    const action=button.dataset.objectAction;
    if(action==='multi')objectApi.toggleMulti?.();
    else if(action==='all')objectApi.toggleAll?.();
    else if(action==='clear')objectApi.clear?.();
    else if(action==='visibility')objectApi.toggleVisibility?.();
    else if(action==='lock')objectApi.toggleLock?.();
    queueMicrotask(sync);
  });
  return proxy;
}

function syncProxy(){
  const t=buildProxy();
  const objectApi=api();
  if(!t||!objectApi)return false;
  const multi=t.querySelector('[data-object-action="multi"]');
  const all=t.querySelector('[data-object-action="all"]');
  const clear=t.querySelector('[data-object-action="clear"]');
  const visibility=t.querySelector('[data-object-action="visibility"]');
  const lock=t.querySelector('[data-object-action="lock"]');
  const count=t.querySelector('.object-management-count');
  multi?.classList.toggle('active',!!objectApi.multi);
  if(all)all.textContent=objectApi.allSelected?'None':'All';
  if(visibility){visibility.textContent=objectApi.allHidden?'Show':'Hide';visibility.disabled=!objectApi.count;}
  if(lock){lock.textContent=objectApi.allLocked?'Unlock':'Lock';lock.disabled=!objectApi.count;}
  if(clear)clear.disabled=!objectApi.count;
  if(count)count.textContent=objectApi.multi?`${objectApi.count} of ${objectApi.total} selected • active object remains primary`:'Single object selection';
  return true;
}

function sync(){
  installStyle();
  buildProxy();
  const objectMode=currentMode()==='object';
  selectionDrawer?.classList.toggle('object-selection-active',objectMode);
  if(title)title.textContent=objectMode?'Selection • Object':'Selection';
  if(componentTools)componentTools.setAttribute('aria-hidden',objectMode?'true':'false');
  syncProxy();
  return !!proxy;
}

function schedule(){[0,20,60,160,400,900].forEach(delay=>setTimeout(sync,delay));}
schedule();
window.addEventListener('boxlab-object-manager-ready',schedule);
window.addEventListener('boxlab-object-selection-change',()=>queueMicrotask(sync));
window.addEventListener('boxlab-bridge-state',()=>setTimeout(sync,0));
document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',()=>queueMicrotask(sync)));
if(!observer&&selectionDrawer){observer=new MutationObserver(()=>queueMicrotask(syncProxy));observer.observe(selectionDrawer,{childList:true,subtree:true});}

globalThis.__boxlabObjectSelectionLayout={version:VERSION,sync,toolbar:()=>proxy};
