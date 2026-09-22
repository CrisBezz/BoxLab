import * as THREE from 'three';

const objectTools=document.querySelector('.mode-tools[data-mode-tools="object"]');
const status=document.querySelector('#selectionStatus');
const drawer=document.querySelector('#editDrawer');
const canvas=document.querySelector('#viewport');
const raycaster=new THREE.Raycaster();
const pointer=new THREE.Vector2();

const launchRow=document.createElement('div');
launchRow.className='outliner-actions linear-array-launch-row';
launchRow.style.gridTemplateColumns='1fr';
launchRow.innerHTML='<button id="linearArrayLaunchBtn" type="button" disabled>Array</button>';
objectTools?.appendChild(launchRow);

const controls=document.createElement('div');
controls.id='linearArraySession';
controls.className='boxlab-tool-session-shell linear-array-controls';
controls.hidden=true;
controls.innerHTML=`
  <div class="boxlab-tool-session-title"><span>Array</span><span class="boxlab-tool-session-subtitle">Linked instances</span></div>
  <div class="boxlab-tool-session-section">Direction</div>
  <div class="outliner-actions" style="grid-template-columns:repeat(4,1fr)">
    <button type="button" data-array-move="free" class="active">Free</button>
    <button type="button" data-array-move="x">X</button>
    <button type="button" data-array-move="y">Y</button>
    <button type="button" data-array-move="z">Z</button>
  </div>
  <div class="boxlab-tool-session-section">Copies</div>
  <label class="range-row">
    <span>Count</span>
    <input id="linearArrayCount" type="range" min="2" max="12" value="2" step="1"/>
    <output id="linearArrayCountOut">2</output>
  </label>
  <div class="drawer-hint">Drag the highlighted END copy in the viewport to set the full array vector.</div>
  <div class="outliner-actions" style="grid-template-columns:repeat(2,1fr)">
    <button id="linearArrayCancelBtn" type="button">Cancel</button>
    <button id="linearArrayApplyBtn" class="boxlab-tool-session-primary" type="button">Apply Array</button>
  </div>
`;
objectTools?.appendChild(controls);

const launchButton=launchRow.querySelector('#linearArrayLaunchBtn');
const applyButton=controls.querySelector('#linearArrayApplyBtn');
const cancelButton=controls.querySelector('#linearArrayCancelBtn');
const countInput=controls.querySelector('#linearArrayCount');
const countOut=controls.querySelector('#linearArrayCountOut');
const moveButtons=[...controls.querySelectorAll('[data-array-move]')];

let moveMode='free';
let endpoint=new THREE.Vector3(2.5,0,0);
let preview=null,previewArmed=false,previewObjectId=null,endpointDrag=null;

