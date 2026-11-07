import {assertFileMenuRules} from './helpers/menu-layout-runtime.mjs';
import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('342 File menu fits below command bar with internal scrolling',()=>{
  assertFileMenuRules();
});

test('342 Face primary row stays three columns and does not reappend when stable',()=>{
  const src=fs.readFileSync(new URL('../src/join-selected-coplanar-faces.js',import.meta.url),'utf8');
  assert.match(src,/repeat\(3,minmax\(0,1fr\)\)/);
  assert.match(src,/const stable=current\.length===ordered\.length&&ordered\.every/);
  assert.match(src,/if\(!stable\)for\(const item of ordered\)row\.appendChild\(item\)/);
  assert.doesNotMatch(src,/repeat\(4,minmax\(0,1fr\)\)/);
});

test('342 Face secondary row stays three columns with Duplicate',()=>{
  const src=fs.readFileSync(new URL('../src/duplicate-faces.js',import.meta.url),'utf8');
  assert.match(src,/repeat\(3,minmax\(0,1fr\)\)/);
  assert.doesNotMatch(src,/repeat\(4,minmax\(0,1fr\)\)/);
});

test('342 runtime cache-hops File and Face layout owners',()=>{
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  const workflow=fs.readFileSync(new URL('../src/face-workflow-layout.js',import.meta.url),'utf8');
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  assertAssetReference(drawer,'join-selected-coplanar-faces.js');
  assertAssetReference(drawer,'face-workflow-layout.js');
  assertAssetReference(workflow,'duplicate-faces.js');
  assertAssetReference(index,'topbar-layout.js');
  assert.match(index,/drawer-ui\.js\?v=/);
});
