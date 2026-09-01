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
let firstSampleDone=false;
let diagnosticStage='D0';

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
  hud.style.cssText='position:absolute;right:14px;bottom:34px;z-index:3;pointer-events:none;max-width:min(76vw,520px);padding:8px 10px;border-radius:7px;background:rgba(12,14,18,.88);color:#eef3f8;font:600 11px/1.35 system-ui,-apple-system,sans-serif;letter-spacing:.01em;display:none;white-space:pre-line;backdrop-filter:blur(8px);';
  hud.textContent='Path Trace';
  wrap?.append(hud);
}

function message(stage,text,detail=''){
  diagnosticStage=stage;
  const full=`${stage} • ${text}${detail?`\n${detail}`:''}`;
  if(hud){hud.style.display='block';hud.textContent=full;}
  if(status)status.textContent=`Path Trace ${stage} • ${text}`;
  console.info(`[BoxLab Path Trace ${stage}] ${text}`,detail||'');
}

function fail(stage,text,error){
  failed=true;
  const detail=error?.message||String(error||'Unknown error');
  message(stage,text,detail);
  console.error(`[BoxLab Path Trace ${stage}]`,error);
  return false;
}

function probeWebGL2(){
  const probe=document.createElement('canvas');
  let gl=null;
  try{
    gl=probe.getContext('webgl2',{alpha:false,antialias:false,powerPreference:'high-performance'});
  }catch(error){
    return{ok:false,error};
  }
  if(!gl)return{ok:false,error:new Error('canvas.getContext("webgl2") returned null')};
  const debug=gl.getExtension('WEBGL_debug_renderer_info');
  const renderer=debug?gl.getParameter(debug.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER);
  const vendor=debug?gl.getParameter(debug.UNMASKED_VENDOR_WEBGL):gl.getParameter(gl.VENDOR);
  const maxTexture=gl.getParameter(gl.MAX_TEXTURE_SIZE);
  const maxDrawBuffers=gl.getParameter(gl.MAX_DRAW_BUFFERS);
  const colorFloat=!!gl.getExtension('EXT_color_buffer_float');
  const floatLinear=!!gl.getExtension('OES_texture_float_linear');
  const timer=!!gl.getExtension('EXT_disjoint_timer_query_webgl2');
  const info={ok:true,renderer,vendor,maxTexture,maxDrawBuffers,colorFloat,floatLinear,timer};
  try{gl.getExtension('WEBGL_lose_context')?.loseContext?.();}catch{}
  return info;
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
function bodySignature(){return bodyObjects().map(object=>`${object.geometry.uuid}:${matrixSignature(object.matrixWorld)}`).join('|');}
function cameraSignature(camera){return camera?`${matrixSignature(camera.matrixWorld)}|${matrixSignature(camera.projectionMatrix)}`:'';}
function studioMaterial(){return new THREE.MeshStandardMaterial({color:0xc5cbd3,roughness:.48,metalness:.02,side:THREE.DoubleSide});}

function buildTraceScene(){
  const scene=new THREE.Scene();scene.background=new THREE.Color(0x16191f);
  const box=new THREE.Box3();let count=0;
  for(const source of bodyObjects()){
    source.updateWorldMatrix(true,false);
    const geometry=source.geometry.clone();geometry.applyMatrix4(source.matrixWorld);
    if(!geometry.getAttribute('normal'))geometry.computeVertexNormals();
    geometry.computeBoundingBox();if(geometry.boundingBox)box.union(geometry.boundingBox);
    const mesh=new THREE.Mesh(geometry,studioMaterial());mesh.userData.boxlabPathTraceBody=true;scene.add(mesh);count++;
  }
  if(!count||box.isEmpty())return{scene,count,box};
  const center=box.getCenter(new THREE.Vector3()),size=box.getSize(new THREE.Vector3()),extent=Math.max(size.x,size.y,size.z,.25),floorSize=Math.max(extent*8,8);
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(floorSize,floorSize),new THREE.MeshStandardMaterial({color:0x3d4148,roughness:.82,metalness:0,side:THREE.DoubleSide}));
  floor.rotation.x=-Math.PI/2;floor.position.set(center.x,box.min.y-Math.max(extent*.012,.004),center.z);scene.add(floor);
  const key=new THREE.RectAreaLight(0xffffff,Math.max(8,extent*5),extent*3.2,extent*3.2);key.position.set(center.x+extent*2.2,center.y+extent*2.8,center.z+extent*2.4);key.lookAt(center);scene.add(key);
  const fill=new THREE.RectAreaLight(0xaecbff,Math.max(4,extent*2.4),extent*2.4,extent*2.4);fill.position.set(center.x-extent*2.0,center.y+extent*1.3,center.z+extent*1.2);fill.lookAt(center);scene.add(fill);
  const rim=new THREE.RectAreaLight(0xffe3c2,Math.max(3,extent*1.8),extent*2.0,extent*2.0);rim.position.set(center.x,center.y+extent*2.0,center.z-extent*2.8);rim.lookAt(center);scene.add(rim);
  return{scene,count,box};
}

