import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {History} from '../src/history.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {encodeProjectGLB,decodeProjectGLB} from '../src/project-glb-resources.js';
const makeMesh=(...args)=>new EditableMesh(...args);
function scene(){return {activeId:40,selected:[40],multi:false,objects:[{id:40,name:'Imported',kind:'editable',mesh:EditableMesh.cube(),settings:{},glbPassthrough:{version:1,source:'glb',meshExtras:{nomad:{layers:[{name:'Original'}]}},materials:[{pbrMetallicRoughness:{baseColorTexture:{index:0}}}],textures:[{source:0}],images:[{definition:{mimeType:'image/png'},data:Uint8Array.from({length:256},(_,i)=>i)}],uvCorners:[[[0,0],[1,0],[1,1],[0,1]]],morphTargets:[{name:'Layer',position:[[0,0,0]]}]}}]};}
const source=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8'),management=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
function runtime(confirm=true,fail=false){
 const h=new History(),live=EditableMesh.cube();h.push(live);const old={id:1,mesh:live.clone(),settings:{}};let blob;
 const c={THREE,objects:[old],activeId:1,soloId:null,nextId:2,nextSourceId:1,linkedSources:new Map(),state:()=>({mesh:live}),history:()=>h,captureSettings:()=>({}),cloneSettings:s=>({...s}),restoreSettings(){},forceRender(){if(fail)throw Error('render failed');},renderOutliner(){},encodeBoxlabScene,decodeBoxlabScene,EditableMesh,Blob,setTimeout(){},projectFileName:()=> 'Imported.boxlab',captureScene:()=>scene(),restoreGroupMetadata(){},updateUI(){},window:{confirm:()=>confirm},URL:{createObjectURL:value=>{blob=value;return 'blob:test';},revokeObjectURL(){}},document:{createElement:()=>({click(){},remove(){}}),body:{appendChild(){}}}};
 vm.createContext(c);const method=source.slice(source.indexOf('    replaceBasicProjectScene('),source.indexOf('\n    addMesh(',source.indexOf('    replaceBasicProjectScene('))).trim().replace(/,$/,'');
 const copy=source.slice(source.indexOf('function cloneLooseValue('),source.indexOf('\nfunction captureSettings(')),links=source.slice(source.indexOf('function projectLinkedSources('),source.indexOf('function newLinkedSource('));
 vm.runInContext(copy+links+'\nconst api={'+method+'};globalThis.replace=api.replaceBasicProjectScene;',c);c.manager=()=>({objects:c.objects,saveActive(){},validateBasicProjectLinks:()=>true,replaceBasicProjectScene:c.replace});
 vm.runInContext(management.slice(management.indexOf('function exportBasicProject('),management.indexOf('\nfunction installProjectAudit(')),c);
 return {c,h,live,old,get blob(){return blob;}};
}
test('856 codec preserves opaque imported payload and exact binary bytes through JSON; plain v1 remains byte-compatible',()=>{
 const original=scene(),encoded=encodeBoxlabScene(original),loaded=decodeBoxlabScene(JSON.parse(JSON.stringify(encoded)),makeMesh);assert.deepEqual(encodeBoxlabScene(loaded),encoded);const restored=loaded.objects[0].glbPassthrough;assert(restored.images[0].data instanceof Uint8Array);assert.notEqual(restored.images[0].data,original.objects[0].glbPassthrough.images[0].data);assert.deepEqual(restored.images[0].data,original.objects[0].glbPassthrough.images[0].data);assert.deepEqual(restored.uvCorners,original.objects[0].glbPassthrough.uvCorners);assert.deepEqual(restored.morphTargets,original.objects[0].glbPassthrough.morphTargets);
 delete original.objects[0].glbPassthrough;const plain=encodeBoxlabScene(original);assert.equal(plain.version,1);assert.equal(Object.hasOwn(plain.objects[0],'glbResource'),false);assert.deepEqual(encodeBoxlabScene(decodeBoxlabScene(plain,makeMesh)),plain);
});
test('856 malformed/oversized binary and unsupported owners reject instead of discarding resources',()=>{
 const resource=encodeProjectGLB(scene().objects[0].glbPassthrough);
 for(const mutate of [r=>r.version=99,r=>r.payload.version=99,r=>r.payload.images[0].data.encoding='raw',r=>r.payload.images[0].data.byteLength++,r=>r.payload.images[0].data.data='!!!!',r=>r.payload.images[0].data.byteLength=25*1024*1024]){const bad=JSON.parse(JSON.stringify(resource));mutate(bad);assert.throws(()=>decodeProjectGLB(bad));}
 const rich=scene();rich.objects[0].sourceId=1;assert.throws(()=>encodeBoxlabScene(rich),/Linked imported/);delete rich.objects[0].sourceId;rich.objects[0].mesh.uvLayers=[];assert.throws(()=>encodeBoxlabScene(rich),/Unsupported embedded/);assert.throws(()=>encodeProjectGLB({...rich.objects[0].glbPassthrough,unknown:NaN}),/Invalid GLB resource number/);
});
test('856 actual Save and Open owners round-trip imported resources into real scene replacement; cancel and invalid files preserve current history',async()=>{
 const r=runtime(),out={},button={};r.c.exportBasicProject(button,out);assert.match(out.textContent,/download requested/);assert.equal(button.disabled,false);const text=await r.blob.text();await r.c.openBasicProject({name:'Imported.boxlab',size:r.blob.size,text:async()=>text},out);assert.match(out.textContent,/Opened/);assert.equal(r.c.objects[0].id,40);assert.deepEqual(Array.from(r.c.objects[0].glbPassthrough.images[0].data),Array.from(scene().objects[0].glbPassthrough.images[0].data));assert.equal(r.h.undoStack.length,0);
 const cancelled=runtime(false);await cancelled.c.openBasicProject({name:'Imported.boxlab',size:r.blob.size,text:async()=>text},out);assert.equal(cancelled.c.objects[0],cancelled.old);assert.equal(cancelled.h.undoStack.length,1);assert.match(out.textContent,/cancelled/);
 const bad=JSON.parse(text);bad.objects[0].glbResource.payload.images[0].data.encoding='bad';const invalid=runtime();await invalid.c.openBasicProject({name:'Imported.boxlab',size:100,text:async()=>JSON.stringify(bad)},out);assert.equal(invalid.c.objects[0],invalid.old);assert.equal(invalid.h.undoStack.length,1);assert.match(out.textContent,/Open refused/);
});
test('856 native replacement rollback retains original objects/history on render failure with resource-bearing incoming scene',()=>{
 const r=runtime(true,true),loaded=decodeBoxlabScene(encodeBoxlabScene(scene()),makeMesh);assert.equal(r.c.replace(loaded.objects,loaded.activeId),false);assert.equal(r.c.objects[0],r.old);assert.equal(r.h.undoStack.length,1);assert.deepEqual(r.live.vertices,r.old.mesh.vertices);
});
test('856 Save refuses a project beyond the existing Open size limit before creating a download',()=>{
 const r=runtime(),out={},button={};r.c.Blob=class{constructor(){this.size=33*1024*1024;}};r.c.exportBasicProject(button,out);assert.equal(button.disabled,false);assert.match(out.textContent,/32 MB/);assert.equal(r.blob,undefined);assert.equal(r.h.undoStack.length,1);
});
