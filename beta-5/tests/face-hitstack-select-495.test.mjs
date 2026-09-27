import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('495 prefers first unselected Face hit when primary is already selected',()=>{
  assert.match(direct,/selected=new Set\(selectionBefore\)/);
  assert.match(direct,/firstUnselected=hits\.find\(item=>Number\.isInteger\(item\.index\)&&!selected\.has\(item\.index\)\)\?\.index/);
  assert.match(direct,/selected\.has\(primary\)&&Number\.isInteger\(firstUnselected\)\?firstUnselected:primary/);
});

test('495 still allows deselect when no unselected overlapping hit exists',()=>{
  assert.match(direct,/hit=Number\.isInteger\(primary\).*\?firstUnselected:primary/);
  assert.match(direct,/bridge\(\)\?\.toggle\?\.\('face',p\.hit\)/);
});

test('495 trace exposes primary and chosen hit for hands-on verification',()=>{
  assert.match(direct,/primary=\$\{primary\}/);
  assert.match(direct,/stack=\[\$\{stack\}\]/);
});

test('495 cache hop and protected pins',()=>{
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.495/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.494/);
  assert.match(index,/src\/rotate-transform\.js\?v=0\.36\.18\.483/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
