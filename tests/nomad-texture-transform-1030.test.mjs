import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {nomadTextureTransformFixture} from './helpers/nomad-texture-transform-fixture.mjs';
import {nomadColourAlphaFixture} from './helpers/nomad-colour-alpha-fixture.mjs';
import {nomadColourSurfaceSource,nomadPBRSurfaceSources} from '../src/nomad-material-resource.js';
import {createUVImageOverlay} from '../src/uv-image-surface-preview.js';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {EditableMesh} from '../src/mesh.js';
import {parseNomadMeshes} from '../src/nomad-import-core.js';
import {buildNomadProject} from '../src/nomad-export-core.js';
import {meshTopologySignature as sig} from '../src/mesh-topology-signature.js';
const fixture=nomadTextureTransformFixture(),tick=()=>new Promise(r=>setImmediate(r));
const build=glbOwnerRuntime().c.buildUVPreviewGeometry,close=(a,b)=>assert(Math.abs(a-b)<1e-10,`${a} != ${b}`);
const bitmap=()=>({width:128,height:128,closed:0,close(){this.closed++;}});
function surface(o,options={}){const body=new THREE.Mesh(o.mesh.triangulatedGeometry(),new THREE.MeshStandardMaterial());return {body,original:body.material,overlay:createUVImageOverlay(body,o.mesh,o.glbPassthrough,build,new THREE.MeshBasicMaterial(),{lit:true,decode:async()=>bitmap(),...options})};}
// Independent golden oracle: conjugate the published Blender POINT mapping by
// V -> 1-V on input and output. nomad-link 08391c8, set_mapping_transform.
function linkedUV(uv,t){const [sx,sy]=t.scale,[ox,oy]=t.offset,r=t.rotation,c=Math.cos(r),s=Math.sin(r),x=uv[0],y=1-uv[1];return [c*sx*x-s*sy*y+ox+s*sy,1-(s*sx*x+c*sy*y+1-c*sy-oy)];}
function checkTexture(texture,t){
 assert.equal(texture.flipY,false);assert.equal(texture.matrixAutoUpdate,false);
 for(const uv of [[0,0],[1,0],[0,1],[.17,.81],[-.4,2.3]]){
  const expected=linkedUV(uv,t),actual=new THREE.Vector2(...uv).applyMatrix3(texture.matrix);close(actual.x,expected[0]);close(actual.y,expected[1]);
 }
}
test('1030 native UV transform uses verified top-left scale-then-rotate convention, including signed/nonuniform scale and both rotation directions',async()=>{
 const {objects}=await fixture,o=objects[0],before=JSON.stringify(o.glbPassthrough);
 for(const t of [{scale:[2,1],offset:[.25,-.4],rotation:Math.PI/2},{scale:[-2,.7],offset:[-.2,.8],rotation:-.63},{scale:[1,1],offset:[0,0],rotation:0}]){
  const object={...o,glbPassthrough:structuredClone(o.glbPassthrough)};Object.assign(object.glbPassthrough.nomadMaterial.textures.color,t);
  const f=surface(object);await tick();assert(f.overlay?.visible);checkTexture(f.overlay.material.map,t);f.overlay.userData.boxlabUVImageDispose();assert.equal(f.body.material,f.original);
 }
 assert.equal(JSON.stringify(o.glbPassthrough),before);
 const q=structuredClone(o.glbPassthrough),t=q.nomadMaterial.textures.color;delete t.scale;delete t.offset;delete t.rotation;const p=nomadColourSurfaceSource(q);assert.deepEqual(p.repeat,[1,1]);assert.deepEqual(p.offset,[0,0]);assert.equal(p.rotation,0);
});
test('1030 every actual colour/normal/scalar/emissive/alpha map has its own transform without changing alpha, data colour space or source UVs',async()=>{
 const {objects}=await nomadColourAlphaFixture(),o=objects[1],p=o.glbPassthrough,m=p.nomadMaterial;
 m.textures.emissive={...m.textures.color};m.factorEmissive=[.2,.3,.4];m.factorEmissiveStrength=2;
 const slots=['color','normal','roughness','metalness','emissive','opacity'];
 slots.forEach((slot,i)=>Object.assign(m.textures[slot],{scale:[1+i*.2,i%2?-1:2],offset:[i*.1,-i*.2],rotation:(i-2)*.27}));
 const before=JSON.stringify(p),f=surface(o);await tick();assert(f.overlay.visible);const material=f.overlay.material;
 for(const slot of slots){const texture=material[slot==='color'?'map':slot==='opacity'?'alphaMap':slot+'Map'];assert(texture,slot);checkTexture(texture,m.textures[slot]);assert.equal(texture.colorSpace,['color','emissive'].includes(slot)?THREE.SRGBColorSpace:THREE.NoColorSpace);}
 assert(material.transparent);assert.equal(material.opacity,.65*.8);assert.equal(material.depthWrite,false);assert.equal(JSON.stringify(p),before);
 const expected=build(o.mesh,p);assert.deepEqual(f.overlay.geometry.attributes.uv.array,expected.attributes.uv.array);expected.dispose();f.overlay.userData.boxlabUVImageDispose();
});
test('1030 malformed/nonfinite transforms refuse colour or just the affected auxiliary; projection guards and serial disposal remain',async()=>{
 const {objects}=await nomadColourAlphaFixture(),o=objects[1];
 for(const edit of [t=>t.offset=[NaN,0],t=>t.offset=[Infinity,0],t=>t.offset=[1],t=>t.offset=['.2',0],t=>t.offset=[1e40,0],t=>t.rotation=Infinity,t=>t.rotation='1',t=>t.scale=[0,1],t=>t.scale=[1e40,1],t=>t.projection='triplanar']){
  const p=structuredClone(o.glbPassthrough);edit(p.nomadMaterial.textures.color);assert.equal(nomadColourSurfaceSource(p,{opacity:true}),null);
  const q=structuredClone(o.glbPassthrough);edit(q.nomadMaterial.textures.normal);assert.equal(nomadPBRSurfaceSources(q,nomadColourSurfaceSource(q,{opacity:true})).normal,undefined);
 }
 let finish,calls=0;const f=surface(o,{decode:()=>{calls++;return new Promise(r=>finish=r);}});await tick();f.overlay.userData.boxlabUVImageDispose();const late=bitmap();finish(late);await tick();assert.equal(late.closed,1);assert.equal(calls,1);assert.equal(f.body.material,f.original);
});
test('1030 transformed colour also works in UV Image/unlit; pooled and inline Save/Open and real NOM parse retain exact bytes and transforms',async()=>{
 const {objects,template,bytes}=await fixture,o=objects[2];
 for(const unlit of [false,true]){const f=surface({...o,glbPassthrough:{...o.glbPassthrough,nomadMaterial:{...o.glbPassthrough.nomadMaterial,always_unlit:unlit}}},{lit:unlit});await tick();assert(f.overlay.material.isMeshBasicMaterial);checkTexture(f.overlay.material.map,o.glbPassthrough.nomadMaterial.textures.color);f.overlay.userData.boxlabUVImageDispose();}
 for(const poolImages of [true,false]){
  const restored=decodeBoxlabScene(JSON.parse(JSON.stringify(encodeBoxlabScene({objects,activeId:1},{poolImages}))),(...a)=>new EditableMesh(...a)).objects;
  assert.deepEqual(buildNomadProject(restored,template,{topologySignature:sig,name:'BoxLab NOM texture transforms'}).bytes,bytes);
 }
 const parsed=parseNomadMeshes(bytes);assert.equal(parsed.meshes.length,3);
 parsed.meshes.forEach((o,i)=>assert.deepEqual(o.glbPassthrough.nomadMaterial.textures.color,objects[i].glbPassthrough.nomadMaterial.textures.color));
});
