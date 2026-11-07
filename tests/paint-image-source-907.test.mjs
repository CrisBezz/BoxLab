import test from 'node:test';import assert from 'node:assert/strict';import * as THREE from 'three';
import {inspectPaintImage,capturePaintImageSource,importPaintImage} from '../src/paint-image-source.js';
import {capturePaintImagePlacement,paintImagePlacementFromCamera,createPaintImageProjector,cyclePaintImageMode} from '../src/paint-image-placement.js';
import {cycleSurfaceTransformMode} from '../src/surface-transform-core.js?v=0.36.18.437';
function png(w=2,h=1){const a=new Uint8Array(33);a.set([137,80,78,71,13,10,26,10,0,0,0,13,73,72,68,82]);const v=new DataView(a.buffer);v.setUint32(16,w);v.setUint32(20,h);return a;}
function source(){return {version:1,mime:'image/png',width:2,height:1,rowOrder:'image-top-first',colourSpace:'srgb',alpha:'straight',encoded:png(),pixels:new Uint8Array([255,0,0,255,0,0,255,128])};}
test('907 source preserves original encoded bytes and asymmetric RGBA independently from caller and later captures',()=>{
 const input=source(),out=capturePaintImageSource(input);assert.deepEqual(out,input);assert(Object.isFrozen(out));input.encoded[0]=0;input.pixels.fill(0);assert.equal(out.encoded[0],137);assert.equal(out.pixels[7],128);const again=capturePaintImageSource(out);again.pixels.fill(0);assert.equal(out.pixels[0],255);
});
test('907 encoded preflight checks PNG/JPEG dimensions and refuses unsupported, truncated and oversized input',()=>{
 assert.deepEqual(inspectPaintImage(png()),{mime:'image/png',width:2,height:1});
 const jpeg=new Uint8Array([255,216,255,224,0,4,0,0,255,194,0,11,8,0,3,0,5,1,1,17,0]);assert.deepEqual(inspectPaintImage(jpeg),{mime:'image/jpeg',width:5,height:3});
 for(const a of [new Uint8Array(),new Uint8Array(2*1024*1024+1),png(1025,2),png(2,0),jpeg.subarray(0,15),new Uint8Array([1,2,3])])assert.throws(()=>inspectPaintImage(a));
 for(const patch of [{extra:1},{width:3},{mime:'image/jpeg'},{rowOrder:'uv-v0-first'},{alpha:'premultiplied'},{pixels:new Uint8Array(7)}])assert.throws(()=>capturePaintImageSource({...source(),...patch}));
});
test('907 async importer snapshots before await, keeps alpha/rows and closes bitmap/canvas on success or failure',async()=>{
 const input=png(),pixels=source().pixels;let release,closed=0,draws=0;const surface={width:0,height:0,getContext:()=>({drawImage(){draws++;},getImageData:()=>({data:pixels})})};
 const promise=importPaintImage(input,{decode:()=>new Promise(r=>release=r),canvas:()=>surface});input[0]=0;release({width:2,height:1,close(){closed++;}});const out=await promise;assert.equal(out.encoded[0],137);assert.deepEqual(out.pixels,pixels);assert.equal(closed,1);assert.equal(draws,1);assert.equal(surface.width,1);pixels.fill(0);assert.equal(out.pixels[0],255);
 await assert.rejects(importPaintImage(png(),{decode:async()=>({width:3,height:1,close(){closed++;}})}),/dimensions/);assert.equal(closed,2);
 await assert.rejects(importPaintImage(png(),{decode:async()=>({width:2,height:1,close(){closed++;}}),canvas:()=>({getContext:()=>null})}),/canvas/);assert.equal(closed,3);
 let called=false;await assert.rejects(importPaintImage(png(9999),{decode:async()=>{called=true;}}));assert.equal(called,false);
});
const camera=()=>{const c=new THREE.PerspectiveCamera(60,1,.1,100);c.position.set(0,0,5);c.lookAt(0,0,0);c.updateMatrixWorld(true);return c;};
const near=(a,b)=>assert(Math.abs(a-b)<1e-9,`${a} != ${b}`);
test('907 real Three camera projection retains orientation after navigation and returns top-first image coordinates',()=>{
 const c=camera(),placement=paintImagePlacementFromCamera(c),projector=createPaintImageProjector(placement),p=new THREE.Vector3(.5,.5,0),ndc=p.clone().project(c),uv=projector.project(p);near(uv.u,(ndc.x+1)/2);near(uv.v,(1-ndc.y)/2);const old={...uv};c.position.set(5,0,0);c.lookAt(0,0,0);c.updateMatrixWorld(true);assert.deepEqual(projector.project(p),old);assert.notDeepEqual(createPaintImageProjector(paintImagePlacementFromCamera(c)).project(p),old);
 assert.equal(projector.project(new THREE.Vector3(0,0,6)),null);assert.equal(projector.project(new THREE.Vector3(100,0,0)),null);assert.equal(projector.project({x:NaN,y:0,z:0}),null);
});
test('907 placement translation rotation scale and orthographic clipping have explicit coordinate conventions',()=>{
 const c=new THREE.OrthographicCamera(-1,1,1,-1,.1,10);c.position.z=5;c.updateMatrixWorld(true);
 const value=paintImagePlacementFromCamera(c,{centre:[.25,0],size:[1,1],rotation:Math.PI/2}),projector=createPaintImageProjector(value);near(projector.project(new THREE.Vector3(.25,.25,0)).u,.75);near(projector.project(new THREE.Vector3(.5,0,0)).v,.75);assert.equal(projector.project(new THREE.Vector3(-.9,-.9,0)),null);
 const captured=capturePaintImagePlacement({...value,centre:[0,0]});assert(Object.isFrozen(captured.centre));assert.throws(()=>capturePaintImagePlacement({...value,size:[0,1]}));assert.throws(()=>capturePaintImagePlacement({...value,worldToClip:Array(16).fill(0)}));assert.throws(()=>capturePaintImagePlacement({...value,extra:1}));
});
test('907 image mode uses original Insert cycle owner without pointer listeners or source mesh transforms',()=>{
 assert.equal(cyclePaintImageMode,cycleSurfaceTransformMode);let mode='move';for(const expected of ['rotate','scale','move','rotate']){mode=cyclePaintImageMode(mode);assert.equal(mode,expected);}
});
