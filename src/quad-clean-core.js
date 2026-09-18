// BoxLab v0.36.18.293 — Quad Clean local retopo + conservative sliver cleanup + quad-flow relax.
// Phase 1 repairs safe four-triangle quad fans. Phase 2 collapses only demonstrably-better skinny interior triangle edges. Phase 3 merges safe triangle pairs. Phase 4 tangent-relaxes safe interior all-quad vertices.

const EPS=1e-12;
const MAX_EDGE_RATIO=5;
const MIN_NORMAL_DOT=Math.cos(Math.PI/4);
const SLIVER_EDGE_FRACTION=.12;
const SLIVER_MIN_NORMAL_DOT=Math.cos(Math.PI/6);

function edgeKey(mesh,a,b){return mesh.edgeKey?mesh.edgeKey(a,b):(a<b?`${a}:${b}`:`${b}:${a}`);}
function triNormal(mesh,face){
  const a=mesh.vertices?.[face?.[0]],b=mesh.vertices?.[face?.[1]],c=mesh.vertices?.[face?.[2]];
  if(!a||!b||!c)return null;
  const n=b.clone().sub(a).cross(c.clone().sub(a)),l=n.length();
  return l>EPS?n.multiplyScalar(1/l):null;
}
function faceEdges(face){return face.map((a,i)=>[a,face[(i+1)%face.length]]);}

function quadFromTriangles(mesh,a,b,sharedKey){
  const directed=[];
  for(const face of[a,b])for(const [x,y] of faceEdges(face))if(edgeKey(mesh,x,y)!==sharedKey)directed.push([x,y]);
  if(directed.length!==4)return null;
  for(let start=0;start<directed.length;start++){
    const used=new Set([start]),quad=[directed[start][0],directed[start][1]];
    let current=directed[start][1];
    for(let step=1;step<4;step++){
      let found=-1,reverse=false;
      for(let i=0;i<directed.length;i++){
        if(used.has(i))continue;
        if(directed[i][0]===current){found=i;break;}
        if(directed[i][1]===current){found=i;reverse=true;break;}
      }
      if(found<0)break;
      used.add(found);
      const next=reverse?directed[found][0]:directed[found][1];
      if(step<3)quad.push(next);
      current=next;
    }
    if(used.size===4&&current===quad[0]&&new Set(quad).size===4)return quad;
  }
  return null;
}

export function evaluateTrianglePair(mesh,faceA,faceB){
  if(!mesh||faceA===faceB)return{ok:false,reason:'invalid-pair'};
  const a=mesh.faces?.[faceA],b=mesh.faces?.[faceB];
  if(!Array.isArray(a)||!Array.isArray(b)||a.length!==3||b.length!==3)return{ok:false,reason:'not-triangles'};
  const shared=a.filter(v=>b.includes(v));
  if(shared.length!==2)return{ok:false,reason:'not-one-shared-edge'};
  const sharedKey=edgeKey(mesh,shared[0],shared[1]);
  const owners=mesh.edges?.().find(e=>edgeKey(mesh,e.a,e.b)===sharedKey)?.faces||[];
  if(owners.length!==2)return{ok:false,reason:'non-manifold-shared-edge'};
  if((mesh.creases instanceof Map)&&(mesh.creases.get(sharedKey)||0)>0)return{ok:false,reason:'creased-edge'};
  const na=triNormal(mesh,a),nb=triNormal(mesh,b);
  if(!na||!nb)return{ok:false,reason:'degenerate-triangle'};
  const normalDot=na.dot(nb);
  if(normalDot<MIN_NORMAL_DOT)return{ok:false,reason:'normal-break'};
  const quad=quadFromTriangles(mesh,a,b,sharedKey);
  if(!quad)return{ok:false,reason:'quad-order'};
  const p=quad.map(i=>mesh.vertices?.[i]);
  if(p.some(v=>!v))return{ok:false,reason:'missing-vertex'};
  const q1=p[1].clone().sub(p[0]).cross(p[2].clone().sub(p[0]));
  const q2=p[2].clone().sub(p[0]).cross(p[3].clone().sub(p[0]));
  const l1=q1.length(),l2=q2.length();
  if(l1<=EPS||l2<=EPS)return{ok:false,reason:'degenerate-quad'};
  if(q1.dot(q2)/(l1*l2)<-0.05)return{ok:false,reason:'folded-quad'};
  const lengths=quad.map((v,i)=>mesh.vertices[v].distanceTo(mesh.vertices[quad[(i+1)%4]]));
  const min=Math.min(...lengths),max=Math.max(...lengths);
  if(min<=EPS||max/min>MAX_EDGE_RATIO)return{ok:false,reason:'aspect-ratio'};
  const score=(1-normalDot)*2+Math.log(Math.max(max/min,1));
  return{ok:true,quad,sharedKey,score,normalDot,edgeRatio:max/min};
}

