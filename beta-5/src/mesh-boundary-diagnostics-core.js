import {topologySummary} from './topology-seam-conformance.js?v=0.36.18.236';

function edgeKey(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}

export function boundaryDiagnostics(mesh){
  const topo=topologySummary(mesh);
  const allEdges=mesh?.edges?.()||[];
  const indexByKey=new Map(allEdges.map((edge,index)=>[edgeKey(edge.a,edge.b),index]));
  const boundary=topo.boundary.map(item=>({...item,index:indexByKey.get(item.key)})).filter(item=>Number.isInteger(item.index));
  const nonManifold=topo.nonManifold.map(item=>({...item,index:indexByKey.get(item.key)})).filter(item=>Number.isInteger(item.index));

  const byVertex=new Map();
  for(const item of boundary){
    for(const vertex of [item.a,item.b]){
      if(!byVertex.has(vertex))byVertex.set(vertex,[]);
      byVertex.get(vertex).push(item.index);
    }
  }

  const boundarySet=new Set(boundary.map(item=>item.index));
  const visited=new Set();
  const components=[];
  for(const seed of boundarySet){
    if(visited.has(seed))continue;
    const queue=[seed],indices=[],vertices=new Set();
    visited.add(seed);
    while(queue.length){
      const index=queue.shift(),edge=allEdges[index];
      if(!edge)continue;
      indices.push(index);
      vertices.add(edge.a);vertices.add(edge.b);
      for(const vertex of [edge.a,edge.b]){
        for(const next of byVertex.get(vertex)||[]){
          if(!visited.has(next)){visited.add(next);queue.push(next);}
        }
      }
    }
    const degrees=[...vertices].map(vertex=>(byVertex.get(vertex)||[]).filter(index=>indices.includes(index)).length);
    const degree1=degrees.filter(x=>x===1).length;
    const branched=degrees.some(x=>x>2);
    let type='other';
    if(branched)type='branched';
    else if(degree1===0&&degrees.every(x=>x===2))type='loop';
    else if(degree1===2&&degrees.every(x=>x===1||x===2))type='chain';
    components.push({
      type,
      edgeIndices:[...indices].sort((a,b)=>a-b),
      vertexCount:vertices.size,
      edgeCount:indices.length
    });
  }

  return {
    boundaryEdges:boundary.length,
    nonManifoldEdges:nonManifold.length,
    boundaryEdgeIndices:boundary.map(item=>item.index).sort((a,b)=>a-b),
    nonManifoldEdgeIndices:nonManifold.map(item=>item.index).sort((a,b)=>a-b),
    components,
    loops:components.filter(c=>c.type==='loop').length,
    chains:components.filter(c=>c.type==='chain').length,
    branched:components.filter(c=>c.type==='branched').length,
    other:components.filter(c=>c.type==='other').length
  };
}
