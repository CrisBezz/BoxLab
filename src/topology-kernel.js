// BoxLab v0.36.18.207 — canonical topology mutation kernel.
// Shared edge insertion + polygon face fragmentation for modelling tools and future Boolean operations.
import * as THREE from 'three';

const VERSION='0.36.18.207';
const MIN_T=1e-5;

function edgeKey(mesh,a,b){return mesh?.edgeKey?mesh.edgeKey(a,b):(a<b?`${a}:${b}`:`${b}:${a}`);}

function edgeOccurrences(mesh,a,b){
  const occurrences=[];
  if(!mesh?.faces)return occurrences;
  mesh.faces.forEach((face,faceIndex)=>{
    if(!Array.isArray(face)||face.length<3)return;
    for(let i=0;i<face.length;i++){
      const x=face[i],y=face[(i+1)%face.length];
      if((x===a&&y===b)||(x===b&&y===a))occurrences.push({faceIndex,slot:i,forward:x===a&&y===b});
    }
  });
  return occurrences;
}

function inspectEdge(mesh,a,b,{allowBoundary=true}={}){
  if(!mesh?.vertices||!mesh?.faces)return{ok:false,reason:'No editable mesh'};
  if(!Number.isInteger(a)||!Number.isInteger(b)||a===b||!mesh.vertices[a]||!mesh.vertices[b])return{ok:false,reason:'Invalid edge vertices'};
  const occurrences=edgeOccurrences(mesh,a,b);
  if(!occurrences.length)return{ok:false,reason:'Edge is not used by any face'};
  const faces=[...new Set(occurrences.map(item=>item.faceIndex))];
  if(occurrences.length!==faces.length)return{ok:false,reason:'Edge is repeated inside a face'};
  if(faces.length>2)return{ok:false,reason:'Non-manifold edge has more than two incident faces'};
  if(!allowBoundary&&faces.length!==2)return{ok:false,reason:'Operation requires a manifold interior edge'};
  const pa=mesh.vertices[a],pb=mesh.vertices[b];
  const length=pa.distanceTo?pa.distanceTo(pb):Math.hypot(pb.x-pa.x,pb.y-pa.y,pb.z-pa.z);
  if(!Number.isFinite(length)||length<1e-12)return{ok:false,reason:'Collapsed edge'};
  return{ok:true,a,b,key:edgeKey(mesh,a,b),occurrences,faces,boundary:faces.length===1,manifold:faces.length===2,length};
}

function splitEdge(mesh,a,b,t=.5,options={}){
  const check=inspectEdge(mesh,a,b,options);
  if(!check.ok)return check;
  const amount=THREE.MathUtils.clamp(Number(t)||.5,MIN_T,1-MIN_T);
  const point=mesh.vertices[a].clone().lerp(mesh.vertices[b],amount);
  if(!Number.isFinite(point.x)||!Number.isFinite(point.y)||!Number.isFinite(point.z))return{ok:false,reason:'Invalid split position'};
  const replacements=[];
  for(const occurrence of check.occurrences){
    const face=mesh.faces[occurrence.faceIndex];
    if(!Array.isArray(face)||face.length<3)return{ok:false,reason:'Invalid incident face'};
    replacements.push({faceIndex:occurrence.faceIndex,slot:occurrence.slot,face:[...face]});
  }
  const vertex=mesh.vertices.length;
  replacements.forEach(item=>item.face.splice(item.slot+1,0,vertex));
  mesh.vertices.push(point);
  replacements.forEach(item=>{mesh.faces[item.faceIndex]=item.face;});
  const crease=mesh.creases instanceof Map?(mesh.creases.get(check.key)||0):0;
  if(mesh.creases instanceof Map){
    mesh.creases.delete(check.key);
    if(crease>0){mesh.creases.set(edgeKey(mesh,a,vertex),crease);mesh.creases.set(edgeKey(mesh,vertex,b),crease);}
  }
  return{ok:true,vertex,position:amount,oldEdgeKey:check.key,edgeKeys:[edgeKey(mesh,a,vertex),edgeKey(mesh,vertex,b)],incidentFaces:[...check.faces],boundary:check.boundary,manifold:check.manifold,crease};
}

