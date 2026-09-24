import * as THREE from 'three';
import {topologySummary} from './topology-seam-conformance.js?v=0.36.18.236';
import {analyzeMeshHealth} from './mesh-health-core.js?v=0.36.18.443';

function edgeKey(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}
function cloneInto(target,source){
  target.vertices=source.vertices.map(v=>v.clone());
  target.faces=source.faces.map(f=>[...f]);
  target.faceGroups=source.faces.map((_,i)=>source.faceGroups?.[i]??null);
  target.creases=new Map(source.creases||[]);
  if(source.looseEdges instanceof Set)target.looseEdges=new Set(source.looseEdges);
  if(source.looseVertices instanceof Set)target.looseVertices=new Set(source.looseVertices);
  target.edges?.();
}
function edgeUses(mesh){
  const uses=new Map();
  for(let fi=0;fi<mesh.faces.length;fi++){
    const face=mesh.faces[fi];
    if(!Array.isArray(face)||face.length<3)continue;
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length],key=edgeKey(a,b);
      if(!uses.has(key))uses.set(key,[]);
      uses.get(key).push({fi,a,b});
    }
  }
  return uses;
}
export function unifyFaceWinding(mesh){
  if(!mesh?.clone)return{ok:false,changed:false,reason:'invalid-mesh'};
  const topo=topologySummary(mesh);
  if(topo.invalidFaces||topo.nonManifoldEdges)return{ok:false,changed:false,reason:'ambiguous-topology',before:analyzeMeshHealth(mesh)};
  const candidate=mesh.clone(),uses=edgeUses(candidate);
  const neighbours=new Map();
  for(let fi=0;fi<candidate.faces.length;fi++)neighbours.set(fi,[]);
  for(const owners of uses.values()){
    if(owners.length!==2)continue;
    const [a,b]=owners;
    const sameDirection=a.a===b.a&&a.b===b.b;
    neighbours.get(a.fi).push({fi:b.fi,flip:sameDirection});
    neighbours.get(b.fi).push({fi:a.fi,flip:sameDirection});
  }
  const orientation=new Map();
  for(let seed=0;seed<candidate.faces.length;seed++){
    if(orientation.has(seed))continue;
    orientation.set(seed,false);
    const queue=[seed];
    while(queue.length){
      const fi=queue.shift(),current=orientation.get(fi);
      for(const link of neighbours.get(fi)||[]){
        const wanted=Boolean(current)!==Boolean(link.flip);
        if(!orientation.has(link.fi)){orientation.set(link.fi,wanted);queue.push(link.fi);}
        else if(orientation.get(link.fi)!==wanted)return{ok:false,changed:false,reason:'winding-conflict',before:analyzeMeshHealth(mesh)};
      }
    }
  }
  let flippedFaces=0;
  for(const [fi,flip] of orientation){
    if(!flip)continue;
    candidate.faces[fi]=[...candidate.faces[fi]].reverse();
    flippedFaces++;
  }
  if(!flippedFaces)return{ok:true,changed:false,reason:'already-consistent',flippedFaces:0,before:analyzeMeshHealth(mesh),after:analyzeMeshHealth(mesh)};
  candidate.edges?.();
  const after=analyzeMeshHealth(candidate);
  if(after.inconsistentWindingEdges>0||after.nonManifoldEdges>topo.nonManifoldEdges||after.invalidFaces>topo.invalidFaces)
    return{ok:false,changed:false,rolledBack:true,reason:'winding-validation-refused',flippedFaces,before:analyzeMeshHealth(mesh),after};
  cloneInto(mesh,candidate);
  return{ok:true,changed:true,reason:'winding-unified',flippedFaces,before:analyzeMeshHealth(mesh),after};
}
export function flipAllFaces(mesh){
  if(!mesh?.clone||!Array.isArray(mesh.faces))return{ok:false,changed:false,reason:'invalid-mesh'};
  if(!mesh.faces.length)return{ok:true,changed:false,reason:'no-faces',flippedFaces:0};
  const candidate=mesh.clone();
  candidate.faces=candidate.faces.map(face=>[...face].reverse());
  candidate.edges?.();
  const before=analyzeMeshHealth(mesh),after=analyzeMeshHealth(candidate);
  if(after.invalidFaces>before.invalidFaces||after.nonManifoldEdges>before.nonManifoldEdges)
    return{ok:false,changed:false,rolledBack:true,reason:'flip-validation-refused',before,after,flippedFaces:0};
  cloneInto(mesh,candidate);
  return{ok:true,changed:true,reason:'all-faces-flipped',flippedFaces:candidate.faces.length,before,after};
}
function newellNormal(mesh,face){
  const n=new THREE.Vector3();
  for(let i=0;i<face.length;i++){
    const a=mesh.vertices[face[i]],b=mesh.vertices[face[(i+1)%face.length]];
    n.x+=(a.y-b.y)*(a.z+b.z);
    n.y+=(a.z-b.z)*(a.x+b.x);
    n.z+=(a.x-b.x)*(a.y+b.y);
  }
  return n;
}
function projectedFace(mesh,face){
  const n=newellNormal(mesh,face);
  if(n.lengthSq()<=1e-20)return null;
  const ax=Math.abs(n.x),ay=Math.abs(n.y),az=Math.abs(n.z);
  if(ax>=ay&&ax>=az)return face.map(i=>new THREE.Vector2(mesh.vertices[i].y,mesh.vertices[i].z));
  if(ay>=ax&&ay>=az)return face.map(i=>new THREE.Vector2(mesh.vertices[i].x,mesh.vertices[i].z));
  return face.map(i=>new THREE.Vector2(mesh.vertices[i].x,mesh.vertices[i].y));
}
function triangulateFace(mesh,face){
  if(face.length===3)return[[...face]];
  const projected=projectedFace(mesh,face);
  const sourceNormal=newellNormal(mesh,face);
  if(!projected||sourceNormal.lengthSq()<=1e-20)return null;
  const triangles=THREE.ShapeUtils.triangulateShape(projected,[]);
  if(!Array.isArray(triangles)||triangles.length!==face.length-2)return null;
  return triangles.map(tri=>{
    const mapped=tri.map(local=>face[local]);
    const a=mesh.vertices[mapped[0]],b=mesh.vertices[mapped[1]],d=mesh.vertices[mapped[2]];
    const triNormal=new THREE.Vector3().crossVectors(
      new THREE.Vector3().subVectors(b,a),
      new THREE.Vector3().subVectors(d,a)
    );
    if(triNormal.dot(sourceNormal)<0)mapped.reverse();
    return mapped;
  });
}
export function triangulateMesh(mesh){
  if(!mesh?.clone)return{ok:false,changed:false,reason:'invalid-mesh'};
  const before=analyzeMeshHealth(mesh),candidate=mesh.clone(),faces=[],faceGroups=[];
  let polygonFaces=0,trianglesCreated=0;
  for(let faceIndex=0;faceIndex<candidate.faces.length;faceIndex++){
    const face=candidate.faces[faceIndex];
    if(!Array.isArray(face)||face.length<3)return{ok:false,changed:false,reason:'invalid-face',before};
    const tris=triangulateFace(candidate,face);
    if(!tris)return{ok:false,changed:false,reason:'triangulation-failed',before};
    if(face.length>3){polygonFaces++;trianglesCreated+=tris.length;}
    faces.push(...tris);
    for(let i=0;i<tris.length;i++)faceGroups.push(candidate.faceGroups?.[faceIndex]??null);
  }
  if(!polygonFaces)return{ok:true,changed:false,reason:'already-triangulated',polygonFaces:0,trianglesCreated:0,before,after:before};
  candidate.faces=faces;candidate.faceGroups=faceGroups;candidate.edges?.();
  const after=analyzeMeshHealth(candidate);
  if(after.invalidFaces>before.invalidFaces||after.nonManifoldEdges>before.nonManifoldEdges||after.boundaryEdges>before.boundaryEdges)
    return{ok:false,changed:false,rolledBack:true,reason:'triangulation-validation-refused',before,after,polygonFaces,trianglesCreated};
  cloneInto(mesh,candidate);
  return{ok:true,changed:true,reason:'mesh-triangulated',before,after,polygonFaces,trianglesCreated};
}
