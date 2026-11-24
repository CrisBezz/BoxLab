import test from 'node:test';import assert from 'node:assert/strict';
import {EditableMesh} from '../src/mesh.js';
import {fixture} from './helpers/retopo-runtime.mjs';
test('actual Retopo session creates separate loose geometry, cancels drags, preserves source and uses native Undo/Redo',()=>{
 const f=fixture(),source=JSON.stringify(f.objects[0].mesh);assert.equal(f.api.start(),true);f.field('#retopoVertex').click();
 f.pointer('pointerdown');f.pointer('pointerup');assert.equal(f.api.active,true);assert.equal(f.objects.length,2);assert.equal(f.state.mesh.vertices.length,1);assert.equal(f.state.mesh.looseVertices.size,1);assert.equal(JSON.stringify(f.objects[0].mesh),source);
 f.history('undo');assert.equal(f.objects.length,1);assert.equal(f.state.mesh.vertices.length,8);
 f.history('redo');assert.equal(f.api.active,true);assert.equal(f.objects.length,2);assert.equal(f.state.mesh.vertices.length,1);
 const before=f.state.mesh.vertices[0].clone();f.pointer('pointerdown');f.pointer('pointermove',425);f.pointer('pointerup',425);assert.ok(f.state.mesh.vertices[0].x>before.x);assert.equal(f.state.mesh.vertices[0].z,1);
 const after=f.state.mesh.vertices[0].clone();f.history('undo');assert.ok(f.state.mesh.vertices[0].equals(before));f.history('redo');assert.ok(f.state.mesh.vertices[0].equals(after));
 f.pointer('pointerdown',425);f.pointer('pointermove',440);f.pointer('pointercancel',440);assert.ok(f.state.mesh.vertices[0].equals(after));
 f.api.close();assert.equal(f.api.active,false);assert.equal(f.state.controls.enabled,true);assert.equal(JSON.stringify(f.objects[0].mesh),source);
});
test('empty-space contacts, free drags and touch navigation do not create geometry or history',()=>{
 const f=fixture();f.api.start();f.field('#retopoVertex').click();assert.equal(f.pointer('pointerdown',400,400,{pointerType:'touch'}).prevented,undefined);f.pointer('pointerup',400,400,{pointerType:'touch'});
 f.pointer('pointerdown',0,0);f.pointer('pointerup',0,0);f.pointer('pointerdown');f.pointer('pointermove',430);f.pointer('pointerup',430);assert.equal(f.objects.length,1);assert.equal(f.h.undoStack.length,0);
});
test('context change during a drag never edits another object; Done retains vertices',()=>{
 const f=fixture();f.api.start();f.field('#retopoVertex').click();f.pointer('pointerdown');f.pointer('pointerup');f.pointer('pointerdown');f.pointer('pointermove',420);const m=f.state.mesh;f.state.mesh=EditableMesh.cube();f.pointer('pointercancel');assert.equal(f.state.mesh.vertices.length,8);assert.equal(f.state.controls.enabled,true);assert.equal(m.vertices.length,1);f.api.close();
});
