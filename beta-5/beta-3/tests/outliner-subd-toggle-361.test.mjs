import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('361 Object rows include a per-object SubD toggle',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf('function renderOutliner()'),src.indexOf('function forceRender'));
  assert.match(block,/outliner-subd-toggle/);
  assert.match(block,/subd\.textContent = 'S'/);
  assert.match(block,/setObjectSubd\(object,!object\.settings\?\.subd\)/);
  assert.match(block,/row\.append\(name, subd, visible, more\)/);
});

test('361 SubD toggle uses existing object settings and existing active SubD control',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf('function setObjectSubd'),src.indexOf('function renderOutliner'));
  assert.match(block,/object\.settings\.subd=enabled/);
  assert.match(block,/querySelector\('#subdToggle'\)/);
  assert.match(block,/dispatchEvent\(new Event\('change'/);
  assert.match(block,/__boxlabObjectHistory\?\.checkpoint\?\.\(\)/);
});

test('361 Reference rows cannot enable SubD',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  assert.match(src,/subd\.disabled = object\.kind === 'reference'/);
  assert.match(src,/if\(!object\|\|object\.kind==='reference'\)return false/);
});

test('361 compact row allocates one extra SubD column',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  assert.match(src,/\.compact-object-row\{grid-template-columns:minmax\(0,1fr\) 28px 28px 30px!important/);
  assert.match(src,/\.outliner-subd-toggle\.active/);
});

test('361 current Object runtime and protected Group transform baseline remain intact',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  assert.match(index,/multi-object\.js\?v=0\.36\.18\.367/);
  assert.match(index,/object-management\.js\?v=0\.36\.18\.368/);
  assert.match(drawer,/object-origin\.js\?v=0\.36\.18\.355/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
