import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
import {EditableMesh} from '../src/mesh.js';
import {encodeNomadScalarPNG} from '../src/nomad-scalar-png.js';
import {buildNomadProjectWithMaps} from '../src/nomad-packed-maps.js';
import {readNomadProject} from '../src/nomad-export-core.js';
import {createBoxUV} from '../src/imported-uv-edit.js';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
import {inspectPNG} from './helpers/png-inspect.mjs';
const metadata=JSON.parse(fs.readFileSync(new URL('./fixtures/nomad-large-colour-887.json',import.meta.url))),displacement=JSON.parse(fs.readFileSync(new URL('./fixtures/nomad-displacement-888.json',import.meta.url))),signature=glbOwnerRuntime().c.topologySignature,template=fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url)),MB=1048576;
const hash=data=>createHash('sha256').update(data).digest('hex');
function pixels(width,height){const data=new Uint8ClampedArray(width*height*4);let seed=1234567;for(let y=0;y<height;y++)for(let x=0;x<width;x++){seed^=seed<<13;seed^=seed>>>17;seed^=seed<<5;const i=(y*width+x)*4,noise=seed&7;data[i]=(x+y)&255;data[i+1]=(x*3+y+noise)&255;data[i+2]=(x+y*5+noise)&255;data[i+3]=255;}return data;}
function fixture(){const mesh=EditableMesh.cube(2),o={id:1,name:'Six maps',mesh,settings:{}};assert(createBoxUV(o,mesh,signature,{capture:()=>({}),checkpointSnapshot:()=>true}).ok);o.glbPassthrough={...o.glbPassthrough,source:'glb',materialIndices:[0],materials:structuredClone(metadata.materials),textures:structuredClone(metadata.textures),images:metadata.images.map(info=>{const data=new Uint8Array(info.length);if(info.mime==='image/png')data.set(Buffer.from(displacement.synthetic16BitPNG,'base64'));else data.set([255,216,255,192,0,11,8,8,0,8,0,1,1,17,0,255,218,0,2]);return{definition:{name:info.name,mimeType:info.mime},data};}),meshExtras:{nomad:{version:1,...structuredClone(metadata.nomadMaterial)}}};return o;}
function check(png,input,width,height,channel){const decoded=inspectPNG(png);assert.equal(decoded.width,width);assert.equal(decoded.height,height);assert.equal(decoded.colorType,0);assert.equal(decoded.bitDepth,8);assert.deepEqual(decoded.chunks,['IHDR','IDAT','IEND']);for(let i=0;i<input.length;i+=4){assert.equal(decoded.rgba[i],input[i+channel]);assert.equal(decoded.rgba[i+1],input[i+channel]);assert.equal(decoded.rgba[i+2],input[i+channel]);assert.equal(decoded.rgba[i+3],255);}return decoded;}
test('889 real PNG encoder emits lossless single-channel G/B pixels with valid CRC/zlib/filters, unchanged dimensions/source and no gamma/profile/alpha chunks',async()=>{
 for(const [w,h] of [[1,1],[31,17],[128,64]]){const input=pixels(w,h),before=hash(input);for(const channel of [1,2])check(await encodeNomadScalarPNG(input,w,h,channel),input,w,h,channel);assert.equal(hash(input),before);}
 const input=pixels(2,2);for(const [w,h,c] of [[2049,2,1],[2,0,1],[2,2,0]])await assert.rejects(encodeNomadScalarPNG(input,w,h,c),/input/);
 const old=globalThis.CompressionStream;try{delete globalThis.CompressionStream;await assert.rejects(encodeNomadScalarPNG(input,2,2,1),/compression is unavailable/);}finally{globalThis.CompressionStream=old;}
});
test('889 ACTUAL File NOMAD six-map export uses real production compression and fits reported source-byte sizes inside 24 MB without canvas PNG encoding or resampling',async()=>{
 const o=fixture(),input=pixels(2048,2048),before=hash(input),prior={bitmap:globalThis.createImageBitmap,canvas:globalThis.OffscreenCanvas,api:globalThis.__boxlabExportAs};let closes=0,decodes=0;const canvases=[],saves=[],status={};
 globalThis.createImageBitmap=async()=>{decodes++;return{width:2048,height:2048,close(){closes++;}};};globalThis.OffscreenCanvas=class{constructor(w,h){this.width=w;this.height=h;canvases.push(this);}getContext(){return{drawImage(){},getImageData:()=>({data:input})};}convertToBlob(){assert.fail('Platform RGBA PNG encoding must not be used');}};globalThis.__boxlabExportAs={topologySignature:signature};
 try{
  const source=fs.readFileSync(new URL('../src/export-as-panel.js',import.meta.url),'utf8'),c={URL,Blob,shareButton:{disabled:false},status,note:{},nameInput:{value:'Six maps'},cleanName:x=>x,objects:()=>[o],geometry:'base',buildNomadProjectWithMaps,fetch:async()=>({ok:true,arrayBuffer:async()=>template}),downloadBlob:(...args)=>saves.push(args)};vm.createContext(c);vm.runInContext(source.slice(source.indexOf('function updateNote(){'),source.indexOf('function extension()')).replace('import.meta.url',"'https://example.test/src/export-as-panel.js'"),c);await c.exportNomad();assert.equal(saves.length,1,status.textContent);assert.equal(saves[0][1],'Six maps.nom');const native=readNomadProject(await saves[0][0].arrayBuffer()),material=native.json.materials[native.json.meshes[0].material];assert.equal(native.json.images.length,6);assert(native.json.images.reduce((n,f)=>n+f.length,0)<24*MB);
  for(const [slot,channel] of [['roughness',1],['metalness',2]]){const f=native.json.images[material.textures[slot].index];check(native.bin.subarray(f.offset,f.offset+f.length),input,2048,2048,channel);}
  for(const [slot,index] of [['color',0],['normal',1],['emissive',2],['displacement',3]]){const f=native.json.images[material.textures[slot].index];assert.equal(hash(native.bin.subarray(f.offset,f.offset+f.length)),hash(o.glbPassthrough.images[index].data));}assert.equal(material.factorDisplacement,displacement.settings.factorDisplacement);assert.equal(material.displacementMid,.5);assert.equal(decodes,1);assert.equal(closes,1);assert(canvases.every(c=>c.width===1));assert.equal(hash(input),before);assert.match(status.textContent,/displacement maps 1/);
 }finally{for(const [key,value] of [['createImageBitmap',prior.bitmap],['OffscreenCanvas',prior.canvas],['__boxlabExportAs',prior.api]])if(value===undefined)delete globalThis[key];else globalThis[key]=value;}
});
test('889 native 24 MB guard remains active and explains distinct imported sources versus converted maps and object count',async()=>{
 const a=fixture(),b=fixture();b.id=2;await assert.rejects(buildNomadProjectWithMaps([a,b],template,{topologySignature:signature},()=>assert.fail('Overbudget sources must fail before decode')),/24 MB \(sources 35\.\d+ MiB \+ converted 0\.00 MiB; 2 objects\)/);
});
