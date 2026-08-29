const button = document.querySelector('#selectLoopBtn');
const multiToggle = document.querySelector('#multiSelectToggle');
const canvas = document.querySelector('#viewport');
const status = document.querySelector('#selectionStatus');
let synthetic = false;

function state() { return globalThis.__boxlabBridgeState; }
function mesh() { return state()?.mesh || null; }
function selectedEdges() {
  const bridge = globalThis.__boxlabSelectionBridge;
  return bridge?.mode?.() === 'edge'
    ? [...new Set(bridge.indices?.() || [])]
    : [...new Set(state()?.selectedEdges || [])];
}
function realFaces(m, edge) {
  return (edge?.faces || []).filter(fi => Number.isInteger(fi) && fi >= 0 && fi < m.faces.length && Array.isArray(m.faces[fi]));
}
function incidentEdges(m, vertex) {
  const edges = m.edges(), out = [];
  for (let i = 0; i < edges.length; i++) if (edges[i]?.a === vertex || edges[i]?.b === vertex) out.push(i);
  return out;
}
function otherVertex(edge, vertex) {
  if (!edge) return null;
  if (edge.a === vertex) return edge.b;
  if (edge.b === vertex) return edge.a;
  return null;
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
function geometricContinuation(m, incomingIndex, vertex, visited) {
  const edges = m.edges(), incoming = edges[incomingIndex];
  if (!incoming) return null;
  const previous = otherVertex(incoming, vertex);
  const center = m.vertices[vertex], previousPoint = m.vertices[previous];
  if (!center || !previousPoint) return null;
  const travel = center.clone().sub(previousPoint);
  if (travel.lengthSq() < 1e-12) return null;
  travel.normalize();

  const scored = [];
  for (const index of incidentEdges(m, vertex)) {
    if (index === incomingIndex || visited.has(index)) continue;
    const edge = edges[index], nextVertex = otherVertex(edge, vertex), nextPoint = m.vertices[nextVertex];
    if (!nextPoint) continue;
    const direction = nextPoint.clone().sub(center);
    if (direction.lengthSq() < 1e-12) continue;
    direction.normalize();
    const score = travel.dot(direction);
    scored.push({ index, score });
  }
  scored.sort((a,b) => b.score - a.score);
  if (!scored.length) return null;
  const best = scored[0], second = scored[1];
  if (best.score < 0.35) return null;
  if (second && best.score - second.score < 0.16) return null;
  return best.index;
}
function continuation(m, incomingIndex, vertex, visited) {
  const strict = strictContinuation(m, incomingIndex, vertex, visited);
  return Number.isInteger(strict) ? strict : geometricContinuation(m, incomingIndex, vertex, visited);
}
function trace(m, seedIndex, startVertex, visited) {
  const edges = m.edges(), out = [];
  let incoming = seedIndex, vertex = startVertex;
  for (let guard = 0; guard < edges.length + 1; guard++) {
    const next = continuation(m, incoming, vertex, visited);
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
function traceLoop(m, seedIndex) {
  const seed = m.edges()[seedIndex];
  if (!seed) return null;
  const visited = new Set([seedIndex]);
  const fromA = trace(m, seedIndex, seed.a, visited);
  const fromB = trace(m, seedIndex, seed.b, visited);
  const indices = [...fromA.reverse(), seedIndex, ...fromB];
  return isClosedCycle(m, indices) ? indices : null;
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
  const m = mesh(), seeds = selectedEdges();
  if (!m || !seeds.length) return;
  event.preventDefault();
  event.stopImmediatePropagation();

  const loops = [], seenLoops = new Set();
  let rejected = 0;
  for (const seed of seeds) {
    const indices = traceLoop(m, seed);
    if (!indices) { rejected++; continue; }
    const key = [...indices].sort((a,b) => a-b).join(',');
    if (seenLoops.has(key)) continue;
    seenLoops.add(key);
    loops.push(indices);
  }
  if (!loops.length) {
    if (status) status.textContent = 'Select Loop • no unambiguous closed loop from selected edge seed(s)';
    return;
  }
  const merged = [...new Set(loops.flat())];
  const ok = selectIndices(m, merged);
  if (status) {
    const loopWord = loops.length === 1 ? 'loop' : 'loops';
    const rejectedText = rejected ? ` • ${rejected} seed${rejected===1?'':'s'} rejected` : '';
    status.textContent = ok
      ? `Select Loop • ${loops.length} ${loopWord} • ${merged.length} edges${rejectedText}`
      : 'Select Loop • selection handoff failed';
  }
}, true);
