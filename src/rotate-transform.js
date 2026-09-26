import * as THREE from 'three';

const canvas = document.querySelector('#viewport');
const status = document.querySelector('#selectionStatus');
const rotateButton = document.querySelector('#toolModes button[data-tool="rotate"]');
const DRAG_THRESHOLD = 8;

let gesture = null;

function state() { return globalThis.__boxlabBridgeState; }
function bridge() { return globalThis.__boxlabSelectionBridge; }
function rotateActive() { return globalThis.__boxlabTransformArming?.tool?.()==='rotate' || !!rotateButton?.classList.contains('active'); }
function currentMode() { return bridge()?.mode?.() || document.querySelector('#selectionModes button.active')?.dataset?.mode || 'face'; }
function selectedIndices(mode) { return bridge()?.mode?.()===mode ? [...new Set(bridge()?.indices?.()||[])] : []; }
function constraint(){ return globalThis.__boxlabTransformArming?.constraint?.()||'free'; }
function axisVector(axis){
  if(axis==='x')return new THREE.Vector3(1,0,0);
  if(axis==='y')return new THREE.Vector3(0,1,0);
  if(axis==='z')return new THREE.Vector3(0,0,1);
  return null;
}
function snapOn(){ return !!document.querySelector('#transformSnapBtn')?.classList.contains('active'); }

function selectionVertices(mode, mesh) {
  if (!mesh) return [];
  if (mode === 'object') return mesh.vertices.map((_, i) => i);
  if (mode === 'vertex') return selectedIndices('vertex');
  if (mode === 'edge') {
    const out = new Set();
    for (const index of selectedIndices('edge')) {
      const edge = mesh.edges()[index];
      if (edge) { out.add(edge.a); out.add(edge.b); }
    }
    return [...out];
  }
  if (mode === 'face') {
    const out = new Set();
    for (const index of selectedIndices('face')) {
      for (const vertex of mesh.faces[index] || []) out.add(vertex);
    }
    return [...out];
  }
  return [];
}

function pencilHitsMesh(event, mesh, camera) {
  if (!mesh || !camera || !mesh.faces?.length) return false;
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return false;
  const pointer = new THREE.Vector2(
    ((event.clientX - rect.left) / rect.width) * 2 - 1,
    -((event.clientY - rect.top) / rect.height) * 2 + 1
  );
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(pointer, camera);
  const geometry = mesh.triangulatedGeometry();
  const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
  const picker = new THREE.Mesh(geometry, material);
  const hit = raycaster.intersectObject(picker, false).length > 0;
  geometry.dispose();
  material.dispose();
  return hit;
}

function screenPoint(world, camera) {
  const p = world.clone().project(camera);
  const rect = canvas.getBoundingClientRect();
  return new THREE.Vector2(
    rect.left + (p.x * 0.5 + 0.5) * rect.width,
    rect.top + (-p.y * 0.5 + 0.5) * rect.height
  );
}

function forceRender() {
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change', { bubbles:true }));
}

document.addEventListener('pointerdown', event => {
  if (event.target!==canvas || !event.isPrimary || !rotateActive() || event.pointerType === 'touch') return;
  const mesh = state()?.mesh, camera = state()?.camera, mode = currentMode();
  const indices = selectionVertices(mode, mesh);
  if (!mesh || !camera || !['vertex','edge','face'].includes(mode) || !indices.length) return;

  const center = new THREE.Vector3();
  indices.forEach(index => center.add(mesh.vertices[index]));
  center.multiplyScalar(1 / indices.length);
  const centerScreen = screenPoint(center, camera);
  const startVector = new THREE.Vector2(event.clientX, event.clientY).sub(centerScreen);
  const explicitAxis = axisVector(constraint());
  const axis = explicitAxis || new THREE.Vector3();
  if(!explicitAxis) camera.getWorldDirection(axis).normalize();

  gesture = {
    pointerId: event.pointerId,
    mode,
    mesh,
    indices,
    center,
    centerScreen,
    startVector,
    startX: event.clientX,
    startY: event.clientY,
    axis,
    constraint: constraint(),
    snap: snapOn(),
    original: new Map(indices.map(index => [index, mesh.vertices[index].clone()])),
    before: mesh.clone(),
    moved: false,
    historyPushed: false
  };
  event.preventDefault();
  event.stopImmediatePropagation();
  canvas.setPointerCapture?.(event.pointerId);
}, true);

document.addEventListener('pointermove', event => {
  if (!gesture || gesture.pointerId !== event.pointerId) return;
  event.preventDefault();
  event.stopImmediatePropagation();

  const distance = Math.hypot(event.clientX - gesture.startX, event.clientY - gesture.startY);
  if (!gesture.moved && distance < DRAG_THRESHOLD) return;
  if (!gesture.moved) {
    gesture.moved = true;
    if (!gesture.historyPushed && globalThis.__boxlabHistory) {
      globalThis.__boxlabHistory.push(gesture.before);
      gesture.historyPushed = true;
    }
  }

  const currentVector = new THREE.Vector2(event.clientX, event.clientY).sub(gesture.centerScreen);
  let angle;
  if (gesture.startVector.length() > 18 && currentVector.length() > 18) {
    const a = gesture.startVector.clone().normalize();
    const b = currentVector.clone().normalize();
    angle = Math.atan2(a.x * b.y - a.y * b.x, THREE.MathUtils.clamp(a.dot(b), -1, 1));
  } else {
    angle = (event.clientX - gesture.startX) * 0.012;
  }

  if (gesture.snap) angle = THREE.MathUtils.degToRad(Math.round(THREE.MathUtils.radToDeg(angle) / 15) * 15);
  const q = new THREE.Quaternion().setFromAxisAngle(gesture.axis, angle);
  for (const index of gesture.indices) {
    const original = gesture.original.get(index);
    const vertex = gesture.mesh.vertices[index];
    if (original && vertex) vertex.copy(original).sub(gesture.center).applyQuaternion(q).add(gesture.center);
  }
  forceRender();
  if (status) status.textContent = `Rotate ${gesture.mode} • ${gesture.constraint==='free'?'View':gesture.constraint.toUpperCase()} • ${THREE.MathUtils.radToDeg(angle).toFixed(1)}°${gesture.snap?' • 15°':''}`;
}, true);

function finish(event) {
  if (!gesture || gesture.pointerId !== event.pointerId) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  const moved = gesture.moved;
  gesture = null;
  if (moved && status) status.textContent = 'Rotate committed';
}
document.addEventListener('pointerup', finish, true);
document.addEventListener('pointercancel', finish, true);

rotateButton?.addEventListener('click', () => {
  forceRender();
  setTimeout(forceRender, 0);
});

forceRender();
