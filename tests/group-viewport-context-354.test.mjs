import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('354 selecting a whole Group promotes an in-group primary when needed',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  assert.match(src,/function ensureGroupPrimary\(members\)/);
  assert.match(src,/if\(members\.some\(o=>o\.id===activeId\(\)\)\)return/);
  assert.match(src,/manager\(\)\?\.activate\?\.\(target\.id,true\)/);
  assert.match(src,/function selectGroup\(groupId\)\{const members=groupMembers\(groupId\);ensureGroupPrimary\(members\)/);
});

test('354 whole Group selection is exposed as an explicit selection context',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  assert.match(src,/get wholeGroupId\(\)\{return selectedWholeGroupId\(\);\}/);
  assert.match(src,/block\.classList\.toggle\('group-context'/);
  assert.match(src,/group-context-member/);
});

test('354 selected Group is amber and ordinary two-object Multi stays amber blue',()=>{
  const src=fs.readFileSync(new URL('../src/boolean-ux-history.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf('function syncSelectionColours'),src.indexOf('function syncUI'));
  assert.match(block,/wholeGroupId=sel\?\.wholeGroupId\?\?null/);
  assert.match(block,/if\(wholeGroupId!=null\)/);
  assert.match(block,/applyBodyTint\(findBodyForObject\(id,id===activeId\),COLOR_A\)/);
  assert.match(block,/else if\(ids\.size===2\)/);
  assert.match(block,/COLOR_B/);
});

test('354 active member cage and verts are suppressed while whole Group context is selected',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  assert.match(src,/groupSuppressedKinds=new Set\(\['edge','vertex','mirror-edge','edge-selection-overlay'\]\)/);
  assert.match(src,/wholeGroupId!=null/);
  assert.match(src,/!\(groupContext&&groupSuppressedKinds\.has\(item\?\.userData\?\.kind\)\)/);
  assert.match(src,/queueMicrotask\(\(\)=>globalThis\.__boxlabBooleanUX\?\.sync\?\.\(\)\)/);
});

test('354 cache chain and protected transform pin remain intact',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  assert.match(index,/multi-object\.js\?v=0\.36\.18\.354/);
  assert.match(index,/object-management\.js\?v=0\.36\.18\.354/);
  assert.match(index,/boolean-ux-history\.js\?v=0\.36\.18\.354/);
  assert.match(index,/drawer-ui\.js\?v=0\.36\.18\.354/);
  assert.match(drawer,/object-management\.js\?v=0\.36\.18\.354/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
