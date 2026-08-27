import * as THREE from 'three';

const canvas = document.querySelector('#viewport');
const status = document.querySelector('#selectionStatus');
const rotateButton = document.querySelector('#toolModes button[data-tool="rotate"]');
const raycaster = new THREE.Raycaster();
raycaster.params.Line.threshold = 0.09;
const pointer = new THREE.Vector2();
const SELECTED_HEX = 0xff615f;
const DRAG_THRESHOLD = 8;

let bodyObject = null;
let selectedVertexObjects = new Map();
let selectedFaceObjects = [];
let gesture = null;

function state() { return globalThis.__boxlabBridgeState; }
function rotateActive() { return !!rotateButton?.classList.contains('active'); }
function currentMode() { return document.querySelector('#selectionModes button.active')?.dataset?.mode || 'face'; }

if (!THREE.Group.prototype.__boxlabRotateObserverInstalled) {
  const baseAdd = THREE.Group.prototype.add;
  THREE.Group.prototype.add = function (...objects) {
    for (const object of objects) {
      const kind = object?.userData?.kind;
      if (kind === 'body') {
        bodyObject = object;
        selectedVertexObjects = new Map();
        selectedFaceObjects = [];
      } else if (kind === 'vertex') {
        const hex = object?.material?.color?.getHex?.();
        if (hex === SELECTED_HEX && Number.isInteger(object.userData.index)) selectedVertexObjects.set(object.userData.index, object);
      } else if (!kind && object?.renderOrder === 5) {
        selectedFaceObjects.push(object);
      }
    }
    return baseAdd.apply(this, objects);
  };
  THREE.Group.prototype.__boxlabRotateObserverInstalled = true;
}

function setPointer(event) {
  const rect = canvas.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

function hitObjects(event, objects) {
  const camera = state()?.camera;
  if (!camera || !objects?.length) return false;
  setPointer(event);
  raycaster.setFromCamera(pointer, camera);
  return raycaster.intersectObjects(objects.filter(Boolean), false).length > 0;
}

function selectedVertexIndices(mode, mesh) {
  if (!mesh) return [];
  if (mode === 'object') return mesh.vertices.map((_, index) => index);
  if (mode === 'vertex') return [...selectedVertexObjects.keys()];
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
    for (const index of state()?.selectedFaces || []) for (const vertex of mesh.faces[index] || []) out.add(vertex);
    return [...out];
  }
  return [];
}

function hitSelected(event, mode) {
  if (mode === 'object') return hitObjects(event, bodyObject ? [bodyObject] : []);
  if (mode === 'vertex') return hitObjects(event, [...selectedVertexObjects.values()]);
  if (mode === 'edge') {
    const edgeObjects = state()?.edgeObjects;
    const objects = (state()?.selectedEdges || []).map(index => edgeObjects?.get(index)).filter(Boolean);
    return hitObjects(event, objects);
  }
  if (mode === 'face') return hitObjects(event, selectedFaceObjects);
  return false;
}

function screenPoint(world) {
  const camera = state()?.camera;
  if (!camera || !world) return null;
  const p = world.clone().project(camera), rect = canvas.getBoundingClientRect();
  return new THREE.Vector2(
    rect.left + (p.x * 0.5 + 0.5) * rect.width,
    rect.top + (-p.y * 0.5 + 0.5) * rect.height
  );
}

function forceRender() {
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change', { bubbles:true }));
}

canvas?.addEventListener('pointerdown', event => {
  if (!event.isPrimary || !rotateActive()) return;
  if (event.pointerType === 'touch') return;
  const mesh = state()?.mesh, camera = state()?.camera, mode = currentMode();
  if (!mesh || !camera || !hitSelected(event, mode)) return;
  const indices = selectedVertexIndices(mode, mesh);
  if (!indices.length) return;

  const center = new THREE.Vector3();
  indices.forEach(index => center.add(mesh.vertices[index]));
  center.multiplyScalar(1 / indices.length);
  const centerScreen = screenPoint(center);
  if (!centerScreen) return;
  const startVector = new THREE.Vector2(event.clientX, event.clientY).sub(centerScreen);
  const axis = new THREE.Vector3();
  camera.getWorldDirection(axis).normalize();

  gesture = {
    pointerId:event.pointerId,
    mode,
    indices,
    center,
    centerScreen,
    startVector,
    startX:event.clientX,
    startY:event.clientY,
    axis,
    original:new Map(indices.map(index => [index, mesh.vertices[index].clone()])),
    moved:false
  };
}, true);

canvas?.addEventListener('pointermove', event => {
  if (!gesture || gesture.pointerId !== event.pointerId || !rotateActive()) return;
  const distance = Math.hypot(event.clientX - gesture.startX, event.clientY - gesture.startY);
  if (distance < DRAG_THRESHOLD && !gesture.moved) return;
  gesture.moved = true;

  const mesh = state()?.mesh;
  if (!mesh) return;
  const currentVector = new THREE.Vector2(event.clientX, event.clientY).sub(gesture.centerScreen);
  let angle;
  if (gesture.startVector.length() > 18 && currentVector.length() > 18) {
    const a = gesture.startVector.clone().normalize(), b = currentVector.clone().normalize();
    angle = -Math.atan2(a.x * b.y - a.y * b.x, THREE.MathUtils.clamp(a.dot(b), -1, 1));
  } else {
    angle = (event.clientX - gesture.startX) * 0.012;
  }

  const q = new THREE.Quaternion().setFromAxisAngle(gesture.axis, angle);
  for (const index of gesture.indices) {
    const original = gesture.original.get(index), vertex = mesh.vertices[index];
    if (!original || !vertex) continue;
    vertex.copy(original).sub(gesture.center).applyQuaternion(q).add(gesture.center);
  }
  forceRender();
  if (status) status.textContent = `Rotate ${gesture.mode} • ${(THREE.MathUtils.radToDeg(angle)).toFixed(1)}°`;
});

function end(event) {
  if (!gesture || gesture.pointerId !== event.pointerId) return;
  const moved = gesture.moved;
  gesture = null;
  if (moved && status) status.textContent = 'Rotate committed';
}
canvas?.addEventListener('pointerup', end);
canvas?.addEventListener('pointercancel', end);

rotateButton?.addEventListener('click', () => {
  forceRender();
  setTimeout(forceRender, 0);
});

forceRender();
