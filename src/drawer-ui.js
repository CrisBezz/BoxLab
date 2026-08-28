const drawers = [...document.querySelectorAll('.drawer-section')];
const editDrawer = document.querySelector('#editDrawer');
const objectDrawer = document.querySelector('#objectsDrawer');

function openDrawer(drawer) {
  if (!drawer) return;
  drawer.open = true;
}

document.querySelectorAll('#selectionModes button').forEach(button => button.addEventListener('click', () => {
  openDrawer(button.dataset.mode === 'object' ? objectDrawer : editDrawer);
}));

document.querySelectorAll('#toolModes button, .mode-tools button').forEach(button => button.addEventListener('click', () => openDrawer(editDrawer)));
document.querySelectorAll('#outlinerList button, #outlinerAddBtn, #outlinerDuplicateBtn, #outlinerRenameBtn, #outlinerDeleteBtn').forEach(button => button.addEventListener('click', () => openDrawer(objectDrawer)));

drawers.forEach(drawer => drawer.addEventListener('toggle', () => {
  if (!drawer.open) return;
  for (const other of drawers) if (other !== drawer && other.dataset.keepOpen !== 'true') other.open = false;
}));
