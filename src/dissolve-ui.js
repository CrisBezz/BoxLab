const state = globalThis.__boxlabBridgeState;
const button = document.querySelector('#dissolveEdgeBtn');
const status = document.querySelector('#selectionStatus');
const canvas = document.querySelector('#viewport');
const multiToggle = document.querySelector('#multiSelectToggle');

function currentMesh() { return state?.mesh || null; }
function selectedEdges() { return [...new Set(state?.selectedEdges || [])]; }
function dissolveMode() {
  const mesh = currentMesh(), ids = selectedEdges();
  if (!mesh || !ids.length) return null;
  if (ids.length === 1) {
    const info = mesh.dissolveEdgeInfo?.(ids[0]);
    return info ? { type: 'edge', mesh, ids, info } : null;
  }
  const info = mesh.dissolveLoopInfo?.(ids);
  return info ? { type: 'loop', mesh, ids, info } : null;
}
function sync() {
  const mode = dissolveMode();
  if (button) {
    button.disabled = !mode;
    button.textContent = mode?.type === 'loop' ? 'Dissolve Loop' : 'Dissolve Edge';
  }
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

button?.addEventListener('click', () => {
  const mode = dissolveMode(), history = globalThis.__boxlabHistory;
  if (!mode || !history) return;
  const { mesh, ids, type } = mode;
  const before = mesh.clone();

  if (type === 'loop') {
    const result = mesh.dissolveLoop(ids);
    if (!result) {
      if (status) status.textContent = 'Dissolve Loop failed • invalid or changed topology';
      sync();
      return;
    }
    history.push(before);
    if (multiToggle?.checked) {
      multiToggle.checked = false;
      multiToggle.dispatchEvent(new Event('change', { bubbles:true }));
    }
    document.querySelector('#deselectAllBtn')?.click();
    document.querySelector('#cageToggle')?.dispatchEvent(new Event('change', { bubbles:true }));
    setTimeout(() => {
      if (status) status.textContent = `Dissolve Loop • removed ${result.removedEdges} edges + ${result.removedVertices} vertices`;
      sync();
    }, 20);
    return;
  }

  const result = mesh.dissolveEdge(ids[0]);
  if (!result) {
    if (status) status.textContent = 'Dissolve Edge failed • invalid topology';
    sync();
    return;
  }
  history.push(before);
  if (multiToggle?.checked) {
    multiToggle.checked = false;
    multiToggle.dispatchEvent(new Event('change', { bubbles:true }));
  }
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change', { bubbles:true }));
  selectMergedFace(mesh, result.faceIndex);
  setTimeout(() => { if (status) status.textContent = `Dissolve Edge • merged into ${result.face.length}-sided face`; }, 20);
});

window.addEventListener('boxlab-bridge-state', sync);
sync();
