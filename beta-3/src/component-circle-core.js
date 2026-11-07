import * as THREE from 'three';

function uniqueInts(values=[]){return[...new Set(values)].filter(Number.isInteger);}

export function circleLoopInfo(mesh,mode,indices=[]){
  if(!mesh||!['vertex','edge','face'].includes(mode))return{ok:false,reason:'Circle works on Vertex, Edge or one Face selection'};
  const edges=mesh.edges?.()||[];
  const selectedIds=uniqueInts(indices);

  if(mode==='face'){
    if(selectedIds.length!==1)return{ok:false,reason:'Select exactly one Face to circle its boundary'};
    const face=mesh.faces?.[selectedIds[0]];
    if(!Array.isArray(face)||face.length<3)return{ok:false,reason:'Selected Face has no valid boundary'};
    const ordered=[...face];
    const points=ordered.map(i=>mesh.vertices?.[i]);
    if(points.some(v=>!v))return{ok:false,reason:'Selected Face contains invalid vertices'};
    return circleInfoFromOrdered(points,ordered);
  }

  if(selectedIds.length<3)return{ok:false,reason:'Select a closed loop with at least three components'};

  let loopEdges=[];
  if(mode==='edge'){
    loopEdges=selectedIds.map(i=>edges[i]).filter(Boolean);
    if(loopEdges.length!==selectedIds.length)return{ok:false,reason:'Selected Edge loop contains invalid edges'};
  }else{
    const vertices=new Set(selectedIds);
    loopEdges=edges.filter(e=>vertices.has(e.a)&&vertices.has(e.b));
  }

  if(loopEdges.length<3)return{ok:false,reason:'Selection does not form a closed loop'};
  const adjacency=new Map();
  for(const e of loopEdges){
    if(!adjacency.has(e.a))adjacency.set(e.a,new Set());
    if(!adjacency.has(e.b))adjacency.set(e.b,new Set());
    adjacency.get(e.a).add(e.b);adjacency.get(e.b).add(e.a);
  }
  const vertexIds=[...adjacency.keys()];
  if(mode==='vertex'&&vertexIds.length!==selectedIds.length)return{ok:false,reason:'All selected vertices must belong to one closed loop'};
  if(vertexIds.length<3||[...adjacency.values()].some(n=>n.size!==2))return{ok:false,reason:'Selection must be one simple closed loop'};

  const start=[...vertexIds].sort((a,b)=>a-b)[0];
  const ordered=[start];
  let prev=null,current=start;
  for(let guard=0;guard<vertexIds.length+1;guard++){
    const nexts=[...adjacency.get(current)].filter(v=>v!==prev).sort((a,b)=>a-b);
    const next=nexts.find(v=>v===start||!ordered.includes(v));
    if(next===undefined)return{ok:false,reason:'Selection loop is ambiguous'};
    if(next===start)break;
    ordered.push(next);prev=current;current=next;
  }
  if(ordered.length!==vertexIds.length)return{ok:false,reason:'Selection contains more than one loop or branch'};

  const points=ordered.map(i=>mesh.vertices?.[i]);
  if(points.some(v=>!v))return{ok:false,reason:'Selection contains invalid vertices'};
  return circleInfoFromOrdered(points,ordered);
}

function circleInfoFromOrdered(points,ordered){
  const center=new THREE.Vector3();
  points.forEach(p=>center.add(p));
  center.multiplyScalar(1/points.length);

  const normal=new THREE.Vector3();
  for(let i=0;i<points.length;i++){
    const a=points[i],b=points[(i+1)%points.length];
    normal.x+=(a.y-b.y)*(a.z+b.z);
    normal.y+=(a.z-b.z)*(a.x+b.x);
    normal.z+=(a.x-b.x)*(a.y+b.y);
  }
  if(normal.lengthSq()<1e-12)return{ok:false,reason:'Selected loop has no stable working plane'};
  normal.normalize();

  let u=points[0].clone().sub(center);
  u.addScaledVector(normal,-u.dot(normal));
  if(u.lengthSq()<1e-12){
    const fallback=Math.abs(normal.x)<.8?new THREE.Vector3(1,0,0):new THREE.Vector3(0,1,0);
    u=fallback.addScaledVector(normal,-fallback.dot(normal));
  }
  u.normalize();
  const v=new THREE.Vector3().crossVectors(normal,u).normalize();
  const radii=points.map(p=>{
    const d=p.clone().sub(center);
    d.addScaledVector(normal,-d.dot(normal));
    return d.length();
  });
  const radius=radii.reduce((a,b)=>a+b,0)/radii.length;
  if(!Number.isFinite(radius)||radius<1e-7)return{ok:false,reason:'Selected loop radius is too small'};

  return{ok:true,ordered:[...ordered],center,normal,u,v,radius};
}

export function circularizeLoop(mesh,info){
  if(!mesh||!info?.ok||!info.ordered?.length)return null;
  const n=info.ordered.length;
  for(let i=0;i<n;i++){
    const angle=2*Math.PI*i/n;
    const target=info.center.clone()
      .addScaledVector(info.u,Math.cos(angle)*info.radius)
      .addScaledVector(info.v,Math.sin(angle)*info.radius);
    mesh.vertices[info.ordered[i]].copy(target);
  }
  mesh.edges?.();
  return{count:n,radius:info.radius,center:info.center.clone(),normal:info.normal.clone()};
}
