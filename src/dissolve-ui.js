const state = globalThis.__boxlabBridgeState;
const button = document.querySelector('#dissolveEdgeBtn');
const status = document.querySelector('#selectionStatus');
const canvas = document.querySelector('#viewport');
const multiToggle = document.querySelector('#multiSelectToggle');

function currentMesh() { return state?.mesh || null; }
function selectedEdge() {
  const ids = state?.selectedEdges || [];
  return ids.length === 1 ? ids[0] : null;
}
function dissolveInfo() {
  const mesh = currentMesh(), edgeIndex = selectedEdge();
  return mesh && Number.isInteger(edgeIndex) ? mesh.dissolveEdgeInfo?.(edgeIndex) : null;
}
function sync() {
  if (button) button.disabled = !dissolveInfo();
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
  const mesh = currentMesh(), edgeIndex = selectedEdge(), info = dissolveInfo(), history = globalThis.__boxlabHistory;
  if (!mesh || !Number.isInteger(edgeIndex) || !info || !history) return;
  const before = mesh.clone();
  const result = mesh.dissolveEdge(edgeIndex);
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
