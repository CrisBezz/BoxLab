import * as THREE from 'three';
import { analyzeSolidifyInput, solidifyOpenMesh } from './solidify-core.js?v=0.36.18.374';

const button=document.querySelector('#solidifyBtn');
const input=document.querySelector('#solidifyThickness');
const output=document.querySelector('#solidifyThicknessOut');
const status=document.querySelector('#selectionStatus');

let preview=null,previewObjectId=null,previewArmed=false;

function manager(){return globalThis.__boxlabObjectManager;}
function mesh(){return globalThis.__boxlabBridgeState?.mesh||null;}
function activeObject(){const m=manager();return m?.objects?.find(o=>o.id===m.activeId)||null;}
function selectionMode(){return document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
function setStatus(text){if(status)status.textContent=text;}
function thickness(){const value=Number(input?.value);return Number.isFinite(value)?value:0.2;}
function syncThickness(){if(output)output.textContent=Number(thickness().toFixed(3)).toString();}
function scene(){return globalThis.__boxlabBridgeState?.scene||null;}
function disposePreview(){
  if(preview?.parent)preview.parent.remove(preview);
  preview?.geometry?.dispose?.();
  preview?.material?.dispose?.();
  preview=null;
}
function cancelPreview({silent=false}={}){
  disposePreview();previewArmed=false;previewObjectId=null;
  if(button)button.textContent='Solidify';
  if(!silent)setStatus('Solidify preview cancelled');
}
function buildPreview(){
  if(!previewArmed)return false;
  const object=activeObject(),live=mesh(),targetScene=scene();
  if(!object||!live||!targetScene||object.id!==previewObjectId){cancelPreview({silent:true});return false;}
  const working=live.clone();
  const result=solidifyOpenMesh(working,thickness());
  disposePreview();
  if(!result.ok){setStatus(`Solidify preview unavailable • ${result.reason||'invalid thickness'}`);return false;}
  const geometry=working.triangulatedGeometry();
  const material=new THREE.MeshBasicMaterial({color:0x62d8ff,transparent:true,opacity:.28,side:THREE.DoubleSide,depthWrite:false});
  preview=new THREE.Mesh(geometry,material);
  preview.name='BoxLab Solidify Preview';
  preview.renderOrder=12;
  targetScene.add(preview);
  setStatus(`Solidify preview • thickness ${Number(thickness().toFixed(3))} • tap Apply Solidify to commit`);
  return true;
}
function preflightMessage(reason){
  const labels={
    'closed-mesh':'Solidify needs an open sheet • closed solids will use Shell in a later Phase D build',
    'non-manifold-edge':'Solidify refused • non-manifold edge',
    'inconsistent-winding':'Solidify refused • fix inconsistent face winding first',
    'branched-boundary':'Solidify refused • boundary is branched',
    'duplicate-face':'Solidify refused • duplicate face',
    'degenerate-face':'Solidify refused • degenerate face',
    'zero-area-face':'Solidify refused • zero-area face',
    'opposed-fold':'Solidify refused • folded faces oppose each other',
    'excessive-miter':'Solidify refused • fold angle creates an excessive thickness miter',
    'singular-offset':'Solidify refused • fold geometry cannot form a stable offset'
  };
  return labels[reason]||`Solidify refused • ${reason||'invalid open mesh'}`;
}
function update(){
  const object=activeObject(),live=mesh();
  if(previewArmed&&(selectionMode()!=='object'||object?.id!==previewObjectId))cancelPreview({silent:true});
  const eligible=selectionMode()==='object'&&!!object&&!!live&&!object.locked&&object.kind!=='reference';
  if(button)button.disabled=!eligible;
  syncThickness();
}
function forceRender(){
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));
  globalThis.__boxlabObjectSelection?.refresh?.();
  globalThis.__boxlabTopologyGate?.sync?.();
}
input?.addEventListener('input',()=>{
  syncThickness();
  if(previewArmed)buildPreview();
});
button?.addEventListener('click',()=>{
  const object=activeObject(),live=mesh();
  if(!object||!live||object.locked||object.kind==='reference'||selectionMode()!=='object')return;

  if(!previewArmed){
    const preflight=analyzeSolidifyInput(live);
    if(!preflight.ok){setStatus(preflightMessage(preflight.reason));return;}
    previewArmed=true;previewObjectId=object.id;
    button.textContent='Apply Solidify';
    buildPreview();
    return;
  }

  if(object.id!==previewObjectId){cancelPreview({silent:true});return;}
  globalThis.__boxlabObjectHistory?.checkpoint?.();
  const result=solidifyOpenMesh(live,thickness());
  if(!result.ok){setStatus(`Solidify rolled back • ${result.reason||'topology validation failed'}`);cancelPreview({silent:true});forceRender();return;}
  disposePreview();previewArmed=false;previewObjectId=null;
  button.textContent='Solidify';
  manager()?.saveActive?.();
  globalThis.__boxlabSolidifyLastResult={version:'0.36.18.374',...result};
  setStatus(`Solidify • thickness ${Number(result.thickness.toFixed(3))} • ${result.sideFaces} boundary wall${result.sideFaces===1?'':'s'} • closed solid`);
  forceRender();
});

window.addEventListener('boxlab-object-manager-ready',update);
window.addEventListener('boxlab-bridge-state',()=>queueMicrotask(update));
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(update)));
window.addEventListener('beforeunload',()=>disposePreview());
update();

globalThis.__boxlabSolidifyPreview={
  get active(){return previewArmed;},
  rebuild:buildPreview,
  cancel:cancelPreview
};
