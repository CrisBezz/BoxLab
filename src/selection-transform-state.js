const multiToggle = document.querySelector('#multiSelectToggle');
const status = document.querySelector('#selectionStatus');

function selectedCount() {
  const state = globalThis.__boxlabBridgeState;
  const activeMode = document.querySelector('#selectionModes button.active')?.dataset?.mode;
  if (activeMode === 'edge') return state?.selectedEdges?.length || 0;
  if (activeMode === 'face') return state?.selectedFaces?.length || 0;
  return 0;
}

function finishSelectionForTransform(tool) {
  if (!multiToggle?.checked) return;
  const count = selectedCount();
  if (count < 2) return;
  multiToggle.checked = false;
  multiToggle.dispatchEvent(new Event('change', { bubbles: true }));
  setTimeout(() => {
    if (status) status.textContent = `${count} components selected • ${tool === 'scale' ? 'Scale' : 'Move'} ready`;
  }, 0);
}

document.querySelectorAll('#toolModes button').forEach(button => {
  button.addEventListener('click', () => finishSelectionForTransform(button.dataset.tool), true);
});
