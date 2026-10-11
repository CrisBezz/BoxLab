// BoxLab v0.36.18.179 — Clean View presentation layer.
// Visual only: hides modelling cage overlays without changing mesh, selection,
// History, topology, render look or THREE.Group.add ownership.

const VERSION='0.36.18.179';
const HIDDEN_KINDS=new Set(['edge','vertex','mirror-edge','edge-selection-overlay']);
let enabled=false;
let raf=0;
let lastTouchToggle=0;

function state(){return globalThis.__boxlabBridgeState||null;}
function status(){return document.querySelector('#selectionStatus');}
function shouldHide(object){return HIDDEN_KINDS.has(object?.userData?.kind);}

function applyToScene(){
  const scene=state()?.scene;
  if(!scene)return false;
  scene.traverse(object=>{
    if(shouldHide(object))object.visible=!enabled;
  });
  return true;
}

function maintain(){
  if(!enabled){raf=0;return;}
  applyToScene();
  raf=requestAnimationFrame(maintain);
}

function syncButton(){
  const button=document.querySelector('#cleanViewBtn');
  if(!button)return;
  button.classList.toggle('active',enabled);
  button.setAttribute('aria-pressed',String(enabled));
  button.textContent=enabled?'Clean • On':'Clean View';
}

function setEnabled(next){
  enabled=!!next;
  if(!enabled&&raf){cancelAnimationFrame(raf);raf=0;}
  applyToScene();
  syncButton();
  if(enabled&&!raf)raf=requestAnimationFrame(maintain);
  document.dispatchEvent(new CustomEvent('boxlab-clean-view-change',{detail:{enabled}}));
  const s=status();if(s)s.textContent=enabled?'View • Clean presentation':'View • Edit overlays';
  return enabled;
}

function toggle(){return setEnabled(!enabled);}

function ensureUI(){
  const panel=document.querySelector('#viewModes .viewport-menu-panel');
  if(!panel)return false;
  let section=document.querySelector('#viewportDisplaySection');
  if(!section){
    section=document.createElement('div');
    section.id='viewportDisplaySection';
    section.className='viewport-menu-section';
    section.innerHTML='<div class="viewport-menu-label">Display</div><div class="viewport-render-grid"><button id="cleanViewBtn" type="button" aria-pressed="false">Clean View</button></div>';
    panel.appendChild(section);
    const button=section.querySelector('#cleanViewBtn');
    button?.addEventListener('click',event=>{
      event.preventDefault();event.stopPropagation();
      if(performance.now()-lastTouchToggle<500)return;
      toggle();
    });
    button?.addEventListener('pointerup',event=>{
      if(event.pointerType==='mouse')return;
      event.preventDefault();event.stopPropagation();
      lastTouchToggle=performance.now();
      toggle();
    });
  }
  syncButton();
  return true;
}

if(!ensureUI()){
  let attempts=0;
  const timer=setInterval(()=>{
    attempts++;
    if(ensureUI()||attempts>=40)clearInterval(timer);
  },100);
}

window.addEventListener('boxlab-bridge-state',()=>{if(enabled)queueMicrotask(applyToScene);});
document.addEventListener('boxlab-render-mode-change',()=>{if(enabled)requestAnimationFrame(applyToScene);});

globalThis.__boxlabCleanView={version:VERSION,get enabled(){return enabled;},setEnabled,toggle,apply:applyToScene};
