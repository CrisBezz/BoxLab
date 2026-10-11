// BoxLab v0.36.18.210 — Boolean fragment classification foundation.
// Non-destructive inside/outside/boundary classification for future Union / Difference / Intersection commit stages.
import * as THREE from 'three';
import {facePoints,triangulatePoints,epsilonForMeshes} from './boolean-intersections.js?v=0.36.18.209';

const VERSION='0.36.18.210';
const RAY_DIRS=[
  new THREE.Vector3(1,.371,.193).normalize(),
  new THREE.Vector3(.217,1,.463).normalize(),
  new THREE.Vector3(.419,.283,1).normalize()
];

function edgeKey(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}
function transformPoint(v,matrix){const p=v?.clone?.()||new THREE.Vector3(v?.x||0,v?.y||0,v?.z||0);return matrix?.isMatrix4?p.applyMatrix4(matrix):p;}

function topologyInfo(mesh){
  const edgeUse=new Map();let invalidFaces=0;
  for(const face of mesh?.faces||[]){
    if(!Array.isArray(face)||face.length<3){invalidFaces++;continue;}
    const seen=new Set();
    for(const index of face){if(!Number.isInteger(index)||index<0||index>=(mesh?.vertices?.length||0)||seen.has(index)){invalidFaces++;break;}seen.add(index);}
    for(let i=0;i<face.length;i++){const a=face[i],b=face[(i+1)%face.length];if(a===b)continue;const key=edgeKey(a,b);edgeUse.set(key,(edgeUse.get(key)||0)+1);}
  }
  let boundaryEdges=0,nonManifoldEdges=0;
  for(const count of edgeUse.values()){if(count===1)boundaryEdges++;else if(count>2)nonManifoldEdges++;}
  const closed=!!mesh?.faces?.length&&invalidFaces===0&&boundaryEdges===0&&nonManifoldEdges===0;
  return{closed,invalidFaces,boundaryEdges,nonManifoldEdges,edges:edgeUse.size};
}

function triangleSoup(mesh,matrix=null){
  const triangles=[];
  (mesh?.faces||[]).forEach((face,faceIndex)=>{
    const points=facePoints(mesh,face,matrix);
    triangulatePoints(points).forEach((tri,triangleIndex)=>triangles.push({tri,faceIndex,triangleIndex}));
  });
  return triangles;
}

function faceCentroid(mesh,face,matrix=null){
  const points=facePoints(mesh,face,matrix);if(!points.length)return null;
  const c=new THREE.Vector3();for(const p of points)c.add(p);return c.multiplyScalar(1/points.length);
}

function rayTriangleT(origin,dir,tri,eps){
  const e1=tri[1].clone().sub(tri[0]),e2=tri[2].clone().sub(tri[0]);
  const p=dir.clone().cross(e2),det=e1.dot(p);
  if(Math.abs(det)<=eps)return null;
  const inv=1/det,tvec=origin.clone().sub(tri[0]),u=tvec.dot(p)*inv;
  if(u<-eps||u>1+eps)return null;
  const q=tvec.clone().cross(e1),v=dir.dot(q)*inv;
  if(v<-eps||u+v>1+eps)return null;
  const t=e2.dot(q)*inv;
  return t>eps?t:null;
}

function pointTriangleDistanceSq(point,tri){
  const triangle=new THREE.Triangle(tri[0],tri[1],tri[2]);
  const closest=triangle.closestPointToPoint(point,new THREE.Vector3());
  return closest.distanceToSquared(point);
}

function uniqueSortedHits(values,eps){
  const sorted=values.filter(Number.isFinite).sort((a,b)=>a-b),out=[];
  for(const value of sorted)if(!out.length||Math.abs(value-out[out.length-1])>eps)out.push(value);
  return out;
}

