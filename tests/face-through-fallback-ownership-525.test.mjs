import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const fallback=fs.readFileSync(new URL('../src/sequential-through-fallback.js',import.meta.url),'utf8');
const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('525 direct Face press exposes resolved hit and pointer coordinates',()=>{
  assert.match(direct,/clientX:event\.clientX/);
  assert.match(direct,/clientY:event\.clientY/);
  assert.match(direct,/workingFaces:\[\.\.\.workingFaces\]/);
});

test('525 sequential Through fallback no longer arms from stale window pointerdown selection',()=>{
  assert.doesNotMatch(fallback,/window\.addEventListener\('pointerdown'/);
  assert.match(fallback,/document\.addEventListener\('boxlab-face-direct-press'/);
  assert.match(fallback,/faceIndex=detail\.hit/);
});

test('525 fallback only follows resolved single-Face direct press',()=>{
  assert.match(fallback,/workingFaces\.length!==1\|\|workingFaces\[0\]!==detail\.hit/);
});

test('525 runtime cache hops both direct Face and fallback loader',()=>{
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'drawer-ui.js');
  assertAssetReference(drawer,'sequential-through-fallback.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
