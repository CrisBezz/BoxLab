import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {explicitExactAndReplay} from './helpers/armed-face-behavior.mjs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('530 synthetic Repeat Exact trusts explicit current Face selection',()=>{
  assert.match(direct,/synthetic=event\.pointerId===9876/);
  assert.match(direct,/primary=synthetic\?\(selectionBefore\[0\]\?\?null\):picker\('face',event\)\?\.index/);
  assert.match(direct,/workingFaces=synthetic&&selectionBefore\.length\?\[\.\.\.selectionBefore\]/);
});

test('530 synthetic Exact skips live hit-stack repick',()=>explicitExactAndReplay());

test('530 runtime pin current and protected transform unchanged',()=>{
  assertAssetReference(index,'multi-face-direct.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
