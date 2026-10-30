import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {nomadColourAlphaFixture} from './helpers/nomad-colour-alpha-fixture.mjs';
import {nomadColourSurfaceSource,nomadPBRSurfaceSources} from '../src/nomad-material-resource.js';
import {createUVImageOverlay} from '../src/uv-image-surface-preview.js';
import {decodeUVImage} from '../src/uv-image-preview.js';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {EditableMesh} from '../src/mesh.js';
import {buildNomadProject} from '../src/nomad-export-core.js';
import {meshTopologySignature as sig} from '../src/mesh-topology-signature.js';
import {inspectPNG} from './helpers/png-inspect.mjs';
const fixture=nomadColourAlphaFixture(),tick=()=>new Promise(r=>setImmediate(r)),build=glbOwnerRuntime().c.buildUVPreviewGeometry;
const bitmap=()=>({width:128,height:128,closed:0,close(){this.closed++;}});
const plan=p=>nomadColourSurfaceSource(p,{opacity:true});
function surface(o,options={}){const body=new THREE.Mesh(o.mesh.triangulatedGeometry(),new THREE.MeshStandardMaterial());body.castShadow=true;const original=body.material;return {body,original,overlay:createUVImageOverlay(body,o.mesh,o.glbPassthrough,build,new THREE.MeshBasicMaterial(),{lit:true,...options})};}
test('1029 native colour alpha is explicitly boolean/0/1 opt-in; preserves source and independent grayscale opacity/factors',async()=>{
 const {objects}=await fixture;
 for(const value of [true,1,false,0]){const p=structuredClone(objects[0].glbPassthrough);p.nomadMaterial.use_color_opacity=value;const before=JSON.stringify(p),s=plan(p);assert.equal(s.colourAlpha,value===true||value===1);assert.equal(s.choice.unpremultiplied,true);assert.equal(JSON.stringify(p),before);}
 const p=objects[1].glbPassthrough,s=plan(p);assert.equal(s.colourAlpha,true);assert.equal(s.opacity,.65);assert.equal(nomadPBRSurfaceSources(p,s).opacity.factor,.8);assert.deepEqual(nomadPBRSurfaceSources(p,s).opacity.repeat,[2,2]);
 for(const value of ['true',2,null]){const p=structuredClone(objects[0].glbPassthrough);p.nomadMaterial.use_color_opacity=value;assert.equal(plan(p),null);}
});
test('1029 actual material keeps Three RGBA multiplication only when opted in and combines map/scalar alpha, leaving OFF control opaque',async()=>{
 const {objects}=await fixture;
 for(let i=0;i<3;i++){const f=surface(objects[i],{decode:async()=>bitmap()});await tick();const m=f.overlay.material;assert(f.overlay.visible);assert.equal(m.map.colorSpace,THREE.SRGBColorSpace);assert(m.normalMap||i===2);assert.equal(m.transparent,i!==2);assert.equal(m.depthWrite,i===2);assert.equal(f.body.castShadow,i===2);
  if(i!==2){const shader={fragmentShader:'#include <map_fragment>\n#include <alphamap_fragment>'};m.onBeforeCompile(shader);assert.equal(shader.fragmentShader,'#include <map_fragment>\n#include <alphamap_fragment>');assert.match(THREE.ShaderChunk.map_fragment,/diffuseColor \*= sampledDiffuseColor;/);assert.notEqual(m.customProgramCacheKey(),'boxlab-native-opacity-1028');assert.equal(m.opacity,i===1?.8*.65:1);assert.equal(Boolean(m.alphaMap),i===1);}
  f.overlay.userData.boxlabUVImageDispose();assert.equal(f.body.material,f.original);assert.equal(f.body.castShadow,true);
 }
});
test('1029 source RGBA PNG really has zero/full alpha with preserved nonzero RGB; decoder requests unpremultiplied colour, retains alpha and serial cancellation',async()=>{
 const {objects}=await fixture,c=plan(objects[0].glbPassthrough),png=inspectPNG(c.choice.data);assert.equal(png.colorType,6);assert.deepEqual([...png.rgba.subarray(0,4)],[55,175,220,0]);assert(png.rgba.some((v,i)=>i%4===3&&v===0));assert(png.rgba.some((v,i)=>i%4===3&&v===255));
 const old=Object.getOwnPropertyDescriptor(globalThis,'createImageBitmap');let options;const image=bitmap();globalThis.createImageBitmap=async(_b,o)=>{options=o;return image;};
 try{assert.equal(await decodeUVImage(c.choice),image);assert.equal(options.premultiplyAlpha,'none');assert.equal(options.colorSpaceConversion,undefined);}finally{old?Object.defineProperty(globalThis,'createImageBitmap',old):delete globalThis.createImageBitmap;}
 let finish,calls=0;const f=surface(objects[0],{decode:()=>{calls++;return new Promise(r=>finish=r);}});await tick();f.overlay.userData.boxlabUVImageDispose();const late=bitmap();finish(late);await tick();assert.equal(late.closed,1);assert.equal(calls,1);assert.equal(f.body.material,f.original);assert.equal(f.body.userData.boxlabNativeOpacityOwner,undefined);
});
test('1029 opted-in alpha stays out of UV Image/unlit and survives exact pooled project/native NOM roundtrip',async()=>{
 const {objects,template,bytes}=await fixture,o=objects[0];
 for(const mode of ['uvimage','unlit']){const object=mode==='unlit'?{...o,glbPassthrough:{...o.glbPassthrough,nomadMaterial:{...o.glbPassthrough.nomadMaterial,always_unlit:true}}}:o;const f=surface(object,{lit:mode!=='uvimage',decode:async()=>bitmap()});await tick();if(f.overlay){assert(f.overlay.material.isMeshBasicMaterial);assert.equal(f.overlay.material.transparent,false);f.overlay.userData.boxlabUVImageDispose();}}
 const restored=decodeBoxlabScene(JSON.parse(JSON.stringify(encodeBoxlabScene({objects,activeId:1}))),(...a)=>new EditableMesh(...a)).objects;
 assert.deepEqual(buildNomadProject(restored,template,{topologySignature:sig,name:'BoxLab NOM colour alpha sample'}).bytes,bytes);assert.equal(restored[0].glbPassthrough.nomadMaterial.use_color_opacity,1);assert.equal(restored[2].glbPassthrough.nomadMaterial.use_color_opacity,0);
});
