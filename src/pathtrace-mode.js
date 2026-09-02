import * as THREE from 'three';

const wrap=document.querySelector('#viewportWrap');
const status=document.querySelector('#selectionStatus');

let active=false;
let traceCanvas=null;
let traceRenderer=null;
let pathTracer=null;
let traceScene=null;
let traceCamera=null;
let packagePromise=null;
let lastMeshSignature='';
let lastCameraSignature='';
let lastHudUpdate=0;
let hud=null;
let failed=false;
let firstSampleDone=false;

function state(){return globalThis.__boxlabBridgeState;}
function currentMesh(){return state()?.mesh||null;}
function currentCamera(){return state()?.camera||null;}

function ensureOverlay(){
  if(traceCanvas)return;
  traceCanvas=document.createElement('canvas');
  traceCanvas.id='boxlabPathTraceCanvas';
  traceCanvas.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;display:none;';
  wrap?.append(traceCanvas);
  hud=document.createElement('div');
  hud.id='boxlabPathTraceHud';
  hud.style.cssText='position:absolute;right:14px;bottom:34px;z-index:3;pointer-events:none;max-width:min(76vw,520px);padding:8px 10px;border-radius:7px;background:rgba(12,14,18,.88);color:#eef3f8;font:600 11px/1.35 system-ui,-apple-system,sans-serif;letter-spacing:.01em;display:none;white-space:pre-line;backdrop-filter:blur(8px);';
  wrap?.append(hud);
}

function message(stage,text,detail=''){
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
  try{gl=probe.getContext('webgl2',{alpha:false,antialias:false,powerPreference:'high-performance'});}catch(error){return{ok:false,error};}
  if(!gl)return{ok:false,error:new Error('canvas.getContext("webgl2") returned null')};
  const debug=gl.getExtension('WEBGL_debug_renderer_info');
  const renderer=debug?gl.getParameter(debug.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER);
  const vendor=debug?gl.getParameter(debug.UNMASKED_VENDOR_WEBGL):gl.getParameter(gl.VENDOR);
  const maxTexture=gl.getParameter(gl.MAX_TEXTURE_SIZE);
  const maxDrawBuffers=gl.getParameter(gl.MAX_DRAW_BUFFERS);
  const colorFloat=!!gl.getExtension('EXT_color_buffer_float');
  const floatLinear=!!gl.getExtension('OES_texture_float_linear');
  const info={ok:true,renderer,vendor,maxTexture,maxDrawBuffers,colorFloat,floatLinear};
  try{gl.getExtension('WEBGL_lose_context')?.loseContext?.();}catch{}
  return info;
}

async function loadPackage(){
  if(packagePromise)return packagePromise;
  packagePromise=import('https://esm.sh/three-gpu-pathtracer@0.0.23?external=three&deps=three-mesh-bvh@0.7.8,xatlas-web@0.1.0');
  return packagePromise;
}

function meshSignature(mesh){
  if(!mesh)return'';
  let sum=0;
  for(let i=0;i<mesh.vertices.length;i++){
    const v=mesh.vertices[i];
    sum+=(i+1)*(v.x*1.13+v.y*1.71+v.z*2.03);
  }
  return `${mesh.vertices.length}:${mesh.faces.length}:${sum.toFixed(5)}:${mesh.faces.map(f=>f.join('.')).join('|')}`;
}

function matrixSignature(matrix){return matrix.elements.map(value=>Math.round(value*10000)/10000).join(',');}
function cameraSignature(camera){return camera?`${matrixSignature(camera.matrixWorld)}|${matrixSignature(camera.projectionMatrix)}`:'';}
function studioMaterial(){return new THREE.MeshStandardMaterial({color:0xc5cbd3,roughness:.48,metalness:.02,emissive:0x27313e,emissiveIntensity:.72,side:THREE.DoubleSide});}

function frameTraceCamera(box){
  const source=currentCamera(),center=box.getCenter(new THREE.Vector3()),size=box.getSize(new THREE.Vector3()),orbitTarget=state()?.controls?.target;
  const radius=Math.max(size.length()*.5,.25);
  const camera=new THREE.PerspectiveCamera(source?.fov||42,source?.aspect||1,Math.max(.001,radius*.001),Math.max(100,radius*30));
  const direction=source?.position?.clone?.().sub(orbitTarget||center);
  if(!direction||direction.lengthSq()<1e-8)direction?.set?.(1,.75,1);
  direction.normalize();
  const halfY=THREE.MathUtils.degToRad(camera.fov)*.5;
  const halfX=Math.atan(Math.tan(halfY)*Math.max(camera.aspect,.01));
  const liveDistance=source?.position?.distanceTo?.(orbitTarget||center)||0;
  const fitDistance=radius/Math.sin(Math.max(.1,Math.min(halfY,halfX)))*1.12;
  const distance=Math.max(liveDistance,fitDistance,.75);
  camera.position.copy(center).addScaledVector(direction,distance);
  camera.lookAt(center);camera.updateProjectionMatrix();camera.updateMatrixWorld(true);
  return camera;
}

