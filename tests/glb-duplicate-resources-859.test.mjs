import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../src/mesh.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {editableBooleanRuntime} from './helpers/editable-boolean-runtime.mjs';
import {glbOwnerRuntime,decodeGLB} from './helpers/glb-owner-runtime.mjs';

function runtime(multi=false){
 const r=editableBooleanRuntime(),source=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8'),management=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
 // Execute both existing duplicate owners with the real add/activate/save/history
 // manager. Only DOM presentation and the queued Move handoff are adapters.
 vm.runInContext(source.slice(source.indexOf('function duplicateStem('),source.indexOf('function addObject(')).replace(/\bobjects\b/g,'sceneObjects')+source.slice(source.indexOf('function duplicateActive('),source.indexOf('function linkedDuplicateActive(')),r.c);
 vm.runInContext(management.slice(management.indexOf('function nextGroupId('),management.indexOf('function cleanupSingletonGroups('))+management.slice(management.indexOf('function duplicateSelection('),management.indexOf('function linkedDuplicateSelection(')),r.c);
 r.manager.nextDuplicateName=r.c.nextDuplicateName;
 r.c.soloId=null;r.c.nextSourceId=1;vm.runInContext(source.slice(source.indexOf('function projectLinkedSources('),source.indexOf('function newLinkedSource(')),r.c);
 const original=r.manager.objects.find(o=>o.id===3);r.manager.activate(3);r.c.selectedIds=new Set([3]);r.c.multiEnabled=multi;
 const g=glbOwnerRuntime(),payload={version:1,source:'glb',meshExtras:{custom:'Imported original'},nodeExtras:{source:'Nomad'},uvTopologySignature:g.c.topologySignature(original.mesh),uvCorners:original.mesh.faces.map(()=>[[0,0],[1,0],[1,1],[0,1]]),materials:[{name:'Imported material',pbrMetallicRoughness:{baseColorTexture:{index:0}}}],textures:[{source:0}],images:[{definition:{mimeType:'image/png'},data:new Uint8Array([137,80,78,71,13,10,26,10])}]};
 original.glbPassthrough=payload;
 const duplicate=()=>{const before=new Set(r.manager.objects.map(o=>o.id));r.c.__boxlabObjectHistory.checkpoint();multi?r.c.duplicateSelection():r.c.duplicateActive();return r.manager.objects.filter(o=>!before.has(o.id));};
 return {...r,g,original,payload,duplicate};
}

test('859 ordinary single and Multi Duplicate preserve read-only imported resources with independent geometry and existing Move handoff',()=>{
 for(const multi of [false,true]){
  const r=runtime(multi);let moves=0;r.c.requestAnimationFrame=fn=>fn();r.c.__boxlabTransformArming={activateRealMove:()=>moves++};
  const originalVertices=r.original.mesh.vertices.map(v=>v.toArray()),[copy]=r.duplicate();
  assert.equal(copy.glbPassthrough,r.payload);assert.equal(copy.glbPassthrough.images[0].data,r.payload.images[0].data);assert.notEqual(copy.mesh,r.original.mesh);assert.notEqual(copy.mesh.vertices[0],r.original.mesh.vertices[0]);assert.equal(copy.sourceId,undefined);assert.equal(copy.instanceMatrix,undefined);assert.equal(moves,1);
  r.c.__boxlabBridgeState.mesh.vertices[0].x+=.2;r.manager.saveActive();assert.deepEqual(r.original.mesh.vertices.map(v=>v.toArray()),originalVertices);
  assert.equal(copy.glbPassthrough,r.payload);assert.equal(r.original.glbPassthrough,r.payload);
 }
 const r=runtime(true);const plain=r.manager.objects.find(o=>o.id===2);plain.groupId=7;r.original.groupId=7;r.c.groupNames.set(7,'Pair');r.c.selectedIds=new Set([2,3]);const copies=r.duplicate();assert.equal(copies.length,2);assert.equal(Object.hasOwn(copies[0],'glbPassthrough'),false);assert.equal(copies[1].glbPassthrough,r.payload);assert.equal(copies[0].groupId,copies[1].groupId);assert.notEqual(copies[0].groupId,7);assert.equal(r.c.groupNames.get(copies[0].groupId),'Pair copy');
});

