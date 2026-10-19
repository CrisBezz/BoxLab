import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../src/mesh.js';
import {captureRoughnessResource,encodeRoughnessEntry,decodeRoughnessEntry} from '../src/roughness-resource.js';
import {createProjectRoughnessPool} from '../src/project-roughness-resources.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {captureColourResource} from '../src/paint-resource.js';
import {createPaintLayerStack,appendPaintLayer,appendImagePaintLayer} from '../src/paint-layer-stack.js';
import {captureLayeredColourResource} from '../src/paint-layer-resource.js';
import {paintImagePlacementFromCamera} from '../src/paint-image-placement.js';
import {encodeProjectGLB} from '../src/project-glb-resources.js';
import {encodeNomadColourPNG} from '../src/nomad-scalar-png.js';
import {buildSceneOBJ} from '../src/scene-obj-export-core.js';
import {buildNomadProject} from '../src/nomad-export-core.js';
import {buildNomadProjectWithMaps} from '../src/nomad-packed-maps.js';
import {viewportPaintRuntime} from './helpers/viewport-paint-runtime.mjs';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
const clone=v=>JSON.parse(JSON.stringify(v)),make=(...a)=>new EditableMesh(...a),read=n=>fs.readFileSync(new URL('../src/'+n,import.meta.url),'utf8');
function rough(size=16,salt=0){return captureRoughnessResource({width:size,height:size,binding:'a'.repeat(64),pixels:Uint8Array.from({length:size*size},(_,i)=>(i+salt)%256)});}
function colour(size=16,binding='a'.repeat(64)){return captureColourResource({width:size,height:size,binding,pixels:new Uint8Array(size*size*4).fill(255)});}
const multi=read('multi-object.js'),management=read('object-management.js');
function runtime(){const r=viewportPaintRuntime();r.target().roughnessPaint=rough();r.c.selectedIds=new Set([3]);r.c.multiEnabled=false;
 vm.runInContext(multi.slice(multi.indexOf('function duplicateStem('),multi.indexOf('function addObject(')).replace(/\bobjects\b/g,'sceneObjects')+multi.slice(multi.indexOf('function duplicateActive('),multi.indexOf('function linkedDuplicateActive(')),r.c);
 vm.runInContext(management.slice(management.indexOf('function nextGroupId('),management.indexOf('function cleanupSingletonGroups('))+management.slice(management.indexOf('function duplicateSelection('),management.indexOf('function linkedDuplicateSelection(')),r.c);
 r.manager.nextDuplicateName=r.c.nextDuplicateName;r.c.soloId=null;r.c.nextSourceId=1;vm.runInContext(multi.slice(multi.indexOf('function projectLinkedSources('),multi.indexOf('function newLinkedSource(')),r.c);return r;}
