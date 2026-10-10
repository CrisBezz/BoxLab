import {checkRotateRouting,checkLegacyRotateSelection} from './helpers/rotate-owner-checks.mjs';
import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const upgrade=fs.readFileSync(new URL('../src/transform-upgrade.js',import.meta.url),'utf8');
const rotate=fs.readFileSync(new URL('../src/rotate-transform.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('479 generic transform owner yields Face Rotate',()=>{
  checkRotateRouting();
});

test('479 dedicated Face Rotate reads selection from authoritative bridge',()=>{
  checkLegacyRotateSelection();
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
