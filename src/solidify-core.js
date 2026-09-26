import * as THREE from 'three';
import {applyMirror} from './mirror.js';

const EPS=1e-9;
const NORMAL_MATCH=0.999999;
const MAX_MITER=25;
const edgeKey=(a,b)=>a<b?`${a}:${b}`:`${b}:${a}`;
function activeSymmetryAxes(axes={}){return ['x','y','z'].filter(axis=>!!axes?.[axis]);}
function axisCoord(v,axis){return axis==='x'?v.x:axis==='y'?v.y:v.z;}
function zeroAxis(v,axis){if(axis==='x')v.x=0;else if(axis==='y')v.y=0;else v.z=0;return v;}
function vertexOnSymmetryPlane(v,axis){return Math.abs(axisCoord(v,axis))<=1e-7;}
function edgeOnSymmetryPlane(mesh,edge,axes){
  return activeSymmetryAxes(axes).some(axis=>vertexOnSymmetryPlane(mesh.vertices[edge.a],axis)&&vertexOnSymmetryPlane(mesh.vertices[edge.b],axis));
}

function cloneState(mesh){
  return {
    vertices:mesh.vertices.map(v=>v.clone()),
    faces:mesh.faces.map(f=>[...f]),
    creases:new Map(mesh.creases||[])
  };
}
function restoreState(mesh,state){
  mesh.vertices=state.vertices.map(v=>v.clone());
  mesh.faces=state.faces.map(f=>[...f]);
  mesh.creases=new Map(state.creases||[]);
  mesh.edges?.();
}
function inspect(mesh){
  const result={ok:false,reason:'invalid-mesh',boundary:[],edgeUse:new Map()};
  if(!mesh||!Array.isArray(mesh.vertices)||!Array.isArray(mesh.faces)||!mesh.faces.length)return result;
  const seenFaces=new Set();
  for(let fi=0;fi<mesh.faces.length;fi++){
    const face=mesh.faces[fi];
    if(!Array.isArray(face)||face.length<3||new Set(face).size!==face.length)return{...result,reason:'degenerate-face'};
    for(const vi of face)if(!Number.isInteger(vi)||vi<0||vi>=mesh.vertices.length)return{...result,reason:'invalid-vertex-reference'};
    const canonical=[...face].sort((a,b)=>a-b).join(':');
    if(seenFaces.has(canonical))return{...result,reason:'duplicate-face'};
    seenFaces.add(canonical);
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length],key=edgeKey(a,b);
      if(!result.edgeUse.has(key))result.edgeUse.set(key,[]);
      result.edgeUse.get(key).push({a,b,face:fi});
    }
  }
  const boundaryDegree=new Map();
  for(const [key,uses] of result.edgeUse){
    if(uses.length>2)return{...result,reason:'non-manifold-edge',edge:key};
    if(uses.length===2){
      const [u,v]=uses;
      if(!(u.a===v.b&&u.b===v.a))return{...result,reason:'inconsistent-winding',edge:key};
    }else{
      result.boundary.push(uses[0]);
      boundaryDegree.set(uses[0].a,(boundaryDegree.get(uses[0].a)||0)+1);
      boundaryDegree.set(uses[0].b,(boundaryDegree.get(uses[0].b)||0)+1);
    }
  }
  if(!result.boundary.length)return{...result,reason:'closed-mesh'};
  if([...boundaryDegree.values()].some(count=>count!==2))return{...result,reason:'branched-boundary'};
  return{...result,ok:true,reason:null};
}
function faceAreaNormal(mesh,face){
  const origin=mesh.vertices[face[0]],sum=new THREE.Vector3();
  for(let i=1;i<face.length-1;i++){
    const a=new THREE.Vector3().subVectors(mesh.vertices[face[i]],origin);
    const b=new THREE.Vector3().subVectors(mesh.vertices[face[i+1]],origin);
    sum.add(new THREE.Vector3().crossVectors(a,b));
  }
  return sum;
}
function faceUnitNormals(mesh){
  const normals=[];
  for(const face of mesh.faces){
    const n=faceAreaNormal(mesh,face);
    if(n.lengthSq()<=EPS*EPS)return{ok:false,reason:'zero-area-face'};
    normals.push(n.normalize());
  }
  return{ok:true,normals};
}
function uniqueIncidentNormals(mesh,faceNormals){
  const perVertex=mesh.vertices.map(()=>[]);
  for(let fi=0;fi<mesh.faces.length;fi++){
    const n=faceNormals[fi];
    for(const vi of mesh.faces[fi]){
      const list=perVertex[vi];
      if(!list.some(existing=>existing.dot(n)>=NORMAL_MATCH))list.push(n.clone());
    }
  }
  return perVertex;
}
function solveOffsetVector(normals,distance){
  const target=-distance;
  if(!normals.length)return{ok:false,reason:'zero-vertex-normal'};
  if(normals.length===1)return{ok:true,delta:normals[0].clone().multiplyScalar(target)};

  if(normals.length===2){
    const a=normals[0],b=normals[1],c=THREE.MathUtils.clamp(a.dot(b),-1,1);
    const denom=1+c;
    if(Math.abs(denom)<=1e-7)return{ok:false,reason:'opposed-fold'};
    const delta=a.clone().add(b).multiplyScalar(target/denom);
    if(delta.length()>Math.abs(distance)*MAX_MITER)return{ok:false,reason:'excessive-miter'};
    return{ok:true,delta};
  }

  let m00=0,m01=0,m02=0,m11=0,m12=0,m22=0;
  const rhs=new THREE.Vector3();
  for(const n of normals){
    m00+=n.x*n.x;m01+=n.x*n.y;m02+=n.x*n.z;
    m11+=n.y*n.y;m12+=n.y*n.z;m22+=n.z*n.z;
    rhs.addScaledVector(n,target);
  }
  const matrix=new THREE.Matrix3().set(
    m00,m01,m02,
    m01,m11,m12,
    m02,m12,m22
  );
  if(Math.abs(matrix.determinant())<=1e-10){
    let best=null,bestCross=0;
    for(let i=0;i<normals.length;i++)for(let j=i+1;j<normals.length;j++){
      const cross=new THREE.Vector3().crossVectors(normals[i],normals[j]).lengthSq();
      if(cross>bestCross){bestCross=cross;best=[normals[i],normals[j]];}
    }
    return best&&bestCross>1e-10?solveOffsetVector(best,distance):{ok:false,reason:'singular-offset'};
  }
  const delta=rhs.applyMatrix3(matrix.clone().invert());
  if(delta.length()>Math.abs(distance)*MAX_MITER)return{ok:false,reason:'excessive-miter'};
  return{ok:true,delta};
}
function offsetVectors(mesh,distance){
  const faces=faceUnitNormals(mesh);
  if(!faces.ok)return faces;
  const incident=uniqueIncidentNormals(mesh,faces.normals),vectors=[];
  for(let i=0;i<incident.length;i++){
    const solved=solveOffsetVector(incident[i],distance);
    if(!solved.ok)return{...solved,vertex:i};
    vectors.push(solved.delta);
  }
  return{ok:true,vectors,faceNormals:faces.normals,incidentNormals:incident};
}
function inspectClosed(mesh){
  const uses=new Map(),seenFaces=new Set();
  for(let fi=0;fi<mesh.faces.length;fi++){
    const face=mesh.faces[fi];
    if(!Array.isArray(face)||face.length<3||new Set(face).size!==face.length)return{ok:false,reason:'degenerate-face'};
    const canonical=[...face].sort((a,b)=>a-b).join(':');
    if(seenFaces.has(canonical))return{ok:false,reason:'duplicate-face'};
    seenFaces.add(canonical);
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length];
      if(!Number.isInteger(a)||!Number.isInteger(b)||!mesh.vertices[a]||!mesh.vertices[b])return{ok:false,reason:'invalid-vertex-reference'};
      const key=edgeKey(a,b);
      if(!uses.has(key))uses.set(key,[]);
      uses.get(key).push({a,b});
    }
  }
  for(const [key,list] of uses){
    if(list.length!==2)return{ok:false,reason:list.length===1?'open-boundary':'non-manifold-edge',edge:key};
    if(!(list[0].a===list[1].b&&list[0].b===list[1].a))return{ok:false,reason:'inconsistent-winding',edge:key};
  }
  return{ok:true,edges:uses.size};
}

