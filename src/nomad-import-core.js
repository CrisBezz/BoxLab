import * as THREE from 'three';
import {EditableMesh} from './mesh.js?v=0.21.2';
import {meshTopologySignature} from './mesh-topology-signature.js?v=0.36.18.939';

// Independent browser reader of the NOM interchange layout documented by
// Hexanomad's nomad-link nom_file.py (08391c8e). No Python/Blender dependency.
// The existing export-template reader remains deliberately unchanged.
const MB=1024*1024,MAX_FILE=128*MB,MAX_ARRAYS=64*MB,MAX_ELEMENTS=500000;
const TYPES={f32vec3:[3,4,'getFloat32'],f32vec2:[2,4,'getFloat32'],i32vec4:[4,4,'getInt32'],u16:[1,2,'getUint16']};
const fail=message=>{throw Error('NOM '+message);};
function integer(value,label,max=Number.MAX_SAFE_INTEGER){
  if(!Number.isSafeInteger(value)||value<0||value>max)fail('invalid '+label);
  return value;
}
function range(offset,length,limit,label){
  integer(offset,label+' offset');integer(length,label+' length');
  if(offset>limit||length>limit-offset)fail(label+' outside file bounds');
}
export function decodeNomadLZ4(source,size){
  integer(size,'decoded block size',MAX_ARRAYS);
  const out=new Uint8Array(size);let read=0,write=0;
  const byte=()=>{if(read>=source.length)fail('truncated LZ4 block');return source[read++];};
  const length=n=>{if(n!==15)return n;let extra;do{extra=byte();n+=extra;if(n>size)fail('LZ4 length overflow');}while(extra===255);return n;};
  while(read<source.length){
    const token=byte(),literals=length(token>>>4);
    if(literals>source.length-read||literals>size-write)fail('LZ4 literal overflow');
    out.set(source.subarray(read,read+literals),write);read+=literals;write+=literals;
    if(read===source.length)break;
    const distance=byte()|(byte()<<8),match=length(token&15)+4;
    if(!distance||distance>write||match>size-write)fail('invalid LZ4 match');
    for(let i=0;i<match;i++)out[write+i]=out[write+i-distance];
    write+=match;
  }
  if(write!==size)fail('decoded LZ4 size mismatch');
  return out;
}
export function readNomadImport(input){
  const bytes=input instanceof Uint8Array?input:new Uint8Array(input);
  if(bytes.length<32||bytes.length>MAX_FILE)fail('file is empty, truncated or exceeds 128 MiB');
  const view=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);
  const u64=o=>{if(o+8>bytes.length)fail('truncated header');return integer(Number(view.getBigUint64(o,true)),'header integer');};
  let version,jo,jl,bo,bl;
  if(view.getUint32(0,true)===0x6d26a524){
    version=view.getUint32(4,true);jo=32;jl=u64(16);bo=jo+jl;bl=u64(24);
  }else if(new TextDecoder().decode(bytes.subarray(0,12))==='Nomad Sculpt'){
    if(bytes.length<72)fail('truncated header');
    version=view.getUint32(12,true);jo=u64(24);jl=u64(32);bo=u64(40);bl=u64(48);
    if(u64(16)!==bytes.length||jo<72)fail('invalid header size');
    const thumb=u64(56),dim=u64(64);
    if(thumb||dim){
      integer(dim,'thumbnail dimension',8192);range(thumb,dim*dim*4,bytes.length,'thumbnail');
      const end=thumb+dim*dim*4;
      if(!dim||thumb<72||thumb<jo+jl&&end>jo||thumb<bo+bl&&end>bo)fail('overlapping thumbnail');
    }
  }else fail('file signature is not recognised');
  if(version<1||version>7)fail('version '+version+' is not supported (expected 1–7)');
  range(jo,jl,bytes.length,'JSON');range(bo,bl,bytes.length,'binary');
  if(!jl||jl>16*MB||jo+jl>bo)fail('invalid JSON/binary sections');
  let json;try{json=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes.subarray(jo,jo+jl)));}catch{fail('scene JSON is invalid');}
  if(!json||typeof json!=='object'||Array.isArray(json))fail('scene document is invalid');
  const bin=bytes.subarray(bo,bo+bl);let allocated=0;
  const cache=new WeakMap();
  function array(node,name,type){
    const field=node?.[name];if(field==null)return null;
    if(typeof field!=='object'||Array.isArray(field))fail(name+' array descriptor is invalid');
    if(cache.has(field))return cache.get(field);
    if(Number.isSafeInteger(field.count)&&field.count>MAX_ELEMENTS)fail(name+' count exceeds 500,000; decimate in Nomad first');
    const [components,width,method]=TYPES[type],count=integer(field.count,name+' count',MAX_ELEMENTS);
    if(!count)return null;
    if(field.type!=null&&field.type!==type)fail(name+' has unexpected array type');
    const size=count*components*width;allocated+=size;if(allocated>MAX_ARRAYS)fail('decoded geometry exceeds 64 MiB');
    let data;
    if(field.only_zeros)data=new Uint8Array(size);
    else{
      const offset=field.offset,length=field.length;range(offset,length,bin.length,name);
      if(field.lz4){
        if(version<6)data=decodeNomadLZ4(bin.subarray(offset,offset+length),size);
        else{
          data=new Uint8Array(size);let cursor=offset,written=0;
          const chunks=new DataView(bin.buffer,bin.byteOffset,bin.byteLength);
          while(written<size){
            if(cursor+8>offset+length)fail('truncated '+name+' chunk header');
            const raw=chunks.getUint32(cursor,true),packed=chunks.getUint32(cursor+4,true);cursor+=8;
            if(!raw||!packed||raw>size-written||packed>offset+length-cursor)fail('invalid '+name+' chunk size');
            data.set(decodeNomadLZ4(bin.subarray(cursor,cursor+packed),raw),written);cursor+=packed;written+=raw;
          }
          if(cursor!==offset+length)fail('extra bytes in '+name+' compressed array');
        }
      }else{if(length!==size)fail(name+' byte count does not match its elements');data=bin.subarray(offset,offset+size);}
    }
    const values=new DataView(data.buffer,data.byteOffset,data.byteLength),result={count,components,get:(row,col=0)=>values[method]((row*components+col)*width,true)};
    cache.set(field,result);return result;
  }
  return{json,version,array};
}

