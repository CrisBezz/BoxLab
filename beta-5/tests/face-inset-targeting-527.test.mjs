import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('527 overlap preference is Extrude-only',()=>{
  assert.match(direct,/hit=armed==='extrude'&&selectionBefore\.length===1&&Number\.isInteger\(primary\)&&selected\.has\(primary\)&&Number\.isInteger\(firstUnselected\)\?firstUnselected:primary/);
});

test('527 Inset keeps pressed selected face while still accepting unselected direct press',()=>{
  assert.match(direct,/primary=picker\('face',event\)\?\.index/);
  assert.match(direct,/workingFaces=selectionBefore\.includes\(hit\)\?\[\.\.\.selectionBefore\]:\[hit\]/);
});

test('527 runtime pins current Face direct and protected transform',()=>{
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.527/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
