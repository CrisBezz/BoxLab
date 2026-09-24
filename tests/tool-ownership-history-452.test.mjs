import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('456 Boolean uses transactional pre-scene snapshot for one-step Undo',()=>{
  const src=fs.readFileSync(new URL('../src/boolean-prototype.js',import.meta.url),'utf8');
  assert.match(src,/const beforeScene=globalThis\.__boxlabObjectHistory\?\.capture\?\.\(\)\|\|null/);
  assert.match(src,/checkpointSnapshot\?\.\(beforeScene\)/);
});

test('456 shared transform returns to proven pre-reorder ownership',()=>{
  const src=fs.readFileSync(new URL('../src/transform-upgrade.js',import.meta.url),'utf8');
  assert.match(src,/function directFaceToolActive\(\)/);
  assert.doesNotMatch(src,/function directComponentToolActive\(\)/);
});
