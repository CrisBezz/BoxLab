export function componentVertexIndices(mesh,mode,indices=[]){
  if(!mesh||!Array.isArray(mesh.vertices))return[];
  const ids=[...new Set(indices||[])].filter(Number.isInteger);
  const out=new Set();
  if(mode==='vertex'){
    ids.forEach(i=>{if(mesh.vertices[i])out.add(i);});
  }else if(mode==='edge'){
    const edges=mesh.edges?.()||[];
    ids.forEach(i=>{const e=edges[i];if(e){if(mesh.vertices[e.a])out.add(e.a);if(mesh.vertices[e.b])out.add(e.b);}});
  }else if(mode==='face'){
    ids.forEach(i=>(mesh.faces?.[i]||[]).forEach(v=>{if(mesh.vertices[v])out.add(v);}));
  }
  return[...out];
}

export function componentAxisTarget(mesh,vertexIndices,axis){
  if(!mesh||!['x','y','z'].includes(axis)||!vertexIndices?.length)return null;
  const values=vertexIndices.map(i=>mesh.vertices?.[i]?.[axis]).filter(Number.isFinite);
  if(values.length!==vertexIndices.length||!values.length)return null;
  return values.reduce((a,b)=>a+b,0)/values.length;
}

export function alignComponentAxis(mesh,vertexIndices,axis){
  const target=componentAxisTarget(mesh,vertexIndices,axis);
  if(target===null)return null;
  for(const i of vertexIndices)mesh.vertices[i][axis]=target;
  mesh.edges?.();
  return{axis,target,count:vertexIndices.length};
}
