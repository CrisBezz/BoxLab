const multiToggle = document.querySelector('#multiSelectToggle');
const status = document.querySelector('#selectionStatus');

function finishSelectionForTransform(tool) {
  if (!multiToggle?.checked) return;
  multiToggle.checked = false;
  multiToggle.dispatchEvent(new Event('change', { bubbles: true }));
  setTimeout(() => {
    if (status) status.textContent = `${tool === 'scale' ? 'Scale' : 'Move'} ready • selected group preserved`;
  }, 0);
}

document.querySelectorAll('#toolModes button').forEach(button => {
  button.addEventListener('click', () => finishSelectionForTransform(button.dataset.tool), true);
});
