import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('359 each object More menu restores Delete Object',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf('function renderOutliner()'),src.indexOf('function forceRender'));
  assert.match(block,/remove\.textContent = 'Delete Object'/);
  assert.match(block,/menu\.append\(lock,solo,remove\)/);
  assert.match(block,/deleteObjectById\(object\.id\)/);
});

test('359 row Delete uses one direct history checkpoint while global Delete does not double checkpoint',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  assert.match(src,/function deleteObjectById\(id,\{checkpoint=true\}=\{\}\)/);
  assert.match(src,/if\(checkpoint\)globalThis\.__boxlabObjectHistory\?\.checkpoint\?\.\(\)/);
  assert.match(src,/deleteObjectById\(activeId,\{checkpoint:false\}\)/);
});

test('359 Delete and Backspace trigger authoritative Object Delete outside editable fields',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf("window.addEventListener('keydown'"),src.indexOf("globalThis.__boxlabObjectManager"));
  assert.match(block,/event\.key !== 'Delete' && event\.key !== 'Backspace'/);
  assert.match(block,/input,textarea,select,\[contenteditable="true"\]/);
  assert.match(block,/#boxlabRenameDialog/);
  assert.match(block,/deleteButton\.click\(\)/);
});

test('359 keyboard Delete is Object-mode only and does not hijack modified shortcuts',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf("window.addEventListener('keydown'"),src.indexOf("globalThis.__boxlabObjectManager"));
  assert.match(block,/currentMode\(\) !== 'object'/);
  assert.match(block,/event\.metaKey \|\| event\.ctrlKey \|\| event\.altKey/);
});

test('359 protected Group transform baseline remains untouched',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  assert.match(index,/multi-object\.js\?v=0\.36\.18\.359/);
  assert.match(drawer,/object-origin\.js\?v=0\.36\.18\.355/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
