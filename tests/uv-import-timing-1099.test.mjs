import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createUVImageOverlay,decodeSurfaceImage} from '../src/uv-image-surface-preview.js';
import {nomadColourAlphaFixture} from './helpers/nomad-colour-alpha-fixture.mjs';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';

const tick=()=>new Promise(resolve=>setImmediate(resolve));

test('.1099 measures the asynchronous image decode and time until the imported UV surface appears',async()=>{
 const globals=['__boxlabPerformance','createImageBitmap'].map(key=>[key,Object.getOwnPropertyDescriptor(globalThis,key)]);
 let now=0,finishBitmap,bitmapStarted=false;
 const stages=[];
 globalThis.__boxlabPerformance={start:()=>now,stage:(name,start)=>stages.push({name,elapsed:now-start})};
 globalThis.createImageBitmap=()=>{bitmapStarted=true;return new Promise(resolve=>{finishBitmap=resolve;});};
 try{
  const {objects}=await nomadColourAlphaFixture(),object=objects[2];
  const body=new THREE.Mesh(object.mesh.triangulatedGeometry(),new THREE.MeshStandardMaterial());
  const original=body.material,hidden=new THREE.MeshBasicMaterial();
  const overlay=createUVImageOverlay(body,object.mesh,object.glbPassthrough,glbOwnerRuntime().c.buildUVPreviewGeometry,hidden,{lit:true,decode:decodeSurfaceImage});
  assert(overlay);
  for(let i=0;i<100&&!bitmapStarted;i++)await tick();
  assert(bitmapStarted,'import should start browser image decoding');
  assert.equal(overlay.visible,false);
  assert.deepEqual(stages,[],'no completed decode or visible-surface sample before the bitmap resolves');

  now=64;
  finishBitmap({width:128,height:128,close(){}});
  for(let i=0;i<100&&!overlay.visible;i++)await tick();
  assert.equal(overlay.visible,true);
  assert.equal(body.material,hidden);
  assert.deepEqual(stages,[
   {name:'texture-decode',elapsed:64},
   {name:'texture-display',elapsed:64}
  ]);
  overlay.userData.boxlabUVImageDispose();
  assert.equal(body.material,original);
 }finally{
  for(const [key,descriptor] of globals){if(descriptor)Object.defineProperty(globalThis,key,descriptor);else delete globalThis[key];}
 }
});

test('.1099 records decode time on rejection without marking the surface visible',async()=>{
 const originals=['__boxlabPerformance','createImageBitmap'].map(key=>[key,Object.getOwnPropertyDescriptor(globalThis,key)]);
 let now=0;const stages=[];
 globalThis.__boxlabPerformance={start:()=>now,stage:(name,start)=>stages.push({name,elapsed:now-start})};
 globalThis.createImageBitmap=()=>{now=23;return Promise.reject(Error('decode failed'));};
 try{
  await assert.rejects(decodeSurfaceImage({data:Uint8Array.of(1),mime:'image/png'}),/decode failed/);
  assert.deepEqual(stages,[{name:'texture-decode',elapsed:23}]);
 }finally{for(const [key,descriptor] of originals){if(descriptor)Object.defineProperty(globalThis,key,descriptor);else delete globalThis[key];}}
});
