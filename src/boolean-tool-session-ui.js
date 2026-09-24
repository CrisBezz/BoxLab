const objectTools=document.querySelector('[data-mode-tools="object"]');
const status=document.querySelector('#selectionStatus');

function setStatus(text){if(status)status.textContent=text;}

function install(){
  if(!objectTools)return false;
  const group=document.querySelector('#booleanPrototype217');
  if(!group)return false;
  if(document.querySelector('#booleanVisibilityLaunch'))return true;

  const launchRow=document.createElement('div');
  launchRow.id='booleanVisibilityLaunch';
  launchRow.className='outliner-actions boolean-launch-row';
  launchRow.style.gridTemplateColumns='1fr';
  launchRow.innerHTML='<button id="booleanLaunchBtn" type="button">Boolean</button>';
  group.insertAdjacentElement('beforebegin',launchRow);

  const closeRow=document.createElement('div');
  closeRow.className='outliner-actions boolean-session-close';
  closeRow.style.gridTemplateColumns='1fr';
  closeRow.innerHTML='<button id="booleanCloseBtn" type="button">Close</button>';
  group.appendChild(closeRow);

  function close({silent=false}={}){
    group.hidden=true;
    group.style.display='none';
    if(!silent)setStatus('Boolean closed');
  }
  function open(){
    group.hidden=false;
    group.style.display='';
    globalThis.__boxlabBooleanPrototype?.sync?.();
    setStatus('Boolean • choose Union, Cut or Intersect');
  }

  close({silent:true});

  launchRow.querySelector('#booleanLaunchBtn')?.addEventListener('click',()=>{
    open();
  });
  closeRow.querySelector('#booleanCloseBtn')?.addEventListener('click',()=>{
    close();
  });

  group.querySelectorAll('[data-boolean217]').forEach(button=>button.addEventListener('click',()=>{
    queueMicrotask(()=>close({silent:true}));
  }));

  globalThis.__boxlabBooleanVisibility={version:'0.36.18.458',open,close};
  return true;
}

if(!install()){
  window.addEventListener('boxlab-object-manager-ready',()=>queueMicrotask(install),{once:true});
  [0,50,150,400].forEach(delay=>setTimeout(install,delay));
}
