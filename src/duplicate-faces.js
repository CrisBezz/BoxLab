import { EditableMesh } from './mesh.js';

// BoxLab v0.36.18.89 — non-destructive Duplicate Faces.
// Copies the current Face selection into a new object while leaving the source untouched.

const extractButton=document.querySelector('#extractFacesBtn');
const status=document.querySelector('#selectionStatus');

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function manager(){return globalThis.__boxlabObjectManager;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function selectedFaces(){
  const m=state()?.mesh,b=bridge();
  if(!m||b?.mode?.()!=='face')return[];
  return[...new Set(b.indices?.()||[])].filter(i=>Number.isInteger(i)&&Array.isArray(m.faces?.[i]));
}

function compactSelection(mesh,faceIndices){
  const faces=faceIndices.map(i=>[...mesh.faces[i]]);
  const used=new Set(faces.flat());
  const map=new Map(),vertices=[];
  mesh.vertices.forEach((v,i)=>{
    if(!used.has(i))return;
    map.set(i,vertices.length);
    vertices.push(v.clone());
  });
  const compactFaces=faces.map(face=>face.map(i=>map.get(i)));
  const creases=new Map();
  for(const [key,value] of mesh.creases||[]){
    const [a,b]=key.split(':').map(Number);
    if(!map.has(a)||!map.has(b))continue;
    const na=map.get(a),nb=map.get(b),nk=na<nb?`${na}:${nb}`:`${nb}:${na}`;
    creases.set(nk,value);
  }
  return new EditableMesh(vertices,compactFaces,creases);
}

const button=document.createElement('button');
button.id='duplicateFacesBtn';
button.type='button';
button.textContent='Duplicate';
button.disabled=true;
button.title='Duplicate selected Faces into a new object';

function place(){
  const row=extractButton?.parentElement;
  if(!row)return false;
  row.style.gridTemplateColumns='repeat(4,minmax(0,1fr))';
  if(button.parentElement!==row)extractButton.insertAdjacentElement('afterend',button);
  return true;
}

function duplicateFaces(){
  const mesh=state()?.mesh,ids=selectedFaces(),m=manager();
  if(!mesh||!ids.length||!m?.addMesh)return;
  const copy=compactSelection(mesh,ids);
  if(!copy.faces.length)return;
  const object=m.addMesh(copy,ids.length===1?'Duplicated Face':'Duplicated Faces',{enterObjectMode:true});
  if(!object){if(status)status.textContent='Duplicate Faces unavailable • Outliner is still loading';return;}
  render();
  if(status)status.textContent=`${object.name} created • source unchanged`;
}

function sync(){
  place();
  const count=selectedFaces().length;
  button.disabled=!count||!manager()?.addMesh;
  button.title=count?`Duplicate ${count} selected Face${count===1?'':'s'} into a new object`:'Select one or more Faces to duplicate';
}

function stampVersion(){
  const version=document.querySelector('#appVersion');
  if(version)version.textContent='v0.36.18.89';
  document.title='BoxLab v0.36.18.89';
}

button.addEventListener('click',duplicateFaces);
window.addEventListener('boxlab-bridge-state',sync);
document.addEventListener('pointerup',()=>queueMicrotask(sync),true);
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
[0,40,120,300,700].forEach(delay=>setTimeout(sync,delay));
[0,80,300,900].forEach(delay=>setTimeout(stampVersion,delay));

globalThis.__boxlabDuplicateFaces={version:'0.36.18.89',duplicate:duplicateFaces};