export function quadCleanTrianglePairs(mesh){
  if(!mesh?.faces||!mesh?.vertices)return{ok:false,reason:'invalid-mesh',merged:0,before:null,after:null};
  const before={
    vertices:mesh.vertices.length,
    faces:mesh.faces.length,
    triangles:mesh.faces.filter(f=>f.length===3).length,
    quads:mesh.faces.filter(f=>f.length===4).length,
    ngons:mesh.faces.filter(f=>f.length>4).length
  };
  const candidates=[];
  const edges=mesh.edges?.()||[];
  for(const edge of edges){
    if(edge.faces?.length!==2)continue;
    const [a,b]=edge.faces;
    const evaluated=evaluateTrianglePair(mesh,a,b);
    if(evaluated.ok)candidates.push({a,b,...evaluated});
  }
  candidates.sort((x,y)=>x.score-y.score||x.a-y.a||x.b-y.b);
  const used=new Set(),chosen=[];
  for(const c of candidates){
    if(used.has(c.a)||used.has(c.b))continue;
    used.add(c.a);used.add(c.b);chosen.push(c);
  }
  if(!chosen.length)return{ok:true,changed:false,merged:0,before,after:{...before},candidates:candidates.length};
  const replacement=new Map(),remove=new Set();
  for(const c of chosen){replacement.set(Math.min(c.a,c.b),c.quad);remove.add(Math.max(c.a,c.b));}
  const faces=[];
  for(let i=0;i<mesh.faces.length;i++){
    if(remove.has(i))continue;
    faces.push(replacement.get(i)||[...mesh.faces[i]]);
  }
  mesh.faces=faces;
  mesh.edges?.();
  const after={
    vertices:mesh.vertices.length,
    faces:mesh.faces.length,
    triangles:mesh.faces.filter(f=>f.length===3).length,
    quads:mesh.faces.filter(f=>f.length===4).length,
    ngons:mesh.faces.filter(f=>f.length>4).length
  };
  return{ok:true,changed:true,merged:chosen.length,before,after,candidates:candidates.length};
}


function compactUnusedVertices(mesh){
  const used=new Set();
  for(const face of mesh.faces||[])for(const v of face||[])used.add(v);
  if(mesh.looseEdges instanceof Set)for(const key of mesh.looseEdges){
    const [a,b]=String(key).split(':').map(Number);if(Number.isInteger(a))used.add(a);if(Number.isInteger(b))used.add(b);
  }
  if(mesh.looseVertices instanceof Set)for(const v of mesh.looseVertices)used.add(v);
  const map=new Map(),vertices=[];
  for(let i=0;i<mesh.vertices.length;i++)if(used.has(i)){map.set(i,vertices.length);vertices.push(mesh.vertices[i]);}
  if(vertices.length===mesh.vertices.length)return 0;
  mesh.faces=(mesh.faces||[]).map(face=>face.map(v=>map.get(v)));
  if(mesh.creases instanceof Map){
    const next=new Map();
    for(const [key,strength] of mesh.creases){
      const [a,b]=String(key).split(':').map(Number),na=map.get(a),nb=map.get(b);
      if(Number.isInteger(na)&&Number.isInteger(nb)&&na!==nb)next.set(na<nb?`${na}:${nb}`:`${nb}:${na}`,strength);
    }
    mesh.creases=next;
  }
  if(mesh.looseEdges instanceof Set){
    const next=new Set();
    for(const key of mesh.looseEdges){
      const [a,b]=String(key).split(':').map(Number),na=map.get(a),nb=map.get(b);
      if(Number.isInteger(na)&&Number.isInteger(nb)&&na!==nb)next.add(na<nb?`${na}:${nb}`:`${nb}:${na}`);
    }
    mesh.looseEdges=next;
  }
  if(mesh.looseVertices instanceof Set){
    const next=new Set();for(const v of mesh.looseVertices){const nv=map.get(v);if(Number.isInteger(nv))next.add(nv);}mesh.looseVertices=next;
  }
  const removed=mesh.vertices.length-vertices.length;mesh.vertices=vertices;return removed;
}

