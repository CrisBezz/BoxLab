import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createLiveBooleanPreview} from '../src/live-boolean-preview.js';
import {editableBooleanRuntime} from './helpers/editable-boolean-runtime.mjs';
import {booleanMeshSignature} from '../src/editable-boolean-core.js';

test('803 private live preview can refresh during a busy transform without committing or changing history',()=>{
 const r=editableBooleanRuntime(),before=r.snapshot();r.controller.open(4);r.controller.choose(2);r.move(new THREE.Vector3(.04,.02,0));r.drag(true);
 const undo=[...r.h.undoStack],activeId=r.manager.activeId,result=booleanMeshSignature(r.objects.find(o=>o.id===4).mesh);
 assert.equal(r.controller.update().ok,false);assert.equal(r.controller.update({live:true}).ok,true);assert.equal(r.controller.apply().ok,false);assert.equal(r.controller.cancel(),false);
 assert.equal(r.manager.activeId,activeId);assert.equal(booleanMeshSignature(r.objects.find(o=>o.id===4).mesh),result);assert.deepEqual(r.h.undoStack,undo);
 r.drag(false);r.controller.cancel();assert.deepEqual(r.snapshot(),before);
});

test('803 scheduling coalesces continuous changes, suppresses failed repeats and rejects retired callbacks',()=>{
 let current={session:{},signature:'one'},id=0,calls=[],pending=new Map();const all=new Map();
 const s=createLiveBooleanPreview({read:()=>current,update:()=>{calls.push(current.signature);return{ok:false,reason:'test refusal'};},setTimer:fn=>{pending.set(++id,fn);all.set(id,fn);return id;},clearTimer:id=>pending.delete(id)});
 for(const signature of ['one','two','three']){current.signature=signature;s.notify();}assert.equal(pending.size,1);pending.get(1)();pending.delete(1);assert.deepEqual(calls,['three']);
 s.notify();assert.equal(pending.size,0);current.signature='four';s.notify();const retired=all.get(2);s.stop();current={session:{},signature:'new'};s.notify();retired();s.notify();assert.equal(pending.size,1);pending.get(3)();assert.deepEqual(calls,['three','new']);
});
