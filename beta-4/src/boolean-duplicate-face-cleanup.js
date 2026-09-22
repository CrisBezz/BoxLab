// BoxLab v0.36.18.233 — conservative duplicate-face cleanup after the stable 232 Boolean cleanup chain.
// Loaded before boolean-result-cleanup.js so 232 remains the outer wrapper and runs first.
const VERSION='0.36.18.233';
let pending=false,installed=false;
let last={applied:false,duplicatesRemoved:0,reason:'Not run'};

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
function dot(a,b){return a.x*b.x+a.y*b.y+a.z*b.z;}
function canonicalDirectedCycle(face){
  if(!Array.isArray(face)||face.length<3)return null;
  let best=null;
  for(let start=0;start<face.length;start++){
    const rotation=[];
    for(let i=0;i<face.length;i++)rotation.push(face[(start+i)%face.length]);
    const key=rotation.join(':');
    if(best===null||key<best)best=key;
  }
  return best;
}
function removeDuplicateFaces(mesh){
  if(!Array.isArray(mesh?.faces)||mesh.faces.length<2)return 0;
  const seen=new Map(),drop=new Set();
  for(let fi=0;fi<mesh.faces.length;fi++){
    const face=mesh.faces[fi];
    if(!Array.isArray(face)||face.length<3||new Set(face).size!==face.length)continue;
    const key=canonicalDirectedCycle(face);if(!key)continue;
    const previous=seen.get(key);
    if(previous===undefined){seen.set(key,fi);continue;}
    const nA=newell(mesh,mesh.faces[previous]),nB=newell(mesh,face);
    if(!nA||!nB||dot(nA,nB)<0.999999)continue;
    drop.add(fi);
  }
  if(!drop.size)return 0;
  mesh.faces=mesh.faces.filter((_,fi)=>!drop.has(fi));
  return drop.size;
}
function clean(mesh){
  const gate=globalThis.__boxlabTopologyGate;
  if(!mesh?.clone||!gate?.validate)return{mesh,applied:false,duplicatesRemoved:0,reason:'Topology validation unavailable'};
  const before=gate.validate(mesh);
  if(!before?.valid||!before?.booleanReady)return{mesh,applied:false,duplicatesRemoved:0,reason:'232 result not duplicate-cleanup safe',before};
  const candidate=mesh.clone(),duplicatesRemoved=removeDuplicateFaces(candidate);
  if(!duplicatesRemoved)return{mesh,applied:false,duplicatesRemoved:0,reason:'No exact directed duplicate faces',before};
  candidate.edges?.();
  const after=gate.validate(candidate);
  const worsened=!after?.valid||!after?.booleanReady||
    Number(after.boundaryEdges||0)>Number(before.boundaryEdges||0)||
    Number(after.nonManifoldEdges||0)>Number(before.nonManifoldEdges||0);
  if(worsened)return{mesh,applied:false,duplicatesRemoved:0,reason:'Duplicate-face validation refused — 232 result retained',before,after};
  return{mesh:candidate,applied:true,duplicatesRemoved,reason:'Safe exact duplicate faces removed',before,after};
}
function manager(){return globalThis.__boxlabObjectManager||null;}
function install(){
  const m=manager();if(!m?.addMesh)return false;
  if(m.__boxlabBooleanDuplicateFaceCleanup233){installed=true;return true;}
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
  m.__boxlabBooleanDuplicateFaceCleanup233=true;installed=true;return true;
}

document.addEventListener('click',event=>{
  if(!event.target?.closest?.('[data-boolean217]'))return;
  install();pending=true;
  setTimeout(()=>{pending=false;},0);
},true);
window.addEventListener('boxlab-object-manager-ready',install);
[0,60,250,700].forEach(delay=>setTimeout(install,delay));

globalThis.__boxlabBooleanDuplicateFaceCleanup={version:VERSION,clean,get installed(){return installed;},get last(){return last;}};
