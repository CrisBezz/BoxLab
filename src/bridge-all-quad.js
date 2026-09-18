// BoxLab v0.36.18.288 — edge-flow regularity scoring for guarded closed-loop all-quad Bridge.
// Densifies the smaller closed boundary loop, spreading comparable splits around the loop,
// then reuses the proven equal-count Bridge solver.

import { bridgeFlowRegularity } from './bridge-flow-regularity.js?v=0.36.18.288';

const VERSION='0.36.18.288';
const MAX_ADDED=6;
const MAX_RATIO=3;
const NEAR_LONGEST=0.95;
const EPS=1e-12;

function edgeKey(mesh,a,b){return mesh.edgeKey?mesh.edgeKey(a,b):(a<b?`${a}:${b}`:`${b}:${a}`);}
function snapshot(mesh,topology){return topology?.cloneMeshState?.(mesh)||null;}
function restore(mesh,topology,state){if(state&&topology?.restoreMeshState)topology.restoreMeshState(mesh,state);}
function triNormal(a,b,c){return b.clone().sub(a).cross(c.clone().sub(a));}
function triangleArea2(a,b,c){return triNormal(a,b,c).lengthSq();}

function loopScale(mesh,a,b){
  let sum=0,count=0;
  for(const ai of a){const av=mesh.vertices?.[ai];if(!av)continue;let best=Infinity;for(const bi of b){const bv=mesh.vertices?.[bi];if(bv)best=Math.min(best,av.distanceToSquared(bv));}if(Number.isFinite(best)){sum+=best;count++;}}
  for(const bi of b){const bv=mesh.vertices?.[bi];if(!bv)continue;let best=Infinity;for(const ai of a){const av=mesh.vertices?.[ai];if(av)best=Math.min(best,bv.distanceToSquared(av));}if(Number.isFinite(best)){sum+=best;count++;}}
  return Math.max(count?sum/count:1,1e-8);
}

export function validateClosedAllQuadCandidate(mesh,faces,loopA,loopB,scale=loopScale(mesh,loopA,loopB)){
  if(!mesh||!Array.isArray(faces)||!faces.length)return{ok:false,reason:'missing-candidate'};
  const aSet=new Set(loopA||[]),bSet=new Set(loopB||[]),limit=Math.max(scale*36,1e-8),areaFloor=Math.max(scale*scale*1e-12,1e-20);let connectors=0;
  for(const face of faces){
    if(!Array.isArray(face)||face.length!==4||new Set(face).size!==4)return{ok:false,reason:'invalid-quad'};
    const p=face.map(i=>mesh.vertices?.[i]);if(p.some(v=>!v))return{ok:false,reason:'missing-vertex'};
    const n1=triNormal(p[0],p[1],p[2]),n2=triNormal(p[0],p[2],p[3]),l1=n1.length(),l2=n2.length();
    if(l1<=EPS||l2<=EPS||triangleArea2(p[0],p[1],p[2])<=areaFloor||triangleArea2(p[0],p[2],p[3])<=areaFloor)return{ok:false,reason:'degenerate-quad'};
    if(n1.dot(n2)/(l1*l2)<-0.15)return{ok:false,reason:'folded-quad'};
    for(let i=0;i<4;i++){
      const x=face[i],y=face[(i+1)%4],cross=(aSet.has(x)&&bSet.has(y))||(bSet.has(x)&&aSet.has(y));if(!cross)continue;
      const d2=mesh.vertices[x]?.distanceToSquared?.(mesh.vertices[y]);if(!Number.isFinite(d2)||d2>limit)return{ok:false,reason:'connector-distortion'};connectors++;
    }
  }
  if(!connectors)return{ok:false,reason:'no-connectors'};
  return{ok:true,scale,connectors};
}

function windingValidation(mesh){
  const uses=new Map();
  for(let fi=0;fi<mesh.faces.length;fi++){
    const face=mesh.faces[fi];if(!Array.isArray(face)||face.length<3||new Set(face).size!==face.length)return{ok:false,reason:'invalid-face'};
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length],key=a<b?`${a}:${b}`:`${b}:${a}`,dir=a<b?1:-1;
      if(!uses.has(key))uses.set(key,[]);uses.get(key).push(dir);
    }
  }
  for(const [edge,owners] of uses)if(owners.length>2)return{ok:false,reason:'non-manifold-edge',edge};else if(owners.length===2&&owners[0]===owners[1])return{ok:false,reason:'same-direction-edge',edge};
  return{ok:true};
}

