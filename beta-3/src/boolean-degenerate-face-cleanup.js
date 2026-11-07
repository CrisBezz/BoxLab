// BoxLab v0.36.18.234 — conservative zero-area face cleanup after the stable 232/233 Boolean cleanup chain.
// Loaded before the other Boolean cleanup wrappers so it runs last and can always fall back to their accepted result.
const VERSION='0.36.18.234';
let pending=false,installed=false;
let last={applied:false,degenerateRemoved:0,reason:'Not run'};

function faceAreaInfo(mesh,face){
  if(!Array.isArray(face)||face.length<3)return{degenerate:true,area2:0,tolerance:0};
  const points=face.map(index=>mesh.vertices?.[index]);
  if(points.some(point=>!point))return{degenerate:true,area2:0,tolerance:0};
  let nx=0,ny=0,nz=0;
  let minX=Infinity,minY=Infinity,minZ=Infinity,maxX=-Infinity,maxY=-Infinity,maxZ=-Infinity;
  for(let i=0;i<points.length;i++){
    const a=points[i],b=points[(i+1)%points.length];
    nx+=(a.y-b.y)*(a.z+b.z);
    ny+=(a.z-b.z)*(a.x+b.x);
    nz+=(a.x-b.x)*(a.y+b.y);
    minX=Math.min(minX,a.x);minY=Math.min(minY,a.y);minZ=Math.min(minZ,a.z);
    maxX=Math.max(maxX,a.x);maxY=Math.max(maxY,a.y);maxZ=Math.max(maxZ,a.z);
  }
  const area2=Math.hypot(nx,ny,nz);
  const diagonal=Math.hypot(maxX-minX,maxY-minY,maxZ-minZ);
  const tolerance=Math.max(1e-12,diagonal*diagonal*1e-10);
  return{degenerate:area2<=tolerance,area2,tolerance};
}
function removeDegenerateFaces(mesh){
  if(!Array.isArray(mesh?.faces)||!Array.isArray(mesh?.vertices))return 0;
  const drop=new Set();
  mesh.faces.forEach((face,index)=>{if(faceAreaInfo(mesh,face).degenerate)drop.add(index);});
  if(!drop.size)return 0;
  mesh.faces=mesh.faces.filter((_,index)=>!drop.has(index));
  return drop.size;
}
function clean(mesh){
  const gate=globalThis.__boxlabTopologyGate;
  if(!mesh?.clone||!gate?.validate)return{mesh,applied:false,degenerateRemoved:0,reason:'Topology validation unavailable'};
  const before=gate.validate(mesh);
  if(!before?.valid||!before?.booleanReady)return{mesh,applied:false,degenerateRemoved:0,reason:'233 result not degenerate-cleanup safe',before};
  const candidate=mesh.clone(),degenerateRemoved=removeDegenerateFaces(candidate);
  if(!degenerateRemoved)return{mesh,applied:false,degenerateRemoved:0,reason:'No zero-area faces',before};
  candidate.edges?.();
  const after=gate.validate(candidate);
  const worsened=!after?.valid||!after?.booleanReady||
    Number(after.boundaryEdges||0)>Number(before.boundaryEdges||0)||
    Number(after.nonManifoldEdges||0)>Number(before.nonManifoldEdges||0);
  if(worsened)return{mesh,applied:false,degenerateRemoved:0,reason:'Degenerate-face validation refused — 233 result retained',before,after};
  return{mesh:candidate,applied:true,degenerateRemoved,reason:'Safe zero-area faces removed',before,after};
}
function manager(){return globalThis.__boxlabObjectManager||null;}
function install(){
  const m=manager();if(!m?.addMesh)return false;
  if(m.__boxlabBooleanDegenerateFaceCleanup234){installed=true;return true;}
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
  m.__boxlabBooleanDegenerateFaceCleanup234=true;installed=true;return true;
}

document.addEventListener('click',event=>{
  if(!event.target?.closest?.('[data-boolean217]'))return;
  install();pending=true;
  setTimeout(()=>{pending=false;},0);
},true);
window.addEventListener('boxlab-object-manager-ready',install);
[0,60,250,700].forEach(delay=>setTimeout(install,delay));

globalThis.__boxlabBooleanDegenerateFaceCleanup={version:VERSION,clean,faceAreaInfo,get installed(){return installed;},get last(){return last;}};
