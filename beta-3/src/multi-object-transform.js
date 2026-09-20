import * as THREE from 'three';

const canvas = document.querySelector('#viewport');
const status = document.querySelector('#selectionStatus');
const valueInput = document.querySelector('#transformValue');
const DRAG_THRESHOLD = 8;
let gesture = null;

function state() { return globalThis.__boxlabBridgeState; }
function manager() { return globalThis.__boxlabObjectManager; }
function selection() { return globalThis.__boxlabObjectSelection; }
function originApi() { return globalThis.__boxlabObjectOrigins; }
function mode() { return document.querySelector('#selectionModes button.active')?.dataset?.mode || 'face'; }
function tool() { return document.querySelector('#toolModes button.active')?.dataset?.tool || null; }
function constraint() {
  return globalThis.__boxlabTransformArming?.constraint?.()
    || document.querySelector('#transformPrecision [data-constraint].active')?.dataset?.constraint
    || 'free';
}
function axisVector(axis) { return new THREE.Vector3(axis === 'x' ? 1 : 0, axis === 'y' ? 1 : 0, axis === 'z' ? 1 : 0); }
function eligible() {
  const s = selection();
  return mode() === 'object' && !!s?.multi && (s?.ids?.size || 0) > 1 && ['move','scale','rotate'].includes(tool());
}
function forceRender() {
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change', { bubbles:true }));
  manager()?.saveActive?.();
}
function screenPoint(v, camera) {
  const p = v.clone().project(camera), r = canvas.getBoundingClientRect();
  return new THREE.Vector2(r.left + (p.x * .5 + .5) * r.width, r.top + (-p.y * .5 + .5) * r.height);
}
function planePoint(event, plane, camera) {
  const r = canvas.getBoundingClientRect();
  const ndc = new THREE.Vector2((event.clientX-r.left)/r.width*2-1, -((event.clientY-r.top)/r.height*2-1));
  const ray = new THREE.Raycaster(), out = new THREE.Vector3();
  ray.setFromCamera(ndc, camera);
  return ray.ray.intersectPlane(plane, out) ? out : null;
}
function objectCenter(mesh) {
  if (!mesh?.vertices?.length) return new THREE.Vector3();
  const box = new THREE.Box3();
  for (const v of mesh.vertices) box.expandByPoint(v);
  return box.getCenter(new THREE.Vector3());
}
function objectOrigin(object, mesh) {
  const apiOrigin = originApi()?.originFor?.(object, mesh);
  if (apiOrigin?.isVector3) return apiOrigin.clone();
  const raw = object?.origin;
  if (raw && Number.isFinite(raw.x) && Number.isFinite(raw.y) && Number.isFinite(raw.z)) {
    return new THREE.Vector3(raw.x, raw.y, raw.z);
  }
  return objectCenter(mesh);
}
function buildTargets() {
  const m = manager(), s = selection(), live = state()?.mesh;
  if (!m || !s || !live) return { targets:[], locked:0 };
  m.saveActive?.();
  const ids = s.ids;
  let locked = 0;
  const targets = [];
  for (const object of m.objects) {
    if (!ids.has(object.id)) continue;
    if (object.locked) { locked++; continue; }
    const mesh = object.id === m.activeId ? live : object.mesh;
    if (!mesh?.vertices?.length) continue;
    targets.push({
      object,
      mesh,
      original: mesh.vertices.map(v => v.clone()),
      center: objectCenter(mesh),
      origin: objectOrigin(object, mesh)
    });
  }
  return { targets, locked };
}
function groupCenter(targets) {
  const c = new THREE.Vector3();
  for (const target of targets) c.add(target.center);
  return targets.length ? c.multiplyScalar(1 / targets.length) : c;
}
function medianOrigin(targets) {
  const c = new THREE.Vector3();
  for (const target of targets) c.add(target.origin);
  return targets.length ? c.multiplyScalar(1 / targets.length) : c;
}
function pivotMode() {
  const value = originApi()?.pivotMode;
  return ['median','active','individual','world'].includes(value) ? value : 'median';
}
function sharedPivot(targets, pivot) {
  if (pivot === 'world') return new THREE.Vector3();
  if (pivot === 'active') {
    const id = manager()?.activeId;
    const active = targets.find(target => target.object.id === id);
    if (active) return active.origin.clone();
  }
  return medianOrigin(targets);
}
function restore(targets) {
  for (const target of targets) target.original.forEach((v, i) => target.mesh.vertices[i]?.copy(v));
}
function screenAxis(center, axis, camera) {
  const a = screenPoint(center, camera), b = screenPoint(center.clone().add(axisVector(axis)), camera);
  return b.sub(a);
}
function axisMoveAmount(g, event) {
  const d = new THREE.Vector2(event.clientX - g.startX, event.clientY - g.startY);
  const rail = screenAxis(g.interactionCenter, g.axis, g.camera);
  const l = rail.lengthSq();
  return l > 1 ? d.dot(rail) / l : 0;
}
function applyMove(g, event) {
  let delta;
  if (g.axis) delta = axisVector(g.axis).multiplyScalar(axisMoveAmount(g, event));
  else {
    const now = planePoint(event, g.plane, g.camera);
    if (!now) return;
    delta = now.sub(g.start);
  }
  for (const target of g.targets) for (const v of target.mesh.vertices) v.add(delta);
  status.textContent = `Move • ${g.targets.length} objects • ${g.axis ? g.axis.toUpperCase() : 'Free'}${g.locked ? ` • ${g.locked} locked skipped` : ''}`;
}
function applyScale(g, event) {
  const dx = event.clientX - g.startX, dy = event.clientY - g.startY;
  const factor = THREE.MathUtils.clamp(Math.exp((dx-dy)*.006), .05, 20);
  for (const target of g.targets) {
    const pivot = g.pivotMode === 'individual' ? target.origin : g.center;
    for (const v of target.mesh.vertices) {
      const p = v.sub(pivot);
      if (g.axis) p[g.axis] *= factor; else p.multiplyScalar(factor);
      v.add(pivot);
    }
  }
  status.textContent = `Scale • ${g.targets.length} objects • ${g.pivotLabel} • ${g.axis ? g.axis.toUpperCase() : 'Uniform'} • ${factor.toFixed(2)}×${g.locked ? ` • ${g.locked} locked skipped` : ''}`;
}
function applyRotate(g, event) {
  const p = new THREE.Vector2(event.clientX, event.clientY).sub(g.centerScreen);
  if (p.lengthSq() < 4 || g.startVector.lengthSq() < 4) return;
  let angle = Math.atan2(g.startVector.x*p.y - g.startVector.y*p.x, g.startVector.dot(p));
  const snapOn = document.querySelector('#transformSnapBtn')?.classList.contains('active') ?? true;
  if (snapOn) angle = THREE.MathUtils.degToRad(Math.round(THREE.MathUtils.radToDeg(angle)/15)*15);
  const axis = g.axis ? axisVector(g.axis) : g.camera.getWorldDirection(new THREE.Vector3()).normalize();
  const q = new THREE.Quaternion().setFromAxisAngle(axis, angle);
  for (const target of g.targets) {
    const pivot = g.pivotMode === 'individual' ? target.origin : g.center;
    for (const v of target.mesh.vertices) v.sub(pivot).applyQuaternion(q).add(pivot);
  }
  status.textContent = `Rotate • ${g.targets.length} objects • ${g.pivotLabel} • ${g.axis ? g.axis.toUpperCase() : 'View'} • ${Math.round(THREE.MathUtils.radToDeg(angle))}°${g.locked ? ` • ${g.locked} locked skipped` : ''}`;
}

