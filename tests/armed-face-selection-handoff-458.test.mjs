import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const paint=fs.readFileSync(new URL('../src/edge-paint-select.js',import.meta.url),'utf8');
const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');

test('459 removes the experimental 458 persistent Face handoff from live runtime',()=>{
  assert.doesNotMatch(index,/persistent-face-tool-select\.js/);
});

test('459 component selector remains available while direct tools are armed',()=>{
  assert.doesNotMatch(paint,/function directToolActive\(\)/);
  assert.doesNotMatch(paint,/directToolActive\(\)/);
});

test('459 still reserves touch for viewport navigation',()=>{
  assert.match(paint,/if\(event\.pointerType==='touch'\)return/);
});

test('462 restores selected-face drag ownership to the proven Face controller',()=>{
  assert.match(direct,/const ids=faces\(\);if\(!ids\.length\)return/);
  assert.match(direct,/hitSelectedFace\(event,m,ids,camera\)/);
  assert.match(direct,/drag=\{id:event\.pointerId/);
});