test('859 deleted duplicates survive actual scene Undo/Redo and project Save/Open with a single shared image entry',()=>{
 for(const multi of [false,true]){
  const r=runtime(multi),[copy]=r.duplicate();r.manager.activate(3);const live=r.c.__boxlabBridgeState.mesh;
  r.c.__boxlabObjectHistory.checkpoint();r.manager.objects.splice(r.manager.objects.findIndex(o=>o.id===copy.id),1);
  assert(r.h.undo(live));assert.equal(r.manager.objects.find(o=>o.id===copy.id).glbPassthrough,r.payload);assert.equal(r.manager.objects.find(o=>o.id===3).glbPassthrough,r.payload);
  assert(r.h.redo(live));assert.equal(r.manager.objects.some(o=>o.id===copy.id),false);assert(r.h.undo(live));assert.equal(r.manager.objects.find(o=>o.id===copy.id).glbPassthrough,r.payload);
  const encoded=encodeBoxlabScene(r.c.__boxlabObjectHistory.capture());assert.equal(encoded.glbImagePool.length,1);
  const loaded=decodeBoxlabScene(JSON.parse(JSON.stringify(encoded)),(...a)=>new EditableMesh(...a));assert.equal(JSON.stringify(encodeBoxlabScene(loaded)),JSON.stringify(encoded));
  assert(r.manager.replaceBasicProjectScene(loaded.objects,loaded.activeId));const original=r.c.sceneObjects.find(o=>o.id===3),restored=r.c.sceneObjects.find(o=>o.id===copy.id);
  assert.deepEqual(restored.glbPassthrough.uvCorners,original.glbPassthrough.uvCorners);assert.equal(restored.glbPassthrough.images[0].data,original.glbPassthrough.images[0].data);assert.equal(restored.glbPassthrough.materials[0].name,'Imported material');assert.equal(r.h.undoStack.length,0);
 }
});

test('859 duplicated and project-reopened objects export native GLB UVs/materials/images; original topology safety still rejects stale UVs',async()=>{
 for(const multi of [false,true]){
  const r=runtime(multi),[copy]=r.duplicate(),loaded=decodeBoxlabScene(encodeBoxlabScene(r.c.__boxlabObjectHistory.capture()),(...a)=>new EditableMesh(...a)),objects=loaded.objects.filter(o=>o.id===3||o.id===copy.id);
  // Native Three GLB geometry/UV export plus original resource-byte patch;
  // Node has no image decoder, so browser texture rendering is a device gate.
  const result=await r.g.build(objects.map(o=>({...o,glbPassthrough:{uvCorners:o.glbPassthrough.uvCorners,uvTopologySignature:o.glbPassthrough.uvTopologySignature}})));assert.equal(result.uvRestoredCount,2);
  const patched=r.g.c.patchNomadFaceGroupGLB(result.buffer,result.objectDetails.map((d,i)=>({...d,passthrough:objects[i].glbPassthrough}))),{json,bin}=decodeGLB(patched);
  assert.equal(json.meshes.length,2);for(const mesh of json.meshes){assert.equal(mesh.extras.custom,'Imported original');assert.equal(mesh.primitives[0].attributes.TEXCOORD_0>=0,true);const material=json.materials[mesh.primitives[0].material];assert.equal(material.name,'Imported material');const texture=json.textures[material.pbrMetallicRoughness.baseColorTexture.index],image=json.images[texture.source],view=json.bufferViews[image.bufferView];assert.deepEqual(Array.from(bin.slice(view.byteOffset||0,(view.byteOffset||0)+view.byteLength)),Array.from(r.payload.images[0].data));}
  objects[1].mesh.faces.pop();const edited=await r.g.build([{...objects[1],glbPassthrough:{uvCorners:r.payload.uvCorners,uvTopologySignature:r.payload.uvTopologySignature}}]);assert.equal(edited.uvRestoredCount,0);
 }
});
