import {delegatedPicker,tapToggle} from './helpers/armed-face-behavior.mjs';
import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const paint=fs.readFileSync(new URL('../src/edge-paint-select.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('487 armed Face tools use the native bridge rather than a parallel scene picker',()=>{
  delegatedPicker();
});

test('487 armed Face direct still owns Face taps while paint selector yields',()=>{
  assert.match(direct,/globalThis\.__boxlabFaceDirect=/);
  assert.match(paint,/type==='face'&&globalThis\.__boxlabFaceDirect\?\.active\?\.\(\)/);
});

test('487 preserves additive and subtractive tap behavior',()=>{
  tapToggle();
});

test('487 cache-hops direct Face picker only and preserves protected pins',()=>{
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'edge-paint-select.js');
  assertAssetReference(index,'rotate-transform.js');
  assertAssetReference(index,'main.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
