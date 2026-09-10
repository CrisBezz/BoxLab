import * as THREE from 'three';

const canvas = document.querySelector('#viewport');
const addVertexBtn = document.querySelector('#addVertexBtn');
const status = document.querySelector('#selectionStatus');
const geometryToggle = document.querySelector('#inferenceSnapToggle');
const SNAP_PX = 18;
const MIDPOINT_PX = 11;
let drag = null;
let navigationPointer = null;

function state() { return globalThis.__boxlabBridgeState; }
function mesh() { return state()?.mesh || null; }
function camera() { return state()?.camera || null; }
function addVertexActive() { return !!addVertexBtn?.classList.contains('active'); }
function geometryOn() { return geometryToggle?.checked !== false; }
function render() { document.querySelector('#cageToggle')?.dispatchEvent(new Event('change', { bubbles:true })); }

function screenPoint(v) {
  const cam = camera();
  if (!cam || !canvas) return null;
  const p = v.clone().project(cam), r = canvas.getBoundingClientRect();
  return new THREE.Vector2(r.left + (p.x * .5 + .5) * r.width, r.top + (-p.y * .5 + .5) * r.height);
}

function nearestEdge(clientX, clientY) {
  const m = mesh();
  if (!m) return null;
  const p = new THREE.Vector2(clientX, clientY);
  let best = null;
  m.edges().forEach((edge, index) => {
    const a = screenPoint(m.vertices[edge.a]), b = screenPoint(m.vertices[edge.b]);
    if (!a || !b) return;
    const ab = b.clone().sub(a), lenSq = ab.lengthSq();
    if (lenSq < 1e-6) return;
    let t = THREE.MathUtils.clamp(p.clone().sub(a).dot(ab) / lenSq, 0, 1);
    const midpoint = a.clone().lerp(b, .5), midpointDistance = midpoint.distanceTo(p);
    const midpointSnap = geometryOn() && midpointDistance <= MIDPOINT_PX;
    if (midpointSnap) t = .5;
    const q = a.clone().addScaledVector(ab, t), distance = q.distanceTo(p);
    if (distance <= SNAP_PX && (!best || distance < best.distance)) best = { index, edge, t, distance, snapType:midpointSnap?'Midpoint':'Edge' };
  });
  return best;
}

function splitFaceEdge(face, a, b, vertex) {
  for (let i = 0; i < face.length; i++) {
    const x = face[i], y = face[(i + 1) % face.length];
    if ((x === a && y === b) || (x === b && y === a)) {
      const out = [...face];
      out.splice(i + 1, 0, vertex);
      return out;
    }
  }
  return face;
}

function splitEdge(m, edgeIndex, t) {
  const edges = m.edges(), edge = edges[edgeIndex];
  if (!edge || !m.vertices[edge.a] || !m.vertices[edge.b]) return null;
  const a = edge.a, b = edge.b;
  const position = m.vertices[a].clone().lerp(m.vertices[b], t);
  const oldKey = m.edgeKey(a, b);
  const crease = m.creases?.get(oldKey) || 0;
  const vertex = m.vertices.length;
  m.vertices.push(position);

  const realFaces = (edge.faces || []).filter(fi => Number.isInteger(fi) && fi >= 0 && fi < m.faces.length && Array.isArray(m.faces[fi]));
  for (const fi of realFaces) m.faces[fi] = splitFaceEdge(m.faces[fi], a, b, vertex);

  if (edge.loose && m.looseEdges instanceof Set) {
    m.looseEdges.delete(oldKey);
    m.looseEdges.add(m.edgeKey(a, vertex));
    m.looseEdges.add(m.edgeKey(vertex, b));
    if (m.looseVertices instanceof Set) m.looseVertices.add(vertex);
  }

  if (m.creases instanceof Map) {
    m.creases.delete(oldKey);
    if (crease > 0) {
      m.creases.set(m.edgeKey(a, vertex), crease);
      m.creases.set(m.edgeKey(vertex, b), crease);
    }
  }
  return { vertex, a, b };
}

globalThis.__boxlabEdgeSplitKernel = { version:'0.36.18.108', splitEdge };

function updateDragPosition(event) {
  if (!drag) return;
  const m = drag.mesh, va = m.vertices[drag.a], vb = m.vertices[drag.b];
  const a = screenPoint(va), b = screenPoint(vb);
  if (!a || !b) return;
  const p = new THREE.Vector2(event.clientX, event.clientY), ab = b.clone().sub(a), lenSq = ab.lengthSq();
  if (lenSq < 1e-6) return;
  let t = THREE.MathUtils.clamp(p.clone().sub(a).dot(ab) / lenSq, .001, .999), snapType='Edge';
  if(geometryOn()){
    const midpoint=a.clone().lerp(b,.5);
    if(midpoint.distanceTo(p)<=MIDPOINT_PX){t=.5;snapType='Midpoint';}
  }
  m.vertices[drag.vertex].copy(va).lerp(vb, t);
  drag.t = t;
  drag.snapType=snapType;
  if (status) status.textContent = `Add Vertex • ${snapType} snap • ${Math.round(t * 100)}%`;
  render();
}

// BoxLab v0.36.18.108 — edge hits belong to Add Vertex; misses belong to navigation.
// On a miss, temporarily disarm Add so main.js cannot create a loose vertex, but let
// the pointer event continue untouched so OrbitControls receives the normal gesture.
// Re-arm Add after that navigation gesture ends.
window.addEventListener('pointerdown', event => {
  if (event.target !== canvas || !event.isPrimary || !addVertexActive()) return;

  const snap = nearestEdge(event.clientX, event.clientY);
  if (!snap) {
    navigationPointer = event.pointerId;
    addVertexBtn?.click();
    if (status) status.textContent = 'Add Vertex • navigation • release to resume Add';
    return;
  }

  const m = mesh(), history = globalThis.__boxlabHistory;
  if (!m || !history) {
    if (status) status.textContent = 'Add Vertex • unavailable';
    return;
  }

  event.preventDefault();
  event.stopImmediatePropagation();
  const before = m.clone();
  const result = splitEdge(m, snap.index, THREE.MathUtils.clamp(snap.t, .001, .999));
  if (!result) {
    if (status) status.textContent = 'Add Vertex • edge split failed';
    return;
  }
  history.push(before);
  drag = { pointerId:event.pointerId, mesh:m, ...result, t:snap.t, snapType:snap.snapType };
  canvas.setPointerCapture?.(event.pointerId);
  if (status) status.textContent = `Add Vertex • ${snap.snapType} snap • ${Math.round(snap.t * 100)}%`;
  render();
}, true);

window.addEventListener('pointermove', event => {
  if (!drag || drag.pointerId !== event.pointerId) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  updateDragPosition(event);
}, true);

function rearmAfterNavigation(event) {
  if (navigationPointer !== event.pointerId) return false;
  navigationPointer = null;
  setTimeout(() => {
    if (!addVertexActive()) addVertexBtn?.click();
    if (status) status.textContent = 'Add Vertex • ready';
  }, 0);
  return true;
}

function finish(event) {
  if (rearmAfterNavigation(event)) return;
  if (!drag || drag.pointerId !== event.pointerId) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  const snapType=drag.snapType;
  drag = null;
  render();
  setTimeout(() => { if (status) status.textContent = `Add Vertex • ${snapType} committed • still armed`; }, 20);
}
window.addEventListener('pointerup', finish, true);
window.addEventListener('pointercancel', finish, true);
