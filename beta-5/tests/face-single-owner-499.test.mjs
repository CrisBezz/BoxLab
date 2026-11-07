import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const legacy=fs.readFileSync(new URL('../src/persistent-face-tool-select.js',import.meta.url),'utf8');
const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('499 legacy persistent Face selector yields to recovered direct owner',()=>{
  assert.match(legacy,/if\(globalThis\.__boxlabFaceDirect\?\.active\?\.\(\)\)return;/);
});

test('499 direct owner uses native visible picker and native toggle',()=>{
  assert.match(direct,/hit=picker\('face',event\)\?\.index/);
  assert.match(direct,/bridge\(\)\?\.toggle\?\.\('face',p\.hit\)/);
  assert.doesNotMatch(direct,/armedVisibleFaceHit/);
  assert.doesNotMatch(direct,/firstUnselected/);
});

test('499 cache hops both ownership modules',()=>{
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.499/);
  assert.match(drawer,/persistent-face-tool-select\.js\?v=0\.36\.18\.499/);
});

test('499 preserves protected pins',()=>{
  assert.match(index,/src\/rotate-transform\.js\?v=0\.36\.18\.483/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
