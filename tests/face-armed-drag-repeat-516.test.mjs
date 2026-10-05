import {assertAssetReference} from './helpers/release-contract.mjs';
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
  assertAssetReference(drawer,'precision-face.js');
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'main.js');
  assertAssetReference(index,'component-slide.js');
  assertAssetReference(index,'edge-extrude.js');
  assertAssetReference(index,'sweep-path.js');
  assertAssetReference(index,'rotate-transform.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