function manager(){return globalThis.__boxlabObjectManager;}
function state(){return globalThis.__boxlabBridgeState;}
function camera(){return state()?.camera||null;}
function orbitControls(){return state()?.controls||null;}
function activeObject(){const m=manager();return m?.objects?.find(o=>o.id===m.activeId)||null;}
function mode(){return globalThis.__boxlabSelectionBridge?.mode?.()||document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
function count(){return Math.max(2,Math.min(12,Math.round(Number(countInput?.value)||2)));}
function setStatus(text){if(status)status.textContent=text;}
function syncCount(){if(countOut)countOut.textContent=String(count());}
function endpointLength(){return endpoint.length();}
function endpointText(){
  return `Δ ${endpoint.x.toFixed(2)}, ${endpoint.y.toFixed(2)}, ${endpoint.z.toFixed(2)}`;
}

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
function beginArraySession(){
  controls.hidden=false;
  toolSession()?.begin?.({id:'array',title:'Array',node:controls,subtitle:'Direction · Count · Apply'});
}
function endArraySession(){
  controls.hidden=true;
  toolSession()?.end?.('array');
}
function endEndpointDrag(){
  if(!endpointDrag)return;
  const ctl=orbitControls();
  if(ctl)ctl.enabled=endpointDrag.controlsWereEnabled;
  endpointDrag=null;
}
function cancelPreview({silent=false}={}){
  endEndpointDrag();
  disposePreview();previewArmed=false;previewObjectId=null;endArraySession();
  if(!silent)setStatus('Array preview cancelled');
}
function buildPreview(){
  if(!previewArmed)return false;
  const object=activeObject(),scene=state()?.scene;
  if(!object||object.id!==previewObjectId||!scene){cancelPreview({silent:true});return false;}
  disposePreview();
  const geometry=object.mesh?.triangulatedGeometry?.();
  if(!geometry)return false;

  const group=new THREE.Group();
  const total=count();
  for(let i=1;i<total;i++){
    const isEndpoint=i===total-1;
    const fillMaterial=new THREE.MeshBasicMaterial({
      color:0x62d8ff,transparent:true,opacity:isEndpoint?.28:.11,side:THREE.DoubleSide,depthWrite:false
    });
    const wireMaterial=new THREE.MeshBasicMaterial({
      color:0x62d8ff,transparent:true,opacity:isEndpoint?.9:.42,side:THREE.DoubleSide,wireframe:true,depthWrite:false
    });
    const fill=new THREE.Mesh(geometry,fillMaterial),wire=new THREE.Mesh(geometry,wireMaterial);
    const t=i/(total-1);
    const offset=endpoint.clone().multiplyScalar(t);
    fill.position.copy(offset);wire.position.copy(offset);
    fill.userData.arrayIndex=i;wire.userData.arrayIndex=i;
    fill.userData.arrayEndpoint=isEndpoint;wire.userData.arrayEndpoint=isEndpoint;
    fill.renderOrder=isEndpoint?12:10;wire.renderOrder=isEndpoint?13:11;
    group.add(fill,wire);
  }
  preview=group;
  preview.name='BoxLab Linear Array Endpoint Preview';
  preview.userData.boxlabLinearArrayPreview=true;
  scene.add(preview);
  setStatus(`Array preview • ${count()} total • ${endpointText()} • move END copy (${moveMode.toUpperCase()}) • Apply Array`);
  return true;
}
function pointerNdc(event){
  const rect=canvas?.getBoundingClientRect();
  if(!rect||!rect.width||!rect.height)return false;
  pointer.x=((event.clientX-rect.left)/rect.width)*2-1;
  pointer.y=-((event.clientY-rect.top)/rect.height)*2+1;
  return true;
}
function screenAxis(point,axisVector){
  const cam=camera(),rect=canvas?.getBoundingClientRect();
  if(!cam||!rect||!point)return null;
  const distance=Math.max(.01,cam.position.distanceTo(point));
  const probe=Math.max(distance*.08,.05);
  const a=point.clone().project(cam),b=point.clone().addScaledVector(axisVector,probe).project(cam);
  const dx=(b.x-a.x)*rect.width*.5,dy=-(b.y-a.y)*rect.height*.5;
  const length=Math.hypot(dx,dy);
  if(length<4)return null;
  const worldPerPixel=cam.isPerspectiveCamera
    ?(2*distance*Math.tan(THREE.MathUtils.degToRad(cam.fov*.5)))/Math.max(1,rect.height)
    :Math.max(.0001,(cam.top-cam.bottom)/Math.max(1,rect.height));
  return{x:dx/length,y:dy/length,worldPerPixel};
}
function worldPointOnViewPlane(event,plane){
  const cam=camera();
  if(!cam||!pointerNdc(event))return null;
  raycaster.setFromCamera(pointer,cam);
  return raycaster.ray.intersectPlane(plane,new THREE.Vector3());
}
function beginEndpointDrag(event){
  if(!previewArmed||!preview||endpointDrag||(event.pointerType==='mouse'&&event.button!==0))return false;
  const cam=camera();
  if(!cam||!pointerNdc(event))return false;
  raycaster.setFromCamera(pointer,cam);
  const hit=raycaster.intersectObject(preview,true).find(item=>item.object?.userData?.arrayEndpoint===true);
  if(!hit)return false;

  const ctl=orbitControls();
  const drag={
    pointerId:event.pointerId,startX:event.clientX,startY:event.clientY,
    startEndpoint:endpoint.clone(),controlsWereEnabled:ctl?.enabled!==false,mode:moveMode
  };
  if(moveMode==='free'){
    const normal=cam.getWorldDirection(new THREE.Vector3()).normalize();
    drag.plane=new THREE.Plane().setFromNormalAndCoplanarPoint(normal,hit.point);
    drag.startWorld=worldPointOnViewPlane(event,drag.plane);
    if(!drag.startWorld)return false;
  }else{
    const axisVector=moveMode==='y'?new THREE.Vector3(0,1,0):moveMode==='z'?new THREE.Vector3(0,0,1):new THREE.Vector3(1,0,0);
    const projected=screenAxis(hit.point,axisVector);
    if(!projected)return false;
    drag.axisVector=axisVector;drag.axisX=projected.x;drag.axisY=projected.y;drag.worldPerPixel=projected.worldPerPixel;
  }
  endpointDrag=drag;
  if(ctl)ctl.enabled=false;
  canvas?.setPointerCapture?.(event.pointerId);
  event.preventDefault();event.stopPropagation();event.stopImmediatePropagation?.();
  setStatus(`Array endpoint • ${endpointText()} • drag ${moveMode==='free'?'freely in view plane':moveMode.toUpperCase()}`);
  return true;
}
function moveEndpointDrag(event){
  if(!endpointDrag||event.pointerId!==endpointDrag.pointerId)return false;
  if(endpointDrag.mode==='free'){
    const p=worldPointOnViewPlane(event,endpointDrag.plane);
    if(p)endpoint.copy(endpointDrag.startEndpoint).add(p.sub(endpointDrag.startWorld));
  }else{
    const dx=event.clientX-endpointDrag.startX,dy=event.clientY-endpointDrag.startY;
    const projected=dx*endpointDrag.axisX+dy*endpointDrag.axisY;
    endpoint.copy(endpointDrag.startEndpoint).addScaledVector(endpointDrag.axisVector,projected*endpointDrag.worldPerPixel);
  }
  buildPreview();
  setStatus(`Array endpoint • ${endpointText()} • release to keep endpoint`);
  event.preventDefault();event.stopPropagation();event.stopImmediatePropagation?.();
  return true;
}
function finishEndpointDrag(event){
  if(!endpointDrag||event.pointerId!==endpointDrag.pointerId)return false;
  event.preventDefault();event.stopPropagation();event.stopImmediatePropagation?.();
  endEndpointDrag();
  setStatus(`Array preview • ${count()} total • ${endpointText()} • choose Count or Apply Array`);
  return true;
}

function sync(){
  syncCount();
  const object=activeObject();
  const eligible=mode()==='object'&&!!object&&!object.locked&&object.kind!=='reference';
  if(launchButton)launchButton.disabled=!eligible;
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
  if(endpointLength()<1e-6){setStatus('Array refused • end copy must be moved away from source');return false;}
  const before=globalThis.__boxlabObjectHistory?.capture?.()||null;
  m.saveActive?.();
  const sourceId=source.id,created=[],total=count();
  for(let i=1;i<total;i++){
    const copy=m.linkedDuplicateObject?.(sourceId,{enterObjectMode:false,name:m.nextDuplicateName?.(source.name)});
    if(!copy){setStatus('Array refused • linked duplicate could not be created');return false;}
    const offset=endpoint.clone().multiplyScalar(i/(total-1));
    if(!nudgeLive(offset)){setStatus('Array refused • active instance mesh unavailable');return false;}
    m.saveActive?.();
    created.push(copy.id);
  }
  m.activate?.(sourceId);
  if(before)globalThis.__boxlabObjectHistory?.checkpointSnapshot?.(before);
  globalThis.__boxlabObjectSelection?.refresh?.();
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));
  globalThis.__boxlabLinearArrayLastResult={
    version:'0.36.18.416',sourceId,createdIds:created,count:total,
    endpoint:[endpoint.x,endpoint.y,endpoint.z]
  };
  setStatus(`Array • ${created.length} linked instance${created.length===1?'':'s'} • evenly distributed to ${endpointText()}`);
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

