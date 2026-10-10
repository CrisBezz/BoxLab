import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {assertAssetReference} from './helpers/release-contract.mjs';

test('358 Object and Group More menus are anchored above their trigger',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  assert.match(src,/\.outliner-more-menu,\.object-action-menu\{position:absolute!important;right:0!important;top:0!important;bottom:auto!important;transform:translateY\(calc\(-100% - 2px\)\)/);
  assert.match(src,/\.boxlab-group-menu\{position:absolute!important;right:0!important;top:0!important;bottom:auto!important;transform:translateY\(calc\(-100% - 2px\)\)/);
});

test('358 footer Object More menu is forced above the trigger too',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  assert.match(src,/\.object-action-menu\{top:0!important;bottom:auto!important;transform:translateY\(calc\(-100% - 3px\)\)\}/);
});

test('358 current Object management and protected Group transform baselines remain pinned',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  assertAssetReference(index,'object-management.js');
  assertAssetReference(drawer,'object-management.js');
  assert.match(drawer,/object-origin\.js\?v=0\.36\.18\.355/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
