import * as THREE from 'three';

const objectTools=document.querySelector('.mode-tools[data-mode-tools="object"]');
const status=document.querySelector('#selectionStatus');
const drawer=document.querySelector('#editDrawer');

const controls=document.createElement('div');
controls.className='linear-array-controls';
controls.innerHTML=`
  <div class="outliner-actions" style="grid-template-columns:repeat(3,1fr);margin-top:8px">
    <button id="linearArrayBtn" type="button" disabled>Array</button>
    <button type="button" data-array-axis="x" class="active">X</button>
    <button type="button" data-array-axis="y">Y</button>
  </div>
  <div class="outliner-actions" style="grid-template-columns:repeat(3,1fr)">
    <button type="button" data-array-axis="z">Z</button>
    <span></span><span></span>
  </div>
  <label class="range-row">
    <span>Count</span>
    <input id="linearArrayCount" type="range" min="2" max="10" value="3" step="1"/>
    <output id="linearArrayCountOut">3</output>
  </label>
  <label class="range-row">
    <span>Spacing</span>
    <input id="linearArraySpacing" type="range" min="0.1" max="10" value="2.5" step="0.1"/>
    <output id="linearArraySpacingOut">2.5</output>
  </label>
`;
objectTools?.appendChild(controls);

const button=controls.querySelector('#linearArrayBtn');
const countInput=controls.querySelector('#linearArrayCount');
const countOut=controls.querySelector('#linearArrayCountOut');
const spacingInput=controls.querySelector('#linearArraySpacing');
const spacingOut=controls.querySelector('#linearArraySpacingOut');
const axisButtons=[...controls.querySelectorAll('[data-array-axis]')];

let axis='x',preview=null,previewArmed=false,previewObjectId=null,drawerLock=null;

function manager(){return globalThis.__boxlabObjectManager;}
function state(){return globalThis.__boxlabBridgeState;}
function activeObject(){const m=manager();return m?.objects?.find(o=>o.id===m.activeId)||null;}
function mode(){return globalThis.__boxlabSelectionBridge?.mode?.()||document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
function count(){return Math.max(2,Math.min(10,Math.round(Number(countInput?.value)||3)));}
function spacing(){return Math.max(.1,Math.min(10,Number(spacingInput?.value)||2.5));}
function axisVector(){return axis==='y'?new THREE.Vector3(0,1,0):axis==='z'?new THREE.Vector3(0,0,1):new THREE.Vector3(1,0,0);}
function setStatus(text){if(status)status.textContent=text;}
function syncOutputs(){if(countOut)countOut.textContent=String(count());if(spacingOut)spacingOut.textContent=Number(spacing().toFixed(2)).toString();}

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
function lockDrawer(){
  if(!drawer)return;
  if(!drawerLock)drawerLock={keepOpen:drawer.dataset.keepOpen,open:drawer.open};
  drawer.dataset.keepOpen='true';drawer.open=true;
}
function unlockDrawer(){
  if(!drawer||!drawerLock)return;
  const old=drawerLock;drawerLock=null;
  if(old.keepOpen===undefined)delete drawer.dataset.keepOpen;else drawer.dataset.keepOpen=old.keepOpen;
  if(old.open)drawer.open=true;
}
function cancelPreview({silent=false}={}){
  disposePreview();previewArmed=false;previewObjectId=null;unlockDrawer();
  if(button)button.textContent='Array';
  if(!silent)setStatus('Array preview cancelled');
}
function buildPreview(){
  if(!previewArmed)return false;
  const object=activeObject(),scene=state()?.scene;
  if(!object||object.id!==previewObjectId||!scene){cancelPreview({silent:true});return false;}
  disposePreview();
  const geometry=object.mesh?.triangulatedGeometry?.();
  if(!geometry)return false;
  const fillMaterial=new THREE.MeshBasicMaterial({color:0x62d8ff,transparent:true,opacity:.16,side:THREE.DoubleSide,depthWrite:false});
  const wireMaterial=new THREE.MeshBasicMaterial({color:0x62d8ff,transparent:true,opacity:.58,side:THREE.DoubleSide,wireframe:true,depthWrite:false});
  const dir=axisVector(),group=new THREE.Group();
  for(let i=1;i<count();i++){
    const fill=new THREE.Mesh(geometry,fillMaterial),wire=new THREE.Mesh(geometry,wireMaterial);
    const offset=dir.clone().multiplyScalar(spacing()*i);
    fill.position.copy(offset);wire.position.copy(offset);
    fill.renderOrder=10;wire.renderOrder=11;
    group.add(fill,wire);
  }
  preview=group;
  preview.name='BoxLab Linear Array Preview';
  preview.userData.boxlabLinearArrayPreview=true;
  scene.add(preview);
  setStatus(`Array preview • ${count()} total • ${axis.toUpperCase()} • spacing ${Number(spacing().toFixed(2))} • Apply Array to commit`);
  return true;
}
function sync(){
  syncOutputs();
  const object=activeObject();
  const eligible=mode()==='object'&&!!object&&!object.locked&&object.kind!=='reference';
  if(button)button.disabled=!eligible;
  if(previewArmed&&(object?.id!==previewObjectId||mode()!=='object'))cancelPreview({silent:true});
}
function nudgeLive(offset){
  const live=state()?.mesh;
  if(!live?.vertices)return false;
  for(const vertex of live.vertices)vertex.add(offset);
  live.edges?.();
  return true;
}
function applyArray(){
  const m=manager(),source=activeObject();
  if(!m||!source||source.id!==previewObjectId||source.locked||source.kind==='reference')return false;
  const before=globalThis.__boxlabObjectHistory?.capture?.()||null;
  m.saveActive?.();
  const sourceId=source.id,created=[],dir=axisVector();
  for(let i=1;i<count();i++){
    const copy=m.linkedDuplicateObject?.(sourceId,{enterObjectMode:false,name:m.nextDuplicateName?.(source.name)});
    if(!copy){setStatus('Array refused • linked duplicate could not be created');return false;}
    const offset=dir.clone().multiplyScalar(spacing()*i);
    if(!nudgeLive(offset)){setStatus('Array refused • active instance mesh unavailable');return false;}
    m.saveActive?.();
    created.push(copy.id);
  }
  m.activate?.(sourceId);
  if(before)globalThis.__boxlabObjectHistory?.checkpointSnapshot?.(before);
  globalThis.__boxlabObjectSelection?.refresh?.();
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));
  globalThis.__boxlabLinearArrayLastResult={version:'0.36.18.382',sourceId,createdIds:created,count:count(),spacing:spacing(),axis};
  setStatus(`Array • ${created.length} linked instance${created.length===1?'':'s'} created • ${axis.toUpperCase()} spacing ${Number(spacing().toFixed(2))}`);
  return true;
}

