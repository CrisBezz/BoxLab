import * as THREE from 'three';

const canvas = document.querySelector('#viewport');
const status = document.querySelector('#selectionStatus');
const objectsDrawer = document.querySelector('#objectsDrawer .drawer-content');
const outlinerList = document.querySelector('#outlinerList');
const valueInput = document.querySelector('#transformValue');
const axisSnapToggle = document.querySelector('#axisSnapToggle');
const DRAG_THRESHOLD = 8;

let controls = null;
let pivotControls = null;
let groupControls = null;
let pivotMode = 'median';
let marker = null;
let gesture = null;
let multiGesture = null;
let moveWatch = null;
let raf = 0;
let selectionApi = null;
let groupObserver = null;

function manager(){ return globalThis.__boxlabObjectManager; }
function objectSelection(){ return globalThis.__boxlabObjectSelection; }
function actualSelection(){ return selectionApi || globalThis.__boxlabObjectSelection; }
function state(){ return globalThis.__boxlabBridgeState; }
function mode(){ return document.querySelector('#selectionModes button.active')?.dataset?.mode || 'face'; }
function tool(){ return document.querySelector('#toolModes button.active')?.dataset?.tool || null; }
function activeObject(){
  const m = manager();
  return m?.objects?.find(object => object.id === m.activeId) || null;
}
function baseSelectionIds(){
  return new Set(actualSelection()?.ids || []);
}
function groupMembers(groupId){
  if(groupId == null) return [];
  return (manager()?.objects || []).filter(object => object.groupId === groupId);
}
function expandedSelectionIds(){
  const ids = baseSelectionIds();
  const objects = manager()?.objects || [];
  for(const object of objects){
    if(!ids.has(object.id) || object.groupId == null) continue;
    for(const member of objects) if(member.groupId === object.groupId) ids.add(member.id);
  }
  return ids;
}
function groupedExpansionActive(){
  const base = baseSelectionIds();
  const expanded = expandedSelectionIds();
  return expanded.size > base.size && expanded.size > 1;
}
function isSingleObjectTransform(){
  return mode() === 'object' && expandedSelectionIds().size <= 1;
}
function isMultiPivotTransform(){
  if(mode() !== 'object' || expandedSelectionIds().size <= 1) return false;
  const t = tool();
  return t === 'scale' || t === 'rotate' || (t === 'move' && groupedExpansionActive());
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
function setPivotMode(next){
  if(!['median','active','individual','world'].includes(next)) return;
  pivotMode = next;
  pivotControls?.querySelectorAll('button[data-pivot]').forEach(button => button.classList.toggle('active', button.dataset.pivot === next));
  if(status) status.textContent = `Multi Pivot • ${next === 'individual' ? 'Individual' : next[0].toUpperCase() + next.slice(1)}`;
  const drawer = document.querySelector('#objectsDrawer');
  if(drawer) drawer.open = true;
}
function allocateGroupId(){
  let max = 0;
  for(const object of manager()?.objects || []){
    if(Number.isInteger(object.groupId)) max = Math.max(max, object.groupId);
  }
  return max + 1;
}
function cleanupGroups(){
  const counts = new Map();
  for(const object of manager()?.objects || []){
    if(object.groupId == null) continue;
    counts.set(object.groupId, (counts.get(object.groupId) || 0) + 1);
  }
  for(const object of manager()?.objects || []){
    if(object.groupId != null && (counts.get(object.groupId) || 0) < 2) delete object.groupId;
  }
}
function groupSelected(){
  const ids = baseSelectionIds();
  if(ids.size < 2){
    if(status) status.textContent = 'Select at least two objects to group';
    return;
  }
  const id = allocateGroupId();
  for(const object of manager()?.objects || []) if(ids.has(object.id)) object.groupId = id;
  cleanupGroups();
  decorateGroups();
  updateGroupControls();
  if(status) status.textContent = `${ids.size} objects grouped • G${id}`;
  const drawer = document.querySelector('#objectsDrawer'); if(drawer) drawer.open = true;
}
function ungroupSelected(){
  const ids = baseSelectionIds();
  const groups = new Set();
  for(const object of manager()?.objects || []) if(ids.has(object.id) && object.groupId != null) groups.add(object.groupId);
  if(!groups.size){
    if(status) status.textContent = 'Selected objects are not grouped';
    return;
  }
  for(const object of manager()?.objects || []) if(groups.has(object.groupId)) delete object.groupId;
  decorateGroups();
  updateGroupControls();
  if(status) status.textContent = `${groups.size} group${groups.size === 1 ? '' : 's'} ungrouped`;
  const drawer = document.querySelector('#objectsDrawer'); if(drawer) drawer.open = true;
}
function decorateGroups(){
  cleanupGroups();
  const objects = manager()?.objects || [];
  outlinerList?.querySelectorAll('.outliner-row').forEach(row => {
    const id = Number(row.dataset.objectId);
    const object = objects.find(item => item.id === id);
    let tag = row.querySelector('.boxlab-group-tag');
    if(object?.groupId == null){
      tag?.remove();
      return;
    }
    if(!tag){
      tag = document.createElement('span');
      tag.className = 'boxlab-group-tag';
      row.append(tag);
    }
    tag.textContent = `G${object.groupId}`;
    tag.title = `Group ${object.groupId}`;
  });
}
function updateGroupControls(){
  if(!groupControls) return;
  const ids = baseSelectionIds();
  const selected = (manager()?.objects || []).filter(object => ids.has(object.id));
  const groupButton = groupControls.querySelector('[data-group-action="group"]');
  const ungroupButton = groupControls.querySelector('[data-group-action="ungroup"]');
  if(groupButton) groupButton.disabled = ids.size < 2;
  if(ungroupButton) ungroupButton.disabled = !selected.some(object => object.groupId != null);
}
function buildControls(){
  if(!objectsDrawer || controls) return;
  controls = document.createElement('div');
  controls.id = 'objectOriginTools';
  controls.innerHTML = '<span>Origin</span><button type="button" data-origin="center">Center</button><button type="button" data-origin="bottom">Bottom</button><button type="button" data-origin="world">World</button>';
  pivotControls = document.createElement('div');
  pivotControls.id = 'objectPivotTools';
  pivotControls.innerHTML = '<span>Pivot</span><button type="button" data-pivot="median">Median</button><button type="button" data-pivot="active">Active</button><button type="button" data-pivot="individual">Individual</button><button type="button" data-pivot="world">World</button>';
  groupControls = document.createElement('div');
  groupControls.id = 'objectGroupTools';
  groupControls.innerHTML = '<span>Group</span><button type="button" data-group-action="group">Group</button><button type="button" data-group-action="ungroup">Ungroup</button>';
  const style = document.createElement('style');
  style.textContent = `
#objectOriginTools{display:grid;grid-template-columns:auto repeat(3,1fr);gap:6px;align-items:center;margin:8px 0 2px}
#objectOriginTools>span,#objectPivotTools>span,#objectGroupTools>span{font-size:11px;opacity:.72;padding-right:2px}
#objectOriginTools button{min-width:0;padding-left:7px;padding-right:7px}
#objectPivotTools{display:grid;grid-template-columns:auto repeat(4,minmax(0,1fr));gap:6px;align-items:center;margin:6px 0 2px}
#objectPivotTools button{min-width:0;padding-left:5px;padding-right:5px;font-size:11px}
#objectPivotTools button.active{outline:1px solid currentColor;background:rgba(255,255,255,.09)}
#objectGroupTools{display:grid;grid-template-columns:auto 1fr 1fr;gap:6px;align-items:center;margin:6px 0 4px}
#objectGroupTools button{min-width:0;padding-left:7px;padding-right:7px}
.boxlab-group-tag{font-size:10px;line-height:1;padding:3px 5px;border:1px solid currentColor;border-radius:8px;opacity:.72;margin-left:5px;pointer-events:none}
#boxlabOriginMarker{position:fixed;pointer-events:none;width:15px;height:15px;border:2px solid #ffd84d;border-radius:50%;box-shadow:0 0 0 1px #1118;transform:translate(-50%,-50%);z-index:9000}
#boxlabOriginMarker:before,#boxlabOriginMarker:after{content:'';position:absolute;background:#ffd84d;left:50%;top:50%;transform:translate(-50%,-50%)}
#boxlabOriginMarker:before{width:21px;height:1px}#boxlabOriginMarker:after{width:1px;height:21px}
`;
  document.head.append(style);
  objectsDrawer.insertBefore(controls, outlinerList || objectsDrawer.firstChild);
  objectsDrawer.insertBefore(pivotControls, outlinerList || objectsDrawer.firstChild);
  objectsDrawer.insertBefore(groupControls, outlinerList || objectsDrawer.firstChild);
  controls.addEventListener('click', event => {
    const button = event.target.closest('button[data-origin]');
    if(!button) return;
    event.preventDefault();
    event.stopPropagation();
    presetOrigin(button.dataset.origin);
    document.querySelector('#objectsDrawer').open = true;
  });
  pivotControls.addEventListener('click', event => {
    const button = event.target.closest('button[data-pivot]');
    if(!button) return;
    event.preventDefault();
    event.stopPropagation();
    setPivotMode(button.dataset.pivot);
  });
  groupControls.addEventListener('click', event => {
    const button = event.target.closest('button[data-group-action]');
    if(!button) return;
    event.preventDefault();
    event.stopPropagation();
    if(button.dataset.groupAction === 'group') groupSelected(); else ungroupSelected();
  });
  objectsDrawer.addEventListener('click', () => queueMicrotask(updateGroupControls), true);
  setPivotMode(pivotMode);
  updateGroupControls();
  decorateGroups();
  if(!groupObserver && outlinerList){
    groupObserver = new MutationObserver(() => queueMicrotask(decorateGroups));
    groupObserver.observe(outlinerList,{childList:true});
  }
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
  return globalThis.__boxlabTransformArming?.constraint?.() || document.querySelector('#transformPrecision [data-constraint].active')?.dataset?.constraint || 'free';
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

function buildMultiTargets(){
  const m=manager(), live=state()?.mesh;
  if(!m || !live) return {targets:[],locked:0};
  m.saveActive?.();
  const ids=expandedSelectionIds();
  let locked=0; const targets=[];
  for(const object of m.objects){
    if(!ids.has(object.id)) continue;
    if(object.locked){ locked++; continue; }
    const mesh=object.id===m.activeId?live:object.mesh;
    if(!mesh?.vertices?.length) continue;
    const origin=ensureOrigin(object,mesh);
    targets.push({object,mesh,origin,originalOrigin:origin.clone(),original:mesh.vertices.map(v=>v.clone())});
  }
  return {targets,locked};
}
function averageOrigins(targets){
  const c=new THREE.Vector3();
  for(const target of targets)c.add(target.originalOrigin);
  return targets.length?c.multiplyScalar(1/targets.length):c;
}
function multiPivotPoint(targets){
  if(pivotMode==='world') return new THREE.Vector3();
  if(pivotMode==='active'){
    const active=targets.find(target=>target.object.id===manager()?.activeId);
    if(active)return active.originalOrigin.clone();
  }
  return averageOrigins(targets);
}
function restoreMulti(targets){
  for(const target of targets){
    target.original.forEach((v,i)=>target.mesh.vertices[i]?.copy(v));
    setOrigin(target.originalOrigin,target.object);
  }
}
function scaleOrigin(point,pivot,factor,axis){
  const p=point.clone().sub(pivot);
  if(axis)p[axis]*=factor;else p.multiplyScalar(factor);
  return p.add(pivot);
}
function startMultiPivotGesture(event){
  if(!isMultiPivotTransform() || event.target!==canvas || event.pointerType==='touch' || !event.isPrimary)return;
  const camera=state()?.camera; if(!camera)return;
  const {targets,locked}=buildMultiTargets();
  if(targets.length<2){ if(locked&&status)status.textContent='Multi Transform needs at least two unlocked selected objects'; return; }
  const center=multiPivotPoint(targets), interactionCenter=pivotMode==='individual'?averageOrigins(targets):center;
  const normal=camera.getWorldDirection(new THREE.Vector3()).normalize(), plane=new THREE.Plane().setFromNormalAndCoplanarPoint(normal,interactionCenter), start=planePoint(event,plane,camera);
  if(!start)return;
  const c=constraint(), axis=['x','y','z'].includes(c)?c:null, centerScreen=screenPoint(interactionCenter,camera);
  multiGesture={id:event.pointerId,t:tool(),camera,targets,locked,center,interactionCenter,centerScreen,start,startX:event.clientX,startY:event.clientY,startVector:new THREE.Vector2(event.clientX,event.clientY).sub(centerScreen),plane,axis,auto:c==='auto',axes:screenAxes(interactionCenter,camera),changed:false};
  event.preventDefault(); event.stopImmediatePropagation(); canvas.setPointerCapture?.(event.pointerId);
}
function multiAxisMoveAmount(g,event){
  const d=new THREE.Vector2(event.clientX-g.startX,event.clientY-g.startY);
  const rail=g.axes[g.axis], l=rail?.lengthSq?.() || 0;
  return l>1 ? d.dot(rail)/l : 0;
}
function moveMultiPivotGesture(event){
  const g=multiGesture; if(!g || g.id!==event.pointerId)return;
  event.preventDefault(); event.stopImmediatePropagation();
  const dx=event.clientX-g.startX,dy=event.clientY-g.startY,d=new THREE.Vector2(dx,dy);
  if(!g.changed&&d.length()<DRAG_THRESHOLD)return;
  if(!g.changed){
    g.changed=true;
    const active=g.targets.find(target=>target.object.id===manager()?.activeId);
    if(active)globalThis.__boxlabHistory?.push?.(active.mesh.clone());
    if(g.auto||axisSnapToggle?.checked)g.axis=chooseAxis(d,g.axes);
  }
  restoreMulti(g.targets);
  if(g.t==='move'){
    let delta;
    if(g.axis) delta=axisVector(g.axis).multiplyScalar(multiAxisMoveAmount(g,event));
    else {
      const now=planePoint(event,g.plane,g.camera); if(!now)return;
      delta=now.sub(g.start);
    }
    for(const target of g.targets){
      for(const v of target.mesh.vertices)v.add(delta);
      setOrigin(target.originalOrigin.clone().add(delta),target.object);
    }
    if(status)status.textContent=`Move • ${g.targets.length} grouped objects • ${g.axis?g.axis.toUpperCase():'Free'}`;
  }else if(g.t==='scale'){
    const factor=THREE.MathUtils.clamp(Math.exp((dx-dy)*.006),.05,20);
    for(const target of g.targets){
      const pivot=pivotMode==='individual'?target.originalOrigin:g.center;
      for(const v of target.mesh.vertices){ const p=v.sub(pivot); if(g.axis)p[g.axis]*=factor;else p.multiplyScalar(factor); v.add(pivot); }
      setOrigin(pivotMode==='individual'?target.originalOrigin:scaleOrigin(target.originalOrigin,g.center,factor,g.axis),target.object);
    }
    if(status)status.textContent=`Scale • ${g.targets.length} objects • ${pivotMode==='individual'?'Individual':pivotMode[0].toUpperCase()+pivotMode.slice(1)} • ${g.axis?g.axis.toUpperCase():'Uniform'} • ${factor.toFixed(2)}×`;
  }else{
    const p=new THREE.Vector2(event.clientX,event.clientY).sub(g.centerScreen); if(p.lengthSq()<4||g.startVector.lengthSq()<4)return;
    let angle=Math.atan2(g.startVector.x*p.y-g.startVector.y*p.x,g.startVector.dot(p));
    const snapOn=document.querySelector('#transformSnapBtn')?.classList.contains('active')??true;
    if(snapOn)angle=THREE.MathUtils.degToRad(Math.round(THREE.MathUtils.radToDeg(angle)/15)*15);
    const av=g.axis?axisVector(g.axis):g.camera.getWorldDirection(new THREE.Vector3()).normalize(), q=new THREE.Quaternion().setFromAxisAngle(av,angle);
    for(const target of g.targets){
      const pivot=pivotMode==='individual'?target.originalOrigin:g.center;
      for(const v of target.mesh.vertices)v.sub(pivot).applyQuaternion(q).add(pivot);
      const nextOrigin=pivotMode==='individual'?target.originalOrigin:target.originalOrigin.clone().sub(g.center).applyQuaternion(q).add(g.center);
      setOrigin(nextOrigin,target.object);
    }
    if(status)status.textContent=`Rotate • ${g.targets.length} objects • ${pivotMode==='individual'?'Individual':pivotMode[0].toUpperCase()+pivotMode.slice(1)} • ${g.axis?g.axis.toUpperCase():'View'} • ${Math.round(THREE.MathUtils.radToDeg(angle))}°`;
  }
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));
}
function endMultiPivotGesture(event){
  const g=multiGesture; if(!g || g.id!==event.pointerId)return;
  event.preventDefault(); event.stopImmediatePropagation();
  if(event.type==='pointercancel'&&g.changed){ restoreMulti(g.targets); document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true})); }
  manager()?.saveActive?.(); multiGesture=null;
}
function numericMultiPivot(event){
  if(event.key!=='Enter'||event.target!==valueInput||!isMultiPivotTransform())return;
  const n=Number(valueInput.value); if(!Number.isFinite(n)||!valueInput.value.trim())return;
  const {targets}=buildMultiTargets(); if(targets.length<2)return;
  const center=multiPivotPoint(targets), c=constraint(), axis=['x','y','z'].includes(c)?c:null, t=tool();
  event.preventDefault(); event.stopImmediatePropagation();
  const active=targets.find(target=>target.object.id===manager()?.activeId); if(active)globalThis.__boxlabHistory?.push?.(active.mesh.clone());
  if(t==='move'){
    const delta=axis?axisVector(axis).multiplyScalar(n):new THREE.Vector3(n,0,0);
    for(const target of targets){
      for(const v of target.mesh.vertices)v.add(delta);
      setOrigin(target.originalOrigin.clone().add(delta),target.object);
    }
  }else if(t==='scale'){
    for(const target of targets){
      const pivot=pivotMode==='individual'?target.originalOrigin:center;
      for(const v of target.mesh.vertices){ const p=v.sub(pivot); if(axis)p[axis]*=n;else p.multiplyScalar(n); v.add(pivot); }
      setOrigin(pivotMode==='individual'?target.originalOrigin:scaleOrigin(target.originalOrigin,center,n,axis),target.object);
    }
  }else{
    let degrees=n; const snapOn=document.querySelector('#transformSnapBtn')?.classList.contains('active')??true; if(snapOn)degrees=Math.round(degrees/15)*15;
    const av=axis?axisVector(axis):new THREE.Vector3(0,1,0), q=new THREE.Quaternion().setFromAxisAngle(av,THREE.MathUtils.degToRad(degrees));
    for(const target of targets){
      const pivot=pivotMode==='individual'?target.originalOrigin:center;
      for(const v of target.mesh.vertices)v.sub(pivot).applyQuaternion(q).add(pivot);
      const nextOrigin=pivotMode==='individual'?target.originalOrigin:target.originalOrigin.clone().sub(center).applyQuaternion(q).add(center);
      setOrigin(nextOrigin,target.object);
    }
  }
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true})); manager()?.saveActive?.(); valueInput.value='';
}
function wrapLegacyMultiSelection(){
  if(selectionApi || !globalThis.__boxlabObjectSelection)return;
  selectionApi=globalThis.__boxlabObjectSelection;
  const base=selectionApi;
  globalThis.__boxlabObjectSelection={
    get ids(){ return expandedSelectionIds(); },
    get multi(){
      const t=tool();
      if(t==='scale'||t==='rotate') return false;
      if(t==='move'&&groupedExpansionActive()) return false;
      return base.multi;
    },
    select(ids=[]){ return base.select?.(ids); },
    clear(){ return base.clear?.(); }
  };
}

function initialize(){
  if(!manager() || !objectsDrawer) return false;
  wrapLegacyMultiSelection();
  buildControls();
  ensureOrigin();
  if(!raf) markerLoop();
  globalThis.__boxlabObjectOrigins={
    originFor(object,mesh){ return ensureOrigin(object,mesh); },
    set(object,v){ setOrigin(v,object); },
    preset:presetOrigin,
    get pivotMode(){ return pivotMode; },
    setPivot:setPivotMode,
    expandedSelectionIds,
    groupMembers
  };
  const version=document.querySelector('#appVersion'); if(version)version.textContent='v0.36.4.0'; document.title='BoxLab v0.36.4.0';
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
window.addEventListener('pointerdown',startMultiPivotGesture,true);
window.addEventListener('pointermove',moveMultiPivotGesture,true);
window.addEventListener('pointerup',endMultiPivotGesture,true);
window.addEventListener('pointercancel',endMultiPivotGesture,true);
window.addEventListener('keydown',numericMultiPivot,true);

if(!initialize()) window.addEventListener('boxlab-object-manager-ready',initialize,{once:true});
