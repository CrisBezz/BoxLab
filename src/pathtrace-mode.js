import * as THREE from 'three';

const wrap=document.querySelector('#viewportWrap');
const status=document.querySelector('#selectionStatus');
const HELIOS_BUNDLE='./helios-tracer.bundle.js?v=0.36.18.1157';

let active=false;
let interacting=false;
let tracer=null;
let camera=null;
let defaultLights=[];
let defaultMaterials=new Map();
let hud=null;
let modulePromise=null;
let generation=0;
let rebuildTimer=0;
let settleTimer=0;
let lastCameraSignature='';
let lastHudUpdate=0;
let animationFrame=0;
let resizeObserver=null;
let savedControls=null;

function state(){return globalThis.__boxlabBridgeState||null;}
function getCamera(){return state()?.camera||null;}
function getRenderer(){return state()?.renderer||globalThis.__boxlabPathTraceBridge?.renderer||null;}

function ensureHud(){
  if(hud||!wrap)return;
  hud=document.createElement('div');
  hud.id='boxlabPathTraceHud';
  hud.style.cssText='position:absolute;right:14px;bottom:34px;z-index:3;pointer-events:none;max-width:min(76vw,520px);padding:8px 10px;border-radius:7px;background:rgba(12,14,18,.88);color:#eef3f8;font:600 11px/1.35 system-ui,-apple-system,sans-serif;letter-spacing:.01em;display:none;white-space:pre-line;backdrop-filter:blur(8px);';
  wrap.append(hud);
}

function message(text,detail=''){
  ensureHud();
  if(hud){hud.style.display=active?'block':'none';hud.textContent=`Helios • ${text}${detail?`\n${detail}`:''}`;}
  if(status)status.textContent=`Helios • ${text}`;
}

function cameraSignature(source){
  if(!source)return'';
  source.updateMatrixWorld(true);
  return [...source.matrixWorld.elements,...source.projectionMatrix.elements].map(value=>Math.round(value*10000)/10000).join(',');
}

function syncCamera(){
  const source=getCamera();
  if(!tracer||!source)return false;
  source.updateMatrixWorld(true);
  const transform=tracer.transform;
  camera.position.copy(source.position).multiplyScalar(transform.scale).add(transform.offset);
  camera.quaternion.copy(source.quaternion);
  camera.up.copy(source.up);
  camera.fov=source.fov;
  camera.aspect=source.aspect;
  camera.near=Math.max(0.001,source.near*transform.scale);
  camera.far=Math.max(camera.near+1,source.far*transform.scale);
  camera.updateProjectionMatrix();
  camera.updateMatrixWorld(true);
  const signature=cameraSignature(source);
  if(signature!==lastCameraSignature){lastCameraSignature=signature;tracer.reset();return true;}
  return false;
}

function visibleEditableObjects(){
  const manager=globalThis.__boxlabObjectManager;
  manager?.saveActive?.();
  return (manager?.objects||[]).filter(object=>object?.kind!=='reference'&&object?.mesh&&object.visible!==false);
}

async function buildCurrentGLB(){
  const owner=globalThis.__boxlabExportAs;
  if(typeof owner?.buildGLB!=='function')throw new Error('BoxLab GLB exporter is not ready');
  const objects=visibleEditableObjects();
  if(!objects.length)throw new Error('There are no visible editable objects to trace');
  const result=await owner.buildGLB(objects,false);
  if(!result?.verification?.pass||!(result.buffer instanceof ArrayBuffer))throw new Error('BoxLab GLB export did not pass verification');
  return result.buffer;
}

function resize(interactingNow=interacting){
  if(!active||!tracer||!wrap)return;
  tracer.resize(wrap.clientWidth,wrap.clientHeight,interactingNow);
}

function releaseTracer(){
  const old=tracer;tracer=null;camera=null;lastCameraSignature='';
  try{old?.dispose?.();}catch(error){console.warn('Helios trace cleanup failed',error);}
}

