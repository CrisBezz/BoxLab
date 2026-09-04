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
function key(a,b){ return a < b ? `${a}:${b}` : `${b}:${a}`; }
function realFaces(m, edge){
  return (edge?.faces || []).filter(fi => Number.isInteger(fi) && fi >= 0 && fi < m.faces.length && Array.isArray(m.faces[fi]));
}
function edgeIndexMap(m){
  const map = new Map();
  m.edges().forEach((edge,index) => map.set(key(edge.a, edge.b), index));
  return map;
}
function faceEdgeIndices(m, faceIndex, indexMap){
  const face = m.faces[faceIndex];
  if (!Array.isArray(face) || face.length !== 4) return null;
  const out = [];
  for (let i=0;i<4;i++) {
    const index = indexMap.get(key(face[i], face[(i+1)%4]));
    if (!Number.isInteger(index)) return null;
    out.push(index);
  }
  return out;
}
function oppositeEdge(m, faceIndex, incomingEdgeIndex, indexMap){
  const face = m.faces[faceIndex];
  const incoming = m.edges()[incomingEdgeIndex];
  if (!Array.isArray(face) || face.length !== 4 || !incoming) return null;
  for (let i=0;i<4;i++) {
    if (key(face[i], face[(i+1)%4]) !== key(incoming.a, incoming.b)) continue;
    const a = face[(i+2)%4], b = face[(i+3)%4];
    const index = indexMap.get(key(a,b));
    return Number.isInteger(index) ? index : null;
  }
  return null;
}
function walk(m, seedFace, firstEdge, indexMap, visited){
  const out = [];
  let currentFace = seedFace;
  let currentEdge = firstEdge;
  for (let guard=0; guard<m.faces.length+1; guard++) {
    const nextFaces = realFaces(m, m.edges()[currentEdge])
      .filter(fi => fi !== currentFace && m.faces[fi]?.length === 4);
    if (nextFaces.length !== 1) break;
    const nextFace = nextFaces[0];
    if (visited.has(nextFace)) break;
    visited.add(nextFace);
    out.push(nextFace);
    const nextEdge = oppositeEdge(m, nextFace, currentEdge, indexMap);
    if (!Number.isInteger(nextEdge)) break;
    currentFace = nextFace;
    currentEdge = nextEdge;
  }
  return out;
}
function traceStrip(m, seedFace, pairOffset){
  const indexMap = edgeIndexMap(m);
  const edges = faceEdgeIndices(m, seedFace, indexMap);
  if (!edges) return null;
  const visited = new Set([seedFace]);
  const before = walk(m, seedFace, edges[pairOffset], indexMap, visited);
  const after = walk(m, seedFace, edges[(pairOffset+2)%4], indexMap, visited);
  const indices = [...before.reverse(), seedFace, ...after];
  return indices.length > 1 ? indices : null;
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
