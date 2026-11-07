import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('353 rename dialog focuses and selects current text immediately',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  assert.match(src,/function requestRename\(/);
  assert.match(src,/input\.focus\(\{preventScroll:true\}\)/);
  assert.match(src,/input\.select\(\)/);
  assert.match(src,/requestAnimationFrame\(focusAndSelect\)/);
  assert.match(src,/setTimeout\(focusAndSelect,80\)/);
  assert.match(src,/globalThis\.__boxlabRenameDialog=requestRename/);
});

test('353 object Rename uses focused BoxLab rename dialog instead of window prompt',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf('async function renameActive'),src.indexOf('function deleteActive'));
  assert.match(block,/await requestRename\(\{ title:'Rename Object', value:object\.name \}\)/);
  assert.doesNotMatch(block,/window\.prompt/);
});

test('353 Group Rename uses shared focused rename dialog',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf('async function renameGroup'),src.indexOf('function ensureGroupPrimary'));
  assert.match(block,/globalThis\.__boxlabRenameDialog/);
  assert.match(block,/title:'Rename Group'/);
  assert.match(block,/groupNames\.set\(groupId,clean\)/);
});

test('353 existing Group header state reconciles after rename and state changes',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  assert.match(src,/function reconcileExistingHierarchy\(\)/);
  assert.match(src,/name\.textContent=groupLabel\(groupId\)/);
  assert.match(src,/boxlab-group-visible/);
  assert.match(src,/boxlab-group-lock/);
  assert.match(src,/reconcileExistingHierarchy\(\);decorateHierarchy\(\)/);
});

test('353 current release cache chain and protected transform pin remain intact',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  assert.match(index,/multi-object\.js\?v=0\.36\.18\.367/);
  assert.match(index,/object-management\.js\?v=0\.36\.18\.392/);
  assert.match(index,/drawer-ui\.js\?v=0\.36\.18\.361/);
  assert.match(drawer,/object-management\.js\?v=0\.36\.18\.392/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
