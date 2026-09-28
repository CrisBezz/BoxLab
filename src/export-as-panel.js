// BoxLab v0.36.18.549 — Nomad GLB safe passthrough preservation.
// GLB keeps BoxLab editable objects as separate named scene nodes for Nomad/3D handoff.
import * as THREE from 'three';
import {GLTFExporter} from 'three/addons/exporters/GLTFExporter.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {buildSceneOBJ,resolveExportMesh,safeOBJName} from './scene-obj-export-core.js?v=0.36.18.444';

const VERSION='0.36.18.549';
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
function nomadGroupColour(index,total){
  const hue=(index*.618033988749895)%1;
  const colour=new THREE.Color().setHSL(hue,.72,.54,THREE.SRGBColorSpace);
  return[colour.r,colour.g,colour.b];
}
function sharedNomadMaterial(){
  const material=new THREE.MeshStandardMaterial({color:0xbac5d4,roughness:.72,metalness:0,side:THREE.DoubleSide});
  material.name='BoxLab Material';
  material.userData.boxlabNomadSharedMaterial=true;
  return material;
}
function cloneJSON(value){
  return value==null?value:JSON.parse(JSON.stringify(value));
}
function remapTextureRefs(material,textureBase){
  const copy=cloneJSON(material||{});
  const bump=info=>{if(info&&Number.isInteger(info.index))info.index+=textureBase;};
  bump(copy.pbrMetallicRoughness?.baseColorTexture);
  bump(copy.pbrMetallicRoughness?.metallicRoughnessTexture);
  bump(copy.normalTexture);
  bump(copy.occlusionTexture);
  bump(copy.emissiveTexture);
  return copy;
}
function patchNomadFaceGroupGLB(buffer,objectDetails){
  const source=new Uint8Array(buffer);
  const view=new DataView(source.buffer,source.byteOffset,source.byteLength);
  if(view.getUint32(0,true)!==0x46546c67)throw new Error('GLB patch failed: invalid header');
  let offset=12,jsonChunk=null,binChunk=null;
  const chunks=[];
  while(offset<source.byteLength){
    const length=view.getUint32(offset,true),type=view.getUint32(offset+4,true);
    const data=source.slice(offset+8,offset+8+length);
    chunks.push({type,data});
    if(type===0x4e4f534a)jsonChunk={type,data};
    if(type===0x004e4942)binChunk={type,data};
    offset+=8+length;
  }
  if(!jsonChunk)throw new Error('GLB patch failed: JSON chunk missing');
  const jsonText=new TextDecoder().decode(jsonChunk.data).replace(/\u0000+$/,'').trimEnd();
  const gltf=JSON.parse(jsonText);
  let bin=binChunk?.data?new Uint8Array(binChunk.data):new Uint8Array();
  const appendBinary=data=>{
    const bytes=data instanceof Uint8Array?data:new Uint8Array(data||[]);
    const start=(bin.length+3)&~3;
    const end=start+bytes.length;
    const paddedEnd=(end+3)&~3;
    const next=new Uint8Array(paddedEnd);
    next.set(bin,0);
    next.set(bytes,start);
    bin=next;
    return{byteOffset:start,byteLength:bytes.length};
  };
  gltf.bufferViews ||= [];
  gltf.images ||= [];
  gltf.samplers ||= [];
  gltf.textures ||= [];
  gltf.materials ||= [];
  let passthroughObjects=0;
  const meshes=gltf.meshes||[];
  for(let meshIndex=0;meshIndex<meshes.length;meshIndex++){
    const mesh=meshes[meshIndex],detail=objectDetails[meshIndex];
    if(!detail)continue;
    const passthrough=detail.passthrough||null;
    const names=detail.groupNames||[];
    const preservedNomad=cloneJSON(passthrough?.meshExtras?.nomad||{});
    mesh.extras={
      ...(cloneJSON(passthrough?.meshExtras)||{}),
      ...(mesh.extras||{})
    };
    mesh.extras.nomad={
      ...preservedNomad,
      ...(mesh.extras.nomad||{}),
      version:Number(preservedNomad.version||1),
      mesh_type:preservedNomad.mesh_type||'multiresolution',
      multires_level:Number.isFinite(preservedNomad.multires_level)?preservedNomad.multires_level:0,
      multires_level_count:Number.isFinite(preservedNomad.multires_level_count)?preservedNomad.multires_level_count:1,
      groups:names.map((name,index)=>{
        const preserved=preservedNomad.groups?.[index]||{};
        return{
          ...preserved,
          name:name||preserved.name||('FaceGroup '+(index+1)),
          color:Array.isArray(preserved.color)?preserved.color:nomadGroupColour(index,names.length)
        };
      })
    };
    const node=(gltf.nodes||[]).find(entry=>entry?.mesh===meshIndex);
    if(node&&passthrough?.nodeExtras){
      node.extras={...(cloneJSON(passthrough.nodeExtras)||{}),...(node.extras||{})};
    }
    (mesh.primitives||[]).forEach((primitive,index)=>{
      primitive.extras=primitive.extras||{};
      primitive.extras.nomad={...(primitive.extras.nomad||{}),group:index};
    });

    if(passthrough?.materials?.length){
      passthroughObjects++;
      const samplerBase=gltf.samplers.length;
      for(const sampler of passthrough.samplers||[])gltf.samplers.push(cloneJSON(sampler));
      const imageBase=gltf.images.length;
      for(const imageEntry of passthrough.images||[]){
        const definition=cloneJSON(imageEntry?.definition||{});
        delete definition.uri;
        if(imageEntry?.data?.length){
          const appended=appendBinary(imageEntry.data);
          definition.bufferView=gltf.bufferViews.length;
          gltf.bufferViews.push({buffer:0,byteOffset:appended.byteOffset,byteLength:appended.byteLength});
        }else{
          delete definition.bufferView;
        }
        gltf.images.push(definition);
      }
      const textureBase=gltf.textures.length;
      for(const texture of passthrough.textures||[]){
        const next=cloneJSON(texture);
        if(Number.isInteger(next.sampler))next.sampler+=samplerBase;
        if(Number.isInteger(next.source))next.source+=imageBase;
        gltf.textures.push(next);
      }
      const materialBase=gltf.materials.length;
      for(const material of passthrough.materials||[])gltf.materials.push(remapTextureRefs(material,textureBase));
      const sourceMaterial=Number.isInteger(passthrough.materialIndices?.[0])?passthrough.materialIndices[0]:0;
      const materialIndex=materialBase+Math.min(sourceMaterial,Math.max(0,passthrough.materials.length-1));
      for(const primitive of mesh.primitives||[])primitive.material=materialIndex;
    }
  }
  if(gltf.buffers?.length)gltf.buffers[0].byteLength=bin.length;
  else if(bin.length)gltf.buffers=[{byteLength:bin.length}];

  const encoded=new TextEncoder().encode(JSON.stringify(gltf));
  const paddedLength=(encoded.length+3)&~3;
  const padded=new Uint8Array(paddedLength);padded.fill(0x20);padded.set(encoded);
  const rebuilt=[];
  let wroteBin=false;
  for(const chunk of chunks){
    if(chunk.type===0x4e4f534a)rebuilt.push({type:chunk.type,data:padded});
    else if(chunk.type===0x004e4942){rebuilt.push({type:chunk.type,data:bin});wroteBin=true;}
    else rebuilt.push(chunk);
  }
  if(bin.length&&!wroteBin)rebuilt.push({type:0x004e4942,data:bin});
  const total=12+rebuilt.reduce((sum,chunk)=>sum+8+chunk.data.length,0);
  const out=new Uint8Array(total),outView=new DataView(out.buffer);
  outView.setUint32(0,0x46546c67,true);outView.setUint32(4,2,true);outView.setUint32(8,total,true);
  let write=12;
  for(const chunk of rebuilt){
    outView.setUint32(write,chunk.data.length,true);outView.setUint32(write+4,chunk.type,true);
    out.set(chunk.data,write+8);write+=8+chunk.data.length;
  }
  globalThis.__boxlabNomadRoundTrip ||= {};
  globalThis.__boxlabNomadRoundTrip.lastPassthrough={objects:passthroughObjects};
  return out.buffer;
}
async function verifyGLB(buffer,expectedObjects,expectedGroupSlots){
  const loader=new GLTFLoader();
  const gltf=await loader.parseAsync(buffer,'');
  let objects=0,groupSlots=0;
  const details=[];
  gltf.scene.updateMatrixWorld(true);
  gltf.scene.traverse(node=>{
    if(node.userData?.boxlabRoundTripObject!==true)return;
    objects++;
    let slots=0;
    node.traverse(part=>{
      if(!part.isMesh||!part.geometry)return;
      slots+=Math.max(
        part.geometry.groups?.length||0,
        Array.isArray(part.material)?part.material.length:(part.material?1:0),
        1
      );
    });
    groupSlots+=slots;
    details.push({name:node.name||('Object '+objects),groupSlots:slots});
  });
  const pass=objects===expectedObjects&&groupSlots===expectedGroupSlots;
  const report={pass,objects,groupSlots,expectedObjects,expectedGroupSlots,details};
  globalThis.__boxlabNomadRoundTrip ||= {};
  globalThis.__boxlabNomadRoundTrip.lastExportVerification=report;
  if(!pass)throw new Error('GLB self-check failed: expected '+expectedObjects+' object(s) / '+expectedGroupSlots+' group slot(s), got '+objects+' / '+groupSlots);
  return report;
}
async function buildGLB(sceneObjects,subd){
  const root=new THREE.Group();
  root.name='BoxLab';
  let count=0,faceGroupCount=0,groupSlotCount=0;
  const objectDetails=[];
  sceneObjects.forEach((object,index)=>{
    const editable=resolveExportMesh(object,subd);
    if(!editable?.vertices?.length||!editable?.faces?.length)return;
    const built=editableToGeometry(editable),geometry=built.geometry;
    if(!geometry.getAttribute('position')?.count)return;
    const sharedMaterial=sharedNomadMaterial();
    const materials=built.groups.map(()=>sharedMaterial);
    const node=new THREE.Mesh(geometry,materials.length===1?sharedMaterial:materials);
    node.name=safeOBJName(object.name,index);
    node.userData.boxlabObjectId=object.id;
    node.userData.boxlabRoundTripObject=true;
    node.userData.boxlabFaceGroupCount=built.groups.filter(group=>group.name).length;
    node.userData.boxlabGroupSlotCount=built.groups.length;
    faceGroupCount+=node.userData.boxlabFaceGroupCount;
    groupSlotCount+=node.userData.boxlabGroupSlotCount;
    objectDetails.push({
      name:node.name,
      faceGroups:node.userData.boxlabFaceGroupCount,
      groupSlots:node.userData.boxlabGroupSlotCount,
      groupNames:built.groups.map((group,groupIndex)=>group.name||('FaceGroup '+(groupIndex+1))),
      passthrough:object.glbPassthrough||null
    });
    root.add(node);count++;
  });
  if(!count)throw new Error('No editable geometry to export');
  const exporter=new GLTFExporter();
  let buffer=await exporter.parseAsync(root,{binary:true,onlyVisible:true});
  buffer=patchNomadFaceGroupGLB(buffer,objectDetails);
  root.traverse(node=>{
    node.geometry?.dispose?.();
    if(Array.isArray(node.material))node.material.forEach(material=>material?.dispose?.());
    else node.material?.dispose?.();
  });
  const verification=await verifyGLB(buffer,count,groupSlotCount);
  return{buffer,count,faceGroupCount,groupSlotCount,objectDetails,verification};
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
      if(status&&outcome!=='cancelled'){const preserved=result.objectDetails.filter(item=>item.passthrough).length;status.textContent=`GLB verified • ${result.verification.objects} object${result.verification.objects===1?'':'s'} • ${result.faceGroupCount} facegroup${result.faceGroupCount===1?'':'s'}${preserved?` • ${preserved} Nomad payload preserved`:''} • ${outcome}`;}
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

globalThis.__boxlabExportAs={version:VERSION,exportAs,buildGLB,verifyGLB,patchNomadFaceGroupGLB,get format(){return format;},get geometry(){return geometry;}};
