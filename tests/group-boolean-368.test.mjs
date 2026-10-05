import {booleanSceneRuntime} from './helpers/boolean-scene-runtime.mjs';
import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('368 Group headers add whole Groups while Multi is active',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  assert.match(src,/function selectGroup\(groupId,\{additive=false\}=\{\}\)/);
  assert.match(src,/selectGroup\(groupId,\{additive:multiEnabled&&selectedIds\.size>0\}\)/);
  assert.match(src,/completeSelectedGroupIds:selectedCompleteGroupIds/);
});

test('368 Boolean eligibility accepts exactly two complete Groups',()=>{
  const src=fs.readFileSync(new URL('../src/boolean-prototype.js',import.meta.url),'utf8');
  assert.match(src,/combineEditableMeshes/);
  assert.match(src,/groupIds\.length!==2/);
  assert.match(src,/kind:'groups'/);
  assert.match(src,/originals:\[\.\.\.active\.members,\.\.\.other\.members\]/);
});

test('368 Group Boolean captures source Groups and commits one scene checkpoint after result activation',()=>{
  const r=booleanSceneRuntime({groups:true}),before=r.snapshot();r.events.length=0;
  r.apply('union');
  assert.deepEqual(r.events.filter(e=>['capture','add','checkpoint'].includes(e)),['capture','add','checkpoint']);
  assert.equal(r.history.undoStack.length,1);
  assert.ok(r.events.some(e=>e.includes('source Groups hidden')));
  assert.ok(r.undo());assert.deepEqual(r.snapshot(),before);
  assert.ok(r.redo());assert.equal(r.manager.activeId,6);
});

test('368 Boolean A/B UX understands Group members and headers',()=>{
  const src=fs.readFileSync(new URL('../src/boolean-ux-history.js',import.meta.url),'utf8');
  assert.match(src,/proto\?\.eligibility/);
  assert.match(src,/boolean-group-a/);
  assert.match(src,/boolean-group-b/);
  assert.match(src,/e\.a\.members/);
  assert.match(src,/e\.b\.members/);
});

test('368 protected linked-instance and Group transform baselines remain pinned',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  assertAssetReference(index,'object-management.js');
  assertAssetReference(index,'boolean-ux-history.js');
  assertAssetReference(index,'boolean-prototype.js');
  assertAssetReference(index,'multi-object.js');
  assertAssetReference(drawer,'object-origin.js');
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
