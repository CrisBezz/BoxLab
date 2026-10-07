// A new bevel surface inherits a group only when all its source faces agree.
// Mixed boundaries remain ungrouped rather than borrowing an unrelated face ID.
export function sharedBevelGroup(groups,faceIndices){
  const ids=[...new Set(faceIndices||[])];
  if(!ids.length)return null;
  const group=groups[ids[0]]??null;
  return ids.every(fi=>(groups[fi]??null)===group)?group:null;
}
export function bevelSourceGroups(mesh){
  return mesh.faces.map((_,fi)=>mesh.faceGroups?.[fi]??null);
}

// Sum the whole polygon: Knife/Loop can make its first three points collinear.
export function bevelPolygonNormal(vertices,face){
  if(!face||face.length<3||!vertices[face[0]])return null;
  const origin=vertices[face[0]],normal=origin.clone().set(0,0,0);
  for(let i=1;i<face.length-1;i++){
    const a=vertices[face[i]],b=vertices[face[i+1]];
    if(!a||!b)return null;
    normal.add(a.clone().sub(origin).cross(b.clone().sub(origin)));
  }
  return normal.lengthSq()>1e-20?normal.normalize():null;
}
