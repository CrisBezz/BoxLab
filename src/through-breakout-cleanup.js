import * as THREE from 'three';

function faceNormal(mesh, face) {
  if (!Array.isArray(face) || face.length < 3) return null;
  const a = mesh.vertices[face[0]];
  for (let i = 1; i < face.length - 1; i++) {
    const b = mesh.vertices[face[i]], c = mesh.vertices[face[i + 1]];
    if (!a || !b || !c) continue;
    const n = new THREE.Vector3().crossVectors(b.clone().sub(a), c.clone().sub(a));
    if (n.lengthSq() > 1e-12) return n.normalize();
  }
  return null;
}

function basis(normal) {
  const helper = Math.abs(normal.y) < .9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
  const u = new THREE.Vector3().crossVectors(helper, normal).normalize();
  const v = new THREE.Vector3().crossVectors(normal, u).normalize();
  return { u, v };
}

function isConcave(points) {
  if (points.length < 4) return false;
  let sign = 0;
  for (let i = 0; i < points.length; i++) {
    const a = points[i], b = points[(i + 1) % points.length], c = points[(i + 2) % points.length];
    const abx = b.x - a.x, aby = b.y - a.y, bcx = c.x - b.x, bcy = c.y - b.y;
    const cross = abx * bcy - aby * bcx;
    if (Math.abs(cross) < 1e-10) continue;
    const s = Math.sign(cross);
    if (sign && s !== sign) return true;
    sign = s;
  }
  return false;
}

function triangulateConcaveFaces(mesh) {
  const replacements = [];
  for (let fi = 0; fi < mesh.faces.length; fi++) {
    const face = mesh.faces[fi];
    if (!Array.isArray(face) || face.length < 4) continue;
    const n = faceNormal(mesh, face);
    if (!n) continue;
    const { u, v } = basis(n), origin = mesh.vertices[face[0]];
    const contour = face.map(id => {
      const p = mesh.vertices[id].clone().sub(origin);
      return new THREE.Vector2(p.dot(u), p.dot(v));
    });
    if (!isConcave(contour)) continue;
    const tris = THREE.ShapeUtils.triangulateShape(contour, []);
    if (!tris?.length) continue;
    replacements.push({ fi, triangles: tris.map(t => t.map(i => face[i])) });
  }
  if (!replacements.length) return false;
  for (const { fi, triangles } of replacements.sort((a, b) => b.fi - a.fi)) {
    mesh.faces.splice(fi, 1, ...triangles);
  }
  mesh.edges?.();
  return true;
}

let pendingSideBreakout = false;

function installBridgeCommitHook() {
  const activeMesh = globalThis.__boxlabBridgeState?.mesh;
  const proto = activeMesh ? Object.getPrototypeOf(activeMesh) : null;
  if (!proto || proto.__boxlabThroughBreakoutHook) return !!proto;
  const originalBridgeLoops = proto.bridgeLoops;
  if (typeof originalBridgeLoops !== 'function') return false;

  Object.defineProperty(proto, '__boxlabThroughBreakoutHook', { value: true, configurable: true });
  proto.bridgeLoops = function (...args) {
    const result = originalBridgeLoops.apply(this, args);
    if (pendingSideBreakout && result) {
      pendingSideBreakout = false;
      triangulateConcaveFaces(this);
    }
    return result;
  };
  return true;
}

installBridgeCommitHook();
window.addEventListener('boxlab-bridge-state', installBridgeCommitHook);

// This capture listener runs before multi-face-direct handles the same pointerup on document.
// During a recognised side breakout the drag status is already THROUGH SIDE READY, so the
// following bridgeLoops call is marked for synchronous triangulation before the clone returns.
window.addEventListener('pointerup', () => {
  const text = document.querySelector('#selectionStatus')?.textContent || '';
  pendingSideBreakout = text.includes('THROUGH SIDE READY');
}, true);
