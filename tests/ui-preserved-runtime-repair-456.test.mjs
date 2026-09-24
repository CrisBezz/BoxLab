import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const transform=fs.readFileSync(new URL('../src/transform-upgrade.js',import.meta.url),'utf8');
const paint=fs.readFileSync(new URL('../src/edge-paint-select.js',import.meta.url),'utf8');
const boolean=fs.readFileSync(new URL('../src/boolean-prototype.js',import.meta.url),'utf8');
const session=fs.readFileSync(new URL('../src/tool-session-ui.js',import.meta.url),'utf8');
const objectLayout=fs.readFileSync(new URL('../src/object-selection-layout.js',import.meta.url),'utf8');

test('456 preserves current UI presentation',()=>{
  assert.match(index,/boolean-tool-session-ui\.js\?v=0\.36\.18\.461/);
  assert.match(session,/\.boxlab-tool-session-shell\[hidden\]\{display:none!important/);
  assert.match(objectLayout,/grid-template-columns:repeat\(5,minmax\(0,1fr\)\)!important/);
});

test('459 preserves proven transform ownership and armed-tool component selection beneath UI',()=>{
  assert.doesNotMatch(transform,/directComponentToolActive/);
  assert.match(transform,/directFaceToolActive\(\)/);
  assert.doesNotMatch(paint,/function directToolActive\(\)/);
  assert.match(paint,/pointerType==='touch'/);
});

test('456 restores transactional Boolean one-step Undo',()=>{
  assert.match(boolean,/const beforeScene=globalThis\.__boxlabObjectHistory\?\.capture\?\.\(\)\|\|null/);
  assert.match(boolean,/checkpointSnapshot\?\.\(beforeScene\)/);
});

test('456 keeps core modelling and navigation pins',()=>{
  assert.match(index,/multi-face-direct\.js\?v=0\.36\.18\.461/);
  assert.match(index,/direct-bevel\.js\?v=0\.36\.18\.253/);
  assert.match(index,/direct-multi-vertex-bevel\.js\?v=0\.30\.1/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.match(index,/styles\.css\?v=0\.36\.18\.270/);
});
