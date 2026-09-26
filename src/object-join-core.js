// BoxLab v0.36.18.277 — pure helpers for joining separate editable objects into one mesh.

function parseEdgeKey(key){
  const [a,b]=String(key).split(':').map(Number);
  return Number.isInteger(a)&&Number.isInteger(b)?{a,b}:null;
}

export function modifierSettingsCompatible(objects=[]){
  if(objects.length<2)return true;
  const sig=o=>JSON.stringify({
    mirror:{x:!!o?.settings?.mirror?.x,y:!!o?.settings?.mirror?.y,z:!!o?.settings?.mirror?.z},
    subd:!!o?.settings?.subd,
    subdLevel:Number(o?.settings?.subdLevel||1)
  });
  const first=sig(objects[0]);
  return objects.every(o=>sig(o)===first);
}

export function combineEditableMeshes(meshes=[]){
  const valid=meshes.filter(Boolean);
  if(valid.length<2)return null;
  const out=valid[0].clone();
  if(!(out.creases instanceof Map))out.creases=new Map(out.creases||[]);
  out.faceGroups=out.faces.map((_,fi)=>out.faceGroups?.[fi]??null);
  if(!(out.looseEdges instanceof Set))out.looseEdges=new Set(out.looseEdges||[]);
  if(!(out.looseVertices instanceof Set))out.looseVertices=new Set(out.looseVertices||[]);
  for(let mi=1;mi<valid.length;mi++){
    const src=valid[mi],offset=out.vertices.length;
    out.vertices.push(...src.vertices.map(v=>v.clone?v.clone():v));
    src.faces.forEach((face,fi)=>{
      if(!Array.isArray(face)||face.length<3)return;
      out.faces.push(face.map(i=>i+offset));
      out.faceGroups.push(src.faceGroups?.[fi]??null);
    });
    if(src.creases instanceof Map)for(const [key,value] of src.creases){
      const e=parseEdgeKey(key);if(!e)continue;
      out.creases.set(out.edgeKey(e.a+offset,e.b+offset),value);
    }
    if(src.looseEdges instanceof Set)for(const key of src.looseEdges){
      const e=parseEdgeKey(key);if(!e)continue;
      out.looseEdges.add(out.edgeKey(e.a+offset,e.b+offset));
    }
    if(src.looseVertices instanceof Set)for(const i of src.looseVertices)if(Number.isInteger(i))out.looseVertices.add(i+offset);
  }
  out.edges?.();
  return out;
}
