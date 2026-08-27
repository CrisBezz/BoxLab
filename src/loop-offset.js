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

const state = globalThis.__boxlabBridgeState;
const button = document.querySelector('#offsetLoopBtn');
const slider = document.querySelector('#offsetLoopSpacing');
const output = document.querySelector('#offsetLoopSpacingOut');
const status = document.querySelector('#selectionStatus');

function info() {
  const mesh = state?.mesh;
  return mesh?.offsetEdgeLoopInfo?.(state?.selectedEdges || []) || null;
}
function sync() {
  if (button) button.disabled = !info();
}
slider?.addEventListener('input', () => {
  if (output) output.textContent = `${slider.value}%`;
});
button?.addEventListener('click', () => {
  const mesh = state?.mesh, current = info(), history = globalThis.__boxlabHistory;
  if (!mesh || !current || !history) return;
  const before = mesh.clone();
  const spacing = Number(slider?.value || 20) / 100;
  const result = mesh.offsetEdgeLoop(state.selectedEdges, spacing);
  if (!result) return;
  history.push(before);
  document.querySelector('#deselectAllBtn')?.click();
  if (status) status.textContent = `Support loops created • ${Math.round(result.spacing * 100)}% spacing`;
  sync();
});
window.addEventListener('boxlab-bridge-state', sync);
sync();
