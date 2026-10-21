import {capturePaintExportObjects,preparePaintExportObjects,preparedPaintImage,preparedRoughnessImage,preparedMetalnessImage,preparedMetallicRoughnessImage,paintExportGeometryObject} from './paint-export.js?v=0.36.18.935';
// BoxLab .735 — native NOMAD handoff; regular OBJ/GLB exports remain available.
// GLB keeps BoxLab editable objects as separate named scene nodes for Nomad/3D handoff.
import * as THREE from 'three';
import {GLTFExporter} from 'three/addons/exporters/GLTFExporter.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {buildSceneOBJ,resolveExportMesh,safeOBJName} from './scene-obj-export-core.js?v=0.36.18.921';

import {buildNomadProjectWithMaps} from './nomad-packed-maps.js?v=0.36.18.935';

const VERSION='0.36.18.892';
const panel=document.querySelector('#exportAsPanel');
const nameInput=document.querySelector('#exportFileName');
const formatButtons=[...document.querySelectorAll('#exportFormat [data-export-format]')];
const geometryButtons=[...document.querySelectorAll('#exportGeometry [data-export-geometry]')];
const exportButton=document.querySelector('#exportAsBtn');
const shareButton=document.createElement('button');
shareButton.type='button';
shareButton.id='exportShareBtn';
shareButton.textContent='NOMAD';
shareButton.className='export-secondary';
exportButton?.insertAdjacentElement('afterend',shareButton);
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
  shareButton.textContent='NOMAD';
  shareButton.title='Export native Nomad Sculpt project (.nom)';
  if(note){note.textContent='';note.hidden=true;}
}
let nomadTemplatePromise=null;
async function buildNOM(sceneObjects,subd=false){
  if(!nomadTemplatePromise)nomadTemplatePromise=fetch(new URL('./templates/nomad-tube.nom',import.meta.url)).then(response=>{if(!response.ok)throw Error('Nomad template could not be loaded');return response.arrayBuffer();}).catch(error=>{nomadTemplatePromise=null;throw error;});
  return buildNomadProjectWithMaps(sceneObjects,nomadTemplatePromise,{subd,name:cleanName(nameInput?.value)});
}
async function exportNomad(){
  if(shareButton.disabled)return;
  const sceneObjects=objects();if(!sceneObjects.length){if(status)status.textContent='NOMAD • no visible editable objects';return;}
  shareButton.disabled=true;
  try{
    if(status)status.textContent='NOMAD • building scene…';
    const result=await buildNOM(sceneObjects,geometry==='subd'),mime='application/x-nomad-sculpt';
    downloadBlob(new Blob([result.bytes],{type:mime}),cleanName(nameInput?.value)+'.nom',60000);
    if(status)status.textContent=`NOMAD • ${result.count} object${result.count===1?'':'s'} • ${result.faces} faces${result.colourTextureObjects?` • colour images ${result.colourTextureObjects}/${result.count}`:''}${result.normalTextureObjects?` • normal maps ${result.normalTextureObjects}`:''}${result.emissiveTextureObjects?` • emissive maps ${result.emissiveTextureObjects}`:''}${result.roughnessTextureObjects?` • roughness maps ${result.roughnessTextureObjects}`:''}${result.metalnessTextureObjects?` • metalness maps ${result.metalnessTextureObjects}`:''}${result.displacementTextureObjects?` • displacement maps ${result.displacementTextureObjects}`:''}${result.uvObjects?` • UVs ${result.uvObjects}/${result.count}`:''} • open browser download, then Open In / Share → Nomad`;
  }catch(error){if(status)status.textContent=`NOMAD export failed • ${error?.message||error}`;}
  finally{shareButton.disabled=false;updateNote();}
}
function extension(){return format==='glb'?'glb':'obj';}
function filename(){return cleanName(nameInput?.value)+'.'+extension();}
function downloadBlob(blob,fileName,revokeAfter=1200){
  const url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download=fileName;document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),revokeAfter);
}

