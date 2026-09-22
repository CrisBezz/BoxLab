// BoxLab v0.36.18.208 — canonical topology mutation kernel.
// Shared edge insertion + polygon fragmentation + transactional face-boundary segment insertion.
import * as THREE from 'three';

const VERSION='0.36.18.208';
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

function boundaryRef(mesh,faceIndex,ref){
  const face=mesh?.faces?.[faceIndex];
  if(!Array.isArray(face)||face.length<3)return{ok:false,reason:'Target face not found'};
  if(Number.isInteger(ref?.vertex)){
    if(!face.includes(ref.vertex))return{ok:false,reason:'Boundary vertex is not on the target face'};
    return{ok:true,type:'vertex',vertex:ref.vertex};
  }
  if(typeof ref?.edgeKey!=='string')return{ok:false,reason:'Boundary point needs a vertex or edge key'};
  const parts=ref.edgeKey.split(':').map(Number);
  if(parts.length!==2||parts.some(value=>!Number.isInteger(value)))return{ok:false,reason:'Invalid boundary edge key'};
  const edge=inspectEdge(mesh,parts[0],parts[1],{allowBoundary:true});
  if(!edge.ok)return edge;
  if(!edge.faces.includes(faceIndex))return{ok:false,reason:'Boundary edge is not on the target face'};
  return{ok:true,type:'edge',edgeKey:edge.key,t:THREE.MathUtils.clamp(Number(ref.t)||.5,MIN_T,1-MIN_T)};
}

function insertFaceSegment(mesh,faceIndex,start,end,{validator=null}={}){
  if(!mesh?.clone)return{ok:false,reason:'Editable mesh snapshot unavailable'};
  const snapshot=mesh.clone();
  const a=boundaryRef(mesh,faceIndex,start),b=boundaryRef(mesh,faceIndex,end);
  if(!a.ok||!b.ok)return{ok:false,reason:!a.ok?a.reason:b.reason};
  if(a.type==='vertex'&&b.type==='vertex'&&a.vertex===b.vertex)return{ok:false,reason:'Segment endpoints are identical'};
  if(a.type==='edge'&&b.type==='edge'&&a.edgeKey===b.edgeKey)return{ok:false,reason:'Segment endpoints cannot lie on the same edge'};
  const resolve=ref=>ref.type==='vertex'?{ok:true,vertex:ref.vertex}:splitEdgeByKey(mesh,ref.edgeKey,ref.t,{allowBoundary:true});
  const ar=resolve(a);
  const br=ar.ok?resolve(b):ar;
  const faceResult=ar.ok&&br.ok?splitFace(mesh,ar.vertex,br.vertex,{faceIndex}):null;
  let validation=null;
  if(faceResult?.ok&&typeof validator==='function'){
    try{validation=validator(mesh);}catch(error){validation={valid:false,error};}
  }
  const invalid=!ar.ok||!br.ok||!faceResult?.ok||validation===false||validation?.valid===false;
  if(invalid){
    restoreMesh(mesh,snapshot);
    const reason=!ar.ok?ar.reason:!br.ok?br.reason:!faceResult?.ok?faceResult?.reason:'Topology validation failed';
    return{ok:false,reason,rolledBack:true,validation};
  }
  return{ok:true,faceIndex,vertices:[ar.vertex,br.vertex],edgeKey:faceResult.edgeKey,faceIndices:faceResult.faceIndices,edgeSplits:[a.type==='edge'?ar:null,b.type==='edge'?br:null].filter(Boolean),validation};
}

export {VERSION,edgeKey,edgeOccurrences,inspectEdge,splitEdge,splitEdgeByIndex,splitEdgeByKey,inspectFaceSplit,splitFace,restoreMesh,boundaryRef,insertFaceSegment};
globalThis.__boxlabTopologyKernel={version:VERSION,edgeKey,edgeOccurrences,inspectEdge,splitEdge,splitEdgeByIndex,splitEdgeByKey,inspectFaceSplit,splitFace,restoreMesh,boundaryRef,insertFaceSegment};
