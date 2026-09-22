import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('356 Object rows use compact name visibility More structure',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf('function renderOutliner()'),src.indexOf('function forceRender'));
  assert.match(block,/compact-object-row/);
  assert.match(block,/outliner-visibility/);
  assert.match(block,/moreSummary\.textContent = '•••'/);
  assert.match(block,/menu\.append\(lock,solo,remove\)/);
  assert.doesNotMatch(block,/row\.append\(name, visible, lock, solo\)/);
});

test('356 Object footer is Add Duplicate More while original action buttons remain wired',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf('function installUI()'),src.indexOf('function initialize()'));
  assert.match(block,/more\.id='objectActionMore'/);
  assert.match(block,/menu\.append\(renameButton,linkedDuplicateButton,makeUniqueButton,deleteButton\)/);
  assert.match(block,/standardRow\.style\.gridTemplateColumns='minmax\(0,1fr\) minmax\(0,1fr\) 42px'/);
  assert.match(block,/linkedDuplicateButton\?\.addEventListener\('click', linkedDuplicateActive\)/);
  assert.match(block,/renameButton\?\.addEventListener\('click', renameActive\)/);
  assert.match(block,/deleteButton\?\.addEventListener\('click', deleteActive\)/);
});

test('356 Group row uses disclosure name visibility More with lock inside More',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf('function decorateHierarchy()'),src.indexOf('function updateRows()'));
  assert.match(block,/header\.append\(collapse,name,visible,more\)/);
  assert.match(block,/menu\.append\(menuLock,menuRename,menuUngroup\)/);
  assert.match(block,/menuLock\.className='boxlab-group-lock'/);
  assert.doesNotMatch(block,/header\.append\(collapse,name,visible,lock,more\)/);
});

test('356 compact Outliner CSS aligns object and group controls',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  assert.match(src,/\.compact-object-row\{grid-template-columns:minmax\(0,1fr\) 28px 28px 30px!important/);
  assert.match(src,/\.boxlab-group-row\{display:grid;grid-template-columns:20px minmax\(0,1fr\) 26px 28px/);
  assert.match(src,/\.object-action-menu/);
  assert.match(src,/\.outliner-more-menu/);
});

test('356 release cache chain and protected Group transform baseline remain intact',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  assert.match(index,/multi-object\.js\?v=0\.36\.18\.367/);
  assert.match(index,/object-management\.js\?v=0\.36\.18\.392/);
  assert.match(index,/drawer-ui\.js\?v=0\.36\.18\.361/);
  assert.match(drawer,/object-management\.js\?v=0\.36\.18\.392/);
  assert.match(drawer,/object-origin\.js\?v=0\.36\.18\.355/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