function start(event) {
  if (!eligible() || event.target !== canvas || !event.isPrimary || event.pointerType === 'touch') return;
  const camera = state()?.camera;
  if (!camera) return;
  const { targets, locked } = buildTargets();
  if (targets.length < 2) {
    if (locked) status.textContent = 'Multi Transform needs at least two unlocked selected objects';
    return;
  }
  const pm = pivotMode();
  const center = sharedPivot(targets, pm);
  const interactionCenter = pm === 'individual' ? medianOrigin(targets) : center;
  const normal = camera.getWorldDirection(new THREE.Vector3()).normalize();
  const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(normal, interactionCenter);
  const startPoint = planePoint(event, plane, camera);
  if (!startPoint) return;
  const c = constraint();
  const axis = ['x','y','z'].includes(c) ? c : null;
  const centerScreen = screenPoint(interactionCenter, camera);
  const label = pm === 'individual' ? 'Individual' : pm[0].toUpperCase() + pm.slice(1);
  gesture = {
    id:event.pointerId, camera, targets, locked, center, interactionCenter, centerScreen,
    start:startPoint, startX:event.clientX, startY:event.clientY,
    startVector:new THREE.Vector2(event.clientX,event.clientY).sub(centerScreen),
    plane, axis, t:tool(), changed:false, pivotMode:pm, pivotLabel:label
  };
  event.preventDefault();
  event.stopImmediatePropagation();
  canvas.setPointerCapture?.(event.pointerId);
}

