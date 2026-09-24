import {analyzeMeshHealth} from './mesh-health-core.js?v=0.36.18.441';

function edgeKey(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}
function boundaryRecords(mesh){
  const uses=new Map();
  for(let fi=0;fi<mesh.faces.length;fi++){
    const face=mesh.faces[fi];
    if(!Array.isArray(face)||face.length<3)continue;
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length],key=edgeKey(a,b);
      if(!uses.has(key))uses.set(key,[]);
      uses.get(key).push({fi,a,b});
    }
  }
  return [...uses.entries()].filter(([,owners])=>owners.length===1).map(([key,owners])=>({key,...owners[0]}));
}
function directedEdge(face,a,b){
  if(!Array.isArray(face))return 0;
  for(let i=0;i<face.length;i++){
    const x=face[i],y=face[(i+1)%face.length];
    if(x===a&&y===b)return 1;
    if(x===b&&y===a)return-1;
  }
  return 0;
}
function orientAgainstNeighbour(mesh,cycle){
  const boundaries=boundaryRecords(mesh);
  const byKey=new Map(boundaries.map(e=>[e.key,e]));
  for(let i=0;i<cycle.length;i++){
    const a=cycle[i],b=cycle[(i+1)%cycle.length],edge=byKey.get(edgeKey(a,b));
    if(!edge)continue;
    const neighbour=mesh.faces[edge.fi];
    if(directedEdge(neighbour,a,b)===1)return [...cycle].reverse();
    if(directedEdge(neighbour,a,b)===-1)return [...cycle];
  }
  return [...cycle];
}
export function simpleBoundaryLoops(mesh){
  if(!mesh?.faces||!mesh?.vertices)return{ok:false,reason:'invalid-mesh',loops:[]};
  const boundary=boundaryRecords(mesh);
  if(!boundary.length)return{ok:true,reason:'closed-mesh',loops:[],boundaryEdges:0};
  const adjacency=new Map();
  for(const edge of boundary){
    if(!adjacency.has(edge.a))adjacency.set(edge.a,[]);
    if(!adjacency.has(edge.b))adjacency.set(edge.b,[]);
    adjacency.get(edge.a).push(edge.b);
    adjacency.get(edge.b).push(edge.a);
  }
  const branch=[...adjacency.entries()].find(([,list])=>list.length!==2);
  if(branch)return{ok:false,reason:'branched-boundary',vertex:branch[0],degree:branch[1].length,loops:[],boundaryEdges:boundary.length};

  const unused=new Set(boundary.map(e=>e.key)),loops=[];
  while(unused.size){
    const seedKey=unused.values().next().value;
    const seed=boundary.find(e=>e.key===seedKey);
    if(!seed)return{ok:false,reason:'boundary-index-failed',loops,boundaryEdges:boundary.length};
    const start=seed.a,cycle=[start],seen=new Set([start]);
    let previous=null,current=start;
    for(let guard=0;guard<=adjacency.size+2;guard++){
      const candidates=(adjacency.get(current)||[]).filter(v=>v!==previous);
      if(!candidates.length)return{ok:false,reason:'open-boundary-chain',loops,boundaryEdges:boundary.length};
      let next=candidates.find(v=>unused.has(edgeKey(current,v)));
      if(next===undefined)next=candidates[0];
      unused.delete(edgeKey(current,next));
      if(next===start)break;
      if(seen.has(next))return{ok:false,reason:'self-intersecting-boundary-graph',loops,boundaryEdges:boundary.length};
      cycle.push(next);seen.add(next);previous=current;current=next;
    }
    if(cycle.length<3)return{ok:false,reason:'short-boundary-loop',loops,boundaryEdges:boundary.length};
    const closing=edgeKey(cycle[cycle.length-1],start);
    if(unused.has(closing))unused.delete(closing);
    if(!(adjacency.get(cycle[cycle.length-1])||[]).includes(start))
      return{ok:false,reason:'open-boundary-chain',loops,boundaryEdges:boundary.length};
    loops.push(orientAgainstNeighbour(mesh,cycle));
  }
  return{ok:true,reason:null,loops,boundaryEdges:boundary.length};
}
function cloneInto(target,source){
  target.vertices=source.vertices.map(v=>v.clone());
  target.faces=source.faces.map(f=>[...f]);
  target.faceGroups=source.faces.map((_,i)=>source.faceGroups?.[i]??null);
  target.creases=new Map(source.creases||[]);
  if(source.looseEdges instanceof Set)target.looseEdges=new Set(source.looseEdges);
  if(source.looseVertices instanceof Set)target.looseVertices=new Set(source.looseVertices);
  target.edges?.();
}
export function autoCloseSimpleHoles(mesh){
  if(!mesh?.clone)return{ok:false,changed:false,reason:'invalid-mesh'};
  const before=analyzeMeshHealth(mesh);
  if(before.state==='closed-clean')return{ok:true,changed:false,reason:'already-closed',before,after:before,holesClosed:0};
  if(before.state!=='open-clean')return{ok:false,changed:false,reason:'mesh-not-clean-open',before,holesClosed:0};
  const info=simpleBoundaryLoops(mesh);
  if(!info.ok||!info.loops.length)return{ok:false,changed:false,reason:info.reason||'no-simple-boundary-loops',before,boundary:info,holesClosed:0};

  const candidate=mesh.clone();
  for(const loop of info.loops){candidate.faces.push([...loop]);candidate.faceGroups?.push(null);}
  candidate.edges?.();
  const after=analyzeMeshHealth(candidate);
  if(after.state!=='closed-clean'||after.boundaryEdges!==0||after.nonManifoldEdges!==0||after.inconsistentWindingEdges!==0)
    return{ok:false,changed:false,rolledBack:true,reason:'auto-close-validation-refused',before,after,boundary:info,holesClosed:0};

  cloneInto(mesh,candidate);
  return{ok:true,changed:true,reason:'simple-holes-closed',before,after,boundary:info,holesClosed:info.loops.length,facesAdded:info.loops.length};
}
