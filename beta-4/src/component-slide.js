import * as THREE from 'three';

const canvas = document.querySelector('#viewport');
const status = document.querySelector('#selectionStatus');
const history = () => globalThis.__boxlabHistory;
const bridgeState = () => globalThis.__boxlabBridgeState;
const bridge = () => globalThis.__boxlabSelectionBridge;
const vertexButton = document.querySelector('#vertexSlideBtn');
const edgeButton = document.querySelector('#edgeSlideBtn');
const SLIDE_START_PX = 7;
const PICK_VERTEX_PX = 24;
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let activeTool = null;
let selectedVertices = [];
let drag = null;

function currentMesh() { return bridgeState()?.mesh || null; }
function camera() { return bridgeState()?.camera || null; }
function render() { document.querySelector('#cageToggle')?.dispatchEvent(new Event('change', { bubbles:true })); }
function unique(values) { return [...new Set(values)]; }

function screenPoint(v) {
  const cam = camera();
  if (!cam || !v) return null;
  const p = v.clone().project(cam), rect = canvas.getBoundingClientRect();
  return new THREE.Vector2(rect.left + (p.x * .5 + .5) * rect.width, rect.top + (-p.y * .5 + .5) * rect.height);
}

// Observe selected vertex dots without coupling to main.js internals.
const baseAdd = THREE.Group.prototype.add;
if (!THREE.Group.prototype.__boxlabComponentSlideObserverInstalled) {
  THREE.Group.prototype.add = function (...objects) {
    if (objects.some(o => o?.userData?.kind === 'body')) selectedVertices = [];
    for (const object of objects) {
      if (object?.userData?.kind !== 'vertex') continue;
      const hex = object.material?.color?.getHex?.();
      if (hex === 0xff615f && Number.isInteger(object.userData.index)) selectedVertices.push(object.userData.index);
    }
    return baseAdd.apply(this, objects);
  };
  THREE.Group.prototype.__boxlabComponentSlideObserverInstalled = true;
}

function selectedEdges() {
  const b = bridge();
  if (b?.mode?.() === 'edge') return unique(b.indices?.() || []);
  return unique(bridgeState()?.selectedEdges || []);
}
function selectedVertex() { const ids = unique(selectedVertices); return ids.length === 1 ? ids[0] : null; }
function activeMode(mode) { return document.querySelector(`#selectionModes button[data-mode="${mode}"]`)?.classList.contains('active'); }

function incidentNeighbours(mesh, vertex) {
  const out = [];
  for (const e of mesh.edges()) {
    if (e.a === vertex) out.push(e.b);
    else if (e.b === vertex) out.push(e.a);
  }
  return unique(out).filter(i => mesh.vertices[i]);
}

function realFaces(mesh, edge) {
  return (edge?.faces || []).filter(fi => Number.isInteger(fi) && fi >= 0 && fi < mesh.faces.length && Array.isArray(mesh.faces[fi]));
}

function edgeSideTargets(mesh, edgeIndex) {
  const edge = mesh.edges()[edgeIndex];
  if (!edge || edge.loose) return null;
  const faces = realFaces(mesh, edge);
  if (faces.length !== 2 || faces.some(fi => mesh.faces[fi]?.length !== 4)) return null;
  const sides = [];
  for (const fi of faces) {
    const face = mesh.faces[fi], ia = face.indexOf(edge.a), ib = face.indexOf(edge.b);
    if (ia < 0 || ib < 0) return null;
    const n = face.length;
    let aTarget = null, bTarget = null;
    if ((ia + 1) % n === ib) {
      aTarget = face[(ia - 1 + n) % n];
      bTarget = face[(ib + 1) % n];
    } else if ((ib + 1) % n === ia) {
      aTarget = face[(ia + 1) % n];
      bTarget = face[(ib - 1 + n) % n];
    } else return null;
    if (aTarget === bTarget || !mesh.vertices[aTarget] || !mesh.vertices[bTarget]) return null;
    sides.push({ faceIndex:fi, aTarget, bTarget });
  }
  return { edgeIndex, edge, sides };
}

function selectedEdgeInfos(mesh, ids = selectedEdges()) {
  if (!mesh || !ids.length) return null;
  const infos = ids.map(i => edgeSideTargets(mesh, i));
  return infos.every(Boolean) ? infos : null;
}

function setTool(tool) {
  activeTool = activeTool === tool ? null : tool;
  vertexButton?.classList.toggle('active', activeTool === 'vertex');
  edgeButton?.classList.toggle('active', activeTool === 'edge');
  if (status) {
    const count = tool === 'edge' ? selectedEdges().length : 1;
    status.textContent = activeTool ? `${tool === 'vertex' ? 'Vertex' : count > 1 ? `Multi Edge (${count})` : 'Edge'} Slide • Pencil-drag the selected component${count > 1 ? 's' : ''}` : 'Slide tool off';
  }
}
vertexButton?.addEventListener('click', () => setTool('vertex'));
edgeButton?.addEventListener('click', () => setTool('edge'));

