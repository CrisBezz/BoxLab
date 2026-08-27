import { EditableMesh } from './mesh.js';

function installLoopOffsetTopology() {
  if (EditableMesh.prototype.__loopOffsetInstalled) return;

  EditableMesh.prototype.offsetEdgeLoopInfo = function(edgeIndices) {
    return this.bevelEdgeLoopInfo?.(edgeIndices) || null;
  };

  EditableMesh.prototype.offsetEdgeLoop = function(edgeIndices, spacing = 0.2) {
    const info = this.offsetEdgeLoopInfo(edgeIndices);
    if (!info) return null;
    const amount = Math.max(0.02, Math.min(0.45, Number(spacing) || 0.2));
    const leftByVertex = new Map(), rightByVertex = new Map();

    for (const vertex of info.orderedVertices) {
      const point = this.vertices[vertex], pair = info.orientedRails.get(vertex);
      if (!point || !pair) return null;
      const left = point.clone().lerp(this.vertices[pair[0]], amount);
      const right = point.clone().lerp(this.vertices[pair[1]], amount);
      this.vertices.push(left); leftByVertex.set(vertex, this.vertices.length - 1);
      this.vertices.push(right); rightByVertex.set(vertex, this.vertices.length - 1);
    }

    const loopSet = new Set(info.orderedVertices);
    for (const [faceIndex, side] of info.faceSide) {
      const map = side === 0 ? leftByVertex : rightByVertex;
      this.faces[faceIndex] = this.faces[faceIndex].map(v => loopSet.has(v) ? map.get(v) : v);
    }

    const newFaces = [];
    for (const edge of info.edgesInOrder) {
      const la = leftByVertex.get(edge.a), lb = leftByVertex.get(edge.b);
      const ra = rightByVertex.get(edge.a), rb = rightByVertex.get(edge.b);
      const a = edge.a, b = edge.b;
      if (edge.direction > 0) {
        newFaces.push([lb, la, a, b]);
        newFaces.push([b, a, ra, rb]);
      } else {
        newFaces.push([la, lb, b, a]);
        newFaces.push([a, b, rb, ra]);
      }
    }
    this.faces.push(...newFaces);
    this.edges();

    const edgeIndexByKey = new Map(this.edges().map((e, i) => [this.edgeKey(e.a, e.b), i]));
    const leftEdges = [], rightEdges = [], originalEdges = [];
    for (let i = 0; i < info.orderedVertices.length; i++) {
      const a = info.orderedVertices[i], b = info.orderedVertices[(i + 1) % info.orderedVertices.length];
      const li = edgeIndexByKey.get(this.edgeKey(leftByVertex.get(a), leftByVertex.get(b)));
      const ri = edgeIndexByKey.get(this.edgeKey(rightByVertex.get(a), rightByVertex.get(b)));
      const oi = edgeIndexByKey.get(this.edgeKey(a, b));
      if (Number.isInteger(li)) leftEdges.push(li);
      if (Number.isInteger(ri)) rightEdges.push(ri);
      if (Number.isInteger(oi)) originalEdges.push(oi);
    }

    return { spacing: amount, leftEdges, rightEdges, originalEdges, faceCount: newFaces.length };
  };

  EditableMesh.prototype.__loopOffsetInstalled = true;
}

installLoopOffsetTopology();

const button = document.querySelector('#offsetLoopBtn');
const slider = document.querySelector('#offsetLoopSpacing');
const output = document.querySelector('#offsetLoopSpacingOut');
const status = document.querySelector('#selectionStatus');
const canvas = document.querySelector('#viewport');
const multiToggle = document.querySelector('#multiSelectToggle');
let pendingHighlight = null;

