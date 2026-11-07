import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {dragWorkingSet} from './helpers/armed-face-behavior.mjs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const precision=fs.readFileSync(new URL('../src/precision-face.js',import.meta.url),'utf8');
const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('518 armed Face drag aligns live selection to working set before modelling',()=>dragWorkingSet());

test('518 ordinary Extrude emits direct committed value for Repeat',()=>{
  assert.match(direct,/boxlab-face-direct-committed/);
  assert.match(direct,/tool:'extrude',value:d\.lastValue/);
  assert.match(precision,/document\.addEventListener\('boxlab-face-direct-committed'/);
  assert.match(precision,/commitOperation\('extrude',Number\(detail\.value\),'geometry'\)/);
});

test('518 preserves protected non-Face baselines',()=>{
  assertAssetReference(drawer,'precision-face.js');
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'main.js');
  assertAssetReference(index,'component-slide.js');
  assertAssetReference(index,'edge-extrude.js');
  assertAssetReference(index,'sweep-path.js');
  assertAssetReference(index,'revolve-profile.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
