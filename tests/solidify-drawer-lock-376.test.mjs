import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const ui=fs.readFileSync(new URL('../src/solidify.js',import.meta.url),'utf8');

test('376 Solidify drawer-lock runtime is pinned',()=>{
  assert.match(index,/solidify\.js\?v=0\.36\.18\.376/);
  assert.match(index,/data-release-version="0\.36\.18\.376"/);
});

test('376 armed Solidify owns existing drawer keep-open contract',()=>{
  assert.match(ui,/activeToolsDrawer\.dataset\.keepOpen='true'/);
  assert.match(ui,/activeToolsDrawer\.open=true/);
  assert.match(ui,/lockActiveToolsDrawer\(\)/);
  assert.match(ui,/unlockActiveToolsDrawer\(\)/);
});

test('376 drawer cannot stay collapsed while preview is armed',()=>{
  assert.match(ui,/activeToolsDrawer\?\.addEventListener\('toggle',keepDrawerVisible\)/);
  assert.match(ui,/if\(previewArmed&&activeToolsDrawer&&!activeToolsDrawer\.open\)/);
  assert.match(ui,/queueMicrotask\(\(\)=>\{if\(previewArmed\)activeToolsDrawer\.open=true;\}\)/);
});

test('376 does not edit global drawer owner or hard-fold core pin',()=>{
  assert.match(ui,/solidify-core\.js\?v=0\.36\.18\.374/);
  assert.match(index,/drawer-ui\.js\?v=0\.36\.18\.361/);
});
