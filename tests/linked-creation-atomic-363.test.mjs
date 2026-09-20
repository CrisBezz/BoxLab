import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('363 addObject can receive linked metadata before activation',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf('function addObject'),src.indexOf('function duplicateActive'));
  assert.match(block,/if\(options\.sourceId\)object\.sourceId=options\.sourceId/);
  assert.match(block,/options\.instanceMatrix/);
  assert.match(block,/objects\.push\(object\);\s*if \(!object\.locked\) \{\s*activateObject\(object\.id\)/s);
});

test('363 linked duplicate is born linked before addObject activates it',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf('function linkedDuplicateObject'),src.indexOf('function saveActive'));
  assert.match(block,/const placement=matrixForInstance\(sourceObject\)/);
  assert.match(block,/transformEditableMesh\(source\.mesh,placement\)/);
  assert.match(block,/sourceId:sourceObject\.sourceId/);
  assert.match(block,/instanceMatrix:placement\.elements/);
  assert.doesNotMatch(block,/copy\.sourceId=/);
  assert.doesNotMatch(block,/setInstanceMatrix\(copy/);
});

test('363 second-generation linked duplicate remains on same shared source',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf('function linkedDuplicateObject'),src.indexOf('function saveActive'));
  assert.match(block,/ensureLinkedSource\(sourceObject\)/);
  assert.match(block,/sourceId:sourceObject\.sourceId/);
});

test('363 inactive linked bodies continue to evaluate from source times instance matrix',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  const display=src.slice(src.indexOf('function displayMeshFor'),src.indexOf('function queueOutliner'));
  const observer=src.slice(src.indexOf('function installRenderObserver'),src.indexOf('function installUI'));
  assert.match(display,/transformEditableMesh\(source\.mesh,matrixForInstance\(object\)\)/);
  assert.match(observer,/const display = displayMeshFor\(object\)/);
  assert.match(observer,/inactive\.userData = \{ kind:'boxlab-inactive-body', objectId:object\.id \}/);
});

test('363 protected Group transform baseline remains untouched',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  assert.match(index,/multi-object\.js\?v=0\.36\.18\.363/);
  assert.match(drawer,/object-origin\.js\?v=0\.36\.18\.355/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
