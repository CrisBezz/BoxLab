import * as THREE from 'three';
import {createArrayRecipe,evaluateArray,reopenArray,arrayItemMatrix} from './live-array-core.js?v=0.36.18.842';

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
  <div class="boxlab-tool-session-title"><span>Array</span><span class="boxlab-tool-session-subtitle">END transforms</span></div>
  <label class="toggle-row"><input id="linearArrayLive" type="checkbox"/><span>Live · keep one editable object</span></label>
  <div id="linearArrayEndTools" class="outliner-actions" style="grid-template-columns:repeat(3,1fr)" hidden>
    <button type="button" data-array-transform="move" class="active">Move END</button>
    <button type="button" data-array-transform="rotate">Rotate END</button>
    <button type="button" data-array-transform="scale">Scale END</button>
  </div>
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
  <div id="linearArrayTransformValues" hidden style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px">
    ${['x','y','z'].map(axis=>`<label style="font-size:10px">${axis.toUpperCase()} <input data-array-value="${axis}" type="number" step="1" style="width:64px;font-size:11px"/></label>`).join('')}
  </div>
  <div class="drawer-hint">Drag the END copy. X/Y/Z places it on that axis; Free allows a free endpoint or arrow-constrained movement.</div>
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
const liveInput=controls.querySelector('#linearArrayLive');
const countOut=controls.querySelector('#linearArrayCountOut');
const endpointHint=controls.querySelector('.drawer-hint');
const endTools=controls.querySelector('#linearArrayEndTools');
const transformValues=controls.querySelector('#linearArrayTransformValues');
const transformButtons=[...controls.querySelectorAll('[data-array-transform]')];
const valueInputs=[...controls.querySelectorAll('[data-array-value]')];
const moveButtons=[...controls.querySelectorAll('[data-array-move]')];

