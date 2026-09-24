import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const handoff=fs.readFileSync(new URL('../src/persistent-face-tool-select.js',import.meta.url),'utf8');
const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');

test('458 loads armed Face selection handoff before direct Face controller',()=>{
  const handoffAt=index.indexOf('persistent-face-tool-select.js?v=0.36.18.7');
  const directAt=index.indexOf('multi-face-direct.js?v=0.36.18.242');
  assert.ok(handoffAt>=0);
  assert.ok(directAt>handoffAt);
});

test('458 armed Face handoff targets Extrude and Inset only',()=>{
  assert.match(handoff,/extrudeBtn/);
  assert.match(handoff,/insetBtn/);
  assert.match(handoff,/boxlab-direct-stable/);
  assert.match(handoff,/bridge\(\).*set\?\.\('face'/s);
});

test('458 direct Face controller still requires live selected faces before drag',()=>{
  assert.match(direct,/const ids=faces\(\);if\(!ids\.length\)return/);
});

test('458 keeps protected modelling pins',()=>{
  assert.match(index,/multi-face-direct\.js\?v=0\.36\.18\.242/);
  assert.match(index,/direct-bevel\.js\?v=0\.36\.18\.253/);
  assert.match(index,/direct-multi-vertex-bevel\.js\?v=0\.30\.1/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
