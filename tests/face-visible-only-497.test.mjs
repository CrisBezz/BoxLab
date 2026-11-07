import {nativeFacePicker,selectedPriority,sequentialScope} from './helpers/armed-face-behavior.mjs';
import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('497 deliberate Face selection retains priority with scoped sequential continuation',()=>{
  selectedPriority();sequentialScope();nativeFacePicker();
});

test('497 tap still uses native Face toggle',()=>{
  assert.match(direct,/bridge\(\)\?\.toggle\?\.\('face',p\.hit\)/);
});

test('497 removes temporary FaceTap diagnostics',()=>{
  assert.doesNotMatch(direct,/FaceTap/);
  assert.doesNotMatch(direct,/faceTapDebug/);
});

test('497 preserves drag modelling and protected pins',()=>{
  assert.match(direct,/beginDirectDrag\(event,p\.hit,p\.selectionBefore,workingFaces\)/);
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'rotate-transform.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});

test('497 connected native picker checks reject wrong kind and farthest-hit routing',()=>{
  for(const [before,after] of [["pickKind(event,type)","pickKind(event,'edge')"],["index:hits[0].index","index:hits.at(-1).index"]]){
    assert.ok(main.includes(before));assert.throws(()=>nativeFacePicker(s=>s.replace(before,after)),assert.AssertionError);
  }
});
