import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const face=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const paint=fs.readFileSync(new URL('../src/edge-paint-select.js',import.meta.url),'utf8');

test('461 keeps the useful 460 legacy-Move yield',()=>{
  assert.match(main,/extrudeBtn\.boxlab-direct-stable,#insetBtn\.boxlab-direct-stable,#bevelBtn\.active/);
});

test('461 supersedes the 460 coordinator with direct self-picking',()=>{
  assert.doesNotMatch(index,/direct-tool-ownership-460\.js/);
  assert.match(face,/const hit=hitFace\(event,m,camera\)/);
  assert.match(face,/bridge\(\)\?\.set\?\.\('face',ids\)/);
});

test('461 paint selection yields to self-picking direct tools',()=>{
  assert.match(paint,/#extrudeBtn\.boxlab-direct-stable,#insetBtn\.boxlab-direct-stable,#bevelBtn\.active/);
});

test('461 preserves critical controller/runtime pins',()=>{
  assert.match(index,/multi-face-direct\.js\?v=0\.36\.18\.461/);
  assert.match(index,/direct-bevel\.js\?v=0\.36\.18\.253/);
  assert.match(index,/direct-multi-vertex-bevel\.js\?v=0\.30\.1/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
