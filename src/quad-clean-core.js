// BoxLab v0.36.18.291 — Quad Clean foundation + conservative quad-flow relax.
// Phase 1 merges safe triangle pairs. Phase 2 tangent-relaxes safe interior all-quad vertices only when mesh flow improves.

const EPS=1e-12;
const MAX_EDGE_RATIO=5;
const MIN_NORMAL_DOT=Math.cos(Math.PI/4);

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
    if(edge.faces?.length!==2||(mesh.creases instanceof Map&&(mesh.creases.get(edgeKey(mesh,edge.a,edge.b))||0)>0){
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
    changed:!!merge.changed||!!relax.changed,
    merged:merge.merged||0,
    relaxedVertices:relax.relaxedVertices||0,
    before:start,
    after,
    flowBefore:relax.beforeScore,
    flowAfter:relax.afterScore,
    relaxRejectedScore:relax.rejectedScore,
    merge,
    relax
  };
}
