import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('357-358 Outliner and Group More menus stay anchored above their trigger',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  assert.match(src,/\.outliner-more-menu,\.object-action-menu\{position:absolute!important;right:0!important;top:0!important;bottom:auto!important;transform:translateY\(calc\(-100% - 2px\)\)/);
  assert.match(src,/\.boxlab-group-menu\{position:absolute!important;right:0!important;top:0!important;bottom:auto!important;transform:translateY\(calc\(-100% - 2px\)\)/);
});

test('357-358 bottom Object action More menu is forced above the trigger',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  assert.match(src,/\.object-action-menu\{top:0!important;bottom:auto!important;transform:translateY\(calc\(-100% - 3px\)\)\}/);
});

test('357-358 current cache chain and protected Group baseline remain intact',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  assert.match(index,/object-management\.js\?v=0\.36\.18\.368/);
  assert.match(index,/drawer-ui\.js\?v=0\.36\.18\.361/);
  assert.match(drawer,/object-management\.js\?v=0\.36\.18\.368/);
  assert.match(drawer,/object-origin\.js\?v=0\.36\.18\.355/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
