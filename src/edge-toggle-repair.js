import * as THREE from 'three';

const canvas = document.querySelector('#viewport');
const multiToggle = document.querySelector('#multiSelectToggle');
const edgeModeButton = document.querySelector('#selectionModes button[data-mode="edge"]');
const raycaster = new THREE.Raycaster();
raycaster.params.Line.threshold = 0.09;
const pointer = new THREE.Vector2();
const TAP_THRESHOLD = 8;
let press = null;
let synthetic = false;

function state() { return globalThis.__boxlabBridgeState; }
function selectedEdges() { return [...new Set(state()?.selectedEdges || [])]; }
function edgeMode() { return !!edgeModeButton?.classList.contains('active'); }

function setPointer(event) {
  const rect = canvas.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

function hitSelectedEdge(event) {
  const s = state();
  if (!s?.camera || !s?.edgeObjects) return null;
  setPointer(event);
  raycaster.setFromCamera(pointer, s.camera);
  const selected = new Set(selectedEdges());
  const objects = [...s.edgeObjects.values()].filter(Boolean);
  for (const hit of raycaster.intersectObjects(objects, false)) {
    const index = hit?.object?.userData?.index;
    if (Number.isInteger(index) && selected.has(index)) return index;
  }
  return null;
}

function edgeScreenPoint(index) {
  const s = state(), mesh = s?.mesh, camera = s?.camera;
  const edge = mesh?.edges?.()[index];
  if (!mesh || !camera || !edge) return null;
  const a = mesh.vertices[edge.a], b = mesh.vertices[edge.b];
  if (!a || !b) return null;
  const p = a.clone().lerp(b, 0.5).project(camera);
  const rect = canvas.getBoundingClientRect();
  return {
    x: rect.left + (p.x * 0.5 + 0.5) * rect.width,
    y: rect.top + (-p.y * 0.5 + 0.5) * rect.height
  };
}

function syntheticTap(point, pointerId) {
  if (!point) return;
  synthetic = true;
  try {
    canvas.dispatchEvent(new PointerEvent('pointerdown', {
      bubbles: true, cancelable: true, pointerId, pointerType: 'mouse',
      isPrimary: true, button: 0, buttons: 1, clientX: point.x, clientY: point.y
    }));
    canvas.dispatchEvent(new PointerEvent('pointerup', {
      bubbles: true, cancelable: true, pointerId, pointerType: 'mouse',
      isPrimary: true, button: 0, buttons: 0, clientX: point.x, clientY: point.y
    }));
  } finally {
    synthetic = false;
  }
}

function rebuildWithout(targetIndex, originalSelection, originalMulti) {
  if (!edgeModeButton) return;
  const keep = originalSelection.filter(index => index !== targetIndex);
  const points = keep.map(index => edgeScreenPoint(index)).filter(Boolean);

  edgeModeButton.click();
  if (!points.length) {
    if (multiToggle && multiToggle.checked !== originalMulti) {
      multiToggle.checked = originalMulti;
      multiToggle.dispatchEvent(new Event('change', { bubbles: true }));
    }
    return;
  }

  if (multiToggle && !multiToggle.checked) {
    multiToggle.checked = true;
    multiToggle.dispatchEvent(new Event('change', { bubbles: true }));
  }
  points.forEach((point, i) => syntheticTap(point, 94 + i));
  if (multiToggle && multiToggle.checked !== originalMulti) {
    multiToggle.checked = originalMulti;
    multiToggle.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

canvas?.addEventListener('pointerdown', event => {
  if (synthetic || !event.isPrimary || !edgeMode()) return;
  if (event.pointerType === 'mouse' && event.pointerId >= 90) return;
  const targetIndex = hitSelectedEdge(event);
  if (!Number.isInteger(targetIndex)) return;
  const originalSelection = selectedEdges();
  press = {
    pointerId: event.pointerId,
    targetIndex,
    originalSelection,
    originalMulti: !!multiToggle?.checked,
    startX: event.clientX,
    startY: event.clientY
  };
}, true);

canvas?.addEventListener('pointermove', event => {
  if (!press || press.pointerId !== event.pointerId) return;
  if (Math.hypot(event.clientX - press.startX, event.clientY - press.startY) >= TAP_THRESHOLD) press.moved = true;
}, true);

canvas?.addEventListener('pointerup', event => {
  if (synthetic || !press || press.pointerId !== event.pointerId) return;
  const current = press;
  press = null;
  const moved = current.moved || Math.hypot(event.clientX - current.startX, event.clientY - current.startY) >= TAP_THRESHOLD;
  if (moved) return;
  setTimeout(() => rebuildWithout(current.targetIndex, current.originalSelection, current.originalMulti), 0);
});

canvas?.addEventListener('pointercancel', event => {
  if (press?.pointerId === event.pointerId) press = null;
});
