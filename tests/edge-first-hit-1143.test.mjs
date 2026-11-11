import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import crypto from 'node:crypto';import * as THREE from 'three';
import {pickScreenEdges as prior} from './fixtures/performance/edge-picker-1142.mjs';
import {pickScreenEdges as current} from '../src/edge-screen-picking.js';
import {edgePickerFixture} from './helpers/edge-picker-fixture-1143.mjs';
import {mainPickerRuntime} from './helpers/main-picker-runtime.mjs';
test('1143 first-only is exact accepted stack prefix; full stack, Through and misses retain all original results after camera and geometry changes',()=>{
 for(const orthographic of [false,true]){const f=edgePickerFixture(12,{orthographic}),source=JSON.stringify(f.mesh);
 for(const event of [f.event,{...f.event,clientX:f.event.clientX+7},{...f.event,clientY:f.event.clientY-10},{clientX:45,clientY:35},{clientX:0,clientY:0}])for(const through of [false,true]){
 const old=prior(event,f.camera,f.canvas,f.root.children,{through});assert.deepEqual(current(event,f.camera,f.canvas,f.root.children,{through}),old);assert.deepEqual(current(event,f.camera,f.canvas,f.root.children,{through,firstOnly:true}),old.slice(0,1));}
 f.camera.position.x+=2;f.camera.lookAt(6,0,6);f.camera.updateMatrixWorld();f.root.children.find(o=>o.userData.kind==='edge').geometry.attributes.position.setY(0,2);f.root.updateMatrixWorld(true);
 assert.deepEqual(current(f.event,f.camera,f.canvas,f.root.children,{firstOnly:true}),prior(f.event,f.camera,f.canvas,f.root.children).slice(0,1));assert.equal(JSON.stringify(f.mesh),source);f.dispose();}
});
test('1143 native single picker stops raycasting after first visible hit; full hit-list consumer still receives complete accepted ordering',()=>{
 const f=edgePickerFixture(32),native=mainPickerRuntime({root:f.root,camera:f.camera,canvas:f.canvas});f.reset();const expected=prior(f.event,f.camera,f.canvas,f.root.children),before=f.counts();assert(expected.length>1);assert(before>1);
 f.reset();const single=native.bridge.pick('edge',f.event);assert.equal(single.index,expected[0].index);assert.equal(f.counts(),1);
 f.reset();assert.deepEqual(Array.from(native.bridge.pickHits('edge',f.event)),expected);assert.equal(f.counts(),before);f.dispose();
});
test('1143 nearer screen candidate hidden by body is skipped, never chosen by the early exit; hidden-only miss and explicit Through retain semantics',()=>{
 const root=new THREE.Group(),camera=new THREE.PerspectiveCamera(45,1,.01,100),canvas={getBoundingClientRect:()=>({left:0,top:0,width:800,height:800})};camera.position.z=5;camera.updateMatrixWorld();
 const body=new THREE.Mesh(new THREE.PlaneGeometry(4,4),new THREE.MeshBasicMaterial({side:THREE.DoubleSide}));body.userData.kind='body';root.add(body);
 function add(y,z,index){const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-1,y,z),new THREE.Vector3(1,y,z)]),new THREE.LineBasicMaterial({visible:false}));line.userData={kind:'edge',index};root.add(line);return line;}
 const visible=add(.01,0,1);add(0,-1,2);root.updateMatrixWorld(true);const event={clientX:400,clientY:400};
 assert.equal(prior(event,camera,canvas,root.children,{through:true})[0].index,2);assert.deepEqual(current(event,camera,canvas,root.children,{firstOnly:true}),prior(event,camera,canvas,root.children).slice(0,1));assert.equal(current(event,camera,canvas,root.children,{firstOnly:true})[0].index,1);
 root.remove(visible);assert.deepEqual(current(event,camera,canvas,root.children,{firstOnly:true}),[]);assert.equal(current(event,camera,canvas,root.children,{through:true,firstOnly:true})[0].index,2);
});
test('1143 frozen baseline is exact accepted .1142 shared picker, not a second runtime picker or weakened visibility fixture',()=>{
 const file=new URL('./fixtures/performance/edge-picker-1142.mjs',import.meta.url),bytes=fs.readFileSync(file);assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),'4bcb0edeea2c1435d0c859ebdfc4eab25000ecf1d609a1ea5e4015bac2942102');
 const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');assert(!main.includes('edge-picker-1142'));assert.match(main,/function pickKind\(event,kind\)\{const hits=pickKindHits\(event,kind,\{firstOnly:true\}\)/);
});
