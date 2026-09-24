import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const owner=fs.readFileSync(new URL('../src/direct-tool-ownership-460.js',import.meta.url),'utf8');

test('460 legacy component drag yields to mature Face and Edge direct tools',()=>{
  assert.match(main,/extrudeBtn\.boxlab-direct-stable,#insetBtn\.boxlab-direct-stable,#bevelBtn\.active/);
});

test('460 keeps Face component selection enabled after arming Inset or Extrude',()=>{
  assert.match(owner,/#extrudeBtn,#insetBtn/);
  assert.match(owner,/requestAnimationFrame\(\(\)=>globalThis\.__boxlabComponentMultiInit\?\.enable\?\.\(\)\)/);
});

test('460 only normalizes an invalid additive Bevel selection',()=>{
  assert.match(owner,/if\(mesh\.generalBevelSelectionInfo\?\.\(ids\)\)return/);
  assert.match(owner,/bridge\(\)\?\.set\?\.\('edge',\[hit\]\)/);
});

test('460 coordinator loads after component paint and before direct Bevel',()=>{
  const paint=index.indexOf('edge-paint-select.js?v=0.36.18.461');
  const ownerAt=index.indexOf('direct-tool-ownership-460.js?v=0.36.18.461');
  const bevel=index.indexOf('direct-bevel.js?v=0.36.18.253');
  assert.ok(paint>=0&&ownerAt>paint&&bevel>ownerAt);
});

test('460 preserves mature topology/direct controller pins',()=>{
  assert.match(index,/multi-face-direct\.js\?v=0\.36\.18\.461/);
  assert.match(index,/direct-bevel\.js\?v=0\.36\.18\.253/);
  assert.match(index,/direct-multi-vertex-bevel\.js\?v=0\.30\.1/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