function diagnostic(ok,reason,extra={}){globalThis.__boxlabClosedAllQuadBridge={version:VERSION,ok,allQuad:!!ok,qualityGuarded:true,lastReject:reason||null,...extra};}
function closedCandidateScore(mesh,faces,loopA,loopB){
  const aSet=new Set(loopA),bSet=new Set(loopB);let score=0;
  for(const face of faces){
    const p=face.map(i=>mesh.vertices[i]);
    const d1=p[0].distanceToSquared(p[2]),d2=p[1].distanceToSquared(p[3]);
    score+=Math.abs(Math.log(Math.max(d1,EPS)/Math.max(d2,EPS)));
    const n1=triNormal(p[0],p[1],p[2]),n2=triNormal(p[0],p[2],p[3]),l1=n1.length(),l2=n2.length();
    if(l1>EPS&&l2>EPS)score+=0.25*(1-Math.max(-1,Math.min(1,n1.dot(n2)/(l1*l2))));
    for(let i=0;i<4;i++){
      const x=face[i],y=face[(i+1)%4];
      if((aSet.has(x)&&bSet.has(y))||(bSet.has(x)&&aSet.has(y)))score+=mesh.vertices[x].distanceToSquared(mesh.vertices[y]);
    }
  }
  const flow=bridgeFlowRegularity(mesh,faces,{closed:true}),scale=loopScale(mesh,loopA,loopB);
  return{score:score+flow.penalty*scale*.12,flow};
}

function rotatedLoop(loop,offset){
  const n=loop.length,k=((offset%n)+n)%n;
  return [...loop.slice(k),...loop.slice(0,k)];
}

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

function edgeMetrics(mesh,loop){
  return loop.map((id,i)=>{
    const a=mesh.vertices[id],b=mesh.vertices[loop[(i+1)%loop.length]];
    if(!a||!b)return{index:i,length2:-1,mid:null};
    return{index:i,length2:a.distanceToSquared(b),mid:a.clone().lerp(b,.5)};
  });
}

export function balancedSplitEdgeIndex(mesh,loop,splitPoints=[]){
  const metrics=edgeMetrics(mesh,loop).filter(e=>e.length2>=0&&e.mid);
  if(!metrics.length)return-1;
  const max=Math.max(...metrics.map(e=>e.length2));
  // Length remains authoritative. Only edges within 5% of the longest compete on spread.
  const threshold=max*NEAR_LONGEST*NEAR_LONGEST;
  const candidates=metrics.filter(e=>e.length2+1e-15>=threshold);
  if(!splitPoints.length)return candidates.sort((a,b)=>b.length2-a.length2||a.index-b.index)[0].index;
  let best=null;
  for(const e of candidates){
    let spread=Infinity;
    for(const p of splitPoints)spread=Math.min(spread,e.mid.distanceToSquared(p));
    if(!best||spread>best.spread+1e-12||
      (Math.abs(spread-best.spread)<=1e-12&&(e.length2>best.length2+1e-12||
      (Math.abs(e.length2-best.length2)<=1e-12&&e.index<best.index)))){
      best={...e,spread};
    }
  }
  return best?.index??-1;
}

