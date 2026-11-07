const modes=document.querySelector('#selectionModes');
const toggle=document.querySelector('#multiSelectToggle');
let previousMode=null;

function bridge(){return globalThis.__boxlabSelectionBridge;}
function currentMode(){return bridge()?.mode?.()||null;}
function selectedCount(){return [...(bridge()?.indices?.()||[])].length;}

modes?.addEventListener('click',event=>{
  const button=event.target?.closest?.('button[data-mode]');
  if(!button)return;
  previousMode=currentMode();
},true);

modes?.addEventListener('click',event=>{
  const button=event.target?.closest?.('button[data-mode]');
  if(!button||!toggle)return;
  const nextMode=button.dataset.mode;
  const transferred=(previousMode==='face'&&nextMode==='edge')||(previousMode==='edge'&&nextMode==='vertex');
  if(!transferred||selectedCount()<=1||toggle.checked)return;
  toggle.checked=true;
  toggle.dispatchEvent(new Event('change',{bubbles:true}));
});
