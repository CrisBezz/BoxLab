import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('497 armed Face taps use only nearest native visible hit',()=>{
  assert.match(direct,/const selectionBefore=faces\(\),hit=picker\('face',event\)\?\.index/);
  assert.doesNotMatch(direct,/firstUnselected/);
  assert.doesNotMatch(direct,/pickHits\('face',event\)/);
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
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.497/);
  assert.match(index,/src\/rotate-transform\.js\?v=0\.36\.18\.483/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
