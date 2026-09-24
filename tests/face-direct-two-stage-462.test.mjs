import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const paint=fs.readFileSync(new URL('../src/edge-paint-select.js',import.meta.url),'utf8');
const face=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');

test('462 restores proven Face direct controller pin',()=>{
  assert.match(index,/multi-face-direct\.js\?v=0\.36\.18\.242/);
  assert.match(face,/const ids=faces\(\);if\(!ids\.length\)return/);
  assert.match(face,/hitSelectedFace\(event,m,ids,camera\)/);
});

test('462 allows normal Face selection while Inset or Extrude is armed',()=>{
  assert.doesNotMatch(paint,/#extrudeBtn\.boxlab-direct-stable/);
  assert.doesNotMatch(paint,/#insetBtn\.boxlab-direct-stable/);
  assert.match(paint,/#bevelBtn\.active/);
});

test('462 keeps legacy Move out from under Face direct tools',()=>{
  assert.match(main,/#extrudeBtn\.boxlab-direct-stable,#insetBtn\.boxlab-direct-stable,#bevelBtn\.active/);
});

test('462 preserves critical modelling pins',()=>{
  assert.match(index,/direct-bevel\.js\?v=0\.36\.18\.253/);
  assert.match(index,/direct-multi-vertex-bevel\.js\?v=0\.30\.1/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
