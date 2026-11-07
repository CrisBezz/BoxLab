import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {tapRemoval,dragWorkingSet,dragCancellation} from './helpers/armed-face-behavior.mjs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('484 remembers the selected face used to start the direct gesture',()=>{
  assert.match(direct,/hitFaceIndex:hit/);
});

test('484 tap on an already-selected face removes only that face',()=>tapRemoval());

test('484 drag path remains unchanged and separate from tap toggle',()=>{dragWorkingSet();dragCancellation();});

test('484 cache-hops only Face direct interaction runtime and preserves protected core',()=>{
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'main.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assertAssetReference(index,'rotate-transform.js');
});
