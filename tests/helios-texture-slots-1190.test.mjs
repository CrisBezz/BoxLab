import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { build } from 'esbuild';
import * as THREE from 'three';
const outfile=new URL('../.texture-tests.mjs',import.meta.url);
await build({stdin:{contents:`export {PbrTextureManager} from './src/helios-vendor/engine/textures'; export {createBoxLabHeliosTrace} from './src/helios-vendor/boxlab-entry'; export {importModelFromFile} from './src/helios-vendor/engine/models';`,resolveDir:process.cwd(),loader:'ts'},outfile:outfile.pathname,bundle:true,platform:'node',format:'esm',packages:'external',plugins:[{name:'fixture-loader',setup(b){b.onResolve({filter:/[\/]engine[\/]pathTracer$|^\.\/engine\/pathTracer$/},()=>({path:'tracer',namespace:'gpu'}));b.onResolve({filter:/^\.\/engine\/bvh$/},()=>({path:'bvh',namespace:'gpu'}));b.onLoad({filter:/.*/,namespace:'gpu'},args=>({contents:args.path==='tracer'?`export class GPUPathTracer {setTextureArrays(){}setBVH(){}resetAccumulation(){}getSamples(){return 0}getResolution(){return [1,1]}dispose(){}}`:`export function buildSceneBVH(){return {}}`,loader:'js'}));b.onResolve({filter:/^three\/addons\/loaders\/GLTFLoader.js$/},()=>({path:'loader',namespace:'fixture'}));b.onLoad({filter:/.*/,namespace:'fixture'},()=>({contents:`export class GLTFLoader {parse(buffer,path,resolve,reject){try{resolve({scene:globalThis.fixtureScene()})}catch(e){reject(e)}}}`,loader:'js'}));}}]});
const {PbrTextureManager,createBoxLabHeliosTrace,importModelFromFile}=await import(outfile.href);
await fs.unlink(outfile);
const bytes=()=>new Uint8ClampedArray(1024*1024*4).fill(255);
let pixelBytes=bytes();
globalThis.document = {
 createElement() {
  return { width:0, height:0, toDataURL(){return 'data:image/png;base64,test';}, getContext() {
   return {createImageData(w,h){return {data:new Uint8ClampedArray(w*h*4)};},putImageData(){}, drawImage(){},save(){},restore(){},translate(){},scale(){},getImageData(){return {data:pixelBytes};} };
  }};
 }
};
function scene(count){const g=new THREE.Group();for(let i=0;i<count;i++){const mat=new THREE.MeshStandardMaterial();mat.name='Material '+i;mat.map=new THREE.Texture({width:1,height:1});const mesh=new THREE.Mesh(new THREE.BoxGeometry(),mat);mesh.position.x=i*2;g.add(mesh);}return g;}
const file={name:'maps.glb',arrayBuffer:async()=>new ArrayBuffer(0)};

test('eight layers are exclusive; ninth preserves pixels; non-next released slot is reused and reset neutral',()=>{
 const m=new PbrTextureManager(1);try{const ids=Array.from({length:8},()=>m.allocateCustomLayer());assert.deepEqual(ids,[100,101,102,103,104,105,106,107]);ids.forEach((id,i)=>m.customAlbedoBytes[(id-100)*1024*1024*4]=i+1);const before=m.customAlbedoBytes.slice();assert.throws(()=>m.allocateCustomLayer(),/eight/);assert.deepEqual(m.customAlbedoBytes,before);m.releaseCustomLayer(103);assert.equal(m.allocateCustomLayer(),103);for(let i=0;i<8;i++)assert.equal(m.customAlbedoBytes[i*1024*1024*4],i===3?255:i+1);assert.throws(()=>m.allocateCustomLayer(),/eight/);m.resetCustomCounter();assert.equal(m.allocateCustomLayer(),100);}finally{m.dispose();}
});

