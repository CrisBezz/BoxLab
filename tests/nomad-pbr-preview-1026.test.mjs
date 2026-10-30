import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {nomadPBRFixture} from './helpers/nomad-pbr-fixture.mjs';
import {nomadPBRSurfaceSources} from '../src/nomad-material-resource.js';
import {createUVImageOverlay} from '../src/uv-image-surface-preview.js';
import {decodeUVImage} from '../src/uv-image-preview.js';
import {createPaintEnvironmentPool} from '../src/paint-material-environment.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {EditableMesh} from '../src/mesh.js';
import {parseNomadMeshes} from '../src/nomad-import-core.js';
import {buildNomadProject} from '../src/nomad-export-core.js';
import {meshTopologySignature as sig} from '../src/mesh-topology-signature.js';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
import {facegroupsRuntime} from './helpers/facegroups-render-runtime.mjs';
const fixture=nomadPBRFixture(),tick=()=>new Promise(r=>setImmediate(r));
const bitmap=(size=1024)=>({width:size,height:size,closed:0,close(){this.closed++;}});
const build=glbOwnerRuntime().c.buildUVPreviewGeometry;
function surface(object,options={}){const body=new THREE.Mesh(object.mesh.triangulatedGeometry(),new THREE.MeshStandardMaterial()),scene=new THREE.Scene();scene.add(body);const original=body.material,geometry=body.geometry;return {body,scene,original,geometry,overlay:createUVImageOverlay(body,object.mesh,object.glbPassthrough,build,new THREE.MeshBasicMaterial(),{lit:true,...options})};}
function environment(){const targets=[],pool=createPaintEnvironmentPool(()=>{const t={texture:new THREE.Texture(),disposals:0,dispose(){this.disposals++;}};targets.push(t);return t;});return {targets,pool};}
test('1026 native map plan keeps independent UV transforms, linear/grayscale intent, strengths/Y sign, source bytes and combined budget',async()=>{
 const {objects}=await fixture,p=structuredClone(objects[1].glbPassthrough);p.nomadMaterial.normal_neg_y=true;p.nomadMaterial.factorRoughness=.6;p.nomadMaterial.factorMetalness=.8;
 const before=JSON.stringify(p),maps=nomadPBRSurfaceSources(p);assert.deepEqual(Object.keys(maps),['normal','roughness','metalness']);assert.deepEqual(maps.normal.repeat,[2,2]);assert.equal(maps.normal.negY,true);assert.equal(maps.normal.factor,.7);assert.equal(maps.normal.choice.linear,true);assert.equal(maps.normal.choice.channel,undefined);
 for(const slot of ['roughness','metalness']){assert.equal(maps[slot].choice.channel,0);assert.equal(maps[slot].choice.grayscale,true);assert.equal(maps[slot].choice.previewSize,512);assert.equal(maps[slot].choice.linear,true);}assert.equal(maps.roughness.factor,.6);assert.equal(maps.metalness.factor,.8);assert.equal(JSON.stringify(p),before);
 for(const change of [p=>p.nomadMaterial.textures.normal.rotation=Infinity,p=>p.nomadMaterial.textures.normal.projection='triplanar',p=>p.nomadMaterial.factorNormal=-1,p=>{const data=new Uint8Array(8*1024*1024);data.set(p.images[1].data.subarray(0,33));p.images[1].data=data;}]){const q=structuredClone(p);change(q);assert.equal(nomadPBRSurfaceSources(q).normal,undefined);}
 delete p.nomadMaterial.normal_neg_y;p.nomadMaterial.flip_y=true;assert.equal(nomadPBRSurfaceSources(p).normal.negY,true);
 p.nomadMaterial.always_unlit=true;assert.deepEqual(nomadPBRSurfaceSources(p),{});
});
test('1026 actual lit owner binds separate linear normal/roughness/metalness maps with factors and reflection pool, exact-once cleanup and unchanged source',async()=>{
 const {objects}=await fixture,object=structuredClone(objects[1]);object.mesh=objects[1].mesh;object.glbPassthrough.nomadMaterial.normal_neg_y=true;object.glbPassthrough.nomadMaterial.factorRoughness=.6;object.glbPassthrough.nomadMaterial.factorMetalness=.8;
 const before=JSON.stringify(object.glbPassthrough),images=[],e=environment();const f=surface(object,{renderer:{isWebGLRenderer:true},environmentPool:e.pool,decode:async c=>{const image=bitmap(c.previewSize||1024);images.push(image);return image;}});await tick();
 const m=f.overlay.material;assert(f.overlay.visible);assert(m.map);for(const key of ['normalMap','roughnessMap','metalnessMap']){assert(m[key]);assert.equal(m[key].colorSpace,THREE.NoColorSpace);assert.equal(m[key].flipY,false);}assert.deepEqual(m.normalMap.repeat.toArray(),[2,2]);assert.deepEqual(m.normalScale.toArray(),[.7,-.7]);assert.equal(m.roughness,.6);assert.equal(m.metalness,.8);assert.equal(m.roughnessMap.image.width,512);assert.equal(m.normalMap.image.width,1024);assert.equal(e.targets.length,1);assert.equal(m.envMap,e.targets[0].texture);assert.equal(f.scene.environment,null);assert.equal(JSON.stringify(object.glbPassthrough),before);
 f.geometry.dispose();f.overlay.userData.boxlabUVImageDispose();assert.equal(e.targets[0].disposals,1);assert(images.every(i=>i.closed===1));assert.equal(f.body.material,f.original);assert.equal(f.body.children.length,0);
});
test('1026 failed auxiliary preserves visible colour; cancellation closes late normal and does not start remaining decodes or acquire reflections',async()=>{
 const {objects}=await fixture,seen=[];let finish;const images=[],e=environment();const f=surface(objects[1],{renderer:{isWebGLRenderer:true},environmentPool:e.pool,decode:c=>{seen.push(c);if(c.linear)return new Promise(r=>finish=r);const image=bitmap();images.push(image);return image;}});await tick();assert(f.overlay.visible);assert.equal(seen.length,2);assert(f.overlay.material.map);assert.equal(f.overlay.material.normalMap,null);
 f.overlay.userData.boxlabUVImageDispose();const late=bitmap();finish(late);await tick();assert.equal(late.closed,1);assert.equal(seen.length,2);assert.equal(e.targets.length,0);assert.equal(images[0].closed,1);assert.equal(f.body.material,f.original);
 const b=surface(objects[1],{decode:async c=>{if(c.linear)throw Error('bad data map');return bitmap();}});await tick();assert(b.overlay.visible);assert(b.overlay.material.map);assert.equal(b.overlay.material.normalMap,null);assert.equal(b.overlay.material.roughness,.35);b.overlay.userData.boxlabUVImageDispose();
});
test('1026 native decoder uses raw linear bitmap options and bounded grayscale scalar values, refuses coloured/translucent data without touching PNG bytes',async()=>{
 const old=Object.fromEntries(['createImageBitmap','OffscreenCanvas'].map(k=>[k,Object.getOwnPropertyDescriptor(globalThis,k)]));let options,closed=0,pixels=new Uint8ClampedArray([23,23,23,255,201,201,201,255]);
 globalThis.createImageBitmap=async(_blob,o)=>{options=o;return {width:2,height:1,close(){closed++;}};};
 globalThis.OffscreenCanvas=class{constructor(w,h){this.width=w;this.height=h;}getContext(){return {drawImage(){},getImageData(){return {data:pixels.slice()};},putImageData:d=>{this.pixels=d.data;}};}};
 const {objects}=await fixture,map=nomadPBRSurfaceSources(objects[1].glbPassthrough),before=map.roughness.choice.data.slice();
 try{
  const normal=await decodeUVImage(map.normal.choice);assert.equal(options.colorSpaceConversion,'none');assert.equal(options.premultiplyAlpha,'none');assert.equal(options.resizeWidth,1024);normal.close();
  const scalar=await decodeUVImage(map.roughness.choice);assert.equal(options.resizeWidth,512);assert.equal(options.colorSpaceConversion,'none');assert.deepEqual([...scalar.pixels],[23,23,23,255,201,201,201,255]);scalar.close();
  pixels=new Uint8ClampedArray([10,80,230,255,10,80,230,255]);await assert.rejects(decodeUVImage(map.roughness.choice),/grayscale/);
  pixels=new Uint8ClampedArray([10,10,10,80,10,10,10,80]);await assert.rejects(decodeUVImage(map.metalness.choice),/opaque/);assert.deepEqual(map.roughness.choice.data,before);assert.equal(closed,4);
 }finally{for(const [k,d] of Object.entries(old))d?Object.defineProperty(globalThis,k,d):delete globalThis[k];}
});
test('1026 UV Image/unlit stay colour-only; existing explicit environment is preserved and scalar sources survive Save/Open/NOM after preview',async()=>{
 const {objects,template,bytes}=await fixture,e=environment(),seen=[];const f=surface(objects[1],{lit:false,renderer:{isWebGLRenderer:true},environmentPool:e.pool,decode:async c=>{seen.push(c);return bitmap();}});await tick();assert(f.overlay.material.isMeshBasicMaterial);assert.equal(seen.length,1);assert.equal(e.targets.length,0);f.overlay.userData.boxlabUVImageDispose();
 const external=new THREE.Texture(),g=surface(objects[1],{renderer:{isWebGLRenderer:true},environmentPool:e.pool,decode:async c=>bitmap(c.previewSize||1024)});g.scene.environment=external;await tick();assert.equal(e.targets.length,0);assert.equal(g.overlay.material.envMap,null);assert.equal(g.scene.environment,external);g.overlay.userData.boxlabUVImageDispose();external.dispose();
 const unlit={...objects[1],glbPassthrough:{...objects[1].glbPassthrough,nomadMaterial:{...objects[1].glbPassthrough.nomadMaterial,always_unlit:true}}};let calls=0;const h=surface(unlit,{decode:async()=>{calls++;return bitmap();}});await tick();assert(h.overlay.material.isMeshBasicMaterial);assert.equal(calls,1);h.overlay.userData.boxlabUVImageDispose();
 const original=buildNomadProject(objects,template,{topologySignature:sig,name:'BoxLab NOM PBR sample'}).bytes;assert.deepEqual(bytes,original);
 const encoded=encodeBoxlabScene({objects,activeId:1}),restored=decodeBoxlabScene(JSON.parse(JSON.stringify(encoded)),(...a)=>new EditableMesh(...a)).objects;
 assert.deepEqual(buildNomadProject(restored,template,{topologySignature:sig,name:'BoxLab NOM PBR sample'}).bytes,original);
 const parsed=parseNomadMeshes(original);assert.equal(parsed.meshes.length,3);assert.equal(parsed.meshes[1].glbPassthrough.nomadMaterial.textures.metalness.index>=0,true);
});
test('1026 real Studio/Solid render owner installs data maps and mode switches release all decodes while accepted colour/picking/geometry persist',async()=>{
 const {objects}=await fixture,f=facegroupsRuntime(),images=[];
 f.activeObject.glbPassthrough={...objects[1].glbPassthrough,uvTopologySignature:sig(f.source),uvCorners:f.source.faces.map(face=>face.map((_,i)=>[i%2,Math.floor(i/2)]))};
 Object.assign(f.c,{studioMaterial:new THREE.MeshStandardMaterial(),studioInactiveMaterial:new THREE.MeshStandardMaterial(),checkerHiddenMaterial:new THREE.MeshBasicMaterial(),__boxlabExportAs:{buildUVPreviewGeometry:build},createUVImageOverlay:(...args)=>createUVImageOverlay(...args.slice(0,5),{...args[5],decode:async c=>{const image=bitmap(c.previewSize||1024);images.push(image);return image;}})});
 const geometry=f.body.geometry;
 for(const mode of ['studio','solid']){f.c.mode=mode;f.c.__boxlabRenderModes.apply(f.body);await tick();const preview=f.body.children.find(n=>n.userData.boxlabUVImagePreview);assert(preview?.visible);assert(preview.material.normalMap);assert(preview.material.roughnessMap);assert(preview.material.metalnessMap);assert.equal(f.body.geometry,geometry);const hits=[];preview.raycast({},hits);assert.deepEqual(hits,[]);}
 f.c.mode='clay';f.c.__boxlabRenderModes.apply(f.body);await tick();assert.equal(f.body.material,f.c.clayMaterial);assert(images.every(i=>i.closed===1));
});
