import * as THREE from 'three';
import {EditableMesh} from './mesh.js';

const VERSION='0.36.18.388';

function clonePoint(v){return v?.clone?v.clone():new THREE.Vector3(v?.x||0,v?.y||0,v?.z||0);}
function axisVector(axis){
  return axis==='x'?new THREE.Vector3(1,0,0):axis==='z'?new THREE.Vector3(0,0,1):new THREE.Vector3(0,1,0);
}
function normalizeOrigin(origin){
  return origin?.clone?origin.clone():new THREE.Vector3(origin?.x||0,origin?.y||0,origin?.z||0);
}
function normalizeAxis(axis){
  const out=axis?.clone?axis.clone():new THREE.Vector3(axis?.x||0,axis?.y||1,axis?.z||0);
  return out.lengthSq()>1e-12?out.normalize():new THREE.Vector3(0,1,0);
}
function looseEdgeRecords(mesh){
  const all=mesh?.edges?.()||[];
  return all.map((edge,index)=>({...edge,index})).filter(edge=>edge?.loose===true);
}
function selectedLooseEdges(mesh,edgeIndices){
  const all=mesh?.edges?.()||[];
  return [...new Set((edgeIndices||[]).filter(Number.isInteger))].map(index=>({...all[index],index})).filter(edge=>edge?.loose===true);
}
function orderChain(edges){
  if(!edges.length)return{ok:false,reason:'Select an open loose-edge profile'};
  const adjacency=new Map();
  const add=(v,edge)=>{if(!adjacency.has(v))adjacency.set(v,[]);adjacency.get(v).push(edge);};
  for(const edge of edges){add(edge.a,edge);add(edge.b,edge);}
  if([...adjacency.values()].some(list=>list.length>2))return{ok:false,reason:'Profile branches are not supported'};
  const ends=[...adjacency.entries()].filter(([,list])=>list.length===1).map(([v])=>v);
  if(ends.length!==2)return{ok:false,reason:'Profile must be one open chain'};
  const ordered=[ends[0]],used=new Set();
  let current=ends[0],guard=0;
  while(used.size<edges.length&&guard++<edges.length+2){
    const nextEdge=(adjacency.get(current)||[]).find(edge=>!used.has(edge.index));
    if(!nextEdge)break;
    used.add(nextEdge.index);
    current=nextEdge.a===current?nextEdge.b:nextEdge.a;
    ordered.push(current);
  }
  if(used.size!==edges.length||ordered[ordered.length-1]!==ends[1])return{ok:false,reason:'Profile must be one connected open chain'};
  return{ok:true,vertices:ordered};
}
export function analyzeRevolveInput(mesh,edgeIndices,options={}){
  if(!mesh?.vertices||!mesh?.faces)return{ok:false,reason:'No editable mesh'};
  const allLoose=looseEdgeRecords(mesh),selected=selectedLooseEdges(mesh,edgeIndices);
  if(mesh.faces.length)return{ok:false,reason:'Revolve currently requires a standalone loose-edge profile'};
  if(!selected.length)return{ok:false,reason:'Select the loose profile edges'};
  if(selected.length!==allLoose.length)return{ok:false,reason:'Select the entire loose-edge profile'};
  const chain=orderChain(selected);if(!chain.ok)return chain;
  const used=new Set(chain.vertices),looseVertices=[...(mesh.looseVertices||[])].filter(Number.isInteger);
  if(looseVertices.some(v=>!used.has(v)))return{ok:false,reason:'Remove stray loose vertices before Revolve'};
  const axis=options.axis||'y';
  if(!['x','y','z'].includes(axis))return{ok:false,reason:'Choose X, Y or Z axis'};
  const origin=normalizeOrigin(options.origin),segments=Math.max(3,Math.min(128,Math.round(Number(options.segments)||24)));
  const points=chain.vertices.map(index=>clonePoint(mesh.vertices[index]));
  let scale=0;for(const p of points)scale=Math.max(scale,p.distanceTo(origin));
  const tolerance=Math.max(1e-7,scale*1e-6);
  return{ok:true,axis,origin,axisDirection:axisVector(axis),segments,vertexIndices:chain.vertices,points,tolerance};
}
function radialVector(point,origin,axis){
  const rel=point.clone().sub(origin),along=axis.clone().multiplyScalar(rel.dot(axis));
  return rel.sub(along);
}
function faceNormal(vertices,face){
  if(!face||face.length<3)return new THREE.Vector3();
  const a=vertices[face[0]];
  for(let i=1;i<face.length-1;i++){
    const b=vertices[face[i]],c=vertices[face[i+1]],n=new THREE.Vector3().crossVectors(b.clone().sub(a),c.clone().sub(a));
    if(n.lengthSq()>1e-12)return n.normalize();
  }
  return new THREE.Vector3();
}
function orientOutward(vertices,face,origin,axis){
  const center=new THREE.Vector3();face.forEach(i=>center.add(vertices[i]));center.multiplyScalar(1/face.length);
  const radial=radialVector(center,origin,axis);
  if(radial.lengthSq()<1e-12)return face;
  return faceNormal(vertices,face).dot(radial)<0?[...face].reverse():face;
}
export function buildRevolveFromPoints(points,options={}){
  const source=(points||[]).map(clonePoint);
  if(source.length<2)return{ok:false,reason:'Add at least two profile points'};
  const origin=normalizeOrigin(options.axisOrigin||options.origin),axis=normalizeAxis(options.axisDirection||options.axis||new THREE.Vector3(0,1,0));
  const segments=Math.max(3,Math.min(128,Math.round(Number(options.segments)||24)));
  let scale=0;for(const p of source)scale=Math.max(scale,p.distanceTo(origin));
  const tolerance=Math.max(1e-7,Number(options.tolerance)||scale*1e-6);
  const vertices=[],faces=[],rings=[];
  for(const point of source){
    const radial=radialVector(point,origin,axis);
    if(radial.length()<=tolerance){
      const id=vertices.length;vertices.push(point.clone());rings.push(Array(segments).fill(id));continue;
    }
    const ring=[];
    for(let s=0;s<segments;s++){
      const q=new THREE.Quaternion().setFromAxisAngle(axis,(Math.PI*2*s)/segments);
      ring.push(vertices.length);vertices.push(point.clone().sub(origin).applyQuaternion(q).add(origin));
    }
    rings.push(ring);
  }
  for(let row=0;row<rings.length-1;row++){
    const a=rings[row],b=rings[row+1];
    for(let s=0;s<segments;s++){
      const n=(s+1)%segments,ids=[a[s],a[n],b[n],b[s]],unique=[...new Set(ids)];
      if(unique.length<3)continue;
      const face=unique.length===3?unique:ids;
      faces.push(orientOutward(vertices,face,origin,axis));
    }
  }
  if(!faces.length)return{ok:false,reason:'Profile lies on the Revolve axis'};
  const result=new EditableMesh(vertices,faces);
  result.looseEdges=new Set();result.looseVertices=new Set();result.edges?.();
  return{
    ok:true,mesh:result,segments,sourceVertices:source.length,vertices:result.vertices.length,faces:result.faces.length,
    closedEnds:{start:rings[0].every(id=>id===rings[0][0]),end:rings[rings.length-1].every(id=>id===rings[rings.length-1][0])}
  };
}
export function buildRevolveMesh(mesh,edgeIndices,options={}){
  const analysis=analyzeRevolveInput(mesh,edgeIndices,options);
  if(!analysis.ok)return analysis;
  const result=buildRevolveFromPoints(analysis.points,{
    axisOrigin:analysis.origin,
    axisDirection:analysis.axisDirection,
    segments:analysis.segments,
    tolerance:analysis.tolerance
  });
  if(!result.ok)return result;
  return{...result,axis:analysis.axis};
}

export const __revolveInternals={axisVector,orderChain,radialVector,orientOutward,normalizeAxis};
globalThis.__boxlabRevolveCore={version:VERSION,analyzeRevolveInput,buildRevolveMesh,buildRevolveFromPoints};
