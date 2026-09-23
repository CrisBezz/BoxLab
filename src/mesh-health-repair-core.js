import {analyzeMeshHealth} from './mesh-health-core.js?v=0.36.18.440';

const EPS=1e-12;

function directedCycleKey(face){
  if(!Array.isArray(face)||face.length<3)return null;
  let best=null;
  for(let start=0;start<face.length;start++){
    const rotated=[];
    for(let i=0;i<face.length;i++)rotated.push(face[(start+i)%face.length]);
    const key=rotated.join(':');
    if(best===null||key<best)best=key;
  }
  return best;
}
function faceArea2(mesh,face){
  if(!Array.isArray(face)||face.length<3)return 0;
  const origin=mesh.vertices?.[face[0]];if(!origin)return 0;
  let sum=0;
  for(let i=1;i<face.length-1;i++){
    const a=mesh.vertices?.[face[i]],b=mesh.vertices?.[face[i+1]];
    if(!a||!b)return 0;
    sum+=a.clone().sub(origin).cross(b.clone().sub(origin)).length();
  }
  return sum;
}
function safeFace(face,vertexCount){
  return Array.isArray(face)&&face.length>=3&&new Set(face).size===face.length&&
    face.every(i=>Number.isInteger(i)&&i>=0&&i<vertexCount);
}
function cloneInto(target,source){
  target.vertices=source.vertices.map(v=>v.clone());
  target.faces=source.faces.map(f=>[...f]);
  target.creases=new Map(source.creases||[]);
  if(source.looseEdges instanceof Set)target.looseEdges=new Set(source.looseEdges);
  if(source.looseVertices instanceof Set)target.looseVertices=new Set(source.looseVertices);
  target.edges?.();
}
function issueLoad(health){
  return Number(health.invalidFaces||0)+Number(health.zeroAreaFaces||0)+Number(health.duplicateFaces||0)+
    Number(health.nonManifoldEdges||0)+Number(health.inconsistentWindingEdges||0)+Number(health.orphanVertices||0);
}

export function safeRepairMesh(mesh){
  if(!mesh?.clone||!Array.isArray(mesh.faces)||!Array.isArray(mesh.vertices))
    return{ok:false,changed:false,reason:'invalid-mesh'};

  const before=analyzeMeshHealth(mesh),candidate=mesh.clone();
  const drop=new Set(),seenDirected=new Map();
  let duplicatesRemoved=0,zeroAreaRemoved=0;

  for(let fi=0;fi<candidate.faces.length;fi++){
    const face=candidate.faces[fi];
    if(!safeFace(face,candidate.vertices.length))continue;
    const directed=directedCycleKey(face);
    if(seenDirected.has(directed)){
      drop.add(fi);duplicatesRemoved++;continue;
    }
    seenDirected.set(directed,fi);
    if(faceArea2(candidate,face)<=EPS){drop.add(fi);zeroAreaRemoved++;}
  }
  if(drop.size)candidate.faces=candidate.faces.filter((_,fi)=>!drop.has(fi));
  const compact=candidate.compactUnusedVertices?.({preserveLoose:true})||{changed:false,removed:0};
  candidate.edges?.();

  const after=analyzeMeshHealth(candidate);
  const changed=duplicatesRemoved>0||zeroAreaRemoved>0||Number(compact.removed||0)>0;
  if(!changed)return{ok:true,changed:false,reason:'no-safe-repairs',before,after,duplicatesRemoved:0,zeroAreaRemoved:0,orphanVerticesRemoved:0};

  const worsened=
    after.invalidFaces>before.invalidFaces||
    after.nonManifoldEdges>before.nonManifoldEdges||
    after.inconsistentWindingEdges>before.inconsistentWindingEdges||
    issueLoad(after)>=issueLoad(before);
  if(worsened)return{
    ok:false,changed:false,rolledBack:true,reason:'safe-repair-validation-refused',
    before,after,duplicatesRemoved,zeroAreaRemoved,orphanVerticesRemoved:Number(compact.removed||0)
  };

  cloneInto(mesh,candidate);
  return{
    ok:true,changed:true,reason:'safe-repairs-applied',
    before,after,duplicatesRemoved,zeroAreaRemoved,orphanVerticesRemoved:Number(compact.removed||0)
  };
}