async function shareBlob(blob,fileName,mime){
  if(!(navigator.share&&typeof File!=='undefined'))return 'unavailable';
  const file=new File([blob],fileName,{type:mime});
  if(navigator.canShare&&!navigator.canShare({files:[file]}))return 'unavailable';
  try{
    await navigator.share({files:[file]});
    return 'shared';
  }catch(error){
    if(error?.name==='AbortError')return 'cancelled';
    throw error;
  }
}

async function saveBlob(blob,fileName,mime,{description=format==='glb'?'GLB 3D Model':'Wavefront OBJ',suffix=extension()}={}){
  if(typeof window.showSaveFilePicker==='function'){
    try{
      const handle=await window.showSaveFilePicker({
        suggestedName:fileName,
        types:[{description,accept:{[mime]:['.'+suffix]}}]
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
        await navigator.share({files:[file]});
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
function triangulateFace(mesh,face,preserveFaceWinding=false){
  if(face.length===3)return [[face[0],face[1],face[2]]];
  const normal=faceNormal(mesh,face),ax=Math.abs(normal.x),ay=Math.abs(normal.y),az=Math.abs(normal.z);
  const points=face.map(index=>{
    const v=mesh.vertices[index];
    if(ax>=ay&&ax>=az)return new THREE.Vector2(v.y,v.z);
    if(ay>=az)return new THREE.Vector2(v.x,v.z);
    return new THREE.Vector2(v.x,v.y);
  });
  const tris=THREE.ShapeUtils.triangulateShape(points,[]);
  // Earcut normalizes projected winding. Preview faces must retain the source
  // polygon's orientation; swap triangle indices, never positions or UV corners.
  if(preserveFaceWinding){
    const winding=Math.sign(THREE.ShapeUtils.area(points));
    for(const t of tris){
      const a=points[t[0]],b=points[t[1]],c=points[t[2]];
      const direction=Math.sign((b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x));
      if(winding&&direction&&direction!==winding)[t[1],t[2]]=[t[2],t[1]];
    }
  }
  return tris.length?tris.map(t=>t.map(local=>face[local])):[];
}
function normalizedFaceGroup(mesh,faceIndex){
  const value=mesh.faceGroups?.[faceIndex];
  return typeof value==='string'&&value.trim()?value.trim():null;
}
function topologySignature(mesh){
  if(!mesh?.faces)return'';
  return mesh.faces.map((face,index)=>`${face.join(',')}@${mesh.faceGroups?.[index]??''}`).join('|');
}
function geometrySignature(mesh){
  if(!mesh?.vertices)return'';
  return topologySignature(mesh)+'#'+mesh.vertices.map(vertex=>[vertex.x,vertex.y,vertex.z].map(value=>Number(value).toPrecision(12)).join(',')).join('|');
}
// Shared exact imported face-material guard for inspection and Base GLB export.
function faceMaterialAssignments(mesh,payload){
  const ids=payload?.faceMaterialIndices;
  return payload?.source==='glb'&&payload.version===1&&payload.materialTopologySignature===topologySignature(mesh)&&Array.isArray(ids)&&ids.length===mesh.faces.length&&ids.every(id=>Number.isInteger(id)&&id>=0&&payload.materialIndices?.includes(id)&&payload.materials?.[id])?ids:null;
}
// Temporary viewport inspection reuses the same triangulation/corner mapping.
// No import-fit restoration: preview positions stay in current BoxLab coordinates.
function buildUVPreviewGeometry(mesh,payload,{materials=false,faceIndices=false}={}){
  if(!Array.isArray(mesh?.vertices)||!mesh.vertices.length||!Array.isArray(mesh?.faces)||!mesh.faces.length||mesh.faces.some(f=>!Array.isArray(f))||payload?.version!==1||!['glb','boxlab'].includes(payload?.source)||payload.uvTopologySignature!==topologySignature(mesh))return null;
  const uvs=payload.uvCorners;if(!Array.isArray(uvs)||uvs.length!==mesh.faces.length)return null;
  let corners=0,triangles=0;
  for(let fi=0;fi<mesh.faces.length;fi++){
    const face=mesh.faces[fi],uv=uvs[fi];
    if(!Array.isArray(face)||face.length<3||new Set(face).size!==face.length||!Array.isArray(uv)||uv.length!==face.length)return null;
    corners+=face.length;triangles+=face.length-2;if(corners>20000)return null;
    if(face.some(id=>!Number.isInteger(id)||id<0||id>=mesh.vertices.length)||uv.some(p=>!Array.isArray(p)||p.length!==2||p.some(n=>!Number.isFinite(n)||!Number.isFinite(Math.fround(n)))))return null;
    for(const id of face){const v=mesh.vertices[id];if(!v||![v.x,v.y,v.z].every(n=>Number.isFinite(n)&&Number.isFinite(Math.fround(n))))return null;}
  }
  const faceMaterials=materials?faceMaterialAssignments(mesh,payload):null;
  if(materials&&!faceMaterials)return null;
  const built=editableToGeometry(mesh,{uvs,preserveUVSeams:true,preserveFaceWinding:true,faceMaterials,previewFaceIndices:faceIndices}),geometry=built.geometry;
  if(!built.uvRestored||geometry.index?.count!==triangles*3){geometry.dispose();return null;}
  return geometry;
}
function editableToGeometry(mesh,channels={}){
  const cornerUVs=channels?.uvs||null;
  const cornerTangents=channels?.tangents||null;
  const cornerColors=channels?.colors||null;
  const morphTargets=channels?.morphTargets||null;
  const morphWeights=Array.isArray(channels?.morphWeights)?channels.morphWeights:[];
  const importFit=channels?.importFit||null;
  const fitScale=Number(importFit?.scale||1);
  const fitCenter=Array.isArray(importFit?.center)&&importFit.center.length>=3?importFit.center:[0,0,0];
  const restoreFit=Number.isFinite(fitScale)&&Math.abs(fitScale)>1e-12;
  const buckets=new Map();
  for(let faceIndex=0;faceIndex<(mesh.faces||[]).length;faceIndex++){
    const face=mesh.faces[faceIndex];
    if(!Array.isArray(face)||face.length<3)continue;
    const group=normalizedFaceGroup(mesh,faceIndex);
    const key=channels.faceMaterials?(channels.materialFacegroups?JSON.stringify([group,channels.faceMaterials[faceIndex]]):channels.faceMaterials[faceIndex]):group??'__BOXLAB_UNGROUPED__';
    if(!buckets.has(key))buckets.set(key,{name:group,materialIndex:channels.faceMaterials?.[faceIndex],triangles:[]});
    for(const tri of triangulateFace(mesh,face,channels.preserveFaceWinding===true))buckets.get(key).triangles.push({tri,faceIndex});
  }

  let uvComplete=Array.isArray(cornerUVs)&&cornerUVs.length===mesh.faces.length;
  let tangentComplete=Array.isArray(cornerTangents)&&cornerTangents.length===mesh.faces.length;
  let colorComplete=Array.isArray(cornerColors)&&cornerColors.length===mesh.faces.length;
  let morphComplete=Array.isArray(morphTargets)&&morphTargets.length>0&&morphTargets.every(target=>Array.isArray(target?.position)&&target.position.length===mesh.faces.length);
  let colorItemSize=3;
  if(colorComplete){
    for(const faceColors of cornerColors||[]){
      for(const color of faceColors||[])if(Array.isArray(color)&&color.length>=4){colorItemSize=4;break;}
      if(colorItemSize===4)break;
    }
  }

  const positions=[],uvs=[],tangents=[],colors=[],indices=[],groups=[];
  const morphPositionArrays=Array.isArray(morphTargets)?morphTargets.map(()=>[]):[];
  const vertexMap=new Map();
  const collapseUVVertices=new Set();
  if(uvComplete&&!channels.preserveUVSeams){
    const variants=new Map();
    for(let faceIndex=0;faceIndex<mesh.faces.length;faceIndex++){
      const face=mesh.faces[faceIndex];
      for(let local=0;local<face.length;local++){
        const index=face[local],uv=cornerUVs?.[faceIndex]?.[local];
        if(!(Array.isArray(uv)&&uv.length>=2&&uv.slice(0,2).every(Number.isFinite)))continue;
        if(!variants.has(index))variants.set(index,new Set());
        variants.get(index).add(Number(uv[0]).toPrecision(8)+','+Number(uv[1]).toPrecision(8));
      }
    }
    for(const [index,set] of variants)if(set.size>=3)collapseUVVertices.add(index);
  }
  const keyNumber=value=>Number(value).toPrecision(12);
  const cornerData=(faceIndex,index)=>{
    const face=mesh.faces[faceIndex],local=face.indexOf(index);
    const uv=uvComplete?cornerUVs?.[faceIndex]?.[local]:null;
    const tangent=tangentComplete?cornerTangents?.[faceIndex]?.[local]:null;
    const color=colorComplete?cornerColors?.[faceIndex]?.[local]:null;
    const morphs=morphComplete?morphTargets.map(target=>target?.position?.[faceIndex]?.[local]):[];
    if(uvComplete&&!(Array.isArray(uv)&&uv.length>=2&&uv.slice(0,2).every(Number.isFinite)))uvComplete=false;
    if(tangentComplete&&!(Array.isArray(tangent)&&tangent.length>=4&&tangent.slice(0,4).every(Number.isFinite)))tangentComplete=false;
    if(colorComplete&&!(Array.isArray(color)&&color.length>=3&&color.slice(0,3).every(Number.isFinite)))colorComplete=false;
    if(morphComplete&&morphs.some(delta=>!(Array.isArray(delta)&&delta.length>=3&&delta.slice(0,3).every(Number.isFinite))))morphComplete=false;
    return{local,uv,tangent,color,morphs};
  };
  const cornerKey=(index,data)=>{
    const parts=[String(index)];
    const collapseUV=collapseUVVertices.has(index);
    if(uvComplete&&!collapseUV)parts.push('u:'+data.uv.slice(0,2).map(keyNumber).join(','));
    if(tangentComplete&&!collapseUV)parts.push('t:'+data.tangent.slice(0,4).map(keyNumber).join(','));
    if(colorComplete)parts.push('c:'+data.color.slice(0,colorItemSize).map(value=>keyNumber(Number.isFinite(value)?value:1)).join(','));
    if(morphComplete)data.morphs.forEach((delta,targetIndex)=>parts.push('m'+targetIndex+':'+delta.slice(0,3).map(keyNumber).join(',')));
    return parts.join('|');
  };
  const emitVertex=(index,data)=>{
    const key=cornerKey(index,data);
    const existing=vertexMap.get(key);
    if(existing!==undefined)return existing;
    const v=mesh.vertices[index];
    const next=positions.length/3;
    let px=v.x,py=v.y,pz=v.z;
    if(morphComplete&&morphWeights.length){
      data.morphs.forEach((delta,targetIndex)=>{
        const weight=Number(morphWeights[targetIndex]??0);
        if(weight&&Array.isArray(delta)){px-=delta[0]*weight;py-=delta[1]*weight;pz-=delta[2]*weight;}
      });
    }
    if(restoreFit){
      px=px/fitScale+Number(fitCenter[0]||0);
      py=py/fitScale+Number(fitCenter[1]||0);
      pz=pz/fitScale+Number(fitCenter[2]||0);
    }
    positions.push(px,py,pz);
    if(uvComplete)uvs.push(data.uv[0],data.uv[1]);
    if(tangentComplete)tangents.push(data.tangent[0],data.tangent[1],data.tangent[2],data.tangent[3]);
    if(colorComplete){
      colors.push(data.color[0],data.color[1],data.color[2]);
      if(colorItemSize===4)colors.push(Number.isFinite(data.color[3])?data.color[3]:1);
    }
    if(morphComplete)data.morphs.forEach((delta,targetIndex)=>{
      const inv=restoreFit?1/fitScale:1;
      morphPositionArrays[targetIndex].push(delta[0]*inv,delta[1]*inv,delta[2]*inv);
    });
    vertexMap.set(key,next);
    return next;
  };

  const previewFaces=channels.previewFaceIndices?[]:null,previewVertices=channels.previewFaceIndices?[]:null;
  for(const bucket of buckets.values()){
    const start=indices.length;
    for(const item of bucket.triangles){
      if(previewFaces){previewFaces.push(item.faceIndex);previewVertices.push(...item.tri);}
      for(const index of item.tri){
        const data=cornerData(item.faceIndex,index);
        indices.push(emitVertex(index,data));
      }
    }
    const count=indices.length-start;
    if(count)groups.push(channels.faceMaterials?{start,count,name:bucket.name,materialIndex:bucket.materialIndex}:{start,count,name:bucket.name});
  }

  const geometry=new THREE.BufferGeometry();
  if(previewFaces){geometry.userData.boxlabTriangleFaces=Object.freeze(previewFaces);geometry.userData.boxlabTriangleVertices=Object.freeze(previewVertices);}
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  geometry.setIndex(indices);
  const vertexCount=positions.length/3;
  const uvRestored=uvComplete&&uvs.length===vertexCount*2;
  const tangentsRestored=tangentComplete&&tangents.length===vertexCount*4;
  const vertexColorsRestored=colorComplete&&colors.length===vertexCount*colorItemSize;
  const morphTargetsRestored=morphComplete&&morphPositionArrays.every(values=>values.length===vertexCount*3);
  if(uvRestored)geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));
  if(tangentsRestored)geometry.setAttribute('tangent',new THREE.Float32BufferAttribute(tangents,4));
  if(vertexColorsRestored)geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,colorItemSize));
  if(morphTargetsRestored){
    geometry.morphAttributes.position=morphPositionArrays.map(values=>new THREE.Float32BufferAttribute(values,3));
    geometry.morphTargetsRelative=true;
  }
  groups.forEach((group,index)=>geometry.addGroup(group.start,group.count,index));
  geometry.userData.boxlabFaceGroups=groups.map(group=>group.name);
  if(channels.faceMaterials)geometry.userData.boxlabFaceMaterials=groups.map(group=>group.materialIndex);
  geometry.userData.boxlabUVRestored=uvRestored;
  geometry.userData.boxlabTangentsRestored=tangentsRestored;
  geometry.userData.boxlabVertexColorsRestored=vertexColorsRestored;
  geometry.userData.boxlabMorphTargetsRestored=morphTargetsRestored;
  geometry.userData.boxlabIndexed=true;
  geometry.userData.boxlabExportVertexCount=vertexCount;
  geometry.userData.boxlabExportIndexCount=indices.length;
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  return{geometry,groups,uvRestored,tangentsRestored,vertexColorsRestored,morphTargetsRestored,vertexCount,indexCount:indices.length};
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
  let passthroughObjects=0;const paintMaterials=new Map(),paintTextures=new Map();
  const addPaintTexture=image=>{
   if(paintTextures.has(image.choice.data))return paintTextures.get(image.choice.data);
   const appended=appendBinary(image.choice.data),bufferView=gltf.bufferViews.length;gltf.bufferViews.push({buffer:0,...appended});
   const imageIndex=gltf.images.length;gltf.images.push({name:image.name,mimeType:image.choice.mime,bufferView});
   const sampler=gltf.samplers.length;gltf.samplers.push({wrapS:33071,wrapT:33071,magFilter:9729,minFilter:9729});
   const texture=gltf.textures.length;gltf.textures.push({source:imageIndex,sampler});paintTextures.set(image.choice.data,texture);return texture;
  };
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
    const targetCount=mesh.primitives?.[0]?.targets?.length||0;
    const activeWeights=Array.isArray(passthrough?.activeMorphWeights)&&passthrough.activeMorphWeights.length===targetCount?passthrough.activeMorphWeights:null;
    const weightSource=passthrough?.morphWeightSource||'none';
    if(weightSource==='node'){
      if(node&&activeWeights)node.weights=cloneJSON(activeWeights);
      else if(node&&Array.isArray(passthrough?.nodeWeights)&&targetCount===passthrough.nodeWeights.length)node.weights=cloneJSON(passthrough.nodeWeights);
      delete mesh.weights;
    }else if(weightSource==='mesh'){
      if(node)delete node.weights;
      if(activeWeights)mesh.weights=cloneJSON(activeWeights);
      else if(Array.isArray(passthrough?.meshWeights)&&targetCount===passthrough.meshWeights.length)mesh.weights=cloneJSON(passthrough.meshWeights);
    }else{
      if(node)delete node.weights;
      delete mesh.weights;
    }
    (mesh.primitives||[]).forEach((primitive,index)=>{
      primitive.extras=primitive.extras||{};
      const group=detail.groupIds?.[index]??index;
      primitive.extras.nomad={...(primitive.extras.nomad||{}),group};
    });

    if(detail.paintImage||detail.roughnessImage||detail.metalnessImage){
      const image=detail.paintImage,roughness=detail.scalarImage||detail.roughnessImage,metalness=!!detail.metalnessImage;
      const colourTexture=image?addPaintTexture(image):null,roughnessTexture=roughness?addPaintTexture(roughness):null;
      const materialKey=JSON.stringify([colourTexture,roughnessTexture,metalness]);let material=paintMaterials.get(materialKey);
      if(material===undefined){
       material=gltf.materials.length;gltf.materials.push({name:'BoxLab painted material',pbrMetallicRoughness:{...(image?{baseColorTexture:{index:colourTexture,texCoord:0}}:{}),...(roughness?{metallicRoughnessTexture:{index:roughnessTexture,texCoord:0}}:{}),baseColorFactor:[1,1,1,1],roughnessFactor:1,metallicFactor:metalness?1:0},alphaMode:'OPAQUE',doubleSided:false});paintMaterials.set(materialKey,material);
      }
      for(const primitive of mesh.primitives||[])primitive.material=material;
    }else if(passthrough?.materials?.length){
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
      if(detail.materialIndices){
        if(detail.materialIndices.length!==(mesh.primitives||[]).length||detail.materialIndices.some(id=>!Number.isInteger(id)||id<0||!passthrough.materials[id]))throw Error('GLB material slots no longer match exported primitives');
        (mesh.primitives||[]).forEach((primitive,index)=>primitive.material=materialBase+detail.materialIndices[index]);
      }else for(const primitive of mesh.primitives||[])primitive.material=materialIndex;
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
  if(sceneObjects.some(o=>o?.colourPaint||o?.roughnessPaint||o?.metalnessPaint)){sceneObjects=capturePaintExportObjects(sceneObjects);await preparePaintExportObjects(sceneObjects,{subd,packedScalars:true,owner:{topologySignature,buildUVPreviewGeometry}});}
  const root=new THREE.Group();
  root.name='BoxLab';
  let count=0,faceGroupCount=0,groupSlotCount=0,uvRestoredCount=0,tangentsRestoredCount=0,vertexColorsRestoredCount=0,morphTargetsRestoredCount=0;
  const objectDetails=[];
  try{
  sceneObjects.forEach((object,index)=>{
    const editable=resolveExportMesh(paintExportGeometryObject(object),subd);
    if(!editable?.vertices?.length||!editable?.faces?.length)return;
    const paintImage=preparedPaintImage(object),roughnessImage=preparedRoughnessImage(object),metalnessImage=preparedMetalnessImage(object),scalarImage=preparedMetallicRoughnessImage(object),passthrough=object.glbPassthrough||null;
    const multiMaterial=Array.isArray(passthrough?.materialIndices)&&new Set(passthrough.materialIndices).size>1;
    const materialFaces=multiMaterial&&!subd?faceMaterialAssignments(editable,passthrough):null;
    if(multiMaterial&&!materialFaces)throw Error('Multi-material GLB export requires matching Base face assignments. Reimport the original GLB with Split groups off; use Base geometry.');
    const topology=topologySignature(editable);
    const geometryState=geometrySignature(editable);
    const uvCompatible=!subd&&passthrough?.uvTopologySignature&&passthrough.uvTopologySignature===topology;
    const colorCompatible=!subd&&passthrough?.vertexColorTopologySignature&&passthrough.vertexColorTopologySignature===topology;
    const tangentCompatible=!subd&&passthrough?.tangentTopologySignature===topology&&passthrough?.tangentGeometrySignature===geometryState;
    const morphCompatible=!subd&&passthrough?.morphTopologySignature&&passthrough.morphTopologySignature===topology;
    const built=editableToGeometry(editable,{
      uvs:uvCompatible?passthrough.uvCorners:null,
      preserveFaceWinding:!!(paintImage||roughnessImage||metalnessImage),
      faceMaterials:materialFaces,materialFacegroups:!!materialFaces,
      preserveUVSeams:!!materialFaces||passthrough?.source==='boxlab',
      tangents:tangentCompatible?passthrough.tangentCorners:null,
      colors:colorCompatible?passthrough.vertexColorCorners:null,
      morphTargets:morphCompatible?passthrough.morphTargets:null,
      morphWeights:morphCompatible?passthrough.activeMorphWeights:null,
      importFit:passthrough?.boxlabImportFit||null
    }),geometry=built.geometry;
    if(!geometry.getAttribute('position')?.count)return;
    if(built.uvRestored)uvRestoredCount++;
    if(built.tangentsRestored)tangentsRestoredCount++;
    if(built.vertexColorsRestored)vertexColorsRestoredCount++;
    if(built.morphTargetsRestored)morphTargetsRestoredCount++;
    const uniqueNames=[],groupKeys=new Map();
    const groupIds=materialFaces?built.groups.map(group=>{
      const key=group.name??null;
      if(!groupKeys.has(key)){groupKeys.set(key,uniqueNames.length);uniqueNames.push(group.name||('FaceGroup '+(uniqueNames.length+1)));}
      return groupKeys.get(key);
    }):null;
    const sharedMaterial=sharedNomadMaterial();
    sharedMaterial.vertexColors=!!built.vertexColorsRestored;
    const materials=built.groups.map(()=>sharedMaterial);
    const node=new THREE.Mesh(geometry,materials.length===1?sharedMaterial:materials);
    if(built.morphTargetsRestored){
      const targetCount=geometry.morphAttributes?.position?.length||0;
      const preservedWeights=Array.isArray(passthrough?.activeMorphWeights)&&passthrough.activeMorphWeights.length===targetCount?passthrough.activeMorphWeights:Array.isArray(passthrough?.nodeWeights)&&passthrough.nodeWeights.length===targetCount?passthrough.nodeWeights:Array.isArray(passthrough?.meshWeights)&&passthrough.meshWeights.length===targetCount?passthrough.meshWeights:null;
      if(preservedWeights)node.morphTargetInfluences=[...preservedWeights];
    }
    node.name=safeOBJName(object.name,index);
    node.userData.boxlabObjectId=object.id;
    node.userData.boxlabRoundTripObject=true;
    node.userData.boxlabFaceGroupCount=materialFaces?new Set(built.groups.filter(group=>group.name).map(group=>group.name)).size:built.groups.filter(group=>group.name).length;
    node.userData.boxlabGroupSlotCount=built.groups.length;
    node.userData.boxlabUVRestored=!!built.uvRestored;
    node.userData.boxlabTangentsRestored=!!built.tangentsRestored;
    node.userData.boxlabVertexColorsRestored=!!built.vertexColorsRestored;
    node.userData.boxlabMorphTargetsRestored=!!built.morphTargetsRestored;
    faceGroupCount+=node.userData.boxlabFaceGroupCount;
    groupSlotCount+=node.userData.boxlabGroupSlotCount;
    objectDetails.push({
      name:node.name,
      faceGroups:node.userData.boxlabFaceGroupCount,
      groupSlots:node.userData.boxlabGroupSlotCount,
      groupNames:materialFaces?uniqueNames:built.groups.map((group,groupIndex)=>group.name||('FaceGroup '+(groupIndex+1))),
      groupIds,
      materialIndices:materialFaces?built.groups.map(group=>group.materialIndex):null,
      passthrough,paintImage,roughnessImage,metalnessImage,scalarImage,
      uvRestored:!!built.uvRestored,
      uvCompatible:!!uvCompatible,
      tangentsRestored:!!built.tangentsRestored,
      tangentCompatible:!!tangentCompatible,
      vertexColorsRestored:!!built.vertexColorsRestored,
      vertexColorCompatible:!!colorCompatible,
      morphTargetsRestored:!!built.morphTargetsRestored,
      morphCompatible:!!morphCompatible
    });
    root.add(node);count++;
  });
  if(!count)throw new Error('No editable geometry to export');
  const exporter=new GLTFExporter();
  let buffer=await exporter.parseAsync(root,{binary:true,onlyVisible:true});
  buffer=patchNomadFaceGroupGLB(buffer,objectDetails);

  const verification=await verifyGLB(buffer,count,groupSlotCount);
  globalThis.__boxlabNomadRoundTrip ||= {};
  globalThis.__boxlabNomadRoundTrip.lastAttributeExport={
    uv:{restored:uvRestoredCount,total:count},
    tangents:{restored:tangentsRestoredCount,total:count},
    vertexColors:{restored:vertexColorsRestoredCount,total:count},
    morphTargets:{restored:morphTargetsRestoredCount,total:count}
  };
  globalThis.__boxlabNomadRoundTrip.lastUVExport={restored:uvRestoredCount,total:count};
  return{buffer,count,faceGroupCount,groupSlotCount,uvRestoredCount,tangentsRestoredCount,vertexColorsRestoredCount,morphTargetsRestoredCount,objectDetails,verification};
  }finally{
  const retired=new Set();
  root.traverse(node=>{
    node.geometry?.dispose?.();
    for(const material of Array.isArray(node.material)?node.material:[node.material])if(material&&!retired.has(material)){retired.add(material);material.dispose?.();}
  });
  }
}

async function shareOpenIn(){
  const sceneObjects=objects();
  if(!sceneObjects.length){if(status)status.textContent='Share • no visible editable objects';return;}
  const subd=geometry==='subd',fileName=filename();
  shareButton.disabled=true;
  try{
    let blob,mime;
    if(format==='obj'){
      const result=buildSceneOBJ(sceneObjects,{subd,version:VERSION});
      blob=new Blob([result.content],{type:'model/obj'});mime='model/obj';
    }else{
      if(status)status.textContent='GLB share • building scene…';
      const result=await buildGLB(sceneObjects,subd);
      blob=new Blob([result.buffer],{type:'model/gltf-binary'});mime='model/gltf-binary';
    }
    const outcome=await shareBlob(blob,fileName,mime);
    if(outcome==='unavailable'){
      downloadBlob(blob,fileName);
      if(status)status.textContent='Share unavailable • file downloaded instead';
    }else if(status&&outcome!=='cancelled'){
      status.textContent=format==='glb'?'GLB ready • save to Files, then Share → Nomad Sculpt from Files':`${format.toUpperCase()} • Share / Open In complete`;
    }
  }catch(error){
    console.error('BoxLab Share / Open In failed',error);
    if(status)status.textContent=`Share failed • ${error?.message||error}`;
  }finally{
    shareButton.disabled=false;
  }
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
      if(status&&outcome!=='cancelled'){const painted=result.objectDetails.filter(item=>item.paintImage).length,roughness=result.objectDetails.filter(item=>item.roughnessImage).length,metalness=result.objectDetails.filter(item=>item.metalnessImage).length,preserved=result.objectDetails.filter(item=>item.passthrough?.source==='glb').length;status.textContent=`GLB verified • ${result.verification.objects} object${result.verification.objects===1?'':'s'} • ${result.faceGroupCount} facegroup${result.faceGroupCount===1?'':'s'}${painted?` • painted colour ${painted}`:''}${roughness?` • roughness maps ${roughness}`:''}${metalness?` • metalness maps ${metalness}`:''}${preserved?` • ${preserved} Nomad payload preserved`:''}${result.uvRestoredCount?` • UVs restored ${result.uvRestoredCount}/${result.count}`:''}${result.tangentsRestoredCount?` • tangents restored ${result.tangentsRestoredCount}/${result.count}`:''}${result.vertexColorsRestoredCount?` • vertex colours restored ${result.vertexColorsRestoredCount}/${result.count}`:''}${result.morphTargetsRestoredCount?` • layers restored ${result.morphTargetsRestoredCount}/${result.count}`:''} • ${outcome}`;}
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
shareButton?.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();exportNomad();});

setActive(formatButtons,'exportFormat',format);
setActive(geometryButtons,'exportGeometry',geometry);
updateNote();

globalThis.__boxlabExportAs={version:VERSION,exportAs,shareOpenIn,exportNomad,buildNOM,buildGLB,verifyGLB,patchNomadFaceGroupGLB,buildUVPreviewGeometry,topologySignature,geometrySignature,get format(){return format;},get geometry(){return geometry;}};
