const state = globalThis.__boxlabBridgeState;
const edgeButton = document.querySelector('#dissolveEdgeBtn');
const loopButton = document.querySelector('#dissolveLoopBtn');
const status = document.querySelector('#selectionStatus');
const canvas = document.querySelector('#viewport');
const multiToggle = document.querySelector('#multiSelectToggle');

function currentMesh() { return state?.mesh || null; }
function selectedEdges() { return [...new Set(state?.selectedEdges || [])]; }
function edgeInfo() {
  const mesh = currentMesh(), ids = selectedEdges();
  if (!mesh || ids.length !== 1) return null;
  const info = mesh.dissolveEdgeInfo?.(ids[0]);
  return info ? { mesh, edgeIndex: ids[0], info } : null;
}
function loopInfo() {
  const mesh = currentMesh(), ids = selectedEdges();
  if (!mesh || ids.length < 3) return null;
  const info = mesh.dissolveLoopInfo?.(ids);
  return info ? { mesh, ids, info } : null;
}
function sync() {
  if (edgeButton) edgeButton.disabled = !edgeInfo();
  if (loopButton) loopButton.disabled = !loopInfo();
}
function faceScreenPoint(mesh, faceIndex) {
  const camera = state?.camera;
  const face = mesh.faces[faceIndex];
  if (!camera || !canvas || !face?.length) return null;
  const center = face.reduce((sum, vi) => sum.add(mesh.vertices[vi]), mesh.vertices[face[0]].clone().set(0,0,0)).multiplyScalar(1 / face.length).project(camera);
  const rect = canvas.getBoundingClientRect();
  return { x: rect.left + (center.x * 0.5 + 0.5) * rect.width, y: rect.top + (-center.y * 0.5 + 0.5) * rect.height };
}
function selectMergedFace(mesh, faceIndex) {
  document.querySelector('#selectionModes button[data-mode="face"]')?.click();
  const point = faceScreenPoint(mesh, faceIndex);
  if (!point) return;
  setTimeout(() => {
    canvas.dispatchEvent(new PointerEvent('pointerdown', { bubbles:true, cancelable:true, pointerId:97, pointerType:'mouse', isPrimary:true, button:0, buttons:1, clientX:point.x, clientY:point.y }));
    canvas.dispatchEvent(new PointerEvent('pointerup', { bubbles:true, cancelable:true, pointerId:97, pointerType:'mouse', isPrimary:true, button:0, buttons:0, clientX:point.x, clientY:point.y }));
  }, 0);
}
function clearMultiSelectionAfterTopologyChange() {
  if (multiToggle?.checked) {
    multiToggle.checked = false;
    multiToggle.dispatchEvent(new Event('change', { bubbles:true }));
  }
}

loopButton?.addEventListener('click', () => {
  const mode = loopInfo(), history = globalThis.__boxlabHistory;
  if (!mode || !history) return;
  const before = mode.mesh.clone();
  const result = mode.mesh.dissolveLoop(mode.ids);
  if (!result) {
    if (status) status.textContent = 'Dissolve Loop failed • invalid or changed topology';
    sync();
    return;
  }
  history.push(before);
  clearMultiSelectionAfterTopologyChange();
  document.querySelector('#deselectAllBtn')?.click();
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change', { bubbles:true }));
  setTimeout(() => {
    if (status) status.textContent = `Dissolve Loop • removed ${result.removedEdges} edges + ${result.removedVertices} vertices`;
    sync();
  }, 20);
});

edgeButton?.addEventListener('click', () => {
  const mode = edgeInfo(), history = globalThis.__boxlabHistory;
  if (!mode || !history) return;
  const before = mode.mesh.clone();
  const result = mode.mesh.dissolveEdge(mode.edgeIndex);
  if (!result) {
    if (status) status.textContent = 'Dissolve Edge failed • invalid topology';
    sync();
    return;
  }
  history.push(before);
  clearMultiSelectionAfterTopologyChange();
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change', { bubbles:true }));
  selectMergedFace(mode.mesh, result.faceIndex);
  setTimeout(() => {
    if (status) status.textContent = `Dissolve Edge • merged into ${result.face.length}-sided face`;
    sync();
  }, 20);
});

window.addEventListener('boxlab-bridge-state', sync);
sync();
