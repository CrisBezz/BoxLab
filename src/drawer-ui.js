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

document.querySelectorAll('#toolModes button, .mode-tools button').forEach(button => button.addEventListener('click', () => {
  // Some controls (notably Crease) are moved into Modifiers by the compact
  // drawer layout. Respect the control's current drawer rather than the
  // drawer it belonged to when this listener was installed.
  openDrawer(button.closest('.drawer-section') || editDrawer);
}));
document.querySelectorAll('#outlinerList button, #outlinerAddBtn, #outlinerDuplicateBtn, #outlinerRenameBtn, #outlinerDeleteBtn').forEach(button => button.addEventListener('click', () => openDrawer(objectDrawer)));

drawers.forEach(drawer => drawer.addEventListener('toggle', () => {
  if (!drawer.open) return;
  for (const other of drawers) if (other !== drawer && other.dataset.keepOpen !== 'true') other.open = false;
}));

import('./object-management.js?v=0.36.0.0').catch(error => console.warn('BoxLab object management failed to load', error));
import('./object-drawer-retain.js?v=0.36.1.4').catch(error => console.warn('BoxLab object drawer retain failed to load', error));
import('./studio-scene-fix.js?v=0.36.2.0').catch(error => console.warn('BoxLab Studio scene fix failed to load', error));
import('./object-origin.js?v=0.36.3.2').catch(error => console.warn('BoxLab object origin failed to load', error));
