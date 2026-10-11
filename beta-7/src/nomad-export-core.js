// NOM container/header, field and scene-node conventions adapted from CrisBezz/
// MeshUtilz-Sweep-Lab balloon-v0.6, commit 18e72a6bf964974591038345d68c2196a18f6af2:
// src/nomadBalloonExport.js + nomadBalloonExport097.js; validated donor copied intact.
// BoxLab adapter writes editable polygon meshes, not MeshUtilz procedural Tubes.
import * as THREE from 'three';
import {resolveExportMesh,safeOBJName} from './scene-obj-export-core.js?v=0.36.18.741';
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
function exportFaces(mesh){
 const faces=[],groups=[];
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
  for(const poly of polys){faces.push(poly.length===3?[...poly,poly[2]]:[...poly]);groups.push(mesh.faceGroups?.[fi]?.trim?.()||'Main');}
 });return {faces,groups};
}
function meshPart(mesh,name,donor){
 if(mesh.vertices.some(v=>![v.x,v.y,v.z].every(n=>Number.isFinite(n)&&Number.isFinite(Math.fround(n)))))throw Error('Non-finite mesh coordinates');
 const {faces,groups}=exportFaces(mesh),vcount=mesh.vertices.length,fcount=faces.length,normals=mesh.vertices.map(()=>new THREE.Vector3());
 mesh.faces.forEach(face=>{const n=faceNormal(mesh.vertices,face);face.forEach(i=>normals[i].add(n));});normals.forEach(n=>n.normalize());
 const parts=[],fields={},sizes=[['vertices','f32vec3',vcount,12],['normals','f32vec3',vcount,12],['uvs','f32vec2',vcount,8],['faces','i32vec4',fcount,16],['faces_uv','i32vec4',fcount,16],['faces_group','u16',fcount,2]];
 let offset=0;for(const [key,type,count,stride] of sizes){const bytes=new Uint8Array(count*stride);fields[key]=fieldLike(donor[key],type,count,offset,bytes.length);parts.push(bytes);offset+=bytes.length;}
 const views=Object.fromEntries(sizes.map(([key],i)=>[key,new DataView(parts[i].buffer)]));
 mesh.vertices.forEach((p,i)=>{for(const [j,axis] of ['x','y','z'].entries()){views.vertices.setFloat32(i*12+j*4,p[axis],true);views.normals.setFloat32(i*12+j*4,normals[i][axis],true);}});
 const names=[...new Set(groups)];if(names.length>65536)throw Error('Too many Nomad facegroups');const slots=new Map(names.map((n,i)=>[n,i]));
 faces.forEach((face,i)=>{face.forEach((vi,j)=>{views.faces.setInt32(i*16+j*4,vi,true);views.faces_uv.setInt32(i*16+j*4,vi,true);});views.faces_group.setUint16(i*2,slots.get(groups[i]),true);});
 const out=clone(donor);for(const key of Object.keys(out))if(key.startsWith('config_'))delete out[key];delete out.mesh_type;for(const key of DATA_FIELDS)delete out[key];
 Object.assign(out,fields,{name,count_vertex:vcount,count_uv:vcount,count_face:fcount,index_group:0,groups:names.map((name,i)=>({name,color:clone(donor.groups?.[i%Math.max(1,donor.groups?.length||0)]?.color||[.5,.5,.5])})),symmetry_x:false,symmetry_y:false,symmetry_z:false});
 const bin=new Uint8Array(offset);let at=0;for(const part of parts){bin.set(part,at);at+=part.length;}return {mesh:out,bin};
}
export function buildNomadProject(objects,templateBytes,{subd=false,name='BoxLab'}={}){
 const base=readNomadProject(templateBytes),donor=base.json.meshes?.[0];if(!donor?.vertices)throw Error('Nomad donor mesh is missing');
 const project=clone(base.json),parts=[],proto=findNode(base.json.scene)||{};project.meshes=[];
 const group={name,group:0,selected:true,selected_main:true,children:[],visible:true,node_collapse:false,lock:false};let offset=0,vertices=0,faces=0;
 for(const [index,object] of (objects||[]).entries()){
  if(object?.kind==='reference'||object?.visible===false)continue;
  const editable=resolveExportMesh(object,subd);if(!editable?.vertices?.length||!editable?.faces?.length)continue;
  const part=meshPart(editable,safeOBJName(object.name,index),donor);offsetFields(part.mesh,offset);offset+=part.bin.length;
  group.children.push(makeNode(proto,part.mesh.name,project.meshes.length));project.meshes.push(part.mesh);parts.push(part.bin);vertices+=part.mesh.count_vertex;faces+=part.mesh.count_face;
 }
 if(!parts.length)throw Error('No visible editable meshes to export');project.scene=[group];
 const json=enc.encode(JSON.stringify(project)),bo=Math.ceil((base.jo+json.length)/8)*8,out=new Uint8Array(bo+offset);out.set(base.bytes.subarray(0,base.jo));out.set(json,base.jo);let at=bo;for(const part of parts){out.set(part,at);at+=part.length;}
 const dv=new DataView(out.buffer);w64(dv,16,out.length);w64(dv,24,base.jo);w64(dv,32,json.length);w64(dv,40,bo);w64(dv,48,offset);
 const parsed=readNomadProject(out);for(const mesh of parsed.json.meshes)for(const key of ['vertices','normals','uvs','faces','faces_uv','faces_group']){const f=mesh[key];if(f.offset<0||f.offset+f.length>parsed.bin.length)throw Error('Nomad field bounds check failed');}
 return {bytes:out,count:parts.length,vertices,faces,facegroups:project.meshes.reduce((n,m)=>n+m.groups.length,0)};
}
