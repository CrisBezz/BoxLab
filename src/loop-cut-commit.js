import * as THREE from 'three';

const canvas = document.querySelector('#viewport');
const loopCutBtn = document.querySelector('#loopCutBtn');
const multiToggle = document.querySelector('#multiSelectToggle');
const status = document.querySelector('#selectionStatus');
const YELLOW = 0xffe14a;
let committing = false;

function state() { return globalThis.__boxlabBridgeState; }
function currentYellowEdgeKeys() {
  const s = state(), mesh = s?.mesh;
  if (!mesh || !(s?.edgeObjects instanceof Map)) return [];
  const keys = [];
  for (const [index, object] of s.edgeObjects) {
    const color = object?.material?.color?.getHex?.();
    const edge = mesh.edges()[index];
    if (color === YELLOW && edge) keys.push(mesh.edgeKey(edge.a, edge.b));
  }
  return [...new Set(keys)];
}

function screenPoint(v) {
  const s = state(), camera = s?.camera;
  if (!camera || !canvas || !v) return null;
  const p = v.clone().project(camera), r = canvas.getBoundingClientRect();
  return { x:r.left + (p.x * .5 + .5) * r.width, y:r.top + (-p.y * .5 + .5) * r.height };
}

function tapEdge(index, pointerId) {
  const s = state(), mesh = s?.mesh, edge = mesh?.edges?.()[index];
  if (!mesh || !edge) return;
  const midpoint = mesh.vertices[edge.a].clone().add(mesh.vertices[edge.b]).multiplyScalar(.5);
  const p = screenPoint(midpoint);
  if (!p) return;
  canvas.dispatchEvent(new PointerEvent('pointerdown', { bubbles:true, cancelable:true, pointerId, pointerType:'mouse', isPrimary:true, button:0, buttons:1, clientX:p.x, clientY:p.y }));
  canvas.dispatchEvent(new PointerEvent('pointerup', { bubbles:true, cancelable:true, pointerId, pointerType:'mouse', isPrimary:true, button:0, buttons:0, clientX:p.x, clientY:p.y }));
}

function commitLoop(keys) {
  if (!keys.length) return;
  committing = true;

  // Leave the Loop Cut tool before rebuilding normal selection.
  if (loopCutBtn?.classList.contains('active')) loopCutBtn.click();

  // BoxLab's own Undo/Redo path clears the private active Loop Slide session
  // while restoring the exact finished cut as the current mesh.
  document.querySelector('#undoBtn')?.click();
  document.querySelector('#redoBtn')?.click();

  const s = state(), mesh = s?.mesh;
  if (!mesh) { committing = false; return; }
  const wanted = new Set(keys);
  const indices = mesh.edges().map((edge, index) => wanted.has(mesh.edgeKey(edge.a, edge.b)) ? index : -1).filter(index => index >= 0);
  if (!indices.length) { committing = false; return; }

  if (multiToggle && !multiToggle.checked) {
    multiToggle.checked = true;
    multiToggle.dispatchEvent(new Event('change', { bubbles:true }));
  }
  indices.forEach((index, i) => tapEdge(index, 820 + i));
  if (multiToggle?.checked) {
    multiToggle.checked = false;
    multiToggle.dispatchEvent(new Event('change', { bubbles:true }));
  }
  if (status) status.textContent = `Loop Cut committed • ${indices.length} edge${indices.length === 1 ? '' : 's'} selected`;
  setTimeout(() => { committing = false; }, 0);
}

canvas?.addEventListener('pointerup', event => {
  if (committing || !event.isPrimary || !loopCutBtn?.classList.contains('active')) return;
  const keys = currentYellowEdgeKeys();
  if (!keys.length) return;
  queueMicrotask(() => commitLoop(keys));
});
