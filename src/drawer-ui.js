const drawers = [...document.querySelectorAll('.drawer-section')];
const editDrawer = document.querySelector('#editDrawer');
const objectDrawer = document.querySelector('#objectsDrawer');

function openDrawer(drawer) {
  if (!drawer) return;
  drawer.open = true;
}

function syncDrawerToMode(mode = document.querySelector('#selectionModes button.active')?.dataset?.mode) {
  const target = mode === 'object' ? objectDrawer : editDrawer;
  const other = mode === 'object' ? editDrawer : objectDrawer;
  if (target) target.open = true;
  if (other && other.dataset.keepOpen !== 'true') other.open = false;
}

document.querySelectorAll('#selectionModes button').forEach(button => button.addEventListener('click', () => {
  syncDrawerToMode(button.dataset.mode);
}));

document.querySelectorAll('#toolModes button, .mode-tools button').forEach(button => button.addEventListener('click', () => {
  openDrawer(button.closest('.drawer-section') || editDrawer);
}));
document.querySelectorAll('#outlinerList button, #outlinerAddBtn, #outlinerDuplicateBtn, #outlinerRenameBtn, #outlinerDeleteBtn').forEach(button => button.addEventListener('click', () => openDrawer(objectDrawer)));

drawers.forEach(drawer => drawer.addEventListener('toggle', () => {
  if (!drawer.open) return;
  for (const other of drawers) if (other !== drawer && other.dataset.keepOpen !== 'true') other.open = false;
}));

function installGroupUiPolish() {
  if (!document.querySelector('#boxlabGroupUiPolish')) {
    const style = document.createElement('style');
    style.id = 'boxlabGroupUiPolish';
    style.textContent = `
#objectGroupTools{display:grid!important;grid-template-columns:1fr!important;margin:5px 0 3px!important}
#objectGroupTools>span{display:none!important}
#objectGroupTools button{width:100%;font-size:11px;padding:5px 8px!important}
#objectGroupTools button[disabled]{display:none!important}
.boxlab-group-tag{font-size:9px!important;line-height:1!important;padding:2px 4px!important;border:0!important;border-radius:5px!important;opacity:.45!important;margin-left:3px!important;background:rgba(255,255,255,.06)!important;letter-spacing:-.2px!important;pointer-events:none}
`;
    document.head.appendChild(style);
  }
  const group = document.querySelector('#objectGroupTools [data-group-action="group"]');
  const ungroup = document.querySelector('#objectGroupTools [data-group-action="ungroup"]');
  if (group) { group.textContent = 'Group Selection'; group.title = 'Group selected objects'; }
  if (ungroup) { ungroup.textContent = 'Ungroup'; ungroup.title = 'Ungroup the selected group'; }
}

syncDrawerToMode();

import('./object-management.js?v=0.36.9.0').catch(error => console.warn('BoxLab object management failed to load', error));
import('./object-drawer-retain.js?v=0.36.1.4').catch(error => console.warn('BoxLab object drawer retain failed to load', error));
import('./studio-scene-fix.js?v=0.36.8.1').catch(error => console.warn('BoxLab Studio scene fix failed to load', error));
import('./extrude-through-viability.js?v=0.36.11.2').catch(error => console.warn('BoxLab Extrude Through viability guard failed to load', error));
import('./through-breakout-cleanup.js?v=0.36.14.7').catch(error => console.warn('BoxLab Through breakout cleanup failed to load', error));
import('./object-origin.js?v=0.36.4.0-recovery1').then(() => {
  installGroupUiPolish();
  syncDrawerToMode();
  const version = document.querySelector('#appVersion');
  if (version) version.textContent = 'v0.36.14.7';
  document.title = 'BoxLab v0.36.14.7';
}).catch(error => console.warn('BoxLab object origin failed to load', error));
