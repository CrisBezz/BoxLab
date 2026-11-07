import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../src/mesh.js';
import {captureColourResource} from '../src/paint-resource.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {encodeProjectGLB} from '../src/project-glb-resources.js';
import {editableBooleanRuntime} from './helpers/editable-boolean-runtime.mjs';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
const make=(...a)=>new EditableMesh(...a),clone=v=>JSON.parse(JSON.stringify(v));
function paint(size=16,colour=43){const pixels=new Uint8Array(size*size*4);for(let i=0;i<pixels.length;i+=4){pixels[i]=colour;pixels[i+1]=127;pixels[i+2]=201;pixels[i+3]=255;}return captureColourResource({width:size,height:size,pixels,binding:'a'.repeat(64)});}
function attach(o,resource=paint()){o.glbPassthrough={version:1,source:'boxlab',uvTopologySignature:glbOwnerRuntime().c.topologySignature(o.mesh),uvCorners:o.mesh.faces.map(f=>f.map((_,i)=>[i%2,i<2?0:1]))};o.colourPaint=resource;return o;}
function scene(){return {activeId:1,objects:[attach({id:1,name:'Paint resource',kind:'editable',visible:true,locked:false,settings:{},mesh:EditableMesh.cube()})],selected:[1],multi:false,groups:[]};}
const multi=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8'),management=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
function runtime(){
 const r=editableBooleanRuntime();attach(r.manager.objects.find(o=>o.id===3));r.manager.activate(3);r.c.selectedIds=new Set([3]);r.c.multiEnabled=false;
 vm.runInContext(multi.slice(multi.indexOf('function duplicateStem('),multi.indexOf('function addObject(')).replace(/\bobjects\b/g,'sceneObjects')+multi.slice(multi.indexOf('function duplicateActive('),multi.indexOf('function linkedDuplicateActive(')),r.c);
 vm.runInContext(management.slice(management.indexOf('function nextGroupId('),management.indexOf('function cleanupSingletonGroups('))+management.slice(management.indexOf('function duplicateSelection('),management.indexOf('function linkedDuplicateSelection(')),r.c);
 r.manager.nextDuplicateName=r.c.nextDuplicateName;r.c.soloId=null;r.c.nextSourceId=1;vm.runInContext(multi.slice(multi.indexOf('function projectLinkedSources('),multi.indexOf('function newLinkedSource(')),r.c);return r;
}
test('899 v2 project stores one deduplicated colour resource, exact bytes and native UVs; ordinary v1 stays identical',()=>{
 const s=scene(),p=s.objects[0].colourPaint;s.objects.push({...s.objects[0],id:2,mesh:s.objects[0].mesh.clone(),colourPaint:paint()});
 const encoded=encodeBoxlabScene(s);assert.equal(encoded.version,2);assert.equal(encoded.colourPaintPool.length,1);assert.equal(encoded.objects[0].glbResource.version,3);
 const reopened=decodeBoxlabScene(clone(encoded),make);assert.deepEqual(encodeBoxlabScene(reopened),encoded);assert.equal(reopened.objects[0].colourPaint,reopened.objects[1].colourPaint);assert.notEqual(reopened.objects[0].colourPaint.pixels,p.pixels);assert.deepEqual(reopened.objects[0].colourPaint.pixels,p.pixels);
 const frozen=JSON.stringify(encoded);p.pixels[0]=99;assert.equal(JSON.stringify(encoded),frozen);
 for(const o of s.objects)delete o.colourPaint;const plain=encodeBoxlabScene(s);assert.equal(plain.version,1);assert(!Object.hasOwn(plain,'colourPaintPool'));assert.deepEqual(encodeBoxlabScene(decodeBoxlabScene(clone(plain),make)),plain);
 assert.throws(()=>encodeProjectGLB({...s.objects[0].glbPassthrough,colourPaint:paint()}),/native BoxLab UV/);
});
test('899 malformed colour envelopes, refs, alpha, budgets and unsupported owners refuse before scene installation',()=>{
 const good=encodeBoxlabScene(scene());
 for(const mutate of [s=>s.version=1,s=>s.colourPaintPool=[],s=>s.colourPaintPool[0].version=99,s=>s.colourPaintPool[0].descriptor.channel='normal',s=>s.colourPaintPool[0].descriptor.rowOrder='top-down',s=>s.colourPaintPool[0].descriptor.width=2048,s=>s.colourPaintPool[0].descriptor.binding='bad',s=>s.colourPaintPool[0].descriptor.extra=1,s=>s.colourPaintPool[0].data.byteLength++,s=>s.colourPaintPool[0].data.data='!',s=>s.colourPaintPool[0].data.byteLength=9*1024*1024,s=>s.objects[0].colourPaintResource.index=-1,s=>s.objects[0].colourPaintResource.extra=1,s=>s.objects[0].colourPaint={},s=>delete s.objects[0].colourPaintResource,s=>s.colourPaintPool.push(clone(s.colourPaintPool[0])),s=>s.objects[0].sourceId=1,s=>delete s.objects[0].glbResource]){const bad=clone(good);mutate(bad);assert.throws(()=>decodeBoxlabScene(bad,make));}
 const bad=scene();bad.objects[0].colourPaint.pixels[3]=0;assert.throws(()=>encodeBoxlabScene(bad),/opaque/);
 for(const fields of [{sourceId:1},{arrayRecipe:{}},{booleanRecipe:{}},{curveProfile:{}},{kind:'reference'}]){const s=scene();Object.assign(s.objects[0],fields);assert.throws(()=>encodeBoxlabScene(s),/independent native UV/);}
 const large=scene();large.objects[0].colourPaint=paint(1024,1);large.objects.push({...large.objects[0],id:2,colourPaint:paint(1024,2)});assert.equal(encodeBoxlabScene(large).colourPaintPool.length,2);large.objects.push({...large.objects[0],id:3,colourPaint:paint(16,3)});assert.throws(()=>encodeBoxlabScene(large),/8 MiB/);
});
test('899 actual scene Undo/Redo and both ordinary duplicate owners share committed pixels; replacing a resource isolates edits',()=>{
 for(const multiMode of [false,true]){
  const r=runtime(),source=r.manager.objects.find(o=>o.id===3),old=source.colourPaint,live=r.c.__boxlabBridgeState.mesh;
  const captured=r.c.__boxlabObjectHistory.capture();assert.equal(captured.objects.find(o=>o.id===3).colourPaint,old);
  const ids=new Set(r.manager.objects.map(o=>o.id));r.c.__boxlabObjectHistory.checkpoint();multiMode?r.c.duplicateSelection():r.c.duplicateActive();const copy=r.manager.objects.find(o=>!ids.has(o.id));assert.equal(copy.colourPaint,old,`duplicate mode ${multiMode}`);assert.notEqual(copy.mesh,source.mesh);
  const replacement=paint(16,88);r.c.__boxlabObjectHistory.checkpoint();copy.colourPaint=replacement;assert.equal(source.colourPaint,old);assert(r.h.undo(live));assert.equal(r.manager.objects.find(o=>o.id===copy.id).colourPaint,old);assert(r.h.redo(live));assert.equal(r.manager.objects.find(o=>o.id===copy.id).colourPaint,replacement);
  const saved=encodeBoxlabScene(r.c.__boxlabObjectHistory.capture()),loaded=decodeBoxlabScene(clone(saved),make);assert.equal(saved.colourPaintPool.length,2);assert(r.manager.replaceBasicProjectScene(loaded.objects,loaded.activeId));assert.deepEqual(r.c.sceneObjects.find(o=>o.id===copy.id).colourPaint.pixels,replacement.pixels);assert.equal(r.h.undoStack.length,0);
 }
 const r=runtime(),o=r.manager.objects.find(o=>o.id===3),p=o.colourPaint;r.c.__boxlabObjectHistory.checkpoint();r.manager.objects.splice(r.manager.objects.indexOf(o),1);assert(r.h.undo(r.c.__boxlabBridgeState.mesh));assert.equal(r.manager.objects.find(o=>o.id===3).colourPaint,p);assert(r.h.redo(r.c.__boxlabBridgeState.mesh));assert(!r.manager.objects.some(o=>o.id===3));
});
test('899 original Save/Open downloads v2, restores colour bytes, and refuses corrupt incoming paint without changing scene/history',async()=>{
 const r=runtime();let blob;r.c.Blob=Blob;r.c.URL={createObjectURL:b=>{blob=b;return 'blob:test';},revokeObjectURL(){}};r.c.document.createElement=()=>({click(){},remove(){}});r.c.document.body={appendChild(){}};r.c.window={confirm:()=>true};r.c.projectFileName=()=> 'Paint.boxlab';r.c.encodeBoxlabScene=encodeBoxlabScene;r.c.decodeBoxlabScene=decodeBoxlabScene;r.c.manager=()=>r.manager;
 vm.runInContext(management.slice(management.indexOf('function exportBasicProject('),management.indexOf('function installProjectAudit(')),r.c);
 const out={},button={};r.c.exportBasicProject(button,out);assert.match(out.textContent,/download requested/);assert.equal(button.disabled,false);const text=await blob.text();assert.equal(JSON.parse(text).version,2);
 r.c.soloId=null;r.c.nextSourceId=1;vm.runInContext(multi.slice(multi.indexOf('function projectLinkedSources('),multi.indexOf('function newLinkedSource(')),r.c);
 await r.c.openBasicProject({name:'Paint.boxlab',size:blob.size,text:async()=>text},out);assert.match(out.textContent,/Opened/);assert.equal(r.c.sceneObjects.find(o=>o.id===3).colourPaint.pixels[0],43);
 const before=r.c.sceneObjects;r.h.push(r.c.__boxlabBridgeState.mesh);const tokens=[...r.h.undoStack],bad=JSON.parse(text);bad.colourPaintPool[0].data.data='bad';await r.c.openBasicProject({name:'Bad.boxlab',size:100,text:async()=>JSON.stringify(bad)},out);assert.match(out.textContent,/Open refused/);assert.equal(r.c.sceneObjects,before);assert.deepEqual(r.h.undoStack,tokens);
 const incoming=decodeBoxlabScene(JSON.parse(text),make),kept=r.c.sceneObjects.find(o=>o.id===3).colourPaint;r.c.forceRender=()=>{throw Error('render setup failed');};assert.equal(r.manager.replaceBasicProjectScene(incoming.objects,incoming.activeId),false);assert.equal(r.c.sceneObjects,before);assert.equal(r.c.sceneObjects.find(o=>o.id===3).colourPaint,kept);assert.deepEqual(r.h.undoStack,tokens);
});
