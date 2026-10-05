import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const upgrade=fs.readFileSync(new URL('../src/transform-upgrade.js',import.meta.url),'utf8');
const rotate=fs.readFileSync(new URL('../src/rotate-transform.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('479 generic transform owner yields Face Rotate',()=>{
  assert.match(upgrade,/if\(m==='face'&&t==='rotate'\)return;/);
});

test('479 dedicated Face Rotate reads selection from authoritative bridge',()=>{
  assert.match(rotate,/function bridge\(\) \{ return globalThis\.__boxlabSelectionBridge; \}/);
  assert.match(rotate,/selectedIndices\('face'\)/);
  assert.doesNotMatch(rotate,/state\(\)\?\.selectedFaces/);
  assert.match(rotate,/mode!=='face'/);
});

test('479 Face Rotate can use transform arming state',()=>{
  assert.match(rotate,/__boxlabTransformArming\?\.tool\?\.\(\)==='rotate'/);
});

test('479 cache-hops both Face Rotate owners and leaves protected main untouched',()=>{
  assertAssetReference(index,'transform-upgrade.js');
  assertAssetReference(index,'rotate-transform.js');
  assertAssetReference(index,'main.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
