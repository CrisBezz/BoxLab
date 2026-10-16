import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {uvImageSurfaceSource,createUVImageOverlay} from '../src/uv-image-surface-preview.js';
import {createBoxUV,scaleImportedUV} from '../src/imported-uv-edit.js';
import {encodeProjectGLB,decodeProjectGLB} from '../src/project-glb-resources.js';
import {buildNomadProject} from '../src/nomad-export-core.js';
import {EditableMesh} from '../src/mesh.js';
import {facegroupsRuntime} from './helpers/facegroups-render-runtime.mjs';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
const ex=glbOwnerRuntime(),sig=ex.c.topologySignature,build=ex.c.buildUVPreviewGeometry;
const history={capture:()=>({}),checkpointSnapshot:()=>true};
const tick=()=>new Promise(r=>setImmediate(r));
const bitmap=()=>({width:1024,height:1024,closed:0,close(){this.closed++;}});
function fixture(mesh=EditableMesh.cube(2)){
 const object={id:'active',mesh,settings:{}};assert(createBoxUV(object,mesh,sig,history).ok);
 object.glbPassthrough={...object.glbPassthrough,source:'glb',materialIndices:[0,0],materials:[{pbrMetallicRoughness:{baseColorTexture:{index:0},baseColorFactor:[.2,.4,.8,1]},doubleSided:true}],textures:[{source:0,sampler:0}],samplers:[{wrapS:33071,wrapT:33648,minFilter:9728,magFilter:9728}],images:[{definition:{mimeType:'image/png'},data:new Uint8Array([137,80,78,71,13,10,26,10])}]};
 return {object,mesh,p:object.glbPassthrough};
}
function body(mesh){return new THREE.Mesh(mesh.triangulatedGeometry(),new THREE.MeshStandardMaterial());}
test('881 one-used-material source resolves core factor/sampler only, refuses ambiguity and unsupported image/material forms read-only',()=>{
 const {p}=fixture(),before=encodeProjectGLB(p);const s=uvImageSurfaceSource(p);assert(s);assert.equal(s.choice.data,p.images[0].data);assert.equal(s.sampler,p.samplers[0]);
 for(const change of [p=>p.materialIndices=[0,1],p=>p.materialIndices=[-1],p=>p.materialIndices=null,p=>p.source='boxlab',p=>p.materials[0].alphaMode='BLEND',p=>p.materials[0].alphaMode='MASK',p=>p.materials[0].extensions={KHR_materials_unlit:{}},p=>p.materials[0].pbrMetallicRoughness.baseColorFactor=[1,1,1,.5],p=>p.materials[0].pbrMetallicRoughness.baseColorFactor=[NaN,1,1,1],p=>p.textures[0].sampler=3,p=>p.samplers[0].wrapS=7,p=>p.samplers[0].minFilter=7,p=>p.samplers[0].magFilter=7,p=>p.materials[0].pbrMetallicRoughness.baseColorTexture.texCoord=1,p=>p.materials[0].pbrMetallicRoughness.baseColorTexture.extensions={KHR_texture_transform:{}},p=>p.images[0].data=null]){
  const {p:q}=fixture();change(q);assert.equal(uvImageSurfaceSource(q),null);
 }
 const {p:q}=fixture();delete q.textures[0].sampler;delete q.materials[0].pbrMetallicRoughness.baseColorFactor;assert.deepEqual(uvImageSurfaceSource(q).factor,[1,1,1,1]);assert.deepEqual(encodeProjectGLB(p),before);assert(uvImageSurfaceSource(decodeProjectGLB(before)));
});
test('881 actual Three image overlay uses source UVs, sRGB/linear factor, glTF V0, sampler wrapping and exact-once source disposal',async()=>{
 const {mesh,p}=fixture(),b=body(mesh),original=b.geometry,mat=b.material,hidden=new THREE.MeshBasicMaterial(),image=bitmap();
 const overlay=createUVImageOverlay(b,mesh,p,build,hidden,{decode:async()=>image});assert(overlay);assert.equal(overlay.visible,false);assert.equal(b.material,mat);await tick();
 assert.equal(overlay.visible,true);assert.equal(b.geometry,original);assert.equal(b.material,hidden);assert.equal(overlay.material.map.image,image);assert.equal(overlay.material.map.flipY,false);assert.equal(overlay.material.map.colorSpace,THREE.SRGBColorSpace);assert.deepEqual(overlay.material.color.toArray(),[.2,.4,.8]);assert.equal(overlay.material.toneMapped,false);assert.equal(overlay.material.side,THREE.DoubleSide);
 const t=overlay.material.map;assert.equal(t.wrapS,THREE.ClampToEdgeWrapping);assert.equal(t.wrapT,THREE.MirroredRepeatWrapping);assert.equal(t.minFilter,THREE.NearestFilter);assert.equal(t.magFilter,THREE.NearestFilter);
 const expected=build(mesh,p);assert.deepEqual([...overlay.geometry.attributes.uv.array],[...expected.attributes.uv.array]);expected.dispose();const hits=[];overlay.raycast({},hits);assert.deepEqual(hits,[]);
 let gd=0,md=0,td=0;overlay.geometry.addEventListener('dispose',()=>gd++);overlay.material.addEventListener('dispose',()=>md++);t.addEventListener('dispose',()=>td++);
 original.dispose();overlay.userData.boxlabUVImageDispose();assert.equal(b.children.length,0);assert.equal(b.material,mat);assert.deepEqual([gd,md,td,image.closed],[1,1,1,1]);
});
test('881 canceled-before-start, late decode, decode failure and stale/invalid geometry retain Solid without image/resource leaks',async()=>{
 const {mesh,p}=fixture(),b=body(mesh),hidden=new THREE.MeshBasicMaterial();let calls=0;
 const canceled=createUVImageOverlay(b,mesh,p,build,hidden,{decode:()=>{calls++;return bitmap();}});canceled.userData.boxlabUVImageDispose();await tick();assert.equal(calls,0);
 let resolve;const late=createUVImageOverlay(b,mesh,p,build,hidden,{decode:()=>new Promise(r=>resolve=r)});await tick();late.userData.boxlabUVImageDispose();const replacement=new THREE.MeshNormalMaterial();b.material=replacement;const image=bitmap();resolve(image);await tick();assert.equal(image.closed,1);assert.equal(b.material,replacement);
 createUVImageOverlay(b,mesh,p,build,hidden,{decode:async()=>{throw Error('bad');}});await tick();assert.equal(b.children.length,0);assert.equal(b.material,replacement);
 let builds=0;assert.equal(createUVImageOverlay(b,mesh,{...p,materialIndices:[0,1]},()=>builds++,hidden),null);assert.equal(builds,0);
 for(const q of [{...p,uvTopologySignature:'stale'},{...p,uvCorners:[]}])assert.equal(createUVImageOverlay(b,mesh,q,build,hidden),null);
});
test('881 actual render owner keeps image active-only with existing Base guards, refreshes UV session and restores ordinary looks',async()=>{
 const f=facegroupsRuntime(),{p}=fixture(f.source),hidden=new THREE.MeshBasicMaterial(),images=[];
 f.activeObject.glbPassthrough=p;Object.assign(f.c,{createUVImageOverlay:(...args)=>createUVImageOverlay(...args,{decode:async()=>{const i=bitmap();images.push(i);return i;}}),checkerHiddenMaterial:hidden,__boxlabExportAs:{buildUVPreviewGeometry:build}});
 f.c.mode='uvimage';f.c.__boxlabRenderModes.apply(f.body);await tick();assert.equal(f.body.material,hidden);const old=f.body.children[0];
 const payload=f.activeObject.glbPassthrough;assert(scaleImportedUV(f.activeObject,f.source,sig,history,2,{island:0,payload}).ok);
 const source=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');let listener;f.c.window={addEventListener:(name,fn)=>{if(name==='boxlab-tool-session-change')listener=fn;}};vm.runInContext(source.slice(source.indexOf("window.addEventListener('boxlab-tool-session-change'"),source.indexOf('function syncFacegroupControls')),f.c);
 listener({detail:{id:'mesh-health',active:false}});await tick();assert.equal(images[0].closed,1);assert.notDeepEqual([...old.geometry.attributes.uv.array],[...f.body.children[0].geometry.attributes.uv.array]);
 const inactive=body(f.other.mesh);inactive.userData={kind:'boxlab-inactive-body',objectId:f.other.id};f.other.glbPassthrough=fixture(f.other.mesh).p;f.c.__boxlabRenderModes.apply(inactive);await tick();assert(!inactive.children.some(n=>n.userData.boxlabUVImagePreview));
 for(const patch of [{settings:{subd:true}},{settings:{mirror:{x:true}}},{sourceId:'s'},{arrayRecipe:{}},{booleanRecipe:{}},{curveProfile:{}},{kind:'reference'}]){
  const saved={...f.activeObject};Object.assign(f.activeObject,patch);f.c.__boxlabRenderModes.apply(f.body);await tick();assert.notEqual(f.body.material,hidden);assert(!f.body.children.some(n=>n.userData.boxlabUVImagePreview));for(const k of Object.keys(f.activeObject))delete f.activeObject[k];Object.assign(f.activeObject,saved);
 }
 f.c.__boxlabRenderModes.apply(f.body);f.c.set('clay');await tick();assert.equal(f.body.material,f.c.clayMaterial);assert(!f.body.children.some(n=>n.userData.boxlabUVImagePreview));assert(images.every(i=>i.closed===1));
});
test('881 preview preserves original read-only image bytes, project encoding, native NOM bytes and UV geometry export',async()=>{
 const {mesh,object,p}=fixture(),before=encodeProjectGLB(p),template=fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url)),nom=buildNomadProject([object],template,{topologySignature:sig}).bytes;
 const b=body(mesh),overlay=createUVImageOverlay(b,mesh,p,build,new THREE.MeshBasicMaterial(),{decode:async()=>bitmap()});await tick();overlay.userData.boxlabUVImageDispose();
 assert.equal(object.glbPassthrough,p);assert.deepEqual(encodeProjectGLB(p),before);assert.deepEqual(buildNomadProject([object],template,{topologySignature:sig}).bytes,nom);
 const plain={...object,glbPassthrough:{...p,materials:[],textures:[],images:[]}},exported=await ex.build([plain]);assert.equal(exported.uvRestoredCount,1);assert.equal(b.geometry.attributes.position.count,mesh.triangulatedGeometry().attributes.position.count);
});
