import * as THREE from 'three';

const canvas = document.querySelector('#viewport');
const loopCutBtn = document.querySelector('#loopCutBtn');
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

function commitLoop(keys) {
  if (!keys.length) return;
  committing = true;

  // BoxLab's own Undo/Redo path clears the private active Loop Slide session
  // while restoring the exact finished cut as the current mesh.
  document.querySelector('#undoBtn')?.click();
  document.querySelector('#redoBtn')?.click();

  const s = state(), mesh = s?.mesh;
  if (!mesh) { committing = false; return; }
  const wanted = new Set(keys);
  const indices = mesh.edges()
    .map((edge, index) => wanted.has(mesh.edgeKey(edge.a, edge.b)) ? index : -1)
    .filter(index => index >= 0);
  if (!indices.length) { committing = false; return; }

  // Modern BoxLab exposes direct component selection. The old v0.16 workaround
  // replayed synthetic pointer taps here; with today's persistent Loop Cut tool
  // those taps re-entered Loop Cut and created additional topology.
  globalThis.__boxlabSelectionBridge?.set?.('edge', indices);
  if (status) status.textContent = `Loop Cut committed • ${indices.length} edge${indices.length === 1 ? '' : 's'} selected`;
  setTimeout(() => { committing = false; }, 0);
}

canvas?.addEventListener('pointerup', event => {
  if (globalThis.__boxlabEdgeViewportSession?.loopActive?.()) return;
  if (committing || !event.isPrimary || !loopCutBtn?.classList.contains('active')) return;
  const keys = currentYellowEdgeKeys();
  if (!keys.length) return;
  queueMicrotask(() => commitLoop(keys));
});

// Radial Exact finalizes the current rail through the existing commit owner.
globalThis.__boxlabLoopCutCommit={pending:()=>currentYellowEdgeKeys().length>0,commitCurrent:()=>{const keys=currentYellowEdgeKeys();if(committing||!keys.length||globalThis.__boxlabMainDirectTool?.busy?.())return false;commitLoop(keys);return true;}};