function disposeTraceScene(){
  if(!traceScene)return;
  traceScene.traverse(object=>{
    if(object?.geometry&&object.userData?.boxlabPathTraceBody)object.geometry.dispose?.();
    if(object?.material){if(Array.isArray(object.material))object.material.forEach(material=>material.dispose?.());else object.material.dispose?.();}
  });
  traceScene=null;
}
function resizeTrace(){if(traceRenderer&&wrap)traceRenderer.setSize(Math.max(1,wrap.clientWidth),Math.max(1,wrap.clientHeight),false);}

async function ensureTracer(){
  if(pathTracer||failed)return !!pathTracer;
  ensureOverlay();
  message('D1','starting diagnostics');
  if(!mainCamera||!mainScene){return fail('D1','main BoxLab renderer bridge not ready',new Error('No captured scene/camera yet'));}

  const probe=probeWebGL2();
  if(!probe.ok)return fail('D2','WebGL2 unavailable',probe.error);
  message('D3','WebGL2 OK',`GPU: ${probe.renderer||'unknown'}\nVendor: ${probe.vendor||'unknown'}\nEXT_color_buffer_float: ${probe.colorFloat?'YES':'NO'} • OES_texture_float_linear: ${probe.floatLinear?'YES':'NO'}\nMAX_TEXTURE_SIZE: ${probe.maxTexture} • MAX_DRAW_BUFFERS: ${probe.maxDrawBuffers}`);

  let module;
  try{
    module=await loadPackage();
    if(!module?.WebGLPathTracer)throw new Error('WebGLPathTracer export missing');
    message('D4','path tracer package loaded');
  }catch(error){return fail('D4','package import failed',error);}

  try{
    traceRenderer=new THREE.WebGLRenderer({canvas:traceCanvas,antialias:false,alpha:false,powerPreference:'high-performance'});
    traceRenderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.35));
    traceRenderer.outputColorSpace=THREE.SRGBColorSpace;
    traceRenderer.toneMapping=THREE.ACESFilmicToneMapping;
    traceRenderer.toneMappingExposure=1.05;
    resizeTrace();
    message('D5','Three.js WebGL renderer created');
  }catch(error){return fail('D5','Three.js renderer creation failed',error);}

  try{
    pathTracer=new module.WebGLPathTracer(traceRenderer);
    pathTracer.bounces=3;pathTracer.renderScale=.62;pathTracer.tiles.set(2,2);pathTracer.dynamicLowRes=true;pathTracer.lowResScale=.22;pathTracer.renderDelay=0;pathTracer.fadeDuration=120;pathTracer.minSamples=1;
    message('D6','path tracer constructed');
    return true;
  }catch(error){return fail('D6','path tracer constructor failed',error);}
}

async function rebuildTraceScene(force=false){
  if(!active||failed)return false;
  if(!await ensureTracer())return false;
  const signature=bodySignature();if(!force&&signature===lastBodySignature)return true;
  const built=buildTraceScene();
  if(!built.count){message('D7','no visible BoxLab body');return false;}
  disposeTraceScene();traceScene=built.scene;lastBodySignature=signature;lastCameraSignature=cameraSignature(mainCamera);firstSampleDone=false;
  try{
    pathTracer.setScene(traceScene,mainCamera);pathTracer.reset();
    message('D7',`scene uploaded • ${built.count} object${built.count===1?'':'s'}`,'Waiting for first sample…');
    return true;
  }catch(error){return fail('D7','scene upload / shader setup failed',error);}
}

function setVisible(show){ensureOverlay();if(traceCanvas)traceCanvas.style.display=show?'block':'none';if(hud)hud.style.display=show?'block':'none';}
async function activate(){failed=false;active=true;setVisible(true);message('D0','preparing diagnostic run');await rebuildTraceScene(true);}
function deactivate(){active=false;setVisible(false);}

function animate(time){
  requestAnimationFrame(animate);
  if(!active||!pathTracer||!mainCamera||!traceScene||failed)return;
  const bodies=bodySignature();if(bodies!==lastBodySignature){rebuildTraceScene(true);return;}
  const cameraNow=cameraSignature(mainCamera);if(cameraNow!==lastCameraSignature){lastCameraSignature=cameraNow;pathTracer.updateCamera();pathTracer.reset();firstSampleDone=false;}
  try{
    pathTracer.renderSample();
    if(!firstSampleDone){firstSampleDone=true;message('D8','FIRST SAMPLE OK','Path tracing is supported on this browser / GPU.');}
    if(hud&&time-lastHudUpdate>250){lastHudUpdate=time;hud.textContent=`D8 • Path Trace running\n${Math.floor(pathTracer.samples||0)} spp • 62% • 3 bounces`;}
  }catch(error){fail('D8','first/sample render failed',error);}
}

window.addEventListener('resize',()=>{resizeTrace();if(active)pathTracer?.reset?.();});
document.addEventListener('boxlab-render-mode-change',event=>{if(event.detail?.mode==='pathtrace')activate();else deactivate();});
installRendererBridge();ensureOverlay();requestAnimationFrame(animate);
