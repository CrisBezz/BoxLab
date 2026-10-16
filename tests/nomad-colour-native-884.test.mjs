import {buildNomadProjectWithMaps} from '../src/nomad-packed-maps.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../src/mesh.js';
import {buildNomadProject,readNomadProject} from '../src/nomad-export-core.js';
import {createBoxUV,rotateImportedUV} from '../src/imported-uv-edit.js';
import {encodeProjectGLB,decodeProjectGLB} from '../src/project-glb-resources.js';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
const template=fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url)),donor=JSON.parse(fs.readFileSync(new URL('./fixtures/nomad-colour-donor-884.json',import.meta.url))),ex=glbOwnerRuntime(),signature=ex.c.topologySignature,history={capture:()=>({}),checkpointSnapshot:()=>true};
const png=()=>new Uint8Array(Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a2ioAAAAASUVORK5CYII=','base64'));
function fixture(id=1){const mesh=EditableMesh.cube(2),o={id,name:'Native colour',mesh,settings:{}};assert(createBoxUV(o,mesh,signature,history).ok);o.glbPassthrough={...o.glbPassthrough,source:'glb',materialIndices:[0],materials:[{pbrMetallicRoughness:{baseColorTexture:{index:0},baseColorFactor:[.2,.4,.6,1],roughnessFactor:.8,metallicFactor:.1}}],textures:[{source:0}],images:[{definition:{mimeType:'image/png',name:'Colour.png'},data:png()}]};return o;}
const build=objects=>buildNomadProject(objects,template,{topologySignature:signature});
const bytes=(p,field)=>p.bin.slice(field.offset,field.offset+field.length);
function verify(p,object,index=0){const mesh=p.json.meshes[index],mat=p.json.materials[mesh.material],texture=mat.textures.color,image=p.json.images[texture.index];assert.deepEqual([...bytes(p,image)],[...object.glbPassthrough.images[0].data]);assert.equal(image.type,object.glbPassthrough.images[0].definition.mimeType);assert.equal(image.offset%4,0);assert.equal(new DataView(p.bytes.buffer,p.bytes.byteOffset).getUint32(12,true),donor.headerVersion);
 const omit=v=>Object.fromEntries(Object.entries(v).filter(([k])=>!['index','name'].includes(k)));assert.deepEqual(omit(texture),omit(donor.colourTexture));assert.deepEqual(mat.factorColor,[.2,.4,.6]);assert.equal(mat.roughness,.8);assert.equal(mat.metalness,.1);
 for(const key of ['vertices','normals','uvs','faces','faces_uv','faces_group'])assert(mesh[key].offset>=0&&mesh[key].offset+mesh[key].length<=p.bin.length);
}
test('884 donor-proven native image table, material link and revision embed original PNG bytes without touching UV/geometry channels or resources',()=>{
 const o=fixture(),before=encodeProjectGLB(o.glbPassthrough),plain={...o,glbPassthrough:{...o.glbPassthrough,materials:[],textures:[],images:[]}},baseline=readNomadProject(build([plain]).bytes),result=build([o]),p=readNomadProject(result.bytes);assert.equal(result.count,1);assert.equal(result.colourTextureObjects,1);assert.equal(result.uvObjects,1);assert.equal(p.json.images.length,1);verify(p,o);
 for(const key of ['vertices','normals','uvs','faces','faces_uv','faces_group'])assert.deepEqual(bytes(p,p.json.meshes[0][key]),bytes(baseline,baseline.json.meshes[0][key]));assert.deepEqual(encodeProjectGLB(o.glbPassthrough),before);assert.equal(new DataView(baseline.bytes.buffer,baseline.bytes.byteOffset).getUint32(12,true),6);
});
test('884 multiple coloured and plain native objects keep image/material/mesh offsets independent and deduplicate shared read-only image bytes',()=>{
 const a=fixture(),b={...fixture(2),glbPassthrough:a.glbPassthrough},plain={id:3,name:'Plain',mesh:EditableMesh.cube(),settings:{}},result=build([a,plain,b]),p=readNomadProject(result.bytes);assert.equal(result.count,3);assert.equal(result.colourTextureObjects,2);assert.equal(p.json.images.length,1);verify(p,a,0);verify(p,b,2);assert.equal(p.json.meshes[1].material,0);assert.notEqual(p.json.meshes[0].material,p.json.meshes[2].material);assert.equal(p.json.scene[0].children.length,3);
});
test('884 JPEG bytes use actual native JPEG type/offset convention and selected UV/project edits keep colour resources',()=>{
 const o=fixture();o.glbPassthrough.images[0]={definition:{mimeType:'image/jpeg',name:'Colour.jpg'},data:new Uint8Array([255,216,255,224,0,16,74,70,73,70])};const p=readNomadProject(build([o]).bytes);verify(p,o);assert.equal(p.json.images[0].type,donor.images[0].type);
 const q=fixture(),payload=q.glbPassthrough;assert(rotateImportedUV(q,q.mesh,signature,history,{island:0,payload}).ok);q.glbPassthrough=decodeProjectGLB(encodeProjectGLB(q.glbPassthrough));verify(readNomadProject(build([q]).bytes),q);
});
test('884 native image route refuses unsupported materials/samplers, missing/stale UVs and oversize image sources without mutating originals',()=>{
 for(const change of [o=>o.glbPassthrough.materialIndices=[0,1],o=>o.glbPassthrough.materials[0].alphaMode='BLEND',o=>o.glbPassthrough.textures[0].sampler=0,o=>o.glbPassthrough.images[0].data=null,o=>o.glbPassthrough.uvCorners=null,o=>o.glbPassthrough.uvTopologySignature='stale',o=>o.glbPassthrough.images[0].data=new Uint8Array(8*1024*1024+1)]){const o=fixture();o.glbPassthrough.samplers=[{wrapS:33071}];change(o);assert.throws(()=>build([o]),/NOMAD|Nomad/);}
 const objects=Array.from({length:4},(_,i)=>{const o=fixture(i);o.glbPassthrough.images[0].data=new Uint8Array(7*1024*1024);o.glbPassthrough.images[0].data.set([137,80,78,71,13,10,26,10]);return o;});assert.throws(()=>build(objects),/24 MB/);assert(objects.every(o=>o.glbPassthrough.images[0].data.length===7*1024*1024));
});
test('884 actual File NOMAD action downloads image-bearing native bytes and reports colour images while retaining .nom filename and UV path',async()=>{
 const o=fixture(),saves=[],status={},source=fs.readFileSync(new URL('../src/export-as-panel.js',import.meta.url),'utf8'),c={URL,Blob,shareButton:{disabled:false},status,note:{},nameInput:{value:'Colour'},cleanName:x=>x,objects:()=>[o],geometry:'base',buildNomadProjectWithMaps,fetch:async()=>({ok:true,arrayBuffer:async()=>template}),downloadBlob:(...args)=>saves.push(args)};vm.createContext(c);vm.runInContext(source.slice(source.indexOf('function updateNote(){'),source.indexOf('function extension()')).replace('import.meta.url',"'https://example.test/src/export-as-panel.js'"),c);const old=globalThis.__boxlabExportAs;globalThis.__boxlabExportAs={topologySignature:signature};try{await c.exportNomad();}finally{globalThis.__boxlabExportAs=old;}assert.equal(saves.length,1);assert.equal(saves[0][1],'Colour.nom');assert.match(status.textContent,/colour images 1\/1/);verify(readNomadProject(await saves[0][0].arrayBuffer()),o);assert.equal(c.shareButton.disabled,false);
});
