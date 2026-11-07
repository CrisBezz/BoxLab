import * as THREE from 'three';
import {applyFaceGroupColours,DEFAULT_FACEGROUP_VIEW,normaliseFacegroupView} from './facegroup-colours-core.js';
import {applyMirror} from './mirror.js';
import {subdivide} from './subdivision.js';

const status=document.querySelector('#selectionStatus');
let mode='studio';
let lastBody=null;
let studioRig=null;
let studioFloor=null;
let studioKey=null;
let studioKeyTarget=null;
let originalBackground=null;
let studioRefreshQueued=false;
const frontMaterialCache=new WeakMap();
const FACEGROUP_VIEW_KEY='boxlab-facegroup-view-v1';
function loadFacegroupView(){
  try{return normaliseFacegroupView(JSON.parse(localStorage.getItem(FACEGROUP_VIEW_KEY)||'{}'));}catch{return{...DEFAULT_FACEGROUP_VIEW};}
}
let facegroupView=loadFacegroupView();
function saveFacegroupView(){try{localStorage.setItem(FACEGROUP_VIEW_KEY,JSON.stringify(facegroupView));}catch{}}

function bridge(){return globalThis.__boxlabBridgeState||null;}
function manager(){return globalThis.__boxlabObjectManager||null;}

const clayMaterial=new THREE.MeshStandardMaterial({color:0xc8c1b5,roughness:.92,metalness:0,side:THREE.FrontSide,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1});
const studioMaterial=new THREE.MeshStandardMaterial({color:0xaeb9c7,roughness:.48,metalness:.03,emissive:0x05080d,emissiveIntensity:.08,side:THREE.FrontSide,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1});
const studioInactiveMaterial=new THREE.MeshStandardMaterial({color:0x98a6b8,roughness:.52,metalness:.02,emissive:0x03060a,emissiveIntensity:.06,side:THREE.FrontSide,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1});
const backfaceMaterial=new THREE.MeshStandardMaterial({color:0xf2a766,roughness:.78,metalness:0,side:THREE.BackSide,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1});
const facegroupMaterial=new THREE.MeshStandardMaterial({vertexColors:true,roughness:.66,metalness:0,side:THREE.FrontSide,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1});

function makeMatcapTexture(){
  const canvas=document.createElement('canvas');canvas.width=256;canvas.height=256;
  const ctx=canvas.getContext('2d');
  const base=ctx.createRadialGradient(104,86,12,132,136,170);
  base.addColorStop(0,'#ffffff');base.addColorStop(.16,'#f5f7fa');base.addColorStop(.42,'#cbd3dc');base.addColorStop(.7,'#74808e');base.addColorStop(1,'#20262e');
  ctx.fillStyle=base;ctx.fillRect(0,0,256,256);
  const key=ctx.createRadialGradient(78,66,2,82,70,74);
  key.addColorStop(0,'rgba(255,255,255,.95)');key.addColorStop(.28,'rgba(255,255,255,.42)');key.addColorStop(1,'rgba(255,255,255,0)');
  ctx.fillStyle=key;ctx.fillRect(0,0,256,256);
  const fill=ctx.createRadialGradient(178,160,4,174,158,110);
  fill.addColorStop(0,'rgba(176,194,214,.22)');fill.addColorStop(1,'rgba(80,96,116,0)');
  ctx.fillStyle=fill;ctx.fillRect(0,0,256,256);
  const rim=ctx.createRadialGradient(128,128,92,128,128,180);
  rim.addColorStop(0,'rgba(12,16,22,0)');rim.addColorStop(.55,'rgba(12,16,22,.08)');rim.addColorStop(1,'rgba(4,7,11,.55)');
  ctx.fillStyle=rim;ctx.fillRect(0,0,256,256);
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;texture.needsUpdate=true;return texture;
}

