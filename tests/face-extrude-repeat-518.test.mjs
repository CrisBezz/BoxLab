import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const precision=fs.readFileSync(new URL('../src/precision-face.js',import.meta.url),'utf8');
const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('518 armed Face drag aligns live selection to working set before modelling',()=>{
  assert.match(direct,/bridge\(\)\?\.set\?\.\('face',workingFaces\)/);
  assert.match(direct,/const workingFaces=selectionBefore\.includes\(hit\)\?\[\.\.\.selectionBefore\]:\[hit\]/);
});

test('518 ordinary Extrude emits direct committed value for Repeat',()=>{
  assert.match(direct,/boxlab-face-direct-committed/);
  assert.match(direct,/tool:'extrude',value:d\.lastValue/);
  assert.match(precision,/document\.addEventListener\('boxlab-face-direct-committed'/);
  assert.match(precision,/commitOperation\('extrude',Number\(detail\.value\),'geometry'\)/);
});

test('518 preserves protected non-Face baselines',()=>{
  assert.match(drawer,/precision-face\.js\?v=0\.36\.18\.518/);
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.519/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.501/);
  assert.match(index,/src\/component-slide\.js\?v=0\.36\.18\.514/);
  assert.match(index,/src\/edge-extrude\.js\?v=0\.36\.18\.514/);
  assert.match(index,/src\/sweep-path\.js\?v=0\.36\.18\.515/);
  assert.match(index,/src\/revolve-profile\.js\?v=0\.36\.18\.517/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