function liveState() { return globalThis.__boxlabBridgeState || null; }
function info() {
  const state = liveState(), mesh = state?.mesh;
  return mesh?.offsetEdgeLoopInfo?.(state?.selectedEdges || []) || null;
}
function sync() {
  if (button) button.disabled = !info();
}
function forceRender() {
  const cage = document.querySelector('#cageToggle');
  if (cage) cage.dispatchEvent(new Event('change', { bubbles:true }));
}
function edgeScreenPoint(mesh, edgeIndex, fraction = 0.5) {
  const state = liveState(), camera = state?.camera, edge = mesh.edges()[edgeIndex];
  if (!camera || !canvas || !edge) return null;
  const point = mesh.vertices[edge.a].clone().lerp(mesh.vertices[edge.b], fraction).project(camera);
  const rect = canvas.getBoundingClientRect();
  return { x:rect.left + (point.x * 0.5 + 0.5) * rect.width, y:rect.top + (-point.y * 0.5 + 0.5) * rect.height };
}
function tapEdge(mesh, edgeIndex) {
  for (const fraction of [0.5, 0.38, 0.62]) {
    const p = edgeScreenPoint(mesh, edgeIndex, fraction);
    if (!p) continue;
    canvas.dispatchEvent(new PointerEvent('pointerdown', { bubbles:true, cancelable:true, pointerId:96, pointerType:'mouse', isPrimary:true, button:0, buttons:1, clientX:p.x, clientY:p.y }));
    canvas.dispatchEvent(new PointerEvent('pointerup', { bubbles:true, cancelable:true, pointerId:96, pointerType:'mouse', isPrimary:true, button:0, buttons:0, clientX:p.x, clientY:p.y }));
    if ((liveState()?.selectedEdges || []).includes(edgeIndex)) return true;
  }
  return false;
}
function selectCreatedLoops(mesh, indices) {
  document.querySelector('#deselectAllBtn')?.click();
  if (multiToggle) {
    multiToggle.checked = true;
    multiToggle.dispatchEvent(new Event('change', { bubbles:true }));
  }
  for (const index of [...new Set(indices)]) tapEdge(mesh, index);
  if (multiToggle) {
    multiToggle.checked = false;
    multiToggle.dispatchEvent(new Event('change', { bubbles:true }));
  }
}
function highlightEdges(indices, hex) {
  const state = liveState();
  let count = 0;
  for (const index of indices) {
    const line = state?.edgeObjects?.get(index);
    if (!line?.material?.clone) continue;
    const material = line.material.clone();
    material.color?.setHex?.(hex);
    material.depthTest = false;
    line.material = material;
    line.renderOrder = 36;
    count++;
  }
  return count;
}
function applyPendingHighlight() {
  if (!pendingHighlight) return;
  const { leftEdges, rightEdges, originalEdges, spacing } = pendingHighlight;
  const visible = highlightEdges([...leftEdges, ...rightEdges], 0x62d8ff) + highlightEdges(originalEdges, 0xffe14a);
  if (visible) {
    if (status) status.textContent = `Support loops created • 3 rings highlighted • ${Math.round(spacing * 100)}% spacing`;
    pendingHighlight = null;
  }
}
slider?.addEventListener('input', () => {
  if (output) output.textContent = `${slider.value}%`;
});
button?.addEventListener('click', () => {
  const state = liveState(), mesh = state?.mesh, current = info(), history = globalThis.__boxlabHistory;
  if (!mesh || !current || !history) return;
  const before = mesh.clone();
  const spacing = Number(slider?.value || 20) / 100;
  const result = mesh.offsetEdgeLoop(state.selectedEdges, spacing);
  if (!result) return;
  history.push(before);
  pendingHighlight = result;
  forceRender();
  requestAnimationFrame(() => {
    selectCreatedLoops(mesh, [...result.leftEdges, ...result.rightEdges]);
    forceRender();
    requestAnimationFrame(applyPendingHighlight);
  });
  if (status) status.textContent = `Support loops created • ${result.leftEdges.length + result.rightEdges.length} support edges • ${Math.round(result.spacing * 100)}% spacing`;
  sync();
});
window.addEventListener('boxlab-bridge-state', () => { sync(); applyPendingHighlight(); });
sync();
