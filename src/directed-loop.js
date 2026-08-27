const state = globalThis.__boxlabBridgeState;
const button = document.querySelector('#selectLoopBtn');
const multiToggle = document.querySelector('#multiSelectToggle');
const canvas = document.querySelector('#viewport');
const status = document.querySelector('#selectionStatus');

function currentMesh() { return state?.mesh || null; }
function selectedEdgeIds() { return [...new Set(state?.selectedEdges || [])]; }
function realFaces(mesh, edge) {
  return (edge?.faces || []).filter(fi => Number.isInteger(fi) && fi >= 0 && fi < mesh.faces.length && Array.isArray(mesh.faces[fi]));
}

function orderedSeed(mesh, ids) {
  const edges = mesh.edges();
  const selected = new Set(ids);
  const byVertex = new Map();

  for (const index of ids) {
    const edge = edges[index];
    if (!edge) return null;
    if (!byVertex.has(edge.a)) byVertex.set(edge.a, []);
    if (!byVertex.has(edge.b)) byVertex.set(edge.b, []);
    byVertex.get(edge.a).push(index);
    byVertex.get(edge.b).push(index);
  }

  if ([...byVertex.values()].some(list => list.length > 2)) return null;

  const ends = [...byVertex.entries()].filter(([, list]) => list.length === 1).map(([vertex]) => vertex);
  if (ends.length !== 0 && ends.length !== 2) return null;

  const startVertex = ends.length ? ends[0] : byVertex.keys().next().value;
  const edgeOrder = [];
  const vertexOrder = [startVertex];
  const visited = new Set();
  let currentVertex = startVertex;
  let previousEdge = null;

  for (let guard = 0; guard < ids.length + 1; guard++) {
    const nextEdge = (byVertex.get(currentVertex) || []).find(index => index !== previousEdge && !visited.has(index));
    if (nextEdge === undefined) break;
    const edge = edges[nextEdge];
    visited.add(nextEdge);
    edgeOrder.push(nextEdge);
    const nextVertex = edge.a === currentVertex ? edge.b : edge.a;
    vertexOrder.push(nextVertex);
    previousEdge = nextEdge;
    currentVertex = nextVertex;
    if (currentVertex === startVertex) break;
  }

  if (visited.size !== selected.size) return null;
  const closed = ends.length === 0;
  return { edgeOrder, vertexOrder, closed };
}

function commonGuideFaces(mesh, edgeIndices) {
  let common = null;
  for (const index of edgeIndices) {
    const faces = new Set(realFaces(mesh, mesh.edges()[index]));
    common = common === null ? faces : new Set([...common].filter(face => faces.has(face)));
    if (!common.size) break;
  }
  return common || new Set();
}

function seedPlaneNormal(mesh, vertexOrder) {
  if (vertexOrder.length < 3) return null;
  const origin = mesh.vertices[vertexOrder[0]];
  if (!origin) return null;
  for (let i = 1; i < vertexOrder.length - 1; i++) {
    const a = mesh.vertices[vertexOrder[i]]?.clone().sub(origin);
    const b = mesh.vertices[vertexOrder[i + 1]]?.clone().sub(origin);
    if (!a || !b) continue;
    const normal = a.cross(b);
    if (normal.lengthSq() > 1e-10) return normal.normalize();
  }
  return null;
}

function incidentEdgeIndices(mesh, vertex) {
  const out = [];
  const edges = mesh.edges();
  for (let i = 0; i < edges.length; i++) if (edges[i]?.a === vertex || edges[i]?.b === vertex) out.push(i);
  return out;
}

function chooseContinuation(mesh, incomingIndex, vertex, visited, guideFaces, planeNormal) {
  const edges = mesh.edges();
  const incoming = edges[incomingIndex];
  if (!incoming) return null;

  let candidates = incidentEdgeIndices(mesh, vertex).filter(index => index !== incomingIndex && !visited.has(index));
  if (!candidates.length) return null;
  if (candidates.length === 1) return candidates[0];

  if (guideFaces?.size) {
    const guided = candidates.filter(index => realFaces(mesh, edges[index]).some(face => guideFaces.has(face)));
    if (guided.length === 1) return guided[0];
    if (guided.length > 1) candidates = guided;
  }

  if (planeNormal) {
    const scored = candidates.map(index => {
      const edge = edges[index];
      const other = edge.a === vertex ? edge.b : edge.a;
      const direction = mesh.vertices[other]?.clone().sub(mesh.vertices[vertex]).normalize();
      return { index, score: direction ? Math.abs(direction.dot(planeNormal)) : Infinity };
    }).sort((a, b) => a.score - b.score);
    if (scored.length && (scored.length === 1 || scored[1].score - scored[0].score > 1e-5)) return scored[0].index;
  }

  const incomingFaces = new Set(realFaces(mesh, incoming));
  const opposite = candidates.filter(index => realFaces(mesh, edges[index]).every(face => !incomingFaces.has(face)));
  if (opposite.length === 1) return opposite[0];
  return null;
}

