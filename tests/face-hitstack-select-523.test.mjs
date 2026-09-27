import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('523 prefers first unselected Face hit when primary is already selected',()=>{
  assert.match(direct,/selected=new Set\(selectionBefore\)/);
  assert.match(direct,/firstUnselected=hits\.find\(item=>Number\.isInteger\(item\.index\)&&!selected\.has\(item\.index\)\)\?\.index/);
  assert.match(direct,/selected\.has\(primary\)&&Number\.isInteger\(firstUnselected\)\?firstUnselected:primary/);
});

test('523 keeps current working-face handoff after hit-stack resolution',()=>{
  assert.match(direct,/workingFaces=selectionBefore\.includes\(hit\)\?\[\.\.\.selectionBefore\]:\[hit\]/);
  assert.match(direct,/provisionalSelection=!selectionBefore\.includes\(hit\)/);
});

test('523 current runtime pins are protected',()=>{
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.523/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.520/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
