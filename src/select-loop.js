const state = globalThis.__boxlabBridgeState;
const button = document.querySelector('#selectLoopBtn');
const slider = document.querySelector('#loopSlide');
const sliderOut = document.querySelector('#loopSlideOut');
const multiToggle = document.querySelector('#multiSelectToggle');
const canvas = document.querySelector('#viewport');
const status = document.querySelector('#selectionStatus');
let activeSlide = null;

function currentMesh() { return state?.mesh || null; }
function edgeKey(mesh, edge) { return mesh.edgeKey(edge.a, edge.b); }

function ringInfo() {
  const mesh = currentMesh();
  const ids = state?.selectedEdges || [];
  if (!mesh || ids.length !== 1) return null;
  const ring = mesh.loopRing?.(ids[0]);
  if (!ring?.cutKeys?.size) return null;
  const edges = mesh.edges();
  const indices = [];
  for (let i = 0; i < edges.length; i++) if (ring.cutKeys.has(edgeKey(mesh, edges[i]))) indices.push(i);
  return indices.length > 1 ? { mesh, indices } : null;
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
  for (const fraction of [0.5, 0.38, 0.62]) {
    const p = edgeScreenPoint(mesh, edgeIndex, fraction);
    if (!p) continue;
    canvas.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, pointerId: 91, pointerType: 'mouse', isPrimary: true, button: 0, buttons: 1, clientX: p.x, clientY: p.y }));
    canvas.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, cancelable: true, pointerId: 91, pointerType: 'mouse', isPrimary: true, button: 0, buttons: 0, clientX: p.x, clientY: p.y }));
    if ((state?.selectedEdges || []).includes(edgeIndex)) return true;
  }
  return false;
}

function selectEdgeIndices(mesh, indices) {
  document.querySelector('#deselectAllBtn')?.click();
  if (multiToggle) {
    multiToggle.checked = true;
    multiToggle.dispatchEvent(new Event('change', { bubbles: true }));
  }
  let ok = true;
  for (const index of indices) if (!tapEdge(mesh, index)) ok = false;
  if (multiToggle) {
    multiToggle.checked = false;
    multiToggle.dispatchEvent(new Event('change', { bubbles: true }));
  }
  return ok;
}

function orderedLoopVertices(mesh, edgeIndices) {
  const edges = mesh.edges();
  const adjacency = new Map();
  for (const index of edgeIndices) {
    const edge = edges[index];
    if (!edge) return null;
    if (!adjacency.has(edge.a)) adjacency.set(edge.a, []);
    if (!adjacency.has(edge.b)) adjacency.set(edge.b, []);
    adjacency.get(edge.a).push(edge.b);
    adjacency.get(edge.b).push(edge.a);
  }
  if ([...adjacency.values()].some(list => list.length < 1 || list.length > 2)) return null;
  const ends = [...adjacency].filter(([, list]) => list.length === 1).map(([v]) => v);
  if (ends.length !== 0 && ends.length !== 2) return null;
  const start = ends.length ? ends[0] : adjacency.keys().next().value;
  const ordered = [start];
  let previous = null, current = start;
  for (let guard = 0; guard < adjacency.size + 1; guard++) {
    const next = (adjacency.get(current) || []).find(v => v !== previous);
    if (next === undefined || next === start) break;
    if (ordered.includes(next)) return null;
    ordered.push(next);
    previous = current;
    current = next;
  }
  return ordered.length === adjacency.size ? ordered : null;
}

