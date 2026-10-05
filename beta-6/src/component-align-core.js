export function componentVertexIndices(mesh,mode,indices=[]){
  if(!mesh||!Array.isArray(mesh.vertices))return[];
  const ids=[...new Set(indices||[])].filter(Number.isInteger);
  const out=new Set();
  if(mode==='vertex'){
    ids.forEach(i=>{if(mesh.vertices[i])out.add(i);});
  }else if(mode==='edge'){
    const edges=mesh.edges?.()||[];
    ids.forEach(i=>{const e=edges[i];if(e){if(mesh.vertices[e.a])out.add(e.a);if(mesh.vertices[e.b])out.add(e.b);}});
  }else if(mode==='face'){
    ids.forEach(i=>(mesh.faces?.[i]||[]).forEach(v=>{if(mesh.vertices[v])out.add(v);}));
  }
  return[...out];
}

export function componentAxisTarget(mesh,vertexIndices,axis){
  if(!mesh||!['x','y','z'].includes(axis)||!vertexIndices?.length)return null;
  const values=vertexIndices.map(i=>mesh.vertices?.[i]?.[axis]).filter(Number.isFinite);
  if(values.length!==vertexIndices.length||!values.length)return null;
  return values.reduce((a,b)=>a+b,0)/values.length;
}

export function alignComponentAxis(mesh,vertexIndices,axis){
  const target=componentAxisTarget(mesh,vertexIndices,axis);
  if(target===null)return null;
  for(const i of vertexIndices)mesh.vertices[i][axis]=target;
  mesh.edges?.();
  return{axis,target,count:vertexIndices.length};
}


export function componentAnchorVertexIndices(mesh,mode,index){
  return componentVertexIndices(mesh,mode,[index]);
}

export function componentAnchorCoordinate(mesh,mode,index,axis){
  const vertices=componentAnchorVertexIndices(mesh,mode,index);
  if(!vertices.length||!['x','y','z'].includes(axis))return null;
  const values=vertices.map(i=>mesh.vertices?.[i]?.[axis]).filter(Number.isFinite);
  if(values.length!==vertices.length||!values.length)return null;
  return values.reduce((a,b)=>a+b,0)/values.length;
}

export function alignComponentAxisToAnchor(mesh,vertexIndices,axis,target,fixedVertexIndices=[]){
  if(!mesh||!['x','y','z'].includes(axis)||!Number.isFinite(target)||!vertexIndices?.length)return null;
  const fixed=new Set(fixedVertexIndices||[]);
  let moved=0;
  for(const i of vertexIndices){
    if(fixed.has(i))continue;
    const v=mesh.vertices?.[i];
    if(!v)continue;
    v[axis]=target;
    moved++;
  }
  mesh.edges?.();
  return{axis,target,count:vertexIndices.length,moved,fixed:fixed.size};
}

