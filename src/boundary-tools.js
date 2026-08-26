const state = globalThis.__boxlabBridgeState;
const selectBoundaryBtn = document.querySelector('#selectBoundaryBtn');
const fillBtn = document.querySelector('#fillFaceBtn');
const status = document.querySelector('#selectionStatus');
const multiToggle = document.querySelector('#multiSelectToggle');
const canvas = document.querySelector('#viewport');

function currentMesh() { return state?.mesh || null; }
function realFaces(mesh, edge) { return (edge?.faces || []).filter(fi => Number.isInteger(fi) && fi >= 0 && fi < mesh.faces.length && Array.isArray(mesh.faces[fi])); }
function isBoundaryEdge(mesh, edge) { return !!edge && (edge.loose || realFaces(mesh, edge).length === 1); }
function edgeKey(mesh, edge) { return mesh.edgeKey(edge.a, edge.b); }

function boundaryComponentInfo() {
  const mesh = currentMesh(), selected = state?.selectedEdges || [];
  if (!mesh || selected.length !== 1) return null;
  const edges = mesh.edges(), seed = edges[selected[0]];
  if (!isBoundaryEdge(mesh, seed)) return null;
  const boundary = edges.map((edge, index) => ({ edge, index })).filter(item => isBoundaryEdge(mesh, item.edge));
  const byVertex = new Map();
  for (const item of boundary) {
    for (const vertex of [item.edge.a, item.edge.b]) {
      if (!byVertex.has(vertex)) byVertex.set(vertex, []);
      byVertex.get(vertex).push(item);
    }
  }
  const queue = [selected[0]], seen = new Set(queue), component = [];
  while (queue.length) {
    const index = queue.shift(), edge = edges[index];
    if (!edge) continue;
    component.push(index);
    for (const vertex of [edge.a, edge.b]) {
      for (const item of byVertex.get(vertex) || []) if (!seen.has(item.index)) { seen.add(item.index); queue.push(item.index); }
    }
  }
  const adjacency = new Map();
  for (const index of component) {
    const edge = edges[index];
    if (!adjacency.has(edge.a)) adjacency.set(edge.a, []);
    if (!adjacency.has(edge.b)) adjacency.set(edge.b, []);
    adjacency.get(edge.a).push(edge.b);
    adjacency.get(edge.b).push(edge.a);
  }
  if ([...adjacency.values()].some(list => list.length > 2)) return { mesh, indices: component, valid: false, reason: 'Boundary branches at a vertex' };
  const ends = [...adjacency.values()].filter(list => list.length === 1).length;
  if (ends !== 0 && ends !== 2) return { mesh, indices: component, valid: false, reason: 'Boundary is not a simple loop or chain' };
  return { mesh, indices: component.sort((a,b)=>a-b), valid: true, closed: ends === 0 };
}

function orderedFromEdges(mesh, indices) {
  const edges = mesh.edges(), adjacency = new Map();
  for (const index of indices) {
    const edge = edges[index];
    if (!edge) return null;
    if (!adjacency.has(edge.a)) adjacency.set(edge.a, []);
    if (!adjacency.has(edge.b)) adjacency.set(edge.b, []);
    adjacency.get(edge.a).push(edge.b);
    adjacency.get(edge.b).push(edge.a);
  }
  if ([...adjacency.values()].some(list => list.length < 1 || list.length > 2)) return null;
  const ends = [...adjacency].filter(([, list]) => list.length === 1).map(([vertex]) => vertex);
  if (ends.length !== 0 && ends.length !== 2) return null;
  const start = ends.length ? ends[0] : adjacency.keys().next().value;
  const ordered = [start];
  let previous = null, current = start;
  for (let guard = 0; guard < adjacency.size + 1; guard++) {
    const next = (adjacency.get(current) || []).find(vertex => vertex !== previous);
    if (next === undefined || next === start) break;
    if (ordered.includes(next)) return null;
    ordered.push(next);
    previous = current;
    current = next;
  }
  return ordered.length === adjacency.size ? { vertices: ordered, closed: ends.length === 0 } : null;
}

function directedEdge(face, a, b) {
  if (!face) return 0;
  for (let i = 0; i < face.length; i++) {
    const x = face[i], y = face[(i + 1) % face.length];
    if (x === a && y === b) return 1;
    if (x === b && y === a) return -1;
  }
  return 0;
}

function orientAgainstNeighbour(mesh, cycle) {
  const edges = mesh.edges();
  for (let i = 0; i < cycle.length; i++) {
    const a = cycle[i], b = cycle[(i + 1) % cycle.length], key = mesh.edgeKey(a,b);
    const edge = edges.find(item => edgeKey(mesh, item) === key);
    const faceIndex = edge ? realFaces(mesh, edge)[0] : null;
    const neighbour = Number.isInteger(faceIndex) ? mesh.faces[faceIndex] : null;
    if (!neighbour) continue;
    if (directedEdge(neighbour, a, b) === 1) return [...cycle].reverse();
    if (directedEdge(neighbour, a, b) === -1) return cycle;
  }
  return cycle;
}