function splitEdgeByIndex(mesh,edgeIndex,t=.5,options={}){
  const edge=mesh?.edges?.()[edgeIndex];
  if(!edge)return{ok:false,reason:'Edge not found'};
  return splitEdge(mesh,edge.a,edge.b,t,options);
}

function splitEdgeByKey(mesh,key,t=.5,options={}){
  if(typeof key!=='string')return{ok:false,reason:'Invalid edge key'};
  const parts=key.split(':').map(Number);
  if(parts.length!==2||parts.some(value=>!Number.isInteger(value)))return{ok:false,reason:'Invalid edge key'};
  return splitEdge(mesh,parts[0],parts[1],t,options);
}

function walkFace(face,start,end){
  const path=[];let i=start;
  for(let guard=0;guard<=face.length;guard++){
    path.push(face[i]);
    if(i===end)return path;
    i=(i+1)%face.length;
  }
  return null;
}

function inspectFaceSplit(mesh,a,b,{faceIndex=null}={}){
  if(!mesh?.vertices||!mesh?.faces)return{ok:false,reason:'No editable mesh'};
  if(!Number.isInteger(a)||!Number.isInteger(b)||a===b||!mesh.vertices[a]||!mesh.vertices[b])return{ok:false,reason:'Invalid split vertices'};
  if(edgeOccurrences(mesh,a,b).length)return{ok:false,reason:'Vertices already share an edge'};
  const candidates=[];
  mesh.faces.forEach((face,index)=>{
    if(faceIndex!==null&&index!==faceIndex)return;
    if(!Array.isArray(face)||face.length<4)return;
    const ia=face.indexOf(a),ib=face.indexOf(b);
    if(ia<0||ib<0)return;
    const n=face.length;
    if(face[(ia+1)%n]===b||face[(ia-1+n)%n]===b)return;
    const pathA=walkFace(face,ia,ib),pathB=walkFace(face,ib,ia);
    if(!pathA||!pathB||pathA.length<3||pathB.length<3)return;
    if(new Set(pathA).size!==pathA.length||new Set(pathB).size!==pathB.length)return;
    candidates.push({faceIndex:index,pathA,pathB});
  });
  if(!candidates.length)return{ok:false,reason:'Vertices do not define a clean split on one polygon face'};
  if(candidates.length>1)return{ok:false,reason:'Split is ambiguous across multiple faces'};
  const candidate=candidates[0];
  return{ok:true,a,b,faceIndex:candidate.faceIndex,pathA:candidate.pathA,pathB:candidate.pathB,newEdgeKey:edgeKey(mesh,a,b)};
}

function splitFace(mesh,a,b,options={}){
  const check=inspectFaceSplit(mesh,a,b,options);
  if(!check.ok)return check;
  const replacementA=[...check.pathA],replacementB=[...check.pathB];
  mesh.faces.splice(check.faceIndex,1,replacementA,replacementB);
  return{ok:true,faceIndex:check.faceIndex,faceIndices:[check.faceIndex,check.faceIndex+1],faces:[replacementA,replacementB],edgeKey:check.newEdgeKey};
}

function restoreMesh(mesh,snapshot){
  if(!mesh||!snapshot)return false;
  mesh.vertices=snapshot.vertices.map(v=>v.clone());
  mesh.faces=snapshot.faces.map(face=>[...face]);
  mesh.creases=new Map(snapshot.creases||[]);
  return true;
}

export {VERSION,edgeKey,edgeOccurrences,inspectEdge,splitEdge,splitEdgeByIndex,splitEdgeByKey,inspectFaceSplit,splitFace,restoreMesh};
globalThis.__boxlabTopologyKernel={version:VERSION,edgeKey,edgeOccurrences,inspectEdge,splitEdge,splitEdgeByIndex,splitEdgeByKey,inspectFaceSplit,splitFace,restoreMesh};
