import test from 'node:test';import assert from 'node:assert/strict';import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';import {closedGrid} from './helpers/through-validation-profile.mjs';import {buildNegativeExtrude,validateThrough} from '../src/through-kernel.js';import {snapshot,volume} from './helpers/negative-extrude-runtime.mjs';
for(const ids of [[21,16],[21,18],[21,24],[21,26]])test(`1183 vertex-only selected recesses ${ids} stay closed with exact depth`,()=>{
 const m=closedGrid(4,EditableMesh),before=snapshot(m),result=buildNegativeExtrude(m,ids,-.096);assert(result.ok,result.reason);assert(validateThrough(result.mesh).ok);assert.equal(snapshot(m),before);assert(Math.abs(volume(result.mesh)-(volume(m)-2*.25*.096))<1e-6);assert(result.faceIndices.length>=2);for(const fi of result.faceIndices)assert(result.mesh.faces[fi].every(i=>Math.abs(result.mesh.vertices[i].z-.904)<1e-6));
});
test('1183 sequential diagonal recess after existing cavity stays closed; edge-adjacent cuts still work',()=>{
 const first=buildNegativeExtrude(closedGrid(4,EditableMesh),[21],-.096);assert(first.ok);const source=snapshot(first.mesh);
 for(const centre of [[-.75,-.75],[.25,-.75],[-.75,.25],[.25,.25],[-.25,-.75]]){const fi=first.mesh.faces.findIndex((f,i)=>f.every(v=>Math.abs(first.mesh.vertices[v].z-1)<1e-7)&&first.mesh.faceCenter(i).distanceTo(new THREE.Vector3(...centre,1))<1e-7);assert(fi>=0);const r=buildNegativeExtrude(first.mesh,[fi],-.096);assert(r.ok,r.reason);assert(validateThrough(r.mesh).ok);assert.equal(snapshot(first.mesh),source);}
});

test('1183 actual multi-face preview/commit supports vertex-only selection and Undo',async()=>{
 const {faceRuntime}=await import('./helpers/negative-extrude-runtime.mjs'),m=closedGrid(4,EditableMesh),before=snapshot(m),f=faceRuntime(m,[21,16]);assert(f.start());f.move(-.096);assert(f.owner.drag().preview,f.owner.drag().failureReason);f.finish();assert(validateThrough(m).ok);assert.equal(f.history.undoStack.length,1);assert.equal(snapshot(f.history.undo(m)),before);
});
