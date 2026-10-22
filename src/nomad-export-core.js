import {preparedPaintImage,preparedRoughnessImage,preparedMetalnessImage,paintExportGeometryObject} from './paint-export.js?v=0.36.18.938';
import {nomadDisplacementMap} from './nomad-displacement-map.js?v=0.36.18.892';
import {uvImageSurfaceSource,uvImageMaterialSource} from './uv-image-surface-preview.js?v=0.36.18.892';
import {embeddedUVImage} from './uv-image-preview.js?v=0.36.18.892';
// NOM container/header, field and scene-node conventions adapted from CrisBezz/
// MeshUtilz-Sweep-Lab balloon-v0.6, commit 18e72a6bf964974591038345d68c2196a18f6af2:
// src/nomadBalloonExport.js + nomadBalloonExport097.js; validated donor copied intact.
// BoxLab adapter writes editable polygon meshes, not MeshUtilz procedural Tubes.
import * as THREE from 'three';
import {resolveExportMesh,safeOBJName} from './scene-obj-export-core.js?v=0.36.18.921';
const enc=new TextEncoder(),dec=new TextDecoder(),clone=value=>structuredClone(value);
const DATA_FIELDS=['vertices','uvs','faces','faces_uv','faces_group','normals','colors','materials'];
const u64=(dv,o)=>Number(dv.getBigUint64(o,true)),w64=(dv,o,n)=>dv.setBigUint64(o,BigInt(n),true);
export function readNomadProject(input){
 const bytes=input instanceof Uint8Array?input:new Uint8Array(input);
 if(bytes.length<56||dec.decode(bytes.subarray(0,12))!=='Nomad Sculpt')throw Error('Invalid Nomad template/header');
 const dv=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength),size=u64(dv,16),jo=u64(dv,24),jl=u64(dv,32),bo=u64(dv,40),bl=u64(dv,48);
 if(![size,jo,jl,bo,bl].every(Number.isSafeInteger)||size!==bytes.length||jo<56||jo+jl>bo||bo+bl!==size)throw Error('Invalid Nomad section bounds');
 const json=JSON.parse(dec.decode(bytes.subarray(jo,jo+jl)));
 return {bytes,jo,json,bin:bytes.subarray(bo,bo+bl)};
}
function offsetFields(value,delta){
 if(!value||typeof value!=='object')return;
 if(Number.isFinite(value.offset)&&Number.isFinite(value.length))value.offset+=delta;
 for(const child of Object.values(value))offsetFields(child,delta);
}
function fieldLike(seed,type,count,offset,length){return {...(seed?clone(seed):{}),type,count,offset,length,lz4:false,only_zeros:false};}
function findNode(nodes,meshIndex=0){for(const node of nodes||[]){if(node.mesh===meshIndex)return node;const found=findNode(node.children,meshIndex);if(found)return found;}return null;}
function makeNode(proto,name,index){
 const node=clone(proto);Object.assign(node,{name,mesh:index,matrix:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],transform_reset:false,selected:false,selected_main:false,node_collapse:true,lock:false,children:[],visible:true});delete node.hid;delete node.group;return node;
}
function faceNormal(vertices,face){const n=new THREE.Vector3();for(let i=0;i<face.length;i++){const a=vertices[face[i]],b=vertices[face[(i+1)%face.length]];n.x+=(a.y-b.y)*(a.z+b.z);n.y+=(a.z-b.z)*(a.x+b.x);n.z+=(a.x-b.x)*(a.y+b.y);}return n;}
function exportFaces(mesh,cornerUVs=null){
 const faces=[],groups=[],uvs=[],uvFaces=[],uvIndices=new Map();
 mesh.faces.forEach((face,fi)=>{
  if(!Array.isArray(face)||face.length<3||new Set(face).size!==face.length||face.some(i=>!Number.isInteger(i)||i<0||i>=mesh.vertices.length))throw Error('Invalid polygon indices');
  const n=faceNormal(mesh.vertices,face);if(n.lengthSq()<1e-20)throw Error('Degenerate polygon cannot export to Nomad');
  let polys;
  if(face.length<=4)polys=[face];
  else {
   const drop=Math.abs(n.x)>Math.abs(n.y)?Math.abs(n.x)>Math.abs(n.z)?'x':'z':Math.abs(n.y)>Math.abs(n.z)?'y':'z';
   const points=face.map(i=>{const p=mesh.vertices[i];return drop==='x'?new THREE.Vector2(p.y,p.z):drop==='y'?new THREE.Vector2(p.x,p.z):new THREE.Vector2(p.x,p.y);});
   polys=THREE.ShapeUtils.triangulateShape(points,[]).map(tri=>tri.map(i=>face[i]));
   if(polys.length!==face.length-2)throw Error('N-gon could not be triangulated');
   polys.forEach(tri=>{if(faceNormal(mesh.vertices,tri).dot(n)<0)[tri[1],tri[2]]=[tri[2],tri[1]];});
  }
  for(const poly of polys){
   const quad=poly.length===3?[...poly,poly[2]]:[...poly];faces.push(quad);groups.push(mesh.faceGroups?.[fi]?.trim?.()||'Main');
   if(cornerUVs)uvFaces.push(quad.map(vi=>{
    const uv=cornerUVs[fi][face.indexOf(vi)],key=vi+'|'+uv[0]+'|'+uv[1];
    if(!uvIndices.has(key)){uvIndices.set(key,uvs.length);uvs.push(uv);}
    return uvIndices.get(key);
   }));
  }
 });return {faces,groups,uvs,uvFaces};
}
function meshPart(mesh,name,donor,cornerUVs=null){
 if(mesh.vertices.some(v=>![v.x,v.y,v.z].every(n=>Number.isFinite(n)&&Number.isFinite(Math.fround(n)))))throw Error('Non-finite mesh coordinates');
 const {faces,groups,uvs,uvFaces}=exportFaces(mesh,cornerUVs),vcount=mesh.vertices.length,uvcount=cornerUVs?uvs.length:vcount,fcount=faces.length,normals=mesh.vertices.map(()=>new THREE.Vector3());
 mesh.faces.forEach(face=>{const n=faceNormal(mesh.vertices,face);face.forEach(i=>normals[i].add(n));});normals.forEach(n=>n.normalize());
 const parts=[],fields={},sizes=[['vertices','f32vec3',vcount,12],['normals','f32vec3',vcount,12],['uvs','f32vec2',uvcount,8],['faces','i32vec4',fcount,16],['faces_uv','i32vec4',fcount,16],['faces_group','u16',fcount,2]];
 let offset=0;for(const [key,type,count,stride] of sizes){const bytes=new Uint8Array(count*stride);fields[key]=fieldLike(donor[key],type,count,offset,bytes.length);parts.push(bytes);offset+=bytes.length;}
 const views=Object.fromEntries(sizes.map(([key],i)=>[key,new DataView(parts[i].buffer)]));
 mesh.vertices.forEach((p,i)=>{for(const [j,axis] of ['x','y','z'].entries()){views.vertices.setFloat32(i*12+j*4,p[axis],true);views.normals.setFloat32(i*12+j*4,normals[i][axis],true);}});
 if(cornerUVs)uvs.forEach((uv,i)=>uv.forEach((value,j)=>views.uvs.setFloat32(i*8+j*4,value,true)));
 const names=[...new Set(groups)];if(names.length>65536)throw Error('Too many Nomad facegroups');const slots=new Map(names.map((n,i)=>[n,i]));
 faces.forEach((face,i)=>{face.forEach((vi,j)=>{views.faces.setInt32(i*16+j*4,vi,true);views.faces_uv.setInt32(i*16+j*4,cornerUVs?uvFaces[i][j]:vi,true);});views.faces_group.setUint16(i*2,slots.get(groups[i]),true);});
 const out=clone(donor);for(const key of Object.keys(out))if(key.startsWith('config_'))delete out[key];delete out.mesh_type;for(const key of DATA_FIELDS)delete out[key];
 Object.assign(out,fields,{name,count_vertex:vcount,count_uv:uvcount,count_face:fcount,index_group:0,groups:names.map((name,i)=>({name,color:clone(donor.groups?.[i%Math.max(1,donor.groups?.length||0)]?.color||[.5,.5,.5])})),symmetry_x:false,symmetry_y:false,symmetry_z:false});
 const bin=new Uint8Array(offset);let at=0;for(const part of parts){bin.set(part,at);at+=part.length;}return {mesh:out,bin};
}
// Native colour-image convention observed in the user's textured Nomad donor:
// SHA256 ab3d9293d51d0597cdd6b17439112378e11a486c2898bc72282686a849dcfd6f.
// Raw encoded bytes, image {offset,length,type}, material.textures.color.index.
function nativeColourSource(payload){
 const used=Array.isArray(payload?.materialIndices)?payload.materialIndices:[];
 if(!used.some(id=>payload.materials?.[id]?.pbrMetallicRoughness?.baseColorTexture))return null;
 const source=uvImageSurfaceSource(payload,{maxBytes:24*1024*1024});
 if(!source)throw Error('NOMAD colour textures require one opaque embedded PNG/JPEG material with UV0; use GLB for other materials');
 const pbr=payload.materials[source.choice.materialIndex].pbrMetallicRoughness;
 if([pbr.roughnessFactor??1,pbr.metallicFactor??1].some(v=>!Number.isFinite(v)||v<0||v>1))throw Error('NOMAD material factors are invalid');
 if((source.sampler.wrapS??10497)!==10497||(source.sampler.wrapT??10497)!==10497||(source.sampler.magFilter??9729)!==9729||(source.sampler.minFilter??9987)!==9987)throw Error('NOMAD colour textures currently require repeat wrapping and default linear mipmap filtering; use GLB for other samplers');
 return source;
}
export function nativeMaterialMaps(payload){
 const displacement=nomadDisplacementMap(payload),colour=nativeColourSource(payload),used=Array.isArray(payload?.materialIndices)?payload.materialIndices:[];
 const extra=used.some(id=>payload.materials?.[id]?.normalTexture||payload.materials?.[id]?.emissiveTexture||payload.materials?.[id]?.pbrMetallicRoughness?.metallicRoughnessTexture);
 if(!colour&&!extra&&!displacement)return null;
 const source=uvImageMaterialSource(payload);if(!source)throw Error('NOMAD image maps require one opaque material; use GLB for other materials');
 const material=source.material,pbr=material.pbrMetallicRoughness||{};
 if([pbr.roughnessFactor??1,pbr.metallicFactor??1].some(v=>!Number.isFinite(v)||v<0||v>1))throw Error('NOMAD material factors are invalid');
 const maps={};if(colour)maps.color=colour;if(displacement)maps.displacement=displacement;
 for(const [slot,info] of [['normal',material.normalTexture],['emissive',material.emissiveTexture],['packed',pbr.metallicRoughnessTexture]]){
  if(!info)continue;
  const choice=embeddedUVImage(payload,info,{maxBytes:(slot==='packed'?8:24)*1024*1024});if(!choice||Object.keys(info.extensions||{}).length)throw Error('NOMAD '+slot+' map requires an embedded PNG/JPEG UV0 image without transforms');
  const texture=payload.textures[info.index],sampler=texture.sampler===undefined?{}:Number.isInteger(texture.sampler)&&texture.sampler>=0?payload.samplers?.[texture.sampler]:null;
  if(!sampler||(sampler.wrapS??10497)!==10497||(sampler.wrapT??10497)!==10497||(sampler.magFilter??9729)!==9729||(sampler.minFilter??9987)!==9987)throw Error('NOMAD '+slot+' map requires default repeat/linear mipmap sampling');
  maps[slot]={choice};
 }
 const normalScale=material.normalTexture?.scale??1,emissiveFactor=material.emissiveFactor??[0,0,0];
 if(!Number.isFinite(normalScale)||!Number.isFinite(Math.fround(normalScale))||normalScale<0||!Array.isArray(emissiveFactor)||emissiveFactor.length!==3||emissiveFactor.some(v=>!Number.isFinite(v)||v<0||v>1))throw Error('NOMAD normal/emissive factors are invalid');
 return {...source,maps,normalScale,emissiveFactor};
}
function nativeTexture(index,name){return {index,name,magFilter:'auto',minFilter:'auto',offset:[0,0],projection:'auto',rotation:0,scale:[1,1],triplanar_hardness:[.8999999761581421,.8999999761581421,.8999999761581421],triplanar_world:true,wrapS:'repeat',wrapT:'repeat'};}
// Native texture names are export-local asset labels. Different embedded images
// must not advertise the same name; equal images may keep their existing aliases.
function createNativeTextureNames(){
 const used=new Map(),key=name=>name.normalize('NFC').toLowerCase();
 return (preferred,index)=>{
  const match=String(preferred).match(/^(.*?)(\.[^./\\]+)?$/s),stem=match[1],extension=match[2]||'';let name=String(preferred),suffix=2;
  while(used.has(key(name))&&used.get(key(name))!==index)name=stem+' '+(suffix++)+extension;
  used.set(key(name),index);return name;
 };
}
// Export-local identity only. Hashes select candidates; full byte equality decides
// sharing, including typed-array offsets. Never replace source/project resources.
export function createNomadImageIdentity(){
 const identities=new WeakMap(),buckets=new Map();
 return choice=>{
  const {data,mime}=choice;
  let known=identities.get(data);if(known?.has(mime))return known.get(mime);
  let hash=2166136261;for(let i=0;i<data.length;i++)hash=Math.imul(hash^data[i],16777619)>>>0;
  const key=mime+':'+data.length+':'+hash,candidates=buckets.get(key)||[];
  let canonical=candidates.find(c=>{for(let i=0;i<data.length;i++)if(c.data[i]!==data[i])return false;return true;});
  if(!canonical){canonical={data,mime};candidates.push(canonical);buckets.set(key,candidates);}
  if(!known){known=new Map();identities.set(data,known);}known.set(mime,canonical);
  return canonical;
 };
}
export function buildNomadProject(objects,templateBytes,{subd=false,name='BoxLab',topologySignature=globalThis.__boxlabExportAs?.topologySignature,packedMaps=new Map()}={}){
 const base=readNomadProject(templateBytes),donor=base.json.meshes?.[0];if(!donor?.vertices)throw Error('Nomad donor mesh is missing');
 const project=clone(base.json),parts=[],proto=findNode(base.json.scene)||{};project.meshes=[];
 const group={name,group:0,selected:true,selected_main:true,children:[],visible:true,node_collapse:false,lock:false};let offset=0,vertices=0,faces=0,uvObjects=0,colourTextureObjects=0,normalTextureObjects=0,emissiveTextureObjects=0,roughnessTextureObjects=0,metalnessTextureObjects=0,displacementTextureObjects=0,imageBytes=0;
 const images=[],imageIndices=new Map(),imageIdentity=createNomadImageIdentity(),textureName=createNativeTextureNames();
 for(const [index,object] of (objects||[]).entries()){
  if(object?.kind==='reference'||object?.visible===false)continue;
  const editable=resolveExportMesh(paintExportGeometryObject(object),subd);if(!editable?.vertices?.length||!editable?.faces?.length)continue;
  const payload=object.glbPassthrough,stored=payload?.uvCorners;let cornerUVs=null;
  if(Array.isArray(stored)&&stored.some(Boolean)){
   if(subd||typeof topologySignature!=='function'||!payload.uvTopologySignature||payload.uvTopologySignature!==topologySignature(editable))throw Error('NOMAD UV export requires matching Base geometry; disable evaluated modifiers or undo topology edits');
   if(stored.length!==editable.faces.length||stored.some((uv,fi)=>!Array.isArray(uv)||uv.length!==editable.faces[fi].length||uv.some(p=>!Array.isArray(p)||p.length!==2||p.some(v=>!Number.isFinite(v)||!Number.isFinite(Math.fround(v))))))throw Error('NOMAD UV channel is incomplete or invalid');
   cornerUVs=stored;uvObjects++;
  }
  const paint=preparedPaintImage(object),roughness=preparedRoughnessImage(object),metalness=preparedMetalnessImage(object),source=(paint||roughness||metalness)?{factor:[1,1,1,1],material:{pbrMetallicRoughness:{roughnessFactor:1,metallicFactor:metalness?1:0}},maps:{...(paint?{color:paint}:{}),...(roughness?{roughness}:{}),...(metalness?{metalness}:{})}}:nativeMaterialMaps(payload);let materialIndex=null;
  if(source){
   if(!cornerUVs)throw Error('NOMAD image maps require a complete matching Base UV channel');
   const material=clone(base.json.materials?.[0]||{});material.textures={};
   const maps={...source.maps};
   if(maps.packed){
    const prepared=packedMaps.get(maps.packed.choice.data);
    if(!prepared)throw Error('NOMAD packed roughness/metalness maps need browser conversion; use File → NOMAD');
    for(const slot of ['roughness','metalness']){
     const choice=prepared[slot]?.choice;
     if(!(choice?.data instanceof Uint8Array)||!choice.data.length||choice.data.length>8*1024*1024||choice.mime!=='image/png'||![137,80,78,71,13,10,26,10].every((b,i)=>choice.data[i]===b))throw Error('NOMAD converted '+slot+' image is invalid or exceeds 8 MB');
     maps[slot]=prepared[slot];
    }
    delete maps.packed;
   }
   for(const [slot,map] of Object.entries(maps)){
    const choice=map.choice,image=imageIdentity(choice);let imageIndex=imageIndices.get(image);
    if(imageIndex===undefined){
     imageBytes+=choice.data.length;if(imageBytes>24*1024*1024)throw Error('NOMAD embedded images exceed 24 MB');
     const aligned=Math.ceil(offset/4)*4;if(aligned>offset){parts.push(new Uint8Array(aligned-offset));offset=aligned;}
     imageIndex=images.length;imageIndices.set(image,imageIndex);
     images.push({length:choice.data.length,offset,type:choice.mime});parts.push(choice.data);offset+=choice.data.length;
    }
    material.textures[slot]=nativeTexture(imageIndex,textureName(String(map.name||payload.images?.[choice.imageIndex]?.definition?.name||(slot+' '+(imageIndex+1)+(choice.mime==='image/png'?'.png':'.jpg'))),imageIndex));
   }
   const aligned=Math.ceil(offset/4)*4;if(aligned>offset){parts.push(new Uint8Array(aligned-offset));offset=aligned;}
   material.factorColor=[...source.factor.slice(0,3)];material.color=source.maps.color?[1,1,1]:[...source.factor.slice(0,3)];material.opacity=1;material.factorOpacity=1;material.material_type='opaque';
   const pbr=source.material.pbrMetallicRoughness||{};
   material.roughness=Number.isFinite(pbr.roughnessFactor)?pbr.roughnessFactor:1;material.metalness=Number.isFinite(pbr.metallicFactor)?pbr.metallicFactor:1;
   if(maps.roughness){material.factorRoughness=pbr.roughnessFactor??1;roughnessTextureObjects++;}
   if(maps.metalness){material.factorMetalness=pbr.metallicFactor??1;metalnessTextureObjects++;}
   if(source.maps.normal){material.factorNormal=source.normalScale;material.normal_neg_y=false;normalTextureObjects++;}
   if(source.maps.emissive){material.factorEmissive=[...source.emissiveFactor];material.factorEmissiveStrength=1;emissiveTextureObjects++;}
   if(maps.displacement){Object.assign(material,maps.displacement.settings);Object.assign(material.textures.displacement,{projection:maps.displacement.projection,triplanar_hardness:[...maps.displacement.hardness],triplanar_world:maps.displacement.world});displacementTextureObjects++;}
   if(source.maps.color)colourTextureObjects++;
   materialIndex=project.materials.length;project.materials.push(material);
  }
  const part=meshPart(editable,safeOBJName(object.name,index),donor,cornerUVs);if(materialIndex!==null)part.mesh.material=materialIndex;
  offsetFields(part.mesh,offset);offset+=part.bin.length;
  group.children.push(makeNode(proto,part.mesh.name,project.meshes.length));project.meshes.push(part.mesh);parts.push(part.bin);vertices+=part.mesh.count_vertex;faces+=part.mesh.count_face;
 }
 if(!project.meshes.length)throw Error('No visible editable meshes to export');project.scene=[group];if(images.length)project.images=images;
 const json=enc.encode(JSON.stringify(project)),bo=Math.ceil((base.jo+json.length)/8)*8,out=new Uint8Array(bo+offset);out.set(base.bytes.subarray(0,base.jo));out.set(json,base.jo);let at=bo;for(const part of parts){out.set(part,at);at+=part.length;}
 const dv=new DataView(out.buffer);if(images.length)dv.setUint32(12,7,true);w64(dv,16,out.length);w64(dv,24,base.jo);w64(dv,32,json.length);w64(dv,40,bo);w64(dv,48,offset);
 const parsed=readNomadProject(out);for(const mesh of parsed.json.meshes)for(const key of ['vertices','normals','uvs','faces','faces_uv','faces_group']){const f=mesh[key];if(f.offset<0||f.offset+f.length>parsed.bin.length)throw Error('Nomad field bounds check failed');}
 for(const image of images)if(image.offset<0||image.offset+image.length>parsed.bin.length)throw Error('Nomad image bounds check failed');
 return {bytes:out,count:project.meshes.length,vertices,faces,uvObjects,colourTextureObjects,normalTextureObjects,emissiveTextureObjects,roughnessTextureObjects,metalnessTextureObjects,displacementTextureObjects,facegroups:project.meshes.reduce((n,m)=>n+m.groups.length,0)};
}
