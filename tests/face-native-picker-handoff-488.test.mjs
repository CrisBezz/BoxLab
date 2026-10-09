import {deferredModelling,delegatedPicker,dragCancellation,dragWorkingSet,selectedPriority,tapRemoval,tapToggle} from './helpers/armed-face-behavior.mjs';
import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('488 deliberate selected Face presses retain direct ownership',()=>{
  selectedPriority();tapRemoval();
});

test('488 unselected Face presses resolve in the direct owner through the native bridge',()=>{
  delegatedPicker();tapToggle();
});

test('488 unselected Face press promotes only after deliberate motion',()=>{
  deferredModelling();dragWorkingSet();dragCancellation();
});

test('488 no duplicate live scene picker remains',()=>{
  assert.doesNotMatch(direct,/hitViewportFace/);
  assert.doesNotMatch(direct,/scene\.traverse/);
});

test('488 cache-hop and protected pins',()=>{
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'rotate-transform.js');
  assertAssetReference(index,'main.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
