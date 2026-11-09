// Read-only, per-inspection lookup. Rebuild from current faces; never cache by mesh identity.
export function vertexFaceIncidence(mesh){
  const incident=Array.from({length:mesh.vertices.length},()=>[]);
  mesh.faces.forEach((face,fi)=>{
    if(!Array.isArray(face))return;
    // includes(vertex) counted each face once, even when a face repeats a corner.
    for(const vertex of new Set(face)){
      if(Number.isInteger(vertex)&&vertex>=0&&vertex<incident.length)incident[vertex].push(fi);
    }
  });
  return incident;
}
