const state = globalThis.__boxlabBridgeState;
const button = document.querySelector('#bevelBtn');
const widthInput = document.querySelector('#bevelWidth');
const widthOut = document.querySelector('#bevelWidthOut');
const segmentsInput = document.querySelector('#bevelSegments');
const segmentsOut = document.querySelector('#bevelSegmentsOut');
const status = document.querySelector('#selectionStatus');
const multiToggle = document.querySelector('#multiSelectToggle');

function currentMesh() { return state?.mesh || null; }
function selectedEdges() { return [...new Set(state?.selectedEdges || [])]; }

function info() {
  const mesh = currentMesh(), edges = selectedEdges();
  return mesh?.bevelEdgeLoopInfo?.(edges) || null;
}

function syncLabel() {
  const segments = Math.max(1, Number(segmentsInput?.value || 1));
  if (button) button.textContent = segments === 1 ? 'Chamfer Loop' : `Bevel Loop ×${segments}`;
  if (segmentsOut) segmentsOut.textContent = String(segments);
  if (widthOut) widthOut.textContent = `${Number(widthInput?.value || 20)}%`;
}

function sync() {
  if (button) button.disabled = !info();
  syncLabel();
}

widthInput?.addEventListener('input', syncLabel);
segmentsInput?.addEventListener('input', syncLabel);

button?.addEventListener('click', () => {
  const mesh = currentMesh(), valid = info();
  if (!mesh || !valid || !globalThis.__boxlabHistory) return;
  const width = Math.max(2, Math.min(45, Number(widthInput?.value || 20))) / 100;
  const segments = Math.max(1, Math.min(4, Math.round(Number(segmentsInput?.value || 1))));
  const before = mesh.clone();
  const result = mesh.bevelEdgeLoop(valid.edgeIndices, width, segments);
  if (!result) {
    if (status) status.textContent = 'Bevel unavailable • loop topology changed';
    sync();
    return;
  }

  globalThis.__boxlabHistory.push(before);
  if (multiToggle?.checked) {
    multiToggle.checked = false;
    multiToggle.dispatchEvent(new Event('change', { bubbles: true }));
  }
  document.querySelector('#selectionModes button[data-mode="edge"]')?.click();
  setTimeout(() => {
    if (status) status.textContent = `${segments === 1 ? 'Chamfer' : 'Bevel'} created • ${result.edgeCount} edges • ${segments} segment${segments === 1 ? '' : 's'} • ${Math.round(width * 100)}%`;
    sync();
  }, 0);
});

window.addEventListener('boxlab-bridge-state', sync);
sync();
