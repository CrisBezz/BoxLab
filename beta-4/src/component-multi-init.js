// BoxLab v0.36.18.314 — initialize always-additive component multi-selection.
const toggle=document.querySelector('#multiSelectToggle');

function activeMode(){
  return document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';
}

function enableComponentMulti(){
  const mode=activeMode();
  if(!toggle||mode==='object')return false;
  if(toggle.checked)return true;
  toggle.checked=true;
  toggle.dispatchEvent(new Event('change',{bubbles:true}));
  return true;
}

function scheduleEnable(){
  queueMicrotask(enableComponentMulti);
}

// Component selection is intentionally additive by default. The checkbox is
// hidden UI plumbing, so its startup state must not silently disable Face/Edge
// paint/add selection.
enableComponentMulti();

document.querySelectorAll('#selectionModes button').forEach(button=>{
  button.addEventListener('click',scheduleEnable);
});
document.querySelectorAll('#toolModes button').forEach(button=>{
  button.addEventListener('click',scheduleEnable);
});
document.addEventListener('boxlab-direct-tool-exclusive',event=>{
  if(event.detail?.tool==='none')scheduleEnable();
});

globalThis.__boxlabComponentMultiInit={version:'0.36.18.314',enable:enableComponentMulti};
