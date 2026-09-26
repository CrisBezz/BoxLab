import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const paint=fs.readFileSync(new URL('../src/edge-paint-select.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('487 armed Face picker traverses live scene face meshes',()=>{
  assert.match(direct,/scene\.traverse\?\.\(object=>\{if\(object\?\.userData\?\.kind==='face'/);
  assert.match(direct,/raycaster\.intersectObjects\(objects,false\)/);
  assert.doesNotMatch(direct,/faceObjects\?\.values/);
});

test('487 armed Face direct still owns Face taps while paint selector yields',()=>{
  assert.match(direct,/globalThis\.__boxlabFaceDirect=/);
  assert.match(paint,/type==='face'&&globalThis\.__boxlabFaceDirect\?\.active\?\.\(\)/);
});

test('487 preserves additive and subtractive tap logic',()=>{
  assert.match(direct,/hitWasSelected=selectionBefore\.includes\(hit\)/);
  assert.match(direct,/d\.selectionBefore\.filter\(index=>index!==d\.hitFaceIndex\)/);
  assert.match(direct,/\[\.\.\.new Set\(\[\.\.\.d\.selectionBefore,d\.hitFaceIndex\]\)\]/);
});

test('487 cache-hops direct Face picker only and preserves protected pins',()=>{
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.487/);
  assert.match(index,/src\/edge-paint-select\.js\?v=0\.36\.18\.486/);
  assert.match(index,/src\/rotate-transform\.js\?v=0\.36\.18\.483/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.366/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
