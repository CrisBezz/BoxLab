import * as THREE from 'three';

const EPS = 1e-8;

function key(a, b) { return a < b ? `${a}:${b}` : `${b}:${a}`; }

function faceBasis(normal) {
  const n = normal.clone().normalize();
  const helper = Math.abs(n.y) < .9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
  const u = new THREE.Vector3().crossVectors(helper, n).normalize();
  const v = new THREE.Vector3().crossVectors(n, u).normalize();
  return { u, v };
}

function pointSegDistance2(p, a, b) {
  const ab = b.clone().sub(a), l2 = ab.lengthSq();
  if (l2 < 1e-12) return p.distanceTo(a);
  const t = THREE.MathUtils.clamp(p.clone().sub(a).dot(ab) / l2, 0, 1);
  return p.distanceTo(a.clone().addScaledVector(ab, t));
}

function pointInPolygonInclusive(point, poly, tol) {
  for (let i = 0; i < poly.length; i++) {
    if (pointSegDistance2(point, poly[i], poly[(i + 1) % poly.length]) <= tol) return true;
  }
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i], b = poly[j];
    if (((a.y > point.y) !== (b.y > point.y)) &&
        (point.x < (b.x - a.x) * (point.y - a.y) / ((b.y - a.y) || 1e-12) + a.x)) inside = !inside;
  }
  return inside;
}

function minEdgeDistance(point, poly) {
  let best = Infinity;
  for (let i = 0; i < poly.length; i++) best = Math.min(best, pointSegDistance2(point, poly[i], poly[(i + 1) % poly.length]));
  return best;
}

function extrudeArmed() {
  const button = document.querySelector('#extrudeBtn');
  return !!button?.classList.contains('boxlab-direct-stable');
}

function selectedSourceIndex(mesh) {
  const bridge = globalThis.__boxlabSelectionBridge;
  if (bridge?.mode?.() !== 'face') return null;
  const ids = [...new Set(bridge.indices?.() || [])].filter(Number.isInteger);
  if (ids.length !== 1 || !Array.isArray(mesh?.faces?.[ids[0]])) return null;
  return ids[0];
}

function findInteriorTarget(mesh, sourceFaceIndex) {
  const source = mesh.faces[sourceFaceIndex];
  if (!Array.isArray(source) || source.length < 4) return null;
  const sourceNormal = mesh.faceNormal(sourceFaceIndex)?.clone().normalize();
  if (!sourceNormal) return null;
  let sourceScale = Infinity;
  for (let i = 0; i < source.length; i++) sourceScale = Math.min(sourceScale, mesh.vertices[source[i]].distanceTo(mesh.vertices[source[(i + 1) % source.length]]));
  const tol = Math.max(1e-5, (Number.isFinite(sourceScale) ? sourceScale : 1) * .015);
  let best = null;
  for (let fi = 0; fi < mesh.faces.length; fi++) {
    if (fi === sourceFaceIndex) continue;
    const target = mesh.faces[fi];
    if (!Array.isArray(target) || target.length < 3 || target.length >= source.length) continue;
    const targetNormal = mesh.faceNormal(fi)?.clone().normalize();
    if (!targetNormal || sourceNormal.dot(targetNormal) > -.75) continue;
    const denom = sourceNormal.dot(targetNormal);
    if (Math.abs(denom) < .75) continue;
    const origin = mesh.vertices[target[0]];
    const ts = source.map(index => origin.clone().sub(mesh.vertices[index]).dot(targetNormal) / denom);
    const t = ts.reduce((a, b) => a + b, 0) / ts.length;
    if (Math.abs(t) < tol || ts.some(value => Math.abs(value - t) > tol * 2)) continue;
    const projected = source.map(index => mesh.vertices[index].clone().addScaledVector(sourceNormal, t));
    const { u, v } = faceBasis(targetNormal);
    const to2 = p => new THREE.Vector2(p.clone().sub(origin).dot(u), p.clone().sub(origin).dot(v));
    const outer2 = target.map(index => to2(mesh.vertices[index]));
    const inner2 = projected.map(to2);
    if (!inner2.every(p => pointInPolygonInclusive(p, outer2, tol))) continue;
    // Boundary-touch / side-breakout cases stay with the established 14.8 solver.
    if (inner2.some(p => minEdgeDistance(p, outer2) <= tol * 2.5)) continue;
    if (!best || Math.abs(t) < Math.abs(best.t)) best = { faceIndex: fi, t };
  }
  return best;
}

