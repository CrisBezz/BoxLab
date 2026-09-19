import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('343 ordinary Duplicate remains independent',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf('function duplicateActive()'),src.indexOf('function linkedDuplicateActive()'));
  assert.match(block,/addObject\(source\.mesh/);
  assert.doesNotMatch(block,/sourceId/);
  assert.doesNotMatch(block,/instanceMatrix/);
});

test('343 Linked Duplicate shares source metadata and Make Unique detaches',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  assert.match(src,/linkedDuplicateButton\.textContent='Linked Duplicate'/);
  assert.match(src,/makeUniqueButton\.textContent='Make Unique'/);
  assert.match(src,/copy\.sourceId=sourceObject\.sourceId/);
  assert.match(src,/setInstanceMatrix\(copy,matrixForInstance\(sourceObject\)\)/);
  assert.match(src,/detachLinkedObject\(object\)/);
});

test('343 authoritative saveActive distinguishes object placement from component edits',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  assert.match(src,/if\(currentMode\(\)==='object'\)/);
  assert.match(src,/deriveInstancePlacement\(source\.mesh,live\)/);
  assert.match(src,/localMeshFromWorld\(live,matrixForInstance\(object\)\)/);
  assert.match(src,/syncLinkedPeers\(object\.sourceId,object\.id\)/);
});

test('343 joining a linked object produces a unique result',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  const join=src.slice(src.indexOf('function joinObjects'),src.indexOf('function renameActive'));
  assert.match(join,/detachLinkedObject\(primary\)/);
});

test('343 object scene history preserves link metadata',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  assert.match(src,/sourceId:o\.sourceId\|\|null/);
  assert.match(src,/instanceMatrix:Array\.isArray\(o\.instanceMatrix\)/);
  assert.match(src,/if\(s\.sourceId\)o\.sourceId=s\.sourceId/);
});

test('343 protected multi-object transform pin stays exact',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
