// BoxLab v0.36.18.227 — conservative post-Boolean topology cleanup.
// The proven Boolean solver remains untouched. This module only decorates the next
// Boolean result passed to ObjectManager.addMesh, validates it, and falls back to
// the original result whenever cleanup is not demonstrably safe.
const VERSION='0.36.18.227';
let pending=false,installed=false;
let last={applied:false,quads:0,trianglesRemoved:0,reason:'Not run'};

function edgeKey(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}
function directed(face,a,b){
  for(let i=0;i<face.length;i++){
    const x=face[i],y=face[(i+1)%face.length];
    if(x===a&&y===b)return 1;
    if(x===b&&y===a)return -1;
  }
  return 0;
}
function sub(a,b){return{x:a.x-b.x,y:a.y-b.y,z:a.z-b.z};}
function cross(a,b){return{x:a.y*b.z-a.z*b.y,y:a.z*b.x-a.x*b.z,z:a.x*b.y-a.y*b.x};}
function dot(a,b){return a.x*b.x+a.y*b.y+a.z*b.z;}
function normalOf(mesh,face){
  if(!mesh||!face||face.length<3)return null;
  const a=mesh.vertices?.[face[0]],b=mesh.vertices?.[face[1]],c=mesh.vertices?.[face[2]];
  if(!a||!b||!c)return null;
  const n=cross(sub(b,a),sub(c,a)),length=Math.hypot(n.x,n.y,n.z);
  return length>1e-12?{x:n.x/length,y:n.y/length,z:n.z/length}:null;
}
function mergedCycle(mesh,faceA,faceB){
  const shared=[...new Set(faceA.filter(v=>faceB.includes(v)))];
  if(shared.length!==2)return null;
  const [s0,s1]=shared,d0=directed(faceA,s0,s1),d1=directed(faceB,s0,s1);
  if(!d0||!d1||d0===d1)return null;
  const sharedKey=edgeKey(s0,s1),boundary=[];
  for(const face of [faceA,faceB])for(let i=0;i<3;i++){
    const a=face[i],b=face[(i+1)%3];
    if(edgeKey(a,b)!==sharedKey)boundary.push([a,b]);
  }
  if(boundary.length!==4)return null;
  const cycle=[boundary[0][0]],used=new Set();let current=cycle[0];
  for(let step=0;step<4;step++){
    let pick=-1;
    for(let i=0;i<boundary.length;i++)if(!used.has(i)&&boundary[i][0]===current){pick=i;break;}
    if(pick<0)return null;
    used.add(pick);current=boundary[pick][1];if(step<3)cycle.push(current);
  }
  if(current!==cycle[0]||new Set(cycle).size!==4)return null;
  return cycle;
}
function validQuadGeometry(mesh,cycle,nRef){
  if(!cycle||cycle.length!==4)return false;
  const points=cycle.map(i=>mesh.vertices?.[i]);if(points.some(p=>!p))return false;
  let sign=0;
  for(let i=0;i<4;i++){
    const a=points[i],b=points[(i+1)%4],c=points[(i+2)%4];
    const s=dot(cross(sub(b,a),sub(c,b)),nRef);
    if(Math.abs(s)<1e-10)return false;
    const now=Math.sign(s);if(!sign)sign=now;else if(now!==sign)return false;
  }
  return true;
}
function safePairs(mesh){
  const edgeFaces=new Map();
  for(let fi=0;fi<(mesh.faces?.length||0);fi++){
    const face=mesh.faces[fi];if(!Array.isArray(face)||face.length<3)continue;
    for(let i=0;i<face.length;i++){
      const key=edgeKey(face[i],face[(i+1)%face.length]);
      if(!edgeFaces.has(key))edgeFaces.set(key,[]);
      edgeFaces.get(key).push(fi);
    }
  }
  const used=new Set(),pairs=[];
  for(const indices of edgeFaces.values()){
    if(indices.length!==2)continue;
    const [a,b]=indices;if(used.has(a)||used.has(b))continue;
    const faceA=mesh.faces[a],faceB=mesh.faces[b];
    if(faceA?.length!==3||faceB?.length!==3)continue;
    const nA=normalOf(mesh,faceA),nB=normalOf(mesh,faceB);
    if(!nA||!nB||dot(nA,nB)<0.999999)continue;
    const cycle=mergedCycle(mesh,faceA,faceB);
    if(!cycle||!validQuadGeometry(mesh,cycle,nA))continue;
    const nQ=normalOf(mesh,[cycle[0],cycle[1],cycle[2]]);
    if(!nQ||dot(nQ,nA)<0.999999)continue;
    pairs.push({a,b,cycle});used.add(a);used.add(b);
  }
  return pairs;
}
function clean(mesh){
  const gate=globalThis.__boxlabTopologyGate;
  if(!mesh?.clone||!gate?.validate)return{mesh,applied:false,quads:0,trianglesRemoved:0,reason:'Topology validation unavailable'};
  const before=gate.validate(mesh);
  if(!before?.valid||!before?.booleanReady)return{mesh,applied:false,quads:0,trianglesRemoved:0,reason:'Original Boolean result not cleanup-safe',before};
  const candidate=mesh.clone(),pairs=safePairs(candidate);
  if(!pairs.length)return{mesh,applied:false,quads:0,trianglesRemoved:0,reason:'No safe coplanar triangle pairs',before};
  const replacement=new Map(),remove=new Set();
  for(const pair of pairs){
    const keep=Math.min(pair.a,pair.b),drop=Math.max(pair.a,pair.b);
    replacement.set(keep,[...pair.cycle]);remove.add(drop);
  }
  const faces=[];
  for(let i=0;i<candidate.faces.length;i++){
    if(remove.has(i))continue;
    faces.push(replacement.has(i)?replacement.get(i):[...candidate.faces[i]]);
  }
  candidate.faces=faces;
  candidate.edges?.();
  const after=gate.validate(candidate);
  const worsened=!after?.valid||!after?.booleanReady||
    Number(after.boundaryEdges||0)>Number(before.boundaryEdges||0)||
    Number(after.nonManifoldEdges||0)>Number(before.nonManifoldEdges||0);
  if(worsened)return{mesh,applied:false,quads:0,trianglesRemoved:0,reason:'Cleanup validation refused — original retained',before,after};
  return{mesh:candidate,applied:true,quads:pairs.length,trianglesRemoved:pairs.length*2,reason:'Safe quad cleanup applied',before,after};
}
function manager(){return globalThis.__boxlabObjectManager||null;}
function install(){
  const m=manager();if(!m?.addMesh)return false;
  if(m.__boxlabBooleanCleanup227){installed=true;return true;}
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
  m.__boxlabBooleanCleanup227=true;installed=true;return true;
}

document.addEventListener('click',event=>{
  if(!event.target?.closest?.('[data-boolean217]'))return;
  install();pending=true;
  setTimeout(()=>{pending=false;},0);
},true);
window.addEventListener('boxlab-object-manager-ready',install);
[0,60,250,700].forEach(delay=>setTimeout(install,delay));

globalThis.__boxlabBooleanResultCleanup={version:VERSION,clean,get installed(){return installed;},get last(){return last;}};
