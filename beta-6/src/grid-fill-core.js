import * as THREE from 'three';

const TURN_EPS=Math.PI/36; // 5 degrees
const AREA_EPS=1e-16;

function edgeKey(mesh,a,b){return mesh?.edgeKey?.(a,b)||(a<b?`${a}:${b}`:`${b}:${a}`);}
function realOwners(mesh,edge){return(edge?.faces||[]).filter(fi=>Number.isInteger(fi)&&fi>=0&&fi<(mesh?.faces?.length||0)&&Array.isArray(mesh.faces[fi]));}
function directedEdge(face,a,b){
  for(let i=0;i<(face?.length||0);i++){
    const x=face[i],y=face[(i+1)%face.length];
    if(x===a&&y===b)return 1;
    if(x===b&&y===a)return-1;
  }
  return 0;
}
function sameFaceLoop(face,cycle){
  if(!Array.isArray(face)||face.length!==cycle.length)return false;
  const n=cycle.length;
  for(let start=0;start<n;start++){
    if(face[start]!==cycle[0])continue;
    let forward=true,reverse=true;
    for(let i=0;i<n;i++){
      if(face[(start+i)%n]!==cycle[i])forward=false;
      if(face[(start-i+n*4)%n]!==cycle[i])reverse=false;
    }
    if(forward||reverse)return true;
  }
  return false;
}
function cycleFromEdges(edges){
  const adjacency=new Map();
  for(const e of edges){
    if(!adjacency.has(e.a))adjacency.set(e.a,[]);
    if(!adjacency.has(e.b))adjacency.set(e.b,[]);
    adjacency.get(e.a).push(e.b);adjacency.get(e.b).push(e.a);
  }
  if(adjacency.size!==edges.length||[...adjacency.values()].some(list=>list.length!==2))return null;
  const start=Math.min(...adjacency.keys()),cycle=[start];
  let previous=null,current=start;
  for(let guard=0;guard<edges.length;guard++){
    const choices=(adjacency.get(current)||[]).filter(v=>v!==previous).sort((a,b)=>a-b);
    const next=choices.find(v=>v===start||!cycle.includes(v));
    if(next===undefined)return null;
    if(next===start)return cycle.length===edges.length?cycle:null;
    cycle.push(next);previous=current;current=next;
  }
  return null;
}
function orientAgainstNeighbour(mesh,cycle,picked){
  for(const edge of picked){
    const owner=realOwners(mesh,edge)[0];
    if(!Number.isInteger(owner))continue;
    const neighbour=mesh.faces[owner],dir=directedEdge(neighbour,edge.a,edge.b);
    if(!dir)continue;
    let cycleDir=0;
    for(let i=0;i<cycle.length;i++){
      const a=cycle[i],b=cycle[(i+1)%cycle.length];
      if(a===edge.a&&b===edge.b){cycleDir=1;break;}
      if(a===edge.b&&b===edge.a){cycleDir=-1;break;}
    }
    if(cycleDir===dir)return[cycle[0],...[...cycle.slice(1)].reverse()];
    return cycle;
  }
  return cycle;
}
function planeInfo(mesh,cycle){
  const pts=cycle.map(i=>mesh.vertices?.[i]);
  if(pts.some(p=>!p))return null;
  const normal=new THREE.Vector3();
  for(let i=0;i<pts.length;i++){
    const a=pts[i],b=pts[(i+1)%pts.length];
    normal.x+=(a.y-b.y)*(a.z+b.z);
    normal.y+=(a.z-b.z)*(a.x+b.x);
    normal.z+=(a.x-b.x)*(a.y+b.y);
  }
  if(normal.lengthSq()<1e-20)return null;
  normal.normalize();
  const origin=pts[0],box=new THREE.Box3();
  pts.forEach(p=>box.expandByPoint(p));
  const scale=Math.max(box.getSize(new THREE.Vector3()).length(),1);
  const tolerance=Math.max(1e-7,scale*1e-5);
  const deviation=Math.max(...pts.map(p=>Math.abs(p.clone().sub(origin).dot(normal))));
  return{pts,normal,origin,scale,tolerance,deviation,planar:deviation<=tolerance};
}
function cornerIndices(mesh,cycle){
  const corners=[],n=cycle.length;
  for(let i=0;i<n;i++){
    const prev=mesh.vertices[cycle[(i-1+n)%n]],cur=mesh.vertices[cycle[i]],next=mesh.vertices[cycle[(i+1)%n]];
    const incoming=cur.clone().sub(prev),outgoing=next.clone().sub(cur);
    const la=incoming.length(),lb=outgoing.length();
    if(la<1e-9||lb<1e-9)return null;
    const cross=incoming.clone().cross(outgoing).length()/(la*lb);
    const dot=THREE.MathUtils.clamp(incoming.dot(outgoing)/(la*lb),-1,1);
    const turn=Math.atan2(cross,dot);
    if(turn>TURN_EPS)corners.push(i);
  }
  return corners;
}
function projectPoint(p,normal){
  const ax=Math.abs(normal.x),ay=Math.abs(normal.y),az=Math.abs(normal.z);
  if(ax>=ay&&ax>=az)return{x:p.y,y:p.z};
  if(ay>=az)return{x:p.x,y:p.z};
  return{x:p.x,y:p.y};
}
function convexCorners(mesh,cycle,corners,normal){
  let sign=0;
  for(let i=0;i<4;i++){
    const a=projectPoint(mesh.vertices[cycle[corners[(i+3)%4]]],normal);
    const b=projectPoint(mesh.vertices[cycle[corners[i]]],normal);
    const c=projectPoint(mesh.vertices[cycle[corners[(i+1)%4]]],normal);
    const cross=(b.x-a.x)*(c.y-b.y)-(b.y-a.y)*(c.x-b.x);
    if(Math.abs(cross)<1e-12)return false;
    const s=Math.sign(cross);if(!sign)sign=s;else if(s!==sign)return false;
  }
  return true;
}
function rotateCycle(cycle,start){return[...cycle.slice(start),...cycle.slice(0,start)];}
function sidesFromCycle(cycle,corners){
  const [a,b,c,d]=corners,n=cycle.length;
  return[
    cycle.slice(a,b+1),
    cycle.slice(b,c+1),
    cycle.slice(c,d+1),
    [...cycle.slice(d),cycle[a]]
  ];
}