function traceFromEnd(mesh, incomingIndex, startVertex, visited, guideFaces, planeNormal) {
  const out = [];
  let incoming = incomingIndex;
  let vertex = startVertex;
  for (let guard = 0; guard < mesh.edges().length + 1; guard++) {
    const nextIndex = chooseContinuation(mesh, incoming, vertex, visited, guideFaces, planeNormal);
    if (nextIndex === null) break;
    const edge = mesh.edges()[nextIndex];
    if (!edge) break;
    visited.add(nextIndex);
    out.push(nextIndex);
    vertex = edge.a === vertex ? edge.b : edge.a;
    incoming = nextIndex;
  }
  return out;
}

function directedInfo() {
  const mesh = currentMesh();
  const ids = selectedEdgeIds();
  if (!mesh || ids.length < 2) return null;

  const seed = orderedSeed(mesh, ids);
  if (!seed) return { mesh, error: 'Seed edges must form one simple connected chain or loop' };
  if (seed.closed) return { mesh, indices: [...seed.edgeOrder], seedCount: ids.length, alreadyClosed: true };

  const guideFaces = commonGuideFaces(mesh, seed.edgeOrder);
  const planeNormal = seedPlaneNormal(mesh, seed.vertexOrder);
  const visited = new Set(seed.edgeOrder);

  const firstEdge = seed.edgeOrder[0];
  const lastEdge = seed.edgeOrder[seed.edgeOrder.length - 1];
  const startVertex = seed.vertexOrder[0];
  const endVertex = seed.vertexOrder[seed.vertexOrder.length - 1];

  const before = traceFromEnd(mesh, firstEdge, startVertex, visited, guideFaces, planeNormal);
  const after = traceFromEnd(mesh, lastEdge, endVertex, visited, guideFaces, planeNormal);
  const indices = [...before.reverse(), ...seed.edgeOrder, ...after];
  return { mesh, indices, seedCount: ids.length, guideFaceCount: guideFaces.size };
}

function edgeScreenPoint(mesh, edgeIndex, fraction = 0.5) {
  const camera = state?.camera;
  const edge = mesh.edges()[edgeIndex];
  if (!camera || !canvas || !edge) return null;
  const a = mesh.vertices[edge.a], b = mesh.vertices[edge.b];
  if (!a || !b) return null;
  const point = a.clone().lerp(b, fraction).project(camera);
  const rect = canvas.getBoundingClientRect();
  return {
    x: rect.left + (point.x * 0.5 + 0.5) * rect.width,
    y: rect.top + (-point.y * 0.5 + 0.5) * rect.height
  };
}

function tapEdge(mesh, edgeIndex) {
  if (selectedEdgeIds().includes(edgeIndex)) return true;
  for (const fraction of [0.5, 0.38, 0.62]) {
    const p = edgeScreenPoint(mesh, edgeIndex, fraction);
    if (!p) continue;
    canvas.dispatchEvent(new PointerEvent('pointerdown', {
      bubbles: true, cancelable: true, pointerId: 97, pointerType: 'mouse',
      isPrimary: true, button: 0, buttons: 1, clientX: p.x, clientY: p.y
    }));
    canvas.dispatchEvent(new PointerEvent('pointerup', {
      bubbles: true, cancelable: true, pointerId: 97, pointerType: 'mouse',
      isPrimary: true, button: 0, buttons: 0, clientX: p.x, clientY: p.y
    }));
    if (selectedEdgeIds().includes(edgeIndex)) return true;
  }
  return false;
}

function extendSelection(mesh, indices) {
  const wasMulti = !!multiToggle?.checked;
  if (multiToggle && !wasMulti) {
    multiToggle.checked = true;
    multiToggle.dispatchEvent(new Event('change', { bubbles: true }));
  }
  let ok = true;
  for (const index of indices) if (!tapEdge(mesh, index)) ok = false;
  if (multiToggle && !wasMulti) {
    multiToggle.checked = false;
    multiToggle.dispatchEvent(new Event('change', { bubbles: true }));
  }
  return ok;
}

function sync() {
  if (selectedEdgeIds().length >= 2 && button) button.disabled = false;
}

button?.addEventListener('click', event => {
  const ids = selectedEdgeIds();
  if (ids.length < 2) return;

  event.preventDefault();
  event.stopImmediatePropagation();

  const info = directedInfo();
  if (!info) return;
  if (info.error) {
    if (status) status.textContent = `Select Loop • ${info.error}`;
    return;
  }
  if (info.alreadyClosed) {
    if (status) status.textContent = `Select Loop • ${info.indices.length} edge loop already complete`;
    return;
  }
  if (info.indices.length <= info.seedCount) {
    if (status) status.textContent = 'Select Loop • seed direction is clear, but no further continuation was found';
    return;
  }

  const ok = extendSelection(info.mesh, info.indices);
  if (status) {
    status.textContent = ok
      ? `Directed Loop • ${info.seedCount}-edge seed → ${info.indices.length} edges selected`
      : 'Directed Loop • partial continuation selected';
  }
  sync();
}, true);

window.addEventListener('boxlab-bridge-state', sync);
sync();
