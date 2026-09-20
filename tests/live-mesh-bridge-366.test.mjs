import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('366 main publishes the current lexical mesh before root rebuild',()=>{
  const src=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
  const start=src.indexOf('function renderMesh()');
  const block=src.slice(start,start+700);
  assert.match(block,/__boxlabBridgeState\.mesh=mesh;clearGroup\(root\)/);
  assert.ok(block.indexOf('__boxlabBridgeState.mesh=mesh') < block.indexOf('clearGroup(root)'));
  assert.ok(block.indexOf('__boxlabBridgeState.mesh=mesh') < block.indexOf('root.add(body)'));
});

test('366 linked save continues to read the bridge mesh after it is freshly published',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf('function saveActive()'),src.indexOf('function activeShouldShow'));
  assert.match(block,/const object = activeObject\(\), live = state\(\)\?\.mesh/);
  assert.match(block,/localMeshFromWorld\(live,matrixForInstance\(object\)\)/);
});

test('366 persistent inactive layer from 365 remains authoritative',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  assert.match(src,/inactiveLayer\.name='BoxLab Inactive Objects'/);
  assert.match(src,/rebuildInactiveLayer\(body\)/);
});

test('366 protected Group transform baseline remains untouched',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.366/);
  assert.match(index,/multi-object\.js\?v=0\.36\.18\.365/);
  assert.match(drawer,/object-origin\.js\?v=0\.36\.18\.355/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
