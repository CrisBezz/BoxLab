// BoxLab v0.36.18.285 — bounded densification search for guarded open-chain all-quad Bridge.
// Conservatively densifies the smaller open chain, then builds an all-quad strip.
// Preserves original chain vertices, spaces inserted vertices evenly, and keeps the v274 quality guard/fallback.

const VERSION='0.36.18.285';
const EPS=1e-12;
const MAX_ADDED=6;
const MAX_RATIO=3;
const NEAR_LONGEST=0.95;

function edgeKey(mesh,a,b){return mesh.edgeKey?mesh.edgeKey(a,b):(a<b?`${a}:${b}`:`${b}:${a}`);}
function directedEdge(face,a,b){if(!face)return 0;for(let i=0;i<face.length;i++){const x=face[i],y=face[(i+1)%face.length];if(x===a&&y===b)return 1;if(x===b&&y===a)return-1;}return 0;}
function triNormal(a,b,c){return b.clone().sub(a).cross(c.clone().sub(a));}
function triangleArea2(a,b,c){return triNormal(a,b,c).lengthSq();}

function faceEdgeSlot(face,a,b){
  for(let i=0;i<face.length;i++){
    const x=face[i],y=face[(i+1)%face.length];
    if((x===a&&y===b)||(x===b&&y===a))return i;
  }
  return-1;
}

export function splitOpenBoundaryEdgeAt(mesh,chain,edgeIndex,t=.5){
  if(!mesh||!Array.isArray(chain)||chain.length<2||edgeIndex<0||edgeIndex>=chain.length-1||!(t>0&&t<1))return null;
  const a=chain[edgeIndex],b=chain[edgeIndex+1],va=mesh.vertices[a],vb=mesh.vertices[b];
  if(!va||!vb)return null;
  const key=edgeKey(mesh,a,b),owners=[];
  for(let fi=0;fi<mesh.faces.length;fi++){
    const face=mesh.faces[fi];if(!Array.isArray(face))continue;
    const slot=faceEdgeSlot(face,a,b);if(slot>=0)owners.push({fi,slot});
  }
  if(owners.length>1)return null;
  const vertex=mesh.vertices.length;
  mesh.vertices.push(va.clone().lerp(vb,t));
  for(const {fi,slot} of owners)mesh.faces[fi].splice(slot+1,0,vertex);
  if(mesh.creases instanceof Map&&mesh.creases.has(key)){
    const strength=mesh.creases.get(key);mesh.creases.delete(key);
    mesh.creases.set(edgeKey(mesh,a,vertex),strength);mesh.creases.set(edgeKey(mesh,vertex,b),strength);
  }
  if(mesh.looseEdges instanceof Set&&mesh.looseEdges.has(key)){
    mesh.looseEdges.delete(key);mesh.looseEdges.add(edgeKey(mesh,a,vertex));mesh.looseEdges.add(edgeKey(mesh,vertex,b));
  }
  if(mesh.looseVertices instanceof Set)mesh.looseVertices.delete(vertex);
  chain.splice(edgeIndex+1,0,vertex);
  return vertex;
}

export function splitOpenBoundaryEdge(mesh,chain,edgeIndex){return splitOpenBoundaryEdgeAt(mesh,chain,edgeIndex,.5);}

function subdivisionAllocation(mesh,chain,targetEdgeCount){
  const edges=[];
  for(let i=0;i<chain.length-1;i++){
    const a=mesh.vertices[chain[i]],b=mesh.vertices[chain[i+1]];
    if(!a||!b)return null;
    edges.push({index:i,length:Math.sqrt(a.distanceToSquared(b)),segments:1});
  }
  let remaining=targetEdgeCount-edges.length;
  while(remaining-->0){
    let best=edges[0];
    for(const e of edges){
      const span=e.length/e.segments,bestSpan=best.length/best.segments;
      if(span>bestSpan+1e-12||(Math.abs(span-bestSpan)<=1e-12&&e.index<best.index))best=e;
    }
    best.segments++;
  }
  return edges.map(e=>e.segments);
}

