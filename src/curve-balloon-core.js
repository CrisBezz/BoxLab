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
    if(profile.balloonTopology==='quads'){
      // MeshUtilz supplies paired, consistently wound triangles in each
      // radial strip. Merge only exact adjacent pairs; keep pole fans.
      const result=[];
      const frontPole=faces[Math.floor(faces.length/2)-1]?.[2];
      const backPole=faces.at(-1)?.[2];
      let merged=0;
      for(let i=0;i<faces.length;){
        const a=faces[i],b=faces[i+1];
        if(b&&a.length===3&&b.length===3&&!a.includes(frontPole)&&!b.includes(frontPole)&&!a.includes(backPole)&&!b.includes(backPole)){
          const [v0,v1,v3]=a;
          // Front strip: a,b,d and b,c,d
          if(b[0]===v1&&b[2]===v3&&new Set([v0,v1,b[1],v3]).size===4){
            result.push([v0,v1,b[1],v3]);i+=2;merged++;continue;
          }
          // Reverse-wound back strip: a,d,b and b,d,c
          if(b[0]===a[2]&&b[1]===a[1]&&new Set([a[0],a[1],b[2],a[2]]).size===4){
            result.push([a[0],a[1],b[2],a[2]]);i+=2;merged++;continue;
          }
        }
        result.push(a);i++;
      }
      if(!merged)throw Error('Balloon could not form quad strips');
      // Experimental .819 pole foundation: adjacent triangles of each fan
      // can be paired into quads, without inventing new vertices or changing
      // the donor surface. Only pair the complete fans with even membership.
      // For odd fans retain the already accepted triangular pole.
      if(profile.balloonPoleQuads===true){
        for(const pole of [frontPole,backPole]){
          const fan=result.filter(face=>face.length===3&&face.includes(pole));
          if(fan.length<4||fan.length%2)continue;
          const mergedFan=[];
          let safe=true;
          for(let j=0;j<fan.length;j+=2){
            const a=fan[j],b=fan[j+1];
            const first=a.filter(x=>x!==pole),second=b.filter(x=>x!==pole);
            const shared=first.find(x=>second.includes(x));
            if(shared==null){safe=false;break;}
            const outerA=first.find(x=>x!==shared),outerB=second.find(x=>x!==shared);
            if(outerA==null||outerB==null||new Set([outerA,shared,outerB,pole]).size!==4){safe=false;break;}
            // Preserve directed boundary edges from both original triangles.
            const edge=(f,x,y)=>f.some((v,k)=>v===x&&f[(k+1)%f.length]===y);
            const quad=[outerA,shared,outerB,pole];
            if(edge(a,outerA,shared)&&edge(b,shared,outerB))mergedFan.push(quad);
            else if(edge(b,outerB,shared)&&edge(a,shared,outerA))mergedFan.push([outerB,shared,outerA,pole]);
            else {safe=false;break;}
          }
          if(safe){
            const set=new Set(fan);
            const retained=result.filter(face=>!set.has(face));
            retained.push(...mergedFan);
            result.splice(0,result.length,...retained);
          }
        }
      }
      return new EditableMesh(vertices,result);
    }
    if(profile.balloonTopology!=null&&profile.balloonTopology!=='triangles')throw Error('Unsupported Balloon topology');
    return new EditableMesh(vertices,faces);
  } finally { geometry.dispose(); }
}
