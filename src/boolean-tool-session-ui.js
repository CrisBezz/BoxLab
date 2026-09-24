const objectTools=document.querySelector('[data-mode-tools="object"]');
const status=document.querySelector('#selectionStatus');

function toolSession(){return globalThis.__boxlabToolSession||null;}
function setStatus(text){if(status)status.textContent=text;}

function install(){
  if(!objectTools)return false;
  const group=document.querySelector('#booleanPrototype217');
  if(!group)return false;
  if(document.querySelector('#booleanToolSessionLaunch'))return true;

  group.hidden=true;

  const launchRow=document.createElement('div');
  launchRow.id='booleanToolSessionLaunch';
  launchRow.className='outliner-actions boolean-launch-row';
  launchRow.style.gridTemplateColumns='1fr';
  launchRow.innerHTML='<button id="booleanLaunchBtn" type="button">Boolean</button>';
  group.insertAdjacentElement('beforebegin',launchRow);

  const closeRow=document.createElement('div');
  closeRow.className='outliner-actions boolean-session-close';
  closeRow.style.gridTemplateColumns='1fr';
  closeRow.innerHTML='<button id="booleanCloseBtn" type="button">Close</button>';
  group.appendChild(closeRow);

  const launch=launchRow.querySelector('#booleanLaunchBtn');
  const close=closeRow.querySelector('#booleanCloseBtn');

  function open(){
    group.hidden=false;
    toolSession()?.begin?.({id:'boolean',title:'Boolean',node:group,subtitle:'Union · Cut · Intersect'});
    globalThis.__boxlabBooleanPrototype?.sync?.();
  }
  function shut({silent=false}={}){
    group.hidden=true;
    toolSession()?.end?.('boolean');
    if(!silent)setStatus('Boolean closed');
  }

  launch?.addEventListener('click',event=>{
    event.preventDefault();event.stopPropagation();
    open();
  });
  close?.addEventListener('click',event=>{
    event.preventDefault();event.stopPropagation();
    shut();
  });

  window.addEventListener('boxlab-tool-session-change',event=>{
    const detail=event.detail||{};
    if(detail.id==='boolean'&&detail.active===false)group.hidden=true;
  });

  globalThis.__boxlabBooleanToolSession={version:'0.36.18.450',open,close:shut};
  return true;
}

if(!install()){
  window.addEventListener('boxlab-object-manager-ready',()=>queueMicrotask(install),{once:true});
  [0,50,150,400].forEach(delay=>setTimeout(install,delay));
}