function smartFillInfo() {
  const mesh = currentMesh(), ids = [...new Set(state?.selectedEdges || [])];
  if (!mesh || (ids.length !== 3 && ids.length !== 4)) return null;
  const edges = mesh.edges(), picked = ids.map(index => edges[index]);
  if (picked.some(edge => !isBoundaryEdge(mesh, edge))) return null;
  const ordered = orderedFromEdges(mesh, ids);
  if (!ordered) return null;

  if (ordered.closed) {
    if (ordered.vertices.length !== ids.length || ordered.vertices.length < 3 || ordered.vertices.length > 4) return null;
    const cycle = orientAgainstNeighbour(mesh, ordered.vertices);
    return { mesh, cycle, type: cycle.length === 3 ? 'triangle' : 'quad', createsEdge: false };
  }

  if (ids.length !== 3 || ordered.vertices.length !== 4) return null;
  const start = ordered.vertices[0], end = ordered.vertices[ordered.vertices.length - 1];
  const missingKey = mesh.edgeKey(start, end), existing = edges.find(edge => edgeKey(mesh, edge) === missingKey);
  if (existing && !isBoundaryEdge(mesh, existing)) return null;
  const cycle = orientAgainstNeighbour(mesh, ordered.vertices);
  return { mesh, cycle, type: 'complete missing edge', createsEdge: !existing, missingKey };
}

function edgeScreenPoint(mesh, edgeIndex, fraction = 0.5) {
  const camera = state?.camera, edge = mesh.edges()[edgeIndex];
  if (!camera || !canvas || !edge) return null;
  const a = mesh.vertices[edge.a], b = mesh.vertices[edge.b];
  if (!a || !b) return null;
  const point = a.clone().lerp(b, fraction).project(camera), rect = canvas.getBoundingClientRect();
  return { x: rect.left + (point.x * 0.5 + 0.5) * rect.width, y: rect.top + (-point.y * 0.5 + 0.5) * rect.height };
}

function tapEdge(mesh, edgeIndex) {
  for (const fraction of [0.5, 0.38, 0.62]) {
    const p = edgeScreenPoint(mesh, edgeIndex, fraction);
    if (!p) continue;
    canvas.dispatchEvent(new PointerEvent('pointerdown', { bubbles:true, cancelable:true, pointerId:92, pointerType:'mouse', isPrimary:true, button:0, buttons:1, clientX:p.x, clientY:p.y }));
    canvas.dispatchEvent(new PointerEvent('pointerup', { bubbles:true, cancelable:true, pointerId:92, pointerType:'mouse', isPrimary:true, button:0, buttons:0, clientX:p.x, clientY:p.y }));
    if ((state?.selectedEdges || []).includes(edgeIndex)) return true;
  }
  return false;
}

function selectEdgeIndices(mesh, indices) {
  document.querySelector('#deselectAllBtn')?.click();
  if (multiToggle) { multiToggle.checked = true; multiToggle.dispatchEvent(new Event('change', { bubbles:true })); }
  let ok = true;
  for (const index of indices) if (!tapEdge(mesh, index)) ok = false;
  if (multiToggle) { multiToggle.checked = false; multiToggle.dispatchEvent(new Event('change', { bubbles:true })); }
  return ok;
}

function forceRender() {
  const cage = document.querySelector('#cageToggle');
  cage?.dispatchEvent(new Event('change', { bubbles:true }));
}

function sync() {
  const boundary = boundaryComponentInfo(), fill = smartFillInfo();
  if (selectBoundaryBtn) selectBoundaryBtn.disabled = !boundary?.valid || boundary.indices.length < 2;
  if (fillBtn) {
    fillBtn.disabled = !fill;
    fillBtn.textContent = fill ? (fill.type === 'complete missing edge' ? 'Fill Face + Edge' : 'Fill Face') : 'Fill Face';
  }
}

selectBoundaryBtn?.addEventListener('click', () => {
  const info = boundaryComponentInfo();
  if (!info?.valid) return;
  const ok = selectEdgeIndices(info.mesh, info.indices);
  if (status) status.textContent = ok ? `Boundary selected • ${info.indices.length} edges • ${info.closed ? 'closed' : 'open'}` : 'Boundary partially selected • retry from a clearer view';
  sync();
});

fillBtn?.addEventListener('click', event => {
  const info = smartFillInfo();
  if (!info) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  const history = globalThis.__boxlabHistory;
  if (!history) return;
  history.push(info.mesh);
  info.mesh.faces.push([...info.cycle]);
  info.mesh.edges();
  forceRender();
  document.querySelector('#selectionModes button[data-mode="face"]')?.click();
  setTimeout(() => {
    if (status) status.textContent = info.type === 'complete missing edge' ? 'Fill Face • quad completed with missing edge' : `Fill Face • ${info.type} created`;
    sync();
  }, 0);
}, true);

window.addEventListener('boxlab-bridge-state', sync);
sync();
