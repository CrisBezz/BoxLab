import {createFacegroupDrafts} from './facegroup-drafts.js?v=0.36.18.995';
import {createFacegroupList} from './facegroup-list.js?v=0.36.18.995';
import {createFacegroupPaintDock} from './facegroup-paint-dock.js?v=0.36.18.991';
import {createFacegroupStroke} from './facegroup-stroke.js?v=0.36.18.995';
import {assignSelectedFacegroup,facegroupAuthoringTarget,selectedFacegroupName} from './facegroup-authoring.js?v=0.36.18.995';
import {createCommittedPaintSurface} from './paint-target.js?v=0.36.18.1030';
import {createUVImageOverlay} from './uv-image-surface-preview.js?v=0.36.18.1031';
import {createUVCheckerOverlay} from './uv-checker-preview.js?v=0.36.18.879';
import * as THREE from 'three';
import {applyFaceGroupColours,DEFAULT_FACEGROUP_VIEW,normaliseFacegroupView} from './facegroup-colours-core.js?v=0.36.18.992';
import {applyMirror} from './mirror.js';
import {subdivide} from './subdivision.js';

const status=document.querySelector('#selectionStatus');
const facegroupStroke=createFacegroupStroke({context:()=>({manager:manager(),selection:globalThis.__boxlabSelectionBridge,mesh:bridge()?.mesh,history:globalThis.__boxlabObjectHistory,session:globalThis.__boxlabToolSession,controls:bridge()?.controls,look:mode}),notify:text=>{if(status)status.textContent=text;}});
globalThis.__boxlabFacegroupStroke=facegroupStroke;
let facegroupDock=null;
let facegroupList=null;
const facegroupDrafts=createFacegroupDrafts();
let facegroupRadialSession=false;

let mode='studio';
let lastBody=null;
let studioRig=null;
let studioFloor=null;
let studioKey=null;
let studioKeyTarget=null;
let originalBackground=null;
let studioRefreshQueued=false;
let undersideLight=null;
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
const checkerHiddenMaterial=new THREE.MeshBasicMaterial({colorWrite:false,depthWrite:false});
const backfaceMaterial=new THREE.MeshStandardMaterial({color:0xf2a766,roughness:.78,metalness:0,side:THREE.BackSide,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1});
// Facegroup inspection uses uniform palette colours on every face orientation.
const facegroupMaterial=new THREE.MeshBasicMaterial({vertexColors:true,toneMapped:false,side:THREE.FrontSide,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1});

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

function clearRenderChildren(body){[...body.children].forEach(child=>{if(child?.userData?.boxlabColourPaintDispose){child.userData.boxlabColourPaintDispose();}else if(child?.userData?.boxlabUVImageDispose){child.userData.boxlabUVImageDispose();}else if(child?.userData?.boxlabUVCheckerDispose){child.userData.boxlabUVCheckerDispose();}else if(child?.userData?.boxlabRenderOverlay){body.remove(child);child.material?.dispose?.();}});}
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

function syncUndersideLight(scene){
  // Oppose the overhead key so full-orbit inspection keeps downward faces readable.
  // Directional lights use position - target, independent of the model's location.
  // No shadow map: the floor must not block this soft modelling fill.
  if(!undersideLight||undersideLight.parent!==scene){
    undersideLight=new THREE.DirectionalLight(0xdde7f2,1);
    undersideLight.name='BoxLab Underside Fill';
    undersideLight.position.set(-4,-7,-5);
    undersideLight.castShadow=false;
    scene.add(undersideLight);
  }
  undersideLight.visible=mode==='studio'||mode==='solid';
  undersideLight.intensity=mode==='studio'?.95:1.6;
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
    scene.traverse(object=>{const kind=object?.userData?.kind;if(!object?.isMesh||!object.visible||(kind!=='body'&&kind!=='boxlab-inactive-body'))return;bounds.expandByObject(object);hasVisibleBody=true;object.castShadow=!object.userData.boxlabNativeOpacityOwner;object.receiveShadow=true;});
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
  syncUndersideLight(scene);
  ensureStudioRig();const enabled=mode==='studio';if(studioRig)studioRig.visible=enabled;renderer.shadowMap.enabled=enabled;
  if(enabled){renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=true;}
  if(state.baseHemisphere)state.baseHemisphere.intensity=enabled?.52:1.2;
  if(state.key)state.key.intensity=enabled?1.35:3.2;
  if(enabled){
    const backdrop=globalThis.__boxlabBackdropPresets?.colour;
    scene.background.copy(new THREE.Color(Number.isFinite(backdrop)?backdrop:0x131924));
  }else scene.background.copy(originalBackground||new THREE.Color(0x111318));
  if(enabled)refreshStudio();
  if(studioFloor)studioFloor.visible=(globalThis.__boxlabGroundPolish?.ground??'plane')==='plane';
}

