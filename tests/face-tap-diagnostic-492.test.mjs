import {faceDiagnostics,nativeFacePicker} from './helpers/armed-face-behavior.mjs';
import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('492 retired FaceTap overlay stays absent and central owner records completion',()=>{
  assert.doesNotMatch(direct,/faceTapDebug|FaceTap •/);faceDiagnostics();
});

test('492 semantic press keeps immutable selection evidence through tap and Cancel',()=>{
  faceDiagnostics();
});

test('492 current native picker and toggle behavior is preserved',()=>{
  nativeFacePicker();
});

test('492 cache hop and protected pins',()=>{
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'main.js');
  assertAssetReference(index,'rotate-transform.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});

test('492 current diagnostic behavior rejects missing semantic press, wrong hit and missing finish evidence',()=>{
  for(const [before,after] of [["new CustomEvent('boxlab-face-direct-press'","new CustomEvent('wrong-face-press'"],["    hit,\n    selectionBefore:[...selectionBefore],\n    workingFaces:[...workingFaces]\n  }}));","    hit:99,\n    selectionBefore:[...selectionBefore],\n    workingFaces:[...workingFaces]\n  }}));"],["log?.('FACE DIRECT FINISH'","log?.('WRONG FINISH'"]]){
    assert.ok(direct.includes(before),before);assert.throws(()=>faceDiagnostics(s=>s.replace(before,after)),assert.AssertionError);
  }
});
