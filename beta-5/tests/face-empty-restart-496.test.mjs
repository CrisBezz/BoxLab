import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('496 preserves armed Face direct state after Deselect button',()=>{
  assert.match(direct,/#deselectAllBtn/);
  assert.match(direct,/queueMicrotask\(\(\)=>\{/);
  assert.match(direct,/syncButtons\(\);/);
  assert.match(direct,/updateStatus\(\);/);
});

test('496 leaves selected-aware hit-stack logic intact',()=>{
  assert.match(direct,/firstUnselected=hits\.find/);
  assert.match(direct,/selected\.has\(primary\).*firstUnselected/);
});

test('496 cache hop and protected pins',()=>{
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.496/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.494/);
  assert.match(index,/src\/rotate-transform\.js\?v=0\.36\.18\.483/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