function orderedQuadFanBoundary(mesh,center,faceIds){
  const adjacency=new Map(),edges=[];
  for(const fi of faceIds){
    const face=mesh.faces[fi],outer=face.filter(v=>v!==center);
    if(outer.length!==2||outer[0]===outer[1])return null;
    const [a,b]=outer;edges.push([a,b]);
    if(!adjacency.has(a))adjacency.set(a,new Set());if(!adjacency.has(b))adjacency.set(b,new Set());
    adjacency.get(a).add(b);adjacency.get(b).add(a);
  }
  if(adjacency.size!==4||[...adjacency.values()].some(set=>set.size!==2))return null;
  const start=Math.min(...adjacency.keys()),cycle=[start],seen=new Set([start]);
  let prev=null,current=start;
  for(let step=0;step<3;step++){
    const next=[...adjacency.get(current)].find(v=>v!==prev&&!seen.has(v));
    if(next==null)return null;cycle.push(next);seen.add(next);prev=current;current=next;
  }
  if(!adjacency.get(current)?.has(start))return null;
  return cycle;
}

function evaluateQuadFan(mesh,center,faceIds){
  if(faceIds.length!==4||faceIds.some(fi=>mesh.faces[fi]?.length!==3))return{ok:false,reason:'not-four-triangle-fan'};
  const radialNeighbors=new Set();
  for(const fi of faceIds)for(const v of mesh.faces[fi])if(v!==center)radialNeighbors.add(v);
  if(radialNeighbors.size!==4)return{ok:false,reason:'fan-boundary-count'};
  for(const v of radialNeighbors){
    const key=edgeKey(mesh,center,v),edge=mesh.edges?.().find(e=>edgeKey(mesh,e.a,e.b)===key);
    if(edge?.faces?.length!==2)return{ok:false,reason:'fan-non-manifold'};
    if(mesh.creases instanceof Map&&(mesh.creases.get(key)||0)>0)return{ok:false,reason:'creased-radial-edge'};
  }
  const normals=faceIds.map(fi=>triNormal(mesh,mesh.faces[fi]));
  if(normals.some(n=>!n))return{ok:false,reason:'degenerate-fan'};
  const avg=normals[0].clone().multiplyScalar(0);for(const n of normals)avg.add(n);
  if(avg.length()<=EPS)return{ok:false,reason:'fan-normal-cancel'};avg.normalize();
  const minDot=Math.min(...normals.map(n=>n.dot(avg)));
  if(minDot<MIN_NORMAL_DOT)return{ok:false,reason:'fan-normal-break'};
  let quad=orderedQuadFanBoundary(mesh,center,faceIds);
  if(!quad)return{ok:false,reason:'fan-boundary-order'};
  const p=quad.map(i=>mesh.vertices[i]);
  let q1=p[1].clone().sub(p[0]).cross(p[2].clone().sub(p[0]));
  let q2=p[2].clone().sub(p[0]).cross(p[3].clone().sub(p[0]));
  if(q1.length()<=EPS||q2.length()<=EPS)return{ok:false,reason:'degenerate-quad'};
  if(q1.clone().add(q2).dot(avg)<0){quad=[quad[0],quad[3],quad[2],quad[1]];const pp=quad.map(i=>mesh.vertices[i]);q1=pp[1].clone().sub(pp[0]).cross(pp[2].clone().sub(pp[0]));q2=pp[2].clone().sub(pp[0]).cross(pp[3].clone().sub(pp[0]));}
  const l1=q1.length(),l2=q2.length();if(l1<=EPS||l2<=EPS||q1.dot(q2)/(l1*l2)<-0.05)return{ok:false,reason:'folded-quad'};
  const lengths=quad.map((v,i)=>mesh.vertices[v].distanceTo(mesh.vertices[quad[(i+1)%4]]));
  const min=Math.min(...lengths),max=Math.max(...lengths);
  if(min<=EPS||max/min>MAX_EDGE_RATIO)return{ok:false,reason:'aspect-ratio'};
  const quadN=q1.clone().add(q2).normalize(),normalDot=Math.max(-1,Math.min(1,quadN.dot(avg)));
  return{ok:true,center,faces:[...faceIds],quad,score:(1-normalDot)*2+Math.log(Math.max(max/min,1)),edgeRatio:max/min,normalDot};
}

