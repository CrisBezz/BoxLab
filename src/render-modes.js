import * as THREE from 'three';

const status=document.querySelector('#selectionStatus');
let mode='studio';
let lastBody=null;
let studioRig=null;
let studioFloor=null;
let studioKey=null;
let studioKeyTarget=null;
let originalBackground=null;
let studioRefreshQueued=false;

function bridge(){return globalThis.__boxlabBridgeState||null;}

const clayMaterial=new THREE.MeshStandardMaterial({color:0xc8c1b5,roughness:.92,metalness:0,side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1});
const studioMaterial=new THREE.MeshStandardMaterial({color:0xaeb9c7,roughness:.48,metalness:.03,emissive:0x05080d,emissiveIntensity:.08,side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1});
const studioInactiveMaterial=new THREE.MeshStandardMaterial({color:0x98a6b8,roughness:.52,metalness:.02,emissive:0x03060a,emissiveIntensity:.06,side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1});

function makeMatcapTexture(){
  const canvas=document.createElement('canvas');canvas.width=128;canvas.height=128;
  const ctx=canvas.getContext('2d');
  const gradient=ctx.createRadialGradient(44,36,6,64,64,82);
  gradient.addColorStop(0,'#ffffff');gradient.addColorStop(.28,'#dfe5ec');gradient.addColorStop(.62,'#8e99a8');gradient.addColorStop(1,'#252a31');
  ctx.fillStyle=gradient;ctx.fillRect(0,0,128,128);
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;texture.needsUpdate=true;return texture;
}

const matcapMaterial=new THREE.MeshMatcapMaterial({color:0xffffff,matcap:makeMatcapTexture(),side:THREE.DoubleSide});
const xrayMaterial=new THREE.MeshStandardMaterial({color:0xaebfd2,roughness:.72,metalness:0,transparent:true,opacity:.22,depthWrite:false,side:THREE.DoubleSide});
const wireMaterial=new THREE.MeshBasicMaterial({color:0x20252d,wireframe:true,transparent:true,opacity:.72,depthTest:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1});
const xrayWireMaterial=new THREE.MeshBasicMaterial({color:0xdce7f3,wireframe:true,transparent:true,opacity:.55,depthTest:false,depthWrite:false});

function clearRenderChildren(body){[...body.children].forEach(child=>{if(child?.userData?.boxlabRenderOverlay){body.remove(child);child.material?.dispose?.();}});}
function addWire(body,material){const overlay=new THREE.Mesh(body.geometry,material.clone());overlay.userData.boxlabRenderOverlay=true;overlay.renderOrder=12;body.add(overlay);}

function ensureStudioRig(){
  const state=bridge(),scene=state?.scene;if(!scene||studioRig)return;
  originalBackground=scene.background?.clone?.()||new THREE.Color(0x111318);
  studioRig=new THREE.Group();studioRig.name='BoxLab Studio Realtime';
  const floorMaterial=new THREE.MeshStandardMaterial({color:0x252b35,roughness:.9,metalness:0});
  studioFloor=new THREE.Mesh(new THREE.PlaneGeometry(1,1),floorMaterial);studioFloor.rotation.x=-Math.PI/2;studioFloor.receiveShadow=true;studioFloor.userData.boxlabStudioFloor=true;studioRig.add(studioFloor);
  studioKey=new THREE.DirectionalLight(0xfff5e7,2.15);studioKey.position.set(5.5,8,4.5);studioKey.castShadow=true;studioKey.shadow.mapSize.set(1024,1024);studioKey.shadow.normalBias=.075;studioKey.shadow.bias=-.00015;studioKey.shadow.camera.near=.1;studioKey.shadow.camera.far=100;
  studioKeyTarget=new THREE.Object3D();studioKey.target=studioKeyTarget;studioRig.add(studioKeyTarget);studioRig.add(studioKey);
  const fill=new THREE.DirectionalLight(0x9fc5ff,.7);fill.position.set(-5,3,2);studioRig.add(fill);
  const rim=new THREE.DirectionalLight(0xdbe7ff,.45);rim.position.set(1,5,-6);studioRig.add(rim);
  studioRig.visible=false;scene.add(studioRig);
}