function splitLongestBoundaryEdge(mesh, faceIndex) {
  const face = mesh.faces[faceIndex];
  if (!Array.isArray(face) || face.length < 3) return false;
  let slot = -1, bestLength = -Infinity;
  for (let i = 0; i < face.length; i++) {
    const a = mesh.vertices[face[i]], b = mesh.vertices[face[(i + 1) % face.length]];
    const length = a?.distanceTo?.(b) ?? 0;
    if (length > bestLength) { bestLength = length; slot = i; }
  }
  if (slot < 0 || bestLength < EPS) return false;
  const aId = face[slot], bId = face[(slot + 1) % face.length];
  const point = mesh.vertices[aId].clone().lerp(mesh.vertices[bId], .5);
  mesh.vertices.push(point);
  const newId = mesh.vertices.length - 1;
  let touched = 0;
  for (let fi = 0; fi < mesh.faces.length; fi++) {
    const loop = mesh.faces[fi];
    if (!Array.isArray(loop)) continue;
    for (let i = 0; i < loop.length; i++) {
      const x = loop[i], y = loop[(i + 1) % loop.length];
      if ((x === aId && y === bId) || (x === bId && y === aId)) {
        const next = [...loop];
        next.splice(i + 1, 0, newId);
        mesh.faces[fi] = next;
        touched++;
        break;
      }
    }
  }
  if (!touched) { mesh.vertices.pop(); return false; }
  if (mesh.creases instanceof Map) {
    const oldKey = mesh.edgeKey?.(aId, bId) ?? key(aId, bId);
    const crease = mesh.creases.get(oldKey) || 0;
    mesh.creases.delete(oldKey);
    if (crease > 0) {
      const k1 = mesh.edgeKey?.(aId, newId) ?? key(aId, newId);
      const k2 = mesh.edgeKey?.(newId, bId) ?? key(newId, bId);
      mesh.creases.set(k1, crease); mesh.creases.set(k2, crease);
    }
  }
  mesh.edges?.();
  return true;
}

function prepareClone(mesh) {
  if (!extrudeArmed()) return;
  const sourceFaceIndex = selectedSourceIndex(mesh);
  if (!Number.isInteger(sourceFaceIndex)) return;
  const sourceCount = mesh.faces[sourceFaceIndex]?.length || 0;
  if (sourceCount < 4) return;
  const target = findInteriorTarget(mesh, sourceFaceIndex);
  if (!target) return;
  while ((mesh.faces[target.faceIndex]?.length || 0) < sourceCount) {
    if (!splitLongestBoundaryEdge(mesh, target.faceIndex)) break;
  }
}

function install() {
  const activeMesh = globalThis.__boxlabBridgeState?.mesh;
  const proto = activeMesh ? Object.getPrototypeOf(activeMesh) : null;
  if (!proto || proto.__boxlabMismatchedThroughTarget) return !!proto;
  const originalClone = proto.clone;
  if (typeof originalClone !== 'function') return false;
  Object.defineProperty(proto, '__boxlabMismatchedThroughTarget', { value: true, configurable: true });
  proto.clone = function (...args) {
    const result = originalClone.apply(this, args);
    try { prepareClone(result); } catch (error) { console.warn('BoxLab mismatched Through target preparation skipped', error); }
    return result;
  };
  return true;
}

install();
window.addEventListener('boxlab-bridge-state', install);