const matcapMaterial=new THREE.MeshMatcapMaterial({color:0xf8fafc,matcap:makeMatcapTexture(),side:THREE.FrontSide});
const normalMaterial=new THREE.MeshNormalMaterial({side:THREE.FrontSide,flatShading:false});
const normalInactiveMaterial=new THREE.MeshNormalMaterial({side:THREE.FrontSide,flatShading:false,transparent:true,opacity:.72});
const wireSurfaceMaterial=new THREE.MeshStandardMaterial({color:0x667383,roughness:.84,metalness:.01,emissive:0x05080b,emissiveIntensity:.05,side:THREE.FrontSide,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1});
const wireInactiveSurfaceMaterial=new THREE.MeshStandardMaterial({color:0x566171,roughness:.88,metalness:0,emissive:0x030508,emissiveIntensity:.04,side:THREE.FrontSide,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1});
const wireMaterial=new THREE.MeshBasicMaterial({color:0xe5edf6,wireframe:true,transparent:true,opacity:.82,depthTest:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1});
const xrayMaterial=new THREE.MeshStandardMaterial({color:0x9eb4cc,roughness:.78,metalness:0,transparent:true,opacity:.14,depthWrite:false,side:THREE.DoubleSide});
const xrayHiddenWireMaterial=new THREE.MeshBasicMaterial({color:0xaec3d9,wireframe:true,transparent:true,opacity:.22,depthTest:false,depthWrite:false});
const xrayVisibleWireMaterial=new THREE.MeshBasicMaterial({color:0xf1f6fb,wireframe:true,transparent:true,opacity:.88,depthTest:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1});

function clearRenderChildren(body){[...body.children].forEach(child=>{if(child?.userData?.boxlabRenderOverlay){body.remove(child);child.material?.dispose?.();}});}
function addWire(body,material,order=12){const overlay=new THREE.Mesh(body.geometry,material.clone());overlay.userData.boxlabRenderOverlay=true;overlay.renderOrder=order;body.add(overlay);}
function addBackface(body){const overlay=new THREE.Mesh(body.geometry,backfaceMaterial.clone());overlay.userData.boxlabRenderOverlay=true;overlay.userData.boxlabBackfaceCue=true;overlay.renderOrder=1;body.add(overlay);}
function frontOnly(material){
  if(!material?.clone)return material;
  let front=frontMaterialCache.get(material);
  if(!front){front=material.clone();front.side=THREE.FrontSide;front.needsUpdate=true;frontMaterialCache.set(material,front);}
  return front;
}
function evaluatedFacegroupMesh(mesh,settings={}){
  if(!mesh)return null;
  let out=mesh;
  if(settings?.subd)out=subdivide(out,Math.max(1,Number(settings.subdLevel||1)));
  if(settings?.mirror)out=applyMirror(out,settings.mirror);
  return out;
}
function sourceMeshForBody(body){
  const m=manager();
  if(body?.userData?.kind==='body'){
    const source=bridge()?.mesh||null;
    const active=m?.objects?.find(item=>item.id===m.activeId);
    return evaluatedFacegroupMesh(source,active?.settings||{});
  }
  if(body?.userData?.kind==='boxlab-inactive-body'){
    const id=body.userData.objectId,object=m?.objects?.find(item=>item.id===id);
    return evaluatedFacegroupMesh(object?.mesh||null,object?.settings||{});
  }
  return body?.userData?.editableMesh||body?.userData?.sourceMesh||body?.userData?.mesh||null;
}

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
    const lightAngle=globalThis.__boxlabStudioLightAngle?.radians||0;
    const elevation=globalThis.__boxlabStudioLightAngle?.elevationRadians??(52*Math.PI/180);
    const horizontal=Math.cos(elevation),vertical=Math.sin(elevation);
    const baseLength=Math.hypot(.55,.45),baseX=.55/baseLength,baseZ=.45/baseLength,cos=Math.cos(lightAngle),sin=Math.sin(lightAngle);
    const lightX=(baseX*cos-baseZ*sin)*horizontal,lightZ=(baseX*sin+baseZ*cos)*horizontal;
    studioKey.position.set(center.x+lightDistance*lightX,center.y+lightDistance*vertical,center.z+lightDistance*lightZ);
    studioKey.intensity=2.15*(globalThis.__boxlabStudioLightAngle?.intensityScale??1);
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
  if(enabled){
    const backdrop=globalThis.__boxlabBackdropPresets?.colour;
    scene.background.copy(new THREE.Color(Number.isFinite(backdrop)?backdrop:0x131924));
  }else scene.background.copy(originalBackground||new THREE.Color(0x111318));
  if(enabled)refreshStudio();
}

