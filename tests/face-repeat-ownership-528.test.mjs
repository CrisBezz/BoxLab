import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const fallback=fs.readFileSync(new URL('../src/sequential-through-fallback.js',import.meta.url),'utf8');
const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('528 Repeat/Exact synthetic Extrude keeps explicit selected Face',()=>{
  assert.match(direct,/event\.pointerId!==9876&&armed==='extrude'/);
});

test('528 Through fallback ignores synthetic Repeat/Exact gesture',()=>{
  assert.match(fallback,/if\(detail\.pointerId===9876\)return;/);
});

test('528 runtime pins current Repeat-safe Face ownership',()=>{
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.528/);
  assert.match(index,/src\/drawer-ui\.js\?v=0\.36\.18\.528/);
  assert.match(drawer,/sequential-through-fallback\.js\?v=0\.36\.18\.528/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
