import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('485 armed Face owner raycasts all faces rather than selected faces only',()=>{
  assert.match(direct,/allFaceIds=m\.faces\.map\(\(_,index\)=>index\)/);
  assert.match(direct,/hit=hitSelectedFace\(event,m,allFaceIds,camera\)/);
});

test('485 tap toggles selected state both directions',()=>{
  assert.match(direct,/hitWasSelected=selectionBefore\.includes\(hit\)/);
  assert.match(direct,/d\.selectionBefore\.filter\(index=>index!==d\.hitFaceIndex\)/);
  assert.match(direct,/\[\.\.\.new Set\(\[\.\.\.d\.selectionBefore,d\.hitFaceIndex\]\)\]/);
});

test('485 drag on unselected face includes that face in modelling selection',()=>{
  assert.match(direct,/workingFaces=hitWasSelected\?\[\.\.\.selectionBefore\]:\[\.\.\.selectionBefore,hit\]/);
  assert.match(direct,/faces:\[\.\.\.workingFaces\]/);
});

test('485 cache-hops Face direct owner and preserves Rotate/main protected pins',()=>{
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.485/);
  assert.match(index,/src\/rotate-transform\.js\?v=0\.36\.18\.483/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.366/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
