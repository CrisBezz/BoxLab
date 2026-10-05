// BoxLab v0.36.18.191 — cage intensity presentation control.
// Visual only: softens rendered cage overlays without changing mesh, selection,
// topology, tools, History, Clean View ownership or the live-mesh bridge.
const VERSION='0.36.18.191';
const KINDS=new Set(['edge','vertex','mirror-edge','edge-selection-overlay']);
const FACTOR={edge:.42,vertex:.56,'mirror-edge':.28,'edge-selection-overlay':.82};
const originals=new WeakMap();
let mode=localStorage.getItem('boxlab-cage-intensity')==='soft'?'soft':'full';
let lastTouch=0;

function scene(){return globalThis.__boxlabBridgeState?.scene||null;}
function cloneMaterial(material,factor){
  if(!material?.clone)return material;
  const clone=material.clone();
  const base=Number.isFinite(material.opacity)?material.opacity:1;
  clone.transparent=true;
  clone.opacity=Math.max(.08,Math.min(1,base*factor));
  clone.needsUpdate=true;
  return clone;
}
function soften(object){
  if(originals.has(object))return;
  const original=object.material;
  if(!original)return;
  originals.set(object,original);
  const factor=FACTOR[object.userData?.kind]??.45;
  object.material=Array.isArray(original)?original.map(material=>cloneMaterial(material,factor)):cloneMaterial(original,factor);
}
function restore(object){
  const original=originals.get(object);
  if(!original)return;
  const current=object.material;
  object.material=original;
  originals.delete(object);
  const disposable=Array.isArray(current)?current:[current];
  disposable.forEach(material=>{if(material&&material!==original)material.dispose?.();});
}
function apply(){
  const root=scene();if(!root)return false;
  root.traverse(object=>{
    if(!KINDS.has(object?.userData?.kind))return;
    if(mode==='soft')soften(object);else restore(object);
  });
  return true;
}
function syncButtons(){
  document.querySelectorAll('[data-cage-intensity]').forEach(button=>{
    const active=button.dataset.cageIntensity===mode;
    button.classList.toggle('active',active);
    button.setAttribute('aria-pressed',String(active));
  });
}
function setMode(next){
  if(next!=='full'&&next!=='soft')return false;
  mode=next;
  localStorage.setItem('boxlab-cage-intensity',mode);
  apply();syncButtons();
  document.dispatchEvent(new CustomEvent('boxlab-cage-intensity-change',{detail:{mode}}));
  const status=document.querySelector('#selectionStatus');
  if(status)status.textContent=mode==='soft'?'Cage • Soft':'Cage • Full';
  return true;
}
function ensureUI(){
  const section=document.querySelector('#viewportDisplaySection');
  if(!section)return false;
  if(document.querySelector('#viewportCageIntensity')){syncButtons();return true;}
  const label=document.createElement('div');
  label.className='viewport-menu-label';label.textContent='Cage';label.style.marginTop='9px';
  const grid=document.createElement('div');
  grid.id='viewportCageIntensity';grid.className='viewport-render-grid';
  grid.innerHTML='<button type="button" data-cage-intensity="full">Full</button><button type="button" data-cage-intensity="soft">Soft</button>';
  section.append(label,grid);
  const activate=event=>{
    const button=event.target.closest('[data-cage-intensity]');if(!button)return;
    event.preventDefault();event.stopPropagation();setMode(button.dataset.cageIntensity);
  };
  grid.addEventListener('click',event=>{if(performance.now()-lastTouch<500)return;activate(event);});
  grid.addEventListener('pointerup',event=>{
    if(event.pointerType==='mouse')return;
    lastTouch=performance.now();activate(event);
  });
  syncButtons();return true;
}
function schedule(){requestAnimationFrame(apply);}

if(!ensureUI()){
  let attempts=0;
  const timer=setInterval(()=>{attempts++;if(ensureUI()||attempts>=50)clearInterval(timer);},100);
}
window.addEventListener('boxlab-bridge-state',schedule);
document.addEventListener('boxlab-render-mode-change',schedule);
document.addEventListener('boxlab-clean-view-change',schedule);
document.addEventListener('pointerup',schedule,true);
[0,120,500,1200].forEach(delay=>setTimeout(apply,delay));

globalThis.__boxlabCageIntensity={version:VERSION,get mode(){return mode;},setMode,apply};
