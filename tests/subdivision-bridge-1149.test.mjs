import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {Vector3} from 'three';
import {EditableMesh} from '../src/mesh.js';
import {subdivide} from '../src/subdivision.js';
import {loadSubdivisionWasm,wasmSubdivisionStep,equalSubdivision,subdivisionSnapshot} from '../src/subdivision-wasm-lab.js';

test('1149 direct bridge output retains editable Vector3 ownership after source changes, memory growth and transforms',async()=>{
 const {exports:kernel}=await loadSubdivisionWasm({fetcher:async()=>({ok:true,arrayBuffer:()=>fs.readFile(new URL('../src/wasm/subdivision-step.wasm',import.meta.url))})});
 const source=EditableMesh.cube();source.faceGroups=[' Front ',null,'Back','',null,'Top'];source.creases.set('0:1',.31);
 source.vertices[0].x=-0;const expected=subdivide(source,1),before=subdivisionSnapshot(source);
 // Read-only source fields also rule out using source vertices as output storage.
 source.vertices.forEach(Object.freeze);source.faces.forEach(Object.freeze);Object.freeze(source.vertices);Object.freeze(source.faces);
 const result=wasmSubdivisionStep(source,kernel).mesh;
 assert.ok(result instanceof EditableMesh);assert.ok(equalSubdivision(result,expected));assert.deepEqual(subdivisionSnapshot(source),before);
 assert.ok(result.vertices.every(v=>v instanceof Vector3));assert.equal(new Set(result.vertices).size,result.vertices.length);
 const snapshot=subdivisionSnapshot(result);kernel.memory.grow(1);new Uint8Array(kernel.memory.buffer).fill(0);
 assert.deepEqual(subdivisionSnapshot(result),snapshot);
 const clone=result.clone();result.moveComponent({type:'vertex',index:0},new Vector3(1,2,3));
 assert.deepEqual(subdivisionSnapshot(clone),snapshot);assert.notDeepEqual(subdivisionSnapshot(result),snapshot);
 result.faces[0][0]=999;result.creases.clear();result.faceGroups[0]='changed';assert.deepEqual(subdivisionSnapshot(clone),snapshot);
});

test('1149 coordinate validation rejects all nonfinite axes before invoking the unchanged WASM kernel',()=>{
 let calls=0;const kernel={step(){calls++;}};
 for(const axis of ['x','y','z'])for(const value of [NaN,Infinity,-Infinity]){
  const m=EditableMesh.cube();m.vertices[0][axis]=value;
  assert.throws(()=>wasmSubdivisionStep(m,kernel),/Invalid lab coordinate/);
 }
 assert.equal(calls,0);
});