test('failed decode preserves existing pixels; released/reused lease rejects late image and revokes URLs',async()=>{
 const m=new PbrTextureManager(1),layer=m.allocateCustomLayer();let pending;let revoked=0;const oldURL=globalThis.URL,oldImage=globalThis.Image;globalThis.URL={createObjectURL(){return'blob:test'},revokeObjectURL(){revoked++}};globalThis.Image=class{constructor(){pending=this}set src(v){}};
 try{m.customAlbedoBytes[0]=42;const failed=m.writeFileToLayer(layer,'albedo',{name:'bad.png'});pending.onerror();await assert.rejects(failed,/decode/);assert.equal(m.customAlbedoBytes[0],42);const late=m.writeFileToLayer(layer,'albedo',{name:'late.png'});m.releaseCustomLayer(layer);assert.equal(m.allocateCustomLayer(),layer);m.customAlbedoBytes[0]=77;pending.onload();await assert.rejects(late,/cancelled/);assert.equal(m.customAlbedoBytes[0],77);assert.equal(revoked,2);}finally{globalThis.URL=oldURL;globalThis.Image=oldImage;m.dispose();}
});


test('actual importer rolls back overflow reservations and retains existing map and occupied bytes',async()=>{
 const m=new PbrTextureManager(1);try{const existing=m.allocateCustomLayer();m.customAlbedoBytes[0]=61;const map=new Map([['old',existing]]);globalThis.fixtureScene=()=>scene(8);await assert.rejects(importModelFromFile(file,true,m,map),/eight/);assert.deepEqual([...map],[['old',100]]);assert.equal(m.customAlbedoBytes[0],61);assert.deepEqual([...m.customLeases.keys()],[100]);globalThis.fixtureScene=()=>scene(7);const result=await importModelFromFile(file,true,m,map);assert.equal(result.materials.length,7);assert.equal(new Set(map.values()).size,8);}finally{m.dispose();}
});


test('import image-write failure releases every reservation and publishes no partial mapping',async()=>{
 const m=new PbrTextureManager(1);try{const map=new Map([['unchanged',0]]);globalThis.fixtureScene=()=>scene(3);let calls=0;const write=m.writeImageToLayer.bind(m);m.writeImageToLayer=(...args)=>{if(++calls===2)throw Error('image canvas failed');return write(...args);};await assert.rejects(importModelFromFile(file,true,m,map),/image canvas failed/);assert.deepEqual([...map],[['unchanged',0]]);assert.equal(m.customLeases.size,0);assert.equal(m.allocateCustomLayer(),100);}finally{m.dispose();}
});



test('1190 actual BoxLab adapter rolls back decode failure, reuses a layer across channels, Restore releases capacity',async()=>{
 globalThis.fixtureScene=()=>scene(1);
 const trace=await createBoxLabHeliosTrace({capabilities:{getMaxAnisotropy(){return 1}}},new ArrayBuffer(0));
 const id=trace.getState().materials[0].id;
 let pending;const oldURL=globalThis.URL,oldImage=globalThis.Image;globalThis.URL={createObjectURL(){return 'blob:test'},revokeObjectURL(){}};globalThis.Image=class{constructor(){pending=this}set src(v){}};
 try{
  trace.restoreMaterialPresetMaps(id);
  const failed=trace.uploadMaterialMap(id,'albedo',{name:'bad.png',type:'image/png'});pending.onerror();await assert.rejects(failed,/decode/);assert.equal(trace.getState().materials[0].hasCustomAlbedo,false);
  const first=trace.uploadMaterialMap(id,'albedo',{name:'a.png',type:'image/png'});pending.onload();await first;assert.equal(trace.getState().materials[0].hasCustomAlbedo,true);
  const second=trace.uploadMaterialMap(id,'metalness',{name:'m.png',type:'image/png'});pending.onload();await second;assert.equal(trace.getState().materials[0].hasCustomMetalness,true);
  const late=trace.uploadMaterialMap(id,'normal',{name:'n.png',type:'image/png'});trace.restoreMaterialPresetMaps(id);pending.onload();await assert.rejects(late,/cancelled/);assert.equal(trace.getState().materials[0].hasCustomNormal,false);
 }finally{globalThis.URL=oldURL;globalThis.Image=oldImage;trace.dispose();}
});
