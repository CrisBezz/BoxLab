import test from 'node:test';import assert from 'node:assert/strict';import * as THREE from 'three';
import {createPaintEnvironmentPool} from '../src/paint-material-environment.js';
import {createPaintSurface,paintTexture} from '../src/paint-target.js';
const scalar=value=>({width:16,height:16,pixels:new Uint8Array(256).fill(value)});
function poolFixture(){const generated=[];const pool=createPaintEnvironmentPool(renderer=>{const target={renderer,texture:new THREE.Texture(),disposals:0,dispose(){this.disposals++;this.texture.dispose();}};generated.push(target);return target;});return{pool,generated};}
function surface(scene,renderer,pool){const body=new THREE.Mesh(new THREE.BoxGeometry(),new THREE.MeshBasicMaterial());scene.add(body);const d=createPaintSurface(body,new THREE.BoxGeometry(),paintTexture(new Uint8Array([255,255,255,255]),1),{renderer,environmentPool:pool});return{body,d};}
test('925 smooth painted metal receives an owned reflection map while raw B metalness, G roughness and source colour stay exact',()=>{
 const scene=new THREE.Scene(),renderer={isWebGLRenderer:true},{pool,generated}=poolFixture(),{body,d}=surface(scene,renderer,pool),metal=scalar(255),rough=scalar(0),colour=new Uint8Array(512*512*4).fill(255);colour[0]=30;
 d.showMaterial(colour,rough,false,metal);const lit=d.surface.material;assert.equal(lit.envMap,generated[0].texture);assert.equal(lit.metalnessMap.image.data[2],255);assert.equal(lit.roughnessMap.image.data[1],0);assert.equal(lit.map.image.data[0],30);assert.equal(lit.metalness,1);assert.equal(lit.roughness,1);assert.equal(scene.environment,null);
 d.showChannel();assert(d.surface.material.isMeshBasicMaterial);assert.equal(d.surface.material.envMap,null);d.showMaterial(colour,scalar(255),false,metal);assert.equal(d.surface.material,lit);assert.equal(lit.envMap,generated[0].texture);assert.equal(generated.length,1);assert.equal(lit.roughnessMap.image.data[1],255);assert(metal.pixels.every(v=>v===255));assert(rough.pixels.every(v=>v===0));assert.equal(colour[0],30);
 d.dispose();d.dispose();assert.equal(generated[0].disposals,1);body.geometry.dispose();body.material.dispose();
});
test('925 original colour/roughness appearance and explicit scene environments are preserved; shared live/committed surfaces release PMREM exactly once',()=>{
 const scene=new THREE.Scene(),renderer={isWebGLRenderer:true},{pool,generated}=poolFixture(),a=surface(scene,renderer,pool),b=surface(scene,renderer,pool);
 a.d.showMaterial(null,scalar(32));assert.equal(generated.length,0);assert.equal(a.d.surface.material.envMap,null);a.d.showMaterial(null,scalar(0),false,scalar(255));b.d.showMaterial(null,scalar(255),false,scalar(128));assert.equal(generated.length,1);assert.equal(a.d.surface.material.envMap,b.d.surface.material.envMap);a.d.dispose();assert.equal(generated[0].disposals,0);
 const original=new THREE.Texture();scene.environment=original;b.d.showMaterial(null,scalar(0),false,scalar(255));assert.equal(b.d.surface.material.envMap,null);assert.equal(scene.environment,original);assert.equal(generated[0].disposals,1);b.d.dispose();assert.equal(generated[0].disposals,1);original.dispose();for(const {body} of [a,b]){body.geometry.dispose();body.material.dispose();}
});
test('925 reflection pools are renderer-specific, refuse unavailable GPU owners and recover atomically from generation failure',()=>{
 let calls=0,disposed=0;const pool=createPaintEnvironmentPool(()=>{if(++calls===1)throw Error('context lost');return{texture:{},dispose(){disposed++;}};}),one={isWebGLRenderer:true},two={isWebGLRenderer:true};assert.equal(pool.acquire(null),null);assert.equal(pool.acquire({}),null);assert.equal(calls,0);assert.throws(()=>pool.acquire(one),/context lost/);const a=pool.acquire(one),b=pool.acquire(one),c=pool.acquire(two);assert.equal(calls,3);assert.equal(a.texture,b.texture);assert.notEqual(a.texture,c.texture);a.release();a.release();assert.equal(disposed,0);b.release();c.release();assert.equal(disposed,2);
});