function closedSubdivisionAllocation(mesh,loop,targetCount,phase=0){
  const edges=[];
  for(let i=0;i<loop.length;i++){
    const a=mesh.vertices[loop[i]],b=mesh.vertices[loop[(i+1)%loop.length]];
    if(!a||!b)return null;
    edges.push({index:i,length:Math.sqrt(a.distanceToSquared(b)),segments:1,mid:a.clone().lerp(b,.5)});
  }
  const chosen=[];
  let remaining=targetCount-loop.length,step=0;
  while(remaining-->0){
    const spans=edges.map(e=>e.length/e.segments),max=Math.max(...spans),threshold=max*NEAR_LONGEST;
    const candidates=edges.filter((e,i)=>spans[i]+1e-12>=threshold);
    if(!candidates.length)return null;
    const spread=e=>{
      if(!chosen.length)return 0;
      let min=Infinity;
      for(const prior of chosen)min=Math.min(min,e.mid.distanceToSquared(prior.mid));
      return min;
    };
    candidates.sort((a,b)=>{
      const as=spread(a),bs=spread(b),aSpan=a.length/a.segments,bSpan=b.length/b.segments;
      return bs-as||bSpan-aSpan||a.index-b.index;
    });
    const pick=((phase%candidates.length)+candidates.length)%candidates.length;
    const best=candidates[pick];
    best.segments++;chosen.push(best);step++;
  }
  return edges.map(e=>e.segments);
}

function subdivideOriginalBoundaryEdge(mesh,a,b,segments){
  if(segments<=1)return[];
  const va=mesh.vertices[a],vb=mesh.vertices[b];if(!va||!vb)return null;
  const key=edgeKey(mesh,a,b),owners=[];
  for(let fi=0;fi<mesh.faces.length;fi++){
    const face=mesh.faces[fi];if(!Array.isArray(face))continue;
    const slot=faceEdgeSlot(face,a,b);if(slot>=0)owners.push({fi,slot,forward:face[slot]===a});
  }
  if(owners.length>1)return null;
  const inserted=[];
  for(let j=1;j<segments;j++){const id=mesh.vertices.length;mesh.vertices.push(va.clone().lerp(vb,j/segments));inserted.push(id);}
  for(const {fi,slot,forward} of owners)mesh.faces[fi].splice(slot+1,0,...(forward?inserted:[...inserted].reverse()));
  if(mesh.creases instanceof Map&&mesh.creases.has(key)){
    const strength=mesh.creases.get(key);mesh.creases.delete(key);const seq=[a,...inserted,b];
    for(let i=0;i<seq.length-1;i++)mesh.creases.set(edgeKey(mesh,seq[i],seq[i+1]),strength);
  }
  if(mesh.looseEdges instanceof Set&&mesh.looseEdges.has(key)){
    mesh.looseEdges.delete(key);const seq=[a,...inserted,b];
    for(let i=0;i<seq.length-1;i++)mesh.looseEdges.add(edgeKey(mesh,seq[i],seq[i+1]));
  }
  if(mesh.looseVertices instanceof Set)for(const id of inserted)mesh.looseVertices.delete(id);
  return inserted;
}

export function densifyLoopToCount(mesh,loop,target,phase=0){
  if(!Array.isArray(loop)||loop.length<3||target<loop.length)return null;
  if(target===loop.length)return[...loop];
  const allocation=closedSubdivisionAllocation(mesh,loop,target,phase);if(!allocation)return null;
  const out=[];
  for(let i=0;i<loop.length;i++){
    const a=loop[i],b=loop[(i+1)%loop.length],inserted=subdivideOriginalBoundaryEdge(mesh,a,b,allocation[i]);
    if(inserted===null)return null;
    out.push(a,...inserted);
  }
  return out.length===target?out:null;
}

export function canTryAllQuad(loopA,loopB){
  if(!Array.isArray(loopA)||!Array.isArray(loopB)||loopA.length<3||loopB.length<3||loopA.length===loopB.length)return false;
  const small=Math.min(loopA.length,loopB.length),large=Math.max(loopA.length,loopB.length),added=large-small;
  return added<=MAX_ADDED&&large/small<=MAX_RATIO;
}

