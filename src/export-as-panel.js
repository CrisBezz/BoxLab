// BoxLab v0.36.18.542 — File-name editing ownership fix.
// GLB keeps BoxLab editable objects as separate named scene nodes for Nomad/3D handoff.
import * as THREE from 'three';
import {GLTFExporter} from 'three/addons/exporters/GLTFExporter.js';
import {buildSceneOBJ,resolveExportMesh,safeOBJName} from './scene-obj-export-core.js?v=0.36.18.444';

const VERSION='0.36.18.542';
const panel=document.querySelector('#exportAsPanel');
const nameInput=document.querySelector('#exportFileName');
const formatButtons=[...document.querySelectorAll('#exportFormat [data-export-format]')];
const geometryButtons=[...document.querySelectorAll('#exportGeometry [data-export-geometry]')];
const exportButton=document.querySelector('#exportAsBtn');
const note=document.querySelector('#exportDestinationNote');
const status=document.querySelector('#selectionStatus');

let format='glb';
let geometry='base';

function manager(){return globalThis.__boxlabObjectManager||null;}
function objects(){
  const m=manager();
  m?.saveActive?.();
  return (m?.objects||[]).filter(object=>object?.kind!=='reference'&&object?.mesh&&object.visible!==false);
}
function cleanName(value){
  const base=String(value||'BoxLab_Model').trim().replace(/[\\/:*?"<>|]+/g,'_').replace(/\s+/g,' ');
  return base||'BoxLab_Model';
}
function setActive(buttons,key,value){
  for(const button of buttons)button.classList.toggle('active',button.dataset[key]===value);
}
function updateNote(){
  if(!note)return;
  if(typeof window.showSaveFilePicker==='function')note.textContent='Save location chosen when you export.';
  else if(navigator.share&&typeof File!=='undefined')note.textContent='On iPad choose Save to Files from the share sheet.';
  else note.textContent='Your browser will save to its normal download location.';
}
function extension(){return format==='glb'?'glb':'obj';}
function filename(){return cleanName(nameInput?.value)+'.'+extension();}
function downloadBlob(blob,fileName){
  const url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download=fileName;document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1200);
}
async function saveBlob(blob,fileName,mime){
  if(typeof window.showSaveFilePicker==='function'){
    try{
      const handle=await window.showSaveFilePicker({
        suggestedName:fileName,
        types:[{description:format==='glb'?'GLB 3D Model':'Wavefront OBJ',accept:{[mime]:['.'+extension()]}}]
      });
      const writable=await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return 'saved';
    }catch(error){
      if(error?.name==='AbortError')return 'cancelled';
    }
  }
  try{
    if(navigator.share&&typeof File!=='undefined'){
      const file=new File([blob],fileName,{type:mime});
      if(!navigator.canShare||navigator.canShare({files:[file]})){
        await navigator.share({files:[file],title:fileName});
        return 'shared';
      }
    }
  }catch(error){
    if(error?.name==='AbortError')return 'cancelled';
  }
  downloadBlob(blob,fileName);
  return 'downloaded';
}
function faceNormal(mesh,face){
  const n=new THREE.Vector3();
  if(!face?.length)return n.set(0,1,0);
  for(let i=0;i<face.length;i++){
    const a=mesh.vertices[face[i]],b=mesh.vertices[face[(i+1)%face.length]];
    if(!a||!b)continue;
    n.x+=(a.y-b.y)*(a.z+b.z);
    n.y+=(a.z-b.z)*(a.x+b.x);
    n.z+=(a.x-b.x)*(a.y+b.y);
  }
  return n.lengthSq()>1e-12?n.normalize():n.set(0,1,0);
}
function triangulateFace(mesh,face){
  if(face.length===3)return [[face[0],face[1],face[2]]];
  const normal=faceNormal(mesh,face),ax=Math.abs(normal.x),ay=Math.abs(normal.y),az=Math.abs(normal.z);
  const points=face.map(index=>{
    const v=mesh.vertices[index];
    if(ax>=ay&&ax>=az)return new THREE.Vector2(v.y,v.z);
    if(ay>=az)return new THREE.Vector2(v.x,v.z);
    return new THREE.Vector2(v.x,v.y);
  });
  const tris=THREE.ShapeUtils.triangulateShape(points,[]);
  return tris.length?tris.map(t=>t.map(local=>face[local])):[];
}
function normalizedFaceGroup(mesh,faceIndex){
  const value=mesh.faceGroups?.[faceIndex];
  return typeof value==='string'&&value.trim()?value.trim():null;
}
function editableToGeometry(mesh){
  const buckets=new Map();
  for(let faceIndex=0;faceIndex<(mesh.faces||[]).length;faceIndex++){
    const face=mesh.faces[faceIndex];
    if(!Array.isArray(face)||face.length<3)continue;
    const group=normalizedFaceGroup(mesh,faceIndex);
    const key=group??'__BOXLAB_UNGROUPED__';
    if(!buckets.has(key))buckets.set(key,{name:group,triangles:[]});
    buckets.get(key).triangles.push(...triangulateFace(mesh,face));
  }
  const positions=[],groups=[];
  for(const bucket of buckets.values()){
    const start=positions.length/3;
    for(const tri of bucket.triangles){
      for(const index of tri){
        const v=mesh.vertices[index];
        if(v)positions.push(v.x,v.y,v.z);
      }
    }
    const count=positions.length/3-start;
    if(count)groups.push({start,count,name:bucket.name});
  }
  const geometry=new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  groups.forEach((group,index)=>geometry.addGroup(group.start,group.count,index));
  geometry.userData.boxlabFaceGroups=groups.map(group=>group.name);
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  return{geometry,groups};
}
function materialForFaceGroup(name,index){
  const material=new THREE.MeshStandardMaterial({color:0xbac5d4,roughness:.72,metalness:0,side:THREE.DoubleSide});
  material.name=name?`BoxLabFG::${encodeURIComponent(name)}`:`BoxLabFG::Ungrouped_${index+1}`;
  if(name)material.userData.boxlabFaceGroup=name;
  else material.userData.boxlabUngrouped=true;
  return material;
}
async function buildGLB(sceneObjects,subd){
  const root=new THREE.Group();
  root.name='BoxLab';
  let count=0,faceGroupCount=0;
  sceneObjects.forEach((object,index)=>{
    const editable=resolveExportMesh(object,subd);
    if(!editable?.vertices?.length||!editable?.faces?.length)return;
    const built=editableToGeometry(editable),geometry=built.geometry;
    if(!geometry.getAttribute('position')?.count)return;
    const materials=built.groups.map((group,groupIndex)=>materialForFaceGroup(group.name,groupIndex));
    const node=new THREE.Mesh(geometry,materials.length===1?materials[0]:materials);
    node.name=safeOBJName(object.name,index);
    node.userData.boxlabObjectId=object.id;
    node.userData.boxlabFaceGroupCount=built.groups.filter(group=>group.name).length;
    faceGroupCount+=node.userData.boxlabFaceGroupCount;
    root.add(node);count++;
  });
  if(!count)throw new Error('No editable geometry to export');
  const exporter=new GLTFExporter();
  const buffer=await exporter.parseAsync(root,{binary:true,onlyVisible:true});
  root.traverse(node=>{
    node.geometry?.dispose?.();
    if(Array.isArray(node.material))node.material.forEach(material=>material?.dispose?.());
    else node.material?.dispose?.();
  });
  return{buffer,count,faceGroupCount};
}
async function exportAs(){
  const sceneObjects=objects();
  if(!sceneObjects.length){if(status)status.textContent='Export • no visible editable objects';return;}
  const subd=geometry==='subd',fileName=filename();
  exportButton.disabled=true;
  try{
    if(format==='obj'){
      const result=buildSceneOBJ(sceneObjects,{subd,version:VERSION});
      const blob=new Blob([result.content],{type:'model/obj'});
      const outcome=await saveBlob(blob,fileName,'model/obj');
      if(status&&outcome!=='cancelled')status.textContent=`OBJ export • ${result.exported} object${result.exported===1?'':'s'} • ${outcome}`;
    }else{
      if(status)status.textContent='GLB export • building scene…';
      const result=await buildGLB(sceneObjects,subd);
      const blob=new Blob([result.buffer],{type:'model/gltf-binary'});
      const outcome=await saveBlob(blob,fileName,'model/gltf-binary');
      if(status&&outcome!=='cancelled')status.textContent=`GLB export • ${result.count} object${result.count===1?'':'s'} • ${result.faceGroupCount} facegroup${result.faceGroupCount===1?'':'s'} • ${outcome}`;
    }
  }catch(error){
    console.error('BoxLab Export As failed',error);
    if(status)status.textContent=`Export failed • ${error?.message||error}`;
  }finally{
    exportButton.disabled=false;
  }
}
formatButtons.forEach(button=>button.addEventListener('click',()=>{
  format=button.dataset.exportFormat||'glb';setActive(formatButtons,'exportFormat',format);updateNote();
}));
geometryButtons.forEach(button=>button.addEventListener('click',()=>{
  geometry=button.dataset.exportGeometry||'base';setActive(geometryButtons,'exportGeometry',geometry);
}));
function setEditingTouchMode(editing){
  const app=document.querySelector('#app');
  for(const el of [document.documentElement,document.body,app].filter(Boolean)){
    if(editing){
      if(el.dataset.boxlabTouchActionBefore===undefined)el.dataset.boxlabTouchActionBefore=el.style.touchAction||'';
      el.style.touchAction='auto';
    }else if(el.dataset.boxlabTouchActionBefore!==undefined){
      el.style.touchAction=el.dataset.boxlabTouchActionBefore;
      delete el.dataset.boxlabTouchActionBefore;
    }
  }
}
function focusFileName(){
  if(!nameInput)return;
  try{nameInput.focus({preventScroll:true});}catch{nameInput.focus();}
}
nameInput?.addEventListener('pointerdown',event=>{
  event.stopPropagation();
  if(event.pointerType!=='mouse')focusFileName();
},{capture:true});
nameInput?.addEventListener('touchstart',event=>{
  event.stopPropagation();
  focusFileName();
},{capture:true,passive:true});
nameInput?.addEventListener('click',event=>{event.stopPropagation();focusFileName();});
nameInput?.addEventListener('focus',()=>setEditingTouchMode(true));
nameInput?.addEventListener('blur',()=>setEditingTouchMode(false));
nameInput?.addEventListener('input',()=>{nameInput.value=nameInput.value.replace(/\.(obj|glb)$/i,'');});
exportButton?.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();exportAs();});

setActive(formatButtons,'exportFormat',format);
setActive(geometryButtons,'exportGeometry',geometry);
updateNote();

globalThis.__boxlabExportAs={version:VERSION,exportAs,buildGLB,get format(){return format;},get geometry(){return geometry;}};