function syncButtons() {
  if (vertexButton) vertexButton.disabled = !activeMode('vertex') || selectedVertex() === null;
  const mesh = currentMesh(), ids = selectedEdges();
  if (edgeButton) edgeButton.disabled = !activeMode('edge') || !selectedEdgeInfos(mesh, ids);
  if (activeTool === 'vertex' && vertexButton?.disabled) setTool('vertex');
  if (activeTool === 'edge' && edgeButton?.disabled) setTool('edge');
}
window.addEventListener('boxlab-bridge-state', syncButtons);
document.querySelectorAll('#selectionModes button').forEach(b => b.addEventListener('click', () => { activeTool = null; vertexButton?.classList.remove('active'); edgeButton?.classList.remove('active'); setTimeout(syncButtons, 0); }));

function pointerNearVertex(event, mesh, index) {
  const p = screenPoint(mesh.vertices[index]);
  return !!p && p.distanceTo(new THREE.Vector2(event.clientX, event.clientY)) <= PICK_VERTEX_PX;
}
function pointerHitsEdge(event, index) {
  const object = bridgeState()?.edgeObjects?.get?.(index);
  const cam = camera();
  if (!object || !cam) return false;
  const r = canvas.getBoundingClientRect();
  pointer.x = ((event.clientX - r.left) / r.width) * 2 - 1;
  pointer.y = -((event.clientY - r.top) / r.height) * 2 + 1;
  raycaster.params.Line.threshold = .12;
  raycaster.setFromCamera(pointer, cam);
  return raycaster.intersectObject(object, false).length > 0;
}
function hitSelectedEdge(event, ids) {
  for (const id of ids) if (pointerHitsEdge(event, id)) return id;
  return null;
}

function sideTarget(info, side, vertex) {
  if (vertex === info.edge.a) return side.aTarget;
  if (vertex === info.edge.b) return side.bTarget;
  return null;
}
function sideRail(info, side, before) {
  const a0 = screenPoint(before.vertices[info.edge.a]), b0 = screenPoint(before.vertices[info.edge.b]);
  const at = screenPoint(before.vertices[side.aTarget]), bt = screenPoint(before.vertices[side.bTarget]);
  if (!a0 || !b0 || !at || !bt) return null;
  return at.clone().add(bt).multiplyScalar(.5).sub(a0.clone().add(b0).multiplyScalar(.5));
}
function bestSideForMotion(info, motion, before) {
  let best = null;
  for (let i = 0; i < info.sides.length; i++) {
    const rail = sideRail(info, info.sides[i], before);
    if (!rail || rail.length() < 2) continue;
    const score = motion.dot(rail.clone().normalize());
    if (!best || score > best.score) best = { sideIndex:i, side:info.sides[i], rail, score };
  }
  return best;
}

function solveEdgeSlide(drag, dx, dy) {
  const motion = new THREE.Vector2(dx, dy);
  if (motion.lengthSq() < 1) return null;
  motion.normalize();
  const byIndex = new Map(drag.infos.map(info => [info.edgeIndex, info]));
  const assignments = new Map();
  const vertexTargets = new Map();
  const remaining = new Set(drag.ids);
  let seedRail = null;

  const assign = (info, sideIndex) => {
    const side = info.sides[sideIndex];
    if (!side) return false;
    for (const vertex of [info.edge.a, info.edge.b]) {
      const target = sideTarget(info, side, vertex);
      const prior = vertexTargets.get(vertex);
      if (prior !== undefined && prior !== target) return false;
    }
    assignments.set(info.edgeIndex, sideIndex);
    vertexTargets.set(info.edge.a, side.aTarget);
    vertexTargets.set(info.edge.b, side.bTarget);
    remaining.delete(info.edgeIndex);
    return true;
  };

  const growComponent = rootIndex => {
    const root = byIndex.get(rootIndex);
    if (!root) return false;
    const preferred = bestSideForMotion(root, motion, drag.before);
    if (!preferred || !assign(root, preferred.sideIndex)) return false;
    if (rootIndex === drag.seedEdge) seedRail = preferred.rail;
    let changed = true;
    while (changed) {
      changed = false;
      for (const edgeIndex of [...remaining]) {
        const info = byIndex.get(edgeIndex);
        const shared = [info.edge.a, info.edge.b].filter(v => vertexTargets.has(v));
        if (!shared.length) continue;
        const candidates = info.sides.map((side, sideIndex) => ({ side, sideIndex })).filter(candidate => shared.every(v => sideTarget(info, candidate.side, v) === vertexTargets.get(v)));
        if (candidates.length !== 1 || !assign(info, candidates[0].sideIndex)) return false;
        changed = true;
      }
    }
    return true;
  };

  if (!growComponent(drag.seedEdge)) return null;
  while (remaining.size) {
    const root = remaining.values().next().value;
    if (!growComponent(root)) return null;
  }

  if (!seedRail) {
    const seed = byIndex.get(drag.seedEdge), sideIndex = assignments.get(drag.seedEdge);
    seedRail = seed && Number.isInteger(sideIndex) ? sideRail(seed, seed.sides[sideIndex], drag.before) : null;
  }
  if (!seedRail || seedRail.lengthSq() < 4) return null;
  return { assignments, vertexTargets, rail:seedRail };
}

