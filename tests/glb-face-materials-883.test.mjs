import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {createBoxUV,rotateImportedUV} from '../src/imported-uv-edit.js';
import {encodeProjectGLB,decodeProjectGLB} from '../src/project-glb-resources.js';
import {glbOwnerRuntime,decodeGLB} from './helpers/glb-owner-runtime.mjs';
const history={capture:()=>({}),checkpointSnapshot:()=>true};
function fixture(ex,id=1){
 const mesh=EditableMesh.cube(2);mesh.faceGroups=['Walls','Walls','Roof','Roof','Walls','Roof'];const object={id,name:'Two materials',mesh,settings:{}};assert(createBoxUV(object,mesh,ex.c.topologySignature,history).ok);
 object.glbPassthrough={...object.glbPassthrough,source:'glb',faceMaterialIndices:[1,0,1,0,1,0],materialTopologySignature:ex.c.topologySignature(mesh),materialIndices:[1,0],materials:[{name:'Same',pbrMetallicRoughness:{baseColorFactor:[.8,.2,.1,1]}},{name:'Same',pbrMetallicRoughness:{baseColorFactor:[.1,.3,.7,1]}}]};return object;
}
function accessor(decoded,id){
 const a=decoded.json.accessors[id],b=decoded.json.bufferViews[a.bufferView],components={SCALAR:1,VEC2:2,VEC3:3,VEC4:4}[a.type],types={5126:[4,'getFloat32'],5125:[4,'getUint32'],5123:[2,'getUint16'],5121:[1,'getUint8']},[size,read]=types[a.componentType],view=new DataView(decoded.bin.buffer,decoded.bin.byteOffset,decoded.bin.byteLength);
 return Array.from({length:a.count},(_,i)=>Array.from({length:components},(_,j)=>view[read]((b.byteOffset||0)+(a.byteOffset||0)+i*(b.byteStride||components*size)+j*size,true)));
}
function checkTriangles(ex,result,object,meshIndex=0){
 const decoded=decodeGLB(result.buffer),primitives=decoded.json.meshes[meshIndex].primitives,details=result.objectDetails[meshIndex],mesh=object.mesh,p=object.glbPassthrough;
 let triangles=0;
 for(let slot=0;slot<primitives.length;slot++){
  const prim=primitives[slot],pos=accessor(decoded,prim.attributes.POSITION),uv=accessor(decoded,prim.attributes.TEXCOORD_0),indices=accessor(decoded,prim.indices).flat();
  assert.deepEqual(decoded.json.materials[prim.material].pbrMetallicRoughness,p.materials[details.materialIndices[slot]].pbrMetallicRoughness);
  for(let i=0;i<indices.length;i+=3){
   const ids=indices.slice(i,i+3);assert(mesh.faces.some((face,fi)=>p.faceMaterialIndices[fi]===details.materialIndices[slot]&&ids.every(index=>face.some((vid,local)=>mesh.vertices[vid].toArray().every((v,j)=>Math.abs(v-pos[index][j])<1e-7)&&p.uvCorners[fi][local].every((v,j)=>Math.abs(v-uv[index][j])<1e-7)))));triangles++;
  }
 }
 assert.equal(triangles,12);
}
test('883 real GLB export splits facegroup/material combinations, preserves independent Nomad groups and every corner UV variant',async()=>{
 const ex=glbOwnerRuntime(),object=fixture(ex),before=JSON.stringify(object.mesh),payload=encodeProjectGLB(object.glbPassthrough),result=await ex.build([object]),{json}=decodeGLB(result.buffer);
 assert.equal(result.verification.pass,true);assert.equal(result.groupSlotCount,4);assert.equal(result.faceGroupCount,2);assert.deepEqual(json.meshes[0].extras.nomad.groups.map(g=>g.name),['Walls','Roof']);assert.deepEqual(json.meshes[0].primitives.map(p=>p.extras.nomad.group),[0,0,1,1]);assert.equal(new Set(json.meshes[0].primitives.map(p=>p.material)).size,2);checkTriangles(ex,result,object);assert.equal(JSON.stringify(object.mesh),before);assert.deepEqual(encodeProjectGLB(object.glbPassthrough),payload);
 const loaded=await ex.decode(result.buffer),entries=ex.c.importedMeshes(loaded);assert.equal(entries.length,1);assert.deepEqual([...new Set(entries[0].mesh.faceGroups)].sort(),['Roof','Walls']);
});
test('883 multi-object material bases and fresh project payloads keep distinct global IDs with duplicate material names',async()=>{
 const ex=glbOwnerRuntime(),a=fixture(ex,1),b=fixture(ex,2);b.glbPassthrough=decodeProjectGLB(encodeProjectGLB(b.glbPassthrough));const result=await ex.build([a,b]),{json}=decodeGLB(result.buffer);
 const sets=json.meshes.map(m=>new Set(m.primitives.map(p=>p.material)));assert([...sets[0]].every(id=>!sets[1].has(id)));checkTriangles(ex,result,a,0);checkTriangles(ex,result,b,1);assert.equal(result.verification.objects,2);assert.equal(result.verification.groupSlots,8);
});
test('883 exact textured GLB output preserves per-slot image bytes and core texture/sampler references after original patcher',async()=>{
 const ex=glbOwnerRuntime(),object=fixture(ex),p=object.glbPassthrough;
 p.materials=p.materials.map((m,i)=>({...m,pbrMetallicRoughness:{...m.pbrMetallicRoughness,baseColorTexture:{index:i},metallicRoughnessTexture:{index:1-i}},normalTexture:{index:i},occlusionTexture:{index:1-i},emissiveTexture:{index:i}}));
 p.textures=[{source:0,sampler:1},{source:1,sampler:0}];p.samplers=[{wrapS:33071},{wrapS:33648}];p.images=[0,1].map(i=>({definition:{mimeType:'image/png'},data:new Uint8Array([137,80,78,71,13,10,26,10,i])}));
 // Node cannot render/decode images. Keep the REAL verification loader by removing
 // texture references only from its private verification input; final bytes below
 // remain the untouched output of the real exporter+patcher.
 const verify=ex.c.verifyGLB;ex.c.verifyGLB=async(buffer,objects,slots)=>{
  const result=decodeGLB(buffer);for(const m of result.json.materials){delete m.normalTexture;delete m.occlusionTexture;delete m.emissiveTexture;if(m.pbrMetallicRoughness){delete m.pbrMetallicRoughness.baseColorTexture;delete m.pbrMetallicRoughness.metallicRoughnessTexture;}}
  const text=new TextEncoder().encode(JSON.stringify(result.json)),jl=Math.ceil(text.length/4)*4,out=new Uint8Array(28+jl+result.bin.length),v=new DataView(out.buffer);v.setUint32(0,0x46546c67,true);v.setUint32(4,2,true);v.setUint32(8,out.length,true);v.setUint32(12,jl,true);v.setUint32(16,0x4e4f534a,true);out.fill(32,20,20+jl);out.set(text,20);v.setUint32(20+jl,result.bin.length,true);v.setUint32(24+jl,0x004e4942,true);out.set(result.bin,28+jl);return verify(out.buffer,objects,slots);
 };
 const result=await ex.build([object,{...object,id:2}]),{json,bin}=decodeGLB(result.buffer);
 for(let mi=0;mi<json.meshes.length;mi++)for(let slot=0;slot<json.meshes[mi].primitives.length;slot++){
  const primitive=json.meshes[mi].primitives[slot],sourceId=result.objectDetails[mi].materialIndices[slot],material=json.materials[primitive.material],source=p.materials[sourceId];
  for(const [a,b] of [[material.pbrMetallicRoughness.baseColorTexture,source.pbrMetallicRoughness.baseColorTexture],[material.pbrMetallicRoughness.metallicRoughnessTexture,source.pbrMetallicRoughness.metallicRoughnessTexture],[material.normalTexture,source.normalTexture],[material.occlusionTexture,source.occlusionTexture],[material.emissiveTexture,source.emissiveTexture]]){
   const texture=json.textures[a.index],original=p.textures[b.index],image=json.images[texture.source],view=json.bufferViews[image.bufferView];assert.deepEqual(json.samplers[texture.sampler],p.samplers[original.sampler]);assert.deepEqual([...bin.slice(view.byteOffset,view.byteOffset+view.byteLength)],[...p.images[original.source].data]);assert.equal(view.byteOffset%4,0);
  }
 }
 assert.equal(result.verification.pass,true);
});
test('883 selected UV edits and native resource project roundtrip retain material assignment through actual GLB output',async()=>{
 const ex=glbOwnerRuntime(),o=fixture(ex),old=o.glbPassthrough;assert(rotateImportedUV(o,o.mesh,ex.c.topologySignature,history,{island:0,payload:old}).ok);assert.equal(o.glbPassthrough.faceMaterialIndices,old.faceMaterialIndices);o.glbPassthrough=decodeProjectGLB(encodeProjectGLB(o.glbPassthrough));const result=await ex.build([o]);checkTriangles(ex,result,o);assert.equal(result.uvRestoredCount,1);
});
test('883 missing/stale/invalid multi-material mappings and evaluated export refuse before first-material substitution; cleanup remains transactional',async()=>{
 const ex=glbOwnerRuntime(),object=fixture(ex),p=object.glbPassthrough;
 for(const change of [p=>delete p.faceMaterialIndices,p=>p.materialTopologySignature='stale',p=>p.faceMaterialIndices=[1],p=>p.faceMaterialIndices[0]=-1,p=>p.faceMaterialIndices[0]=9]){
  const o=fixture(ex);change(o.glbPassthrough);await assert.rejects(ex.build([o]),/matching Base face assignments/);
 }
 await assert.rejects(ex.build([object],true),/Base/);const changed=fixture(ex);changed.mesh.faces[0].reverse();await assert.rejects(ex.build([changed]),/matching Base/);
 const valid=fixture(ex),invalid=fixture(ex);delete invalid.glbPassthrough.faceMaterialIndices;const dispose=THREE.BufferGeometry.prototype.dispose;let calls=0;THREE.BufferGeometry.prototype.dispose=function(){calls++;return dispose.call(this);};try{await assert.rejects(ex.build([valid,invalid]));assert(calls>=1);}finally{THREE.BufferGeometry.prototype.dispose=dispose;}
 assert.deepEqual(p.faceMaterialIndices,[1,0,1,0,1,0]);assert.equal((await ex.build([object])).verification.pass,true);
});
