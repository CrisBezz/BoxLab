import {decodeGLB} from './helpers/glb-owner-runtime.mjs';
import {buildNomadProjectWithMaps} from '../src/nomad-packed-maps.js';
import {readNomadProject} from '../src/nomad-export-core.js';
import fs from 'node:fs';
import {capturePaintExportObjects,preparePaintExportObjects,preparedPaintImage} from '../src/paint-export.js';
import * as THREE from 'three';
import test from 'node:test';import assert from 'node:assert/strict';
import {viewportPaintRuntime} from './helpers/viewport-paint-runtime.mjs';
import {encodeNomadColourPNG} from '../src/nomad-scalar-png.js';
import {inspectPNG} from './helpers/png-inspect.mjs';
import {importedPaintColourSource,decodeImportedPaintColour} from '../src/imported-paint-colour.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {EditableMesh} from '../src/mesh.js';
globalThis.self=globalThis;globalThis.createImageBitmap=async blob=>{const p=inspectPNG(new Uint8Array(await blob.arrayBuffer()));return {width:p.width,height:p.height,close(){}};};
const decode=async source=>decodeImportedPaintColour(source,{decode:async bytes=>{const p=inspectPNG(bytes);return {...p,pixels:p.rgba};}});
async function fixture(source,size=512,options={}){
 const pixels=new Uint8Array(size*size*4);for(let i=0;i<pixels.length;i+=4)pixels.set([37,101,173,255],i);pixels.set([200,10,30,255],0);
 const bytes=await encodeNomadColourPNG(pixels,size,size),r=viewportPaintRuntime({decodeImportedColour:decode,...options}),o=r.target(),native=o.glbPassthrough,common={version:1,source,uvTopologySignature:r.owner.topologySignature(o.mesh),uvCorners:native.uvCorners};
 o.glbPassthrough=source==='nomad'?{...common,nomadMaterial:{material_type:'opaque',two_sided:options.twoSided?1:-1,roughness:.4,metalness:.1,factorColor:[1,1,1],textures:{color:{index:0}}},images:[{definition:{type:'image/png'},data:bytes}]}:{...common,materialIndices:[0],materials:[{doubleSided:options.twoSided===true,pbrMetallicRoughness:{baseColorTexture:{index:0},roughnessFactor:.4,metallicFactor:.1,baseColorFactor:[1,1,1,1]}}],textures:[{source:0}],images:[{definition:{mimeType:'image/png'},data:bytes}],vertexColorCorners:[],tangentCorners:[],morphTargets:[],originalTopology:{attributes:[{POSITION:0,NORMAL:1,TEXCOORD_0:2}]}};
 return {r,o,pixels,bytes};
}
for(const source of ['nomad','glb'])for(const size of [512,1024])test(`1093 ${source} ${size} existing texture seeds Paint without an opening edit; stroke/project preserve source and untouched pixels`,async()=>{
 const {r,o,pixels,bytes}=await fixture(source,size),original=bytes.slice();let retired=0;const nativeOverlay=new THREE.Object3D();nativeOverlay.userData.boxlabUVImageDispose=()=>{retired++;r.body.remove(nativeOverlay);};r.body.add(nativeOverlay);await r.painter.open();assert.equal(retired,1);assert.deepEqual(r.painter.pixels,pixels);assert.equal(o.colourPaint,undefined);assert.equal(r.h.undoStack.length,0);
 assert(r.painter.begin({x:450,y:300,width:900,height:600,pressure:1},{colour:'#ff0000',radius:12,hardness:1,opacity:1,pressure:false}));assert(r.painter.finish());assert.deepEqual(o.colourPaint.pixels.slice(0,16),pixels.slice(0,16));assert.notDeepEqual(o.colourPaint.pixels,pixels);r.painter.close();assert.deepEqual(bytes,original);const copies=capturePaintExportObjects([o]);await preparePaintExportObjects(copies,{owner:{...r.owner,padPaintEdges:false}});assert.deepEqual(inspectPNG(preparedPaintImage(copies[0]).choice.data).rgba,o.colourPaint.pixels);assert.deepEqual(preparedPaintImage(copies[0]).materialFactors,{roughness:.4,metalness:.1,doubleSided:false});
 const glb=decodeGLB((await r.owner.buildGLB([o],false)).buffer),gm=glb.json.materials[glb.json.meshes[0].primitives[0].material];assert.equal(gm.pbrMetallicRoughness.roughnessFactor,.4);assert.equal(gm.pbrMetallicRoughness.metallicFactor,.1);assert.equal(gm.doubleSided,false);
 const nom=await buildNomadProjectWithMaps([o],fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url)),{topologySignature:r.owner.topologySignature}),np=readNomadProject(nom.bytes),nm=np.json.materials[np.json.meshes[0].material];assert.equal(nm.roughness,.4);assert.equal(nm.metalness,.1);assert.notEqual(nm.two_sided,1);
 const scene=encodeBoxlabScene(r.c.__boxlabObjectHistory.capture()),loaded=decodeBoxlabScene(JSON.parse(JSON.stringify(scene)),(...args)=>new EditableMesh(...args)),saved=loaded.objects.find(v=>v.id===o.id);assert.deepEqual(saved.colourPaint,o.colourPaint);assert.deepEqual(saved.glbPassthrough.images[0].data,original);
});
test('1093 material factors bake in linear light and unsupported maps/transforms refuse',async()=>{
 const {o}=await fixture('nomad');o.glbPassthrough.nomadMaterial.factorColor=[.5,1,0];const s=importedPaintColourSource(o.glbPassthrough),p=await decode(s);assert.equal(p[1],10);assert.equal(p[2],0);assert(p[0]>100&&p[0]<200);
 o.glbPassthrough.nomadMaterial.textures.color.rotation=.1;assert.equal(importedPaintColourSource(o.glbPassthrough),null);o.glbPassthrough.nomadMaterial.textures.color.rotation=0;o.glbPassthrough.nomadMaterial.textures.normal={index:0};assert.equal(importedPaintColourSource(o.glbPassthrough),null);
});
test('1093 closing during texture decode cannot open stale Paint or publish resources/history',async()=>{
 let release;const {r,o}=await fixture('glb',512,{decodeImportedColour:()=>new Promise(resolve=>release=resolve)});const pending=r.painter.open();for(let i=0;i<100&&!release;i++)await new Promise(resolve=>setTimeout(resolve,1));assert.equal(typeof release,'function');r.painter.close();release(new Uint8Array(512*512*4));await assert.rejects(pending,/changed while decoding/);assert.equal(o.colourPaint,undefined);assert.equal(r.h.undoStack.length,0);
});