export function parseNomadMeshes(input){
  const file=readNomadImport(input),{json,array}=file,warnings=new Set(),meshes=[];
  if(!Array.isArray(json.scene)||!Array.isArray(json.meshes))fail('scene/meshes collections are missing');
  let verticesTotal=0,facesTotal=0,nodes=0;
  function geometry(index,name){
    if(!Number.isInteger(index)||index<0||index>=json.meshes.length)fail(name+': invalid mesh index');
    const original=json.meshes[index];if(!original||typeof original!=='object')fail(name+': invalid mesh');
    let source=original;
    if(source.mesh_type==='triplanar'){
      if(!source.baked)fail(name+': save a validated polygon mesh in Nomad first (unbaked triplanar)');
      source=source.baked;
    }
    const active=source.multires_level??0,levels=source.multires_levels;
    if(levels!=null&&!Array.isArray(levels)||levels?.length&&(!Number.isInteger(active)||active<0||active>=levels.length))fail(name+': invalid active multires level');
    const level=levels?.[active],slots={...source};
    for(const key of ['faces','faces_uv','uvs','faces_group'])if(slots[key]==null&&level?.[key]!=null)slots[key]=level[key];
    const positions=array(slots,'vertices','f32vec3'),faces=array(slots,'faces','i32vec4');
    if(!positions||!faces)fail(name+': saved polygon topology is missing; disable compressed multires and save in Nomad');
    for(const [key,actual] of [['count_vertex',positions.count],['count_face',faces.count]])if(source[key]!=null&&source[key]!==actual)fail(name+': '+key+' does not match its array');
    const uvs=array(slots,'uvs','f32vec2'),uvFaces=array(slots,'faces_uv','i32vec4'),groups=array(slots,'faces_group','u16');
    if(!!uvs!==!!uvFaces||uvFaces&&uvFaces.count!==faces.count||groups&&groups.count!==faces.count)fail(name+': incomplete UV/facegroup channel');
    if(uvs&&source.count_uv!=null&&source.count_uv!==uvs.count)fail(name+': UV count does not match its array');
    if(source.layers?.length)warnings.add('sculpt layers flattened to saved shape');
    if(['colors','roughness','metalness','opacity','masks'].some(k=>source[k])||original.material!=null||json.images?.length)warnings.add('paint, materials, textures and masks are not imported yet');
    return{source,positions,faces,uvs,uvFaces,groups};
  }
  function walk(entries,parent,visible,depth){
    if(!Array.isArray(entries)||depth>128)fail('invalid or excessively deep scene tree');
    for(const node of entries){
      if(!node||typeof node!=='object'||Array.isArray(node)||++nodes>4096)fail('invalid or oversized scene tree');
      const name=String(node.name||'Nomad mesh'),matrix=new THREE.Matrix4();
      if(node.matrix!=null){
        if(!Array.isArray(node.matrix)||node.matrix.length!==16||node.matrix.some(v=>!Number.isFinite(v))||node.matrix[3]!==0||node.matrix[7]!==0||node.matrix[11]!==0||node.matrix[15]!==1)fail(name+': invalid affine transform');
        matrix.fromArray(node.matrix);
      }
      matrix.premultiply(parent);if(Math.abs(matrix.determinant())<1e-15)fail(name+': singular transform');
      const shown=visible&&node.visible!==false;
      if(node.mesh!=null){
        const g=geometry(node.mesh,name);
        // Repeat matrices are world-space save hints; they are not parent-local.
        if(node.repeats?.length)fail(name+': validate repeat instances in Nomad before importing');
        verticesTotal+=g.positions.count;facesTotal+=g.faces.count;
        if(verticesTotal>MAX_ELEMENTS||facesTotal>MAX_ELEMENTS||meshes.length>=512)fail('scene exceeds editable import limit (500,000 vertices/faces or 512 objects); decimate in Nomad');
        const vertices=Array.from({length:g.positions.count},(_,i)=>{
          const p=new THREE.Vector3(g.positions.get(i,0),g.positions.get(i,1),g.positions.get(i,2)).applyMatrix4(matrix);
          if(![p.x,p.y,p.z].every(Number.isFinite))fail(name+': non-finite position');return p;
        });
        const faces=[],faceGroups=[],cornerUVs=[],mirrored=matrix.determinant()<0;
        for(let fi=0;fi<g.faces.count;fi++){
          const fourth=g.faces.get(fi,3),triangle=fourth<0||fourth===g.faces.get(fi,2),face=Array.from({length:triangle?3:4},(_,j)=>g.faces.get(fi,j));
          if(new Set(face).size!==face.length||face.some(id=>id<0||id>=vertices.length))fail(name+': invalid polygon index');
          const uv=g.uvs?face.map((_,j)=>{
            const id=g.uvFaces.get(fi,j);if(id<0||id>=g.uvs.count)fail(name+': invalid UV index');
            const p=[g.uvs.get(id,0),g.uvs.get(id,1)];if(!p.every(Number.isFinite))fail(name+': non-finite UV');return p;
          }):null;
          if(mirrored){face.reverse();uv?.reverse();}
          const meta=g.groups?.get(fi)??0,id=meta&0x7fff;
          if(meta&0x8000)warnings.add('hidden faces imported visibly');
          const group=g.source.groups?.[id]?.name;
          faces.push(face);faceGroups.push(g.groups?(typeof group==='string'&&group.trim()?group.trim():'FaceGroup '+(id+1)):null);cornerUVs.push(uv);
        }
        const mesh=new EditableMesh(vertices,faces,null,faceGroups);
        const uvPayload=g.uvs?{version:1,source:'boxlab',uvTopologySignature:meshTopologySignature(mesh),uvCorners:cornerUVs}:null;
        meshes.push({mesh,name,visible:shown,polygonPreserved:true,cornerUVs,glbPassthrough:uvPayload});
      }else if(node.light!=null||node.camera!=null)warnings.add('scene lights/cameras omitted');
      if(node.children!=null)walk(node.children,matrix,shown,depth+1);
    }
  }
  walk(json.scene,new THREE.Matrix4(),true,0);
  if(!meshes.length)fail('contains no saved polygon meshes');
  return{meshes,version:file.version,warnings:[...warnings]};
}
