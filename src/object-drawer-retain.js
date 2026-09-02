const objectDrawer = document.querySelector('#objectsDrawer');
const toolModes = document.querySelector('#toolModes');
const drawerActions = document.querySelector('#objectsDrawer .drawer-content');

function currentMode() {
  return document.querySelector('#selectionModes button.active')?.dataset?.mode || 'face';
}

function restoreObjectsDrawer() {
  if (currentMode() !== 'object' || !objectDrawer) return;
  requestAnimationFrame(() => {
    objectDrawer.open = true;
  });
}

toolModes?.addEventListener('click', restoreObjectsDrawer);
drawerActions?.addEventListener('click', event => {
  if (!event.target.closest('button')) return;
  restoreObjectsDrawer();
});

const version = document.querySelector('#appVersion');
if (version) version.textContent = 'v0.36.1.3';
document.title = 'BoxLab v0.36.1.3';
