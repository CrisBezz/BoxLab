import * as THREE from 'three';
import { analyzeShellInput, shellClosedMesh } from './shell-core.js?v=0.36.18.377';

const faceTools=document.querySelector('.mode-tools[data-mode-tools="face"]');
const status=document.querySelector('#selectionStatus');
const canvas=document.querySelector('#viewport');

let preview=null,previewArmed=false,previewObjectId=null,previewFaces=[],pencilThicknessPointer=null,pencilThicknessValue=null,pencilReleaseFrame=null;

const launchControls=document.createElement('div');
launchControls.className='shell-face-controls shell-launch-controls';
launchControls.innerHTML=`
  <div class="outliner-actions" style="grid-template-columns:repeat(3,1fr)">
    <button id="shellFacesBtn" type="button" disabled>Shell</button>
  </div>
`;
faceTools?.appendChild(launchControls);

const controls=document.createElement('div');
controls.id='shellSession';
controls.className='boxlab-tool-session-shell shell-face-controls';
controls.hidden=true;
controls.innerHTML=`
  <div class="boxlab-tool-session-title"><span>Shell</span><span class="boxlab-tool-session-subtitle">Closed solid → hollow solid</span></div>
  <div class="boxlab-tool-session-section">Thickness</div>
  <label class="range-row shell-thickness-row">
    <span>Shell Thickness</span>
    <input id="shellThickness" type="range" min="0.01" max="1" value="0.2" step="0.01"/>
    <output id="shellThicknessOut">0.2</output>
  </label>
  <div class="outliner-actions" style="grid-template-columns:repeat(2,1fr)">
    <button id="shellCancelBtn" type="button">Cancel</button>
    <button id="shellApplyBtn" class="boxlab-tool-session-primary" type="button">Apply Shell</button>
  </div>
`;
faceTools?.appendChild(controls);

const button=launchControls.querySelector('#shellFacesBtn');
const input=controls.querySelector('#shellThickness');
const output=controls.querySelector('#shellThicknessOut');
const applyButton=controls.querySelector('#shellApplyBtn');
const cancelButton=controls.querySelector('#shellCancelBtn');

function state(){return globalThis.__boxlabBridgeState;}
function mesh(){return state()?.mesh||null;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function manager(){return globalThis.__boxlabObjectManager;}
function activeObject(){const m=manager();return m?.objects?.find(o=>o.id===m.activeId)||null;}
function selectedFaces(){
  const b=bridge(),m=mesh();
  if(!m||b?.mode?.()!=='face')return[];
  return[...new Set(b.indices?.()||[])].filter(i=>Number.isInteger(i)&&m.faces?.[i]);
}
function thickness(){const n=Number(input?.value);return Number.isFinite(n)?n:0.2;}
function syncThickness(){if(output)output.textContent=Number(thickness().toFixed(3)).toString();}
function rangeValueAtClientX(clientX){
  if(!input)return 0.2;
  const rect=input.getBoundingClientRect();
  const min=Number(input.min)||0.01,max=Number(input.max)||1,step=Number(input.step)||0.01;
  if(!rect.width)return thickness();
  const t=Math.max(0,Math.min(1,(clientX-rect.left)/rect.width));
  const raw=min+t*(max-min);
  const snapped=min+Math.round((raw-min)/step)*step;
  return Number(Math.max(min,Math.min(max,snapped)).toFixed(6));
}
function applyThicknessValue(value){
  if(!input)return;
  pencilThicknessValue=value;
  input.value=String(value);
  input.dispatchEvent(new Event('input',{bubbles:true}));
}
function enforcePencilThickness(){
  if(!input||pencilThicknessValue===null)return false;
  const expected=String(pencilThicknessValue);
  if(input.value!==expected)input.value=expected;
  return true;
}
function beginPencilThickness(event){
  if(event.pointerType!=='pen')return;
  pencilThicknessPointer=event.pointerId;
  input?.setPointerCapture?.(event.pointerId);
  event.preventDefault();
  event.stopPropagation();
  applyThicknessValue(rangeValueAtClientX(event.clientX));
}
function movePencilThickness(event){
  if(event.pointerType!=='pen'||event.pointerId!==pencilThicknessPointer)return;
  event.preventDefault();
  event.stopPropagation();
  applyThicknessValue(rangeValueAtClientX(event.clientX));
}
function endPencilThickness(event){
  if(event.pointerType!=='pen'||event.pointerId!==pencilThicknessPointer)return;
  event.preventDefault();
  event.stopPropagation();
  if(input?.hasPointerCapture?.(event.pointerId))input.releasePointerCapture(event.pointerId);
  pencilThicknessPointer=null;
  if(pencilReleaseFrame)cancelAnimationFrame(pencilReleaseFrame);
  // Safari may emit a late native range input/change after Pencil-up.
  // Keep Pencil ownership through one extra painted frame, then release it.
  pencilReleaseFrame=requestAnimationFrame(()=>{
    enforcePencilThickness();
    pencilReleaseFrame=requestAnimationFrame(()=>{
      enforcePencilThickness();
      pencilThicknessValue=null;
      pencilReleaseFrame=null;
    });
  });
}
function setStatus(text){if(status)status.textContent=text;}
function scene(){return state()?.scene||null;}
function disposePreview(){
  if(preview?.parent)preview.parent.remove(preview);
  if(preview){
    const geometries=new Set(),materials=new Set();
    preview.traverse?.(node=>{
      if(node.geometry)geometries.add(node.geometry);
      if(Array.isArray(node.material))node.material.forEach(m=>m&&materials.add(m));
      else if(node.material)materials.add(node.material);
    });
    geometries.forEach(g=>g.dispose?.());
    materials.forEach(m=>m.dispose?.());
  }
  preview=null;
}
function toolSession(){return globalThis.__boxlabToolSession||null;}
function beginShellSession(){
  controls.hidden=false;
  toolSession()?.begin?.({id:'shell',title:'Shell',node:controls,subtitle:'Opening Faces · Thickness · Apply'});
}
function endShellSession(){
  controls.hidden=true;
  toolSession()?.end?.('shell');
}
function cancelPreview({silent=false}={}){
  disposePreview();previewArmed=false;previewObjectId=null;previewFaces=[];
  endShellSession();
  if(!silent)setStatus('Shell preview cancelled');
}
function buildPreview(){
  if(!previewArmed)return false;
  const object=activeObject(),live=mesh(),target=scene();
  if(!object||!live||!target||object.id!==previewObjectId){cancelPreview({silent:true});return false;}
  const working=live.clone();
  const result=shellClosedMesh(working,previewFaces,thickness());
  disposePreview();
  if(!result.ok){setStatus(`Shell preview unavailable • ${result.detail||result.reason}`);return false;}
  const geometry=working.triangulatedGeometry();
  const fillMaterial=new THREE.MeshBasicMaterial({
    color:0x62d8ff,transparent:true,opacity:.18,side:THREE.DoubleSide,
    depthTest:false,depthWrite:false
  });
  const wireMaterial=new THREE.MeshBasicMaterial({
    color:0x62d8ff,transparent:true,opacity:.72,side:THREE.DoubleSide,
    wireframe:true,depthTest:false,depthWrite:false
  });
  const fill=new THREE.Mesh(geometry,fillMaterial);
  const wire=new THREE.Mesh(geometry,wireMaterial);
  fill.renderOrder=13;
  wire.renderOrder=14;
  preview=new THREE.Group();
  preview.add(fill,wire);
  preview.name='BoxLab Shell Preview';
  preview.userData.boxlabShellPreview=true;
  target.add(preview);
  setStatus(`Shell preview • ${previewFaces.length} opening face${previewFaces.length===1?'':'s'} • thickness ${Number(thickness().toFixed(3))} • Apply Shell to commit`);
  return true;
}
function message(result){
  const labels={
    'needs-closed-solid':'Shell needs a closed solid',
    'no-selected-faces':'Select one or more Faces to remove as Shell openings',
    'all-faces-selected':'Shell needs at least one outer Face to remain',
    'loose-topology':'Shell refused • loose topology is present',
    'invalid-opening':`Shell opening refused • ${result?.detail||'selected Faces do not form a valid opening'}`
  };
  return labels[result?.reason]||`Shell refused • ${result?.detail||result?.reason||'invalid selection'}`;
}
function sync(){
  syncThickness();
  const object=activeObject(),live=mesh(),ids=selectedFaces();
  const eligible=!!object&&!!live&&!object.locked&&object.kind!=='reference'&&ids.length>0;
  if(button)button.disabled=!eligible||previewArmed;
  if(previewArmed){
    if(object?.id!==previewObjectId||bridge()?.mode?.()!=='face')cancelPreview({silent:true});
    else if(!toolSession()?.isActive?.('shell'))beginShellSession();
  }
}
function forceRender(){
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));
  globalThis.__boxlabObjectSelection?.refresh?.();
  globalThis.__boxlabTopologyGate?.sync?.();
}