function scene(){return runtime().c.__boxlabObjectHistory.capture();}
test('917 R8 roughness preserves all byte values without colour conversion and isolates capture/encode/decode buffers',()=>{
 const input=Uint8Array.from({length:256},(_,i)=>i),resource=captureRoughnessResource({width:16,height:16,binding:'a'.repeat(64),pixels:input});input.fill(0);assert.equal(resource.pixels[128],128);assert.equal(resource.colorSpace,'linear');assert.equal(resource.pixelType,'r8');const encoded=encodeRoughnessEntry(resource),copy=decodeRoughnessEntry(clone(encoded));assert.deepEqual(copy,resource);assert.notEqual(copy.pixels,resource.pixels);resource.pixels.fill(0);assert.equal(copy.pixels[255],255);assert.equal(decodeRoughnessEntry(encoded).pixels[128],128);
 for(const mutate of [r=>r.channel='normal',r=>r.colorSpace='srgb',r=>r.pixelType='rgba8',r=>r.rowOrder='top-down',r=>r.version=2,r=>r.extra=1,r=>r.width=1024,r=>r.binding='bad']){const r={...rough()};mutate(r);assert.throws(()=>encodeRoughnessEntry(r));}assert.throws(()=>captureRoughnessResource({width:16,height:16,binding:'a'.repeat(64),pixels:new Uint8Array(1024)}));
});
test('917 explicit scene v6 deduplicates scalar resources and preserves original colour v1–5 envelope encodings exactly',async()=>{
 for(const version of [1,2,3,4,5]){
  const r=runtime(),s=r.c.__boxlabObjectHistory.capture(),o=s.objects.find(o=>o.id===3);delete o.roughnessPaint;
  if(version===2)o.colourPaint=colour();
  if(version===3)o.colourPaint=captureLayeredColourResource(appendPaintLayer(createPaintLayerStack(colour()),{id:'layer1',name:'Layer'}));
  if(version===4){const source={version:1,mime:'image/png',width:16,height:16,rowOrder:'image-top-first',colourSpace:'srgb',alpha:'straight',encoded:await encodeNomadColourPNG(new Uint8Array(1024).fill(255),16,16),pixels:new Uint8Array(1024).fill(255)},image={version:1,source,placement:paintImagePlacementFromCamera(r.camera,{centre:[0,0],size:[1,1],rotation:0}),objectToWorld:r.body.matrixWorld.toArray()};o.colourPaint=captureLayeredColourResource(appendImagePaintLayer(createPaintLayerStack(colour()),{id:'image1',name:'Image',image,pixels:new Uint8Array(1024).fill(255)}));}
  if(version===5){o.colourPaint=colour(1024);s.objects.push({...o,id:4,colourPaint:colour(1024,'b'.repeat(64))},{...o,id:5,colourPaint:colour(16)});}
  const legacy=encodeBoxlabScene(s);assert.equal(legacy.version,version);o.roughnessPaint=rough();s.objects.push({...o,id:9,roughnessPaint:rough()});const encoded=encodeBoxlabScene(s);assert.equal(encoded.version,6);assert.equal(encoded.colourPaintVersion,version);assert.equal(encoded.roughnessPaintPool.length,1);const loaded=decodeBoxlabScene(clone(encoded),make),a=loaded.objects.find(o=>o.id===3),b=loaded.objects.find(o=>o.id===9);assert.equal(a.roughnessPaint,b.roughnessPaint);assert.notEqual(a.roughnessPaint.pixels,o.roughnessPaint.pixels);assert.equal(JSON.stringify(encodeBoxlabScene(loaded)),JSON.stringify(encoded));s.objects.pop();delete o.roughnessPaint;assert.equal(JSON.stringify(encodeBoxlabScene(s)),JSON.stringify(legacy));
 }
});
test('917 malformed/v1–5-injected scalar envelopes, references and predecode budgets refuse before mesh allocation',()=>{
 const good=encodeBoxlabScene(scene());let made=0;const factory=(...a)=>{made++;return make(...a);};
 for(const mutate of [s=>s.version=5,s=>s.colourPaintVersion=6,s=>delete s.colourPaintVersion,s=>s.roughnessPaintPool=[],s=>s.roughnessPaintPool[0].descriptor.channel='baseColor',s=>s.roughnessPaintPool[0].descriptor.width=513,s=>s.roughnessPaintPool[0].descriptor.extra=1,s=>s.roughnessPaintPool[0].data.byteLength++,s=>s.roughnessPaintPool[0].data.data='!',s=>s.objects.find(o=>o.id===3).roughnessPaint={},s=>s.objects.find(o=>o.id===3).roughnessPaintResource.index=-1,s=>s.objects.find(o=>o.id===3).roughnessPaintResource.extra=1,s=>delete s.objects.find(o=>o.id===3).roughnessPaintResource,s=>s.roughnessPaintPool.push(clone(s.roughnessPaintPool[0]))]){const bad=clone(good);mutate(bad);made=0;assert.throws(()=>decodeBoxlabScene(bad,factory));assert.equal(made,0);}
 const size=encodeRoughnessEntry(rough(512)),large=clone(good);large.roughnessPaintPool=Array.from({length:17},()=>clone(size));made=0;assert.throws(()=>decodeBoxlabScene(large,factory),/4 MiB/);assert.equal(made,0);
 const refs=clone(good);refs.roughnessPaintPool=[size];const object=refs.objects.find(o=>o.id===3);refs.objects=Array.from({length:33},(_,i)=>({...object,id:i+1}));made=0;assert.throws(()=>decodeBoxlabScene(refs,factory),/8 MiB/);assert.equal(made,0);
 const pool=createProjectRoughnessPool(),values=Array.from({length:16},(_,i)=>rough(512,i));values.forEach(v=>pool.add(v));assert.throws(()=>pool.add(rough(512,17)),/4 MiB/);assert.equal(pool.resources.length,16);values.forEach(v=>pool.add(v));assert.throws(()=>pool.add(values[0]),/8 MiB/);
 for(const fields of [{sourceId:1},{kind:'reference'},{arrayRecipe:{}},{curveProfile:{}},{booleanRecipe:{}}]){const s=scene();Object.assign(s.objects.find(o=>o.id===3),fields);assert.throws(()=>encodeBoxlabScene(s));}
});
test('917 original history and single/Multi Duplicate share read-only scalar resource and isolate replaced maps',()=>{
 for(const multiMode of [false,true]){const r=runtime(),original=r.target().roughnessPaint,before=new Set(r.manager.objects.map(o=>o.id));assert.equal(r.c.__boxlabObjectHistory.capture().objects.find(o=>o.id===3).roughnessPaint,original);r.c.__boxlabObjectHistory.checkpoint();multiMode?r.c.duplicateSelection():r.c.duplicateActive();const copy=r.manager.objects.find(o=>!before.has(o.id));assert.equal(copy.roughnessPaint,original);r.c.__boxlabObjectHistory.checkpoint();const next=rough(16,3);copy.roughnessPaint=next;assert.equal(r.manager.objects.find(o=>o.id===3).roughnessPaint,original);r.manager.replaceActiveMesh(r.h.undo(r.live));assert.equal(r.manager.objects.find(o=>o.id===copy.id).roughnessPaint,original);r.manager.replaceActiveMesh(r.h.redo(r.live));assert.equal(r.manager.objects.find(o=>o.id===copy.id).roughnessPaint,next);const saved=encodeBoxlabScene(r.c.__boxlabObjectHistory.capture()),loaded=decodeBoxlabScene(clone(saved),make);assert(r.manager.replaceBasicProjectScene(loaded.objects,loaded.activeId));assert.deepEqual(r.manager.objects.find(o=>o.id===copy.id).roughnessPaint.pixels,next.pixels);assert.equal(r.h.undoStack.length,0);}
});
test('917 actual File Save/Open preserves mixed colour/roughness and corrupt Open leaves original scene/history untouched',async()=>{
 const r=runtime();r.target().colourPaint=colour();let blob;Object.assign(r.c,{Blob,URL:{createObjectURL:b=>(blob=b,'blob:test'),revokeObjectURL(){}},window:{confirm:()=>true},projectFileName:()=> 'Data.boxlab',encodeBoxlabScene,decodeBoxlabScene,manager:()=>r.manager});r.c.document.createElement=()=>({click(){},remove(){}});r.c.document.body={appendChild(){}};vm.runInContext(management.slice(management.indexOf('function exportBasicProject('),management.indexOf('function installProjectAudit(')),r.c);
 const out={};r.c.exportBasicProject({},out);assert.match(out.textContent,/download requested/);const text=await blob.text();assert.equal(JSON.parse(text).version,6);await r.c.openBasicProject({name:'Data.boxlab',size:blob.size,text:async()=>text},out);assert.match(out.textContent,/Roughness data preserved/);assert.deepEqual(r.manager.objects.find(o=>o.id===3).roughnessPaint.pixels,rough().pixels);const before=r.c.sceneObjects;r.h.push(r.live);const stack=[...r.h.undoStack],bad=JSON.parse(text);bad.roughnessPaintPool[0].data.data='bad';await r.c.openBasicProject({name:'Bad.boxlab',size:100,text:async()=>JSON.stringify(bad)},out);assert.match(out.textContent,/Open refused/);assert.equal(r.c.sceneObjects,before);assert.deepEqual(r.h.undoStack,stack);
 const incoming=decodeBoxlabScene(JSON.parse(text),make),kept=r.manager.objects.find(o=>o.id===3).roughnessPaint;r.c.forceRender=()=>{throw Error('render failed');};assert.equal(r.manager.replaceBasicProjectScene(incoming.objects,incoming.activeId),false);assert.equal(r.c.sceneObjects,before);assert.equal(r.manager.objects.find(o=>o.id===3).roughnessPaint,kept);assert.deepEqual(r.h.undoStack,stack);
});
test('917 raw exports/Join refuse roughness; async exports validate bindings after .918; UV envelope remains UV-only',async()=>{
 const r=runtime(),o=r.target(),resource=o.roughnessPaint,native=fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url));assert.throws(()=>buildSceneOBJ([o]),/Roughness/);await assert.rejects(glbOwnerRuntime().build([o]),/matching native Base UVs/);assert.throws(()=>buildNomadProject([o],native,{topologySignature:r.owner.topologySignature}),/Roughness/);await assert.rejects(buildNomadProjectWithMaps([o],native,{topologySignature:r.owner.topologySignature}),/matching native Base UVs/);assert.throws(()=>encodeProjectGLB({...o.glbPassthrough,roughnessPaint:resource}));
 vm.runInContext(multi.slice(multi.indexOf('function joinObjects('),multi.indexOf('async function renameActive(')).replace(/\bobjects\b/g,'sceneObjects').replace(/\bactiveId\b/g,'sceneActiveId'),r.c);const count=r.h.undoStack.length;assert.equal(r.c.joinObjects([1,3]).ok,false);assert.equal(r.h.undoStack.length,count);assert.equal(r.target().roughnessPaint,resource);
});
