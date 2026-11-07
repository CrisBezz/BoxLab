import * as THREE from 'three';
// Original read-only selection calculations, shared by selection and UV fill.
const edgeKey=(a,b)=>a<b?`${a}:${b}`:`${b}:${a}`;
function facePlane(m,faceIndex){
  const face=m?.faces?.[faceIndex];
  if(!Array.isArray(face)||face.length<3)return null;
  const pts=face.map(i=>m.vertices?.[i]);
  if(pts.some(v=>!v))return null;

  // Newell normal is stable for arbitrary polygon vertex counts.
  const n=new THREE.Vector3();
  for(let i=0;i<pts.length;i++){
    const a=pts[i],b=pts[(i+1)%pts.length];
    n.x+=(a.y-b.y)*(a.z+b.z);
    n.y+=(a.z-b.z)*(a.x+b.x);
    n.z+=(a.x-b.x)*(a.y+b.y);
  }
  if(n.lengthSq()<1e-20)return null;
  n.normalize();
  const origin=pts[0].clone();
  return{normal:n,origin};
}

function scaleTolerance(m){
  const box=new THREE.Box3();
  for(const v of m?.vertices||[])if(v)box.expandByPoint(v);
  if(box.isEmpty())return 1e-7;
  const diagonal=box.getSize(new THREE.Vector3()).length();
  return Math.max(1e-7,diagonal*1e-6);
}

function samePlane(m,faceIndex,seedPlane,tolerance){
  const face=m?.faces?.[faceIndex];
  if(!Array.isArray(face)||face.length<3)return false;
  const plane=facePlane(m,faceIndex);if(!plane)return false;
  // Orientation is deliberately ignored here: this is geometric coplanarity.
  if(Math.abs(plane.normal.dot(seedPlane.normal))<0.99999)return false;
  for(const vi of face){
    const v=m.vertices?.[vi];
    if(!v||Math.abs(v.clone().sub(seedPlane.origin).dot(seedPlane.normal))>tolerance)return false;
  }
  return true;
}

function inspect(m,seedIndex){
  if(!m||!Number.isInteger(seedIndex)||!Array.isArray(m.faces?.[seedIndex]))return{indices:[],count:0,ok:false,reason:'Select one Face'};
  const seedPlane=facePlane(m,seedIndex);
  if(!seedPlane)return{indices:[],count:0,ok:false,reason:'Selected Face has invalid geometry'};
  const tolerance=scaleTolerance(m);
  const faces=m.faces||[];
  const edgeOwners=new Map();

  faces.forEach((face,fi)=>{
    if(!Array.isArray(face)||face.length<3)return;
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length];
      if(!Number.isInteger(a)||!Number.isInteger(b)||a===b)continue;
      const key=edgeKey(a,b);
      const owners=edgeOwners.get(key)||[];
      owners.push(fi);
      edgeOwners.set(key,owners);
    }
  });

  const neighbours=Array.from({length:faces.length},()=>new Set());
  for(const owners of edgeOwners.values()){
    if(owners.length<2)continue;
    for(let i=0;i<owners.length;i++)for(let j=i+1;j<owners.length;j++){
      neighbours[owners[i]]?.add(owners[j]);
      neighbours[owners[j]]?.add(owners[i]);
    }
  }

  const visited=new Set([seedIndex]);
  const queue=[seedIndex];
  while(queue.length){
    const current=queue.shift();
    for(const next of neighbours[current]||[]){
      if(visited.has(next))continue;
      if(!samePlane(m,next,seedPlane,tolerance))continue;
      visited.add(next);
      queue.push(next);
    }
  }

  const indices=[...visited].sort((a,b)=>a-b);
  return{indices,count:indices.length,ok:true,seedIndex,tolerance};
}

