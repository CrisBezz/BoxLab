const state = globalThis.__boxlabBridgeState;
const edgeButton = document.querySelector('#dissolveEdgeBtn');
const loopButton = document.querySelector('#dissolveLoopBtn');
const status = document.querySelector('#selectionStatus');
const multiToggle = document.querySelector('#multiSelectToggle');

function bridge(){ return globalThis.__boxlabSelectionBridge; }
function currentMesh() { return state?.mesh || null; }
function selectedEdges() {
  const b=bridge();
  return b?.mode?.()==='edge' ? [...new Set(b.indices?.()||[])] : [...new Set(state?.selectedEdges || [])];
}
function activeLoopEdges() {
  const edgeObjects = state?.edgeObjects;
  if (!(edgeObjects instanceof Map)) return [];
  return [...edgeObjects.entries()]
    .filter(([, object]) => object?.renderOrder === 27)
    .map(([index]) => index)
    .filter(Number.isInteger)
    .sort((a, b) => a - b);
}
function edgeInfo() {
  const mesh = currentMesh(), ids = selectedEdges();
  if (!mesh || !ids.length) return null;
  const info = mesh.dissolveEdgesInfo?.(ids);
  return info ? { mesh, ids, info } : null;
}
function loopInfo() {
  const mesh = currentMesh();
  if (!mesh) return null;

  const selected = selectedEdges();
  if (selected.length >= 3) {
    const info = mesh.dissolveLoopInfo?.(selected);
    if (info) return { mesh, ids: selected, info, source: 'selection' };
  }

  const active = activeLoopEdges();
  if (active.length >= 3) {
    const info = mesh.dissolveLoopInfo?.(active);
    if (info) return { mesh, ids: active, info, source: 'active' };
  }
  return null;
}
function sync() {
  if (edgeButton) {
    const mode=edgeInfo();
    edgeButton.disabled = !mode;
    edgeButton.textContent = mode?.ids?.length > 1 ? `Dissolve ${mode.ids.length} Edges` : 'Dissolve Edge';
  }
  if (loopButton) {
    const mode = loopInfo();
    loopButton.disabled = !mode;
    loopButton.textContent = mode?.source === 'active' ? 'Dissolve Active Loop' : 'Dissolve Loop';
  }
}
function clearMultiSelectionAfterTopologyChange() {
  if (multiToggle?.checked) {
    multiToggle.checked = false;
    multiToggle.dispatchEvent(new Event('change', { bubbles:true }));
  }
}
function forceRender(){ document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true})); }
function stayEdgeMode(){
  const button=document.querySelector('#selectionModes button[data-mode="edge"]');
  if(!button?.classList.contains('active')) button?.click();
  bridge()?.set?.('edge',[]);
  forceRender();
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
  const slide = document.querySelector('#loopSlide');
  if (slide) slide.disabled = true;
  stayEdgeMode();
  setTimeout(() => {
    if (status) status.textContent = `${mode.source === 'active' ? 'Dissolve Active Loop' : 'Dissolve Loop'} • removed ${result.removedEdges} edges + ${result.removedVertices} vertices • Edge mode`;
    sync();
  }, 20);
});

edgeButton?.addEventListener('click', () => {
  const mode = edgeInfo(), history = globalThis.__boxlabHistory;
  if (!mode || !history) return;
  const before = mode.mesh.clone();
  const result = mode.mesh.dissolveEdges(mode.ids);
  if (!result) {
    if (status) status.textContent = mode.ids.length>1 ? 'Multi Dissolve failed • selected edges cannot all be dissolved together' : 'Dissolve Edge failed • invalid topology';
    sync();
    return;
  }
  history.push(before);
  clearMultiSelectionAfterTopologyChange();
  stayEdgeMode();
  setTimeout(() => {
    if (status) status.textContent = `${result.dissolvedEdges>1?'Multi Dissolve':'Dissolve Edge'} • removed ${result.dissolvedEdges} edge${result.dissolvedEdges===1?'':'s'} • Edge mode`;
    sync();
  }, 20);
});

window.addEventListener('boxlab-bridge-state', sync);
sync();
