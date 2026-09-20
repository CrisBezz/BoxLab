import * as THREE from 'three';

const EPS=1e-9;
const edgeKey=(a,b)=>a<b?`${a}:${b}`:`${b}:${a}`;

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
function vertexNormals(mesh){
  const normals=mesh.vertices.map(()=>new THREE.Vector3());
  for(const face of mesh.faces){
    const n=faceAreaNormal(mesh,face);
    if(n.lengthSq()<=EPS*EPS)return{ok:false,reason:'zero-area-face'};
    for(const vi of face)normals[vi].add(n);
  }
  for(let i=0;i<normals.length;i++){
    if(normals[i].lengthSq()<=EPS*EPS)return{ok:false,reason:'zero-vertex-normal',vertex:i};
    normals[i].normalize();
  }
  return{ok:true,normals};
}
function validateClosed(mesh){
  const check=inspectClosed(mesh);
  return check.ok;
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
  const normals=vertexNormals(mesh);
  if(!normals.ok)return normals;
  return{ok:true,boundaryEdges:topology.boundary.length,normals:normals.normals};
}

export function solidifyOpenMesh(mesh,thickness=0.2){
  const distance=Number(thickness);
  if(!Number.isFinite(distance)||Math.abs(distance)<=EPS)return{ok:false,changed:false,reason:'invalid-thickness'};
  const analysis=analyzeSolidifyInput(mesh);
  if(!analysis.ok)return{...analysis,changed:false};
  const before=cloneState(mesh),count=mesh.vertices.length;
  try{
    const offset=-distance;
    for(let i=0;i<count;i++)mesh.vertices.push(mesh.vertices[i].clone().addScaledVector(analysis.normals[i],offset));
    const originalFaces=mesh.faces.map(f=>[...f]);
    const innerFaces=originalFaces.map(face=>face.map(vi=>vi+count).reverse());
    const sideFaces=[];
    const topology=inspect({vertices:before.vertices,faces:before.faces});
    if(!topology.ok)throw new Error(topology.reason||'boundary-analysis-failed');
    for(const edge of topology.boundary)sideFaces.push([edge.a,edge.a+count,edge.b+count,edge.b]);
    mesh.faces=[...originalFaces,...innerFaces,...sideFaces];

    const creases=new Map(before.creases||[]);
    for(const [key,strength] of before.creases||[]){
      const [a,b]=String(key).split(':').map(Number);
      if(Number.isInteger(a)&&Number.isInteger(b))creases.set(edgeKey(a+count,b+count),strength);
    }
    mesh.creases=creases;
    mesh.edges?.();
    const validation=inspectClosed(mesh);
    if(!validation.ok){
      restoreState(mesh,before);
      return{ok:false,changed:false,rolledBack:true,reason:`validation-${validation.reason}`,validation};
    }
    return{
      ok:true,changed:true,thickness:distance,
      before:{vertices:count,faces:originalFaces.length,boundaryEdges:analysis.boundaryEdges},
      after:{vertices:mesh.vertices.length,faces:mesh.faces.length,boundaryEdges:0},
      sideFaces:sideFaces.length
    };
  }catch(error){
    restoreState(mesh,before);
    return{ok:false,changed:false,rolledBack:true,reason:error?.message||'solidify-exception',error};
  }
}

export const __solidifyInternals={edgeKey,inspect,inspectClosed,vertexNormals,validateClosed};