async function rebuild(runId=generation){
  if(!active||runId!==generation)return;
  publishControlState(false);
  message('building current BoxLab GLB…');
  releaseTracer();
  try{
    const renderer=getRenderer();
    const source=getCamera();
    if(!renderer||!source)throw new Error('BoxLab renderer or camera is unavailable');
    const glb=await buildCurrentGLB();
    if(!active||runId!==generation)return;
    if(!modulePromise)modulePromise=import(HELIOS_BUNDLE);
    const helios=await modulePromise;
    if(!active||runId!==generation)return;
    const next=await helios.createBoxLabHeliosTrace(renderer,glb);
    if(!active||runId!==generation){next.dispose();return;}
    tracer=next;
    const defaults=tracer.getState?.()||{};
    defaultLights=(defaults.lights||[]).map(light=>({...light}));
    defaultMaterials=new Map((defaults.materials||[]).map(material=>[material.id,{...material}]));
    if(savedControls)tracer.applyPreferences(savedControls);
    publishControlState();
    camera=source.clone();
    camera.matrixAutoUpdate=true;
    syncCamera();
    tracer.resize(wrap.clientWidth,wrap.clientHeight,false);
    message('ready','Helios GPU path tracer • BoxLab materials and GLB textures');
  }catch(error){
    if(runId!==generation)return;
    message('failed',error?.message||String(error));
    console.error('[BoxLab Helios Trace]',error);
    document.dispatchEvent(new CustomEvent('boxlab-pathtrace-failed'));
  }
}

function scheduleRebuild(){
  if(!active)return;
  clearTimeout(rebuildTimer);
  rebuildTimer=setTimeout(()=>{const runId=++generation;rebuild(runId);},450);
}

function setInteraction(value){
  if(!active||!tracer||interacting===value)return;
  interacting=value;
  tracer.reset();
  resize(interacting);
}

function bindControls(){
  const controls=state()?.controls;
  if(!controls||controls.__boxlabHeliosTraceBound)return;
  const start=()=>{clearTimeout(settleTimer);setInteraction(true);};
  const change=()=>{
    if(!active)return;
    clearTimeout(settleTimer);
    setInteraction(true);
    settleTimer=setTimeout(()=>setInteraction(false),180);
  };
  const end=()=>{clearTimeout(settleTimer);settleTimer=setTimeout(()=>setInteraction(false),180);};
  controls.addEventListener('start',start);
  controls.addEventListener('change',change);
  controls.addEventListener('end',end);
  controls.__boxlabHeliosTraceBound={start,change,end};
}

function unbindControls(){
  const controls=state()?.controls,bound=controls?.__boxlabHeliosTraceBound;
  if(!controls||!bound)return;
  controls.removeEventListener('start',bound.start);
  controls.removeEventListener('change',bound.change);
  controls.removeEventListener('end',bound.end);
  delete controls.__boxlabHeliosTraceBound;
}

async function activate(){
  clearTimeout(rebuildTimer);clearTimeout(settleTimer);
  active=true;interacting=false;generation++;
  globalThis.__boxlabHeliosTraceActive=true;
  ensureHud();if(hud)hud.style.display='block';
  bindControls();
  if(!animationFrame)animationFrame=requestAnimationFrame(animate);
  if(!resizeObserver&&wrap&&'ResizeObserver'in window){resizeObserver=new ResizeObserver(()=>resize());resizeObserver.observe(wrap);}
  await rebuild(generation);
}

function deactivate(){
  active=false;interacting=false;generation++;
  clearTimeout(rebuildTimer);clearTimeout(settleTimer);
  globalThis.__boxlabHeliosTraceActive=false;
  unbindControls();
  if(animationFrame){cancelAnimationFrame(animationFrame);animationFrame=0;}
  resizeObserver?.disconnect();resizeObserver=null;
  if(hud)hud.style.display='none';
  releaseTracer();
  document.dispatchEvent(new CustomEvent('boxlab-helios-trace-state',{detail:{active:false,ready:false,state:null}}));
}

