import {selectedPriority,sequentialScope,tapRemoval} from './helpers/armed-face-behavior.mjs';
import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('495 overlap substitution follows committed single Extrude scope',()=>{
  sequentialScope();selectedPriority();
});

test('495 deliberate selected Face tap still toggles off',()=>{
  tapRemoval();
});

test('495 trace exposes primary and chosen hit for hands-on verification',()=>{
  assert.match(direct,/primary=\$\{primary\}/);
  assert.match(direct,/stack=\[\$\{stack\}\]/);
});

test('495 cache hop and protected pins',()=>{
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'main.js');
  assertAssetReference(index,'rotate-transform.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
