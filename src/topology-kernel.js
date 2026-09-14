// BoxLab v0.36.18.206 — canonical topology mutation kernel.
// One authoritative edge split for modelling tools and future Boolean intersection insertion.
import * as THREE from 'three';

const VERSION='0.36.18.206';
const MIN_T=1e-5;

function edgeKey(mesh,a,b){return mesh?.edgeKey?mesh.edgeKey(a,b):(a<b?`${a}:${b}`:`${b}:${a}`);}

function edgeOccurrences(mesh,a,b){
  const occurrences=[];
  if(!mesh?.faces)return occurrences;
  mesh.faces.forEach((face,faceIndex)=>{
    if(!Array.isArray(face)||face.length<3)return;
    for(let i=0;i<face.length;i++){
      const x=face[i],y=face[(i+1)%face.length];
      if((x===a&&y===b)||(x===b&&y===a)) occurrences.push({faceIndex,slot:i,forward:x===a&&y===b});
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

  // Pre-build every incident face before mutating the mesh so failure is atomic.
  const replacements=[];
  for(const occurrence of check.occurrences){
    const face=mesh.faces[occurrence.faceIndex];
    if(!Array.isArray(face)||face.length<3)return{ok:false,reason:'Invalid incident face'};
    const out=[...face];
    replacements.push({faceIndex:occurrence.faceIndex,slot:occurrence.slot,face:out});
  }

  const vertex=mesh.vertices.length;
  replacements.forEach(item=>item.face.splice(item.slot+1,0,vertex));
  mesh.vertices.push(point);
  replacements.forEach(item=>{mesh.faces[item.faceIndex]=item.face;});

  const crease=mesh.creases instanceof Map?(mesh.creases.get(check.key)||0):0;
  if(mesh.creases instanceof Map){
    mesh.creases.delete(check.key);
    if(crease>0){
      mesh.creases.set(edgeKey(mesh,a,vertex),crease);
      mesh.creases.set(edgeKey(mesh,vertex,b),crease);
    }
  }

  return{
    ok:true,vertex,position:amount,oldEdgeKey:check.key,
    edgeKeys:[edgeKey(mesh,a,vertex),edgeKey(mesh,vertex,b)],
    incidentFaces:[...check.faces],boundary:check.boundary,manifold:check.manifold,crease
  };
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

export {VERSION,edgeKey,edgeOccurrences,inspectEdge,splitEdge,splitEdgeByIndex,splitEdgeByKey};
globalThis.__boxlabTopologyKernel={version:VERSION,edgeKey,edgeOccurrences,inspectEdge,splitEdge,splitEdgeByIndex,splitEdgeByKey};
