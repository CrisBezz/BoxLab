import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const paint=fs.readFileSync(new URL('../src/edge-paint-select.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('459 allows Pencil component selection after a direct tool is armed',()=>{
  assert.doesNotMatch(paint,/directToolActive/);
  assert.match(paint,/\['vertex', 'edge', 'face'\]\.includes\(type\)/);
  assert.match(paint,/bridge\?\.add\?\.\(type, index\)/);
});

test('459 keeps finger touch out of paint selection',()=>{
  assert.match(paint,/if\(event\.pointerType==='touch'\)return/);
});

test('459 keeps protected modelling cores pinned',()=>{
  assert.match(index,/multi-face-direct\.js\?v=0\.36\.18\.461/);
  assert.match(index,/direct-bevel\.js\?v=0\.36\.18\.253/);
  assert.match(index,/direct-multi-vertex-bevel\.js\?v=0\.30\.1/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
