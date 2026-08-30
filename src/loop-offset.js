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

    const rails = [];
    for (const vertex of info.orderedVertices) {
      const point = this.vertices[vertex], pair = info.orientedRails.get(vertex);
      if (!point || !pair) return null;
      for (const target of pair) {
        const targetPoint = this.vertices[target];
        if (!targetPoint) return null;
        const length = point.distanceTo(targetPoint);
        if (!Number.isFinite(length) || length < 1e-6) return null;
        rails.push(length);
      }
    }
    const shortestRail = Math.min(...rails);
    if (!Number.isFinite(shortestRail) || shortestRail < 1e-6) return null;
    const distance = shortestRail * amount;

    for (const vertex of info.orderedVertices) {
      const point = this.vertices[vertex], pair = info.orientedRails.get(vertex);
      if (!point || !pair) return null;
      const leftTarget = this.vertices[pair[0]], rightTarget = this.vertices[pair[1]];
      const leftLength = point.distanceTo(leftTarget), rightLength = point.distanceTo(rightTarget);
      if (leftLength < 1e-6 || rightLength < 1e-6) return null;
      const left = point.clone().lerp(leftTarget, distance / leftLength);
      const right = point.clone().lerp(rightTarget, distance / rightLength);
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

    return { spacing: amount, distance, shortestRail, leftEdges, rightEdges, originalEdges, faceCount: newFaces.length };
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
const START_PX = 7;
let armed = false;
let drag = null;
let pendingHighlight = null;

function liveState() { return globalThis.__boxlabBridgeState || null; }
function selectedEdges() { return [...new Set(liveState()?.selectedEdges || [])]; }
function info(edgeIds = selectedEdges()) {
  const mesh = liveState()?.mesh;
  return mesh?.offsetEdgeLoopInfo?.(edgeIds) || null;
}
function sync() {
  if (button) {
    button.disabled = !info();
    button.classList.toggle('active', armed && !button.disabled);
  }
  if (armed && button?.disabled) armed = false;
}
function forceRender() {
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change', { bubbles:true }));
}
function restore(target, source) {
  target.vertices = source.vertices.map(v => v.clone());
  target.faces = source.faces.map(f => [...f]);
  target.creases = new Map(source.creases);
  target.looseEdges = new Set(source.looseEdges || []);
  target.looseVertices = new Set(source.looseVertices || []);
}
function screenPoint(point) {
  const camera = liveState()?.camera;
  if (!camera || !canvas || !point) return null;
  const p = point.clone().project(camera), rect = canvas.getBoundingClientRect();
  return { x:rect.left + (p.x * .5 + .5) * rect.width, y:rect.top + (-p.y * .5 + .5) * rect.height };
}
function pointerHitsSelectedEdge(event, mesh, edgeIds) {
  const px = event.clientX, py = event.clientY;
  let best = null;
  for (const index of edgeIds) {
    const edge = mesh.edges()[index];
    if (!edge) continue;
    const a = screenPoint(mesh.vertices[edge.a]), b = screenPoint(mesh.vertices[edge.b]);
    if (!a || !b) continue;
    const abx = b.x-a.x, aby = b.y-a.y, len2 = abx*abx+aby*aby;
    if (len2 < 1) continue;
    const t = Math.max(0, Math.min(1, ((px-a.x)*abx+(py-a.y)*aby)/len2));
    const qx=a.x+abx*t, qy=a.y+aby*t, d=Math.hypot(px-qx,py-qy);
    if (d <= 20 && (!best || d < best.d)) best={index,d,a,b};
  }
  return best;
}
function edgeNormal(hit) {
  const dx=hit.b.x-hit.a.x, dy=hit.b.y-hit.a.y, len=Math.hypot(dx,dy)||1;
  return { x:-dy/len, y:dx/len };
}
function edgeScreenPoint(mesh, edgeIndex, fraction = 0.5) {
  const edge = mesh.edges()[edgeIndex];
  if (!edge) return null;
  const point = mesh.vertices[edge.a].clone().lerp(mesh.vertices[edge.b], fraction);
  return screenPoint(point);
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
  const { leftEdges, rightEdges, originalEdges, spacing, distance } = pendingHighlight;
  const visible = highlightEdges([...leftEdges, ...rightEdges], 0x62d8ff) + highlightEdges(originalEdges, 0xffe14a);
  if (visible) {
    if (status) status.textContent = `Offset Loop committed • uniform ${distance.toFixed(3)} • ${Math.round(spacing*100)}%`;
    pendingHighlight = null;
  }
}

slider?.addEventListener('input', () => {
  if (output) output.textContent = `${slider.value}%`;
});
button?.addEventListener('click', event => {
  event.preventDefault();
  armed = !armed;
  sync();
  if (status) status.textContent = armed ? 'Offset Loop • drag any selected loop edge' : 'Offset Loop off';
});

document.addEventListener('click', event => {
  if (!armed || event.target?.closest?.('#offsetLoopBtn')) return;
  const other = event.target?.closest?.('button');
  if (!other) return;
  armed = false;
  sync();
}, true);

canvas?.addEventListener('pointerdown', event => {
  if (!armed || !event.isPrimary) return;
  const state=liveState(), mesh=state?.mesh, edgeIds=selectedEdges(), current=info(edgeIds);
  if (!mesh || !current || !edgeIds.length) return;
  const hit=pointerHitsSelectedEdge(event,mesh,edgeIds);
  if (!hit) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  drag={
    id:event.pointerId, mesh, before:mesh.clone(), edgeIds:[...edgeIds],
    startX:event.clientX, startY:event.clientY, normal:edgeNormal(hit),
    changed:false, preview:null
  };
  canvas.setPointerCapture?.(event.pointerId);
}, true);

canvas?.addEventListener('pointermove', event => {
  if (!drag || drag.id!==event.pointerId) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  const dx=event.clientX-drag.startX, dy=event.clientY-drag.startY;
  const across=Math.abs(dx*drag.normal.x+dy*drag.normal.y);
  if (!drag.changed && across < START_PX) return;
  drag.changed=true;
  const amount=Math.max(.02,Math.min(.45,.02+across*.00215));
  restore(drag.mesh,drag.before);
  const result=drag.mesh.offsetEdgeLoop(drag.edgeIds,amount);
  drag.preview=result;
  if (!result) return;
  if (slider) slider.value=String(Math.round(result.spacing*100));
  if (output) output.textContent=`${Math.round(result.spacing*100)}%`;
  if (status) status.textContent=`Offset Loop • ${Math.round(result.spacing*100)}% • ${result.distance.toFixed(3)}`;
  forceRender();
}, true);

function finish(event) {
  if (!drag || drag.id!==event.pointerId) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  const current=drag;
  drag=null;
  if (event.type==='pointercancel' || !current.changed || !current.preview) {
    restore(current.mesh,current.before);
    forceRender();
    if (status) status.textContent='Offset Loop • drag any selected loop edge';
    return;
  }
  globalThis.__boxlabHistory?.push(current.before);
  pendingHighlight=current.preview;
  forceRender();
  requestAnimationFrame(()=>{
    selectCreatedLoops(current.mesh,[...current.preview.leftEdges,...current.preview.rightEdges]);
    forceRender();
    requestAnimationFrame(applyPendingHighlight);
  });
  armed=false;
  sync();
}
canvas?.addEventListener('pointerup', finish, true);
canvas?.addEventListener('pointercancel', finish, true);
window.addEventListener('boxlab-bridge-state', () => { sync(); applyPendingHighlight(); });
sync();
