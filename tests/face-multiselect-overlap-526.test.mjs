import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {sequentialScope,selectedPriority,dragWorkingSet} from './helpers/armed-face-behavior.mjs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('526 overlap preference is single-selection only',()=>sequentialScope());

test('526 multi-face press keeps existing selected set',()=>{selectedPriority();dragWorkingSet();});

test('526 runtime pins are current and protected',()=>{
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'drawer-ui.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
