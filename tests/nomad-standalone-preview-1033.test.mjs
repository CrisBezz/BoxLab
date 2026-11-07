import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as THREE from 'three';
import {nomadStandaloneFixture} from './helpers/nomad-standalone-fixture.mjs';
import {nomadLitSurfaceSource} from '../src/nomad-material-resource.js';
import {createUVImageOverlay} from '../src/uv-image-surface-preview.js';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
import {parseNomadMeshes} from '../src/nomad-import-core.js';
import {buildNomadProject} from '../src/nomad-export-core.js';
import {meshTopologySignature} from '../src/mesh-topology-signature.js';
import {assertNomadFixtureEquivalent} from './helpers/nomad-fixture-equivalence.mjs';
const tick=()=>new Promise(r=>setImmediate(r)),build=glbOwnerRuntime().c.buildUVPreviewGeometry;
function surface(o,options={}){const body=new THREE.Mesh(o.mesh.triangulatedGeometry(),new THREE.MeshStandardMaterial()),original=body.material;body.castShadow=true;const scene=new THREE.Scene();scene.add(body);const overlay=createUVImageOverlay(body,o.mesh,o.glbPassthrough,build,new THREE.MeshBasicMaterial(),{lit:true,decode:async()=>({close(){}}),...options});return {body,original,overlay};}
test('1033 six independent channels coexist through original owner; data maps need no colour bitmap and source remains exact',async()=>{
 const {objects,template,bytes}=await nomadStandaloneFixture(),before=structuredClone(objects.map(o=>o.glbPassthrough)),images=[];
 const surfaces=objects.map(o=>surface(o,{decode:async c=>{const image={closed:0,close(){this.closed++;}};images.push({image,c});return image;}}));await tick();
 try{assert.equal(surfaces[6].overlay,null);for(let i=0;i<6;i++){const {overlay}=surfaces[i];assert(overlay?.visible);const key=['map','normalMap','emissiveMap','roughnessMap','metalnessMap','alphaMap'][i];assert(overlay.material[key]);if(i){assert.equal(overlay.material.map,null);assert.deepEqual(overlay.material.color.toArray(),[.65,.65,.65]);}}assert.equal(images.length,6);assert.equal(surfaces[5].body.castShadow,false);assert.deepEqual(objects.map(o=>o.glbPassthrough),before);assert.deepEqual(buildNomadProject(objects,template,{topologySignature:meshTopologySignature,name:'BoxLab standalone maps'}).bytes,bytes);assert.equal(parseNomadMeshes(bytes).meshes.length,7);}
 finally{for(const s of surfaces)s.overlay?.userData.boxlabUVImageDispose();}assert(images.every(({image})=>image.closed===1));for(const s of surfaces){assert.equal(s.body.material,s.original);assert.equal(s.body.castShadow,true);}
});
test('1033 standalone refusal and failed/late decodes preserve body and release reservation',async()=>{
 const {objects}=await nomadStandaloneFixture(),o=objects[1],p=o.glbPassthrough;
 for(const change of [m=>m.textures.color={index:999},m=>m.always_unlit=true,m=>m.color=[NaN,1,1],m=>m.material_type='additive',m=>m.textures.normal.projection='triplanar']){const q=structuredClone(p);change(q.nomadMaterial);assert.equal(nomadLitSurfaceSource(q),null);}
 assert.equal(surface(o,{lit:false}).overlay,null);
 const failed=surface(o,{decode:async()=>{throw Error('bad image');}});await tick();assert.equal(failed.body.material,failed.original);assert.equal(failed.body.children.length,0);
 let finish;const late=surface(o,{decode:()=>new Promise(r=>finish=r)});await tick();assert.equal(late.overlay.visible,false);late.overlay.userData.boxlabUVImageDispose();let closed=0;finish({close(){closed++;}});await tick();assert.equal(closed,1);assert.equal(late.body.material,late.original);
 const held=Array.from({length:8},()=>surface(o));assert(held.every(s=>s.overlay));assert.equal(surface(o).overlay,null);held.forEach(s=>s.overlay.userData.boxlabUVImageDispose());await tick();const again=surface(o);assert(again.overlay);again.overlay.userData.boxlabUVImageDispose();
});
test('1033 downloadable fixture matches generated native structure and decoded pixels',async()=>{const {bytes}=await nomadStandaloneFixture();await assertNomadFixtureEquivalent(new Uint8Array(fs.readFileSync(new URL('../docs/samples/NOM_STANDALONE_MAPS_1033.nom',import.meta.url))),bytes);});

test('1033 combined decoded-pixel budget preserves four full colour surfaces and refuses extra map-only work',async()=>{
 const {objects}=await nomadStandaloneFixture(),{nomadMapInspectionFixture}=await import('./helpers/nomad-map-inspection-fixture.mjs'),{objects:[full]}=await nomadMapInspectionFixture();
 const held=Array.from({length:4},()=>surface(full));assert(held.every(s=>s.overlay));assert.equal(surface(objects[1]).overlay,null);held.forEach(s=>s.overlay.userData.boxlabUVImageDispose());await tick();const free=surface(objects[1]);assert(free.overlay);free.overlay.userData.boxlabUVImageDispose();
});