function publishControlState(isReady=Boolean(tracer)){
  const current=tracer?.getState?.()||null;
  if(current)savedControls=current;
  const base=current||savedControls;
  const stateWithCamera=base?{...base,cameraFov:getCamera()?.fov||42}:null;
  document.dispatchEvent(new CustomEvent('boxlab-helios-trace-state',{detail:{active,ready:isReady,state:stateWithCamera}}));
}

function applyDockAction(detail={}){
  if(!active||!tracer)return;
  const stateNow=tracer.getState();
  if(detail.action==='light'){
    const lights=stateNow.lights.map(light=>light.id===detail.id?{...light,...detail.patch}:light);
    tracer.updateLights(lights);
  }else if(detail.action==='reset-light'){
    const defaults=defaultLights.find(light=>light.id===detail.id);
    if(defaults)tracer.updateLights(stateNow.lights.map(light=>light.id===detail.id?{...defaults}:light));
  }else if(detail.action==='material')tracer.updateMaterial(detail.id,detail.patch||{});
  else if(detail.action==='reset-material'){
    const defaults=defaultMaterials.get(detail.id);
    if(defaults){
      const keys=['color','roughness','metalness','ior','transmission','clearcoat','emissiveIntensity','texturePreset','uvScale','normalStrength'];
      const patch=Object.fromEntries(keys.filter(key=>defaults[key]!==undefined).map(key=>[key,defaults[key]]));
      tracer.updateMaterial(detail.id,patch);
    }
  }
  else if(detail.action==='material-preset')tracer.applyMaterialPreset(detail.id,detail.presetId);
  else if(detail.action==='settings')tracer.updateSettings(detail.patch||{});
  else if(detail.action==='lighting-rig')tracer.applyLightingRig(detail.id);
  else if(detail.action==='restart')tracer.reset();
  else if(detail.action==='camera')applyCameraPreset(detail.preset);
  else if(detail.action==='camera-fov'){
    const source=getCamera();
    if(source){source.fov=Math.max(20,Math.min(65,Number(detail.value)||42));source.updateProjectionMatrix();tracer.reset();}
  }
  publishControlState();
}

function applyCameraPreset(preset){
  const source=getCamera(),controls=state()?.controls;
  if(!source||!controls?.target)return;
  const directions={
    hero:[.58,.42,.70],front:[0,0,1],side:[1,.08,0],top:[.03,1,.08],closeup:[.58,.42,.70],
  };
  const direction=directions[preset];
  if(!direction)return;
  const target=controls.target.clone();
  const currentDistance=Math.max(.25,source.position.distanceTo(target));
  const distance=preset==='closeup'?currentDistance*.48:currentDistance;
  const vector=new THREE.Vector3(...direction).normalize();
  source.position.copy(target).addScaledVector(vector,distance);
  source.fov=preset==='closeup'?30:preset==='hero'?38:preset==='top'?40:36;
  source.updateProjectionMatrix();
  controls.update();
}

function animate(time){
  animationFrame=0;
  if(!active)return;
  animationFrame=requestAnimationFrame(animate);
  if(!tracer||!camera)return;
  const changed=syncCamera();
  try{
    const samples=tracer.render(camera,interacting);
    if(hud&&time-lastHudUpdate>250){lastHudUpdate=time;const sampleLimit=tracer.getState?.().settings?.maxSamples||128;hud.textContent=`Helios Ray Trace • ${samples}/${sampleLimit} spp\n${interacting?'Interactive preview':'PBR materials • studio lighting'}`;}
  }catch(error){
    message('render failed',error?.message||String(error));
    console.error('[BoxLab Helios Trace render]',error);
    document.dispatchEvent(new CustomEvent('boxlab-pathtrace-failed'));
  }
}

window.addEventListener('resize',()=>resize());
document.addEventListener('boxlab-helios-dock-action',event=>applyDockAction(event.detail||{}));
window.addEventListener('boxlab-core-mesh-published',scheduleRebuild);
document.addEventListener('boxlab-render-mode-change',event=>{
  if(event.detail?.mode==='pathtrace')activate();
  else if(active)deactivate();
});
ensureHud();
