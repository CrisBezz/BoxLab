import * as THREE from 'three';

const canvas = document.querySelector('#viewport');
const status = document.querySelector('#selectionStatus');
const objectsDrawer = document.querySelector('#objectsDrawer .drawer-content');
const outlinerList = document.querySelector('#outlinerList');
const valueInput = document.querySelector('#transformValue');
const axisSnapToggle = document.querySelector('#axisSnapToggle');
const DRAG_THRESHOLD = 8;

let controls = null;
let marker = null;
let gesture = null;
let moveWatch = null;
let raf = 0;

function manager(){ return globalThis.__boxlabObjectManager; }
function objectSelection(){ return globalThis.__boxlabObjectSelection; }
function state(){ return globalThis.__boxlabBridgeState; }
function mode(){ return document.querySelector('#selectionModes button.active')?.dataset?.mode || 'face'; }
function tool(){ return document.querySelector('#toolModes button.active')?.dataset?.tool || null; }
function activeObject(){
  const m = manager();
  return m?.objects?.find(object => object.id === m.activeId) || null;
}
function isSingleObjectTransform(){
  const s = objectSelection();
  return mode() === 'object' && !(s?.multi && (s?.ids?.size || 0) > 1);
}
function meshBounds(mesh){
  const box = new THREE.Box3();
  for(const v of mesh?.vertices || []) box.expandByPoint(v);
  return box;
}
function meshCenter(mesh){
  const box = meshBounds(mesh);
  return box.isEmpty() ? new THREE.Vector3() : box.getCenter(new THREE.Vector3());
}
function ensureOrigin(object = activeObject(), mesh = state()?.mesh){
  if(!object) return new THREE.Vector3();
  if(!object.origin || !Number.isFinite(object.origin.x) || !Number.isFinite(object.origin.y) || !Number.isFinite(object.origin.z)){
    const c = meshCenter(object.id === manager()?.activeId ? mesh : object.mesh);
    object.origin = { x:c.x, y:c.y, z:c.z };
  }
  return new THREE.Vector3(object.origin.x, object.origin.y, object.origin.z);
}
function setOrigin(v, object = activeObject()){
  if(!object) return;
  object.origin = { x:v.x, y:v.y, z:v.z };
  updateMarker();
}
function presetOrigin(kind){
  const object = activeObject(), mesh = state()?.mesh;
  if(!object || !mesh) return;
  const box = meshBounds(mesh), c = box.isEmpty() ? new THREE.Vector3() : box.getCenter(new THREE.Vector3());
  if(kind === 'bottom' && !box.isEmpty()) c.y = box.min.y;
  else if(kind === 'world') c.set(0,0,0);
  setOrigin(c, object);
  if(status) status.textContent = `Origin • ${kind === 'bottom' ? 'Bottom' : kind === 'world' ? 'World' : 'Center'}`;
}
function buildControls(){
  if(!objectsDrawer || controls) return;
  controls = document.createElement('div');
  controls.id = 'objectOriginTools';
  controls.innerHTML = '<span>Origin</span><button type="button" data-origin="center">Center</button><button type="button" data-origin="bottom">Bottom</button><button type="button" data-origin="world">World</button>';
  const style = document.createElement('style');
  style.textContent = `
#objectOriginTools{display:grid;grid-template-columns:auto repeat(3,1fr);gap:6px;align-items:center;margin:8px 0 2px}
#objectOriginTools>span{font-size:11px;opacity:.72;padding-right:2px}
#objectOriginTools button{min-width:0;padding-left:7px;padding-right:7px}
#boxlabOriginMarker{position:fixed;pointer-events:none;width:15px;height:15px;border:2px solid #ffd84d;border-radius:50%;box-shadow:0 0 0 1px #1118;transform:translate(-50%,-50%);z-index:9000}
#boxlabOriginMarker:before,#boxlabOriginMarker:after{content:'';position:absolute;background:#ffd84d;left:50%;top:50%;transform:translate(-50%,-50%)}
#boxlabOriginMarker:before{width:21px;height:1px}#boxlabOriginMarker:after{width:1px;height:21px}
`;
  document.head.append(style);
  objectsDrawer.insertBefore(controls, outlinerList || objectsDrawer.firstChild);
  controls.addEventListener('click', event => {
    const button = event.target.closest('button[data-origin]');
    if(!button) return;
    event.preventDefault();
    event.stopPropagation();
    presetOrigin(button.dataset.origin);
    document.querySelector('#objectsDrawer').open = true;
  });
}
function ensureMarker(){
  if(marker) return marker;
  marker = document.createElement('div');
  marker.id = 'boxlabOriginMarker';
  document.body.append(marker);
  return marker;
}
function updateMarker(){
  const mark = ensureMarker(), s = state(), object = activeObject();
  if(mode() !== 'object' || !s?.camera || !object){ mark.hidden = true; return; }
  const p = ensureOrigin(object, s.mesh).project(s.camera), r = canvas?.getBoundingClientRect();
  if(!r || p.z < -1 || p.z > 1){ mark.hidden = true; return; }
  mark.hidden = false;
  mark.style.left = `${r.left + (p.x*.5+.5)*r.width}px`;
  mark.style.top = `${r.top + (-p.y*.5+.5)*r.height}px`;
}
function markerLoop(){ updateMarker(); raf = requestAnimationFrame(markerLoop); }
function axisVector(axis){ return new THREE.Vector3(axis==='x'?1:0, axis==='y'?1:0, axis==='z'?1:0); }
function constraint(){
  const c = globalThis.__boxlabTransformArming?.constraint?.() || document.querySelector('#transformPrecision [data-constraint].active')?.dataset?.constraint || 'free';
  return c;
}
function screenPoint(v,camera){
  const p=v.clone().project(camera),r=canvas.getBoundingClientRect();
  return new THREE.Vector2(r.left+(p.x*.5+.5)*r.width,r.top+(-p.y*.5+.5)*r.height);
}
function screenAxes(c,camera){
  const o=screenPoint(c,camera), out={};
  for(const axis of ['x','y','z']) out[axis]=screenPoint(c.clone().add(axisVector(axis)),camera).sub(o);
  return out;
}
function chooseAxis(delta,axes){
  if(delta.lengthSq()<1) return null;
  const d=delta.clone().normalize(); let best=null;
  for(const [axis,v] of Object.entries(axes)){
    if(v.lengthSq()<4) continue;
    const score=Math.abs(d.dot(v.clone().normalize()));
    if(!best || score>best.score) best={axis,score};
  }
  return best?.axis || null;
}
function planePoint(event,plane,camera){
  const r=canvas.getBoundingClientRect(), p=new THREE.Vector2((event.clientX-r.left)/r.width*2-1,-((event.clientY-r.top)/r.height*2-1)), ray=new THREE.Raycaster(), out=new THREE.Vector3();
  ray.setFromCamera(p,camera);
  return ray.ray.intersectPlane(plane,out) ? out : null;
}
function restore(g){ g.original.forEach((v,i)=>g.mesh.vertices[i]?.copy(v)); }
function axisAmount(g,d){
  const rail=g.axes[g.axis];
  if(rail && rail.lengthSq()>=4) return d.dot(rail)/rail.lengthSq();
  return (Math.abs(d.x)>=Math.abs(d.y)?d.x:-d.y)*.01;
}
function beginMoveWatch(event){
  if(!isSingleObjectTransform() || tool()!=='move' || event.target!==canvas || event.pointerType==='touch' || !event.isPrimary) return;
  const object=activeObject(), mesh=state()?.mesh;
  if(!object || !mesh) return;
  moveWatch={id:event.pointerId, objectId:object.id, center:meshCenter(mesh), origin:ensureOrigin(object,mesh)};
}
function finishMoveWatch(event){
  const watch=moveWatch;
  if(!watch || watch.id!==event.pointerId) return;
  moveWatch=null;
  queueMicrotask(()=>{
    const m=manager(), object=m?.objects?.find(o=>o.id===watch.objectId), mesh=state()?.mesh;
    if(!object || object.id!==m?.activeId || !mesh) return;
    const delta=meshCenter(mesh).sub(watch.center);
    setOrigin(watch.origin.clone().add(delta),object);
  });
}
function startPivotGesture(event){
  if(!isSingleObjectTransform() || event.target!==canvas || event.pointerType==='touch' || !event.isPrimary) return;
  const t=tool();
  if(t!=='scale' && t!=='rotate') return;
  const s=state(), object=activeObject(), mesh=s?.mesh, camera=s?.camera;
  if(!object || object.locked || !mesh?.vertices?.length || !camera) return;
  const center=ensureOrigin(object,mesh), normal=camera.getWorldDirection(new THREE.Vector3()).normalize(), plane=new THREE.Plane().setFromNormalAndCoplanarPoint(normal,center), start=planePoint(event,plane,camera);
  if(!start) return;
  const c=constraint(), explicit=['x','y','z'].includes(c)?c:null, centerScreen=screenPoint(center,camera);
  gesture={id:event.pointerId,t,mesh,camera,center,centerScreen,startX:event.clientX,startY:event.clientY,startVector:new THREE.Vector2(event.clientX,event.clientY).sub(centerScreen),axis:explicit,auto:c==='auto',axes:screenAxes(center,camera),original:mesh.vertices.map(v=>v.clone()),before:mesh.clone(),changed:false};
  event.preventDefault(); event.stopImmediatePropagation(); canvas.setPointerCapture?.(event.pointerId);
}
function movePivotGesture(event){
  const g=gesture; if(!g || g.id!==event.pointerId) return;
  event.preventDefault(); event.stopImmediatePropagation();
  const dx=event.clientX-g.startX,dy=event.clientY-g.startY,d=new THREE.Vector2(dx,dy);
  if(!g.changed && d.length()<DRAG_THRESHOLD) return;
  if(!g.changed){
    g.changed=true; globalThis.__boxlabHistory?.push?.(g.before);
    if(g.auto || axisSnapToggle?.checked) g.axis=chooseAxis(d,g.axes);
  }
  restore(g);
  if(g.t==='scale'){
    const factor=THREE.MathUtils.clamp(Math.exp((dx-dy)*.006),.05,20);
    for(const v of g.mesh.vertices){ const p=v.sub(g.center); if(g.axis)p[g.axis]*=factor; else p.multiplyScalar(factor); v.add(g.center); }
    if(status) status.textContent=`Scale • Origin • ${g.axis?g.axis.toUpperCase():'Uniform'} • ${factor.toFixed(2)}×`;
  } else {
    const cv=new THREE.Vector2(event.clientX,event.clientY).sub(g.centerScreen); let angle;
    if(g.startVector.length()>18 && cv.length()>18){ const a=g.startVector.clone().normalize(),b=cv.clone().normalize(); angle=Math.atan2(a.x*b.y-a.y*b.x,THREE.MathUtils.clamp(a.dot(b),-1,1)); }
    else angle=dx*.012;
    const snapOn=document.querySelector('#transformSnapBtn')?.classList.contains('active') ?? true;
    if(snapOn) angle=THREE.MathUtils.degToRad(Math.round(THREE.MathUtils.radToDeg(angle)/15)*15);
    const av=g.axis?axisVector(g.axis):g.camera.getWorldDirection(new THREE.Vector3()).normalize(), q=new THREE.Quaternion().setFromAxisAngle(av,angle);
    for(const v of g.mesh.vertices) v.sub(g.center).applyQuaternion(q).add(g.center);
    if(status) status.textContent=`Rotate • Origin • ${g.axis?g.axis.toUpperCase():'View'} • ${Math.round(THREE.MathUtils.radToDeg(angle))}°`;
  }
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));
}
function endPivotGesture(event){
  const g=gesture; if(!g || g.id!==event.pointerId) return;
  event.preventDefault(); event.stopImmediatePropagation();
  if(event.type==='pointercancel' && g.changed){ restore(g); document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true})); }
  manager()?.saveActive?.(); gesture=null;
  if(g.changed && status) status.textContent=`${g.t==='scale'?'Scale':'Rotate'} committed • object origin`;
}
function numericTransform(event){
  if(event.key!=='Enter' || event.target!==valueInput || !isSingleObjectTransform()) return;
  const t=tool(); if(!['move','scale','rotate'].includes(t)) return;
  const n=Number(valueInput.value); if(!Number.isFinite(n) || !valueInput.value.trim()) return;
  const s=state(), object=activeObject(), mesh=s?.mesh; if(!object || object.locked || !mesh?.vertices?.length) return;
  event.preventDefault(); event.stopImmediatePropagation();
  const origin=ensureOrigin(object,mesh), c=constraint(), axis=['x','y','z'].includes(c)?c:null;
  globalThis.__boxlabHistory?.push?.(mesh.clone());
  if(t==='move'){
    const delta=axis?axisVector(axis).multiplyScalar(n):new THREE.Vector3(n,0,0);
    mesh.vertices.forEach(v=>v.add(delta)); setOrigin(origin.add(delta),object);
  } else if(t==='scale'){
    mesh.vertices.forEach(v=>{ const p=v.sub(origin); if(axis)p[axis]*=n; else p.multiplyScalar(n); v.add(origin); });
  } else {
    let degrees=n; const snapOn=document.querySelector('#transformSnapBtn')?.classList.contains('active') ?? true; if(snapOn)degrees=Math.round(degrees/15)*15;
    const av=axis?axisVector(axis):new THREE.Vector3(0,1,0), q=new THREE.Quaternion().setFromAxisAngle(av,THREE.MathUtils.degToRad(degrees));
    mesh.vertices.forEach(v=>v.sub(origin).applyQuaternion(q).add(origin));
  }
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true})); manager()?.saveActive?.(); valueInput.value='';
  if(status) status.textContent=`${t[0].toUpperCase()+t.slice(1)} • object origin • ${axis?axis.toUpperCase():'Free'} • ${n}${t==='rotate'?'°':''}`;
}

function initialize(){
  if(!manager() || !objectsDrawer) return false;
  buildControls();
  ensureOrigin();
  if(!raf) markerLoop();
  globalThis.__boxlabObjectOrigins={
    originFor(object,mesh){ return ensureOrigin(object,mesh); },
    set(object,v){ setOrigin(v,object); },
    preset:presetOrigin
  };
  const version=document.querySelector('#appVersion'); if(version)version.textContent='v0.36.3.0'; document.title='BoxLab v0.36.3.0';
  return true;
}

window.addEventListener('pointerdown',beginMoveWatch,true);
window.addEventListener('pointerup',finishMoveWatch,true);
window.addEventListener('pointercancel',finishMoveWatch,true);
window.addEventListener('pointerdown',startPivotGesture,true);
window.addEventListener('pointermove',movePivotGesture,true);
window.addEventListener('pointerup',endPivotGesture,true);
window.addEventListener('pointercancel',endPivotGesture,true);
window.addEventListener('keydown',numericTransform,true);

if(!initialize()) window.addEventListener('boxlab-object-manager-ready',initialize,{once:true});
