import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('498 armed Face picker uses projected face polygons',()=>{
  assert.match(direct,/function pointInPolygon2D/);
  assert.match(direct,/function armedVisibleFaceHit/);
  assert.match(direct,/const poly=face\.map\(vi=>m\.vertices\[vi\]\).*screenPoint/);
});

test('498 rejects back-facing faces before choosing a hit',()=>{
  assert.match(direct,/normal\.dot\(toCamera\)<=1e-5/);
});

test('498 chooses nearest depth only among projected visible candidates',()=>{
  assert.match(direct,/candidates\.push\(\{index,distance\}\)/);
  assert.match(direct,/candidates\.sort\(\(a,b\)=>a\.distance-b\.distance\)/);
  assert.match(direct,/return candidates\[0\]\?\.index\?\?null/);
});

test('498 armed pointerdown uses screen picker, not hit-stack fallback',()=>{
  assert.match(direct,/hit=armedVisibleFaceHit\(event,m,camera\)/);
  assert.doesNotMatch(direct,/firstUnselected/);
  assert.doesNotMatch(direct,/pickHits\('face',event\)/);
});

test('498 preserves tap toggle, drag flow and protected pins',()=>{
  assert.match(direct,/bridge\(\)\?\.toggle\?\.\('face',p\.hit\)/);
  assert.match(direct,/beginDirectDrag\(event,p\.hit,p\.selectionBefore,workingFaces\)/);
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.498/);
  assert.match(index,/src\/rotate-transform\.js\?v=0\.36\.18\.483/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
