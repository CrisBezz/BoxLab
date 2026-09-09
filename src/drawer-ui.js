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
import('./lasso-select.js?v=0.36.17.3').catch(error => console.warn('BoxLab Lasso Select failed to load', error));
import('./cross-object-snap.js?v=0.36.18.6').catch(error => console.warn('BoxLab cross-object snap failed to load', error));
import('./object-mode-retain.js?v=0.36.18.4').catch(error => console.warn('BoxLab object mode retain failed to load', error));
import('./transform-state-fix.js?v=0.36.18.5').catch(error => console.warn('BoxLab transform state fix failed to load', error));
import('./persistent-face-tool-select.js?v=0.36.18.7').catch(error => console.warn('BoxLab persistent face tool selection failed to load', error));
import('./precision-face.js?v=0.36.18.74').catch(error => console.warn('BoxLab Face precision failed to load', error));
import('./repeat-face-previous.js?v=0.36.18.76').catch(error => console.warn('BoxLab Repeat Previous Face failed to load', error));
import('./sequential-through-fallback.js?v=0.36.18.12').catch(error => console.warn('BoxLab sequential Through fallback failed to load', error));
import('./precision-transform.js?v=0.36.18.14').catch(error => console.warn('BoxLab precision transform failed to load', error));
import('./precision-bevel.js?v=0.36.18.32').catch(error => console.warn('BoxLab precision bevel failed to load', error));
import('./precision-edge-slide.js?v=0.36.18.16').catch(error => console.warn('BoxLab precision Edge Slide failed to load', error));
import('./loop-offset.js?v=0.36.18.17').catch(error => console.warn('BoxLab Offset Loop failed to load', error));
import('./precision-offset-loop.js?v=0.36.18.18').catch(error => console.warn('BoxLab precision Offset Loop failed to load', error));
import('./edge-context-ui.js?v=0.36.18.35').catch(error => console.warn('BoxLab contextual Edge controls failed to load', error));
import('./collapse-edge.js?v=0.36.18.36').catch(error => console.warn('BoxLab Collapse Edge failed to load', error));
import('./vertex-merge.js?v=0.36.18.37').catch(error => console.warn('BoxLab Vertex Merge failed to load', error));
import('./merge-by-distance.js?v=0.36.18.41').catch(error => console.warn('BoxLab Merge by Distance failed to load', error));
import('./face-reconstruct.js?v=0.36.18.75').catch(error => console.warn('BoxLab Face Reconstruction failed to load', error));
import('./join-coplanar.js?v=0.36.18.75').catch(error => console.warn('BoxLab Join Coplanar failed to load', error));
import('./clean-vertices.js?v=0.36.18.39').catch(error => console.warn('BoxLab Clean Vertices failed to load', error));
import('./select-loose-vertices.js?v=0.36.18.56').catch(error => console.warn('BoxLab Select Loose Vertices failed to load', error));
import('./safe-loose-vertex-delete.js?v=0.36.18.71').catch(error => console.warn('BoxLab safe loose Vertex Delete failed to load', error));
import('./edge-topology-layout.js?v=0.36.18.40').catch(error => console.warn('BoxLab Edge topology layout failed to load', error));
import('./select-non-manifold.js?v=0.36.18.75').catch(error => console.warn('BoxLab Select Non-Manifold failed to load', error));
import('./select-loose-edges.js?v=0.36.18.75').catch(error => console.warn('BoxLab Select Loose Edges failed to load', error));
import('./select-ngons.js?v=0.36.18.45').catch(error => console.warn('BoxLab Select Ngons failed to load', error));
import('./select-triangles.js?v=0.36.18.46').catch(error => console.warn('BoxLab Select Triangles failed to load', error));
import('./select-non-quads.js?v=0.36.18.47').catch(error => console.warn('BoxLab Select Non-Quads failed to load', error));
import('./select-non-planar.js?v=0.36.18.48').catch(error => console.warn('BoxLab Select Non-Planar failed to load', error));
import('./face-inspection-layout.js?v=0.36.18.49').catch(error => console.warn('BoxLab Face inspection layout failed to load', error));
import('./select-degenerate-faces.js?v=0.36.18.58').catch(error => console.warn('BoxLab Select Degenerate Faces failed to load', error));
import('./select-duplicate-faces.js?v=0.36.18.59').catch(error => console.warn('BoxLab Select Duplicate Faces failed to load', error));
import('./select-isolated-faces.js?v=0.36.18.60').catch(error => console.warn('BoxLab Select Isolated Faces failed to load', error));
import('./select-boundary-faces.js?v=0.36.18.61').catch(error => console.warn('BoxLab Select Boundary Faces failed to load', error));
import('./select-interior-faces.js?v=0.36.18.62').catch(error => console.warn('BoxLab Select Interior Faces failed to load', error));
import('./select-non-manifold-faces.js?v=0.36.18.63').catch(error => console.warn('BoxLab Select Non-Manifold Faces failed to load', error));
import('./select-inconsistent-winding.js?v=0.36.18.64').catch(error => console.warn('BoxLab Select Inconsistent Winding failed to load', error));
import('./select-self-intersecting-faces.js?v=0.36.18.65').catch(error => console.warn('BoxLab Select Self-Intersecting Faces failed to load', error));
import('./select-concave-faces.js?v=0.36.18.66').catch(error => console.warn('BoxLab Select Concave Faces failed to load', error));
import('./select-convex-faces.js?v=0.36.18.67').catch(error => console.warn('BoxLab Select Convex Faces failed to load', error));
import('./select-flat-faces.js?v=0.36.18.68').catch(error => console.warn('BoxLab Select Flat Faces failed to load', error));
import('./select-coplanar-region.js?v=0.36.18.69').catch(error => console.warn('BoxLab Select Coplanar Region failed to load', error));
import('./join-selected-coplanar-faces.js?v=0.36.18.75').catch(error => console.warn('BoxLab Join Selected Coplanar Faces failed to load', error));
import('./select-face-islands.js?v=0.36.18.72').catch(error => console.warn('BoxLab Select Face Islands failed to load', error));
import('./select-connected-shell.js?v=0.36.18.73').catch(error => console.warn('BoxLab Select Connected Shell failed to load', error));
import('./selection-workflow-polish.js?v=0.36.18.31').catch(error => console.warn('BoxLab selection workflow polish failed to load', error));
import('./selection-conversion-polish.js?v=0.36.18.20').catch(error => console.warn('BoxLab selection conversion polish failed to load', error));
import('./selection-set-polish.js?v=0.36.18.21').catch(error => console.warn('BoxLab selection set polish failed to load', error));
import('./vertex-slide-polish.js?v=0.36.18.23').catch(error => console.warn('BoxLab Vertex Slide polish failed to load', error));
import('./dissolve-selection-polish.js?v=0.36.18.28').catch(error => console.warn('BoxLab Dissolve selection polish failed to load', error));
import('./selection-history-safe.js?v=0.36.18.34').catch(error => console.warn('BoxLab selection-aware history failed to load', error));
// Normal Through remains owned by multi-face-direct + through-kernel; fallback only wakes when kernel planning fails.
import('./object-origin.js?v=0.36.4.0-recovery1').then(() => {
  installGroupUiPolish();
  syncDrawerToMode();
  const version = document.querySelector('#appVersion');
  if (version) version.textContent = 'v0.36.18.76';
  document.title = 'BoxLab v0.36.18.76';
}).catch(error => console.warn('BoxLab object origin failed to load', error));