function applyMode(body){
  const kind=body?.userData?.kind;if(!body?.isMesh||(kind!=='body'&&kind!=='boxlab-inactive-body'))return;
  const inactive=kind==='boxlab-inactive-body';if(!inactive)lastBody=body;clearRenderChildren(body);
  if(!body.userData.boxlabOriginalMaterial)body.userData.boxlabOriginalMaterial=body.material;
  const original=body.userData.boxlabOriginalMaterial;syncStudio();
  // Set before async paint display creation, not only in the queued rig refresh.
  // The replacement surface inherits these flags even when its digest wins the race.
  if(mode==='studio'){body.castShadow=true;body.receiveShadow=true;body.material=inactive?studioInactiveMaterial:studioMaterial;addBackface(body);}
  else if(mode==='uvchecker'||mode==='uvimage'){
    const m=manager(),object=m?.objects?.find(o=>o.id===(inactive?body.userData.objectId:m.activeId));
    const settings=object?.settings||{},mesh=inactive?object?.mesh:bridge()?.mesh;
    const eligible=object&&!object.sourceId&&!object.booleanRecipe&&!object.arrayRecipe&&!object.curveProfile&&object.kind!=='reference'&&!settings.subd&&!Object.values(settings.mirror||{}).some(Boolean);
    body.material=frontOnly(original);
    const preview=mode==='uvimage'
      ?eligible&&!inactive?createUVImageOverlay(body,mesh,object.glbPassthrough,globalThis.__boxlabExportAs?.buildUVPreviewGeometry,checkerHiddenMaterial):null
      :eligible?createUVCheckerOverlay(body,mesh,object.glbPassthrough,globalThis.__boxlabExportAs?.buildUVPreviewGeometry):null;
    if(preview&&mode==='uvchecker')body.material=checkerHiddenMaterial;
    else if(!preview){body.material=frontOnly(original);addBackface(body);}
  }
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
  if(mode==='studio'||mode==='solid'){
    const m=manager(),object=m?.objects?.find(o=>o.id===(inactive?body.userData.objectId:m.activeId)),settings=object?.settings||{};
    if(object?.glbPassthrough?.source==='nomad'&&object.visible!==false&&body.visible!==false&&object.kind!=='reference'&&!object.sourceId&&!object.booleanRecipe&&!object.arrayRecipe&&!object.curveProfile&&!settings.subd&&!Object.values(settings.mirror||{}).some(Boolean))createUVImageOverlay(body,inactive?object.mesh:bridge()?.mesh,object.glbPassthrough,globalThis.__boxlabExportAs?.buildUVPreviewGeometry,checkerHiddenMaterial,{lit:true});
  }
  if(['studio','solid','uvimage'].includes(mode)){const m=manager(),object=m?.objects?.find(o=>o.id===(inactive?body.userData.objectId:m.activeId));if(object?.colourPaint||object?.roughnessPaint||object?.metalnessPaint)createCommittedPaintSurface(body,object,inactive?object.mesh:bridge()?.mesh);}
}

