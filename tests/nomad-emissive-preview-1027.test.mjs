import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {nomadPBRFixture} from './helpers/nomad-pbr-fixture.mjs';
import {nomadPBRSurfaceSources} from '../src/nomad-material-resource.js';
import {createUVImageOverlay} from '../src/uv-image-surface-preview.js';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {EditableMesh} from '../src/mesh.js';
import {buildNomadProject} from '../src/nomad-export-core.js';
import {meshTopologySignature} from '../src/mesh-topology-signature.js';
const fixture=nomadPBRFixture({emissive:true}),tick=()=>new Promise(r=>setImmediate(r));
const bitmap=()=>({width:1024,height:1024,closed:0,close(){this.closed++;}});
function surface(o,options={}){const body=new THREE.Mesh(o.mesh.triangulatedGeometry(),new THREE.MeshStandardMaterial()),original=body.material;return {body,original,overlay:createUVImageOverlay(body,o.mesh,o.glbPassthrough,glbOwnerRuntime().c.buildUVPreviewGeometry,new THREE.MeshBasicMaterial(),{lit:true,...options})};}
test('1027 emissive plan respects saved RGB/strength and own tiling, shares total budget and refuses unsupported/invalid factors without changing native bytes',async()=>{
 const {objects}=await fixture,p=objects[0].glbPassthrough,before=JSON.stringify(p),m=nomadPBRSurfaceSources(p).emissive;
 assert.deepEqual(m.factor,[.25,.65,1]);assert.equal(m.strength,2);assert.deepEqual(m.repeat,[3,2]);assert.equal(m.choice.linear,undefined);assert.equal(m.choice.grayscale,undefined);assert.equal(JSON.stringify(p),before);
 for(const edit of [q=>q.nomadMaterial.factorEmissive=[1,2,0],q=>q.nomadMaterial.factorEmissiveStrength=-1,q=>q.nomadMaterial.factorEmissiveStrength=Infinity,q=>q.nomadMaterial.factorEmissiveStrength=1e40,q=>q.nomadMaterial.textures.emissive.rotation=Infinity,q=>q.nomadMaterial.textures.emissive.projection='triplanar']){const q=structuredClone(p);edit(q);assert.equal(nomadPBRSurfaceSources(q).emissive,undefined);assert(nomadPBRSurfaceSources(q).normal);}
 const zero=structuredClone(p);zero.nomadMaterial.factorEmissive=[0,0,0];zero.nomadMaterial.factorEmissiveStrength=0;assert.deepEqual(nomadPBRSurfaceSources(zero).emissive.factor,[0,0,0]);assert.equal(nomadPBRSurfaceSources(zero).emissive.strength,0);
 const q=structuredClone(p),large=new Uint8Array(8*1024*1024);large.set(p.images[0].data.subarray(0,33));q.images.push({definition:{type:'image/png'},data:large});q.nomadMaterial.textures.emissive.index=q.images.length-1;assert.equal(nomadPBRSurfaceSources(q).emissive,undefined);
});
test('1027 actual material emits sRGB texture with linear saved factors and intensity, retains normal maps, source/picking and exact cleanup',async()=>{
 const {objects}=await fixture,o=objects[0],before=JSON.stringify(o.glbPassthrough),images=[],seen=[];
 const f=surface(o,{decode:async c=>{seen.push(c);const i=bitmap();images.push(i);return i;}});await tick();const m=f.overlay.material;
 assert(f.overlay.visible);assert(m.map);assert(m.normalMap);assert(m.roughnessMap);assert(m.emissiveMap);assert.equal(m.emissiveMap.colorSpace,THREE.SRGBColorSpace);assert.deepEqual(m.emissive.toArray(),[.25,.65,1]);assert.equal(m.emissiveIntensity,2);assert.deepEqual(m.emissiveMap.repeat.toArray(),[3,2]);assert.equal(m.emissiveMap.flipY,false);assert.equal(seen.at(-1).linear,undefined);assert.equal(JSON.stringify(o.glbPassthrough),before);
 const hits=[];f.overlay.raycast({},hits);assert.deepEqual(hits,[]);f.body.geometry.dispose();f.overlay.userData.boxlabUVImageDispose();assert(images.every(i=>i.closed===1));assert.equal(f.body.material,f.original);
});
test('1027 failed or late emissive keeps accepted colour/PBR and releases late decode; UV Image/unlit remain colour-only',async()=>{
 const {objects}=await fixture,o=objects[0];let finish,calls=0;const f=surface(o,{decode:c=>{if(++calls===4)return new Promise(r=>finish=r);return bitmap();}});await tick();assert.equal(calls,4);assert(f.overlay.visible);assert(f.overlay.material.normalMap);assert.equal(f.overlay.material.emissiveMap,null);f.overlay.userData.boxlabUVImageDispose();const late=bitmap();finish(late);await tick();assert.equal(late.closed,1);assert.equal(f.body.material,f.original);
 calls=0;const g=surface(o,{decode:async()=>{if(++calls===4)throw Error('bad emissive');return bitmap();}});await tick();assert(g.overlay.visible);assert(g.overlay.material.map);assert(g.overlay.material.normalMap);assert.equal(g.overlay.material.emissiveMap,null);g.overlay.userData.boxlabUVImageDispose();
 for(const mode of ['uvImage','unlit']){let n=0;const x=mode==='unlit'?{...o,glbPassthrough:{...o.glbPassthrough,nomadMaterial:{...o.glbPassthrough.nomadMaterial,always_unlit:true}}}:o;const h=surface(x,{lit:mode!=='uvImage',decode:async()=>{n++;return bitmap();}});await tick();assert.equal(n,1);assert(h.overlay.material.isMeshBasicMaterial);h.overlay.userData.boxlabUVImageDispose();}
});
test('1027 native emissive RGB/strength/encoded maps survive pooled project and native NOM byte-identical round trip',async()=>{
 const {objects,template,bytes}=await fixture,encoded=encodeBoxlabScene({objects,activeId:1}),restored=decodeBoxlabScene(JSON.parse(JSON.stringify(encoded)),(...a)=>new EditableMesh(...a)).objects;
 assert.deepEqual(buildNomadProject(restored,template,{topologySignature:meshTopologySignature,name:'BoxLab NOM PBR sample'}).bytes,bytes);
 assert.deepEqual(restored[0].glbPassthrough.nomadMaterial.factorEmissive,[.25,.65,1]);assert.equal(restored[0].glbPassthrough.nomadMaterial.factorEmissiveStrength,2);
});
