// BoxLab v0.36.18.268 — conservative SubD-friendly unequal Bridge foundation.
// Densifies the smaller closed boundary loop, then reuses the proven equal-count Bridge solver.

const VERSION='0.36.18.268';
const MAX_ADDED=4;
const MAX_RATIO=2;

function edgeKey(mesh,a,b){return mesh.edgeKey?mesh.edgeKey(a,b):(a<b?`${a}:${b}`:`${b}:${a}`);}
function snapshot(mesh,topology){return topology?.cloneMeshState?.(mesh)||null;}
function restore(mesh,topology,state){if(state&&topology?.restoreMeshState)topology.restoreMeshState(mesh,state);}

function faceEdgeSlot(face,a,b){
  for(let i=0;i<face.length;i++){
    const x=face[i],y=face[(i+1)%face.length];
    if((x===a&&y===b)||(x===b&&y===a))return i;
  }
  return-1;
}

export function splitBoundaryEdge(mesh,loop,edgeIndex){
  if(!mesh||!Array.isArray(loop)||loop.length<3)return null;
  const n=loop.length,i=((edgeIndex%n)+n)%n,a=loop[i],b=loop[(i+1)%n],va=mesh.vertices[a],vb=mesh.vertices[b];
  if(!va||!vb)return null;
  const key=edgeKey(mesh,a,b),owners=[];
  for(let fi=0;fi<mesh.faces.length;fi++){
    const face=mesh.faces[fi];if(!Array.isArray(face))continue;
    const slot=faceEdgeSlot(face,a,b);if(slot>=0)owners.push({fi,slot});
  }
  if(owners.length>1)return null; // boundary/loose edge only
  const vertex=mesh.vertices.length;
  mesh.vertices.push(va.clone().lerp(vb,.5));
  for(const {fi,slot} of owners)mesh.faces[fi].splice(slot+1,0,vertex);
  if(mesh.creases instanceof Map&&mesh.creases.has(key)){
    const strength=mesh.creases.get(key);mesh.creases.delete(key);
    mesh.creases.set(edgeKey(mesh,a,vertex),strength);mesh.creases.set(edgeKey(mesh,vertex,b),strength);
  }
  if(mesh.looseEdges instanceof Set&&mesh.looseEdges.has(key)){
    mesh.looseEdges.delete(key);mesh.looseEdges.add(edgeKey(mesh,a,vertex));mesh.looseEdges.add(edgeKey(mesh,vertex,b));
  }
  if(mesh.looseVertices instanceof Set)mesh.looseVertices.delete(vertex);
  loop.splice(i+1,0,vertex);
  return vertex;
}

function longestEdgeIndex(mesh,loop){
  let best=-1,bestLength=-1;
  for(let i=0;i<loop.length;i++){
    const a=mesh.vertices[loop[i]],b=mesh.vertices[loop[(i+1)%loop.length]];
    if(!a||!b)continue;const d=a.distanceToSquared(b);
    if(d>bestLength){bestLength=d;best=i;}
  }
  return best;
}

export function densifyLoopToCount(mesh,loop,target){
  if(!Array.isArray(loop)||loop.length<3||target<loop.length)return null;
  const out=[...loop];
  while(out.length<target){const edge=longestEdgeIndex(mesh,out);if(edge<0||splitBoundaryEdge(mesh,out,edge)===null)return null;}
  return out;
}

export function canTryAllQuad(loopA,loopB){
  if(!Array.isArray(loopA)||!Array.isArray(loopB)||loopA.length<3||loopB.length<3||loopA.length===loopB.length)return false;
  const small=Math.min(loopA.length,loopB.length),large=Math.max(loopA.length,loopB.length),added=large-small;
  return added<=MAX_ADDED&&large/small<=MAX_RATIO;
}

export function installSubdFriendlyBridge(EditableMesh){
  const proto=EditableMesh?.prototype;if(!proto||proto.__subdFriendlyBridge268Installed)return;
  const baseBridgeLoops=proto.bridgeLoops,topology=globalThis.__boxlabTopology;
  if(typeof baseBridgeLoops!=='function'||!topology?.cloneMeshState||!topology?.restoreMeshState)return;

  proto.bridgeLoops=function(loopA,loopB){
    if(!canTryAllQuad(loopA,loopB))return baseBridgeLoops.call(this,loopA,loopB);
    const before=snapshot(this,topology),a=[...loopA],b=[...loopB],target=Math.max(a.length,b.length),shortA=a.length<b.length;
    const denseA=shortA?densifyLoopToCount(this,a,target):a,denseB=shortA?b:densifyLoopToCount(this,b,target);
    if(!denseA||!denseB){restore(this,topology,before);return baseBridgeLoops.call(this,loopA,loopB);}
    let result=null;
    try{result=baseBridgeLoops.call(this,denseA,denseB);}catch{}
    const allQuad=!!result&&Array.isArray(result.faceIndices)&&result.faceIndices.length===target&&result.faceIndices.every(fi=>this.faces[fi]?.length===4);
    if(!allQuad){restore(this,topology,before);return baseBridgeLoops.call(this,loopA,loopB);}
    result={...result,unequal:true,allQuad:true,subdFriendly:true,addedVertices:target-Math.min(loopA.length,loopB.length),denseCounts:[denseA.length,denseB.length]};
    globalThis.__boxlabSubdFriendlyBridge={version:VERSION,ok:true,addedVertices:result.addedVertices,denseCounts:result.denseCounts};
    return result;
  };

  proto.__subdFriendlyBridge268Installed=true;
  globalThis.__boxlabSubdFriendlyBridge={version:VERSION,ok:null,addedVertices:0,denseCounts:[]};
}
