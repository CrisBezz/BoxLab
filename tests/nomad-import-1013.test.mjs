import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as THREE from 'three';
import {readNomadImport,decodeNomadLZ4,parseNomadMeshes} from '../src/nomad-import-core.js';
import {buildNomadProject} from '../src/nomad-export-core.js';
import {meshTopologySignature} from '../src/mesh-topology-signature.js';
import {EditableMesh} from '../src/mesh.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {inspectImportedUV} from '../src/imported-uv-inspection.js';
import {glbOwnerRuntime,glbSource} from './helpers/glb-owner-runtime.mjs';
const fixture=JSON.parse(fs.readFileSync(new URL('./fixtures/nomad-import-1013.json',import.meta.url),'utf8'));
const bytes=mode=>Uint8Array.from(Buffer.from(fixture.blobs[mode],'base64'));
const template=fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url));
function editJSON(input,change,{thumb=false}={}){
 const read=readNomadImport(input),json=structuredClone(read.json);change(json);
 const old=new DataView(input.buffer,input.byteOffset,input.byteLength),bo=Number(old.getBigUint64(40,true)),bl=Number(old.getBigUint64(48,true));
 const text=new TextEncoder().encode(JSON.stringify(json)),end=72+text.length+bl,out=new Uint8Array(end+(thumb?16:0)),v=new DataView(out.buffer);
 out.set(new TextEncoder().encode('Nomad Sculpt'));v.setUint32(12,7,true);for(const [at,value] of [[16,out.length],[24,72],[32,text.length],[40,72+text.length],[48,bl],[56,thumb?end:0],[64,thumb?2:0]])v.setBigUint64(at,BigInt(value),true);
 out.set(text,72);out.set(input.subarray(bo,bo+bl),72+text.length);return out;
}
test('1013 upstream writer/native LZ4 fixtures decode raw v7, chunked v7 and legacy v5 identically: quads/negative triangles/UVs/facegroups/transforms/visibility',()=>{
 let expected;
 for(const mode of ['raw','chunked','legacy']){
  const result=parseNomadMeshes(bytes(mode)),[a,b]=result.meshes;
  assert.equal(result.version,mode==='legacy'?5:7);assert.equal(result.meshes.length,2);
  assert.equal(a.name,'Native pair');assert.equal(a.visible,true);assert.equal(b.visible,false);
  assert.deepEqual(a.mesh.vertices.map(v=>v.toArray()),[[4,0,1],[3,0,1],[3,1,1],[4,1,1],[2,.5,1]]);
  assert.deepEqual(a.mesh.faces,[[3,2,1,0],[2,4,1]]);assert.deepEqual(a.mesh.faceGroups,['Body','Trim']);
  assert.equal(a.glbPassthrough.source,'boxlab');assert.equal(a.glbPassthrough.uvTopologySignature,meshTopologySignature(a.mesh));
  assert(Math.abs(a.cornerUVs[0][1][0]-.4)<1e-7);assert.deepEqual(a.cornerUVs[0][0],[0,1]);
  assert(result.warnings.includes('hidden faces imported visibly'));
  const serial=JSON.stringify(result.meshes);if(expected)assert.equal(serial,expected);else expected=serial;
 }
});
test('1013 thumbnail after binary is accepted and all header/section/array size corruption refuses safely',()=>{
 const input=bytes('raw');assert.equal(parseNomadMeshes(editJSON(input,()=>{},{thumb:true})).meshes.length,2);
 const corrupt=[b=>b[0]=0,b=>new DataView(b.buffer).setUint32(12,99,true),b=>new DataView(b.buffer).setBigUint64(24,2n**63n,true),b=>new DataView(b.buffer).setBigUint64(48,999999n,true)];
 for(const change of corrupt){const copy=input.slice();change(copy);assert.throws(()=>parseNomadMeshes(copy),/NOM/);}
 for(const change of [m=>m.vertices.count=500001,m=>m.vertices.type='u16',m=>m.vertices.length--,m=>m.faces.offset=999999,m=>m.faces.count--,m=>m.faces_uv.count--,m=>m.faces_group.count--])assert.throws(()=>parseNomadMeshes(editJSON(input,j=>change(j.meshes[0]))),/NOM/);
 assert.throws(()=>parseNomadMeshes(input.subarray(0,20)),/NOM/);
});
test('1013 LZ4 overlap/extended literals are correct; truncated/invalid matches and chunk size/trailing bytes refuse',()=>{
 assert.equal(new TextDecoder().decode(decodeNomadLZ4(Uint8Array.from([0x14,97,1,0]),9)),'aaaaaaaaa');
 assert.deepEqual(decodeNomadLZ4(Uint8Array.from([0xf0,5,...Array(20).fill(42)]),20),new Uint8Array(20).fill(42));
 for(const [src,size] of [[[0x10],1],[[0,0,0],4],[[0,1,0],4],[[0xf0],20],[[0x30,1,2,3],2],[[0x10,1],2]])assert.throws(()=>decodeNomadLZ4(Uint8Array.from(src),size),/NOM/);
 for(const mutate of [j=>j.meshes[0].vertices.length--,j=>j.meshes[0].vertices.length++,j=>j.meshes[0].vertices.count--])assert.throws(()=>parseNomadMeshes(editJSON(bytes('chunked'),mutate)),/NOM/);
});
test('1013 active-level topology fallback works; missing multires topology/unbaked procedural/repeats refuse instead of partial import',()=>{
 const input=bytes('raw');
 assert.equal(parseNomadMeshes(editJSON(input,j=>j.meshes[0].multires_levels=[])).meshes.length,2);
 const fallback=editJSON(input,j=>{const m=j.meshes[0];m.multires_level=0;m.multires_levels=[{faces:m.faces,faces_uv:m.faces_uv,faces_group:m.faces_group,uvs:m.uvs}];for(const k of ['faces','faces_uv','faces_group','uvs'])delete m[k];});
 assert.deepEqual(parseNomadMeshes(fallback).meshes[0].mesh.faces,parseNomadMeshes(input).meshes[0].mesh.faces);
 for(const change of [j=>delete j.meshes[0].faces,j=>j.meshes[0].mesh_type='triplanar',j=>j.scene[0].children[1].mesh=200,j=>j.scene[0].children[0].repeats=[new THREE.Matrix4().toArray()],j=>j.scene[0].matrix[15]=0])assert.throws(()=>parseNomadMeshes(editJSON(input,change)),/NOM/);
 const baked=editJSON(input,j=>{j.meshes[0]={mesh_type:'triplanar',baked:j.meshes[0]};});assert.equal(parseNomadMeshes(baked).meshes.length,2);
});
test('1013 saved visible shape is imported with explicit warnings for unrepresented layer/paint data; no source mutation',()=>{
 const input=editJSON(bytes('raw'),j=>{j.meshes[0].layers=[{name:'Sculpt layer'}];j.meshes[0].colors={count:5};j.meshes[0].material=0;}),before=input.slice();
 const result=parseNomadMeshes(input);assert(result.warnings.includes('sculpt layers flattened to saved shape'));assert(result.warnings.some(x=>x.includes('paint, materials')));assert.deepEqual(input,before);
});
function importRuntime(){
 const source=glbSource('import-mesh.js').replace(/await import\('\.\/nomad-import-core\.js\?v=[\d.]+'\)/,'{parseNomadMeshes:globalThis.__nomParserTest}');
 const r=glbOwnerRuntime({importSource:source});r.c.__nomParserTest=parseNomadMeshes;r.c.status={textContent:''};r.c.setStatus=text=>r.c.status.textContent=text;return r;
}
test('1015 native float32 affine-row drift imports with canonical affine placement, preserving source/UVs and mirrored winding',async()=>{
 // Exact transform from the failing MAP TEST.nom Text node; geometry comes from
 // the independent upstream fixture, without checking in the user's artwork.
 const matrix=[0.47106683254241943,-0.7071466445922852,-0.4710310697555542,0,0.707134485244751,3.275891558018884e-8,0.7070786952972412,0,-0.471012145280838,-0.7070670127868652,0.4709761142730713,0,0.7214216589927673,1.1314771175384521,0.6523334383964539,0.9999997615814209];
 for(const mirrored of [false,true]){
  const canonical=[...matrix];canonical[15]=1;if(mirrored)for(let i=0;i<3;i++)canonical[i]*=-1;
  const expected=parseNomadMeshes(editJSON(bytes('raw'),j=>j.scene[0].matrix=canonical));
  const drift=[...canonical];drift[15]=matrix[15];
  const input=editJSON(bytes('raw'),j=>j.scene[0].matrix=drift),before=input.slice(),actual=parseNomadMeshes(input);
  assert.deepEqual(actual.meshes,expected.meshes);assert.deepEqual(input,before);
  const r=importRuntime();await r.c.importFile({name:'Float32.nom',size:input.length,arrayBuffer:async()=>input.buffer});
  assert.equal(r.added.length,2,r.c.status.textContent);assert.equal(inspectImportedUV(r.added[0].mesh,r.added[0].glbPassthrough,meshTopologySignature).state,'ready');
 }
 // Canonicalise each node BEFORE parent composition, so drift never introduces
 // position-dependent perspective or compounds through the scene hierarchy.
 const clean=parseNomadMeshes(bytes('raw'));
 for(const sign of [-1,1]){
  const input=editJSON(bytes('raw'),j=>{for(const n of [j.scene[0],...j.scene[0].children]){n.matrix??=new THREE.Matrix4().toArray();for(const i of [3,7,11])n.matrix[i]=sign*5e-7;n.matrix[15]=1+sign*5e-7;}});
  assert.deepEqual(parseNomadMeshes(input).meshes,clean.meshes);
 }
});
test('1015 affine tolerance still refuses perspective, invalid rows and singular transforms before any object add',async()=>{
 for(const slot of [3,7,11,15])for(const delta of [-2e-6,2e-6]){
  const input=editJSON(bytes('raw'),j=>j.scene[0].matrix[slot]=(slot===15?1:0)+delta);
  assert.throws(()=>parseNomadMeshes(input),/invalid affine transform/);
 }
 for(const change of [m=>m[15]=0,m=>m[0]=null,m=>m.pop(),m=>m[0]=m[1]=m[2]=0]){
  const input=editJSON(bytes('raw'),j=>change(j.scene[0].matrix));assert.throws(()=>parseNomadMeshes(input),/(invalid affine|singular) transform/);
 }
 const input=editJSON(bytes('raw'),j=>{j.scene[0].matrix[12]=1e12;j.scene[0].matrix[3]=1e-3;});
 assert.throws(()=>parseNomadMeshes(input),/invalid affine transform/);
 const r=importRuntime();await r.c.importFile({name:'Perspective.nom',size:input.length,arrayBuffer:async()=>input.buffer});assert.equal(r.added.length,0);assert.match(r.c.status.textContent,/invalid affine transform/);
});
test('1013 actual File import dispatcher adds named editable native objects via original fit/manager, keeps indices/UV-only codec and Save/Open/GLB/NOM UVs',async()=>{
 const r=importRuntime(),data=bytes('chunked');await r.c.importFile({name:'From Nomad.NOM',size:data.length,arrayBuffer:async()=>data.buffer});
 assert.equal(r.added.length,2,r.c.status.textContent);const [a,b]=r.added;assert.equal(a.name,'Native pair');assert.equal(b.name,'Hidden copy');assert.equal(b.visible,false);assert.equal(a.mesh.vertices.length,5);assert.deepEqual(a.mesh.faces.map(f=>[...f]),[[3,2,1,0],[2,4,1]]);
 assert.match(r.c.status.textContent,/NOM polygons preserved/);assert.match(r.c.status.textContent,/UVs preserved/);
 assert.equal(inspectImportedUV(a.mesh,a.glbPassthrough,meshTopologySignature).state,'ready');
 const objects=r.added.map((o,i)=>({...o,id:i+1})),encoded=encodeBoxlabScene({activeId:1,objects}),restored=decodeBoxlabScene(JSON.parse(JSON.stringify(encoded)),(...args)=>new EditableMesh(...args));
 assert.deepEqual(restored.objects[0].glbPassthrough.uvCorners,JSON.parse(JSON.stringify(a.glbPassthrough.uvCorners)));
 const glb=await r.build(restored.objects.filter(o=>o.visible!==false));assert.equal(glb.uvRestoredCount,1);
 const nom=buildNomadProject(restored.objects,template,{topologySignature:meshTopologySignature}),again=parseNomadMeshes(nom.bytes);
 assert.equal(again.meshes.length,1);assert.deepEqual(again.meshes[0].mesh.faceGroups,['Body','Trim']);assert.equal(again.meshes[0].mesh.faces[1].length,3);
});
test('1013 actual Reference option stays locked and failed native import adds nothing; oversized file refused before reading',async()=>{
 const r=importRuntime(),data=bytes('legacy');r.c.importKind='reference';await r.c.importFile({name:'Reference.nom',size:data.length,arrayBuffer:async()=>data.buffer});assert.equal(r.added.length,2);assert.equal(r.added[0].locked,true);assert.equal(r.added[0].kind,'reference');
 const failure=importRuntime();await failure.c.importFile({name:'Broken.nom',size:3,arrayBuffer:async()=>new Uint8Array(3).buffer});assert.equal(failure.added.length,0);assert.match(failure.c.status.textContent,/Import failed/);
 await failure.c.importFile({name:'Large.nom',size:129*1024*1024,arrayBuffer:()=>{throw Error('must not read');}});assert.equal(failure.added.length,0);assert.match(failure.c.status.textContent,/128 MiB/);
});
test('1013 genuine checked-in Nomad donor decodes compressed native geometry and pre-JSON thumbnail',()=>{
 const result=parseNomadMeshes(template);assert.equal(result.meshes.length,1);assert.equal(result.meshes[0].mesh.vertices.length,2642);assert.equal(result.meshes[0].mesh.faces.length,2640);
 assert(result.meshes[0].mesh.vertices.every(p=>[p.x,p.y,p.z].every(Number.isFinite)));
});
test('1013 native import retains disconnected coincident indices rather than running OBJ/GLB weld',async()=>{
 const mesh=EditableMesh.cube();mesh.vertices.push(mesh.vertices[0].clone());
 const native=buildNomadProject([{name:'Coincident spare',mesh,settings:{}}],template).bytes,r=importRuntime();
 await r.c.importFile({name:'Spare.nom',size:native.length,arrayBuffer:async()=>native.buffer});assert.equal(r.added.length,1);assert.equal(r.added[0].mesh.vertices.length,9);assert.equal(r.added[0].name,'Coincident spare');
});

test('1014 mesh chooser has no native type filter; original dispatcher still rejects unrelated files before reading',async()=>{
 const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8'),input=html.match(/<input\b[^>]*id="importMeshInput"[^>]*>/)?.[0];
 assert(input);assert.match(input,/type="file"/);assert.doesNotMatch(input,/\b(?:accept|capture|multiple)\s*=/);
 const r=importRuntime();await r.c.importFile({name:'Notes.txt',size:3,arrayBuffer:()=>{throw Error('must not read');}});
 assert.equal(r.added.length,0);assert.match(r.c.status.textContent,/choose an OBJ, GLB, GLTF or NOM file/);
});
