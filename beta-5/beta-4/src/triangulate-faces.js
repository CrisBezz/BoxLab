import * as THREE from 'three';

// BoxLab v0.36.18.91 — selected Face triangulation.
// Replaces selected ngons/quads with triangles while preserving source winding.
// Concave Faces are supported through planar projection + THREE.ShapeUtils.

const faceTools=document.querySelector('[data-mode-tools="face"]');
const flipRow=document.querySelector('#flipFacesRow');
const status=document.querySelector('#selectionStatus');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function selectedFaces(){
  const m=mesh(),b=bridge();
  if(!m||b?.mode?.()!=='face')return[];
  return[...new Set(b.indices?.()||[])].filter(i=>Number.isInteger(i)&&Array.isArray(m.faces?.[i])&&m.faces[i].length>=3).sort((a,b)=>a-b);
}

function faceNormal(m,face){
  const n=new THREE.Vector3();
  for(let i=0;i<face.length;i++){
    const a=m.vertices?.[face[i]],b=m.vertices?.[face[(i+1)%face.length]];
    if(!a||!b)return null;
    n.x+=(a.y-b.y)*(a.z+b.z);
    n.y+=(a.z-b.z)*(a.x+b.x);
    n.z+=(a.x-b.x)*(a.y+b.y);
  }
  if(n.lengthSq()<1e-20)return null;
  return n.normalize();
}

function projectionAxis(normal){
  const ax=Math.abs(normal.x),ay=Math.abs(normal.y),az=Math.abs(normal.z);
  if(ax>=ay&&ax>=az)return'x';
  if(ay>=az)return'y';
  return'z';
}

function project(v,axis){
  if(axis==='x')return new THREE.Vector2(v.y,v.z);
  if(axis==='y')return new THREE.Vector2(v.x,v.z);
  return new THREE.Vector2(v.x,v.y);
}

function triangleNormal(m,tri){
  const a=m.vertices?.[tri[0]],b=m.vertices?.[tri[1]],c=m.vertices?.[tri[2]];
  if(!a||!b||!c)return null;
  const n=b.clone().sub(a).cross(c.clone().sub(a));
  if(n.lengthSq()<1e-20)return null;
  return n.normalize();
}

function triangulateOne(m,face){
  if(face.length===3)return{ok:true,triangles:[[...face]]};
  const normal=faceNormal(m,face);
  if(!normal)return{ok:false,reason:'Selected Face is degenerate'};
  const axis=projectionAxis(normal);
  const contour=face.map(i=>project(m.vertices[i],axis));
  const local=THREE.ShapeUtils.triangulateShape(contour,[]);
  if(!Array.isArray(local)||local.length!==face.length-2)return{ok:false,reason:'Selected Face could not be triangulated cleanly'};
  const triangles=[];
  for(const ids of local){
    if(!Array.isArray(ids)||ids.length!==3)return{ok:false,reason:'Triangulation returned invalid topology'};
    let tri=ids.map(i=>face[i]);
    const tn=triangleNormal(m,tri);
    if(!tn)return{ok:false,reason:'Triangulation produced a degenerate triangle'};
    if(tn.dot(normal)<0)tri=[tri[0],tri[2],tri[1]];
    triangles.push(tri);
  }
  return{ok:true,triangles};
}

function plan(m,ids){
  const selected=new Set(ids);
  let changed=0,triangleCount=0;
  const replacements=new Map();
  for(const fi of ids){
    const face=m.faces?.[fi];
    if(!face)continue;
    const result=triangulateOne(m,face);
    if(!result.ok)return result;
    replacements.set(fi,result.triangles);
    triangleCount+=result.triangles.length;
    if(face.length>3)changed++;
  }
  return{ok:true,selected,replacements,changed,triangleCount};
}

const row=document.createElement('div');
row.id='triangulateFacesRow';
row.className='outliner-actions';
row.style.cssText='grid-template-columns:1fr;margin-top:4px';

const button=document.createElement('button');
button.id='triangulateFacesBtn';
button.type='button';
button.textContent='Triangulate Faces';
button.disabled=true;
button.style.cssText='width:100%;min-width:0';
row.appendChild(button);

function place(){
  if(row.isConnected)return true;
  const anchor=document.querySelector('#flipFacesRow')||flipRow;
  if(anchor?.parentElement){anchor.insertAdjacentElement('afterend',row);return true;}
  if(faceTools){faceTools.appendChild(row);return true;}
  return false;
}

function apply(){
  const m=mesh(),ids=selectedFaces(),history=globalThis.__boxlabHistory;
  if(!m||!ids.length||!history)return false;
  const info=plan(m,ids);
  if(!info.ok){if(status)status.textContent=`Triangulate Faces • ${info.reason}`;sync();return false;}
  if(!info.changed){if(status)status.textContent='Triangulate Faces • selected Faces are already triangles';sync();return false;}

  history.push(m.clone());
  const newFaces=[],resultSelection=[];
  for(let fi=0;fi<m.faces.length;fi++){
    if(!info.selected.has(fi)){newFaces.push([...m.faces[fi]]);continue;}
    const triangles=info.replacements.get(fi)||[[...m.faces[fi]]];
    for(const tri of triangles){resultSelection.push(newFaces.length);newFaces.push([...tri]);}
  }
  m.faces=newFaces;
  m.edges?.();
  bridge()?.set?.('face',resultSelection);
  render();
  if(status)status.textContent=`Triangulate Faces • ${info.changed} face${info.changed===1?'':'s'} → ${resultSelection.length} selected triangle${resultSelection.length===1?'':'s'}`;
  queueMicrotask(sync);
  return true;
}

function sync(){
  place();
  const m=mesh(),ids=selectedFaces();
  const candidates=ids.filter(fi=>(m?.faces?.[fi]?.length||0)>3);
  const info=m&&candidates.length?plan(m,ids):null;
  button.disabled=!candidates.length||!info?.ok||!globalThis.__boxlabHistory;
  button.title=!ids.length
    ?'Select one or more Faces to triangulate'
    :!candidates.length
      ?'Selected Faces are already triangles'
      :info?.ok
        ?`Triangulate ${candidates.length} selected non-triangle Face${candidates.length===1?'':'s'}`
        :(info?.reason||'Selected Faces cannot be triangulated');
}

function stampVersion(){
  const version=document.querySelector('#appVersion');
  if(version)version.textContent='v0.36.18.91';
  document.title='BoxLab v0.36.18.91';
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700].forEach(delay=>setTimeout(sync,delay));
[120,500,1000,1600].forEach(delay=>setTimeout(stampVersion,delay));

globalThis.__boxlabTriangulateFaces={version:'0.36.18.91',plan,apply};