export function analyzeSolidifyInput(mesh){
  const topology=inspect(mesh);
  if(!topology.ok)return topology;
  const offsets=offsetVectors(mesh,1);
  if(!offsets.ok)return offsets;
  return{ok:true,boundaryEdges:topology.boundary.length};
}

export function solidifyOpenMesh(mesh,thickness=0.2,{symmetryAxes=null}={}){
  const distance=Number(thickness);
  if(!Number.isFinite(distance)||Math.abs(distance)<=EPS)return{ok:false,changed:false,reason:'invalid-thickness'};
  const topology=inspect(mesh);
  if(!topology.ok)return{...topology,changed:false};
  const offsets=offsetVectors(mesh,distance);
  if(!offsets.ok)return{...offsets,changed:false};

  const before=cloneState(mesh),count=mesh.vertices.length,activeAxes=activeSymmetryAxes(symmetryAxes||{});
  try{
    for(let i=0;i<count;i++){
      const inner=mesh.vertices[i].clone().add(offsets.vectors[i]);
      for(const axis of activeAxes)if(vertexOnSymmetryPlane(mesh.vertices[i],axis))zeroAxis(inner,axis);
      mesh.vertices.push(inner);
    }
    const originalFaces=mesh.faces.map(f=>[...f]);
    const innerFaces=originalFaces.map(face=>face.map(vi=>vi+count).reverse());
    const sideFaces=[],symmetryBoundary=[];
    for(const edge of topology.boundary){
      if(activeAxes.length&&edgeOnSymmetryPlane(mesh,edge,symmetryAxes)){symmetryBoundary.push(edge);continue;}
      sideFaces.push([edge.a,edge.a+count,edge.b+count,edge.b]);
    }
    mesh.faces=[...originalFaces,...innerFaces,...sideFaces];

    const creases=new Map(before.creases||[]);
    for(const [key,strength] of before.creases||[]){
      const [a,b]=String(key).split(':').map(Number);
      if(Number.isInteger(a)&&Number.isInteger(b))creases.set(edgeKey(a+count,b+count),strength);
    }
    mesh.creases=creases;
    mesh.edges?.();

    const validationTarget=activeAxes.length?applyMirror(mesh,symmetryAxes):mesh;
    const validation=inspectClosed(validationTarget);
    if(!validation.ok){
      restoreState(mesh,before);
      return{ok:false,changed:false,rolledBack:true,reason:`validation-${validation.reason}`,validation};
    }
    return{
      ok:true,changed:true,thickness:distance,
      before:{vertices:count,faces:originalFaces.length,boundaryEdges:topology.boundary.length},
      after:{vertices:mesh.vertices.length,faces:mesh.faces.length,boundaryEdges:0},
      sideFaces:sideFaces.length,
      symmetryBoundaryEdges:symmetryBoundary.length,
      symmetryAxes:activeAxes
    };
  }catch(error){
    restoreState(mesh,before);
    return{ok:false,changed:false,rolledBack:true,reason:error?.message||'solidify-exception',error};
  }
}

export const __solidifyInternals={edgeKey,inspect,inspectClosed,faceUnitNormals,uniqueIncidentNormals,solveOffsetVector,offsetVectors,edgeOnSymmetryPlane,vertexOnSymmetryPlane};
