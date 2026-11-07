import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {sequentialScope,selectedPriority,dragWorkingSet} from './helpers/armed-face-behavior.mjs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('527 overlap preference is Extrude-only',()=>sequentialScope());

test('527 Inset keeps pressed selected face while still accepting unselected direct press',()=>{selectedPriority();dragWorkingSet();});

test('527 runtime pins current Face direct and protected transform',()=>{
  assertAssetReference(index,'multi-face-direct.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