function subdivideOriginalOpenEdge(mesh,a,b,segments){
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

function openEdgeMetrics(mesh,chain){
  const out=[];
  for(let i=0;i<chain.length-1;i++){
    const a=mesh.vertices[chain[i]],b=mesh.vertices[chain[i+1]];
    if(!a||!b)continue;
    out.push({index:i,length2:a.distanceToSquared(b),mid:a.clone().lerp(b,.5)});
  }
  return out;
}

export function balancedOpenSplitEdgeIndex(mesh,chain,splitPoints=[]){
  const metrics=openEdgeMetrics(mesh,chain);if(!metrics.length)return-1;
  const max=Math.max(...metrics.map(e=>e.length2));
  const threshold=max*NEAR_LONGEST*NEAR_LONGEST;
  const candidates=metrics.filter(e=>e.length2+1e-15>=threshold);
  if(!splitPoints.length)return candidates.sort((a,b)=>b.length2-a.length2||a.index-b.index)[0].index;
  let best=null;
  for(const e of candidates){
    let spread=Infinity;for(const p of splitPoints)spread=Math.min(spread,e.mid.distanceToSquared(p));
    if(!best||spread>best.spread+1e-12||
      (Math.abs(spread-best.spread)<=1e-12&&(e.length2>best.length2+1e-12||
      (Math.abs(e.length2-best.length2)<=1e-12&&e.index<best.index))))best={...e,spread};
  }
  return best?.index??-1;
}

export function densifyOpenChainToCount(mesh,chain,targetVertexCount){
  if(!Array.isArray(chain)||chain.length<2||targetVertexCount<chain.length)return null;
  if(targetVertexCount===chain.length)return[...chain];
  const allocation=subdivisionAllocation(mesh,chain,targetVertexCount-1);if(!allocation)return null;
  const out=[chain[0]];
  for(let i=0;i<chain.length-1;i++){
    const inserted=subdivideOriginalOpenEdge(mesh,chain[i],chain[i+1],allocation[i]);if(inserted===null)return null;
    out.push(...inserted,chain[i+1]);
  }
  return out.length===targetVertexCount?out:null;
}

export function canTryOpenAllQuad(chainA,chainB){
  if(!Array.isArray(chainA)||!Array.isArray(chainB)||chainA.length<2||chainB.length<2||chainA.length===chainB.length)return false;
  const a=chainA.length-1,b=chainB.length-1,small=Math.min(a,b),large=Math.max(a,b),added=large-small;
  return added>0&&added<=MAX_ADDED&&large/small<=MAX_RATIO;
}

function chainScale(mesh,a,b){
  let sum=0,count=0;
  for(const ai of a){const av=mesh.vertices[ai];if(!av)continue;let best=Infinity;for(const bi of b){const bv=mesh.vertices[bi];if(bv)best=Math.min(best,av.distanceToSquared(bv));}if(Number.isFinite(best)){sum+=best;count++;}}
  for(const bi of b){const bv=mesh.vertices[bi];if(!bv)continue;let best=Infinity;for(const ai of a){const av=mesh.vertices[ai];if(av)best=Math.min(best,bv.distanceToSquared(av));}if(Number.isFinite(best)){sum+=best;count++;}}
  return Math.max(count?sum/count:1,1e-8);
}

export function validateOpenAllQuadCandidate(mesh,faces,chainA,chainB,scale=chainScale(mesh,chainA,chainB)){
  if(!mesh||!Array.isArray(faces)||!faces.length)return{ok:false,reason:'missing-candidate'};
  const aSet=new Set(chainA||[]),bSet=new Set(chainB||[]),limit=Math.max(scale*36,1e-8),areaFloor=Math.max(scale*scale*1e-12,1e-20);let connectors=0;
  for(const face of faces){
    if(!Array.isArray(face)||face.length!==4||new Set(face).size!==4)return{ok:false,reason:'invalid-quad'};
    const p=face.map(i=>mesh.vertices?.[i]);if(p.some(v=>!v))return{ok:false,reason:'missing-vertex'};
    const n1=triNormal(p[0],p[1],p[2]),n2=triNormal(p[0],p[2],p[3]),l1=n1.length(),l2=n2.length();
    if(l1<=EPS||l2<=EPS||triangleArea2(p[0],p[1],p[2])<=areaFloor||triangleArea2(p[0],p[2],p[3])<=areaFloor)return{ok:false,reason:'degenerate-quad'};
    if(n1.dot(n2)/(l1*l2)<-0.15)return{ok:false,reason:'folded-quad'};
    for(let i=0;i<4;i++){
      const a=face[i],b=face[(i+1)%4],cross=(aSet.has(a)&&bSet.has(b))||(bSet.has(a)&&aSet.has(b));if(!cross)continue;
      const d2=mesh.vertices[a]?.distanceToSquared?.(mesh.vertices[b]);if(!Number.isFinite(d2)||d2>limit)return{ok:false,reason:'connector-distortion'};connectors++;
    }
  }
  if(!connectors)return{ok:false,reason:'no-connectors'};
  return{ok:true,scale,connectors};
}

function windingPenalty(mesh,faces){
  let penalty=0;
  for(const face of faces)for(let i=0;i<face.length;i++){
    const a=face[i],b=face[(i+1)%face.length];
    for(const existing of mesh.faces)if(directedEdge(existing,a,b)===1)penalty++;
  }
  return penalty;
}

function quadShapePenalty(mesh,face,scale){
  const p=face.map(i=>mesh.vertices[i]),d1=p[0].distanceToSquared(p[2]),d2=p[1].distanceToSquared(p[3]);
  const balance=Math.abs(Math.log(Math.max(d1,EPS)/Math.max(d2,EPS)));
  const n1=triNormal(p[0],p[1],p[2]),n2=triNormal(p[0],p[2],p[3]),l1=n1.length(),l2=n2.length();
  const bend=l1>EPS&&l2>EPS?1-Math.max(-1,Math.min(1,n1.dot(n2)/(l1*l2))):2;
  return balance*scale*0.025+bend*scale*0.09;
}

function bestEqualQuadPlan(mesh,chainA,chainB){
  if(chainA.length!==chainB.length||chainA.length<2)return{plan:null,reason:'count-mismatch'};
  const scale=chainScale(mesh,chainA,chainB);let best=null,lastReject='no-candidate';
  for(const reverse of[false,true]){
    const mapped=reverse?[...chainB].reverse():[...chainB];
    let distance=0;for(let i=0;i<chainA.length;i++)distance+=mesh.vertices[chainA[i]].distanceToSquared(mesh.vertices[mapped[i]]);
    for(const flip of[false,true]){
      const faces=[];
      for(let i=0;i<chainA.length-1;i++)faces.push(flip?[chainA[i],mapped[i],mapped[i+1],chainA[i+1]]:[chainA[i],chainA[i+1],mapped[i+1],mapped[i]]);
      const quality=validateOpenAllQuadCandidate(mesh,faces,chainA,mapped,scale);if(!quality.ok){lastReject=quality.reason;continue;}
      const winding=windingPenalty(mesh,faces),surface=faces.reduce((s,f)=>s+quadShapePenalty(mesh,f,scale),0),score=distance+surface+winding*1e9;
      if(!best||score<best.score)best={faces,mapped,reverse,flip,windingPenalty:winding,surfacePenalty:surface,score,qualityGuarded:true};
    }
  }
  return{plan:best,reason:best?null:lastReject};
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

function trialFrom(mesh,topology){
  const state=topology.cloneMeshState(mesh),trial=mesh.clone();
  trial.vertices=state.vertices.map(v=>v.clone());trial.faces=state.faces.map(f=>[...f]);
  trial.creases=new Map(state.creases||[]);trial.looseEdges=new Set(state.looseEdges||[]);trial.looseVertices=new Set(state.looseVertices||[]);
  return trial;
}

function diagnostic(ok,reason,extra={}){globalThis.__boxlabOpenChainAllQuadBridge={version:VERSION,ok,allQuad:!!ok,qualityGuarded:true,lastReject:reason||null,...extra};}

export function installOpenChainAllQuadBridge(EditableMesh){
  const proto=EditableMesh?.prototype;if(!proto||proto.__openChainAllQuadBridge285Installed)return;
  const baseSelected=proto.bridgeSelectedEdges,topology=globalThis.__boxlabTopology;
  if(typeof baseSelected!=='function'||!topology?.cloneMeshState||!topology?.restoreMeshState||!topology?.validateTopology)return;

  proto.bridgeSelectedEdges=function(edgeIndices){
    const info=this.bridgeEdgeSelectionInfo?.(edgeIndices);
    if(!info?.openChain||!info.unequal||!canTryOpenAllQuad(info.chains?.[0],info.chains?.[1]))return baseSelected.call(this,edgeIndices);
    const fallback=(reason,extra={})=>{diagnostic(false,reason,{counts:info.counts||[],...extra});return baseSelected.call(this,edgeIndices);};
    const before=topology.validateTopology(this,{allowBoundary:true});if(!before.ok)return fallback('input-topology');
    const sourceA=[...info.chains[0]],sourceB=[...info.chains[1]],target=Math.max(sourceA.length,sourceB.length),shortA=sourceA.length<sourceB.length;
    let best=null,lastReject='no-candidate',tested=0;
    for(const reverseShort of[false,true]){
      const trial=trialFrom(this,topology),a=[...sourceA],b=[...sourceB];
      let short=shortA?a:b,long=shortA?b:a;
      if(reverseShort)short=[...short].reverse();
      let denseShort=densifyOpenChainToCount(trial,short,target);if(!denseShort){lastReject='densify-failed';continue;}
      if(reverseShort)denseShort=[...denseShort].reverse();
      const denseA=shortA?denseShort:long,denseB=shortA?long:denseShort;
      const planned=bestEqualQuadPlan(trial,denseA,denseB),plan=planned.plan;if(!plan){lastReject=planned.reason||'quality-rejected';continue;}
      const start=trial.faces.length;trial.faces.push(...plan.faces.map(f=>[...f]));
      if(trial.looseEdges instanceof Set)for(const chain of[denseA,denseB])for(let i=0;i<chain.length-1;i++)trial.looseEdges.delete(edgeKey(trial,chain[i],chain[i+1]));
      trial.edges?.();tested++;
      const validation=topology.validateTopology(trial,{allowBoundary:true});if(!validation.ok){lastReject='topology-rejected';continue;}
      const winding=windingValidation(trial);if(!winding.ok){lastReject=winding.reason||'winding-rejected';continue;}
      const quality=validateOpenAllQuadCandidate(trial,plan.faces,denseA,plan.mapped);if(!quality.ok){lastReject=quality.reason;continue;}
      if(!best||plan.score<best.score-1e-12)best={score:plan.score,reverseShort,trial,plan,start,denseA,denseB,quality};
    }
    if(!best)return fallback(lastReject,{searchCandidates:tested});
    topology.restoreMeshState(this,topology.cloneMeshState(best.trial));
    const faceIndices=Array.from({length:best.plan.faces.length},(_,i)=>best.start+i),addedVertices=Math.abs(info.counts[0]-info.counts[1]);
    const result={faceIndices,plan:{...best.plan,quadCount:faceIndices.length,triangleCount:0,qualityGuarded:true,correspondenceSearch:true,searchCandidates:tested,reverseShort:best.reverseShort},openChain:true,unequal:true,allQuad:true,subdFriendly:true,balancedDensification:true,correspondenceSearch:true,searchCandidates:tested,addedVertices,denseCounts:[best.denseA.length-1,best.denseB.length-1]};
    diagnostic(true,null,{addedVertices,denseCounts:result.denseCounts,connectors:best.quality.connectors,searchCandidates:tested,reverseShort:best.reverseShort,searchScore:best.score});
    return result;
  };

  proto.__openChainAllQuadBridge285Installed=true;
  diagnostic(null,null,{addedVertices:0,denseCounts:[]});
}
