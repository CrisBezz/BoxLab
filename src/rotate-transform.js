import * as THREE from 'three';

const canvas = document.querySelector('#viewport');
const status = document.querySelector('#selectionStatus');
const rotateButton = document.querySelector('#toolModes button[data-tool="rotate"]');
const DRAG_THRESHOLD = 8;

let gesture = null;
let selectedVertexIndices = new Set();

function state() { return globalThis.__boxlabBridgeState; }
function rotateActive() { return !!rotateButton?.classList.contains('active'); }
function currentMode() { return document.querySelector('#selectionModes button.active')?.dataset?.mode || 'face'; }

if (!THREE.Group.prototype.__boxlabRotateSelectionObserverInstalled) {
  const baseAdd = THREE.Group.prototype.add;
  THREE.Group.prototype.add = function (...objects) {
    for (const object of objects) {
      if (object?.userData?.kind === 'body') selectedVertexIndices = new Set();
      if (object?.userData?.kind === 'vertex' && Number.isInteger(object.userData.index)) {
        const hex = object?.material?.color?.getHex?.();
        if (hex === 0xff615f) selectedVertexIndices.add(object.userData.index);
      }
    }
    return baseAdd.apply(this, objects);
  };
  THREE.Group.prototype.__boxlabRotateSelectionObserverInstalled = true;
}

function selectionVertices(mode, mesh) {
  if (!mesh) return [];
  if (mode === 'object') return mesh.vertices.map((_, i) => i);
  if (mode === 'vertex') return [...selectedVertexIndices];
  if (mode === 'edge') {
    const out = new Set();
    for (const index of state()?.selectedEdges || []) {
      const edge = mesh.edges()[index];
      if (edge) { out.add(edge.a); out.add(edge.b); }
    }
    return [...out];
  }
  if (mode === 'face') {
    const out = new Set();
    for (const index of state()?.selectedFaces || []) {
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

canvas?.addEventListener('pointerdown', event => {
  if (!event.isPrimary || !rotateActive() || event.pointerType === 'touch') return;
  const mesh = state()?.mesh, camera = state()?.camera, mode = currentMode();
  const indices = selectionVertices(mode, mesh);
  if (!mesh || !camera || !indices.length || !pencilHitsMesh(event, mesh, camera)) return;

  const center = new THREE.Vector3();
  indices.forEach(index => center.add(mesh.vertices[index]));
  center.multiplyScalar(1 / indices.length);
  const centerScreen = screenPoint(center, camera);
  const startVector = new THREE.Vector2(event.clientX, event.clientY).sub(centerScreen);
  const axis = new THREE.Vector3();
  camera.getWorldDirection(axis).normalize();

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
    original: new Map(indices.map(index => [index, mesh.vertices[index].clone()])),
    before: mesh.clone(),
    moved: false,
    historyPushed: false
  };
  event.preventDefault();
  event.stopImmediatePropagation();
  canvas.setPointerCapture?.(event.pointerId);
}, true);

canvas?.addEventListener('pointermove', event => {
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
    angle = -Math.atan2(a.x * b.y - a.y * b.x, THREE.MathUtils.clamp(a.dot(b), -1, 1));
  } else {
    angle = (event.clientX - gesture.startX) * 0.012;
  }

  const q = new THREE.Quaternion().setFromAxisAngle(gesture.axis, angle);
  for (const index of gesture.indices) {
    const original = gesture.original.get(index);
    const vertex = gesture.mesh.vertices[index];
    if (original && vertex) vertex.copy(original).sub(gesture.center).applyQuaternion(q).add(gesture.center);
  }
  forceRender();
  if (status) status.textContent = `Rotate ${gesture.mode} • ${THREE.MathUtils.radToDeg(angle).toFixed(1)}°`;
}, true);

function finish(event) {
  if (!gesture || gesture.pointerId !== event.pointerId) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  const moved = gesture.moved;
  gesture = null;
  if (moved && status) status.textContent = 'Rotate committed';
}
canvas?.addEventListener('pointerup', finish, true);
canvas?.addEventListener('pointercancel', finish, true);

rotateButton?.addEventListener('click', () => {
  forceRender();
  setTimeout(forceRender, 0);
});

forceRender();
