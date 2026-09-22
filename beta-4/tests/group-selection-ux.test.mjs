import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('349 one whole group is a first-class rename target',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  assert.match(src,/function selectedWholeGroupId\(/);
  assert.match(src,/members\.length===chosen\.length/);
  assert.match(src,/renameButton\.textContent=wholeGroupId!=null\?'Rename Group':'Rename'/);
  assert.match(src,/chosen\.length===1\|\|wholeGroupId!=null/);
});

test('349 Rename Group uses the normal Object Rename button and one history step',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  assert.match(src,/async function renameGroup\(groupId\)/);
  assert.match(src,/__boxlabObjectHistory\?\.checkpoint\?\.\(\)/);
  const handler=src.slice(src.indexOf("renameButton?.addEventListener"),src.indexOf("deleteButton?.addEventListener"));
  assert.match(handler,/selectedWholeGroupId\(chosen\)/);
  assert.match(handler,/renameGroup\(wholeGroupId\)/);
  assert.match(handler,/stopImmediatePropagation/);
});

test('349 compact Group header keeps select plus More-menu actions',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  const hierarchy=src.slice(src.indexOf('function decorateHierarchy'),src.indexOf('function updateRows'));
  assert.match(hierarchy,/name\.title='Select whole group'/);
  assert.match(hierarchy,/menuRename\.textContent='Rename Group'/);
  assert.match(hierarchy,/menuUngroup\.textContent='Ungroup'/);
  assert.match(hierarchy,/menu\.append\(menuLock,menuRename,menuUngroup\)/);
  assert.match(hierarchy,/ungroupSelection\(new Set\(groupMembers\(groupId\)\.map\(o=>o\.id\)\)\)/);
});

test('349 selected group gets explicit context readout and stronger header state',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  assert.match(src,/wholeGroupId!=null\?\`\$\{groupLabel\(wholeGroupId\)\} • \$\{chosen\.length\} objects selected\`/);
  assert.match(src,/\.boxlab-group-row\.group-selected\{[^}]*box-shadow:/);
  assert.match(src,/\.boxlab-group-row\.group-selected \.boxlab-group-name\{font-weight:800/);
});

test('349 current cache chain and protected transform remain intact',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  assert.match(index,/object-management\.js\?v=0\.36\.18\.392/);
  assert.match(index,/drawer-ui\.js\?v=0\.36\.18\.361/);
  assert.match(drawer,/object-management\.js\?v=0\.36\.18\.392/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
