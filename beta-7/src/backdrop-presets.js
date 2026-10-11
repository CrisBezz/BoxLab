// BoxLab v0.36.18.190 — viewport backdrop presets.
// Visual only: changes scene background colour without touching geometry,
// selection, camera, render materials, tools or History.
const VERSION='0.36.18.190';
const PRESETS={dark:0x0f151f,mid:0x2b333f,light:0x596270};
let preset=localStorage.getItem('boxlab-backdrop-preset')||'dark';
if(!PRESETS[preset])preset='dark';
let lastTouch=0;

function bridge(){return globalThis.__boxlabBridgeState||null;}
function colour(){return PRESETS[preset];}
function apply(){
  const scene=bridge()?.scene;
  if(!scene)return false;
  if(scene.background?.set)scene.background.set(colour());
  return true;
}
function syncButtons(){
  document.querySelectorAll('[data-backdrop-preset]').forEach(button=>{
    const active=button.dataset.backdropPreset===preset;
    button.classList.toggle('active',active);
    button.setAttribute('aria-pressed',String(active));
  });
}
function setPreset(next){
  if(!PRESETS[next])return false;
  preset=next;
  localStorage.setItem('boxlab-backdrop-preset',preset);
  syncButtons();
  apply();
  document.dispatchEvent(new CustomEvent('boxlab-backdrop-change',{detail:{preset,colour:colour()}}));
  const status=document.querySelector('#selectionStatus');
  if(status)status.textContent=`Backdrop • ${preset[0].toUpperCase()+preset.slice(1)}`;
  return true;
}
function ensureUI(){
  const section=document.querySelector('#viewportDisplaySection');
  if(!section)return false;
  if(document.querySelector('#viewportBackdropPresets')){syncButtons();return true;}
  const label=document.createElement('div');
  label.className='viewport-menu-label';
  label.textContent='Backdrop';
  label.style.marginTop='9px';
  const grid=document.createElement('div');
  grid.id='viewportBackdropPresets';
  grid.className='viewport-render-grid';
  grid.innerHTML='<button type="button" data-backdrop-preset="dark">Dark</button><button type="button" data-backdrop-preset="mid">Mid</button><button type="button" data-backdrop-preset="light">Light</button>';
  section.append(label,grid);
  const activate=event=>{
    const button=event.target.closest('[data-backdrop-preset]');
    if(!button)return;
    event.preventDefault();event.stopPropagation();
    setPreset(button.dataset.backdropPreset);
  };
  grid.addEventListener('click',event=>{
    if(performance.now()-lastTouch<500)return;
    activate(event);
  });
  grid.addEventListener('pointerup',event=>{
    if(event.pointerType==='mouse')return;
    lastTouch=performance.now();
    activate(event);
  });
  syncButtons();
  return true;
}
function schedule(){requestAnimationFrame(apply);}

if(!ensureUI()){
  let attempts=0;
  const timer=setInterval(()=>{attempts++;if(ensureUI()||attempts>=50)clearInterval(timer);},100);
}
window.addEventListener('boxlab-bridge-state',schedule);
document.addEventListener('boxlab-render-mode-change',schedule);
document.addEventListener('pointerup',schedule,true);
[0,120,500,1200].forEach(delay=>setTimeout(apply,delay));

globalThis.__boxlabBackdropPresets={version:VERSION,get preset(){return preset;},get colour(){return colour();},setPreset,apply};