function reconstructSlide(mesh, edgeIndices) {
  const edges = mesh.edges();
  const loopKeys = new Set(edgeIndices.map(i => edges[i]).filter(Boolean).map(e => edgeKey(mesh, e)));
  const ordered = orderedLoopVertices(mesh, edgeIndices);
  if (!ordered?.length) return null;

  const rails = new Map();
  for (const vertex of ordered) {
    const neighbours = [];
    for (const edge of edges) {
      if (loopKeys.has(edgeKey(mesh, edge))) continue;
      if (edge.a === vertex) neighbours.push(edge.b);
      else if (edge.b === vertex) neighbours.push(edge.a);
    }
    const unique = [...new Set(neighbours)];
    if (unique.length !== 2) return { selectable: true, slideData: null, reason: 'Loop selected • slide unavailable on irregular topology' };
    rails.set(vertex, unique);
  }

  const oriented = new Map();
  const first = ordered[0], firstPair = rails.get(first);
  oriented.set(first, [firstPair[0], firstPair[1]]);
  for (let i = 1; i < ordered.length; i++) {
    const prev = ordered[i - 1], current = ordered[i], pair = rails.get(current), prevPair = oriented.get(prev);
    const same = mesh.vertices[prevPair[0]].distanceToSquared(mesh.vertices[pair[0]]) + mesh.vertices[prevPair[1]].distanceToSquared(mesh.vertices[pair[1]]);
    const swapped = mesh.vertices[prevPair[0]].distanceToSquared(mesh.vertices[pair[1]]) + mesh.vertices[prevPair[1]].distanceToSquared(mesh.vertices[pair[0]]);
    oriented.set(current, swapped < same ? [pair[1], pair[0]] : [pair[0], pair[1]]);
  }

  const slideData = [];
  const positions = [];
  for (const vertex of ordered) {
    const [startIndex, endIndex] = oriented.get(vertex);
    const start = mesh.vertices[startIndex], end = mesh.vertices[endIndex], point = mesh.vertices[vertex];
    const rail = end.clone().sub(start), lenSq = rail.lengthSq();
    if (lenSq < 1e-10) return { selectable: true, slideData: null, reason: 'Loop selected • slide unavailable on collapsed rail' };
    const t = point.clone().sub(start).dot(rail) / lenSq;
    const projected = start.clone().addScaledVector(rail, t);
    const tolerance = Math.max(1e-5, Math.sqrt(lenSq) * 0.015);
    if (projected.distanceTo(point) > tolerance || t < -0.05 || t > 1.05) return { selectable: true, slideData: null, reason: 'Loop selected • slide unavailable on non-rail topology' };
    const clamped = Math.max(0.05, Math.min(0.95, t));
    positions.push(clamped);
    slideData.push({ vertex, start: start.toArray(), end: end.toArray(), position: clamped });
  }
  const average = positions.reduce((sum, value) => sum + value, 0) / positions.length;
  if (positions.some(value => Math.abs(value - average) > 0.08)) return { selectable: true, slideData: null, reason: 'Loop selected • slide unavailable because loop spacing is uneven' };
  slideData.forEach(item => item.position = average);
  return { selectable: true, slideData, position: average, reason: `Loop selected • ${edgeIndices.length} edges • Slide ready` };
}

function forceRender() {
  const cage = document.querySelector('#cageToggle');
  if (!cage) return;
  cage.dispatchEvent(new Event('change', { bubbles: true }));
}

function sync() {
  const info = ringInfo();
  if (button) button.disabled = !info;
  if (activeSlide && slider) slider.disabled = !activeSlide.slideData;
}

button?.addEventListener('click', () => {
  const info = ringInfo();
  if (!info) return;
  const { mesh, indices } = info;
  const selected = selectEdgeIndices(mesh, indices);
  const rebuilt = reconstructSlide(mesh, indices);
  activeSlide = rebuilt?.slideData ? { mesh, slideData: rebuilt.slideData, historyPushed: false } : null;
  if (slider && rebuilt?.slideData) {
    const pct = Math.round(rebuilt.position * 100);
    slider.value = String(pct);
    slider.disabled = false;
    if (sliderOut) sliderOut.textContent = `${pct}%`;
  }
  if (status) status.textContent = selected ? (rebuilt?.reason || `Loop selected • ${indices.length} edges`) : 'Select Loop partially selected • tap another edge and retry';
  sync();
});

slider?.addEventListener('input', event => {
  if (!activeSlide?.slideData || activeSlide.mesh !== currentMesh()) return;
  const mesh = activeSlide.mesh;
  if (!activeSlide.historyPushed) {
    globalThis.__boxlabHistory?.push(mesh);
    activeSlide.historyPushed = true;
  }
  const pct = Number(event.target.value);
  if (!mesh.loopSlide(activeSlide.slideData, pct / 100)) return;
  if (sliderOut) sliderOut.textContent = `${pct}%`;
  forceRender();
  setTimeout(() => {
    if (slider) slider.disabled = false;
    if (status) status.textContent = `Loop slide • ${pct}%`;
  }, 0);
});

window.addEventListener('boxlab-bridge-state', sync);
sync();