moveButtons.forEach(control=>control.addEventListener('click',()=>{
  moveMode=control.dataset.arrayMove;
  moveButtons.forEach(b=>b.classList.toggle('active',b===control));
  if(previewArmed)setStatus(`Array preview • move END copy (${moveMode.toUpperCase()}) • ${endpointText()}`);
}));
installPenRange(countInput,()=>{syncCount();if(previewArmed)buildPreview();});
canvas?.addEventListener('pointerdown',beginEndpointDrag,true);
canvas?.addEventListener('pointermove',moveEndpointDrag,true);
canvas?.addEventListener('pointerup',finishEndpointDrag,true);
canvas?.addEventListener('pointercancel',finishEndpointDrag,true);

launchButton?.addEventListener('click',()=>{
  const object=activeObject();
  if(!object||mode()!=='object'||object.locked||object.kind==='reference'||previewArmed)return;
  endpoint.set(2.5,0,0);
  if(countInput)countInput.value='2';
  syncCount();
  previewArmed=true;previewObjectId=object.id;
  beginArraySession();
  buildPreview();
});
applyButton?.addEventListener('click',()=>{
  if(!previewArmed)return;
  if(applyArray()){
    disposePreview();previewArmed=false;previewObjectId=null;endArraySession();
  }
});
cancelButton?.addEventListener('click',()=>cancelPreview());

window.addEventListener('boxlab-object-manager-ready',sync);
window.addEventListener('boxlab-bridge-state',()=>queueMicrotask(sync));
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
window.addEventListener('beforeunload',()=>{endEndpointDrag();disposePreview();endArraySession();});
sync();

globalThis.__boxlabLinearArray={
  version:'0.36.18.416',
  get active(){return previewArmed;},
  get dragging(){return!!endpointDrag;},
  get endpoint(){return endpoint.clone();},
  rebuild:buildPreview,
  cancel:cancelPreview
};