function applyMode(body){
  const kind=body?.userData?.kind;if(!body?.isMesh||(kind!=='body'&&kind!=='boxlab-inactive-body'))return;
  const inactive=kind==='boxlab-inactive-body';if(!inactive)lastBody=body;clearRenderChildren(body);
  if(!body.userData.boxlabOriginalMaterial)body.userData.boxlabOriginalMaterial=body.material;
  const original=body.userData.boxlabOriginalMaterial;syncStudio();
  if(mode==='studio'){body.material=inactive?studioInactiveMaterial:studioMaterial;addBackface(body);}
  else if(mode==='clay'){body.material=clayMaterial;addBackface(body);}
  else if(mode==='matcap'){body.material=matcapMaterial;addBackface(body);}
  else if(mode==='normals'){body.material=inactive?normalInactiveMaterial:normalMaterial;addBackface(body);}
  else if(mode==='wire'){body.material=inactive?wireInactiveSurfaceMaterial:wireSurfaceMaterial;addBackface(body);addWire(body,wireMaterial,13);}
  else if(mode==='xray'){body.material=xrayMaterial;addWire(body,xrayHiddenWireMaterial,10);addWire(body,xrayVisibleWireMaterial,13);}
  else if(mode==='facegroups'){
    const source=sourceMeshForBody(body),result=source?applyFaceGroupColours(body.geometry,source,facegroupView):null;
    if(result?.ok){
      body.material=facegroupMaterial;
      body.material.needsUpdate=true;
      addBackface(body);
      body.userData.boxlabFacegroupCount=result.groups||0;
      delete body.userData.boxlabFacegroupPending;
    }else{
      body.material=frontOnly(original);
      body.material.needsUpdate=true;
      body.userData.boxlabFacegroupCount=0;
      body.userData.boxlabFacegroupPending=true;
    }
  }
  else{body.material=frontOnly(original);addBackface(body);}
}