function buildTraceScene(){
  const source=currentMesh();
  const scene=new THREE.Scene();
  scene.background=new THREE.Color(0x16191f);
  if(!source)return{scene,count:0,box:new THREE.Box3()};

  const geometry=source.triangulatedGeometry();
  if(!geometry.getAttribute('normal'))geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  const box=geometry.boundingBox?.clone()||new THREE.Box3();
  const body=new THREE.Mesh(geometry,studioMaterial());
  body.userData.boxlabPathTraceBody=true;
  scene.add(body);
  if(box.isEmpty())return{scene,count:1,box};

  const center=box.getCenter(new THREE.Vector3());
  const size=box.getSize(new THREE.Vector3());
  const extent=Math.max(size.x,size.y,size.z,.25);
  const floorSize=Math.max(extent*8,8);
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(floorSize,floorSize),new THREE.MeshStandardMaterial({color:0x3d4148,roughness:.82,metalness:0,emissive:0x090b10,emissiveIntensity:.35,side:THREE.DoubleSide}));
  floor.rotation.x=-Math.PI/2;
  floor.position.set(center.x,box.min.y-Math.max(extent*.012,.004),center.z);
  floor.userData.boxlabPathTraceBody=true;
  scene.add(floor);

  // Keep the soft area lights, but add scale-aware direct lights as a robust
  // illumination path on Safari. The original diagnostic values were valid
  // objects yet too dim to expose the model in the accumulated result.
  const keyPanel=new THREE.RectAreaLight(0xffffff,55,extent*3.2,extent*3.2);
  keyPanel.position.set(center.x+extent*2.2,center.y+extent*2.8,center.z+extent*2.4);keyPanel.lookAt(center);scene.add(keyPanel);
  const fillPanel=new THREE.RectAreaLight(0xb8d4ff,28,extent*2.4,extent*2.4);
  fillPanel.position.set(center.x-extent*2.0,center.y+extent*1.3,center.z+extent*1.2);fillPanel.lookAt(center);scene.add(fillPanel);

  const key=new THREE.DirectionalLight(0xfff4df,3.2);
  key.position.set(center.x+extent*2.4,center.y+extent*3.2,center.z+extent*2.6);
  key.target.position.copy(center);scene.add(key,key.target);
  const fill=new THREE.PointLight(0xaecbff,Math.max(90,extent*extent*90),0,2);
  fill.position.set(center.x-extent*2.0,center.y+extent*1.7,center.z+extent*1.7);scene.add(fill);
  const rim=new THREE.PointLight(0xffd4aa,Math.max(60,extent*extent*60),0,2);
  rim.position.set(center.x+extent*.3,center.y+extent*2.2,center.z-extent*2.2);scene.add(rim);

  // Emissive panels are geometry rather than Three light objects. They make
  // the studio visible even if this browser build does not carry its direct
  // light list across the path-tracer scene conversion.
  const panelMaterial=new THREE.MeshStandardMaterial({color:0xffffff,emissive:0xffffff,emissiveIntensity:8,roughness:1,metalness:0,side:THREE.DoubleSide});
  const ceiling=new THREE.Mesh(new THREE.PlaneGeometry(extent*4.2,extent*3.4),panelMaterial);
  ceiling.rotation.x=Math.PI/2;ceiling.position.set(center.x,center.y+extent*3.4,center.z+extent*.4);ceiling.userData.boxlabPathTraceBody=true;scene.add(ceiling);
  const softbox=new THREE.Mesh(new THREE.PlaneGeometry(extent*2.4,extent*2.4),panelMaterial.clone());
  softbox.position.set(center.x-extent*2.1,center.y+extent*1.8,center.z+extent*1.9);softbox.lookAt(center);softbox.userData.boxlabPathTraceBody=true;scene.add(softbox);
  scene.updateMatrixWorld(true);
  return{scene,count:1,box};
}

function disposeTraceScene(){
  if(!traceScene)return;
  traceScene.traverse(object=>{
    if(object?.geometry&&object.userData?.boxlabPathTraceBody)object.geometry.dispose?.();
    if(object?.material){if(Array.isArray(object.material))object.material.forEach(m=>m.dispose?.());else object.material.dispose?.();}
  });
  traceScene=null;
}

function resizeTrace(){if(traceRenderer&&wrap)traceRenderer.setSize(Math.max(1,wrap.clientWidth),Math.max(1,wrap.clientHeight),false);}