Object.assign(globalThis.__boxlabRenderModes ||= {},{
  apply:applyMode,
  paintVisible:()=>['studio','solid','uvimage'].includes(mode),
  refreshStudio,
  facegroupView:()=>({...facegroupView}),
  setFacegroupView(next){updateFacegroupView(next);}
});
function rebuild(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function applyToSceneBodies(){const scene=bridge()?.scene;if(!scene)return false;let found=false;scene.traverse(object=>{const kind=object?.userData?.kind;if(kind==='body'||kind==='boxlab-inactive-body'){applyMode(object);found=true;}});return found;}
function modeLabel(){if(mode==='uvimage')return'UV Image · active Base; up to 4 mapped opaque materials; unavailable objects use Solid';if(mode==='uvchecker')return'UV Checker · Base UVs; unavailable objects use Solid';if(mode==='wire')return'Wire + Solid';if(mode==='matcap')return'MatCap';if(mode==='normals')return'Normals';if(mode==='studio')return'Studio';if(mode==='facegroups')return'Facegroups';return mode[0].toUpperCase()+mode.slice(1);}

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
if(!THREE.Group.prototype.__boxlabRenderModesInstalled){THREE.Group.prototype.add=function(...objects){const result=baseAdd.apply(this,objects);for(const object of objects)if(object?.userData?.kind==='body'){if(facegroupDock?.visible)queueMicrotask(syncFacegroupNamePicker);applyMode(object);if(mode==='facegroups'&&object.userData.boxlabFacegroupPending)retryPendingFacegroup(object);}return result;};THREE.Group.prototype.__boxlabRenderModesInstalled=true;}


// Mesh Health owns UV edits; refresh their temporary view after its session exits.
window.addEventListener('boxlab-tool-session-change',event=>{if((mode==='uvchecker'||mode==='uvimage')&&event.detail?.id==='mesh-health'&&!event.detail.active)applyToSceneBodies();});

function facegroupTarget(){return facegroupAuthoringTarget({manager:manager(),mesh:bridge()?.mesh,session:globalThis.__boxlabToolSession});}
function facegroupPaintAvailable(){return facegroupTarget().ok&&!globalThis.__boxlabFaceDirect?.dragging?.();}
function openFacegroupPaint(){
  const target=facegroupTarget();
  if(!target.ok||globalThis.__boxlabFaceDirect?.dragging?.()){if(status)status.textContent=target.reason||'Finish the active drag first';return false;}
  if(mode!=='facegroups')setMode('facegroups');
  return facegroupDock?.open()||false;
}
function syncFacegroupNamePicker(){
  if(!facegroupList)return;
  const mesh=bridge()?.mesh,object=manager()?.objects?.find(o=>o.id===manager().activeId);
  const rows=facegroupDrafts.palette(mesh,object,facegroupView);
  facegroupList.update({names:rows.names,colours:new Map([...rows.colours].map(([name,colour])=>[name,'#'+colour.getHexString()])),pending:rows.pending,selected:document.querySelector('#facegroupName')?.value.trim()});
}
function syncFacegroupControls(){
  syncFacegroupNamePicker();
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
    <button id="facegroupOpenPaint" type="button">Open facegroup paint controls</button>
    <div id="facegroupAuthoringHome" hidden><div id="facegroupAuthoringControls">
      <label>Group name <input id="facegroupName" type="text" value="Group 1" maxlength="64" autocomplete="off" style="touch-action:auto"/></label>
      <div class="facegroup-list-heading"><span>Facegroups</span><button id="facegroupAdd" type="button">ADD+</button></div><div id="facegroupNames" role="group" aria-label="Facegroups, colour and group name"></div>
      <div class="facegroup-dock-tools"><button id="facegroupStrokeToggle" type="button" aria-pressed="false">Paint</button><button id="facegroupEraseToggle" type="button" aria-pressed="false">Erase</button></div>
      <small>New groups are saved when painted or assigned. Pencil paints on lift; fingers navigate.</small>
      <details><summary>Selected faces</summary>
        <div class="outliner-actions"><button id="facegroupAssign" type="button">Assign selected</button><button id="facegroupClear" type="button">Clear selected</button></div>
        <button id="facegroupUseSelected" type="button">Use selected group name</button>
      </details>
    </div></div>
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
  facegroupDock=createFacegroupPaintDock({document,viewport:document.querySelector('#viewportWrap'),node:panel.querySelector('#facegroupAuthoringControls'),home:panel.querySelector('#facegroupAuthoringHome'),onClose:()=>{facegroupStroke.stop();syncFacegroupStrokeControls();if(facegroupRadialSession){facegroupRadialSession=false;window.dispatchEvent(new CustomEvent('boxlab-selection-hub-session-complete',{detail:{mode:'face',tool:'FACEGROUP'}}));}},onOpen:()=>{syncFacegroupNamePicker();if(globalThis.__boxlabSelectionBridge?.mode?.()!=='face')document.querySelector('#selectionModes [data-mode="face"]')?.click();if(!facegroupStroke.armed)facegroupStroke.arm(document.querySelector('#facegroupName').value);syncFacegroupStrokeControls();document.querySelector('#viewModes')?.removeAttribute('open');}});
  Object.assign(facegroupDock,{available:facegroupPaintAvailable,openFromHub:()=>{const opened=openFacegroupPaint();if(opened)facegroupRadialSession=true;return opened;}});
  globalThis.__boxlabFacegroupDock=facegroupDock;
  const controlClick=event=>{
    if(event.target.closest('#facegroupOpenPaint')){event.preventDefault();event.stopPropagation();openFacegroupPaint();return;}
    if(event.target.closest('#facegroupAdd')){
      event.preventDefault();event.stopPropagation();
      const target=facegroupTarget();if(!target.ok){if(status)status.textContent=target.reason;return;}
      const input=document.querySelector('#facegroupName');
      const name=facegroupDrafts.add(bridge()?.mesh,target.object,input.value);if(!name)return;
      input.value=name;input.dispatchEvent(new Event('input'));facegroupStroke.arm(name);
      syncFacegroupStrokeControls();syncFacegroupNamePicker();
      if(status)status.textContent=`Facegroups · ${name} ready · paint faces to save`;
      return;
    }

    const strokeButton=event.target.closest('#facegroupStrokeToggle,#facegroupEraseToggle');
    if(strokeButton){
      event.preventDefault();event.stopPropagation();
      const group=strokeButton.id==='facegroupEraseToggle'?null:document.querySelector('#facegroupName').value.trim();
      facegroupStroke.arm(group);
      syncFacegroupStrokeControls();
      if(facegroupStroke.armed)document.querySelector('#viewModes')?.removeAttribute('open');
      return;
    }
    if(event.target.closest('#facegroupUseSelected')){
      event.preventDefault();event.stopPropagation();
      const result=selectedFacegroupName(bridge()?.mesh,globalThis.__boxlabSelectionBridge);
      if(result.ok){document.querySelector('#facegroupName').value=result.name;document.querySelector('#facegroupName').dispatchEvent(new Event('input'));if(facegroupDock.visible){facegroupStroke.arm(result.name);syncFacegroupStrokeControls();}}
      if(status)status.textContent=result.ok?`Facegroups · using ${result.name}`:`Facegroups · ${result.reason}`;
      return;
    }
    const author=event.target.closest('#facegroupAssign,#facegroupClear');
    if(author){
      event.preventDefault();event.stopPropagation();
      const result=assignSelectedFacegroup({manager:manager(),selection:globalThis.__boxlabSelectionBridge,mesh:bridge()?.mesh,history:globalThis.__boxlabObjectHistory,session:globalThis.__boxlabToolSession,name:author.id==='facegroupClear'?null:document.querySelector('#facegroupName').value});
      syncFacegroupNamePicker();
      if(status)status.textContent=result.ok?(result.changed?`Facegroups · ${result.count} faces · ${result.group??'cleared'}`:'Facegroups · no change needed'):`Facegroups · ${result.reason}`;
      return;
    }
    const palette=event.target.closest('[data-facegroup-palette]');
    if(palette){event.preventDefault();event.stopPropagation();updateFacegroupView({palette:palette.dataset.facegroupPalette});return;}
    if(event.target.closest('#facegroupReseed')){event.preventDefault();event.stopPropagation();updateFacegroupView({seed:facegroupView.seed+1});return;}
    if(event.target.closest('#facegroupReset')){event.preventDefault();event.stopPropagation();facegroupView={...DEFAULT_FACEGROUP_VIEW};saveFacegroupView();syncFacegroupControls();if(mode==='facegroups')applyToSceneBodies();}
  };
  panel.addEventListener('click',controlClick);facegroupDock.element.addEventListener('click',controlClick);
  document.querySelector('#facegroupName').addEventListener('input',()=>{
    if(facegroupStroke.armed){facegroupStroke.stop();syncFacegroupStrokeControls();}
    syncFacegroupNamePicker();
  });
  document.querySelector('#facegroupName').addEventListener('change',()=>{
    if(facegroupDock.visible){facegroupStroke.arm(document.querySelector('#facegroupName').value);syncFacegroupStrokeControls();}
  });
  facegroupList=createFacegroupList({root:document.querySelector('#facegroupNames'),document,onSelect:name=>{
    document.querySelector('#facegroupName').value=name;
    document.querySelector('#facegroupName').dispatchEvent(new Event('input'));
    if(globalThis.__boxlabFacegroupDock?.visible){facegroupStroke.arm(name);syncFacegroupStrokeControls();}
    syncFacegroupNamePicker();
    if(status)status.textContent=`Facegroups · using ${name}`;
  }});
  document.querySelector('#viewModes')?.addEventListener('toggle',syncFacegroupNamePicker);
  panel.querySelector('#facegroupSaturation')?.addEventListener('input',event=>updateFacegroupView({saturation:Number(event.target.value)/100}));
  panel.querySelector('#facegroupLightness')?.addEventListener('input',event=>updateFacegroupView({lightness:Number(event.target.value)/100}));
  panel.querySelector('#facegroupUngrouped')?.addEventListener('input',event=>updateFacegroupView({ungrouped:event.target.value}));
  syncFacegroupControls();
}

function installUI(){
  const host=document.querySelector('#viewportRenderLooks');
  if(!host||host.dataset.ready==='true')return false;
  host.dataset.ready='true';
  host.innerHTML='<button type="button" data-render="studio" class="active">Studio</button><button type="button" data-render="solid">Solid</button><button type="button" data-render="clay">Clay</button><button type="button" data-render="matcap">MatCap</button><button type="button" data-render="normals">Normals</button><button type="button" data-render="wire">Wire</button><button type="button" data-render="xray">X-Ray</button><button type="button" data-render="facegroups">Facegroups</button><button type="button" data-render="uvchecker">UV Checker</button><button type="button" data-render="uvimage">UV Image</button>';
  installFacegroupControls(host);
  host.addEventListener('click',event=>{const button=event.target.closest('button[data-render]');if(!button)return;event.preventDefault();event.stopPropagation();setMode(button.dataset.render);});
  return true;
}

if(!installUI())queueMicrotask(installUI);
queueMicrotask(rebuild);

// Visible release identity is owned by release-version.js.


/* v0.36.18.568 compact Facegroup controls */
const facegroupUiStyle=document.createElement('style');
facegroupUiStyle.textContent=`
#facegroupViewControls{font-size:12px}
#facegroupViewControls .viewport-menu-label{font-size:10px}
#facegroupViewControls button{
  min-height:32px!important;
  height:32px;
  padding:5px 6px!important;
  font-size:12px!important;
  line-height:1;
}
#facegroupViewControls .range-row{
  grid-template-columns:72px minmax(0,1fr) 42px;
  gap:6px;
  align-items:center;
  min-height:32px;
  font-size:11px;
}
#facegroupViewControls .range-row input[type="range"]{
  width:100%;
  height:20px;
  margin:0;
}
#facegroupViewControls .range-row output{
  font-size:11px;
  text-align:right;
}
#facegroupViewControls .toggle-row{
  min-height:32px;
  padding:4px 6px;
  font-size:11px;
}
#facegroupViewControls input[type="color"]{
  width:34px;
  height:24px;
  padding:1px;
}
#facegroupViewControls .outliner-actions{
  gap:5px;
  margin-top:6px;
}
#facegroupViewControls .facegroup-palette-grid{
  gap:5px;
}
`;
facegroupUiStyle.textContent+=`
#facegroupPaintDock{display:grid;gap:8px;padding:10px;border:1px solid #ffffff30;border-radius:12px;background:#12151b;color:#eef1f7;font-size:12px}
#facegroupPaintDock[hidden]{display:none!important}
#facegroupPaintDock .facegroup-dock-header{display:flex;align-items:center;justify-content:space-between;gap:8px}
#facegroupAuthoringControls{display:grid;gap:8px}
#facegroupAuthoringControls label{display:grid;gap:4px}
#facegroupPaintDock input,#facegroupPaintDock select{width:100%;min-width:0;min-height:36px;font:inherit;color:inherit;background:#202630;border:1px solid #ffffff30;border-radius:6px;padding:5px}
#facegroupPaintDock button{min-height:36px;padding:6px 8px;font-size:12px}
#facegroupPaintDock .facegroup-dock-tools,#facegroupPaintDock .outliner-actions{display:grid;grid-template-columns:1fr 1fr;gap:6px}
#facegroupPaintDock button[aria-pressed=true]{background:#eef1f7;color:#15171b}
#facegroupPaintDock summary{cursor:pointer;min-height:32px;padding-top:8px}
#facegroupPaintDock .facegroup-list-heading{display:flex;justify-content:space-between;align-items:center;gap:8px}
#facegroupNames{display:grid;gap:4px;max-height:200px;overflow-y:auto;overscroll-behavior:contain}
#facegroupPaintDock .facegroup-list-row{display:grid;grid-template-columns:36px minmax(0,1fr);align-items:center;gap:8px;width:100%;min-height:46px;text-align:left;border:1px solid #ffffff20;border-radius:7px;background:#202630;color:#eef1f7}
#facegroupPaintDock .facegroup-list-row[aria-pressed=true]{background:#164568;border-color:#60b5ff;color:#fff}
#facegroupPaintDock .facegroup-list-swatch{display:block;width:34px;height:34px;border-radius:5px;border:1px solid #ffffff40}
#facegroupPaintDock .facegroup-list-row strong{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px}
#facegroupPaintDock .facegroup-list-row:focus-visible{outline:2px solid #fff;outline-offset:-2px}
#facegroupPaintDock small{line-height:1.4;color:#b4bdca}
`;
document.head.append(facegroupUiStyle);

function syncFacegroupStrokeControls(){
  for(const [id,erase,label] of [['facegroupStrokeToggle',false,'Paint'],['facegroupEraseToggle',true,'Erase']]){
    const button=document.querySelector('#'+id);if(!button)continue;
    const active=facegroupStroke.armed&&(facegroupStroke.group===null)===erase;
    button.setAttribute('aria-pressed',String(active));button.textContent=label;
  }
}
document.addEventListener('boxlab-render-mode-change',event=>{if(event.detail?.mode!=='facegroups'){facegroupDock?.close();facegroupStroke.stop();syncFacegroupStrokeControls();}});

document.addEventListener('click',event=>{const modeButton=event.target?.closest?.('#selectionModes button');if(modeButton&&modeButton.dataset.mode!=='face')facegroupDock?.close();},true);
window.addEventListener('boxlab-tool-session-change',event=>{if(event.detail?.active)facegroupDock?.close();});

window.addEventListener('boxlab-selection-hub-tool',event=>{if(event.detail?.tool!=='FACEGROUP')facegroupDock?.close();});
