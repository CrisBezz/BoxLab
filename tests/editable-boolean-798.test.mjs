import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {booleanMeshSignature,editableBooleanEligibility,recordBooleanRecipe} from '../src/editable-boolean-core.js';
import {topologyInfo} from '../src/boolean-classify.js';
import {editableBooleanRuntime} from './helpers/editable-boolean-runtime.mjs';

for(const operation of ['union','difference','intersection'])test(`798 ${operation}: real creation recipe, source transform, result replacement and one scene Undo/Redo`,()=>{
  const r=editableBooleanRuntime(operation),before=r.snapshot(),result=r.objects.find(o=>o.id===4);
  assert.equal(result.booleanRecipe.operation,operation);
  assert.equal(r.controller.open(4).ok,true);assert.equal(r.manager.activeId,1);
  r.controller.choose(2);r.move(new THREE.Vector3(.09,.04,-.03));
  assert.equal(r.controller.update().ok,true);
  const preview=booleanMeshSignature(r.controller.state().preview);assert.equal(topologyInfo(r.controller.state().preview).closed,true);
  assert.equal(r.controller.apply().ok,true);
  const after=r.snapshot();assert.equal(r.h.undoStack.length,2,'creation + edit');assert.equal(r.objects.length,4);
  assert.equal(r.manager.activeId,4);assert.equal(booleanMeshSignature(r.objects.find(o=>o.id===4).mesh),preview);
  assert.deepEqual(after.objects.find(o=>o.id===3),before.objects.find(o=>o.id===3));
  assert.equal(r.objects.find(o=>o.id===1).visible,false);assert.equal(r.objects.find(o=>o.id===2).visible,false);
  r.manager.replaceActiveMesh(r.h.undo(r.live));assert.deepEqual(r.snapshot(),before);
  r.manager.replaceActiveMesh(r.h.redo(r.live));assert.deepEqual(r.snapshot(),after);
  assert.equal(r.controller.open(4).ok,true);assert.equal(r.controller.cancel(),true);
});
test('798 Cancel after A/B history swaps restores source meshes, visibility, scene and exact redo tokens',()=>{
  const r=editableBooleanRuntime();r.h.push(r.live);r.live.vertices.forEach(v=>v.x+=.03);const restored=r.h.undo(r.live);
  // undo returns geometry to the caller in the real app; replace through manager.
  r.manager.replaceActiveMesh(restored);
  const before=r.snapshot(),undo=[...r.h.undoStack],redo=[...r.h.redoStack];
  assert.equal(r.controller.open(4).ok,true);r.move(new THREE.Vector3(.1,0,0));r.controller.choose(2);r.move(new THREE.Vector3(0,.1,0));
  assert.equal(r.controller.cancel(),true);assert.deepEqual(r.snapshot(),before);
  assert.equal(r.h.undoStack.length,undo.length);r.h.undoStack.forEach((token,i)=>assert.equal(token,undo[i]));assert.equal(r.h.redoStack.length,redo.length);r.h.redoStack.forEach((token,i)=>assert.equal(token,redo[i]));assert.equal(r.controller.cancel(),false);
});
test('798 failed Update/Apply retains last valid preview; Apply recomputes after later movement',()=>{
  const r=editableBooleanRuntime();r.controller.open(4);r.controller.choose(2);r.move(new THREE.Vector3(.03,0,0));
  assert.equal(r.controller.update().ok,true);const preview=r.controller.state().preview,old=booleanMeshSignature(preview);
  r.move(new THREE.Vector3(30,0,0));r.controller.operation('intersection');
  const undo=[...r.h.undoStack];assert.equal(r.controller.update().ok,false);assert.equal(r.controller.state().preview,preview);
  assert.equal(r.controller.apply().ok,false);assert.equal(r.h.undoStack.length,undo.length);r.h.undoStack.forEach((token,i)=>assert.equal(token,undo[i]));assert.equal(r.controller.active(),true);
  r.move(new THREE.Vector3(-30,.08,.03));r.controller.operation('difference');assert.equal(r.controller.apply().ok,true);
  assert.notEqual(booleanMeshSignature(r.objects.find(o=>o.id===4).mesh),old);
});
test('798 no-op Apply adds no history; busy controls yield; history Undo cancels edit first',()=>{
  const r=editableBooleanRuntime(),before=r.snapshot(),undo=[...r.h.undoStack];
  r.controller.open(4);r.drag(true);assert.equal(r.controller.cancel(),false);assert.equal(r.controller.update().ok,false);assert.equal(r.controller.apply().ok,false);
  r.drag(false);assert.equal(r.controller.apply().unchanged,true);assert.deepEqual(r.snapshot(),before);assert.equal(r.h.undoStack.length,undo.length);r.h.undoStack.forEach((token,i)=>assert.equal(token,undo[i]));
  r.controller.open(4);r.move(new THREE.Vector3(.1,0,0));assert.equal(r.h.undo(r.live),null);assert.equal(r.controller.active(),false);assert.deepEqual(r.snapshot(),before);
});
test('798 source/recipe safeguards refuse linked, grouped, modified, missing and nested inputs',()=>{
  const r=editableBooleanRuntime(),result=r.objects.find(o=>o.id===4),a=r.objects[0];
  const check=()=>editableBooleanEligibility(r.manager.objects,result);
  for(const [key,value] of [['sourceId','link'],['groupId',7],['booleanRecipe',{}],['locked',true],['kind','reference']]){a[key]=value;assert.equal(check().ok,false);delete a[key];}a.kind='editable';a.locked=false;
  a.settings.subd=true;assert.equal(check().ok,false);a.settings.subd=false;
  result.mesh.vertices[0].x+=.1;r.manager.replaceActiveMesh(result.mesh);assert.equal(check().ok,false);
  const old=EditableMesh.cube(),out={mesh:old};assert.equal(recordBooleanRecipe(out,{kind:'groups'},'union'),false);
  const plain={id:9,mesh:old,settings:{},kind:'editable'};assert.equal(recordBooleanRecipe(out,{kind:'objects',active:plain,other:{...plain,id:10}},'bad'),false);
});