function classifyPoint(point,targetMesh,{targetMatrix=null,eps=null,prepared=null}={}){
  if(!point?.isVector3)return{state:'ambiguous',reason:'Invalid point',votes:[]};
  const prep=prepared||prepareTarget(targetMesh,targetMatrix,eps);
  if(!prep.topology.closed)return{state:'ambiguous',reason:'Target mesh is not a closed manifold',votes:[],targetClosed:false};
  const boundarySq=(prep.eps*8)*(prep.eps*8);
  for(const item of prep.triangles)if(pointTriangleDistanceSq(point,item.tri)<=boundarySq)return{state:'boundary',reason:'Point lies on target surface',votes:[],targetClosed:true};

  const votes=[];
  for(const dir of RAY_DIRS){
    const raw=[];for(const item of prep.triangles){const t=rayTriangleT(point,dir,item.tri,prep.eps);if(t!==null)raw.push(t);}
    const hits=uniqueSortedHits(raw,prep.eps*16);votes.push({inside:(hits.length%2)===1,hits:hits.length});
  }
  const insideVotes=votes.filter(v=>v.inside).length;
  const state=insideVotes>=2?'inside':'outside';
  return{state,votes,targetClosed:true,confidence:insideVotes===0||insideVotes===3?'unanimous':'majority'};
}

function prepareTarget(mesh,matrix=null,eps=null,otherMesh=null,otherMatrix=null){
  const tolerance=eps??epsilonForMeshes(mesh,otherMesh||mesh,matrix,otherMatrix||matrix);
  return{mesh,matrix,eps:tolerance,triangles:triangleSoup(mesh,matrix),topology:topologyInfo(mesh)};
}

function classifyFaces(sourceMesh,targetMesh,{sourceMatrix=null,targetMatrix=null,eps=null}={}){
  const tolerance=eps??epsilonForMeshes(sourceMesh,targetMesh,sourceMatrix,targetMatrix);
  const prepared=prepareTarget(targetMesh,targetMatrix,tolerance,sourceMesh,sourceMatrix);
  const faces=[],inside=[],outside=[],boundary=[],ambiguous=[];
  (sourceMesh?.faces||[]).forEach((face,faceIndex)=>{
    const centroid=faceCentroid(sourceMesh,face,sourceMatrix);
    const result=centroid?classifyPoint(centroid,targetMesh,{targetMatrix,eps:tolerance,prepared}):{state:'ambiguous',reason:'Invalid face centroid'};
    const item={faceIndex,centroid,result};faces.push(item);
    if(result.state==='inside')inside.push(faceIndex);else if(result.state==='outside')outside.push(faceIndex);else if(result.state==='boundary')boundary.push(faceIndex);else ambiguous.push(faceIndex);
  });
  return{version:VERSION,targetClosed:prepared.topology.closed,targetTopology:prepared.topology,eps:tolerance,faces,inside,outside,boundary,ambiguous,ready:prepared.topology.closed&&ambiguous.length===0};
}

function booleanPlan(meshA,meshB,operation='union',{matrixA=null,matrixB=null}={}){
  const op=String(operation).toLowerCase();
  if(!['union','difference','intersection'].includes(op))return{version:VERSION,ready:false,operation:op,reason:'Unknown Boolean operation'};
  const eps=epsilonForMeshes(meshA,meshB,matrixA,matrixB);
  const a=classifyFaces(meshA,meshB,{sourceMatrix:matrixA,targetMatrix:matrixB,eps});
  const b=classifyFaces(meshB,meshA,{sourceMatrix:matrixB,targetMatrix:matrixA,eps});
  const unresolvedA=[...a.boundary,...a.ambiguous],unresolvedB=[...b.boundary,...b.ambiguous];
  let keepA=[],keepB=[],reverseB=false;
  if(op==='union'){keepA=[...a.outside];keepB=[...b.outside];}
  else if(op==='intersection'){keepA=[...a.inside];keepB=[...b.inside];}
  else{keepA=[...a.outside];keepB=[...b.inside];reverseB=true;}
  const ready=a.targetClosed&&b.targetClosed&&unresolvedA.length===0&&unresolvedB.length===0;
  return{
    version:VERSION,operation:op,ready,eps,
    keepA,keepB,reverseB,
    unresolvedA,unresolvedB,
    classificationA:a,classificationB:b,
    reason:ready?null:(!a.targetClosed||!b.targetClosed?'Boolean inputs must be closed manifold meshes':'Boundary / coplanar fragments still need resolution')
  };
}

export {VERSION,topologyInfo,triangleSoup,faceCentroid,prepareTarget,classifyPoint,classifyFaces,booleanPlan};
globalThis.__boxlabBooleanClassifier={version:VERSION,topologyInfo,classifyPoint,classifyFaces,booleanPlan};