export function installSubdFriendlyBridge(EditableMesh){
  const proto=EditableMesh?.prototype;if(!proto||proto.__subdFriendlyBridge288Installed)return;
  const baseBridgeLoops=proto.bridgeLoops,topology=globalThis.__boxlabTopology;
  if(typeof baseBridgeLoops!=='function'||!topology?.cloneMeshState||!topology?.restoreMeshState||!topology?.validateTopology)return;

  proto.bridgeLoops=function(loopA,loopB){
    if(!canTryAllQuad(loopA,loopB))return baseBridgeLoops.call(this,loopA,loopB);
    const before=snapshot(this,topology),fallback=(reason,extra={})=>{restore(this,topology,before);diagnostic(false,reason,{counts:[loopA.length,loopB.length],...extra});return baseBridgeLoops.call(this,loopA,loopB);};
    const input=topology.validateTopology(this,{allowBoundary:true});if(!input.ok)return fallback('input-topology');
    const target=Math.max(loopA.length,loopB.length),shortA=loopA.length<loopB.length,shortLoop=shortA?loopA:loopB,longLoop=shortA?loopB:loopA;
    const rotations=Math.min(shortLoop.length,4),allocationPhases=Math.min(shortLoop.length,4);let best=null,lastReject='no-candidate',tested=0,attempted=0;
    for(let rotation=0;rotation<rotations;rotation++)for(let phase=0;phase<allocationPhases;phase++){
      attempted++;
      restore(this,topology,before);
      const shortRot=rotatedLoop([...shortLoop],rotation),longBase=[...longLoop];
      const denseShort=densifyLoopToCount(this,shortRot,target,phase);if(!denseShort){lastReject='densify-failed';continue;}
      const denseA=shortA?denseShort:longBase,denseB=shortA?longBase:denseShort;
      let result=null;try{result=baseBridgeLoops.call(this,denseA,denseB);}catch{}
      tested++;
      const allQuad=!!result&&Array.isArray(result.faceIndices)&&result.faceIndices.length===target&&result.faceIndices.every(fi=>this.faces[fi]?.length===4);
      if(!allQuad){lastReject='not-all-quad';continue;}
      const faces=result.faceIndices.map(fi=>this.faces[fi]).filter(Boolean);
      const quality=validateClosedAllQuadCandidate(this,faces,denseA,denseB);if(!quality.ok){lastReject=quality.reason;continue;}
      const validation=topology.validateTopology(this,{allowBoundary:true});if(!validation.ok){lastReject='topology-rejected';continue;}
      const winding=windingValidation(this);if(!winding.ok){lastReject=winding.reason||'winding-rejected';continue;}
      const scored=closedCandidateScore(this,faces,denseA,denseB),score=scored.score;
      if(!best||score<best.score-1e-12)best={score,flow:scored.flow,rotation,phase,result:{...result},state:snapshot(this,topology),denseCounts:[denseA.length,denseB.length],connectors:quality.connectors};
    }
    if(!best)return fallback(lastReject,{searchCandidates:tested,searchAttempts:attempted});
    restore(this,topology,best.state);
    const result={...best.result,unequal:true,allQuad:true,subdFriendly:true,balancedDensification:true,qualityGuarded:true,correspondenceSearch:true,searchCandidates:tested,searchAttempts:attempted,searchRotation:best.rotation,searchPhase:best.phase,searchScore:best.score,flowPenalty:best.flow?.penalty??0,connectorFlowPenalty:best.flow?.connectorPenalty??0,quadAspectPenalty:best.flow?.aspectPenalty??0,addedVertices:target-Math.min(loopA.length,loopB.length),denseCounts:best.denseCounts};
    diagnostic(true,null,{addedVertices:result.addedVertices,denseCounts:result.denseCounts,connectors:best.connectors,searchCandidates:tested,searchAttempts:attempted,searchRotation:best.rotation,searchPhase:best.phase,searchScore:best.score,flowPenalty:best.flow?.penalty??0,connectorFlowPenalty:best.flow?.connectorPenalty??0,quadAspectPenalty:best.flow?.aspectPenalty??0});
    globalThis.__boxlabSubdFriendlyBridge={version:VERSION,ok:true,balancedDensification:true,qualityGuarded:true,correspondenceSearch:true,searchCandidates:tested,searchAttempts:attempted,searchRotation:best.rotation,searchPhase:best.phase,addedVertices:result.addedVertices,denseCounts:result.denseCounts};
    return result;
  };

  proto.__subdFriendlyBridge288Installed=true;
  globalThis.__boxlabSubdFriendlyBridge={version:VERSION,ok:null,balancedDensification:true,qualityGuarded:true,addedVertices:0,denseCounts:[]};
  diagnostic(null,null,{addedVertices:0,denseCounts:[]});
}
