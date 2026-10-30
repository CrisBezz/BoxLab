import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {nomadOpacityFixture} from './helpers/nomad-opacity-fixture.mjs';
import {nomadColourSurfaceSource,nomadPBRSurfaceSources} from '../src/nomad-material-resource.js';
import {createUVImageOverlay} from '../src/uv-image-surface-preview.js';
import {decodeUVImage} from '../src/uv-image-preview.js';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
import {facegroupsRuntime} from './helpers/facegroups-render-runtime.mjs';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {EditableMesh} from '../src/mesh.js';
import {buildNomadProject} from '../src/nomad-export-core.js';
import {meshTopologySignature as sig} from '../src/mesh-topology-signature.js';
const fixture=nomadOpacityFixture(),tick=()=>new Promise(r=>setImmediate(r)),build=glbOwnerRuntime().c.buildUVPreviewGeometry;
const bitmap=()=>({width:512,height:512,closed:0,close(){this.closed++;}});
function surface(o,options={}){const body=new THREE.Mesh(o.mesh.triangulatedGeometry(),new THREE.MeshStandardMaterial());body.castShadow=true;const cue=new THREE.Mesh(body.geometry,new THREE.MeshBasicMaterial());cue.userData.boxlabBackfaceCue=true;body.add(cue);const original=body.material;return {body,cue,original,overlay:createUVImageOverlay(body,o.mesh,o.glbPassthrough,build,new THREE.MeshBasicMaterial(),{lit:true,...options})};}
const plan=p=>nomadColourSurfaceSource(p,{opacity:true});
test('1028 native opacity plan is lit-only, bounded grayscale with own scale/factor and explicit simple material guards; retained data untouched',async()=>{
 const {objects}=await fixture,p=objects[0].glbPassthrough,before=JSON.stringify(p),c=plan(p),m=nomadPBRSurfaceSources(p,c).opacity;
 assert.equal(c.choice.unpremultiplied,true);assert.deepEqual(m.repeat,[2,2]);assert.equal(m.factor,.8);assert.equal(m.choice.linear,true);assert.equal(m.choice.grayscale,true);assert.equal(m.choice.previewSize,512);assert.equal(JSON.stringify(p),before);
 const prior=structuredClone(objects[2].glbPassthrough);prior.nomadMaterial.use_color_opacity=1;assert.deepEqual(plan(prior).factor,nomadColourSurfaceSource(prior).factor);assert.equal(plan(prior).colourAlpha,true);
 assert.equal(nomadColourSurfaceSource(p),null);assert.equal(plan(objects[1].glbPassthrough).opacity,.35);
 for(const edit of [q=>q.nomadMaterial.material_type='refraction',q=>q.nomadMaterial.material_type='additive',q=>q.nomadMaterial.use_color_opacity=2,q=>q.nomadMaterial.opacity=-1,q=>q.nomadMaterial.factorOpacity=2]){const q=structuredClone(p);edit(q);assert.equal(plan(q),null);}
 for(const edit of [q=>q.nomadMaterial.textures.opacity.rotation=10,q=>q.nomadMaterial.textures.opacity.projection='triplanar',q=>{const a=new Uint8Array(8*1024*1024);a.set(q.images[4].data.subarray(0,33));q.images[4].data=a;}]){const q=structuredClone(p);edit(q);assert(plan(q));assert.equal(nomadPBRSurfaceSources(q,plan(q)).opacity,undefined);}
});
test('1028 real material uses linear alphaMap, ignores colour alpha in scoped shader, preserves RGB/PBR, disables opaque shadows/backface fill and restores once',async()=>{
 const {objects}=await fixture,images=[],before=JSON.stringify(objects[0].glbPassthrough),f=surface(objects[0],{decode:async()=>{const b=bitmap();images.push(b);return b;}});await tick();const m=f.overlay.material;
 assert(f.overlay.visible);assert(m.normalMap);assert(m.roughnessMap);assert(m.alphaMap);assert.equal(m.alphaMap.colorSpace,THREE.NoColorSpace);assert.deepEqual(m.alphaMap.repeat.toArray(),[2,2]);assert.equal(m.opacity,.8);assert.equal(m.transparent,true);assert.equal(m.depthWrite,false);assert.equal(m.side,THREE.DoubleSide);assert.equal(f.overlay.castShadow,false);assert.equal(f.body.castShadow,false);assert.equal(f.cue.visible,false);assert.doesNotThrow(()=>JSON.stringify(f.body.userData));
 const shader={fragmentShader:'#include <map_fragment>\n#include <alphamap_fragment>'};m.onBeforeCompile(shader);assert.match(shader.fragmentShader,/diffuseColor\.rgb \*= sampledDiffuseColor\.rgb;/);assert(!shader.fragmentShader.includes('diffuseColor *= sampledDiffuseColor;'));assert(shader.fragmentShader.includes('#include <alphamap_fragment>'));assert.equal(m.customProgramCacheKey(),'boxlab-native-opacity-1028');
 const hits=[];f.overlay.raycast({},hits);assert.deepEqual(hits,[]);assert.equal(JSON.stringify(objects[0].glbPassthrough),before);
 f.body.geometry.dispose();f.overlay.userData.boxlabUVImageDispose();assert.equal(f.body.castShadow,true);assert.equal(f.cue.visible,true);assert.equal(f.body.material,f.original);assert.equal(f.body.userData.boxlabNativeOpacityOwner,undefined);assert(images.every(i=>i.closed===1));
});
test('1028 uniform blending keeps fractional and zero opacity; serial failure/cancel cannot publish late alpha or hide accepted colour',async()=>{
 const {objects}=await fixture;
 for(const opacity of [.35,0]){const o={...objects[1],glbPassthrough:{...objects[1].glbPassthrough,nomadMaterial:{...objects[1].glbPassthrough.nomadMaterial,opacity}}};const f=surface(o,{decode:async()=>bitmap()});await tick();assert.equal(f.overlay.material.opacity,opacity);assert.equal(f.overlay.material.transparent,true);f.overlay.userData.boxlabUVImageDispose();}
 const combined={...objects[0],glbPassthrough:{...objects[0].glbPassthrough,nomadMaterial:{...objects[0].glbPassthrough.nomadMaterial,material_type:'blending',opacity:.35}}};const both=surface(combined,{decode:async()=>bitmap()});await tick();assert.equal(both.overlay.material.opacity,.8*.35);both.overlay.userData.boxlabUVImageDispose();
 let calls=0,finish;const g=surface(objects[0],{decode:()=>++calls===4?new Promise(r=>finish=r):bitmap()});await tick();assert(g.overlay.visible);assert.equal(g.overlay.material.alphaMap,null);assert.equal(g.cue.visible,true);g.overlay.userData.boxlabUVImageDispose();const late=bitmap();finish(late);await tick();assert.equal(late.closed,1);assert.equal(g.body.material,g.original);assert.equal(g.body.castShadow,true);
 calls=0;const h=surface(objects[0],{decode:async()=>{if(++calls===4)throw Error('coloured opacity refused');return bitmap();}});await tick();assert(h.overlay.visible);assert(h.overlay.material.normalMap);assert.equal(h.overlay.material.alphaMap,null);assert.equal(h.overlay.material.transparent,false);assert.equal(h.cue.visible,true);h.overlay.userData.boxlabUVImageDispose();
});
test('1028 colour bitmap keeps unpremultiplied RGB without turning sRGB into a data map; scalar opacity uses existing grayscale/alpha refusal',async()=>{
 const old=Object.getOwnPropertyDescriptor(globalThis,'createImageBitmap');let options;
 globalThis.createImageBitmap=async(_blob,o)=>{options=o;return {width:512,height:512,close(){}};};
 try{const {objects}=await fixture,c=plan(objects[0].glbPassthrough);(await decodeUVImage(c.choice)).close();assert.equal(options.premultiplyAlpha,'none');assert.equal(options.colorSpaceConversion,undefined);const map=nomadPBRSurfaceSources(objects[0].glbPassthrough,c).opacity;assert.equal(map.choice.grayscale,true);assert.equal(map.choice.channel,0);}finally{old?Object.defineProperty(globalThis,'createImageBitmap',old):delete globalThis.createImageBitmap;}
});
test('1028 actual Studio/Solid owner keeps transparency through Studio rig refresh and restores ordinary looks without source geometry/picking changes',async()=>{
 const {objects}=await fixture,f=facegroupsRuntime(),images=[];
 f.activeObject.glbPassthrough={...objects[0].glbPassthrough,uvTopologySignature:sig(f.source),uvCorners:f.source.faces.map(face=>face.map((_,i)=>[i%2,Math.floor(i/2)]))};
 Object.assign(f.c,{studioMaterial:new THREE.MeshStandardMaterial(),studioInactiveMaterial:new THREE.MeshStandardMaterial(),checkerHiddenMaterial:new THREE.MeshBasicMaterial(),__boxlabExportAs:{buildUVPreviewGeometry:build},createUVImageOverlay:(...args)=>createUVImageOverlay(...args.slice(0,5),{...args[5],decode:async()=>{const b=bitmap();images.push(b);return b;}})});
 const geometry=f.body.geometry;
 for(const mode of ['studio','solid']){f.c.mode=mode;f.c.__boxlabRenderModes.apply(f.body);await tick();const p=f.body.children.find(c=>c.userData.boxlabUVImagePreview);assert(p?.material.alphaMap);assert.equal(f.body.castShadow,false);assert.equal(f.body.geometry,geometry);assert(f.body.children.filter(c=>c.userData.boxlabBackfaceCue).every(c=>!c.visible));}
 const source=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8'),code=source.slice(source.indexOf('function refreshStudio(){'),source.indexOf('function syncStudio(){'));
 Object.assign(f.c,{mode:'studio',studioRefreshQueued:false,studioFloor:new THREE.Object3D(),studioKey:new THREE.DirectionalLight(),studioKeyTarget:new THREE.Object3D()});vm.runInContext(code,f.c);f.c.refreshStudio();f.frame();assert.equal(f.body.castShadow,false);
 const rig=new THREE.Group();rig.name='BoxLab Studio Realtime';const floor=new THREE.Mesh(new THREE.PlaneGeometry(48,48),new THREE.MeshBasicMaterial());floor.receiveShadow=true;rig.add(floor);const key=new THREE.DirectionalLight();key.castShadow=true;rig.add(key);f.scene.add(rig);f.bridge.renderer={shadowMap:{}};
 const fix=fs.readFileSync(new URL('../src/studio-scene-fix.js',import.meta.url),'utf8');vm.runInContext(fix.slice(fix.indexOf('function state(){'),fix.indexOf('function scheduleStudioUpdate(){')),f.c);f.c.updateStudioScene();assert.equal(f.body.castShadow,false,'late pointer-up scene-fix must respect opacity');
 f.c.mode='clay';f.c.__boxlabRenderModes.apply(f.body);assert.equal(f.body.userData.boxlabNativeOpacityOwner,undefined);assert.equal(f.body.material,f.c.clayMaterial);assert(images.every(i=>i.closed===1));
});
test('1028 opacity slots, types, factors and source images survive pooled Save/Open and native NOM byte-identical round trip',async()=>{
 const {objects,template,bytes}=await fixture,encoded=encodeBoxlabScene({objects,activeId:1}),restored=decodeBoxlabScene(JSON.parse(JSON.stringify(encoded)),(...a)=>new EditableMesh(...a)).objects;
 assert.deepEqual(buildNomadProject(restored,template,{topologySignature:sig,name:'BoxLab NOM opacity sample'}).bytes,bytes);assert.equal(restored[0].glbPassthrough.nomadMaterial.factorOpacity,.8);assert.equal(restored[1].glbPassthrough.nomadMaterial.material_type,'blending');assert.equal(restored[1].glbPassthrough.nomadMaterial.opacity,.35);
});
