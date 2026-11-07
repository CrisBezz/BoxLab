// BoxLab topology foundation v0.36.15.0
// Canonical edge splitting, boundary extraction, and transactional validation helpers.

function edgeKey(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}

function cloneMeshState(mesh){
  return {
    vertices: mesh.vertices.map(v=>v.clone()),
    faces: mesh.faces.map(f=>[...f]),
    creases: new Map(mesh.creases||[]),
    looseEdges: new Set(mesh.looseEdges||[]),
    looseVertices: new Set(mesh.looseVertices||[])
  };
}

function restoreMeshState(mesh,state){
  mesh.vertices=state.vertices.map(v=>v.clone());
  mesh.faces=state.faces.map(f=>[...f]);
  mesh.creases=new Map(state.creases||[]);
  mesh.looseEdges=new Set(state.looseEdges||[]);
  mesh.looseVertices=new Set(state.looseVertices||[]);
  mesh.edges?.();
  return mesh;
}

function edgeOwners(mesh,a,b){
  const k=edgeKey(a,b),owners=[];
  for(let fi=0;fi<mesh.faces.length;fi++){
    const face=mesh.faces[fi];
    if(!Array.isArray(face)||face.length<2)continue;
    for(let i=0;i<face.length;i++){
      if(edgeKey(face[i],face[(i+1)%face.length])===k){owners.push(fi);break;}
    }
  }
  return owners;
}

function splitFaceEdge(face,a,b,newId){
  for(let i=0;i<face.length;i++){
    const x=face[i],y=face[(i+1)%face.length];
    if((x===a&&y===b)||(x===b&&y===a)){
      const out=[...face];
      out.splice(i+1,0,newId);
      return out;
    }
  }
  return null;
}

function canonicalEdgeSplit(mesh,a,b,pointOrT=0.5,options={}){
  if(!mesh?.vertices?.[a]||!mesh?.vertices?.[b]||a===b)return{ok:false,reason:'invalid-edge'};
  const owners=edgeOwners(mesh,a,b);
  if(!owners.length)return{ok:false,reason:'edge-not-found'};
  if(owners.length>2&&!options.allowNonManifold)return{ok:false,reason:'non-manifold-edge',owners};
  const va=mesh.vertices[a],vb=mesh.vertices[b];
  let point;
  if(typeof pointOrT==='number'){
    const t=Math.max(0,Math.min(1,pointOrT));
    if(t<=1e-8)return{ok:true,vertex:a,reused:true,owners};
    if(t>=1-1e-8)return{ok:true,vertex:b,reused:true,owners};
    point=va.clone().lerp(vb,t);
  }else if(pointOrT?.isVector3){
    point=pointOrT.clone();
    const ab=vb.clone().sub(va),l2=ab.lengthSq();
    if(l2<1e-12)return{ok:false,reason:'zero-length-edge'};
    const t=point.clone().sub(va).dot(ab)/l2;
    if(t<=1e-8)return{ok:true,vertex:a,reused:true,owners};
    if(t>=1-1e-8)return{ok:true,vertex:b,reused:true,owners};
    if(t<0||t>1)return{ok:false,reason:'point-outside-edge'};
    const closest=va.clone().addScaledVector(ab,t);
    const tol=options.tolerance??Math.max(1e-7,Math.sqrt(l2)*1e-6);
    if(closest.distanceTo(point)>tol)return{ok:false,reason:'point-off-edge'};
    point=closest;
  }else return{ok:false,reason:'invalid-split-position'};

  const before=cloneMeshState(mesh),newId=mesh.vertices.length;
  mesh.vertices.push(point);
  for(const fi of owners){
    const next=splitFaceEdge(mesh.faces[fi],a,b,newId);
    if(!next){restoreMeshState(mesh,before);return{ok:false,reason:'incident-face-split-failed',face:fi};}
    mesh.faces[fi]=next;
  }
  if(mesh.looseEdges instanceof Set){
    const old=edgeKey(a,b);
    if(mesh.looseEdges.delete(old)){
      mesh.looseEdges.add(edgeKey(a,newId));
      mesh.looseEdges.add(edgeKey(newId,b));
    }
  }
  if(mesh.creases instanceof Map){
    const old=mesh.edgeKey?.(a,b)??edgeKey(a,b),strength=mesh.creases.get(old);
    if(strength!==undefined){
      mesh.creases.delete(old);
      mesh.creases.set(mesh.edgeKey?.(a,newId)??edgeKey(a,newId),strength);
      mesh.creases.set(mesh.edgeKey?.(newId,b)??edgeKey(newId,b),strength);
    }
  }
  mesh.edges?.();
  return{ok:true,vertex:newId,reused:false,owners};
}

