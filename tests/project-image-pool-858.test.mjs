import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../src/mesh.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
const factory=(...a)=>new EditableMesh(...a);
function scene(){const bytes=Uint8Array.from({length:4096},(_,i)=>i%256),make=(id,data)=>({id,name:'Imported '+id,kind:'editable',mesh:EditableMesh.cube(),settings:{},glbPassthrough:{version:1,source:'glb',meshExtras:{id},images:[{definition:{mimeType:'image/png',name:'Image '+id},data}],uvCorners:[[[0,0],[1,0],[1,1],[0,1]]],materials:[{name:'Material '+id}]}});return {activeId:1,selected:[1],objects:[make(1,bytes),make(2,bytes),make(3,new Uint8Array(bytes))]};}
test('858 shared and equal-content GLB image buffers serialize once while preserving independent object definitions and exact binary bytes',()=>{
 const original=scene(),encoded=encodeBoxlabScene(original),inline=encodeBoxlabScene(original,{poolImages:false});assert.equal(encoded.glbImagePool.length,1);assert(JSON.stringify(encoded).length<JSON.stringify(inline).length*.6);for(const o of encoded.objects){assert.equal(o.glbResource.version,2);assert.deepEqual(o.glbResource.payload.images[0].data,{imagePoolIndex:0});}
 const restored=decodeBoxlabScene(JSON.parse(JSON.stringify(encoded)),factory);assert.deepEqual(encodeBoxlabScene(restored),encoded);const a=restored.objects[0].glbPassthrough,b=restored.objects[1].glbPassthrough;assert.notEqual(a,b);assert.notEqual(a.images[0],b.images[0]);assert.equal(a.images[0].data,b.images[0].data);assert.deepEqual(a.images[0].data,original.objects[0].glbPassthrough.images[0].data);assert.equal(b.images[0].definition.name,'Image 2');assert.equal(b.materials[0].name,'Material 2');assert.deepEqual(b.uvCorners,original.objects[1].glbPassthrough.uvCorners);
});
test('858 distinct image bytes remain distinct; legacy inline .856 encoding and plain v1 roundtrips remain exact',()=>{
 const original=scene();original.objects[2].glbPassthrough.images[0].data[0]=99;const data=encodeBoxlabScene(original);assert.equal(data.glbImagePool.length,2);const loaded=decodeBoxlabScene(data,factory);assert.notEqual(loaded.objects[0].glbPassthrough.images[0].data,loaded.objects[2].glbPassthrough.images[0].data);assert.equal(loaded.objects[2].glbPassthrough.images[0].data[0],99);
 const legacy=encodeBoxlabScene(original,{poolImages:false});assert.equal(legacy.glbImagePool,undefined);assert.deepEqual(encodeBoxlabScene(decodeBoxlabScene(JSON.parse(JSON.stringify(legacy)),factory)),legacy);original.objects.forEach(o=>delete o.glbPassthrough);const plain=encodeBoxlabScene(original);assert.equal(plain.glbImagePool,undefined);assert.deepEqual(encodeBoxlabScene(decodeBoxlabScene(plain,factory)),plain);
});
test('858 invalid image pool bytes and references reject before mesh construction',()=>{
 const original=encodeBoxlabScene(scene());for(const mutate of [d=>d.glbImagePool={},d=>d.glbImagePool[0].data='!!!!',d=>d.glbImagePool[0].byteLength++,d=>d.objects[0].glbResource.payload.images[0].data.imagePoolIndex=-1,d=>d.objects[0].glbResource.payload.images[0].data.imagePoolIndex=99,d=>d.objects[0].glbResource.payload.images[0].data.imagePoolIndex=.5,d=>delete d.glbImagePool]){const bad=JSON.parse(JSON.stringify(original));mutate(bad);let calls=0;assert.throws(()=>decodeBoxlabScene(bad,(...a)=>{calls++;return factory(...a);}));assert.equal(calls,0);}
});
test('858 actual Open accepts legacy inline and new pooled files, while corrupt pool references leave the scene untouched',async()=>{
 const source=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8'),open=source.slice(source.indexOf('async function openBasicProject('),source.indexOf('\nfunction installProjectAudit('));
 for(const pooled of [false,true]){let confirms=0,replaces=0;const c={encodeBoxlabScene,decodeBoxlabScene,EditableMesh,window:{confirm:()=>{confirms++;return true;}},manager:()=>({replaceBasicProjectScene:()=>{replaces++;return true;}}),restoreGroupMetadata(){},updateUI(){}};vm.createContext(c);vm.runInContext(open,c);const data=encodeBoxlabScene(scene(),{poolImages:pooled}),out={},file=d=>({name:'Images.boxlab',size:10000,text:async()=>JSON.stringify(d)});await c.openBasicProject(file(data),out);assert.match(out.textContent,/Opened/);assert.equal(confirms,1);assert.equal(replaces,1);
  if(pooled){data.objects[0].glbResource.payload.images[0].data.imagePoolIndex=99;await c.openBasicProject(file(data),out);assert.match(out.textContent,/Open refused/);assert.equal(confirms,1);assert.equal(replaces,1);}
 }
});
