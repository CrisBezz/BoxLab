import * as THREE from 'three';
import {EditableMesh} from './mesh.js';
import {buildOutlineBalloon} from './vendor/meshutilz-outline-balloon.js?v=0.36.18.813';

// Adapter only: shape generation remains the exact MeshUtilz outline owner.
export function makeCurveBalloon(points, profile) {
  if (!profile.closed) throw Error('Balloon needs a closed outline');
  const depth = Number(profile.depth ?? .25);
  if (!Number.isFinite(depth) || depth < .05 || depth > .8) throw Error('Depth must be 0.05–0.8');
  let sign = 0;
  for (let i = 0; i < points.length; i++) {
    const a = points[i], b = points[(i + 1) % points.length], c = points[(i + 2) % points.length];
    const cross = (b.x-a.x)*(c.y-b.y)-(b.y-a.y)*(c.x-b.x);
    if (Math.abs(cross) < 1e-10) continue;
    if (sign && Math.sign(cross) !== sign) throw Error('Draw a convex outline for this first Balloon build');
    sign = Math.sign(cross);
  }
  if (!sign) throw Error('Draw an outline with visible area');
  // All points must lie on the same side of each directed edge. This also
  // rejects star/self-crossing polygons with locally consistent turns.
  for (let i = 0; i < points.length; i++) {
    const a=points[i],b=points[(i+1)%points.length];
    for (const p of points) if (sign*((b.x-a.x)*(p.y-a.y)-(b.y-a.y)*(p.x-a.x)) < -1e-10)
      throw Error('Draw a simple convex outline without crossings');
  }
  const geometry = buildOutlineBalloon(points, {depth, smooth:2});
  try {
    const position=geometry.getAttribute('position'),index=geometry.getIndex();
    if (!position?.count || !index?.count) throw Error('Outline is too small; draw a larger shape');
    const vertices=Array.from({length:position.count},(_,i)=>new THREE.Vector3().fromBufferAttribute(position,i)),faces=[];
    for (let i=0;i<index.count;i+=3) faces.push([index.getX(i),index.getX(i+1),index.getX(i+2)]);
    return new EditableMesh(vertices,faces);
  } finally { geometry.dispose(); }
}
