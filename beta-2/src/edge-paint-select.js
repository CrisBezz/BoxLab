import * as THREE from 'three';

const canvas = document.querySelector('#viewport');
const multiToggle = document.querySelector('#multiSelectToggle');
const depthButtons = [...document.querySelectorAll('#paintSelectDepth [data-paint-depth]')];
const raycaster = new THREE.Raycaster();
raycaster.params.Line.threshold = 0.09;
const pointer = new THREE.Vector2();
let paint = null;
let paintDepth = 'visible';

function state() { return globalThis.__boxlabBridgeState; }
function selection() { return globalThis.__boxlabSelectionBridge; }
function mode() { return selection()?.mode?.(); }

function objectsFor(type) {
  const s = state();
  if (type === 'vertex') return [...(s?.vertexObjects?.values?.() || [])];
  if (type === 'edge') return [...(s?.edgeObjects?.values?.() || [])];
  if (type === 'face') return [...(s?.faceObjects?.values?.() || [])];
  return [];
}

function setPointer(event) {
  const rect = canvas.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

function hitIndices(event, type) {
  const camera = state()?.camera;
  const objects = objectsFor(type).filter(Boolean);
  if (!camera || !objects.length) return [];
  setPointer(event);
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(objects, false);
  const indices = [...new Set(hits.map(hit => hit.object?.userData?.index).filter(Number.isInteger))];
  return paintDepth === 'through' ? indices : indices.slice(0, 1);
}

function addHits(event, type) {
  const bridge = selection();
  hitIndices(event, type).forEach(index => bridge?.add?.(type, index));
}

depthButtons.forEach(button => button.addEventListener('click', () => {
  paintDepth = button.dataset.paintDepth;
  depthButtons.forEach(item => item.classList.toggle('active', item === button));
}));

canvas?.addEventListener('pointerdown', event => {
  const type = mode();
  const bridge = selection();
  if (!event.isPrimary || !multiToggle?.checked || !['vertex', 'edge', 'face'].includes(type)) return;
  const first = hitIndices(event, type)[0];
  if (!Number.isInteger(first) || bridge?.has?.(type, first)) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  paint = { pointerId:event.pointerId, type };
  canvas.setPointerCapture?.(event.pointerId);
  addHits(event, type);
}, true);

canvas?.addEventListener('pointermove', event => {
  if (!paint || paint.pointerId !== event.pointerId) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  addHits(event, paint.type);
}, true);

function endPaint(event) {
  if (!paint || paint.pointerId !== event.pointerId) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  paint = null;
}

canvas?.addEventListener('pointerup', endPaint, true);
canvas?.addEventListener('pointercancel', endPaint, true);
