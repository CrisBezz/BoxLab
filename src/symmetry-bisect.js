import * as THREE from 'three';
import {symmetryBisect} from './symmetry-bisect-core.js?v=0.36.18.428';

const VERSION='0.36.18.428';
const objectTools=document.querySelector('.mode-tools[data-mode-tools="object"]');
const status=document.querySelector('#selectionStatus');

const launchRow=document.createElement('div');
launchRow.className='outliner-actions symmetry-bisect-launch-row';
launchRow.style.gridTemplateColumns='1fr';
launchRow.innerHTML='<button id="symmetryBisectBtn" type="button">Symmetry / Bisect</button>';
objectTools?.appendChild(launchRow);
const launchButton=launchRow.querySelector('#symmetryBisectBtn');

const controls=document.createElement('div');
controls.id='symmetryBisectSession';
controls.className='boxlab-tool-session-shell symmetry-bisect-session';
controls.hidden=true;
controls.innerHTML=`
  <div class="boxlab-tool-session-title"><span>Symmetry / Bisect</span><span class="boxlab-tool-session-subtitle">Object origin plane</span></div>
  <div class="boxlab-tool-session-section">Axis</div>
  <div class="outliner-actions symmetry-axis" style="grid-template-columns:repeat(3,1fr)">
    <button type="button" data-sym-axis="x" class="active">X</button>
    <button type="button" data-sym-axis="y">Y</button>
    <button type="button" data-sym-axis="z">Z</button>
  </div>
  <div class="boxlab-tool-session-section">Keep side</div>
  <div class="outliner-actions symmetry-keep" style="grid-template-columns:repeat(2,1fr)">
    <button type="button" data-sym-keep="positive" class="active">Keep +</button>
    <button type="button" data-sym-keep="negative">Keep −</button>
  </div>
  <label class="toggle-row"><input id="symmetryMirrorToggle" type="checkbox" checked/><span>Mirror kept half</span></label>
  <div class="outliner-actions" style="grid-template-columns:repeat(2,1fr)">
    <button id="symmetryCancelBtn" type="button">Cancel</button>
    <button id="symmetryApplyBtn" class="boxlab-tool-session-primary" type="button">Apply</button>
  </div>
`;
objectTools?.appendChild(controls);

const axisButtons=[...controls.querySelectorAll('[data-sym-axis]')];
const keepButtons=[...controls.querySelectorAll('[data-sym-keep]')];
const mirrorToggle=controls.querySelector('#symmetryMirrorToggle');
const cancelButton=controls.querySelector('#symmetryCancelBtn');
const applyButton=controls.querySelector('#symmetryApplyBtn');

let active=false,objectId=null,source=null,preview=null,axis='x',keep='positive';

