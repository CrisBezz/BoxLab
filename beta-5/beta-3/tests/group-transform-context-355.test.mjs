import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('355 whole Group selection is a grouped Move context even when expansion adds nothing',()=>{
  const src=fs.readFileSync(new URL('../src/object-origin.js',import.meta.url),'utf8');
  assert.match(src,/function wholeGroupSelectionActive\(\)/);
  assert.match(src,/actualSelection\(\)\?\.wholeGroupId != null/);
  assert.match(src,/t === 'move' && \(groupedExpansionActive\(\) \|\| wholeGroupSelectionActive\(\)\)/);
});

test('355 selection wrapper preserves wholeGroupId and authoritative metadata',()=>{
  const src=fs.readFileSync(new URL('../src/object-origin.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf('function wrapLegacyMultiSelection'),src.indexOf('function initialize'));
  assert.match(block,/get wholeGroupId\(\)\{ return base\.wholeGroupId \?\? null; \}/);
  assert.match(block,/__authoritative:base\.__authoritative/);
  assert.match(block,/owner:base\.owner/);
  assert.match(block,/refresh\(\)\{ return base\.refresh\?\.\(\); \}/);
});

test('355 grouped Move stays on custom group path instead of protected generic Multi path',()=>{
  const src=fs.readFileSync(new URL('../src/object-origin.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf('get multi(){'),src.indexOf('select(ids=[]'));
  assert.match(block,/t==='move'&&\(groupedExpansionActive\(\)\|\|wholeGroupSelectionActive\(\)\)/);
  assert.match(block,/return false/);
});

test('355 object-origin remains pinned while current Object UI loaders advance independently',()=>{
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  assert.match(drawer,/object-origin\.js\?v=0\.36\.18\.355/);
  assert.match(drawer,/object-management\.js\?v=0\.36\.18\.368/);
  assert.match(index,/drawer-ui\.js\?v=0\.36\.18\.361/);
  assert.match(index,/object-management\.js\?v=0\.36\.18\.368/);
});

test('355 protected multi-object transform pin remains exact',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