async function ensureTracer(){
  if(pathTracer||failed)return !!pathTracer;
  ensureOverlay();
  const s=state(),camera=currentCamera(),mesh=currentMesh();
  message('D1','checking BoxLab state',`camera=${!!camera} • mesh=${!!mesh}`);
  if(!camera||!mesh)return fail('D1','BoxLab state unavailable',new Error(`camera=${!!camera} mesh=${!!mesh}`));
  message('D1','BoxLab state OK','Proceeding to WebGL2 probe…');

  const probe=probeWebGL2();
  if(!probe.ok)return fail('D2','WebGL2 unavailable',probe.error);
  message('D3','WebGL2 OK',`GPU: ${probe.renderer||'unknown'}\nVendor: ${probe.vendor||'unknown'}\nEXT_color_buffer_float: ${probe.colorFloat?'YES':'NO'} • OES_texture_float_linear: ${probe.floatLinear?'YES':'NO'}\nMAX_TEXTURE_SIZE: ${probe.maxTexture} • MAX_DRAW_BUFFERS: ${probe.maxDrawBuffers}`);

  let module;
  try{module=await loadPackage();if(!module?.WebGLPathTracer)throw new Error('WebGLPathTracer export missing');message('D4','path tracer package loaded');}
  catch(error){return fail('D4','package import failed',error);}

  try{
    traceRenderer=new THREE.WebGLRenderer({canvas:traceCanvas,antialias:false,alpha:false,powerPreference:'high-performance'});
    traceRenderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.35));
    traceRenderer.outputColorSpace=THREE.SRGBColorSpace;
    traceRenderer.toneMapping=THREE.ACESFilmicToneMapping;
    traceRenderer.toneMappingExposure=1.2;
    resizeTrace();
    message('D5','Three.js WebGL renderer created');
  }catch(error){return fail('D5','Three.js renderer creation failed',error);}

  try{
    pathTracer=new module.WebGLPathTracer(traceRenderer);
    pathTracer.bounces=3;
    pathTracer.renderScale=.62;
    pathTracer.tiles.set(2,2);
    pathTracer.dynamicLowRes=true;
    pathTracer.lowResScale=.22;
    pathTracer.renderDelay=0;
    pathTracer.fadeDuration=120;
    pathTracer.minSamples=1;
    message('D6','path tracer constructed');
    return true;
  }catch(error){return fail('D6','path tracer constructor failed',error);}
}

async function rebuildTraceScene(force=false){
  if(!active||failed)return false;
  if(!await ensureTracer())return false;
  const mesh=currentMesh(),signature=meshSignature(mesh);
  if(!force&&signature===lastMeshSignature)return true;
  const built=buildTraceScene();
  if(!built.count)return fail('D7','no BoxLab mesh available',new Error('Editable mesh missing'));
  disposeTraceScene();
  traceScene=built.scene;
  lastMeshSignature=signature;
  const sourceCamera=currentCamera();
  traceCamera=frameTraceCamera(built.box);
  lastCameraSignature=cameraSignature(sourceCamera);
  firstSampleDone=false;
  try{
    pathTracer.setScene(traceScene,traceCamera);
    pathTracer.reset();
    message('D7','scene uploaded • framed active mesh','Waiting for first sample…');
    return true;
  }catch(error){return fail('D7','scene upload / shader setup failed',error);}
}

function setVisible(show){ensureOverlay();if(traceCanvas)traceCanvas.style.display=show?'block':'none';if(hud)hud.style.display=show?'block':'none';}
async function activate(){failed=false;active=true;setVisible(true);message('D0','preparing diagnostic run');await rebuildTraceScene(true);}
function deactivate(){active=false;setVisible(false);}

function animate(time){
  requestAnimationFrame(animate);
  const camera=currentCamera(),mesh=currentMesh();
  if(!active||!pathTracer||!camera||!mesh||!traceScene||failed)return;
  const sig=meshSignature(mesh);
  if(sig!==lastMeshSignature){rebuildTraceScene(true);return;}
  // OrbitControls continues to settle its source-camera matrix after a tap.
  // The trace camera is deliberately framed from the mesh, so do not restart
  // the expensive scene upload every animation frame while that damping runs.
  const cameraNow=cameraSignature(camera);
  if(cameraNow!==lastCameraSignature)lastCameraSignature=cameraNow;
  try{
    pathTracer.renderSample();
    if(!firstSampleDone){firstSampleDone=true;message('D8','FIRST SAMPLE OK','Path tracing is supported on this browser / GPU.');}
    if(hud&&time-lastHudUpdate>250){lastHudUpdate=time;hud.textContent=`D8 • Path Trace running\n${Math.floor(pathTracer.samples||0)} spp • 62% • 3 bounces`;}
  }catch(error){fail('D8','first/sample render failed',error);}
}

window.addEventListener('resize',()=>{resizeTrace();if(active)pathTracer?.reset?.();});
document.addEventListener('boxlab-render-mode-change',event=>{if(event.detail?.mode==='pathtrace')activate();else deactivate();});
ensureOverlay();
requestAnimationFrame(animate);
