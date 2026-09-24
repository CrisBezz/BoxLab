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

test('368 Group Boolean hides source Groups only after one scene checkpoint',()=>{
  const src=fs.readFileSync(new URL('../src/boolean-prototype.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf('function apply(operation)'),src.indexOf('ensureUI();',src.indexOf('function apply(operation)')));
  assert.match(block,/__boxlabObjectHistory\?\.checkpoint\?\.\(\)/);
  assert.match(block,/for\(const object of originals\)object\.visible=false/);
  assert.match(block,/source Groups hidden/);
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
  assert.match(index,/object-management\.js\?v=0\.36\.18\.392/);
  assert.match(index,/boolean-ux-history\.js\?v=0\.36\.18\.369/);
  assert.match(index,/boolean-prototype\.js\?v=0\.36\.18\.454/);
  assert.match(index,/multi-object\.js\?v=0\.36\.18\.367/);
  assert.match(drawer,/object-origin\.js\?v=0\.36\.18\.355/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
