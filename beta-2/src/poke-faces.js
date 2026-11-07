import * as THREE from 'three';

// BoxLab v0.36.18.92 — conservative Poke Faces.
// Splits selected planar convex Faces into same-winding triangle fans around one new centre vertex.
// Existing boundary creases are preserved; new radial edges remain uncreased.

const faceTools=document.querySelector('[data-mode-tools="face"]');
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

function scaleTolerance(m,face){
  const box=new THREE.Box3();
  for(const vi of face){const v=m.vertices?.[vi];if(v)box.expandByPoint(v);}
  if(box.isEmpty())return 1e-7;
  return Math.max(1e-7,box.getSize(new THREE.Vector3()).length()*1e-6);
}

function isPlanar(m,face,normal,tolerance){
  const origin=m.vertices?.[face[0]];
  if(!origin)return false;
  for(const vi of face){
    const v=m.vertices?.[vi];
    if(!v||Math.abs(v.clone().sub(origin).dot(normal))>tolerance)return false;
  }
  return true;
}

function isConvex(m,face,normal,tolerance){
  if(face.length===3)return true;
  let sign=0;
  for(let i=0;i<face.length;i++){
    const a=m.vertices?.[face[(i-1+face.length)%face.length]];
    const b=m.vertices?.[face[i]];
    const c=m.vertices?.[face[(i+1)%face.length]];
    if(!a||!b||!c)return false;
    const cross=b.clone().sub(a).cross(c.clone().sub(b));
    const d=cross.dot(normal);
    if(Math.abs(d)<=tolerance)continue;
    const s=Math.sign(d);
    if(!sign)sign=s;
    else if(s!==sign)return false;
  }
  return sign!==0;
}

function inspectFace(m,fi){
  const face=m?.faces?.[fi];
  if(!Array.isArray(face)||face.length<3)return{ok:false,reason:'Selected Face is invalid'};
  const normal=faceNormal(m,face);
  if(!normal)return{ok:false,reason:'Selected Face is degenerate'};
  const tolerance=scaleTolerance(m,face);
  if(!isPlanar(m,face,normal,tolerance))return{ok:false,reason:'Poke currently requires planar Faces'};
  if(!isConvex(m,face,normal,tolerance))return{ok:false,reason:'Poke currently requires convex Faces'};
  return{ok:true,face:[...face],normal};
}

function plan(m,ids){
  const entries=[];
  for(const fi of ids){
    const info=inspectFace(m,fi);
    if(!info.ok)return info;
    entries.push({fi,...info});
  }
  return{ok:true,entries};
}

const row=document.createElement('div');
row.id='pokeFacesRow';
row.className='outliner-actions';
row.style.cssText='grid-template-columns:1fr;margin-top:4px';

const button=document.createElement('button');
button.id='pokeFacesBtn';
button.type='button';
button.textContent='Poke Faces';
button.disabled=true;
button.style.cssText='width:100%;min-width:0';
row.appendChild(button);

function place(){
  if(row.isConnected)return true;
  const anchor=document.querySelector('#triangulateFacesRow')||document.querySelector('#flipFacesRow');
  if(anchor?.parentElement){anchor.insertAdjacentElement('afterend',row);return true;}
  if(faceTools){faceTools.appendChild(row);return true;}
  return false;
}

function apply(){
  const m=mesh(),ids=selectedFaces(),history=globalThis.__boxlabHistory;
  if(!m||!ids.length||!history)return false;
  const info=plan(m,ids);
  if(!info.ok){if(status)status.textContent=`Poke Faces • ${info.reason}`;sync();return false;}

  history.push(m.clone());
  const selected=new Set(ids),entryByIndex=new Map(info.entries.map(entry=>[entry.fi,entry]));
  const newFaces=[],resultSelection=[];

  for(let fi=0;fi<m.faces.length;fi++){
    if(!selected.has(fi)){newFaces.push([...m.faces[fi]]);continue;}
    const entry=entryByIndex.get(fi),face=entry.face;
    const center=new THREE.Vector3();
    for(const vi of face)center.add(m.vertices[vi]);
    center.multiplyScalar(1/face.length);
    const centerIndex=m.vertices.length;
    m.vertices.push(center);

    for(let i=0;i<face.length;i++){
      let tri=[face[i],face[(i+1)%face.length],centerIndex];
      const a=m.vertices[tri[0]],b=m.vertices[tri[1]],c=m.vertices[tri[2]];
      const tn=b.clone().sub(a).cross(c.clone().sub(a));
      if(tn.dot(entry.normal)<0)tri=[tri[1],tri[0],tri[2]];
      resultSelection.push(newFaces.length);
      newFaces.push(tri);
    }
  }

  m.faces=newFaces;
  m.edges?.();
  bridge()?.set?.('face',resultSelection);
  render();
  if(status)status.textContent=`Poke Faces • ${ids.length} face${ids.length===1?'':'s'} → ${resultSelection.length} selected triangles`;
  queueMicrotask(sync);
  return true;
}

function sync(){
  place();
  const m=mesh(),ids=selectedFaces();
  const info=m&&ids.length?plan(m,ids):null;
  button.disabled=!ids.length||!info?.ok||!globalThis.__boxlabHistory;
  button.title=!ids.length
    ?'Select one or more Faces to poke'
    :info?.ok
      ?`Poke ${ids.length} selected Face${ids.length===1?'':'s'} with centre vertices`
      :(info?.reason||'Selected Faces cannot be poked safely');
}

function stampVersion(){
  const version=document.querySelector('#appVersion');
  if(version)version.textContent='v0.36.18.92';
  document.title='BoxLab v0.36.18.92';
}

button.addEventListener('click',apply);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700].forEach(delay=>setTimeout(sync,delay));
[120,500,1000,1600].forEach(delay=>setTimeout(stampVersion,delay));

globalThis.__boxlabPokeFaces={version:'0.36.18.92',plan,apply};
