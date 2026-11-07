import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('346 Multi Linked Duplicate reuses the existing linked control',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  assert.match(src,/const linkedDuplicateButton=document\.querySelector\('#linkedDuplicateBtn'\)/);
  assert.match(src,/linkedDuplicateButton\?\.addEventListener\('click'/);
  assert.match(src,/if\(internalAction\|\|!multiEnabled\)return/);
  assert.doesNotMatch(src,/textContent='Linked Duplicate'/);
});

test('346 Multi Linked Duplicate skips References and preserves selected group relationships',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf('function linkedDuplicateSelection()'),src.indexOf('function makeUniqueSelection()'));
  assert.match(block,/chosen\.filter\(o=>o\.kind!=='reference'\)/);
  assert.match(block,/sourceGroups=new Map\(\)/);
  assert.match(block,/copy\.groupId=sourceGroups\.get\(source\.groupId\)/);
  assert.match(block,/Reference guides skipped/);
  assert.match(block,/group relationship preserved/);
});

test('346 Multi Linked Duplicate selects the created linked set and uses one scene-before checkpoint',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf('function linkedDuplicateSelection()'),src.indexOf('function makeUniqueSelection()'));
  assert.match(block,/const beforeScene=globalThis\.__boxlabObjectHistory\?\.capture\?\.\(\)\|\|null/);
  assert.match(block,/checkpointSnapshot\?\.\(beforeScene\)/);
  assert.match(block,/multiEnabled=true;selectedIds=new Set\(created\)/);
});

test('346 manager linked duplicate helper preserves source link, placement and visibility',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf('function linkedDuplicateObject('),src.indexOf('function saveActive()'));
  assert.match(block,/ensureLinkedSource\(sourceObject\)/);
  assert.match(block,/visible:sourceObject\.visible!==false/);
  assert.match(block,/sourceId:sourceObject\.sourceId/);
  assert.match(block,/instanceMatrix:placement\.elements/);
});

test('346 Multi Make Unique detaches only selected linked objects in one history step',()=>{
  const management=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  const manager=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  const block=management.slice(management.indexOf('function makeUniqueSelection()'),management.indexOf('function deleteSelection()'));
  assert.match(block,/linkedIds\?\.\(o\.id\)\?\.length/);
  assert.match(block,/__boxlabObjectHistory\?\.checkpoint\?\.\(\)/);
  assert.match(block,/makeUniqueIds\?\.\(linked\.map\(o=>o\.id\)\)/);
  assert.match(manager,/makeUniqueIds\(ids=\[\]\) \{ return makeObjectsUnique\(ids,false\); \}/);
});

test('346 ordinary Duplicate remains independent and protected transform pin is unchanged',()=>{
  const multi=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const ordinary=multi.slice(multi.indexOf('function duplicateActive()'),multi.indexOf('function linkedDuplicateActive()'));
  assert.match(ordinary,/addObject\(source\.mesh/);
  assert.doesNotMatch(ordinary,/sourceId/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
