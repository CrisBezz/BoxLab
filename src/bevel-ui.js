const button = document.querySelector('#bevelBtn');
const widthInput = document.querySelector('#bevelWidth');
const widthOut = document.querySelector('#bevelWidthOut');
const segmentsInput = document.querySelector('#bevelSegments');
const segmentsOut = document.querySelector('#bevelSegmentsOut');
const status = document.querySelector('#selectionStatus');
const multiToggle = document.querySelector('#multiSelectToggle');
let pendingHighlight = null;

function state() { return globalThis.__boxlabBridgeState; }
function currentMesh() { return state()?.mesh || null; }
function selectedEdges() { return [...new Set(state()?.selectedEdges || [])]; }

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

function forceRender() {
  const cage = document.querySelector('#cageToggle');
  cage?.dispatchEvent(new Event('change', { bubbles:true }));
}

function highlightEdges(indices, hex, renderOrder = 38) {
  let count = 0;
  const edgeObjects = state()?.edgeObjects;
  for (const index of indices || []) {
    const line = edgeObjects?.get(index);
    if (!line?.material?.clone) continue;
    const material = line.material.clone();
    material.color?.setHex?.(hex);
    material.depthTest = false;
    line.material = material;
    line.renderOrder = renderOrder;
    count++;
  }
  return count;
}

function applyPendingHighlight() {
  if (!pendingHighlight) return;
  const rings = pendingHighlight.ringEdgeIndices || [];
  let visible = 0;
  rings.forEach((ring, index) => {
    const boundary = index === 0 || index === rings.length - 1;
    visible += highlightEdges(ring, boundary ? 0x62d8ff : 0xffe14a, boundary ? 38 : 39);
  });
  if (!visible) return;
  const { segments, width } = pendingHighlight;
  if (status) status.textContent = `${segments === 1 ? 'Chamfer' : 'Bevel'} created • ${rings.length} ring${rings.length === 1 ? '' : 's'} highlighted • ${segments} segment${segments === 1 ? '' : 's'} • ${Math.round(width * 100)}%`;
  pendingHighlight = null;
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
  pendingHighlight = result;
  forceRender();
  requestAnimationFrame(() => {
    applyPendingHighlight();
    if (pendingHighlight) requestAnimationFrame(applyPendingHighlight);
  });
  if (status) status.textContent = `${segments === 1 ? 'Chamfer' : 'Bevel'} created • ${result.edgeCount} source edges • ${result.ringEdgeIndices?.length || 0} generated rings • ${Math.round(width * 100)}%`;
  sync();
});

window.addEventListener('boxlab-bridge-state', () => {
  sync();
  applyPendingHighlight();
});
sync();