function installPenRange(input,onValue){
  if(!input)return;
  let pointerId=null,owned=null,releaseFrame=null;
  const map=clientX=>{
    const rect=input.getBoundingClientRect(),min=Number(input.min),max=Number(input.max),step=Number(input.step)||1;
    if(!rect.width)return Number(input.value);
    const t=Math.max(0,Math.min(1,(clientX-rect.left)/rect.width));
    const raw=min+t*(max-min);
    return Number((min+Math.round((raw-min)/step)*step).toFixed(6));
  };
  const apply=value=>{owned=value;input.value=String(value);onValue();};
  const enforce=()=>{if(owned===null)return false;if(Number(input.value)!==Number(owned))input.value=String(owned);return true;};
  input.addEventListener('pointerdown',event=>{
    if(event.pointerType!=='pen')return;
    pointerId=event.pointerId;input.setPointerCapture?.(pointerId);event.preventDefault();event.stopPropagation();apply(map(event.clientX));
  },{capture:true,passive:false});
  input.addEventListener('pointermove',event=>{
    if(event.pointerType!=='pen'||event.pointerId!==pointerId)return;
    event.preventDefault();event.stopPropagation();apply(map(event.clientX));
  },{capture:true,passive:false});
  const end=event=>{
    if(event.pointerType!=='pen'||event.pointerId!==pointerId)return;
    event.preventDefault();event.stopPropagation();
    if(input.hasPointerCapture?.(pointerId))input.releasePointerCapture(pointerId);
    pointerId=null;
    if(releaseFrame)cancelAnimationFrame(releaseFrame);
    releaseFrame=requestAnimationFrame(()=>{enforce();releaseFrame=requestAnimationFrame(()=>{enforce();owned=null;releaseFrame=null;});});
  };
  input.addEventListener('pointerup',end,{capture:true,passive:false});
  input.addEventListener('pointercancel',end,{capture:true,passive:false});
  input.addEventListener('input',()=>{enforce();onValue();});
  input.addEventListener('change',()=>{if(enforce())onValue();});
}

axisButtons.forEach(control=>control.addEventListener('click',()=>{
  axis=control.dataset.arrayAxis;
  axisButtons.forEach(b=>b.classList.toggle('active',b===control));
  if(previewArmed)buildPreview();
}));
installPenRange(countInput,()=>{syncOutputs();if(previewArmed)buildPreview();});
installPenRange(spacingInput,()=>{syncOutputs();if(previewArmed)buildPreview();});
drawer?.addEventListener('toggle',()=>{if(previewArmed&&!drawer.open)queueMicrotask(()=>{if(previewArmed)drawer.open=true;});});

button?.addEventListener('click',()=>{
  const object=activeObject();
  if(!object||mode()!=='object'||object.locked||object.kind==='reference')return;
  if(!previewArmed){
    previewArmed=true;previewObjectId=object.id;lockDrawer();button.textContent='Apply Array';buildPreview();return;
  }
  if(applyArray()){
    disposePreview();previewArmed=false;previewObjectId=null;unlockDrawer();button.textContent='Array';
  }
});

window.addEventListener('boxlab-object-manager-ready',sync);
window.addEventListener('boxlab-bridge-state',()=>queueMicrotask(sync));
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
window.addEventListener('beforeunload',()=>{disposePreview();unlockDrawer();});
sync();

globalThis.__boxlabLinearArray={
  version:'0.36.18.382',
  get active(){return previewArmed;},
  rebuild:buildPreview,
  cancel:cancelPreview
};