export function quadCleanLocalRetopo(mesh){
  if(!mesh?.faces||!mesh?.vertices)return{ok:false,reason:'invalid-mesh',changed:false,fanRepairs:0};
  const incident=Array.from({length:mesh.vertices.length},()=>[]);
  for(let fi=0;fi<mesh.faces.length;fi++)for(const v of mesh.faces[fi]||[])incident[v]?.push(fi);
  const candidates=[];
  for(let center=0;center<incident.length;center++){
    if(incident[center].length!==4)continue;
    const c=evaluateQuadFan(mesh,center,incident[center]);if(c.ok)candidates.push(c);
  }
  candidates.sort((a,b)=>a.score-b.score||a.center-b.center);
  const usedFaces=new Set(),chosen=[];
  for(const c of candidates){if(c.faces.some(fi=>usedFaces.has(fi)))continue;for(const fi of c.faces)usedFaces.add(fi);chosen.push(c);}
  if(!chosen.length)return{ok:true,changed:false,fanRepairs:0,candidates:candidates.length,removedVertices:0};
  const replacement=new Map(),remove=new Set();
  for(const c of chosen){const keep=Math.min(...c.faces);replacement.set(keep,c.quad);for(const fi of c.faces)if(fi!==keep)remove.add(fi);}
  const next=[];
  for(let fi=0;fi<mesh.faces.length;fi++){if(remove.has(fi))continue;next.push(replacement.get(fi)||[...mesh.faces[fi]]);}
  mesh.faces=next;
  const removedVertices=compactUnusedVertices(mesh);
  mesh.edges?.();
  return{ok:true,changed:true,fanRepairs:chosen.length,candidates:candidates.length,removedVertices};
}


function triangleShapePenalty(mesh,face){
  if(!Array.isArray(face)||face.length!==3)return 0;
  const p=face.map(i=>mesh.vertices?.[i]);if(p.some(v=>!v))return Infinity;
  const ab=p[1].clone().sub(p[0]),ac=p[2].clone().sub(p[0]);
  const area2=ab.clone().cross(ac).length();
  const lengths=[p[0].distanceTo(p[1]),p[1].distanceTo(p[2]),p[2].distanceTo(p[0])];
  const max=Math.max(...lengths);
  return area2>EPS&&max>EPS?(max*max/area2):Infinity;
}

function median(values){
  const a=values.filter(Number.isFinite).sort((x,y)=>x-y);
  if(!a.length)return 0;
  const m=Math.floor(a.length/2);return a.length%2?a[m]:(a[m-1]+a[m])*.5;
}

