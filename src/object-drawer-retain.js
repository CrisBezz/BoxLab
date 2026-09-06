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

const outliner = document.querySelector('#outlinerList');
if (outliner) {
  new MutationObserver(() => {
    if (currentMode() === 'object' && objectDrawer?.open) restoreObjectsDrawer();
  }).observe(outliner, { childList:true });
}