export function gridFillPlan(mesh,edgeIndices=[]){
  if(!mesh||!Array.isArray(mesh.vertices)||!Array.isArray(mesh.faces))return{ok:false,reason:'No editable mesh'};
  const ids=[...new Set(edgeIndices||[])].filter(Number.isInteger);
  if(ids.length<6)return{ok:false,reason:'Grid Fill needs a closed boundary with at least 6 edges'};
  const all=mesh.edges?.()||[],picked=ids.map(i=>all[i]);
  if(picked.some(e=>!e))return{ok:false,reason:'Selection contains an invalid Edge'};
  if(picked.some(e=>realOwners(mesh,e).length>1))return{ok:false,reason:'Grid Fill requires boundary or loose Edges'};
  let cycle=cycleFromEdges(picked);
  if(!cycle)return{ok:false,reason:'Select one simple closed Edge boundary'};
  if(mesh.faces.some(face=>sameFaceLoop(face,cycle)))return{ok:false,reason:'Boundary is already capped • use an open hole'};
  cycle=orientAgainstNeighbour(mesh,cycle,picked);

  let plane=planeInfo(mesh,cycle);
  if(!plane?.planar)return{ok:false,reason:'Grid Fill currently requires a planar boundary'};
  let corners=cornerIndices(mesh,cycle);
  if(!corners||corners.length!==4)return{ok:false,reason:'Grid Fill needs exactly four straight sides'};
  if(!convexCorners(mesh,cycle,corners,plane.normal))return{ok:false,reason:'Grid Fill currently requires a convex four-sided boundary'};

  cycle=rotateCycle(cycle,corners[0]);
  plane=planeInfo(mesh,cycle);
  corners=cornerIndices(mesh,cycle);
  if(!corners||corners.length!==4||corners[0]!==0)return{ok:false,reason:'Could not stabilize Grid Fill corners'};
  const sides=sidesFromCycle(cycle,corners),segments=sides.map(side=>side.length-1);
  if(segments[0]!==segments[2]||segments[1]!==segments[3])return{ok:false,reason:'Opposite Grid Fill sides need matching segment counts'};
  if(segments[0]===1&&segments[1]===1)return{ok:false,reason:'Use Fill for a simple 4-edge cap'};
  const [uSegments,vSegments]=segments;
  if(uSegments<1||vSegments<1)return{ok:false,reason:'Grid Fill side segmentation is invalid'};
  if(uSegments*vSegments>256)return{ok:false,reason:'Grid Fill patch is too large for this build'};

  return{ok:true,ids,cycle,sides,segments,uSegments,vSegments,plane,edgePairs:picked.map(e=>[e.a,e.b])};
}

