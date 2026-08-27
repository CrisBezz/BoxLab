import * as THREE from 'three';

const state = globalThis.__boxlabBridgeState;
const canvas = document.querySelector('#viewport');
const multiToggle = document.querySelector('#multiSelectToggle');
const status = document.querySelector('#selectionStatus');
const raycaster = new THREE.Raycaster();
raycaster.params.Line.threshold = 0.09;
const pointer = new THREE.Vector2();
let paint = null;
let synthetic = false;

function edgeMode() {
  return document.querySelector('#selectionModes button[data-mode="edge"]')?.classList.contains('active');
}

function selectedEdges() {
  return [...new Set(state?.selectedEdges || [])];
}

function setPointer(event) {
  const rect = canvas.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

function hitEdge(event) {
  const camera = state?.camera;
  const objects = [...(state?.edgeObjects?.values?.() || [])].filter(Boolean);
  if (!camera || !objects.length) return null;
  setPointer(event);
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObjects(objects, false)[0];
  return Number.isInteger(hit?.object?.userData?.index) ? hit.object.userData.index : null;
}

function syntheticTap(x, y) {
  synthetic = true;
  try {
    canvas.dispatchEvent(new PointerEvent('pointerdown', {
      bubbles: true, cancelable: true, pointerId: 96, pointerType: 'mouse',
      isPrimary: true, button: 0, buttons: 1, clientX: x, clientY: y
    }));
    canvas.dispatchEvent(new PointerEvent('pointerup', {
      bubbles: true, cancelable: true, pointerId: 96, pointerType: 'mouse',
      isPrimary: true, button: 0, buttons: 0, clientX: x, clientY: y
    }));
  } finally {
    synthetic = false;
  }
}

function updateStatus() {
  if (status) status.textContent = `Paint Select • ${selectedEdges().length} edge${selectedEdges().length === 1 ? '' : 's'} selected`;
}

canvas?.addEventListener('pointerdown', event => {
  if (synthetic) return;
  if (!event.isPrimary || !edgeMode() || !multiToggle?.checked) return;
  if (event.pointerType === 'mouse' && event.pointerId >= 90) return;

  const edgeIndex = hitEdge(event);
  if (!Number.isInteger(edgeIndex) || selectedEdges().includes(edgeIndex)) return;

  event.preventDefault();
  event.stopImmediatePropagation();
  paint = { pointerId: event.pointerId, lastEdge: edgeIndex };
  canvas.setPointerCapture?.(event.pointerId);
  syntheticTap(event.clientX, event.clientY);
  updateStatus();
}, true);

canvas?.addEventListener('pointermove', event => {
  if (!paint || paint.pointerId !== event.pointerId) return;
  event.preventDefault();
  event.stopImmediatePropagation();

  const edgeIndex = hitEdge(event);
  if (!Number.isInteger(edgeIndex) || edgeIndex === paint.lastEdge || selectedEdges().includes(edgeIndex)) return;
  paint.lastEdge = edgeIndex;
  syntheticTap(event.clientX, event.clientY);
  updateStatus();
}, true);

function endPaint(event) {
  if (!paint || paint.pointerId !== event.pointerId) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  paint = null;
  updateStatus();
}

canvas?.addEventListener('pointerup', endPaint, true);
canvas?.addEventListener('pointercancel', endPaint, true);
