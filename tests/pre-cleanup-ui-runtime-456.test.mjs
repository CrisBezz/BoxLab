import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const session=fs.readFileSync(new URL('../src/tool-session-ui.js',import.meta.url),'utf8');
const transform=fs.readFileSync(new URL('../src/transform-upgrade.js',import.meta.url),'utf8');
const paint=fs.readFileSync(new URL('../src/edge-paint-select.js',import.meta.url),'utf8');
const boolean=fs.readFileSync(new URL('../src/boolean-prototype.js',import.meta.url),'utf8');

test('456 restores the pre-450 UI interaction architecture',()=>{
  assert.doesNotMatch(index,/boolean-tool-session-ui\.js/);
  assert.doesNotMatch(index,/ui-presentation-451\.js/);
  assert.doesNotMatch(session,/:has\(/);
  assert.doesNotMatch(session,/precisionVertexBevelRow/);
});

test('456 restores pre-cleanup transform and paint ownership',()=>{
  assert.doesNotMatch(transform,/directComponentToolActive/);
  assert.match(transform,/directFaceToolActive\(\)/);
  assert.doesNotMatch(paint,/function directToolActive\(\)/);
  assert.match(index,/edge-paint-select\.js\?v=0\.36\.18\.340/);
});

test('456 restores pre-cleanup Boolean history/runtime path',()=>{
  assert.match(boolean,/__boxlabObjectHistory\?\.checkpoint\?\.\(\)/);
  assert.doesNotMatch(boolean,/checkpointSnapshot\?\.\(beforeScene\)/);
  assert.match(index,/boolean-prototype\.js\?v=0\.36\.18\.456/);
});

test('456 keeps protected modelling pins',()=>{
  assert.match(index,/multi-face-direct\.js\?v=0\.36\.18\.242/);
  assert.match(index,/direct-bevel\.js\?v=0\.36\.18\.253/);
  assert.match(index,/direct-multi-vertex-bevel\.js\?v=0\.30\.1/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