let sessionSource=null,hiddenResult=null;
let moveMode='free',endTransform='move';
let endRotation=[0,0,0],endScale=[1,1,1],sessionPlacement=new THREE.Matrix4();
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
function sourceMesh(){return sessionSource||activeObject()?.mesh;}
function localEndpoint(){
  const inverse=sessionPlacement.clone().invert();
  return endpoint.clone().applyMatrix4(inverse).sub(new THREE.Vector3().applyMatrix4(inverse));
}
function transformOptions(){return{rotation:endRotation,scale:endScale,placement:sessionPlacement.elements};}
function endpointCentre(){return new THREE.Box3().setFromPoints(sourceMesh().vertices).getCenter(new THREE.Vector3()).applyMatrix4(sessionPlacement).add(endpoint);}
function axisVector(axis){const direction=new THREE.Vector3();direction[axis]=1;return direction;}
function endAxis(axis){return axisVector(axis).transformDirection(sessionPlacement);}
function syncEndTools(){
  const live=!!liveInput?.checked;
  if(endpointHint)endpointHint.textContent=endTransform==='rotate'?'Drag the END rotation ring · XYZ values are degrees · rotation grows from original to END.':endTransform==='scale'?'Drag END for uniform scale in Free, or an axis cube · XYZ values are scale factors · size grows from original to END.':'Drag the END copy. X/Y/Z places it on that axis; Free allows a free endpoint or arrow-constrained movement.';
  if(endTools)endTools.hidden=!live;
  if(transformValues)transformValues.hidden=!live||endTransform==='move';
  transformButtons.forEach(b=>b.classList.toggle('active',b.dataset.arrayTransform===endTransform));
  moveButtons.forEach(b=>{b.hidden=endTransform==='rotate'&&b.dataset.arrayMove==='free';b.classList.toggle('active',b.dataset.arrayMove===moveMode);});
  valueInputs.forEach((input,i)=>{input.value=String(endTransform==='rotate'?endRotation[i]:endScale[i]);input.step=endTransform==='rotate'?'1':'.05';input.min=endTransform==='rotate'?'-3600':'.05';input.max=endTransform==='rotate'?'3600':'20';input.title=`END ${endTransform==='rotate'?'rotation (degrees)':'scale factor'} ${input.dataset.arrayValue.toUpperCase()}`;});
}
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
  const pointerId=endpointDrag.pointerId;
  const ctl=orbitControls();
  if(ctl)ctl.enabled=endpointDrag.controlsWereEnabled;
  if(canvas?.hasPointerCapture?.(pointerId))canvas.releasePointerCapture?.(pointerId);
  endpointDrag=null;
}
function restoreResult(){
  if(hiddenResult){hiddenResult=null;document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
}
function cancelPreview({silent=false}={}){
  endEndpointDrag();
  disposePreview();previewArmed=false;previewObjectId=null;sessionSource=null;restoreResult();endArraySession();
  if(!silent)setStatus('Array preview cancelled');
}
function buildPreview(){
  syncEndTools();
  if(!previewArmed)return false;
  const object=activeObject(),scene=state()?.scene;
  if(!object||object.id!==previewObjectId||!scene){cancelPreview({silent:true});return false;}
  disposePreview();
  const geometry=(sessionSource||object.mesh)?.triangulatedGeometry?.();
  if(!geometry)return false;

  const group=new THREE.Group();
  const total=count();
  for(let i=hiddenResult?0:1;i<total;i++){
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
    if(liveInput?.checked){
      const matrix=arrayItemMatrix(sourceMesh(),t,localEndpoint().toArray(),transformOptions());
      fill.matrixAutoUpdate=wire.matrixAutoUpdate=false;fill.matrix.copy(matrix);wire.matrix.copy(matrix);
    }else{fill.position.copy(offset);wire.position.copy(offset);}
    fill.userData.arrayIndex=i;wire.userData.arrayIndex=i;
    fill.userData.arrayEndpoint=isEndpoint;wire.userData.arrayEndpoint=isEndpoint;
    fill.renderOrder=isEndpoint?12:10;wire.renderOrder=isEndpoint?13:11;
    group.add(fill,wire);
  }
  const center=endpointCentre();
  const length=Math.max(.2,(camera()?.position.distanceTo(center)||5)*.12);
  if(liveInput?.checked&&endTransform==='rotate'){
    for(const [axis,color] of [['x',0xef6b72],['y',0x71d984],['z',0x719eef]]){
      if(moveMode!==axis)continue;
      const ring=new THREE.Mesh(new THREE.TorusGeometry(length*.8,length*.045,8,64),new THREE.MeshBasicMaterial({color,depthTest:false,depthWrite:false}));
      ring.position.copy(center);ring.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),endAxis(axis));ring.userData.arrayAxis=axis;ring.renderOrder=15;group.add(ring);
    }
  }else for(const [axis,color] of [['x',0xef6b72],['y',0x71d984],['z',0x719eef]]){
    if(moveMode!=='free'&&moveMode!==axis)continue;
    const direction=endTransform==='scale'?endAxis(axis):axisVector(axis);
    if(liveInput?.checked&&endTransform==='scale'){
      const handle=new THREE.Mesh(new THREE.BoxGeometry(length*.2,length*.2,length*.2),new THREE.MeshBasicMaterial({color,depthTest:false,depthWrite:false}));
      handle.position.copy(center).addScaledVector(direction,length);handle.userData.arrayAxis=axis;handle.renderOrder=15;group.add(handle);
    }else{
      const arrow=new THREE.ArrowHelper(direction,center,length,color,length*.24,length*.12);
      arrow.traverse(node=>{node.userData.arrayAxis=axis;node.renderOrder=15;if(node.material){node.material.depthTest=false;node.material.depthWrite=false;}});
      group.add(arrow);
    }
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
function hitPreview(event){
  if(!previewArmed||!preview||!camera()||!pointerNdc(event))return null;
  raycaster.setFromCamera(pointer,camera());
  raycaster.params.Line.threshold=Math.max(.015,(camera().position.distanceTo(new THREE.Box3().setFromPoints((sessionSource||activeObject().mesh).vertices).getCenter(new THREE.Vector3()).add(endpoint)))*.006);
  preview.updateMatrixWorld(true);
  const hits=raycaster.intersectObject(preview,true);
  return hits.find(item=>item.object?.userData?.arrayAxis)||hits.find(item=>item.object?.userData?.arrayEndpoint===true)||null;
}
function beginEndpointDrag(event){
  if(event.target!==canvas||!previewArmed||!preview||endpointDrag||(event.pointerType==='mouse'&&event.button!==0))return false;
  const cam=camera();
  if(!cam||!pointerNdc(event))return false;
  const hit=hitPreview(event);
  if(!hit)return false;

  const ctl=orbitControls();
  const drag={
    pointerId:event.pointerId,startX:event.clientX,startY:event.clientY,
    startEndpoint:endpoint.clone(),startRotation:[...endRotation],startScale:[...endScale],transform:liveInput?.checked?endTransform:'move',controlsWereEnabled:ctl?.enabled!==false,mode:hit.object?.userData?.arrayAxis||moveMode
  };
  if(drag.transform==='rotate'){
    drag.axis=drag.mode==='free'?'y':drag.mode;drag.center=endpointCentre();drag.normal=endAxis(drag.axis);
    drag.plane=new THREE.Plane().setFromNormalAndCoplanarPoint(drag.normal,drag.center);
    const point=worldPointOnViewPlane(event,drag.plane);
    if(!point||point.distanceToSquared(drag.center)<1e-10)return false;
    drag.lastVector=point.sub(drag.center).normalize();drag.angle=0;
  }else if(drag.transform==='scale'){
    drag.axis=drag.mode;drag.worldPerPixel=.01;
    if(drag.mode!=='free'){
      const projected=screenAxis(endpointCentre(),endAxis(drag.mode));if(!projected)return false;
      drag.axisX=projected.x;drag.axisY=projected.y;
    }
  }else if(drag.mode==='free'){
    const normal=cam.getWorldDirection(new THREE.Vector3()).normalize();
    drag.plane=new THREE.Plane().setFromNormalAndCoplanarPoint(normal,hit.point);
    drag.startWorld=worldPointOnViewPlane(event,drag.plane);
    if(!drag.startWorld)return false;
  }else{
    const axisVector=drag.mode==='y'?new THREE.Vector3(0,1,0):drag.mode==='z'?new THREE.Vector3(0,0,1):new THREE.Vector3(1,0,0);
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
  if(endpointDrag.transform==='rotate'){
    const point=worldPointOnViewPlane(event,endpointDrag.plane);
    if(point&&point.distanceToSquared(endpointDrag.center)>1e-10){
      const next=point.sub(endpointDrag.center).normalize();
      endpointDrag.angle+=Math.atan2(endpointDrag.normal.dot(new THREE.Vector3().crossVectors(endpointDrag.lastVector,next)),endpointDrag.lastVector.dot(next));
      endpointDrag.lastVector.copy(next);endRotation=[...endpointDrag.startRotation];
      const index=['x','y','z'].indexOf(endpointDrag.axis);endRotation[index]=Math.max(-3600,Math.min(3600,endRotation[index]+THREE.MathUtils.radToDeg(endpointDrag.angle)));
    }
  }else if(endpointDrag.transform==='scale'){
    const dx=event.clientX-endpointDrag.startX,dy=event.clientY-endpointDrag.startY;
    const amount=endpointDrag.mode==='free'?(dx-dy)*.01:(dx*endpointDrag.axisX+dy*endpointDrag.axisY)*.01;
    const factor=Math.exp(amount);endScale=endpointDrag.startScale.map((value,i)=>endpointDrag.mode==='free'||['x','y','z'][i]===endpointDrag.mode?Math.max(.05,Math.min(20,value*factor)):value);
  }else if(endpointDrag.mode==='free'){
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
  const object=activeObject(),currentMode=mode();
  const eligible=currentMode==='object'&&!!object&&!object.locked&&object.kind!=='reference';
  if(launchButton){launchButton.disabled=!eligible;launchButton.textContent=object?.arrayRecipe?'Edit Array':'Array';}
  if(liveInput)liveInput.disabled=!!object?.arrayRecipe;
  if(!previewArmed)return;
  if(currentMode!=='object'){cancelPreview({silent:true});return;}
  if(object?.id!==previewObjectId){
    const source=manager()?.objects?.find?.(o=>o.id===previewObjectId);
    if(source)manager()?.activate?.(previewObjectId);
    else {cancelPreview({silent:true});return;}
  }
  if(!toolSession()?.isActive?.('array'))beginArraySession();
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
  if(liveInput?.checked){
    if(source.sourceId||source.booleanRecipe||source.glbPassthrough||source.materials||source.textures||source.mesh?.uvs||source.mesh?.faceUVs||source.mesh?.uvLayers||source.mesh?.materialSlots||source.settings?.subd||Object.values(source.settings?.mirror||{}).some(Boolean)){setStatus('Live Array requires an independent geometry object');return false;}
    try{
      const recipe=createArrayRecipe(sessionSource||source.mesh,count(),localEndpoint().toArray(),transformOptions()),result=evaluateArray(recipe);
      restoreResult();
      const before=globalThis.__boxlabObjectHistory?.capture?.();
      if(!before||!m.replaceActiveMesh?.(result))throw Error('Live Array replacement unavailable');
      source.arrayRecipe=recipe;
      globalThis.__boxlabObjectHistory?.checkpointSnapshot?.(before,before.objects.find(o=>o.id===source.id)?.mesh);
      m.activate?.(source.id);
      globalThis.__boxlabObjectSelection?.refresh?.();
      setStatus('Live Array · one object · reopen Array to edit count and END placement');
      return true;
    }catch(error){setStatus('Live Array refused · '+error.message);return false;}
  }
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
    version:'0.36.18.419',sourceId,createdIds:created,count:total,
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
  endEndpointDrag();
  moveMode=control.dataset.arrayMove;
  if(endTransform==='move'&&moveMode!=='free'){const distance=Math.max(endpoint.length(),.01);endpoint.set(0,0,0);endpoint[moveMode]=distance;}
  moveButtons.forEach(b=>b.classList.toggle('active',b===control));
  if(previewArmed)buildPreview();
  if(previewArmed)setStatus(`Array preview • move END copy (${moveMode.toUpperCase()}) • ${endpointText()}`);
}));
transformButtons.forEach(button=>button.addEventListener('click',()=>{
  endEndpointDrag();endTransform=button.dataset.arrayTransform;
  if(endTransform==='rotate'&&moveMode==='free')moveMode='y';
  syncEndTools();if(previewArmed)buildPreview();
}));
valueInputs.forEach((input,index)=>input.addEventListener('change',()=>{
  const value=Number(input.value),rotation=endTransform==='rotate';
  if(!input.value.trim()||!Number.isFinite(value)||value<(rotation?-3600:.05)||value>(rotation?3600:20)){syncEndTools();setStatus('Choose a valid END transform value');return;}
  endEndpointDrag();(rotation?endRotation:endScale)[index]=value;if(previewArmed)buildPreview();
}));
liveInput?.addEventListener('change',()=>{
  endEndpointDrag();endTransform='move';endRotation=[0,0,0];endScale=[1,1,1];syncEndTools();if(previewArmed)buildPreview();
});
installPenRange(countInput,()=>{syncCount();if(previewArmed)buildPreview();});
document.addEventListener('pointerdown',beginEndpointDrag,true);
canvas?.addEventListener('pointermove',moveEndpointDrag,true);
canvas?.addEventListener('pointerup',finishEndpointDrag,true);
canvas?.addEventListener('pointercancel',finishEndpointDrag,true);

launchButton?.addEventListener('click',()=>{
  const object=activeObject();
  if(!object||mode()!=='object'||object.locked||object.kind==='reference'||previewArmed)return;
  moveMode='free';moveButtons.forEach(b=>b.classList.toggle('active',b.dataset.arrayMove==='free'));
  sessionSource=null;endTransform='move';endRotation=[0,0,0];endScale=[1,1,1];sessionPlacement.identity();
  endpoint.set(2.5,0,0);
  if(countInput)countInput.value='2';
  if(liveInput)liveInput.checked=!!object.arrayRecipe;
  if(object.arrayRecipe){
    try{const reopened=reopenArray(object);sessionSource=reopened.source;sessionPlacement.fromArray(reopened.placement);endRotation=reopened.rotation;endScale=reopened.scale;endpoint.copy(reopened.endpoint).applyMatrix4(sessionPlacement).sub(new THREE.Vector3().applyMatrix4(sessionPlacement));countInput.value=String(reopened.count);}
    catch(error){setStatus(error.message);return;}
    hiddenResult={object};
    document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));
  }
  syncCount();
  previewArmed=true;previewObjectId=object.id;
  beginArraySession();
  buildPreview();
});
applyButton?.addEventListener('click',()=>{
  if(!previewArmed)return;
  if(applyArray()){
    disposePreview();previewArmed=false;previewObjectId=null;sessionSource=null;restoreResult();endArraySession();
  }
});
cancelButton?.addEventListener('click',()=>cancelPreview());

window.addEventListener('boxlab-object-manager-ready',sync);
window.addEventListener('boxlab-bridge-state',()=>queueMicrotask(sync));
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
window.addEventListener('beforeunload',()=>{document.removeEventListener('pointerdown',beginEndpointDrag,true);endEndpointDrag();disposePreview();endArraySession();});
sync();

globalThis.__boxlabLinearArray={
  version:'0.36.18.842',
  get active(){return previewArmed;},
  get hiddenObjectId(){return hiddenResult?.object.id??null;},
  get dragging(){return!!endpointDrag;},
  get endpoint(){return endpoint.clone();},
  ownsPoint:event=>!!hitPreview(event),
  rebuild:buildPreview,
  cancel:cancelPreview
};
