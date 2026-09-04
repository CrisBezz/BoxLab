const objectDrawer = document.querySelector('#objectsDrawer');
const toolModes = document.querySelector('#toolModes');
const drawerActions = document.querySelector('#objectsDrawer .drawer-content');

function currentMode() {
  return document.querySelector('#selectionModes button.active')?.dataset?.mode || 'face';
}

function ensureObjectsDrawerOpen() {
  if (currentMode() !== 'object' || !objectDrawer) return;
  objectDrawer.open = true;
}

function restoreObjectsDrawer() {
  if (currentMode() !== 'object' || !objectDrawer) return;

  // Object creation/duplication can trigger several synchronous and deferred
  // activation/mode updates. Hold the Objects drawer open until that small
  // transition window has fully settled instead of winning only the first race.
  ensureObjectsDrawerOpen();
  queueMicrotask(ensureObjectsDrawerOpen);
  requestAnimationFrame(() => {
    ensureObjectsDrawerOpen();
    requestAnimationFrame(ensureObjectsDrawerOpen);
  });
  setTimeout(ensureObjectsDrawerOpen, 40);
}

toolModes?.addEventListener('click', restoreObjectsDrawer);
drawerActions?.addEventListener('click', event => {
  if (!event.target.closest('button')) return;
  restoreObjectsDrawer();
});

// Activation after Add/Duplicate rebuilds the outliner. Reassert the intended
// Object-mode drawer state once that rebuild lands as well.
const outliner = document.querySelector('#outlinerList');
if (outliner) {
  new MutationObserver(() => {
    if (currentMode() === 'object' && objectDrawer?.open) restoreObjectsDrawer();
  }).observe(outliner, { childList:true });
}