function move(event) {
  const g = gesture;
  if (!g || g.id !== event.pointerId) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  const d = Math.hypot(event.clientX-g.startX, event.clientY-g.startY);
  if (!g.changed && d < DRAG_THRESHOLD) return;
  if (!g.changed) {
    g.changed = true;
    const active = g.targets.find(t => t.object.id === manager()?.activeId);
    if (active) globalThis.__boxlabHistory?.push?.(active.mesh.clone());
  }
  restore(g.targets);
  if (g.t === 'move') applyMove(g,event);
  else if (g.t === 'scale') applyScale(g,event);
  else applyRotate(g,event);
  forceRender();
}

function end(event) {
  const g = gesture;
  if (!g || g.id !== event.pointerId) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  manager()?.saveActive?.();
  gesture = null;
}

function applyNumeric(event) {
  if (event.key !== 'Enter' || event.target !== valueInput || !eligible()) return;
  const n = Number(valueInput.value);
  if (!Number.isFinite(n) || !valueInput.value.trim()) return;
  const { targets, locked } = buildTargets();
  if (targets.length < 2) return;
  const pm = pivotMode();
  const center = sharedPivot(targets, pm), c = constraint(), axis = ['x','y','z'].includes(c) ? c : null, t = tool();
  const label = pm === 'individual' ? 'Individual' : pm[0].toUpperCase() + pm.slice(1);
  event.preventDefault();
  event.stopImmediatePropagation();
  const active = targets.find(target => target.object.id === manager()?.activeId);
  if (active) globalThis.__boxlabHistory?.push?.(active.mesh.clone());
  if (t === 'move') {
    const delta = axis ? axisVector(axis).multiplyScalar(n) : new THREE.Vector3(n,0,0);
    for (const target of targets) for (const v of target.mesh.vertices) v.add(delta);
  } else if (t === 'scale') {
    for (const target of targets) {
      const pivot = pm === 'individual' ? target.origin : center;
      for (const v of target.mesh.vertices) {
        const p = v.sub(pivot); if (axis) p[axis] *= n; else p.multiplyScalar(n); v.add(pivot);
      }
    }
  } else {
    let degrees = n;
    const snapOn = document.querySelector('#transformSnapBtn')?.classList.contains('active') ?? true;
    if (snapOn) degrees = Math.round(degrees/15)*15;
    const av = axis ? axisVector(axis) : new THREE.Vector3(0,1,0);
    const q = new THREE.Quaternion().setFromAxisAngle(av, THREE.MathUtils.degToRad(degrees));
    for (const target of targets) {
      const pivot = pm === 'individual' ? target.origin : center;
      for (const v of target.mesh.vertices) v.sub(pivot).applyQuaternion(q).add(pivot);
    }
  }
  forceRender();
  manager()?.saveActive?.();
  status.textContent = `${t[0].toUpperCase()+t.slice(1)} • ${targets.length} objects • ${label} • ${axis ? axis.toUpperCase() : 'Group'} • ${n}${t === 'rotate' ? '°' : ''}${locked ? ` • ${locked} locked skipped` : ''}`;
  valueInput.value = '';
}

window.addEventListener('pointerdown', start, true);
window.addEventListener('pointermove', move, true);
window.addEventListener('pointerup', end, true);
window.addEventListener('pointercancel', end, true);
window.addEventListener('keydown', applyNumeric, true);

const version = document.querySelector('#appVersion');
if (version) version.textContent = 'v0.36.1.0';
document.title = 'BoxLab v0.36.1.0';
