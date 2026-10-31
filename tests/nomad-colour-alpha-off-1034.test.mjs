import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {nomadPBRFixture} from './helpers/nomad-pbr-fixture.mjs';
import {createUVImageOverlay} from '../src/uv-image-surface-preview.js';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
const build=glbOwnerRuntime().c.buildUVPreviewGeometry;
async function surface(object){
 const body=new THREE.Mesh(object.mesh.triangulatedGeometry(),new THREE.MeshStandardMaterial());
 const original=body.material;
 const overlay=createUVImageOverlay(body,object.mesh,object.glbPassthrough,build,new THREE.MeshBasicMaterial(),{lit:true,decode:async()=>({close(){}})});
 await new Promise(resolve=>setImmediate(resolve));
 return {body,original,overlay};
}
test('1034 native colour alpha OFF always samples RGB only, even without a separate opacity map',async()=>{
 const {objects}=await nomadPBRFixture(),{body,original,overlay}=await surface(objects[2]);
 try{
  assert(overlay?.visible);
  const material=overlay.material;
  assert.equal(material.transparent,false);
  assert.equal(material.opacity,1);
  assert.equal(typeof material.onBeforeCompile,'function');
  const shader={fragmentShader:'#include <map_fragment>'};
  material.onBeforeCompile(shader);
  assert.match(shader.fragmentShader,/diffuseColor\\.rgb \\*= sampledDiffuseColor\\.rgb;/);
  assert.doesNotMatch(shader.fragmentShader,/diffuseColor \\*= sampledDiffuseColor;/);
 }finally{overlay?.userData.boxlabUVImageDispose();}
 assert.equal(body.material,original);
});
test('1034 explicit native colour alpha ON retains Three RGBA sampling',async()=>{
 const {objects}=await nomadPBRFixture(),object=objects[2];
 object.glbPassthrough.nomadMaterial.use_color_opacity=1;
 const {body,original,overlay}=await surface(object);
 try{
  assert(overlay?.visible);
  assert.equal(overlay.material.transparent,true);
  assert.equal(overlay.material.onBeforeCompile,undefined);
 }finally{overlay?.userData.boxlabUVImageDispose();}
 assert.equal(body.material,original);
});