// Plan a rigid Face-group placement; the gesture owner validates and commits it.
export function planFaceAlignment(mesh,faceIndices,anchorIndex){
  const fail=reason=>({ok:false,reason});
  const ids=[...new Set(faceIndices||[])];
  if(!mesh?.clone||ids.length<2||!ids.includes(anchorIndex))return fail('Select moving Faces and a fixed Face');
  if(!Array.isArray(mesh.faces)||mesh.faces.some(face=>!Array.isArray(face)))return fail('Repair existing invalid Faces first');
  function plane(indices){
    const points=indices.map(i=>mesh.vertices?.[i]);
    if(indices.length<3||new Set(indices).size!==indices.length||points.some(p=>!p||![p.x,p.y,p.z].every(Number.isFinite)))return null;
    const normal=new THREE.Vector3(),center=new THREE.Vector3(),box=new THREE.Box3();
    for(let i=0;i<points.length;i++){
      const a=points[i],b=points[(i+1)%points.length];
      normal.x+=(a.y-b.y)*(a.z+b.z);normal.y+=(a.z-b.z)*(a.x+b.x);normal.z+=(a.x-b.x)*(a.y+b.y);
      center.add(a);box.expandByPoint(a);
    }
    if(normal.lengthSq()<1e-20)return null;
    normal.normalize();center.multiplyScalar(1/points.length);
    const tolerance=Math.max(1e-7,box.getSize(new THREE.Vector3()).length()*1e-6);
    if(points.some(p=>Math.abs(p.clone().sub(center).dot(normal))>tolerance))return null;
    return{normal,center,tolerance};
  }
  if(ids.some(i=>!Number.isInteger(i)||!Array.isArray(mesh.faces?.[i])))return fail('Selected Face is invalid');
  const fixed=mesh.faces[anchorIndex],target=plane(fixed),movingFaces=ids.filter(i=>i!==anchorIndex);
  if(!target)return fail('Fixed Face must be planar and non-degenerate');
  const source=plane(mesh.faces[movingFaces[0]]);
  if(!source)return fail('Moving Faces must form a planar group');
  const moving=componentVertexIndices(mesh,'face',movingFaces),fixedSet=new Set(fixed);
  const center=new THREE.Vector3(),box=new THREE.Box3();
  for(const i of moving){center.add(mesh.vertices[i]);box.expandByPoint(mesh.vertices[i]);}
  center.multiplyScalar(1/moving.length);
  const tolerance=Math.max(source.tolerance,target.tolerance,box.getSize(new THREE.Vector3()).length()*1e-6);
  if(movingFaces.some(i=>!plane(mesh.faces[i]))||moving.some(i=>Math.abs(mesh.vertices[i].clone().sub(source.center).dot(source.normal))>tolerance))return fail('Moving Faces must form one coplanar group; bent groups are not flattened');
  const shared=moving.filter(i=>fixedSet.has(i));
  // A shared point/edge can act as a hinge if the rigid rotation keeps it fixed.
  const pivot=shared.length?shared.reduce((p,i)=>p.add(mesh.vertices[i]),new THREE.Vector3()).multiplyScalar(1/shared.length):center;
  const destination=target.normal.clone();
  // Plane alignment does not require flipping an already opposing face winding.
  if(destination.dot(source.normal)<0)destination.negate();
  const rotation=surfaceAlignmentQuaternion(destination,source.normal);
  const offset=-pivot.clone().sub(target.center).dot(target.normal);
  const candidate=mesh.clone();
  if(mesh.looseEdges instanceof Set)candidate.looseEdges=new Set(mesh.looseEdges);
  if(mesh.looseVertices instanceof Set)candidate.looseVertices=new Set(mesh.looseVertices);
  let changed=false;
  for(const i of moving){
    const position=mesh.vertices[i].clone().sub(pivot).applyQuaternion(rotation).add(pivot).addScaledVector(target.normal,offset);
    if(![position.x,position.y,position.z].every(Number.isFinite))return fail('Alignment produced invalid coordinates');
    if(fixedSet.has(i)){
      if(position.distanceTo(mesh.vertices[i])>tolerance)return fail('Shared vertices prevent rigid alignment while keeping the fixed Face unchanged');
      continue;
    }
    changed ||= position.distanceTo(mesh.vertices[i])>tolerance;
    candidate.vertices[i].copy(position);
  }
  if(moving.some(i=>Math.abs(candidate.vertices[i].clone().sub(target.center).dot(target.normal))>tolerance))return fail('Cannot make the moving group coplanar without changing its shape');
  const changedVertices=new Set(moving.filter(i=>!fixedSet.has(i)));
  for(const face of candidate.faces){
    if(!face.some(i=>changedVertices.has(i)))continue;
    const points=face.map(i=>candidate.vertices[i]);
    if(points.some(p=>!p))return fail('Neighbouring Face has invalid vertices');
    // Index-based topology gates cannot see coincident non-adjacent vertices.
    for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++){
      if(points[i].distanceToSquared(points[j])<1e-16)return fail('Alignment would collapse neighbouring geometry');
    }
    const area=new THREE.Vector3();
    for(let i=1;i<points.length-1;i++)area.add(points[i].clone().sub(points[0]).cross(points[i+1].clone().sub(points[0])));
    if(area.lengthSq()<1e-20)return fail('Alignment would collapse neighbouring geometry');
  }
  return{ok:true,candidate,moving:moving.filter(i=>!fixedSet.has(i)),changed};
}
import * as THREE from 'three';
import {surfaceAlignmentQuaternion} from './surface-transform-core.js?v=0.36.18.442';
