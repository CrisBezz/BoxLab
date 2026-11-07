import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const sweep=fs.readFileSync(new URL('../src/sweep-path.js',import.meta.url),'utf8');
const transform=fs.readFileSync(new URL('../src/transform-upgrade.js',import.meta.url),'utf8');

test('400 Draw Profile explicitly stays open for append authoring',()=>{
  assert.match(sweep,/if\(type==='draw'\)\{m\.profileClosed=false;m\.editProfile=true;disarmOther\(m,'profile'\);\}/);
  assert.match(sweep,/m\.profileClosed&&hit===null&&m\.profilePoints\.length>2\?nearestProfileSegment/);
});

test('400 Sweep edit modes disarm transforms',()=>{
  assert.match(sweep,/function disarmTransforms\(\)/);
  assert.match(sweep,/__boxlabTransformArming\?\.disarm\?\.\(\)/);
  assert.match(sweep,/if\(which==='profile'\|\|which==='path'\)disarmTransforms\(\)/);
});

test('400 transform gestures yield to Sweep editing ownership',()=>{
  assert.match(sweep,/get editing\(\)/);
  assert.match(transform,/__boxlabSweepPath\?\.editing\?\.\(\)/);
});
