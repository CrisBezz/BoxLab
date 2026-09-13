import * as THREE from 'three';

// BoxLab v0.36.18.178 — Clean View presentation layer.
// Visual only: hides modelling cage overlays without changing mesh, selection or tool state.

const VERSION='0.36.18.178';
const HIDDEN_KINDS=new Set(['edge','vertex','mirror-edge','edge-selection-overlay']);
let enabled=false;

function state(){return globalThis.__boxlabBridgeState||null;}
function status(){return document.querySelector('#selectionStatus');}
function shouldHide(object){return HIDDEN_KINDS.has(object?.userData?.kind);}

function applyToScene(){
  const scene=state()?.scene;if(!scene)return false;
  scene.traverse(object=>{if(shouldHide(object))object.visible=!enabled;});
  return true;
}

// Cage objects are rebuilt frequently. Wrap the final Group.add chain so newly
// created cage elements inherit Clean View immediately while preserving all prior add wrappers.
const baseAdd=THREE.Group.prototype.add;
if(!THREE.Group.prototype.__boxlabCleanView178){
  THREE.Group.prototype.add=function(...objects){
    const result=baseAdd.apply(this,objects);
    if(enabled)for(const object of objects)if(shouldHide(object))object.visible=false;
    return result;
  };
  THREE.Group.prototype.__boxlabCleanView178=true;
}

function syncButton(){
  const button=document.querySelector('#cleanViewBtn');
  if(button){
    button.classList.toggle('active',enabled);
    button.setAttribute('aria-pressed',String(enabled));
    button.textContent=enabled?'Clean • On':'Clean View';
  }
}

function setEnabled(next){
  enabled=!!next;
  applyToScene();
  syncButton();
  document.dispatchEvent(new CustomEvent('boxlab-clean-view-change',{detail:{enabled}}));
  const s=status();if(s)s.textContent=enabled?'View • Clean presentation':'View • Edit overlays';
  return enabled;
}

function ensureUI(){
  const menu=document.querySelector('#viewModes .viewport-menu-panel');
  if(!menu)return false;
  let section=document.querySelector('#viewportDisplaySection');
  if(!section){
    section=document.createElement('div');
    section.id='viewportDisplaySection';
    section.className='viewport-menu-section';
    section.innerHTML='<div class="viewport-menu-label">Display</div><div class="viewport-render-grid"><button id="cleanViewBtn" type="button" aria-pressed="false">Clean View</button></div>';
    menu.appendChild(section);
    section.querySelector('#cleanViewBtn')?.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();setEnabled(!enabled);});
  }
  syncButton();
  return true;
}

if(!ensureUI()){
  let attempts=0;
  const timer=setInterval(()=>{attempts++;if(ensureUI()||attempts>40)clearInterval(timer);},100);
}

window.addEventListener('boxlab-bridge-state',()=>{if(enabled)queueMicrotask(applyToScene);});
document.addEventListener('pointerup',()=>{if(enabled)requestAnimationFrame(applyToScene);},true);
document.addEventListener('boxlab-render-mode-change',()=>{if(enabled)requestAnimationFrame(applyToScene);});

globalThis.__boxlabCleanView={version:VERSION,get enabled(){return enabled;},setEnabled,apply:applyToScene};
