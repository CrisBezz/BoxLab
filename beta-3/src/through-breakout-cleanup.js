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

function contour2(mesh, face) {
  const n = faceNormal(mesh, face);
  if (!n) return null;
  const { u, v } = basis(n), origin = mesh.vertices[face[0]];
  return face.map(id => {
    const p = mesh.vertices[id].clone().sub(origin);
    return new THREE.Vector2(p.dot(u), p.dot(v));
  });
}

function isConcave(points) {
  if (!points || points.length < 4) return false;
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

function triangulateFace(mesh, face) {
  const contour = contour2(mesh, face);
  if (!isConcave(contour)) return null;
  const tris = THREE.ShapeUtils.triangulateShape(contour, []);
  return tris?.length ? tris.map(t => t.map(i => face[i])) : null;
}

function breakoutTail(mesh) {
  const n = mesh?.faces?.length || 0;
  if (n < 2) return null;
  const a = mesh.faces[n - 2], b = mesh.faces[n - 1];
  if (!Array.isArray(a) || !Array.isArray(b) || a.length < 5 || b.length < 5) return null;
  const ta = triangulateFace(mesh, a), tb = triangulateFace(mesh, b);
  if (!ta || !tb) return null;
  return { start: n - 2, triangles: [...ta, ...tb] };
}

function installBridgeCommitHook() {
  const activeMesh = globalThis.__boxlabBridgeState?.mesh;
  const proto = activeMesh ? Object.getPrototypeOf(activeMesh) : null;
  if (!proto || proto.__boxlabThroughBreakoutHookV2) return !!proto;
  const originalBridgeLoops = proto.bridgeLoops;
  if (typeof originalBridgeLoops !== 'function') return false;

  Object.defineProperty(proto, '__boxlabThroughBreakoutHookV2', { value: true, configurable: true });
  proto.bridgeLoops = function (...args) {
    // In buildCrossBoundaryOnClone the target + side remainders are pushed as the final
    // two faces immediately before bridgeLoops(sourceLoop, shellLoop). Detect that exact
    // structural signature instead of relying on pointer/status timing.
    const tail = breakoutTail(this);
    const result = originalBridgeLoops.apply(this, args);
    if (result && tail) {
      this.faces.splice(tail.start, 2, ...tail.triangles);
      this.edges?.();
    }
    return result;
  };
  return true;
}

installBridgeCommitHook();
window.addEventListener('boxlab-bridge-state', installBridgeCommitHook);
document.addEventListener('boxlab-bridge-state', installBridgeCommitHook);