input?.addEventListener('input',()=>{
  enforcePencilThickness();
  syncThickness();
  if(previewArmed)buildPreview();
});
input?.addEventListener('change',()=>{
  if(!enforcePencilThickness())return;
  syncThickness();
  if(previewArmed)buildPreview();
});
input?.addEventListener('pointerdown',beginPencilThickness,{capture:true,passive:false});
input?.addEventListener('pointermove',movePencilThickness,{capture:true,passive:false});
input?.addEventListener('pointerup',endPencilThickness,{capture:true,passive:false});
input?.addEventListener('pointercancel',endPencilThickness,{capture:true,passive:false});
button?.addEventListener('click',()=>{
  const object=activeObject(),live=mesh(),ids=selectedFaces();
  if(!object||!live||object.locked||object.kind==='reference'||previewArmed)return;
  const check=analyzeShellInput(live,ids);
  if(!check.ok){setStatus(message(check));return;}
  previewArmed=true;previewObjectId=object.id;previewFaces=[...check.selectedFaces];
  beginShellSession();
  buildPreview();
});
applyButton?.addEventListener('click',()=>{
  const object=activeObject(),live=mesh();
  if(!previewArmed||!object||!live||object.id!==previewObjectId){cancelPreview({silent:true});return;}
  globalThis.__boxlabObjectHistory?.checkpoint?.();
  const result=shellClosedMesh(live,previewFaces,thickness());
  if(!result.ok){setStatus(message(result));cancelPreview({silent:true});forceRender();return;}
  disposePreview();previewArmed=false;previewObjectId=null;previewFaces=[];
  endShellSession();
  bridge()?.set?.('face',[]);
  manager()?.saveActive?.();
  globalThis.__boxlabShellLastResult={version:'0.36.18.421',...result};
  setStatus(`Shell • ${result.removedFaces} opening face${result.removedFaces===1?'':'s'} • thickness ${Number(result.thickness.toFixed(3))} • closed solid`);
  forceRender();
  sync();
});
cancelButton?.addEventListener('click',()=>cancelPreview());

window.addEventListener('boxlab-object-manager-ready',sync);
window.addEventListener('boxlab-bridge-state',()=>queueMicrotask(sync));
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
window.addEventListener('beforeunload',()=>{disposePreview();endShellSession();});
sync();

globalThis.__boxlabShell={
  version:'0.36.18.421',
  analyze:analyzeShellInput,
  cancel:cancelPreview,
  get active(){return previewArmed;}
};
