import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const paint=fs.readFileSync(new URL('../src/edge-paint-select.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('486 armed Face direct uses live viewport faceObjects picker',()=>{
  assert.match(direct,/state\(\)\?\.faceObjects\?\.values/);
  assert.match(direct,/hitViewportFace\(event\)/);
});

test('486 armed Face direct exposes explicit ownership state',()=>{
  assert.match(direct,/globalThis\.__boxlabFaceDirect=/);
  assert.match(direct,/active:\(\)=>!!armed/);
});

test('486 paint selector yields while armed Face direct owns Face mode',()=>{
  assert.match(paint,/type==='face'&&globalThis\.__boxlabFaceDirect\?\.active\?\.\(\)/);
});

test('486 cache-hops both ownership modules and preserves protected pins',()=>{
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'edge-paint-select.js');
  assertAssetReference(index,'rotate-transform.js');
  assertAssetReference(index,'main.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
