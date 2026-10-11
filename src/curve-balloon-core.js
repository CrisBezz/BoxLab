import * as THREE from 'three';
import {EditableMesh} from './mesh.js';
import {buildOutlineBalloon} from './vendor/meshutilz-outline-balloon.js?v=0.36.18.816';

// Adapter only: shape generation remains the exact MeshUtilz outline owner.
export function makeCurveBalloon(points, profile) {
  if (!profile.closed) throw Error('Balloon needs a closed outline');
  const depth = Number(profile.depth ?? .25);
  if (!Number.isFinite(depth) || depth < .05 || depth > .8) throw Error('Depth must be 0.05–0.8');
  const area=THREE.ShapeUtils.area(points),sign=Math.sign(area);
  if (Math.abs(area)<1e-10) throw Error('Draw an outline with visible area');
  const cross=(a,b,p)=>(b.x-a.x)*(p.y-a.y)-(b.y-a.y)*(p.x-a.x);
  // Reject crossings independently of the small drawing tolerance below.
  for(let i=0;i<points.length;i++)for(let j=i+2;j<points.length;j++){
    if(i===0&&j===points.length-1)continue;
    const a=points[i],b=points[(i+1)%points.length],c=points[j],d=points[(j+1)%points.length];
    if(cross(a,b,c)*cross(a,b,d)<0&&cross(c,d,a)*cross(c,d,b)<0)
      throw Error('Draw a simple outline without crossings');
  }
  // Concave evaluation: preserve the authored outline, but accept only
  // star-shaped silhouettes whose actual smoothed rim can fan from the
  // existing MeshUtilz pole without crossing or folding.
  const resolution=profile.balloonResolution;
  if(resolution!=null&&(!Number.isInteger(resolution)||resolution<4||resolution>12))throw Error('Balloon resolution must be 4–12');
  // Keep legacy Balloon tessellation when a recipe lacks resolution.
  const geometry = buildOutlineBalloon(points, {depth,smooth:2,...(resolution==null?{}:{outlineSegments:resolution*6,sectionRings:resolution})});
  try {
    const position=geometry.getAttribute('position'),index=geometry.getIndex();
    if (!position?.count || !index?.count) throw Error('Outline is too small; draw a larger shape');
    const vertices=Array.from({length:position.count},(_,i)=>new THREE.Vector3().fromBufferAttribute(position,i)),faces=[];
    for (let i=0;i<index.count;i+=3) faces.push([index.getX(i),index.getX(i+1),index.getX(i+2)]);
    // Donor's first triangle joins rim 0/1 to the first interior ring. Validate
    // its actual smoothed rim against the pole centre before accepting a shell.
    const rim=vertices.slice(0,index.getX(2)),centre=vertices.at(-1),rimSign=Math.sign(THREE.ShapeUtils.area(rim));
    if(rim.length<3||rim.some((p,i)=>rimSign*cross(centre,p,rim[(i+1)%rim.length])<=1e-12))
      throw Error('Concavity too deep for Balloon centre; use a shallower indentation');
    return new EditableMesh(vertices,faces);
  } finally { geometry.dispose(); }
}
