import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('365 inactive objects live in persistent scene layer, not modelling root',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  assert.match(src,/inactiveLayer=new THREE\.Group\(\)/);
  assert.match(src,/inactiveLayer\.name='BoxLab Inactive Objects'/);
  assert.match(src,/scene\.add\(inactiveLayer\)/);
  assert.match(src,/layer\.add\(inactive\)/);
  assert.doesNotMatch(src,/baseAdd\.call\(this, inactive\)/);
});

test('365 active body rebuild refreshes persistent inactive layer',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf('function installRenderObserver'),src.indexOf('function installUI'));
  assert.match(block,/if \(body\) \{\s*rebuildInactiveLayer\(body\)/s);
});

test('365 inactive layer rebuild evaluates every visible non-active object',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf('function rebuildInactiveLayer'),src.indexOf('function installRenderObserver'));
  assert.match(block,/if\(object\.id===activeId\|\|!shouldShow\(object\)\)continue/);
  assert.match(block,/const display=displayMeshFor\(object\)/);
  assert.match(block,/inactive\.userData=\{kind:'boxlab-inactive-body',objectId:object\.id\}/);
});

test('365 linked source propagation and atomic creation stay intact',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  assert.match(src,/sourceId:sourceObject\.sourceId/);
  assert.match(src,/instanceMatrix:placement\.elements/);
  assert.match(src,/transformEditableMesh\(source\.mesh,matrixForInstance\(object\)\)/);
});

test('365 protected Group transform baseline remains untouched',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  assert.match(index,/multi-object\.js\?v=0\.36\.18\.365/);
  assert.match(drawer,/object-origin\.js\?v=0\.36\.18\.355/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