function refreshStudio(){
  if(mode!=='studio'||studioRefreshQueued)return;
  studioRefreshQueued=true;
  requestAnimationFrame(()=>{
    studioRefreshQueued=false;
    const state=bridge(),scene=state?.scene;if(!scene||!studioFloor||!studioKey)return;
    const bounds=new THREE.Box3();let hasVisibleBody=false;
    scene.traverse(object=>{const kind=object?.userData?.kind;if(!object?.isMesh||!object.visible||(kind!=='body'&&kind!=='boxlab-inactive-body'))return;bounds.expandByObject(object);hasVisibleBody=true;object.castShadow=true;object.receiveShadow=true;});
    if(!hasVisibleBody||bounds.isEmpty())return;
    const center=bounds.getCenter(new THREE.Vector3()),size=bounds.getSize(new THREE.Vector3()),span=Math.max(size.x,size.z,1),height=Math.max(size.y,1),radius=Math.max(span,height)*.5,floorSize=Math.max(span*2.8,24);
    studioFloor.position.set(center.x,bounds.min.y-.025,center.z);studioFloor.scale.set(floorSize,floorSize,1);
    studioKeyTarget.position.copy(center);
    const lightDistance=Math.max(radius*3.5,12);
    studioKey.position.set(center.x+lightDistance*.55,center.y+lightDistance*.8,center.z+lightDistance*.45);
    const shadowHalf=Math.max(radius*1.45,6),camera=studioKey.shadow.camera;
    camera.left=-shadowHalf;camera.right=shadowHalf;camera.top=shadowHalf;camera.bottom=-shadowHalf;camera.near=.1;camera.far=Math.max(lightDistance*3,40);camera.updateProjectionMatrix();studioKey.shadow.needsUpdate=true;
  });
}

function syncStudio(){
  const state=bridge(),scene=state?.scene,renderer=state?.renderer;if(!scene||!renderer)return;
  ensureStudioRig();const enabled=mode==='studio';if(studioRig)studioRig.visible=enabled;renderer.shadowMap.enabled=enabled;
  if(enabled){renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=true;}
  if(state.baseHemisphere)state.baseHemisphere.intensity=enabled?.52:1.2;
  if(state.key)state.key.intensity=enabled?1.35:3.2;
  scene.background.copy(enabled?new THREE.Color(0x131924):originalBackground||new THREE.Color(0x111318));
  if(enabled)refreshStudio();
}

function applyMode(body){
  const kind=body?.userData?.kind;if(!body?.isMesh||(kind!=='body'&&kind!=='boxlab-inactive-body'))return;
  const inactive=kind==='boxlab-inactive-body';if(!inactive)lastBody=body;clearRenderChildren(body);
  if(!body.userData.boxlabOriginalMaterial)body.userData.boxlabOriginalMaterial=body.material;
  const original=body.userData.boxlabOriginalMaterial;syncStudio();
  if(mode==='studio')body.material=inactive?studioInactiveMaterial:studioMaterial;
  else if(mode==='clay')body.material=clayMaterial;
  else if(mode==='matcap')body.material=matcapMaterial;
  else if(mode==='xray'){body.material=xrayMaterial;addWire(body,xrayWireMaterial);}
  else{body.material=original;if(mode==='wire')addWire(body,wireMaterial);}
}

Object.assign(globalThis.__boxlabRenderModes ||= {},{apply:applyMode,refreshStudio});
function rebuild(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function applyToSceneBodies(){const scene=bridge()?.scene;if(!scene)return false;let found=false;scene.traverse(object=>{const kind=object?.userData?.kind;if(kind==='body'||kind==='boxlab-inactive-body'){applyMode(object);found=true;}});return found;}
function modeLabel(){if(mode==='wire')return'Wire + Solid';if(mode==='matcap')return'MatCap';if(mode==='studio')return'Studio';return mode[0].toUpperCase()+mode.slice(1);}

function setMode(next){
  mode=next;
  document.querySelectorAll('#viewportRenderLooks button[data-render]').forEach(button=>button.classList.toggle('active',button.dataset.render===mode));
  if(!applyToSceneBodies())rebuild();
  document.dispatchEvent(new CustomEvent('boxlab-render-mode-change',{detail:{mode}}));
  if(status)status.textContent=`View • ${modeLabel()}`;
}

const baseAdd=THREE.Group.prototype.add;
if(!THREE.Group.prototype.__boxlabRenderModesInstalled){THREE.Group.prototype.add=function(...objects){const result=baseAdd.apply(this,objects);for(const object of objects)if(object?.userData?.kind==='body')applyMode(object);return result;};THREE.Group.prototype.__boxlabRenderModesInstalled=true;}

function installUI(){
  const host=document.querySelector('#viewportRenderLooks');
  if(!host||host.dataset.ready==='true')return false;
  host.dataset.ready='true';
  host.innerHTML='<button type="button" data-render="studio" class="active">Studio</button><button type="button" data-render="solid">Solid</button><button type="button" data-render="clay">Clay</button><button type="button" data-render="matcap">MatCap</button><button type="button" data-render="wire">Wire</button><button type="button" data-render="xray">X-Ray</button>';
  host.addEventListener('click',event=>{const button=event.target.closest('button[data-render]');if(!button)return;event.preventDefault();event.stopPropagation();setMode(button.dataset.render);});
  return true;
}

if(!installUI())queueMicrotask(installUI);
queueMicrotask(rebuild);

const version=document.querySelector('#appVersion');
if(version)version.textContent='v0.36.5.0';
document.title='BoxLab v0.36.5.0';
