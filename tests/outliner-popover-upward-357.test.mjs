import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('357 Outliner and Group More menus open upward from their trigger',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  assert.match(src,/\.outliner-more-menu,\.object-action-menu\{position:absolute;right:0;top:auto;bottom:30px/);
  assert.match(src,/\.boxlab-group-menu\{position:absolute;right:0;top:auto;bottom:30px/);
});

test('357 bottom Object action More menu opens upward',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  assert.match(src,/\.object-action-menu\{top:auto;bottom:39px\}/);
});

test('357 cache chain and protected Group baseline remain intact',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  assert.match(index,/object-management\.js\?v=0\.36\.18\.357/);
  assert.match(index,/drawer-ui\.js\?v=0\.36\.18\.357/);
  assert.match(drawer,/object-management\.js\?v=0\.36\.18\.357/);
  assert.match(drawer,/object-origin\.js\?v=0\.36\.18\.355/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
