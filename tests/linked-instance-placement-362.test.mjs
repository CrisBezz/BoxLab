import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('362 object-mode linked save falls back to shared-geometry update when placement recovery fails',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf('function saveActive()'),src.indexOf('function activeShouldShow'));
  assert.match(block,/const placement=deriveInstancePlacement\(source\.mesh,live\)/);
  assert.match(block,/if\(placement\)\{\s*setInstanceMatrix\(object,placement\)/s);
  assert.match(block,/else\{\s*const local=localMeshFromWorld\(live,matrixForInstance\(object\)\)/s);
  assert.match(block,/source\.mesh=local\.clone\(\)/);
  assert.match(block,/syncLinkedPeers\(object\.sourceId,object\.id\)/);
});

test('362 linked activation regenerates world mesh from shared source and instance matrix',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf('function activateObject'),src.indexOf('function uniqueName'));
  assert.match(block,/target\.sourceId&&linkedSources\.has\(target\.sourceId\)/);
  assert.match(block,/transformEditableMesh\(source\.mesh,matrixForInstance\(target\)\)/);
  assert.match(block,/if\(evaluated\)target\.mesh=evaluated/);
});

test('362 inactive linked rendering also regenerates from source times instance matrix',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf('function displayMeshFor'),src.indexOf('function queueOutliner'));
  assert.match(block,/object\?\.sourceId&&linkedSources\.has\(object\.sourceId\)/);
  assert.match(block,/transformEditableMesh\(source\.mesh,matrixForInstance\(object\)\)/);
  assert.match(block,/object\.mesh=evaluated/);
});

test('362 protected Group transform baseline remains untouched',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  assert.match(index,/multi-object\.js\?v=0\.36\.18\.362/);
  assert.match(drawer,/object-origin\.js\?v=0\.36\.18\.355/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
