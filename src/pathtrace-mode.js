import * as THREE from 'three';

const viewport=document.querySelector('#viewport');
const wrap=document.querySelector('#viewportWrap');
const status=document.querySelector('#selectionStatus');

let active=false;
let mainScene=null;
let mainCamera=null;
let traceCanvas=null;
let traceRenderer=null;
let pathTracer=null;
let traceScene=null;
let packagePromise=null;
let lastBodySignature='';
let lastCameraSignature='';
let lastHudUpdate=0;
let hud=null;
let failed=false;

function installRendererBridge(){
  if(THREE.WebGLRenderer.prototype.__boxlabPathTraceBridgeInstalled)return;
  const baseRender=THREE.WebGLRenderer.prototype.render;
  THREE.WebGLRenderer.prototype.render=function(scene,camera){
    if(this.domElement===viewport&&scene?.isScene&&camera?.isCamera){
      mainScene=scene;
      mainCamera=camera;
      globalThis.__boxlabPathTraceBridge={renderer:this,scene,camera};
    }
    return baseRender.call(this,scene,camera);
  };
  THREE.WebGLRenderer.prototype.__boxlabPathTraceBridgeInstalled=true;
}

function ensureOverlay(){
  if(traceCanvas)return;
  traceCanvas=document.createElement('canvas');
  traceCanvas.id='boxlabPathTraceCanvas';
  traceCanvas.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;display:none;';
  wrap?.append(traceCanvas);
  hud=document.createElement('div');
  hud.id='boxlabPathTraceHud';
  hud.style.cssText='position:absolute;right:14px;bottom:34px;z-index:3;pointer-events:none;padding:6px 9px;border-radius:7px;background:rgba(12,14,18,.76);color:#eef3f8;font:600 11px/1.2 system-ui,-apple-system,sans-serif;letter-spacing:.02em;display:none;backdrop-filter:blur(8px);';
  hud.textContent='Path Trace';
  wrap?.append(hud);
}

async function loadPackage(){
  if(packagePromise)return packagePromise;
  packagePromise=import('https://esm.sh/three-gpu-pathtracer@0.0.23?external=three');
  return packagePromise;
}

function bodyObjects(){
  if(!mainScene)return[];
  const out=[];
  mainScene.traverse(object=>{
    if(!object?.isMesh||!object.visible||!object.geometry)return;
    const kind=object.userData?.kind;
    if(kind==='body'||kind==='boxlab-inactive-body')out.push(object);
  });
  return out;
}

function matrixSignature(matrix){
  return matrix.elements.map(value=>Math.round(value*10000)/10000).join(',');
}

function bodySignature(){
  return bodyObjects().map(object=>`${object.geometry.uuid}:${matrixSignature(object.matrixWorld)}`).join('|');
}

function cameraSignature(camera){
  if(!camera)return'';
  return `${matrixSignature(camera.matrixWorld)}|${matrixSignature(camera.projectionMatrix)}`;
}

function studioMaterial(){
  return new THREE.MeshStandardMaterial({color:0xc5cbd3,roughness:.48,metalness:.02,side:THREE.DoubleSide});
}

function buildTraceScene(){
  const scene=new THREE.Scene();
  scene.background=new THREE.Color(0x16191f);
  const box=new THREE.Box3();
  let count=0;
  for(const source of bodyObjects()){
    source.updateWorldMatrix(true,false);
    const geometry=source.geometry.clone();
    geometry.applyMatrix4(source.matrixWorld);
    if(!geometry.getAttribute('normal'))geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    if(geometry.boundingBox)box.union(geometry.boundingBox);
    const mesh=new THREE.Mesh(geometry,studioMaterial());
    mesh.userData.boxlabPathTraceBody=true;
    scene.add(mesh);
    count++;
  }
  if(!count||box.isEmpty())return{scene,count,box};

  const center=box.getCenter(new THREE.Vector3());
  const size=box.getSize(new THREE.Vector3());
  const extent=Math.max(size.x,size.y,size.z,.25);
  const floorSize=Math.max(extent*8,8);
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(floorSize,floorSize),new THREE.MeshStandardMaterial({color:0x3d4148,roughness:.82,metalness:0,side:THREE.DoubleSide}));
  floor.rotation.x=-Math.PI/2;
  floor.position.set(center.x,box.min.y-Math.max(extent*.012,.004),center.z);
  scene.add(floor);

  const key=new THREE.RectAreaLight(0xffffff,Math.max(8,extent*5),extent*3.2,extent*3.2);
  key.position.set(center.x+extent*2.2,center.y+extent*2.8,center.z+extent*2.4);
  key.lookAt(center);
  scene.add(key);

  const fill=new THREE.RectAreaLight(0xaecbff,Math.max(4,extent*2.4),extent*2.4,extent*2.4);
  fill.position.set(center.x-extent*2.0,center.y+extent*1.3,center.z+extent*1.2);
  fill.lookAt(center);
  scene.add(fill);

  const rim=new THREE.RectAreaLight(0xffe3c2,Math.max(3,extent*1.8),extent*2.0,extent*2.0);
  rim.position.set(center.x,center.y+extent*2.0,center.z-extent*2.8);
  rim.lookAt(center);
  scene.add(rim);

  return{scene,count,box};
}

