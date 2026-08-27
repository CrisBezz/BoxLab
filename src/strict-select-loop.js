const button = document.querySelector('#selectLoopBtn');
const multiToggle = document.querySelector('#multiSelectToggle');
const canvas = document.querySelector('#viewport');
const status = document.querySelector('#selectionStatus');
let synthetic = false;

function state() { return globalThis.__boxlabBridgeState; }
function mesh() { return state()?.mesh || null; }
function selectedEdges() { return [...new Set(state()?.selectedEdges || [])]; }
function realFaces(m, edge) {
  return (edge?.faces || []).filter(fi => Number.isInteger(fi) && fi >= 0 && fi < m.faces.length && Array.isArray(m.faces[fi]));
}
function incidentEdges(m, vertex) {
  const edges = m.edges(), out = [];
  for (let i = 0; i < edges.length; i++) if (edges[i]?.a === vertex || edges[i]?.b === vertex) out.push(i);
  return out;
}
function strictContinuation(m, incomingIndex, vertex, visited) {
  const edges = m.edges(), incoming = edges[incomingIndex];
  if (!incoming) return null;
  const incident = incidentEdges(m, vertex);
  if (incident.length !== 4) return null;
  const incomingFaces = realFaces(m, incoming);
  if (incomingFaces.length !== 2 || incomingFaces.some(fi => m.faces[fi]?.length !== 4)) return null;
  const incomingFaceSet = new Set(incomingFaces);
  const candidates = incident.filter(index => index !== incomingIndex && !visited.has(index)).filter(index => {
    const faces = realFaces(m, edges[index]);
    return faces.length === 2 && faces.every(fi => m.faces[fi]?.length === 4) && faces.every(fi => !incomingFaceSet.has(fi));
  });
  return candidates.length === 1 ? candidates[0] : null;
}
function trace(m, seedIndex, startVertex, visited) {
  const edges = m.edges(), out = [];
  let incoming = seedIndex, vertex = startVertex;
  for (let guard = 0; guard < edges.length + 1; guard++) {
    const next = strictContinuation(m, incoming, vertex, visited);
    if (!Number.isInteger(next)) break;
    const edge = edges[next];
    visited.add(next);
    out.push(next);
    vertex = edge.a === vertex ? edge.b : edge.a;
    incoming = next;
  }
  return out;
}
function isClosedCycle(m, indices) {
  if (indices.length < 3) return false;
  const edges = m.edges(), degree = new Map();
  for (const index of indices) {
    const edge = edges[index];
    if (!edge) return false;
    degree.set(edge.a, (degree.get(edge.a) || 0) + 1);
    degree.set(edge.b, (degree.get(edge.b) || 0) + 1);
  }
  return degree.size === indices.length && [...degree.values()].every(value => value === 2);
}
function edgePoint(m, index, fraction = 0.5) {
  const camera = state()?.camera, edge = m.edges()[index];
  if (!camera || !edge) return null;
  const a = m.vertices[edge.a], b = m.vertices[edge.b];
  if (!a || !b) return null;
  const p = a.clone().lerp(b, fraction).project(camera), rect = canvas.getBoundingClientRect();
  return { x: rect.left + (p.x * 0.5 + 0.5) * rect.width, y: rect.top + (-p.y * 0.5 + 0.5) * rect.height };
}
function tapEdge(m, index) {
  if (selectedEdges().includes(index)) return true;
  for (const fraction of [0.5, 0.38, 0.62]) {
    const p = edgePoint(m, index, fraction);
    if (!p) continue;
    synthetic = true;
    try {
      canvas.dispatchEvent(new PointerEvent('pointerdown', { bubbles:true, cancelable:true, pointerId:93, pointerType:'mouse', isPrimary:true, button:0, buttons:1, clientX:p.x, clientY:p.y }));
      canvas.dispatchEvent(new PointerEvent('pointerup', { bubbles:true, cancelable:true, pointerId:93, pointerType:'mouse', isPrimary:true, button:0, buttons:0, clientX:p.x, clientY:p.y }));
    } finally { synthetic = false; }
    if (selectedEdges().includes(index)) return true;
  }
  return false;
}
function selectIndices(m, indices) {
  document.querySelector('#deselectAllBtn')?.click();
  const wasMulti = !!multiToggle?.checked;
  if (multiToggle && !wasMulti) {
    multiToggle.checked = true;
    multiToggle.dispatchEvent(new Event('change', { bubbles:true }));
  }
  let ok = true;
  for (const index of indices) if (!tapEdge(m, index)) ok = false;
  if (multiToggle && !wasMulti) {
    multiToggle.checked = false;
    multiToggle.dispatchEvent(new Event('change', { bubbles:true }));
  }
  return ok;
}

button?.addEventListener('click', event => {
  if (synthetic) return;
  const m = mesh(), ids = selectedEdges();
  if (!m || ids.length !== 1) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  const seedIndex = ids[0], seed = m.edges()[seedIndex];
  if (!seed) return;
  const visited = new Set([seedIndex]);
  const fromA = trace(m, seedIndex, seed.a, visited);
  const fromB = trace(m, seedIndex, seed.b, visited);
  const indices = [...fromA.reverse(), seedIndex, ...fromB];
  if (!isClosedCycle(m, indices)) {
    if (status) status.textContent = 'Select Loop • ambiguous or irregular topology — selection unchanged';
    return;
  }
  const ok = selectIndices(m, indices);
  if (status) status.textContent = ok ? `Select Loop • ${indices.length} edge quad loop selected` : 'Select Loop • selection handoff failed';
}, true);
