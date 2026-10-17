import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../src/mesh.js';
import {buildNomadProject,readNomadProject,createNomadImageIdentity} from '../src/nomad-export-core.js';
import {buildNomadProjectWithMaps} from '../src/nomad-packed-maps.js';
import {encodeNomadScalarPNG} from '../src/nomad-scalar-png.js';
import {createBoxUV,rotateImportedUV} from '../src/imported-uv-edit.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
const metadata=JSON.parse(fs.readFileSync(new URL('./fixtures/nomad-large-colour-887.json',import.meta.url))),displacement=JSON.parse(fs.readFileSync(new URL('./fixtures/nomad-displacement-888.json',import.meta.url))),signature=glbOwnerRuntime().c.topologySignature,template=fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url)),options={topologySignature:signature},history={capture:()=>({}),checkpointSnapshot:()=>true},MB=1048576;
const png=()=>new Uint8Array(Buffer.from(displacement.synthetic16BitPNG,'base64'));
const bytes=(p,f)=>p.bin.subarray(f.offset,f.offset+f.length);
function fixture(id=1){
 const mesh=EditableMesh.cube(2),o={id,name:'Independent '+id,kind:'editable',mesh,settings:{}};assert(createBoxUV(o,mesh,signature,history).ok);
 o.glbPassthrough={...o.glbPassthrough,source:'glb',materialIndices:[0],materials:structuredClone(metadata.materials),textures:structuredClone(metadata.textures),images:metadata.images.map((info,i)=>{const data=new Uint8Array(info.length);data.set(info.mime==='image/png'?png():new Uint8Array([255,216,255,224,0,16]));data[data.length-1]=i;return{definition:{name:info.name,mimeType:info.mime},data};}),meshExtras:{nomad:{version:1,...structuredClone(metadata.nomadMaterial)}}};return o;
}
test('890 image identity requires MIME, length and exact bytes: hash collisions, subarray offsets and separate buffers cannot alias unequal content',()=>{
 const intern=createNomadImageIdentity(),a={data:new Uint8Array([165,134,232,232,123,199,32,100]),mime:'image/png'},b={data:new Uint8Array([235,38,82,190,145,206,193,46]),mime:'image/png'};
 const hash=data=>data.reduce((h,v)=>Math.imul(h^v,16777619)>>>0,2166136261);assert.equal(hash(a.data),hash(b.data));assert.notEqual(intern(a),intern(b));
 const backing=new Uint8Array(10);backing.set(a.data,1);assert.equal(intern(a),intern({data:backing.subarray(1,9),mime:a.mime}));assert.equal(intern(a),intern({...a,data:a.data.slice()}));assert.notEqual(intern(a),intern({...a,mime:'image/jpeg'}));assert.notEqual(intern(a),intern({...a,data:backing}));
 assert.equal(intern(a).data,a.data);assert.notEqual(createNomadImageIdentity()(a),intern(a));
});
test('890 original native writer shares equal independent image bytes while preserving per-object names, material factors, UVs and unequal same-name sources',()=>{
 const a=fixture(),b=fixture(2);for(const o of [a,b]){delete o.glbPassthrough.materials[0].normalTexture;delete o.glbPassthrough.materials[0].emissiveTexture;delete o.glbPassthrough.materials[0].pbrMetallicRoughness.metallicRoughnessTexture;delete o.glbPassthrough.meshExtras;}
 b.glbPassthrough.images[0].definition.name='Different name.png';b.glbPassthrough.materials[0].pbrMetallicRoughness.baseColorFactor=[.3,.6,.9,1];assert(rotateImportedUV(b,b.mesh,signature,history,{island:0,payload:b.glbPassthrough}).ok);
 const one=readNomadProject(buildNomadProject([a],template,options).bytes),both=readNomadProject(buildNomadProject([a,b],template,options).bytes);assert.equal(both.json.images.length,1);
 const mats=both.json.meshes.map(m=>both.json.materials[m.material]);assert.equal(mats[0].textures.color.index,mats[1].textures.color.index);assert.equal(mats[1].textures.color.name,'Different name.png');assert.deepEqual(mats[1].factorColor,[.3,.6,.9]);
 const second=readNomadProject(buildNomadProject([b],template,options).bytes);for(const key of ['vertices','normals','uvs','faces','faces_uv','faces_group']){assert.deepEqual(bytes(both,both.json.meshes[0][key]),bytes(one,one.json.meshes[0][key]));assert.deepEqual(bytes(both,both.json.meshes[1][key]),bytes(second,second.json.meshes[0][key]));}
 b.glbPassthrough.images[0].definition.name=a.glbPassthrough.images[0].definition.name;b.glbPassthrough.images[0].data[100]=71;assert.equal(readNomadProject(buildNomadProject([a,b],template,options).bytes).json.images.length,2);
});
test('890 ACTUAL File NOMAD accepts two independent full-size six-map imports; equal packed content converts once, source bytes/UV/project and material links stay intact',async()=>{
 const a=fixture(),b=fixture(2),originalA=a.glbPassthrough,originalB=b.glbPassthrough;assert.notEqual(originalA.images[0].data,originalB.images[0].data);assert(rotateImportedUV(b,b.mesh,signature,history,{island:0,payload:originalB}).ok);
 const input=new Uint8ClampedArray([1,40,70,255,2,50,80,255,3,60,90,255,4,70,100,255]);let conversions=0;
 const split=async()=>{conversions++;return{roughness:{choice:{data:await encodeNomadScalarPNG(input,2,2,1),mime:'image/png'}},metalness:{choice:{data:await encodeNomadScalarPNG(input,2,2,2),mime:'image/png'}}};};
 const saves=[],status={},text=fs.readFileSync(new URL('../src/export-as-panel.js',import.meta.url),'utf8'),c={URL,Blob,shareButton:{disabled:false},status,note:{},nameInput:{value:'Repeated imports'},cleanName:x=>x,objects:()=>[a,b],geometry:'base',buildNomadProjectWithMaps:(objects,t,o)=>buildNomadProjectWithMaps(objects,t,o,split),fetch:async()=>({ok:true,arrayBuffer:async()=>template}),downloadBlob:(...args)=>saves.push(args)};vm.createContext(c);vm.runInContext(text.slice(text.indexOf('function updateNote(){'),text.indexOf('function extension()')).replace('import.meta.url',"'https://example.test/src/export-as-panel.js'"),c);const old=globalThis.__boxlabExportAs;globalThis.__boxlabExportAs={topologySignature:signature};
 try{await c.exportNomad();}finally{globalThis.__boxlabExportAs=old;}
 assert.equal(saves.length,1,status.textContent);assert.equal(conversions,1);assert.equal(saves[0][1],'Repeated imports.nom');assert.equal(c.shareButton.disabled,false);const native=readNomadProject(await saves[0][0].arrayBuffer());assert.equal(native.json.meshes.length,2);assert.equal(native.json.images.length,6);assert(native.json.images.reduce((n,i)=>n+i.length,0)<24*MB);
 for(const mesh of native.json.meshes){const m=native.json.materials[mesh.material];assert.deepEqual(Object.keys(m.textures).sort(),['color','displacement','emissive','metalness','normal','roughness']);for(const [slot,i] of [['color',0],['normal',1],['emissive',2],['displacement',3]])assert.deepEqual(bytes(native,native.json.images[m.textures[slot].index]),originalA.images[i].data);}
 assert.equal(a.glbPassthrough,originalA);assert.equal(b.glbPassthrough.images[0].data,originalB.images[0].data);assert.notEqual(originalA.images[0].data,originalB.images[0].data);
 const file=encodeBoxlabScene({activeId:1,selected:[1],objects:[a,b]}),loaded=decodeBoxlabScene(JSON.parse(JSON.stringify(file)),(...args)=>new EditableMesh(...args));const reopened=await buildNomadProjectWithMaps(loaded.objects,template,options,split);assert.deepEqual(readNomadProject(reopened.bytes).bin,native.bin);assert.equal(conversions,2);
});
test('890 preflight and writer use the same unique-image budget, including identical converted slots; distinct source bytes still refuse above 24 MB',async()=>{
 const a=fixture(),b=fixture(2);b.glbPassthrough.images[0].data[100]=1;await assert.rejects(buildNomadProjectWithMaps([a,b],template,options,()=>assert.fail('Excess unique sources must fail before conversion')),/24 MB.*sources.*2 objects/);
 const o=fixture();for(const i of [0,1,2,3]){o.glbPassthrough.images[i].data=new Uint8Array(4*MB);o.glbPassthrough.images[i].data.set(png());o.glbPassthrough.images[i].definition.mimeType='image/png';o.glbPassthrough.images[i].data[100]=i;}
 const same=new Uint8Array(5*MB);same.set(png());same[100]=9;const result=await buildNomadProjectWithMaps([o],template,options,async()=>({roughness:{choice:{data:same,mime:'image/png'}},metalness:{choice:{data:same.slice(),mime:'image/png'}}}));const native=readNomadProject(result.bytes);assert.equal(native.json.images.length,5);assert.equal(native.json.images.reduce((n,i)=>n+i.length,0),21*MB);
});
