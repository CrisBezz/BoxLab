import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
import {EditableMesh} from '../src/mesh.js';
import {embeddedUVImage,importedUVImageChoices} from '../src/uv-image-preview.js';
import {uvImageSurfaceSource} from '../src/uv-image-surface-preview.js';
import {buildNomadProject,readNomadProject,nativeMaterialMaps} from '../src/nomad-export-core.js';
import {buildNomadProjectWithMaps} from '../src/nomad-packed-maps.js';
import {createBoxUV,rotateImportedUV} from '../src/imported-uv-edit.js';
import {encodeProjectGLB,decodeProjectGLB,decodeProjectGLBImagePool} from '../src/project-glb-resources.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
const source=JSON.parse(fs.readFileSync(new URL('./fixtures/nomad-large-colour-887.json',import.meta.url))),template=fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url)),signature=glbOwnerRuntime().c.topologySignature,options={topologySignature:signature},history={capture:()=>({}),checkpointSnapshot:()=>true},MB=1024*1024;
const smallPNG=()=>new Uint8Array(Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a2ioAAAAASUVORK5CYII=','base64'));
// Encoded-byte tests need no browser decode. Synthetic source of the real reported
// length keeps its PNG signature and unique tail; no private user pixels committed.
function encoded(length){const b=new Uint8Array(length);b.set(smallPNG());b[b.length-1]=19;return b;}
const hash=b=>createHash('sha256').update(b).digest('hex');
function fixture(){const mesh=EditableMesh.cube(2),o={id:1,name:'Large colour',mesh,settings:{}};assert(createBoxUV(o,mesh,signature,history).ok);const materials=structuredClone(source.materials);delete materials[0].pbrMetallicRoughness.metallicRoughnessTexture;o.glbPassthrough={...o.glbPassthrough,source:'glb',materialIndices:[0],materials,textures:structuredClone(source.textures),samplers:[],images:source.images.map((i,index)=>({definition:{mimeType:i.mime,name:i.name},data:index===0?encoded(i.length):index===1?new Uint8Array([255,216,255,224,1,2]):smallPNG()}))};return o;}
function bytes(p,f){return p.bin.subarray(f.offset,f.offset+f.length);}
function verify(p,o){const material=p.json.materials[p.json.meshes[0].material];for(const [slot,tid] of [['color',0],['normal',1],['emissive',2]]){const image=p.json.images[material.textures[slot].index];assert.equal(hash(bytes(p,image)),hash(o.glbPassthrough.images[o.glbPassthrough.textures[tid].source].data));assert.equal(image.offset%4,0);}assert.equal(p.json.images[material.textures.color.index].length,source.images[0].length);}
test('887 reported 11,121,601-byte opaque GLB colour source exports original bytes with normal/emissive while preview keeps its 8 MB guard',async()=>{
 const o=fixture(),p=o.glbPassthrough,info=p.materials[0].pbrMetallicRoughness.baseColorTexture,identity=p.images[0].data;
 assert.equal(source.images[0].length,11121601);assert.equal(embeddedUVImage(p,info),null);assert.deepEqual(importedUVImageChoices(p),[]);assert.equal(uvImageSurfaceSource(p),null);
 assert.equal(embeddedUVImage(p,info,{maxBytes:24*MB}).data,identity);assert.equal(nativeMaterialMaps(p).maps.color.choice.data,identity);
 const out=await buildNomadProjectWithMaps([o],template,options,()=>{assert.fail('Raw colour/normal/emissive must never decode or convert');}),nom=readNomadProject(out.bytes);verify(nom,o);assert.equal(out.colourTextureObjects,1);assert.equal(out.normalTextureObjects,1);assert.equal(out.emissiveTextureObjects,1);assert.equal(p.images[0].data,identity);assert.equal(uvImageSurfaceSource(p),null);
});
test('887 native image budget admits one 24 MB raw image and shared large slots/objects, but rejects oversized or over-aggregate sources; packed decode budget stays 8 MB',async()=>{
 const a=fixture(),p=a.glbPassthrough;p.images[0].data=encoded(24*MB);delete p.materials[0].normalTexture;delete p.materials[0].emissiveTexture;
 const out=buildNomadProject([a],template,options);assert.equal(readNomadProject(out.bytes).json.images[0].length,24*MB);
 p.images[0].data=encoded(24*MB+1);assert.throws(()=>buildNomadProject([a],template,options),/NOMAD/);
 const b=fixture();b.glbPassthrough.textures.forEach(t=>t.source=0);const shared=buildNomadProject([b,{...b,id:2}],template,options),nom=readNomadProject(shared.bytes);assert.equal(shared.count,2);assert.equal(nom.json.images.length,1);verify(nom,b);
 const separate=fixture();separate.glbPassthrough.images[0].data=encoded(14*MB);b.glbPassthrough.images[0].data=encoded(14*MB);b.glbPassthrough.images[0].data[100]=71;await assert.rejects(buildNomadProjectWithMaps([b,separate],template,options),/24 MB/);
 const packed=fixture();packed.glbPassthrough.materials[0].pbrMetallicRoughness.metallicRoughnessTexture={index:0};assert.throws(()=>nativeMaterialMaps(packed.glbPassthrough),/packed/);
 assert.equal(embeddedUVImage(packed.glbPassthrough,{index:0},{maxBytes:Infinity}),null);assert.equal(embeddedUVImage(packed.glbPassthrough,{index:0},{maxBytes:25*MB}),null);
});
test('887 selected UV/project repeat and ACTUAL File NOMAD download retain the large original colour image with no preview budget expansion',async()=>{
 const o=fixture(),old=o.glbPassthrough;assert(rotateImportedUV(o,o.mesh,signature,history,{island:0,payload:old}).ok);o.glbPassthrough=decodeProjectGLB(encodeProjectGLB(o.glbPassthrough));const expectedHash=hash(o.glbPassthrough.images[0].data),saves=[],status={},text=fs.readFileSync(new URL('../src/export-as-panel.js',import.meta.url),'utf8'),c={URL,Blob,shareButton:{disabled:false},status,note:{},nameInput:{value:'Large colour'},cleanName:x=>x,objects:()=>[o],geometry:'base',buildNomadProjectWithMaps,fetch:async()=>({ok:true,arrayBuffer:async()=>template}),downloadBlob:(...args)=>saves.push(args)};vm.createContext(c);vm.runInContext(text.slice(text.indexOf('function updateNote(){'),text.indexOf('function extension()')).replace('import.meta.url',"'https://example.test/src/export-as-panel.js'"),c);const prior=globalThis.__boxlabExportAs;globalThis.__boxlabExportAs={topologySignature:signature};try{await c.exportNomad();}finally{globalThis.__boxlabExportAs=prior;}assert.equal(saves.length,1);assert.equal(saves[0][1],'Large colour.nom');assert.equal(saves[0][0].type,'application/x-nomad-sculpt');assert.match(status.textContent,/colour images 1\/1/);assert.equal(c.shareButton.disabled,false);verify(readNomadProject(await saves[0][0].arrayBuffer()),o);assert.equal(hash(o.glbPassthrough.images[0].data),expectedHash);assert.equal(uvImageSurfaceSource(o.glbPassthrough),null);
});
test('887 large pooled .boxlab resources reopen through ACTUAL Open without regex stack overflow; strict padding/alphabet/canonical-byte checks remain',async()=>{
 const a=fixture(),b={...a,id:2,name:'Shared large colour'},file=encodeBoxlabScene({activeId:1,selected:[1],objects:[{...a,kind:'editable'},{...b,kind:'editable'}]}),encoded=JSON.stringify(file),factory=(...args)=>new EditableMesh(...args);assert(Buffer.byteLength(encoded)<32*MB);const loaded=decodeBoxlabScene(JSON.parse(encoded),factory);assert.equal(hash(loaded.objects[0].glbPassthrough.images[0].data),hash(a.glbPassthrough.images[0].data));assert.equal(loaded.objects[0].glbPassthrough.images[0].data,loaded.objects[1].glbPassthrough.images[0].data);
 let replaces=0;const text=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8'),c={encodeBoxlabScene,decodeBoxlabScene,EditableMesh,window:{confirm:()=>true},manager:()=>({replaceBasicProjectScene:()=>{replaces++;return true;}}),restoreGroupMetadata(){},updateUI(){}};vm.createContext(c);vm.runInContext(text.slice(text.indexOf('async function openBasicProject('),text.indexOf('\nfunction installProjectAudit(')),c);const status={};await c.openBasicProject({name:'Large.boxlab',size:Buffer.byteLength(encoded),text:async()=>encoded},status);assert.match(status.textContent,/Opened/);assert.equal(replaces,1);
 for(const [data,byteLength] of [['!!!!',3],['A===',1],['AA=A',2],['AB==',1],['AAB=',2],['AA\n=',1],['AA==',2],['AAA=',1]])assert.throws(()=>decodeProjectGLBImagePool([{encoding:'base64',data,byteLength}]),/Invalid GLB image/);
 for(const [data,byteLength] of [['',0],['AA==',1],['AQI=',2],['AQID',3]])assert.equal(decodeProjectGLBImagePool([{encoding:'base64',data,byteLength}])[0].length,byteLength);
});