function disposeTraceScene(){
  if(!traceScene)return;
  traceScene.traverse(object=>{
    if(object?.geometry&&object.userData?.boxlabPathTraceBody)object.geometry.dispose?.();
    if(object?.material){
      if(Array.isArray(object.material))object.material.forEach(material=>material.dispose?.());
      else object.material.dispose?.();
    }
  });
  traceScene=null;
}

function resizeTrace(){
  if(!traceRenderer||!wrap)return;
  const width=Math.max(1,wrap.clientWidth),height=Math.max(1,wrap.clientHeight);
  traceRenderer.setSize(width,height,false);
}

async function ensureTracer(){
  if(pathTracer||failed)return !!pathTracer;
  ensureOverlay();
  try{
    if(hud){hud.style.display='block';hud.textContent='Path Trace • loading…';}
    const module=await loadPackage();
    traceRenderer=new THREE.WebGLRenderer({canvas:traceCanvas,antialias:false,alpha:false,powerPreference:'high-performance'});
    traceRenderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.35));
    traceRenderer.outputColorSpace=THREE.SRGBColorSpace;
    traceRenderer.toneMapping=THREE.ACESFilmicToneMapping;
    traceRenderer.toneMappingExposure=1.05;
    resizeTrace();
    pathTracer=new module.WebGLPathTracer(traceRenderer);
    pathTracer.bounces=3;
    pathTracer.renderScale=.62;
    pathTracer.tiles.set(2,2);
    pathTracer.dynamicLowRes=true;
    pathTracer.lowResScale=.22;
    pathTracer.renderDelay=0;
    pathTracer.fadeDuration=120;
    pathTracer.minSamples=1;
    return true;
  }catch(error){
    failed=true;
    console.error('BoxLab Path Trace unavailable',error);
    if(hud){hud.style.display='block';hud.textContent='Path Trace unavailable';}
    if(status)status.textContent='Path Trace unavailable on this browser / GPU';
    return false;
  }
}

async function rebuildTraceScene(force=false){
  if(!active||failed)return false;
  if(!await ensureTracer())return false;
  const signature=bodySignature();
  if(!force&&signature===lastBodySignature)return true;
  const built=buildTraceScene();
  if(!built.count){
    if(hud)hud.textContent='Path Trace • no visible body';
    return false;
  }
  disposeTraceScene();
  traceScene=built.scene;
  lastBodySignature=signature;
  lastCameraSignature=cameraSignature(mainCamera);
  pathTracer.setScene(traceScene,mainCamera);
  pathTracer.reset();
  if(hud)hud.textContent=`Path Trace • ${built.count} object${built.count===1?'':'s'} • 0 spp`;
  return true;
}

function setVisible(show){
  ensureOverlay();
  if(traceCanvas)traceCanvas.style.display=show?'block':'none';
  if(hud)hud.style.display=show?'block':'none';
}

async function activate(){
  active=true;
  setVisible(true);
  if(status)status.textContent='Path Trace • preparing studio render…';
  await rebuildTraceScene(true);
}

function deactivate(){
  active=false;
  setVisible(false);
}

function animate(time){
  requestAnimationFrame(animate);
  if(!active||!pathTracer||!mainCamera||!traceScene||failed)return;
  const bodies=bodySignature();
  if(bodies!==lastBodySignature){
    rebuildTraceScene(true);
    return;
  }
  const cameraNow=cameraSignature(mainCamera);
  if(cameraNow!==lastCameraSignature){
    lastCameraSignature=cameraNow;
    pathTracer.updateCamera();
    pathTracer.reset();
  }
  try{
    pathTracer.renderSample();
    if(hud&&time-lastHudUpdate>250){
      lastHudUpdate=time;
      hud.textContent=`Path Trace • ${Math.floor(pathTracer.samples||0)} spp • 62%`;
    }
  }catch(error){
    failed=true;
    console.error('BoxLab Path Trace render failed',error);
    if(hud)hud.textContent='Path Trace render failed';
    if(status)status.textContent='Path Trace render failed • normal viewport is still available';
  }
}

window.addEventListener('resize',()=>{resizeTrace();if(active)pathTracer?.reset?.();});
document.addEventListener('boxlab-render-mode-change',event=>{
  if(event.detail?.mode==='pathtrace')activate();
  else deactivate();
});

installRendererBridge();
ensureOverlay();
requestAnimationFrame(animate);
