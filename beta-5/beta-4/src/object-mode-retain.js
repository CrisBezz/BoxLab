// BoxLab v0.36.18.4 — retain Object mode while switching active objects.
// Object activation internally clears component selection by clicking the active
// selection-mode button. In Object mode that can fall back to Face and close the
// Objects drawer. Restore Object mode only for interactions that began in Object
// mode and actually target object selection, leaving deliberate mode changes alone.

const canvas = document.querySelector('#viewport');
const objectButton = document.querySelector('#selectionModes button[data-mode="object"]');
const objectsDrawer = document.querySelector('#objectsDrawer');

function objectModeActive() {
  return !!objectButton?.classList.contains('active');
}

function restoreObjectMode() {
  if (!objectButton) return;
  if (!objectModeActive()) objectButton.click();
  if (objectsDrawer) objectsDrawer.open = true;
}

function deferRestore() {
  queueMicrotask(() => requestAnimationFrame(restoreObjectMode));
}

// Viewport object picking happens on pointerdown. Capture at window level so we
// remember that the gesture started in Object mode before activation handlers run.
window.addEventListener('pointerdown', event => {
  if (!objectModeActive() || event.target !== canvas || event.pointerType === 'touch') return;
  deferRestore();
}, { capture:true, passive:true });

// Outliner activation happens on click of an object name. Again, remember the
// mode before the target's activation handler swaps the live mesh.
document.addEventListener('click', event => {
  if (!objectModeActive()) return;
  if (!event.target?.closest?.('#outlinerList .outliner-name')) return;
  deferRestore();
}, { capture:true, passive:true });

globalThis.__boxlabObjectModeRetain = { version:'0.36.18.4' };
