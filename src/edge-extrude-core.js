import * as THREE from 'three';

// BoxLab v0.36.18.423 — topology core for direct boundary Edge Extrude.

function unique(values){return[...new Set(values)];}
function realFaces(mesh,edge){
  return(edge?.faces||[]).filter(fi=>Number.isInteger(fi)&&fi>=0&&fi<mesh.faces.length&&Array.isArray(mesh.faces[fi])&&mesh.faces[fi].length>=3);
}
export function boundarySelectionInfo(mesh,ids=[]){
  if(!mesh||!ids.length)return null;
  const edges=mesh.edges(),infos=[];
  for(const index of ids){
    const edge=edges[index];
    if(!edge)return null;
    const faces=realFaces(mesh,edge);
    if(!(edge.loose===true||faces.length===1))return null;
    infos.push({index,a:edge.a,b:edge.b,loose:edge.loose===true,faceIndex:faces[0]??null});
  }
  const degree=new Map();
  for(const info of infos){
    degree.set(info.a,(degree.get(info.a)||0)+1);
    degree.set(info.b,(degree.get(info.b)||0)+1);
  }
  if([...degree.values()].some(v=>v>2))return null;
  return{ids:[...ids],infos};
}
function faceTraverses(mesh,faceIndex,a,b){
  const face=mesh.faces[faceIndex];if(!face)return null;
  for(let i=0;i<face.length;i++){
    const x=face[i],y=face[(i+1)%face.length];
    if(x===a&&y===b)return true;
    if(x===b&&y===a)return false;
  }
  return null;
}
export function extrudeBoundaryEdges(target,source,info,delta){
  if(!target||!source||!info?.infos?.length||!delta)return null;
  const duplicate=new Map(),sourceVertexIds=unique(info.infos.flatMap(edge=>[edge.a,edge.b]));
  for(const oldIndex of sourceVertexIds){
    if(!source.vertices[oldIndex])return null;
    const next=target.vertices.length;
    target.vertices.push(source.vertices[oldIndex].clone().add(delta));
    duplicate.set(oldIndex,next);
  }
  for(const edgeInfo of info.infos){
    const a=edgeInfo.a,b=edgeInfo.b,na=duplicate.get(a),nb=duplicate.get(b);
    if(!Number.isInteger(na)||!Number.isInteger(nb))return null;
    let face;
    if(edgeInfo.loose){
      face=[a,b,nb,na];
      target.looseEdges?.delete?.(target.edgeKey(a,b));
    }else{
      const forward=faceTraverses(source,edgeInfo.faceIndex,a,b);
      if(forward===null)return null;
      face=forward?[b,a,na,nb]:[a,b,nb,na];
    }
    target.faces.push(face);
  }
  if(target.looseVertices instanceof Set){
    for(const oldIndex of sourceVertexIds)target.looseVertices.delete(oldIndex);
    for(const next of duplicate.values())target.looseVertices.delete(next);
  }
  target.edges?.();
  const outerKeys=info.infos.map(edge=>target.edgeKey(duplicate.get(edge.a),duplicate.get(edge.b)));
  const edgeMap=new Map(target.edges().map((edge,index)=>[target.edgeKey(edge.a,edge.b),index]));
  const outer=outerKeys.map(key=>edgeMap.get(key)).filter(Number.isInteger);
  if(outer.length!==info.infos.length)return null;
  return{outer,outerKeys,vertices:[...duplicate.values()]};
}


export function perpendicularAxisDirection(edgeVector,axisVector,epsilon=1e-6){
  const edge=edgeVector?.clone?.()||new THREE.Vector3(...(edgeVector||[0,0,0]));
  const axis=axisVector?.clone?.()||new THREE.Vector3(...(axisVector||[0,0,0]));
  if(edge.lengthSq()<=epsilon*epsilon||axis.lengthSq()<=epsilon*epsilon)return null;
  edge.normalize();axis.normalize();
  const projected=axis.addScaledVector(edge,-axis.dot(edge));
  if(projected.lengthSq()<=epsilon*epsilon)return null;
  return projected.normalize();
}