function sliverProtectedVertices(mesh,edges){
  const protectedVertices=new Set();
  for(const edge of edges){
    const key=edgeKey(mesh,edge.a,edge.b);
    if(edge.faces?.length!==2||(mesh.creases instanceof Map&&(mesh.creases.get(key)||0)>0){
      protectedVertices.add(edge.a);protectedVertices.add(edge.b);
    }
  }
  if(mesh.looseEdges instanceof Set)for(const key of mesh.looseEdges){
    const [a,b]=String(key).split(':').map(Number);
    if(Number.isInteger(a))protectedVertices.add(a);
    if(Number.isInteger(b))protectedVertices.add(b);
  }
  if(mesh.looseVertices instanceof Set)for(const v of mesh.looseVertices)protectedVertices.add(v);
  return protectedVertices;
}

function collapseSnapshot(mesh){
  return{
    vertices:mesh.vertices.map(v=>v.clone()),
    faces:mesh.faces.map(f=>[...f]),
    creases:mesh.creases instanceof Map?new Map(mesh.creases):mesh.creases,
    looseEdges:mesh.looseEdges instanceof Set?new Set(mesh.looseEdges):mesh.looseEdges,
    looseVertices:mesh.looseVertices instanceof Set?new Set(mesh.looseVertices):mesh.looseVertices
  };
}
function restoreCollapseSnapshot(mesh,snap){
  mesh.vertices=snap.vertices;mesh.faces=snap.faces;
  if(snap.creases instanceof Map)mesh.creases=new Map(snap.creases);
  if(snap.looseEdges instanceof Set)mesh.looseEdges=new Set(snap.looseEdges);
  if(snap.looseVertices instanceof Set)mesh.looseVertices=new Set(snap.looseVertices);
  mesh.edges?.();
}
function canonicalFace(face){return [...face].sort((a,b)=>a-b).join(':');}
function hasDuplicateFaces(mesh){
  const seen=new Set();
  for(const face of mesh.faces||[]){
    const key=canonicalFace(face);
    if(seen.has(key))return true;
    seen.add(key);
  }
  return false;
}
function cleanCollapsedFace(face){
  const out=[];
  for(const v of face){
    if(out.length&&out[out.length-1]===v)continue;
    out.push(v);
  }
  if(out.length>1&&out[0]===out[out.length-1])out.pop();
  return new Set(out).size===out.length?out:null;
}
function incidentTriangles(mesh,vertex){
  const faces=[];
  for(const face of mesh.faces||[])if(face?.includes(vertex)){
    if(face.length!==3)return null;
    faces.push(face);
  }
  return faces;
}
function smoothTriangleRing(mesh,faces){
  const normals=faces.map(face=>triNormal(mesh,face));
  if(normals.some(n=>!n)||!normals.length)return false;
  const avg=normals[0].clone().multiplyScalar(0);for(const n of normals)avg.add(n);
  if(avg.length()<=EPS)return false;avg.normalize();
  return normals.every(n=>n.dot(avg)>=SLIVER_MIN_NORMAL_DOT);
}
function edgeCollapseCandidate(mesh,edge,edges,protectedVertices){
  const a=edge.a,b=edge.b;
  if(edge.faces?.length!==2||protectedVertices.has(a)||protectedVertices.has(b))return null;
  if(edge.faces.some(fi=>mesh.faces?.[fi]?.length!==3))return null;
  const key=edgeKey(mesh,a,b);
  if(mesh.creases instanceof Map&&(mesh.creases.get(key)||0)>0)return null;
  const ringA=incidentTriangles(mesh,a),ringB=incidentTriangles(mesh,b);
  if(!ringA||!ringB)return null;
  const ringFaces=[...new Set([...edge.faces,
    ...mesh.faces.map((f,i)=>f?.includes(a)||f?.includes(b)?i:-1).filter(i=>i>=0)])].map(i=>mesh.faces[i]);
  if(!smoothTriangleRing(mesh,ringFaces))return null;
  const neighborsA=new Set(),neighborsB=new Set(),localLengths=[];
  for(const e of edges){
    if(e.a===a){neighborsA.add(e.b);if(e.b!==b)localLengths.push(mesh.vertices[a].distanceTo(mesh.vertices[e.b]));}
    else if(e.b===a){neighborsA.add(e.a);if(e.a!==b)localLengths.push(mesh.vertices[a].distanceTo(mesh.vertices[e.a]));}
    if(e.a===b){neighborsB.add(e.b);if(e.b!==a)localLengths.push(mesh.vertices[b].distanceTo(mesh.vertices[e.b]));}
    else if(e.b===b){neighborsB.add(e.a);if(e.a!==a)localLengths.push(mesh.vertices[b].distanceTo(mesh.vertices[e.a]));}
  }
  neighborsA.delete(b);neighborsB.delete(a);
  const shared=[...neighborsA].filter(v=>neighborsB.has(v)).sort((x,y)=>x-y);
  const opposites=[...new Set(edge.faces.flatMap(fi=>mesh.faces[fi].filter(v=>v!==a&&v!==b)))].sort((x,y)=>x-y);
  if(shared.length!==2||opposites.length!==2||shared.some((v,i)=>v!==opposites[i]))return null;
  const reference=median(localLengths);
  const length=mesh.vertices[a].distanceTo(mesh.vertices[b]);
  if(!(reference>EPS)||!(length/reference<=SLIVER_EDGE_FRACTION))return null;
  const beforePenalties=ringFaces.map(face=>triangleShapePenalty(mesh,face));
  if(beforePenalties.some(x=>!Number.isFinite(x)))return null;
  return{a,b,length,reference,beforeWorst:Math.max(...beforePenalties),beforeAvg:beforePenalties.reduce((x,y)=>x+y,0)/beforePenalties.length};
}
function applySliverCollapse(mesh,candidate){
  const {a,b}=candidate,snap=collapseSnapshot(mesh);
  const midpoint=mesh.vertices[a].clone().add(mesh.vertices[b]).multiplyScalar(.5);
  mesh.vertices[a].copy(midpoint);
  const next=[];
  for(const face of mesh.faces){
    const mapped=face.map(v=>v===b?a:v),clean=cleanCollapsedFace(mapped);
    if(!clean){restoreCollapseSnapshot(mesh,snap);return{ok:false,reason:'collapse-face-order'};}
    if(clean.length<3)continue;
    next.push(clean);
  }
  mesh.faces=next;
  if(hasDuplicateFaces(mesh)){restoreCollapseSnapshot(mesh,snap);return{ok:false,reason:'duplicate-face'};}
  const removedVertices=compactUnusedVertices(mesh);
  mesh.edges?.();
  let midpointIndex=-1,best=Infinity;
  for(let i=0;i<mesh.vertices.length;i++){const d=mesh.vertices[i].distanceTo(midpoint);if(d<best){best=d;midpointIndex=i;}}
  if(midpointIndex<0||best>1e-9){restoreCollapseSnapshot(mesh,snap);return{ok:false,reason:'collapsed-vertex-missing'};}
  const afterFaces=incidentTriangles(mesh,midpointIndex);
  if(!afterFaces?.length||!smoothTriangleRing(mesh,afterFaces)){restoreCollapseSnapshot(mesh,snap);return{ok:false,reason:'surface-guard'};}
  const afterPenalties=afterFaces.map(face=>triangleShapePenalty(mesh,face));
  if(afterPenalties.some(x=>!Number.isFinite(x))){restoreCollapseSnapshot(mesh,snap);return{ok:false,reason:'degenerate-result'};}
  const afterWorst=Math.max(...afterPenalties),afterAvg=afterPenalties.reduce((x,y)=>x+y,0)/afterPenalties.length;
  const improved=afterWorst<candidate.beforeWorst*.95&&afterAvg<=candidate.beforeAvg*1.02;
  if(!improved){restoreCollapseSnapshot(mesh,snap);return{ok:false,reason:'quality-not-improved',afterWorst,afterAvg};}
  return{ok:true,removedVertices,removedFaces:snap.faces.length-mesh.faces.length,beforeWorst:candidate.beforeWorst,afterWorst,beforeAvg:candidate.beforeAvg,afterAvg};
}

export function quadCleanSlivers(mesh,{maxRepairs=24}={}){
  if(!mesh?.faces||!mesh?.vertices)return{ok:false,reason:'invalid-mesh',changed:false,sliverRepairs:0};
  let sliverRepairs=0,removedVertices=0,removedFaces=0,rejected=0;
  for(let pass=0;pass<maxRepairs;pass++){
    const edges=mesh.edges?.()||[],protectedVertices=sliverProtectedVertices(mesh,edges),candidates=[];
    for(const edge of edges){
      const c=edgeCollapseCandidate(mesh,edge,edges,protectedVertices);
      if(c)candidates.push(c);
    }
    candidates.sort((x,y)=>(x.length/x.reference)-(y.length/y.reference)||y.beforeWorst-x.beforeWorst||x.a-y.a||x.b-y.b);
    if(!candidates.length)break;
    let committed=false;
    for(const candidate of candidates){
      const result=applySliverCollapse(mesh,candidate);
      if(result.ok){
        sliverRepairs++;removedVertices+=result.removedVertices||0;removedFaces+=result.removedFaces||0;committed=true;break;
      }
      rejected++;
    }
    if(!committed)break;
  }
  return{ok:true,changed:sliverRepairs>0,sliverRepairs,removedVertices,removedFaces,rejected};
}

function quadNormal(mesh,face){
  if(!Array.isArray(face)||face.length!==4)return null;
  const a=mesh.vertices?.[face[0]],b=mesh.vertices?.[face[1]],c=mesh.vertices?.[face[2]],d=mesh.vertices?.[face[3]];
  if(!a||!b||!c||!d)return null;
  const n1=b.clone().sub(a).cross(c.clone().sub(a));
  const n2=c.clone().sub(a).cross(d.clone().sub(a));
  const n=n1.add(n2),l=n.length();
  return l>EPS?n.multiplyScalar(1/l):null;
}

function quadAspectPenalty(mesh,face){
  const lengths=face.map((v,i)=>mesh.vertices[v].distanceTo(mesh.vertices[face[(i+1)%4]]));
  const min=Math.min(...lengths),max=Math.max(...lengths);
  if(!(min>EPS)||!Number.isFinite(max))return Infinity;
  const ratio=Math.max(max/min,1),log=Math.log(ratio);
  return log*log;
}

export function quadMeshFlowScore(mesh){
  if(!mesh?.faces||!mesh?.vertices)return Infinity;
  let score=0;
  const quads=[];
  for(let i=0;i<mesh.faces.length;i++){
    const face=mesh.faces[i];
    if(face?.length!==4)continue;
    const normal=quadNormal(mesh,face);
    if(!normal)return Infinity;
    const aspect=quadAspectPenalty(mesh,face);
    if(!Number.isFinite(aspect))return Infinity;
    score+=aspect*.35;
    quads.push({i,face,normal});
  }
  const edgeOwners=new Map();
  for(const q of quads)for(const [a,b] of faceEdges(q.face)){
    const key=edgeKey(mesh,a,b);
    if(!edgeOwners.has(key))edgeOwners.set(key,[]);
    edgeOwners.get(key).push(q);
  }
  for(const owners of edgeOwners.values()){
    if(owners.length!==2)continue;
    const dot=Math.max(-1,Math.min(1,owners[0].normal.dot(owners[1].normal)));
    score+=(1-dot)*.65;
  }
  return score;
}

function incidentData(mesh){
  const neighbors=Array.from({length:mesh.vertices.length},()=>new Set());
  const incidentFaces=Array.from({length:mesh.vertices.length},()=>new Set());
  const protectedVertices=new Set();
  const edges=mesh.edges?.()||[];
  for(const edge of edges){
    neighbors[edge.a]?.add(edge.b);neighbors[edge.b]?.add(edge.a);
    if(edge.faces?.length!==2||(mesh.creases instanceof Map&&(mesh.creases.get(edgeKey(mesh,edge.a,edge.b))||0)>0)){
      protectedVertices.add(edge.a);protectedVertices.add(edge.b);
    }
  }
  for(let fi=0;fi<mesh.faces.length;fi++){
    const face=mesh.faces[fi];
    for(const v of face||[])incidentFaces[v]?.add(fi);
    if(face?.length!==4)for(const v of face||[])protectedVertices.add(v);
  }
  return{neighbors,incidentFaces,protectedVertices};
}

export function quadRelaxFlow(mesh,{strength=.35,maxFraction=.15}={}){
  if(!mesh?.faces||!mesh?.vertices)return{ok:false,reason:'invalid-mesh',changed:false,relaxedVertices:0};
  const beforeScore=quadMeshFlowScore(mesh);
  if(!Number.isFinite(beforeScore))return{ok:false,reason:'invalid-quad-region',changed:false,relaxedVertices:0,beforeScore};
  const original=mesh.vertices.map(v=>v.clone());
  const {neighbors,incidentFaces,protectedVertices}=incidentData(mesh);
  const proposed=new Map();
  for(let vi=0;vi<mesh.vertices.length;vi++){
    if(protectedVertices.has(vi))continue;
    const ring=[...(neighbors[vi]||[])];
    if(ring.length<4)continue;
    const faces=[...(incidentFaces[vi]||[])];
    if(faces.length<3||faces.some(fi=>mesh.faces[fi]?.length!==4))continue;
    const current=mesh.vertices[vi],target=current.clone().multiplyScalar(0);
    for(const ni of ring)target.add(mesh.vertices[ni]);
    target.multiplyScalar(1/ring.length);
    const move=target.sub(current);
    const normal=current.clone().multiplyScalar(0);
    let normalCount=0;
    for(const fi of faces){
      const n=quadNormal(mesh,mesh.faces[fi]);
      if(n){normal.add(n);normalCount++;}
    }
    if(normalCount){
      const nl=normal.length();
      if(nl>EPS){normal.multiplyScalar(1/nl);move.addScaledVector(normal,-move.dot(normal));}
    }
    let avgEdge=0;
    for(const ni of ring)avgEdge+=current.distanceTo(mesh.vertices[ni]);
    avgEdge/=ring.length;
    const maxMove=Math.max(avgEdge*maxFraction,0);
    move.multiplyScalar(Math.max(0,Math.min(1,strength)));
    if(move.length()>maxMove&&maxMove>0)move.setLength(maxMove);
    if(move.length()>avgEdge*1e-6)proposed.set(vi,current.clone().add(move));
  }
  if(!proposed.size)return{ok:true,changed:false,relaxedVertices:0,beforeScore,afterScore:beforeScore};
  for(const [vi,pos] of proposed)mesh.vertices[vi].copy(pos);
  const afterScore=quadMeshFlowScore(mesh);
  const improved=Number.isFinite(afterScore)&&afterScore<beforeScore-1e-9;
  if(!improved){
    for(let i=0;i<original.length;i++)mesh.vertices[i].copy(original[i]);
    return{ok:true,changed:false,relaxedVertices:0,beforeScore,afterScore:beforeScore,rejectedScore:afterScore,candidates:proposed.size};
  }
  return{ok:true,changed:true,relaxedVertices:proposed.size,beforeScore,afterScore,candidates:proposed.size};
}

export function quadCleanMesh(mesh){
  if(!mesh?.faces||!mesh?.vertices)return{ok:false,reason:'invalid-mesh',changed:false};
  const start={
    vertices:mesh.vertices.length,
    faces:mesh.faces.length,
    triangles:mesh.faces.filter(f=>f.length===3).length,
    quads:mesh.faces.filter(f=>f.length===4).length,
    ngons:mesh.faces.filter(f=>f.length>4).length
  };
  const retopo=quadCleanLocalRetopo(mesh);
  if(!retopo.ok)return retopo;
  const slivers=quadCleanSlivers(mesh);
  if(!slivers.ok)return slivers;
  const merge=quadCleanTrianglePairs(mesh);
  if(!merge.ok)return merge;
  const relax=quadRelaxFlow(mesh);
  const after={
    vertices:mesh.vertices.length,
    faces:mesh.faces.length,
    triangles:mesh.faces.filter(f=>f.length===3).length,
    quads:mesh.faces.filter(f=>f.length===4).length,
    ngons:mesh.faces.filter(f=>f.length>4).length
  };
  return{
    ok:true,
    changed:!!retopo.changed||!!slivers.changed||!!merge.changed||!!relax.changed,
    fanRepairs:retopo.fanRepairs||0,
    removedVertices:retopo.removedVertices||0,
    sliverRepairs:slivers.sliverRepairs||0,
    sliverRemovedVertices:slivers.removedVertices||0,
    sliverRemovedFaces:slivers.removedFaces||0,
    merged:merge.merged||0,
    relaxedVertices:relax.relaxedVertices||0,
    before:start,
    after,
    flowBefore:relax.beforeScore,
    flowAfter:relax.afterScore,
    relaxRejectedScore:relax.rejectedScore,
    retopo,
    slivers,
    merge,
    relax
  };
}
