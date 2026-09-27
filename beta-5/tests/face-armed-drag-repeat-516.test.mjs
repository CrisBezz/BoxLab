import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const precision=fs.readFileSync(new URL('../src/precision-face.js',import.meta.url),'utf8');
const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('516 dragging an unselected Face while armed operates that Face only',()=>{
  assert.match(direct,/const workingFaces=selectionBefore\.includes\(hit\)\?\[\.\.\.selectionBefore\]:\[hit\]/);
  assert.match(direct,/workingFaces:\[\.\.\.workingFaces\]/);
});

test('516 Face direct press exposes authoritative working set to precision/repeat capture',()=>{
  assert.match(direct,/boxlab-face-direct-press/);
  assert.match(direct,/workingFaces:\[\.\.\.workingFaces\]/);
  assert.match(precision,/document\.addEventListener\('boxlab-face-direct-press'/);
  assert.match(precision,/const tool=detail\.tool,fi=detail\.hit,ids=\[\.\.\.new Set\(detail\.workingFaces\|\|\[\]\)\]/);
});

test('516 protected runtime pins remain unchanged outside Face owners',()=>{
  assert.match(drawer,/precision-face\.js\?v=0\.36\.18\.518/);
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.519/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.520/);
  assert.match(index,/src\/component-slide\.js\?v=0\.36\.18\.514/);
  assert.match(index,/src\/edge-extrude\.js\?v=0\.36\.18\.514/);
  assert.match(index,/src\/sweep-path\.js\?v=0\.36\.18\.515/);
  assert.match(index,/src\/rotate-transform\.js\?v=0\.36\.18\.483/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