function key(a,b){ return a < b ? `${a}:${b}` : `${b}:${a}`; }
function realFaces(m, edge){
  return (edge?.faces || []).filter(fi => Number.isInteger(fi) && fi >= 0 && fi < m.faces.length && Array.isArray(m.faces[fi]));
}
function edgeIndexMap(m){
  const map = new Map();
  m.edges().forEach((edge,index) => map.set(key(edge.a, edge.b), index));
  return map;
}
function faceEdgeIndices(m, faceIndex, indexMap){
  const face = m.faces[faceIndex];
  if (!Array.isArray(face) || face.length !== 4) return null;
  const out = [];
  for (let i=0;i<4;i++) {
    const index = indexMap.get(key(face[i], face[(i+1)%4]));
    if (!Number.isInteger(index)) return null;
    out.push(index);
  }
  return out;
}
function oppositeEdge(m, faceIndex, incomingEdgeIndex, indexMap){
  const face = m.faces[faceIndex];
  const incoming = m.edges()[incomingEdgeIndex];
  if (!Array.isArray(face) || face.length !== 4 || !incoming) return null;
  for (let i=0;i<4;i++) {
    if (key(face[i], face[(i+1)%4]) !== key(incoming.a, incoming.b)) continue;
    const a = face[(i+2)%4], b = face[(i+3)%4];
    const index = indexMap.get(key(a,b));
    return Number.isInteger(index) ? index : null;
  }
  return null;
}
function walk(m, seedFace, firstEdge, indexMap, visited){
  const out = [];
  let currentFace = seedFace;
  let currentEdge = firstEdge;
  for (let guard=0; guard<m.faces.length+1; guard++) {
    const nextFaces = realFaces(m, m.edges()[currentEdge])
      .filter(fi => fi !== currentFace && m.faces[fi]?.length === 4);
    if (nextFaces.length !== 1) break;
    const nextFace = nextFaces[0];
    if (visited.has(nextFace)) break;
    visited.add(nextFace);
    out.push(nextFace);
    const nextEdge = oppositeEdge(m, nextFace, currentEdge, indexMap);
    if (!Number.isInteger(nextEdge)) break;
    currentFace = nextFace;
    currentEdge = nextEdge;
  }
  return out;
}
function traceStrip(m, seedFace, pairOffset){
  const indexMap = edgeIndexMap(m);
  const edges = faceEdgeIndices(m, seedFace, indexMap);
  if (!edges) return null;
  const visited = new Set([seedFace]);
  const before = walk(m, seedFace, edges[pairOffset], indexMap, visited);
  const after = walk(m, seedFace, edges[(pairOffset+2)%4], indexMap, visited);
  const indices = [...before.reverse(), seedFace, ...after];
  return indices.length > 1 ? indices : null;
}

export function selectionGraph(mesh,type){if(!mesh)return[];if(type==='vertex'){const a=mesh.vertices.map(()=>new Set());mesh.edges().forEach(e=>{a[e.a].add(e.b);a[e.b].add(e.a)});return a}if(type==='edge'){const es=mesh.edges(),a=es.map(()=>new Set()),by=mesh.vertices.map(()=>[]);es.forEach((e,i)=>{by[e.a].push(i);by[e.b].push(i)});by.forEach(list=>list.forEach(i=>list.forEach(j=>{if(i!==j)a[i].add(j)})));return a}if(type==='face'){const a=mesh.faces.map(()=>new Set()),by=new Map();mesh.edges().forEach(e=>e.faces.forEach(f=>{const k=`${e.a}:${e.b}`;const l=by.get(k)||[];l.push(f);by.set(k,l)}));by.forEach(l=>l.forEach(i=>l.forEach(j=>{if(i!==j)a[i].add(j)})));return a}return[]}
export {inspect as coplanarRegion,traceStrip,samePlane};
export function stepRegion(mesh,type,indices,direction){
 const g=selectionGraph(mesh,type),have=new Set(indices);
 if(direction==='grow'){const out=new Set(indices);for(const i of indices)g[i]?.forEach(j=>out.add(j));return [...out];}
 return indices.filter(i=>[...(g[i]||[])].every(j=>have.has(j)));
}
