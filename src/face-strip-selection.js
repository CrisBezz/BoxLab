import {traceStrip} from './face-selection-regions.js?v=0.36.18.1004';
const loopButton = document.querySelector('#selectLoopBtn');
const ringButton = document.querySelector('#selectRingBtn');
const status = document.querySelector('#selectionStatus');
const geometrySnap = document.querySelector('#inferenceSnapToggle');

function bridge(){ return globalThis.__boxlabSelectionBridge; }
function state(){ return globalThis.__boxlabBridgeState; }
function mesh(){ return state()?.mesh || null; }
function mode(){ return bridge()?.mode?.() || null; }
function selectedFaces(){
  return mode() === 'face' ? [...new Set(bridge()?.indices?.() || [])] : [];
}
function applyFaceStrips(kind){
  const m = mesh(), seeds = selectedFaces();
  if (!m || !seeds.length) return false;
  const pairOffset = kind === 'ring' ? 1 : 0;
  const merged = new Set();
  let accepted = 0, rejected = 0;
  for (const seed of seeds) {
    const strip = traceStrip(m, seed, pairOffset);
    if (!strip) { rejected++; continue; }
    accepted++;
    strip.forEach(index => merged.add(index));
  }
  if (!merged.size) {
    if (status) status.textContent = `Face ${kind === 'ring' ? 'Ring' : 'Loop'} • no clean quad-strip continuation`;
    return true;
  }
  bridge()?.set?.('face', [...merged]);
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));
  if (status) status.textContent = `Face ${kind === 'ring' ? 'Ring' : 'Loop'} • ${merged.size} faces selected${rejected ? ` • ${rejected} seed${rejected===1?'':'s'} stopped` : ''}`;
  syncSoon();
  return true;
}
function faceModeActive(){ return mode() === 'face'; }
function sync(){
  if (!faceModeActive()) return;
  const enabled = selectedFaces().length > 0;
  if (loopButton) loopButton.disabled = !enabled;
  if (ringButton) ringButton.disabled = !enabled;
}
function syncSoon(){ setTimeout(sync,0); }

// Startup should be neutral: Geometry Snap is opt-in rather than silently active.
if (geometrySnap) geometrySnap.checked = false;

loopButton?.addEventListener('click', event => {
  if (!faceModeActive()) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  applyFaceStrips('loop');
}, true);
ringButton?.addEventListener('click', event => {
  if (!faceModeActive()) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  applyFaceStrips('ring');
}, true);

document.querySelectorAll('#selectionModes button').forEach(button => button.addEventListener('click', syncSoon));
document.addEventListener('pointerup', syncSoon, true);
document.addEventListener('click', event => {
  if (event.target !== loopButton && event.target !== ringButton) syncSoon();
}, true);
window.addEventListener('boxlab-bridge-state', syncSoon);
syncSoon();