Object.assign(globalThis.__boxlabRenderModes ||= {},{
  apply:applyMode,
  refreshStudio,
  facegroupView:()=>({...facegroupView}),
  setFacegroupView(next){updateFacegroupView(next);}
});
function rebuild(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function applyToSceneBodies(){const scene=bridge()?.scene;if(!scene)return false;let found=false;scene.traverse(object=>{const kind=object?.userData?.kind;if(kind==='body'||kind==='boxlab-inactive-body'){applyMode(object);found=true;}});return found;}
function modeLabel(){if(mode==='wire')return'Wire + Solid';if(mode==='matcap')return'MatCap';if(mode==='normals')return'Normals';if(mode==='studio')return'Studio';if(mode==='facegroups')return'Facegroups';return mode[0].toUpperCase()+mode.slice(1);}

function retryPendingFacegroup(body,attempts=8){
  if(mode!=='facegroups'||!body?.isMesh||attempts<=0)return;
  requestAnimationFrame(()=>{
    if(mode!=='facegroups'||!body?.parent)return;
    applyMode(body);
    if(body.userData.boxlabFacegroupPending)retryPendingFacegroup(body,attempts-1);
  });
}
function retryPendingFacegroupsInScene(attempts=8){
  const scene=bridge()?.scene;if(!scene||mode!=='facegroups'||attempts<=0)return;
  let pending=false;
  scene.traverse(object=>{
    const kind=object?.userData?.kind;
    if(kind!=='body'&&kind!=='boxlab-inactive-body')return;
    applyMode(object);
    if(object.userData.boxlabFacegroupPending)pending=true;
  });
  if(pending)requestAnimationFrame(()=>retryPendingFacegroupsInScene(attempts-1));
}

function enterFacegroupsReady(){
  facegroupView=normaliseFacegroupView(facegroupView);
  syncFacegroupControls();
  rebuild();
  requestAnimationFrame(()=>retryPendingFacegroupsInScene());
}
function setMode(next){
  mode=next;
  document.querySelectorAll('#viewportRenderLooks button[data-render]').forEach(button=>button.classList.toggle('active',button.dataset.render===mode));
  if(mode==='facegroups')enterFacegroupsReady();
  else if(!applyToSceneBodies())rebuild();
  syncFacegroupControls();
  document.dispatchEvent(new CustomEvent('boxlab-render-mode-change',{detail:{mode}}));
  if(status)status.textContent=`View • ${modeLabel()}`;
}

const baseAdd=THREE.Group.prototype.add;
if(!THREE.Group.prototype.__boxlabRenderModesInstalled){THREE.Group.prototype.add=function(...objects){const result=baseAdd.apply(this,objects);for(const object of objects)if(object?.userData?.kind==='body'){applyMode(object);if(mode==='facegroups'&&object.userData.boxlabFacegroupPending)retryPendingFacegroup(object);}return result;};THREE.Group.prototype.__boxlabRenderModesInstalled=true;}


function syncFacegroupControls(){
  const panel=document.querySelector('#facegroupViewControls');if(!panel)return;
  panel.hidden=mode!=='facegroups';
  panel.querySelectorAll('[data-facegroup-palette]').forEach(button=>button.classList.toggle('active',button.dataset.facegroupPalette===facegroupView.palette));
  const sat=panel.querySelector('#facegroupSaturation'),light=panel.querySelector('#facegroupLightness'),ungrouped=panel.querySelector('#facegroupUngrouped');
  if(sat)sat.value=String(Math.round(facegroupView.saturation*100));
  if(light)light.value=String(Math.round(facegroupView.lightness*100));
  if(ungrouped)ungrouped.value=facegroupView.ungrouped;
  const satOut=panel.querySelector('#facegroupSaturationOut'),lightOut=panel.querySelector('#facegroupLightnessOut');
  if(satOut)satOut.textContent=`${Math.round(facegroupView.saturation*100)}%`;
  if(lightOut)lightOut.textContent=`${facegroupView.lightness>=0?'+':''}${Math.round(facegroupView.lightness*100)}`;
}
function updateFacegroupView(patch){
  facegroupView=normaliseFacegroupView({...facegroupView,...patch});
  saveFacegroupView();syncFacegroupControls();
  if(mode==='facegroups')applyToSceneBodies();
}
function installFacegroupControls(host){
  const section=host?.closest?.('.viewport-menu-section')||host?.parentElement;if(!section||document.querySelector('#facegroupViewControls'))return;
  const panel=document.createElement('div');
  panel.id='facegroupViewControls';panel.hidden=true;
  panel.innerHTML=`
    <div class="viewport-menu-label" style="margin-top:9px">Facegroup Colours</div>
    <div class="viewport-render-grid facegroup-palette-grid">
      <button type="button" data-facegroup-palette="default">Default</button>
      <button type="button" data-facegroup-palette="soft">Soft</button>
      <button type="button" data-facegroup-palette="vivid">Vivid</button>
      <button type="button" data-facegroup-palette="contrast">Contrast</button>
    </div>
    <label class="range-row"><span>Saturation</span><input id="facegroupSaturation" type="range" min="20" max="180" value="100" step="5"/><output id="facegroupSaturationOut">100%</output></label>
    <label class="range-row"><span>Lightness</span><input id="facegroupLightness" type="range" min="-28" max="28" value="0" step="2"/><output id="facegroupLightnessOut">+0</output></label>
    <label class="toggle-row"><span>Ungrouped</span><input id="facegroupUngrouped" type="color" value="#7f8792" aria-label="Ungrouped face colour"/></label>
    <div class="outliner-actions" style="grid-template-columns:repeat(2,1fr)">
      <button id="facegroupReseed" type="button">Reseed Colours</button>
      <button id="facegroupReset" type="button">Reset</button>
    </div>`;
  section.appendChild(panel);
  panel.addEventListener('click',event=>{
    const palette=event.target.closest('[data-facegroup-palette]');
    if(palette){event.preventDefault();event.stopPropagation();updateFacegroupView({palette:palette.dataset.facegroupPalette});return;}
    if(event.target.closest('#facegroupReseed')){event.preventDefault();event.stopPropagation();updateFacegroupView({seed:facegroupView.seed+1});return;}
    if(event.target.closest('#facegroupReset')){event.preventDefault();event.stopPropagation();facegroupView={...DEFAULT_FACEGROUP_VIEW};saveFacegroupView();syncFacegroupControls();if(mode==='facegroups')applyToSceneBodies();}
  });
  panel.querySelector('#facegroupSaturation')?.addEventListener('input',event=>updateFacegroupView({saturation:Number(event.target.value)/100}));
  panel.querySelector('#facegroupLightness')?.addEventListener('input',event=>updateFacegroupView({lightness:Number(event.target.value)/100}));
  panel.querySelector('#facegroupUngrouped')?.addEventListener('input',event=>updateFacegroupView({ungrouped:event.target.value}));
  syncFacegroupControls();
}

function installUI(){
  const host=document.querySelector('#viewportRenderLooks');
  if(!host||host.dataset.ready==='true')return false;
  host.dataset.ready='true';
  host.innerHTML='<button type="button" data-render="studio" class="active">Studio</button><button type="button" data-render="solid">Solid</button><button type="button" data-render="clay">Clay</button><button type="button" data-render="matcap">MatCap</button><button type="button" data-render="normals">Normals</button><button type="button" data-render="wire">Wire</button><button type="button" data-render="xray">X-Ray</button><button type="button" data-render="facegroups">Facegroups</button>';
  installFacegroupControls(host);
  host.addEventListener('click',event=>{const button=event.target.closest('button[data-render]');if(!button)return;event.preventDefault();event.stopPropagation();setMode(button.dataset.render);});
  return true;
}

if(!installUI())queueMicrotask(installUI);
queueMicrotask(rebuild);

// Visible release identity is owned by release-version.js.
