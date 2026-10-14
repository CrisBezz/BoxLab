import test from 'node:test';
import assert from 'node:assert/strict';
import {editableBooleanRuntime} from './helpers/editable-boolean-runtime.mjs';
import {glbOwnerRuntime,decodeGLB} from './helpers/glb-owner-runtime.mjs';
import {encodeBoxlabScene} from '../src/boxlab-project-codec.js';
const payload=()=>({version:1,source:'glb',meshExtras:{custom:'original',nomad:{layers:[{name:'Sculpt'}]}},nodeExtras:{source:'Nomad'},materials:[{pbrMetallicRoughness:{baseColorTexture:{index:0}}}],textures:[{source:0}],images:[{definition:{mimeType:'image/png'},data:new Uint8Array([137,80,78,71,13,10,26,10])}],uvCorners:[[[0,0],[1,0],[1,1],[0,1]]],morphTargets:[{name:'Layer',position:[[0,0,0]]}]});
test('855 real scene history restores deleted imported resource objects and shares original payload/image bytes without losing UV metadata',()=>{
 const r=editableBooleanRuntime(),o=r.manager.objects.find(o=>o.id===3),resources=payload();o.glbPassthrough=resources;
 const capture=r.c.__boxlabObjectHistory.capture();assert.equal(capture.objects.find(o=>o.id===3).glbPassthrough,resources);assert.notEqual(capture.objects.find(o=>o.id===3).mesh,o.mesh);
 r.c.__boxlabObjectHistory.checkpoint();r.manager.objects.splice(r.manager.objects.indexOf(o),1);const live=r.c.__boxlabBridgeState.mesh;
 assert(r.h.undo(live));const restored=r.manager.objects.find(o=>o.id===3);assert(restored);assert.equal(restored.glbPassthrough,resources);assert.equal(restored.glbPassthrough.images[0].data,resources.images[0].data);assert.equal(restored.glbPassthrough.uvCorners,resources.uvCorners);assert.equal(restored.glbPassthrough.morphTargets,resources.morphTargets);
 assert(r.h.redo(live));assert.equal(r.manager.objects.some(o=>o.id===3),false);assert(r.h.undo(live));assert.equal(r.manager.objects.find(o=>o.id===3).glbPassthrough,resources);
});
test('855 restored resource references follow snapshots rather than current objects; project codec preserves imported payload and still refuses unsupported other channels',()=>{
 const r=editableBooleanRuntime(),o=r.manager.objects.find(o=>o.id===3),a=payload(),b={...payload(),meshExtras:{custom:'replacement'}};o.glbPassthrough=a;r.c.__boxlabObjectHistory.checkpoint();o.glbPassthrough=b;const live=r.c.__boxlabBridgeState.mesh;r.h.undo(live);assert.equal(r.manager.objects.find(o=>o.id===3).glbPassthrough,a);r.h.redo(live);assert.equal(r.manager.objects.find(o=>o.id===3).glbPassthrough,b);
 assert(encodeBoxlabScene(r.c.__boxlabObjectHistory.capture()).objects.find(o=>o.id===3).glbResource);assert.throws(()=>encodeBoxlabScene({...r.c.__boxlabObjectHistory.capture(),objects:[{...o,materials:[]}]}),/Unsupported embedded project resources/);
 const plain=r.c.snapshotObject({...o,glbPassthrough:null});assert.equal(Object.hasOwn(plain,'glbPassthrough'),false);assert.equal(encodeBoxlabScene({activeId:3,objects:[plain]}).version,1);
});
test('855 native GLB export after actual scene restore retains UVs, custom metadata, material bindings and exact embedded image bytes',async()=>{
 const r=editableBooleanRuntime(),g=glbOwnerRuntime(),o=r.manager.objects.find(o=>o.id===3),resources=payload();resources.uvCorners=o.mesh.faces.map(()=>[[0,0],[1,0],[1,1],[0,1]]);resources.uvTopologySignature=g.c.topologySignature(o.mesh);o.glbPassthrough=resources;
 const snapshot=r.c.__boxlabObjectHistory.capture();delete o.glbPassthrough;r.c.__boxlabObjectHistory.restore(snapshot);const restored=r.manager.objects.find(o=>o.id===3),kept=restored.glbPassthrough;assert.equal(kept,resources);
 // Node has no image decoder: verify native geometry/UV export, then the real
 // final GLB resource patch and exact bytes separately, as existing GLB fixtures do.
 const exportObject={...restored,glbPassthrough:{uvCorners:kept.uvCorners,uvTopologySignature:kept.uvTopologySignature,meshExtras:kept.meshExtras,nodeExtras:kept.nodeExtras}};const result=await g.build([exportObject]);assert.equal(result.uvRestoredCount,1);const buffer=g.c.patchNomadFaceGroupGLB(result.buffer,result.objectDetails.map(d=>({...d,passthrough:kept})));const {json,bin}=decodeGLB(buffer);assert.equal(json.meshes[0].extras.custom,'original');assert.equal(json.meshes[0].extras.nomad.layers[0].name,'Sculpt');assert.equal(json.images.length,1);assert.equal(json.materials[json.meshes[0].primitives[0].material].pbrMetallicRoughness.baseColorTexture.index,0);const bv=json.bufferViews[json.images[0].bufferView];assert.deepEqual(Array.from(bin.slice(bv.byteOffset||0,(bv.byteOffset||0)+bv.byteLength)),Array.from(resources.images[0].data));
});