function buildEdgeUse(mesh,faceFilter=null){
  const uses=new Map();
  for(let fi=0;fi<mesh.faces.length;fi++){
    if(faceFilter&&!faceFilter.has(fi))continue;
    const face=mesh.faces[fi];
    if(!Array.isArray(face)||face.length<3)continue;
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length],k=edgeKey(a,b);
      if(!uses.has(k))uses.set(k,{a,b,faces:[],directed:[]});
      const rec=uses.get(k);rec.faces.push(fi);rec.directed.push([a,b,fi]);
    }
  }
  return uses;
}

function extractBoundaryLoops(mesh,faceIndices=null){
  const filter=faceIndices?new Set(faceIndices):null,uses=buildEdgeUse(mesh,filter),boundary=[];
  for(const rec of uses.values())if(rec.faces.length===1)boundary.push([rec.a,rec.b]);
  const adj=new Map();
  for(const [a,b] of boundary){
    if(!adj.has(a))adj.set(a,[]);if(!adj.has(b))adj.set(b,[]);
    adj.get(a).push(b);adj.get(b).push(a);
  }
  const bad=[...adj].filter(([,n])=>n.length!==2);
  if(bad.length)return{ok:false,reason:'branched-or-open-boundary',vertices:bad.map(([v,n])=>({vertex:v,degree:n.length})),loops:[]};
  const unused=new Set(boundary.map(([a,b])=>edgeKey(a,b))),loops=[];
  while(unused.size){
    const first=[...unused][0],[sa,sb]=first.split(':').map(Number),loop=[sa],start=sa,prev=null,current=sa;
    for(let guard=0;guard<=boundary.length+1;guard++){
      const next=(adj.get(current)||[]).find(v=>v!==prev&&unused.has(edgeKey(current,v)))??(adj.get(current)||[]).find(v=>unused.has(edgeKey(current,v)));
      if(next===undefined)return{ok:false,reason:'boundary-walk-failed',loops};
      unused.delete(edgeKey(current,next));
      if(next===start)break;
      if(loop.includes(next))return{ok:false,reason:'self-intersecting-boundary',loops};
      loop.push(next);prev=current;current=next;
    }
    if(loop.length<3)return{ok:false,reason:'degenerate-boundary',loops};
    loops.push(loop);
  }
  return{ok:true,loops};
}

function validateTopology(mesh,options={}){
  const uses=buildEdgeUse(mesh),boundary=[],nonManifold=[],degenerateFaces=[],duplicateFaces=[];
  for(const rec of uses.values()){
    if(rec.faces.length===1)boundary.push([rec.a,rec.b]);
    else if(rec.faces.length>2)nonManifold.push({edge:[rec.a,rec.b],faces:[...rec.faces]});
  }
  const seen=new Set();
  for(let fi=0;fi<mesh.faces.length;fi++){
    const face=mesh.faces[fi];
    if(!Array.isArray(face)||face.length<3||new Set(face).size<3){degenerateFaces.push(fi);continue;}
    const canonical=[...face].sort((a,b)=>a-b).join(':');
    if(seen.has(canonical))duplicateFaces.push(fi);else seen.add(canonical);
  }
  const allowBoundary=options.allowBoundary??true;
  const ok=!nonManifold.length&&!degenerateFaces.length&&!duplicateFaces.length&&(allowBoundary||!boundary.length);
  return{ok,boundary,nonManifold,degenerateFaces,duplicateFaces};
}

function topologyTransaction(mesh,edit,options={}){
  const before=cloneMeshState(mesh);
  try{
    const result=edit(mesh);
    if(result===false||result?.ok===false){restoreMeshState(mesh,before);return{ok:false,reason:result?.reason||'edit-rejected',result};}
    const validation=validateTopology(mesh,options.validation||{});
    if(!validation.ok){restoreMeshState(mesh,before);return{ok:false,reason:'validation-failed',validation};}
    return{ok:true,result,validation,before};
  }catch(error){
    restoreMeshState(mesh,before);
    return{ok:false,reason:'exception',error};
  }
}

globalThis.__boxlabTopology={
  version:'0.36.15.0',
  edgeKey,
  edgeOwners,
  canonicalEdgeSplit,
  extractBoundaryLoops,
  validateTopology,
  topologyTransaction,
  cloneMeshState,
  restoreMeshState
};

globalThis.window?.dispatchEvent(new CustomEvent('boxlab-topology-foundation-ready',{detail:globalThis.__boxlabTopology}));
