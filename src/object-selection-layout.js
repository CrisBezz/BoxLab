// BoxLab v0.36.18.256 — Object selection proxy toolbar.
// object-management.js remains the single owner of Object selection state/actions.
// Its proven native toolbar stays alive inside the Objects drawer but is hidden;
// visible Selection-drawer controls simply forward clicks to those native buttons.
const VERSION='0.36.18.256';
const selectionDrawer=document.querySelector('#selectionDrawer');
const componentTools=document.querySelector('#componentSelectionTools');
const title=document.querySelector('#selectionDrawer .always-selection-title');
let proxy=null;
let observer=null;

function currentMode(){return document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
function nativeToolbar(){return document.querySelector('#objectsDrawer #objectManagementTools,#objectsDrawer .object-management-tools');}
function nativeButtons(){
  const t=nativeToolbar();
  if(!t)return{};
  const buttons=[...t.querySelectorAll(':scope > button')];
  const find=(...labels)=>buttons.find(button=>labels.includes(button.textContent.trim()));
  return{
    multi:find('Multi'),
    all:find('All','None'),
    clear:find('Clear'),
    visibility:find('Hide','Show'),
    lock:find('Lock','Unlock'),
    count:t.querySelector('.object-management-count')
  };
}

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
    const native=nativeButtons()[button.dataset.objectAction];
    if(!native||native.disabled)return;
    native.click();
    queueMicrotask(syncProxy);
    requestAnimationFrame(syncProxy);
  });
  return proxy;
}

function syncProxy(){
  const t=buildProxy();
  const native=nativeButtons();
  if(!t||!native.multi)return false;
  const multi=t.querySelector('[data-object-action="multi"]');
  const all=t.querySelector('[data-object-action="all"]');
  const clear=t.querySelector('[data-object-action="clear"]');
  const visibility=t.querySelector('[data-object-action="visibility"]');
  const lock=t.querySelector('[data-object-action="lock"]');
  const count=t.querySelector('.object-management-count');
  multi?.classList.toggle('active',native.multi.classList.contains('active'));
  if(all){all.textContent=native.all?.textContent||'All';all.disabled=!!native.all?.disabled;}
  if(clear)clear.disabled=!!native.clear?.disabled;
  if(visibility){visibility.textContent=native.visibility?.textContent||'Hide';visibility.disabled=!!native.visibility?.disabled;}
  if(lock){lock.textContent=native.lock?.textContent||'Lock';lock.disabled=!!native.lock?.disabled;}
  if(count)count.textContent=native.count?.textContent||'Single object selection';
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
window.addEventListener('boxlab-bridge-state',()=>setTimeout(sync,0));
document.querySelectorAll('#selectionModes button').forEach(button=>button.addEventListener('click',()=>queueMicrotask(sync)));
const objectsDrawer=document.querySelector('#objectsDrawer .drawer-content');
if(objectsDrawer)new MutationObserver(()=>queueMicrotask(syncProxy)).observe(objectsDrawer,{childList:true,subtree:true,characterData:true});
if(!observer&&selectionDrawer){observer=new MutationObserver(()=>queueMicrotask(syncProxy));observer.observe(selectionDrawer,{childList:true,subtree:true});}

globalThis.__boxlabObjectSelectionLayout={version:VERSION,sync,toolbar:()=>proxy};