function manager(){return globalThis.__boxlabObjectManager;}
function activeObject(){const m=manager();return m?.objects?.find(o=>o.id===m.activeId)||null;}
function mesh(){return globalThis.__boxlabBridgeState?.mesh||null;}
function scene(){return globalThis.__boxlabBridgeState?.scene||null;}
function mode(){return document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
function toolSession(){return globalThis.__boxlabToolSession||null;}
function setStatus(text){if(status)status.textContent=text;}
function mirrorModifierActive(){return [...document.querySelectorAll('[data-mirror-axis]')].some(input=>input.checked);}
function beginSession(){controls.hidden=false;toolSession()?.begin?.({id:'symmetry-bisect',title:'Symmetry / Bisect',node:controls,subtitle:'Axis · Keep · Mirror · Apply'});}
function endSession(){controls.hidden=true;toolSession()?.end?.('symmetry-bisect');}
function disposePreview(){
  if(preview?.parent)preview.parent.remove(preview);
  preview?.traverse?.(n=>{n.geometry?.dispose?.();if(Array.isArray(n.material))n.material.forEach(m=>m?.dispose?.());else n.material?.dispose?.();});
  preview=null;
}
function planeVisual(sourceMesh){
  const box=new THREE.Box3().setFromPoints(sourceMesh.vertices),size=new THREE.Vector3();box.getSize(size);
  const extent=Math.max(size.x,size.y,size.z,1)*1.25;
  const g=new THREE.PlaneGeometry(extent,extent);
  const m=new THREE.MeshBasicMaterial({color:0xffd45c,transparent:true,opacity:.13,side:THREE.DoubleSide,depthTest:false,depthWrite:false});
  const plane=new THREE.Mesh(g,m);
  if(axis==='x')plane.rotation.y=Math.PI/2;
  else if(axis==='y')plane.rotation.x=Math.PI/2;
  plane.renderOrder=20;
  const wire=new THREE.LineSegments(new THREE.EdgesGeometry(g),new THREE.LineBasicMaterial({color:0xffd45c,transparent:true,opacity:.85,depthTest:false}));
  wire.rotation.copy(plane.rotation);wire.renderOrder=21;
  const group=new THREE.Group();group.add(plane,wire);return group;
}
function buildPreview(){
  if(!active||!source)return false;
  const result=symmetryBisect(source,{axis,keep,mirror:!!mirrorToggle?.checked});
  disposePreview();
  if(!result.ok){setStatus(`Symmetry/Bisect preview unavailable • ${result.reason}`);return false;}
  const targetScene=scene();if(!targetScene)return false;
  const geometry=result.mesh.triangulatedGeometry();
  const fill=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({color:0x62d8ff,transparent:true,opacity:.28,side:THREE.DoubleSide,depthTest:false,depthWrite:false}));
  const wire=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({color:0x62d8ff,transparent:true,opacity:.82,side:THREE.DoubleSide,wireframe:true,depthTest:false,depthWrite:false}));
  fill.renderOrder=18;wire.renderOrder=19;
  preview=new THREE.Group();preview.name='BoxLab Symmetry Bisect Preview';preview.userData.boxlabSymmetryPreview=true;preview.add(fill,wire,planeVisual(source));
  targetScene.add(preview);
  setStatus(`Symmetry/Bisect preview • ${axis.toUpperCase()} • Keep ${keep==='positive'?'+':'−'} • ${mirrorToggle?.checked?'Mirror':'Bisect only'}`);
  return true;
}
function cancel({silent=false}={}){
  disposePreview();active=false;objectId=null;source=null;endSession();sync();
  if(!silent)setStatus('Symmetry / Bisect cancelled');
}
function forceRender(){
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));
  globalThis.__boxlabObjectSelection?.refresh?.();
  globalThis.__boxlabTopologyGate?.sync?.();
}
function sync(){
  const object=activeObject(),eligible=mode()==='object'&&!!object&&!!mesh()&&!object.locked&&object.kind!=='reference';
  if(launchButton)launchButton.disabled=!eligible||active;
  if(active&&(mode()!=='object'||object?.id!==objectId))cancel({silent:true});
  if(active&&!toolSession()?.isActive?.('symmetry-bisect'))beginSession();
}
function updateButtons(){
  axisButtons.forEach(b=>b.classList.toggle('active',b.dataset.symAxis===axis));
  keepButtons.forEach(b=>b.classList.toggle('active',b.dataset.symKeep===keep));
}
launchButton?.addEventListener('click',()=>{
  const object=activeObject(),live=mesh();
  if(!object||!live||mode()!=='object'||object.locked||object.kind==='reference'||active)return;
  if(mirrorModifierActive()){setStatus('Symmetry / Bisect • turn off the non-destructive Mirror modifier first');return;}
  source=live.clone();objectId=object.id;active=true;axis='x';keep='positive';if(mirrorToggle)mirrorToggle.checked=true;updateButtons();beginSession();buildPreview();
});
axisButtons.forEach(button=>button.addEventListener('click',()=>{axis=button.dataset.symAxis;updateButtons();buildPreview();}));
keepButtons.forEach(button=>button.addEventListener('click',()=>{keep=button.dataset.symKeep;updateButtons();buildPreview();}));
mirrorToggle?.addEventListener('change',buildPreview);
cancelButton?.addEventListener('click',()=>cancel());
applyButton?.addEventListener('click',()=>{
  const object=activeObject(),live=mesh();
  if(!active||!source||!object||!live||object.id!==objectId){cancel({silent:true});return;}
  const result=symmetryBisect(source,{axis,keep,mirror:!!mirrorToggle?.checked});
  if(!result.ok){setStatus(`Symmetry / Bisect refused • ${result.reason}`);return;}
  globalThis.__boxlabObjectHistory?.checkpoint?.();
  live.vertices=result.mesh.vertices.map(v=>v.clone());
  live.faces=result.mesh.faces.map(f=>[...f]);
  live.creases=new Map(result.mesh.creases||[]);
  disposePreview();active=false;objectId=null;source=null;endSession();
  manager()?.saveActive?.();forceRender();sync();
  globalThis.__boxlabSymmetryLastResult={version:VERSION,axis,keep,mirrored:result.mirrored,cutVertices:result.cutVertices};
  setStatus(`Symmetry / Bisect applied • ${axis.toUpperCase()} • Keep ${keep==='positive'?'+':'−'} • ${result.mirrored?'mirrored + welded':'bisected'}`);
});

window.addEventListener('boxlab-object-manager-ready',sync);
window.addEventListener('boxlab-bridge-state',()=>queueMicrotask(sync));
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
window.addEventListener('beforeunload',()=>cancel({silent:true}));
sync();

globalThis.__boxlabSymmetryBisect={version:VERSION,get active(){return active;},rebuild:buildPreview,cancel};