function coonsPoint(mesh,top,bottom,left,right,i,j,uSegments,vSegments){
  const u=i/uSegments,v=j/vSegments;
  const T=mesh.vertices[top[i]],B=mesh.vertices[bottom[i]],L=mesh.vertices[left[j]],R=mesh.vertices[right[j]];
  const c00=mesh.vertices[top[0]],c10=mesh.vertices[top[uSegments]],c01=mesh.vertices[bottom[0]],c11=mesh.vertices[bottom[uSegments]];
  const p=T.clone().multiplyScalar(1-v)
    .add(B.clone().multiplyScalar(v))
    .add(L.clone().multiplyScalar(1-u))
    .add(R.clone().multiplyScalar(u));
  const bilinear=c00.clone().multiplyScalar((1-u)*(1-v))
    .add(c10.clone().multiplyScalar(u*(1-v)))
    .add(c01.clone().multiplyScalar((1-u)*v))
    .add(c11.clone().multiplyScalar(u*v));
  return p.sub(bilinear);
}
function validQuad(mesh,face){
  if(new Set(face).size!==4)return false;
  const p=face.map(i=>mesh.vertices?.[i]);if(p.some(v=>!v))return false;
  const n1=p[1].clone().sub(p[0]).cross(p[2].clone().sub(p[0]));
  const n2=p[2].clone().sub(p[0]).cross(p[3].clone().sub(p[0]));
  if(n1.lengthSq()<AREA_EPS||n2.lengthSq()<AREA_EPS)return false;
  return n1.dot(n2)>0;
}

export function applyGridFill(mesh,plan){
  if(!mesh||!plan?.ok)return null;
  const U=plan.uSegments,V=plan.vSegments;
  const top=[...plan.sides[0]],right=[...plan.sides[1]],bottom=[...plan.sides[2]].reverse(),left=[...plan.sides[3]].reverse();
  if(top.length!==U+1||bottom.length!==U+1||left.length!==V+1||right.length!==V+1)return null;

  const grid=Array.from({length:V+1},()=>Array(U+1).fill(null));
  for(let i=0;i<=U;i++){grid[0][i]=top[i];grid[V][i]=bottom[i];}
  for(let j=0;j<=V;j++){grid[j][0]=left[j];grid[j][U]=right[j];}

  const vertexIndices=[];
  for(let j=1;j<V;j++)for(let i=1;i<U;i++){
    const id=mesh.vertices.length;
    mesh.vertices.push(coonsPoint(mesh,top,bottom,left,right,i,j,U,V));
    grid[j][i]=id;vertexIndices.push(id);
  }

  const faces=[];
  for(let j=0;j<V;j++)for(let i=0;i<U;i++){
    const face=[grid[j][i],grid[j][i+1],grid[j+1][i+1],grid[j+1][i]];
    if(!validQuad(mesh,face))return null;
    faces.push(face);
  }
  const start=mesh.faces.length;
  mesh.faces.push(...faces.map(face=>[...face]));
  if(mesh.looseEdges instanceof Set)for(const [a,b] of plan.edgePairs)mesh.looseEdges.delete(edgeKey(mesh,a,b));
  if(mesh.looseVertices instanceof Set)for(const vi of plan.cycle)mesh.looseVertices.delete(vi);
  mesh.edges?.();
  return{faceIndices:Array.from({length:faces.length},(_,i)=>start+i),vertexIndices,quads:faces.length,uSegments:U,vSegments:V};
}
