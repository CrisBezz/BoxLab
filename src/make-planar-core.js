import * as THREE from 'three';

function plane(mesh,face){
  const center=new THREE.Vector3(),normal=new THREE.Vector3();
  for(let i=0;i<face.length;i++){
    const a=mesh.vertices[face[i]],b=mesh.vertices[face[(i+1)%face.length]];
    if(!a||!b)return null;
    center.add(a);
    normal.x+=(a.y-b.y)*(a.z+b.z);
    normal.y+=(a.z-b.z)*(a.x+b.x);
    normal.z+=(a.x-b.x)*(a.y+b.y);
  }
  if(normal.lengthSq()<1e-20)return null;
  return {center:center.multiplyScalar(1/face.length),normal:normal.normalize()};
}

export function planarizeSelectedFaces(source,faceIndices){
  const indices=[...new Set(faceIndices)].sort((a,b)=>a-b),faces=indices.map(i=>source.faces?.[i]);
  if(!indices.length||faces.some(face=>!face||face.length<4||new Set(face).size!==face.length))return {ok:false,reason:'Select one or more faces with at least four corners'};
  const original=faces.map(face=>plane(source,face));
  if(original.some(p=>!p))return {ok:false,reason:'A selected face is degenerate'};
  const vertices=[...new Set(faces.flat())],box=new THREE.Box3();
  vertices.forEach(i=>box.expandByPoint(source.vertices[i]));
  const scale=box.getSize(new THREE.Vector3()).length(),tolerance=Math.max(1e-7,scale*1e-6);
  const edgeLengths=faces.flatMap(face=>face.map((v,i)=>source.vertices[v].distanceTo(source.vertices[face[(i+1)%face.length]]))).filter(n=>n>1e-9).sort((a,b)=>a-b);
  if(!edgeLengths.length)return {ok:false,reason:'Selected faces contain collapsed edges'};
  const moveLimit=edgeLengths[Math.floor(edgeLengths.length/2)]*.15;
  const candidate=source.clone();let deviation=Infinity;
  for(let iteration=0;iteration<160;iteration++){
    const proposals=new Map();deviation=0;
    for(const face of faces){
      const p=plane(candidate,face);if(!p)return {ok:false,reason:'A face became degenerate'};
      for(const i of face){
        const v=candidate.vertices[i],d=v.clone().sub(p.center).dot(p.normal);
        deviation=Math.max(deviation,Math.abs(d));
        if(!proposals.has(i))proposals.set(i,{sum:new THREE.Vector3(),count:0});
        const item=proposals.get(i);item.sum.addScaledVector(p.normal,-d);item.count++;
      }
    }
    if(deviation<=tolerance*.2)break;
    for(const [i,{sum,count}] of proposals)candidate.vertices[i].addScaledVector(sum,.85/count);
  }
  if(deviation>tolerance*.2)return {ok:false,reason:'These faces cannot all become planar without a larger shape change'};
  let moved=0,maxMove=0;
  for(const i of vertices){
    const distance=candidate.vertices[i].distanceTo(source.vertices[i]);
    if(distance>tolerance){moved++;maxMove=Math.max(maxMove,distance);}
  }
  if(maxMove>moveLimit)return {ok:false,reason:'Planarisation would move a vertex too far'};
  for(let j=0;j<faces.length;j++){
    const after=plane(candidate,faces[j]);
    if(!after||after.normal.dot(original[j].normal)<.9)return {ok:false,reason:'Planarisation would fold a face'};
    const [a,b,c]=faces[j].map(i=>candidate.vertices[i]);
    const n=b.clone().sub(a).cross(c.clone().sub(a));
    if(n.lengthSq()<1e-20)return {ok:false,reason:'Planarisation would collapse a face'};
    n.normalize();
    if(faces[j].some(i=>Math.abs(candidate.vertices[i].clone().sub(a).dot(n))>tolerance))return {ok:false,reason:'A selected face remains non-planar'};
  }
  const touched=new Set(vertices);
  for(let i=0;i<source.faces.length;i++){
    const face=source.faces[i];if(indices.includes(i)||!face.some(v=>touched.has(v)))continue;
    const before=plane(source,face),after=plane(candidate,face);
    if(!before||!after||before.normal.dot(after.normal)<.5)return {ok:false,reason:'A neighbouring face would fold'};
  }
  return {ok:true,mesh:candidate,moved,maxMove,deviation,tolerance};
}
