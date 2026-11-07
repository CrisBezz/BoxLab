// BoxLab v0.36.18.232 — conservative planar-region + collinear-boundary + orphan + coincident-vertex post-Boolean cleanup.
// The proven Boolean solver remains untouched. This module only decorates the next
// Boolean result passed to ObjectManager.addMesh, validates it, and falls back to
// the original result whenever cleanup is not demonstrably safe.
const VERSION='0.36.18.232';
const WELD_TOLERANCE=1e-6;
let pending=false,installed=false;
let last={applied:false,merges:0,collinearRemoved:0,orphanRemoved:0,coincidentWelded:0,facesReduced:0,reason:'Not run'};

function edgeKey(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}
function sub(a,b){return{x:a.x-b.x,y:a.y-b.y,z:a.z-b.z};}
function cross(a,b){return{x:a.y*b.z-a.z*b.y,y:a.z*b.x-a.x*b.z,z:a.x*b.y-a.y*b.x};}
function dot(a,b){return a.x*b.x+a.y*b.y+a.z*b.z;}
function length(v){return Math.hypot(v.x,v.y,v.z);}
function distance(a,b){return Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z);}
function newell(mesh,face){
  if(!mesh||!Array.isArray(face)||face.length<3)return null;
  let x=0,y=0,z=0;
  for(let i=0;i<face.length;i++){
    const a=mesh.vertices?.[face[i]],b=mesh.vertices?.[face[(i+1)%face.length]];
    if(!a||!b)return null;
    x+=(a.y-b.y)*(a.z+b.z);y+=(a.z-b.z)*(a.x+b.x);z+=(a.x-b.x)*(a.y+b.y);
  }
  const l=Math.hypot(x,y,z);return l>1e-12?{x:x/l,y:y/l,z:z/l}:null;
}
function scaleOf(mesh){
  if(!mesh?.vertices?.length)return 1;
  let minX=Infinity,minY=Infinity,minZ=Infinity,maxX=-Infinity,maxY=-Infinity,maxZ=-Infinity;
  for(const p of mesh.vertices){minX=Math.min(minX,p.x);minY=Math.min(minY,p.y);minZ=Math.min(minZ,p.z);maxX=Math.max(maxX,p.x);maxY=Math.max(maxY,p.y);maxZ=Math.max(maxZ,p.z);}
  return Math.max(1,Math.hypot(maxX-minX,maxY-minY,maxZ-minZ));
}
function directedSharedEdge(faceA,faceB){
  const shared=[];
  for(let i=0;i<faceA.length;i++){
    const a=faceA[i],b=faceA[(i+1)%faceA.length],key=edgeKey(a,b);
    for(let j=0;j<faceB.length;j++){
      const c=faceB[j],d=faceB[(j+1)%faceB.length];
      if(edgeKey(c,d)===key)shared.push({a,b,c,d,key});
    }
  }
  if(shared.length!==1)return null;
  const s=shared[0];
  return s.a===s.d&&s.b===s.c?s:null;
}
function mergedCycle(faceA,faceB,shared){
  const edges=[];
  for(const face of [faceA,faceB])for(let i=0;i<face.length;i++){
    const a=face[i],b=face[(i+1)%face.length];
    if(edgeKey(a,b)!==shared.key)edges.push([a,b]);
  }
  if(edges.length<3)return null;
  const outgoing=new Map(),incoming=new Map();
  for(let i=0;i<edges.length;i++){
    const [a,b]=edges[i];
    if(outgoing.has(a)||incoming.has(b))return null;
    outgoing.set(a,{b,i});incoming.set(b,{a,i});
  }
  const start=edges[0][0],cycle=[start],used=new Set();let current=start;
  for(let step=0;step<edges.length;step++){
    const next=outgoing.get(current);if(!next||used.has(next.i))return null;
    used.add(next.i);current=next.b;
    if(step<edges.length-1)cycle.push(current);
  }
  if(current!==start||used.size!==edges.length||new Set(cycle).size!==cycle.length)return null;
  return cycle;
}
function coplanarAndConvex(mesh,cycle,nRef,eps){
  if(!cycle||cycle.length<3)return false;
  const pts=cycle.map(i=>mesh.vertices?.[i]);if(pts.some(p=>!p))return false;
  const origin=pts[0];
  for(const p of pts)if(Math.abs(dot(sub(p,origin),nRef))>eps)return false;
  let sign=0,turns=0;
  for(let i=0;i<pts.length;i++){
    const a=pts[i],b=pts[(i+1)%pts.length],c=pts[(i+2)%pts.length];
    const s=dot(cross(sub(b,a),sub(c,b)),nRef);
    if(Math.abs(s)<=eps*eps)continue;
    const now=Math.sign(s);turns++;
    if(!sign)sign=now;else if(now!==sign)return false;
  }
  if(turns<3)return false;
  const n=newell(mesh,cycle);return !!n&&dot(n,nRef)>0.999999;
}
function edgeFaces(mesh){
  const map=new Map();
  for(let fi=0;fi<mesh.faces.length;fi++){
    const face=mesh.faces[fi];
    for(let i=0;i<face.length;i++){
      const key=edgeKey(face[i],face[(i+1)%face.length]);
      if(!map.has(key))map.set(key,[]);map.get(key).push(fi);
    }
  }
  return map;
}
function mergeOne(mesh){
  const eps=scaleOf(mesh)*1e-8,uses=edgeFaces(mesh);
  for(const indices of uses.values()){
    if(indices.length!==2)continue;
    const [a,b]=indices,faceA=mesh.faces[a],faceB=mesh.faces[b];
    const nA=newell(mesh,faceA),nB=newell(mesh,faceB);
    if(!nA||!nB||dot(nA,nB)<0.999999)continue;
    const shared=directedSharedEdge(faceA,faceB);if(!shared)continue;
    const cycle=mergedCycle(faceA,faceB,shared);if(!cycle||!coplanarAndConvex(mesh,cycle,nA,eps))continue;
    const keep=Math.min(a,b),drop=Math.max(a,b),next=[];
    for(let i=0;i<mesh.faces.length;i++){
      if(i===drop)continue;
      next.push(i===keep?[...cycle]:[...mesh.faces[i]]);
    }
    mesh.faces=next;return true;
  }
  return false;
}
function planarCleanup(mesh,maxMerges=1000){
  let merges=0;
  while(merges<maxMerges&&mergeOne(mesh))merges++;
  return merges;
}
function betweenCollinear(a,b,c,eps){
  const ac=sub(c,a),ab=sub(b,a),acLen=length(ac);
  if(acLen<=eps)return false;
  const separation=length(cross(ab,ac))/acLen;
  if(separation>eps)return false;
  const t=dot(ab,ac)/(acLen*acLen);
  return t>eps&&t<1-eps;
}
function incidentFaces(mesh,vertex){
  const hits=[];
  for(let fi=0;fi<mesh.faces.length;fi++)if(mesh.faces[fi].includes(vertex))hits.push(fi);
  return hits;
}
function neighboursAround(face,vertex){
  const i=face.indexOf(vertex);if(i<0||face.length<4)return null;
  return {prev:face[(i-1+face.length)%face.length],next:face[(i+1)%face.length],index:i};
}
function removeCollinearOne(mesh){
  const eps=scaleOf(mesh)*1e-8;
  for(let v=0;v<mesh.vertices.length;v++){
    const incident=incidentFaces(mesh,v);
    if(incident.length!==2)continue;
    const [fa,fb]=incident,faceA=mesh.faces[fa],faceB=mesh.faces[fb];
    const a=neighboursAround(faceA,v),b=neighboursAround(faceB,v);
    if(!a||!b)continue;
    if(edgeKey(a.prev,a.next)!==edgeKey(b.prev,b.next))continue;
    const pPrev=mesh.vertices[a.prev],p=mesh.vertices[v],pNext=mesh.vertices[a.next];
    if(!pPrev||!p||!pNext||!betweenCollinear(pPrev,p,pNext,eps))continue;
    const nextA=faceA.filter(index=>index!==v),nextB=faceB.filter(index=>index!==v);
    if(nextA.length<3||nextB.length<3||new Set(nextA).size!==nextA.length||new Set(nextB).size!==nextB.length)continue;
    const nA0=newell(mesh,faceA),nB0=newell(mesh,faceB),nA1=newell(mesh,nextA),nB1=newell(mesh,nextB);
    if(!nA0||!nB0||!nA1||!nB1||dot(nA0,nA1)<0.999999||dot(nB0,nB1)<0.999999)continue;
    mesh.faces[fa]=nextA;mesh.faces[fb]=nextB;return true;
  }
  return false;
}
function collinearCleanup(mesh,maxRemovals=1000){
  let removed=0;
  while(removed<maxRemovals&&removeCollinearOne(mesh))removed++;
  return removed;
}
function compactUnusedVertices(mesh){
  if(!Array.isArray(mesh?.vertices)||!Array.isArray(mesh?.faces))return 0;
  const usedSet=new Set();
  for(const face of mesh.faces)for(const index of face)usedSet.add(index);
  if(usedSet.size===mesh.vertices.length)return 0;
  const used=[...usedSet].sort((a,b)=>a-b);
  if(!used.length)return 0;
  const remap=new Map(used.map((oldIndex,newIndex)=>[oldIndex,newIndex]));
  const nextVertices=used.map(index=>mesh.vertices[index]?.clone?.()||mesh.vertices[index]);
  const nextFaces=mesh.faces.map(face=>face.map(index=>remap.get(index)));
  const nextCreases=new Map();
  if(mesh.creases instanceof Map){
    for(const [key,strength] of mesh.creases){
      const [aText,bText]=String(key).split(':'),a=Number(aText),b=Number(bText);
      if(!remap.has(a)||!remap.has(b))continue;
      nextCreases.set(edgeKey(remap.get(a),remap.get(b)),strength);
    }
  }
  const removed=mesh.vertices.length-nextVertices.length;
  mesh.vertices=nextVertices;mesh.faces=nextFaces;
  if(mesh.creases instanceof Map)mesh.creases=nextCreases;
  return removed;
}
function weldCoincidentVertices(mesh,tolerance=WELD_TOLERANCE){
  if(!Array.isArray(mesh?.vertices)||!mesh.vertices.length||!Array.isArray(mesh?.faces))return 0;
  const inv=1/tolerance,buckets=new Map(),representative=new Array(mesh.vertices.length);
  const bucketKey=(p,dx=0,dy=0,dz=0)=>`${Math.floor(p.x*inv)+dx}:${Math.floor(p.y*inv)+dy}:${Math.floor(p.z*inv)+dz}`;
  let welded=0;
  for(let i=0;i<mesh.vertices.length;i++){
    const p=mesh.vertices[i];let rep=-1;
    for(let dx=-1;dx<=1&&rep<0;dx++)for(let dy=-1;dy<=1&&rep<0;dy++)for(let dz=-1;dz<=1&&rep<0;dz++){
      const candidates=buckets.get(bucketKey(p,dx,dy,dz));if(!candidates)continue;
      for(const candidate of candidates){if(distance(p,mesh.vertices[candidate])<=tolerance){rep=candidate;break;}}
    }
    if(rep<0){rep=i;const key=bucketKey(p);if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(i);}else welded++;
    representative[i]=rep;
  }
  if(!welded)return 0;
  const roots=[...new Set(representative)].sort((a,b)=>a-b),rootToNew=new Map(roots.map((root,index)=>[root,index]));
  const remap=representative.map(root=>rootToNew.get(root));
  const nextFaces=[];
  for(const face of mesh.faces){
    const mapped=face.map(index=>remap[index]);
    if(mapped.some(index=>!Number.isInteger(index))||new Set(mapped).size!==mapped.length)return 0;
    nextFaces.push(mapped);
  }
  const nextVertices=roots.map(index=>mesh.vertices[index]?.clone?.()||mesh.vertices[index]);
  const nextCreases=new Map();
  if(mesh.creases instanceof Map){
    for(const [key,strength] of mesh.creases){
      const [aText,bText]=String(key).split(':'),a=Number(aText),b=Number(bText);
      const na=remap[a],nb=remap[b];
      if(!Number.isInteger(na)||!Number.isInteger(nb)||na===nb)continue;
      const nextKey=edgeKey(na,nb),current=Number(nextCreases.get(nextKey)||0);
      nextCreases.set(nextKey,Math.max(current,Number(strength)||0));
    }
  }
  mesh.vertices=nextVertices;mesh.faces=nextFaces;
  if(mesh.creases instanceof Map)mesh.creases=nextCreases;
  return welded;
}
function clean(mesh){
  const gate=globalThis.__boxlabTopologyGate;
  if(!mesh?.clone||!gate?.validate)return{mesh,applied:false,merges:0,collinearRemoved:0,orphanRemoved:0,coincidentWelded:0,facesReduced:0,reason:'Topology validation unavailable'};
  const before=gate.validate(mesh);
  if(!before?.valid||!before?.booleanReady)return{mesh,applied:false,merges:0,collinearRemoved:0,orphanRemoved:0,coincidentWelded:0,facesReduced:0,reason:'Original Boolean result not cleanup-safe',before};
  const candidate=mesh.clone(),beforeFaces=candidate.faces.length;
  const merges=planarCleanup(candidate),collinearRemoved=collinearCleanup(candidate),orphanRemoved=compactUnusedVertices(candidate),coincidentWelded=weldCoincidentVertices(candidate);
  if(!merges&&!collinearRemoved&&!orphanRemoved&&!coincidentWelded)return{mesh,applied:false,merges:0,collinearRemoved:0,orphanRemoved:0,coincidentWelded:0,facesReduced:0,reason:'No safe planar, collinear, orphan or coincident-vertex cleanup',before};
  candidate.edges?.();
  const after=gate.validate(candidate),facesReduced=beforeFaces-candidate.faces.length;
  const worsened=!after?.valid||!after?.booleanReady||
    Number(after.boundaryEdges||0)>Number(before.boundaryEdges||0)||
    Number(after.nonManifoldEdges||0)>Number(before.nonManifoldEdges||0)||
    (merges>0&&facesReduced<=0);
  if(worsened)return{mesh,applied:false,merges:0,collinearRemoved:0,orphanRemoved:0,coincidentWelded:0,facesReduced:0,reason:'Cleanup validation refused — original retained',before,after};
  return{mesh:candidate,applied:true,merges,collinearRemoved,orphanRemoved,coincidentWelded,facesReduced,reason:'Safe planar, collinear, orphan and coincident-vertex cleanup applied',before,after};
}
function manager(){return globalThis.__boxlabObjectManager||null;}
function install(){
  const m=manager();if(!m?.addMesh)return false;
  if(m.__boxlabBooleanCleanup232){installed=true;return true;}
  const baseAdd=m.addMesh.bind(m);
  m.addMesh=function(mesh,name='Object',options={}){
    let next=mesh;
    if(pending){
      pending=false;
      const result=clean(mesh);last={...result};delete last.mesh;
      next=result.mesh||mesh;
    }
    return baseAdd(next,name,options);
  };
  m.__boxlabBooleanCleanup232=true;installed=true;return true;
}

document.addEventListener('click',event=>{
  if(!event.target?.closest?.('[data-boolean217]'))return;
  install();pending=true;
  setTimeout(()=>{pending=false;},0);
},true);
window.addEventListener('boxlab-object-manager-ready',install);
[0,60,250,700].forEach(delay=>setTimeout(install,delay));

globalThis.__boxlabBooleanResultCleanup={version:VERSION,clean,get installed(){return installed;},get last(){return last;}};
