import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import * as THREE from 'three';
import {edgePickerFixture} from './helpers/edge-picker-fixture-1143.mjs';import {mainPickerRuntime} from './helpers/main-picker-runtime.mjs';import {edgePaintHitRuntime} from './helpers/edge-paint-hit-runtime-1145.mjs';import {pencilSelectionRuntime} from './helpers/pencil-selection-runtime.mjs';
test('1145 actual Visible sweep sampler keeps exact accepted IDs while using one body raycast; Through, misses and later camera changes retain all results',()=>{
 const f=edgePickerFixture(32),native=mainPickerRuntime({root:f.root,camera:f.camera,canvas:f.canvas}),r=[true,false].map(legacy=>edgePaintHitRuntime({bridge:native.bridge,legacy})),source=JSON.stringify(f.mesh),counts=[];
 for(const owner of r){f.reset();owner.hit(f.event,'edge');counts.push(f.counts());}assert(counts[0]>1);assert.equal(counts[1],1);
 for(const depth of ['visible','through','visible']){r.forEach(owner=>owner.setDepth(depth));for(const event of [f.event,{...f.event,clientX:f.event.clientX+7},{clientX:45,clientY:35}])assert.deepEqual(r[1].hit(event,'edge'),r[0].hit(event,'edge'));}
 f.camera.position.x+=2;f.camera.lookAt(16,0,16);f.camera.updateMatrixWorld();assert.deepEqual(r[1].hit(f.event,'edge'),r[0].hit(f.event,'edge'));assert.equal(JSON.stringify(f.mesh),source);f.dispose();
});
test('1145 original Pencil Edge paint gesture requests first visible sample, remains out of Orbit and ends without mesh/history changes',()=>{
 const f=pencilSelectionRuntime(),native=mainPickerRuntime({root:new THREE.Group(),camera:f.state.camera,canvas:f.canvas}),root=native.root;
 f.state.mesh.edges().forEach((edge,index)=>{const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints([f.state.mesh.vertices[edge.a],f.state.mesh.vertices[edge.b]]),new THREE.LineBasicMaterial({visible:false}));line.userData={kind:'edge',index};root.add(line);});root.updateMatrixWorld(true);
 const b=f.context.__boxlabSelectionBridge,calls=[];b.pick=(type,event)=>native.bridge.pick(type,event);b.pickHits=(type,event,options)=>{calls.push({type,options});return native.bridge.pickHits(type,event,options);};const before=JSON.stringify(f.state.mesh),p=f.screen(new THREE.Vector3(0,0,0)),q=f.screen(new THREE.Vector3(0,1,0));
 f.pointer('pointerdown',{clientX:p.x,clientY:p.y});f.pointer('pointermove',{clientX:q.x,clientY:q.y});assert.equal(f.orbit().down,0);assert(f.ids().includes(0));assert(f.ids().includes(1));assert(calls.length>0);assert(calls.every(c=>c.type==='edge'&&c.options.firstOnly===true&&c.options.through===false));f.pointer('pointerup',{clientX:q.x,clientY:q.y});f.flush();assert.equal(f.context.__boxlabPaintSelectDebug.active(),null);assert.equal(f.context.__boxlabPaintSelectDebug.pending(),null);assert.equal(JSON.stringify(f.state.mesh),before);assert.equal(f.history.undoStack.length,0);
});
test('1145 Face FRONT/Through never requests Edge first-only mode and rejected Pencil bounds guard is absent from shipped gate',()=>{
 let front=true;const calls=[],owner=edgePaintHitRuntime({bridge:{pickHits:(type,event,options)=>{calls.push(options);return[{index:1},{index:2},{index:1}];}},input:{frontOnly:()=>front}});assert.deepEqual(owner.hit({},'face'),[1]);front=false;assert.deepEqual(owner.hit({},'face'),[1,2]);assert(calls.every(c=>c.firstOnly===undefined));
 const gate=fs.readFileSync(new URL('../src/pencil-orbit-gate.js',import.meta.url),'utf8');assert(!gate.includes('const vertices=mesh.vertices;'));assert(!gate.includes('pencil-bounds-rejected'));
});