test('1093 imported colour alpha refuses actual transparency without flattening it',async()=>{
 const {o}=await fixture('nomad');o.glbPassthrough.nomadMaterial.use_color_opacity=true;const s=importedPaintColourSource(o.glbPassthrough);assert(s.requireOpaque);
 await assert.rejects(decodeImportedPaintColour(s,{decode:async()=>({width:512,height:512,pixels:new Uint8Array(512*512*4)})}),/Transparent imported/);
});
for(const source of ['nomad','glb'])test(`1095 two-sided ${source} stays two-sided in Paint, project and both original exporters`,async()=>{
 const {r,o,pixels,bytes}=await fixture(source,512,{twoSided:true}),original=bytes.slice();assert.equal(importedPaintColourSource(o.glbPassthrough).doubleSided,true);
 await r.painter.open();const surface=r.body.children.find(c=>c.userData.boxlabColourPaintDispose);assert(surface);assert.equal(surface.material.side,THREE.DoubleSide);r.painter.tick();assert.equal(surface.material.side,THREE.DoubleSide);assert.equal(surface.material.transparent,false);assert.equal(surface.material.depthWrite,true);
 assert(r.painter.begin({x:450,y:300,width:900,height:600,pressure:1},{colour:'#ff0000',radius:12,hardness:1,opacity:1,pressure:false}));assert(r.painter.finish());r.painter.close();assert.deepEqual(bytes,original);assert.deepEqual(o.colourPaint.pixels.slice(0,16),pixels.slice(0,16));
 const scene=encodeBoxlabScene(r.c.__boxlabObjectHistory.capture()),loaded=decodeBoxlabScene(JSON.parse(JSON.stringify(scene)),(...args)=>new EditableMesh(...args)),saved=loaded.objects.find(v=>v.id===o.id);assert.equal(importedPaintColourSource(saved.glbPassthrough).doubleSided,true);assert.deepEqual(saved.colourPaint,o.colourPaint);
 const glb=decodeGLB((await r.owner.buildGLB([o],false)).buffer),gm=glb.json.materials[glb.json.meshes[0].primitives[0].material];assert.equal(gm.doubleSided,true);
 const nom=await buildNomadProjectWithMaps([o],fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url)),{topologySignature:r.owner.topologySignature}),np=readNomadProject(nom.bytes),nm=np.json.materials[np.json.meshes[0].material];assert.equal(nm.two_sided,1);assert.deepEqual(bytes,original);
});
