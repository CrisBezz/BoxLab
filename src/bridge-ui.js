const state = globalThis.__boxlabBridgeState;
const edgeButton = document.querySelector('#bridgeEdgesBtn');
const faceButton = document.querySelector('#bridgeFacesBtn');
const status = document.querySelector('#selectionStatus');
const multiToggle = document.querySelector('#multiSelectToggle');

function currentMesh() {
  return state?.mesh || null;
}

function edgeInfo() {
  const mesh = currentMesh();
  return mesh?.bridgeEdgeSelectionInfo?.(state?.selectedEdges || []) || null;
}

function faceInfo() {
  const mesh = currentMesh();
  return mesh?.bridgeFaceSelectionInfo?.(state?.selectedFaces || []) || null;
}

function sync() {
  if (edgeButton) edgeButton.disabled = !edgeInfo();
  if (faceButton) faceButton.disabled = !faceInfo();
}

function finishBridge(result, before) {
  const history = globalThis.__boxlabHistory;
  if (!result || !history) return false;
  history.push(before);
  if (multiToggle?.checked) {
    multiToggle.checked = false;
    multiToggle.dispatchEvent(new Event('change', { bubbles: true }));
  }
  document.querySelector('#selectionModes button[data-mode="face"]')?.click();
  setTimeout(() => {
    if (status) status.textContent = `Bridge created • ${result.faceIndices.length} quads`;
    sync();
  }, 0);
  return true;
}

edgeButton?.addEventListener('click', () => {
  const mesh = currentMesh(), info = edgeInfo();
  if (!mesh || !info || !globalThis.__boxlabHistory) return;
  const before = mesh.clone();
  const result = mesh.bridgeSelectedEdges(state.selectedEdges);
  finishBridge(result, before);
});

faceButton?.addEventListener('click', () => {
  const mesh = currentMesh(), info = faceInfo();
  if (!mesh || !info || !globalThis.__boxlabHistory) return;
  const before = mesh.clone();
  const result = mesh.bridgeSelectedFaces(state.selectedFaces);
  finishBridge(result, before);
});

window.addEventListener('boxlab-bridge-state', sync);
sync();