canvas?.addEventListener('pointerdown', event => {
  if (!activeTool || !event.isPrimary) return;
  const mesh = currentMesh();
  if (!mesh) return;
  if (activeTool === 'vertex') {
    const vertex = selectedVertex();
    if (vertex === null || !pointerNearVertex(event, mesh, vertex)) return;
    const neighbours = incidentNeighbours(mesh, vertex);
    if (!neighbours.length) return;
    event.preventDefault(); event.stopImmediatePropagation();
    drag = { kind:'vertex', pointerId:event.pointerId, mesh, before:mesh.clone(), vertex, neighbours, start:mesh.vertices[vertex].clone(), startX:event.clientX, startY:event.clientY, target:null, changed:false };
  } else {
    const ids = selectedEdges(), infos = selectedEdgeInfos(mesh, ids), seedEdge = hitSelectedEdge(event, ids);
    if (!infos || !Number.isInteger(seedEdge)) return;
    event.preventDefault(); event.stopImmediatePropagation();
    drag = { kind:'edge', pointerId:event.pointerId, mesh, before:mesh.clone(), ids:[...ids], infos, seedEdge, startX:event.clientX, startY:event.clientY, solution:null, changed:false };
  }
  canvas.setPointerCapture?.(event.pointerId);
}, true);

function chooseVertexTarget(drag, dx, dy) {
  const start2 = screenPoint(drag.start), motion = new THREE.Vector2(dx, dy);
  if (!start2 || motion.lengthSq() < 1) return null;
  motion.normalize();
  let best = null;
  for (const n of drag.neighbours) {
    const p = screenPoint(drag.before.vertices[n]);
    if (!p) continue;
    const rail = p.clone().sub(start2), len = rail.length();
    if (len < 2) continue;
    const score = motion.dot(rail.clone().normalize());
    if (!best || score > best.score) best = { index:n, rail, score };
  }
  return best;
}

canvas?.addEventListener('pointermove', event => {
  if (!drag || drag.pointerId !== event.pointerId) return;
  event.preventDefault(); event.stopImmediatePropagation();
  const dx = event.clientX - drag.startX, dy = event.clientY - drag.startY;
  if (!drag.changed && Math.hypot(dx,dy) < SLIDE_START_PX) return;
  if (!drag.changed) { history()?.push(drag.before); drag.changed = true; }

  if (drag.kind === 'vertex') {
    if (!drag.target) drag.target = chooseVertexTarget(drag, dx, dy);
    if (!drag.target) return;
    const rail = drag.target.rail, t = THREE.MathUtils.clamp(new THREE.Vector2(dx,dy).dot(rail) / Math.max(rail.lengthSq(),1), 0, .98);
    drag.mesh.vertices[drag.vertex].copy(drag.start).lerp(drag.before.vertices[drag.target.index], t);
    if (status) status.textContent = `Vertex Slide • ${Math.round(t*100)}%`;
  } else {
    if (!drag.solution) drag.solution = solveEdgeSlide(drag, dx, dy);
    if (!drag.solution) {
      if (status) status.textContent = 'Edge Slide • selected edges do not form a compatible slide set';
      return;
    }
    const rail = drag.solution.rail;
    const t = THREE.MathUtils.clamp(new THREE.Vector2(dx,dy).dot(rail) / Math.max(rail.lengthSq(),1), 0, .98);
    for (const [vertex, target] of drag.solution.vertexTargets) drag.mesh.vertices[vertex].copy(drag.before.vertices[vertex]).lerp(drag.before.vertices[target], t);
    if (status) status.textContent = `${drag.ids.length > 1 ? 'Multi Edge' : 'Edge'} Slide • ${drag.ids.length} edge${drag.ids.length === 1 ? '' : 's'} • ${Math.round(t*100)}%`;
  }
  render();
}, true);

function finish(event) {
  if (!drag || drag.pointerId !== event.pointerId) return;
  event.preventDefault(); event.stopImmediatePropagation();
  const kind = drag.kind, changed = drag.changed, count = kind === 'edge' ? drag.ids.length : 1;
  drag = null;
  render();
  setTimeout(() => {
    if (status) status.textContent = changed ? `${kind === 'vertex' ? 'Vertex' : count > 1 ? `Multi Edge (${count})` : 'Edge'} Slide committed` : `${kind === 'vertex' ? 'Vertex' : 'Edge'} Slide cancelled`;
    syncButtons();
  }, 0);
}
canvas?.addEventListener('pointerup', finish, true);
canvas?.addEventListener('pointercancel', finish, true);

// Force one render after the observer is installed so current vertex selection is visible.
setTimeout(() => { render(); syncButtons(); }, 0);
