import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('530 synthetic Repeat Exact trusts explicit current Face selection',()=>{
  assert.match(direct,/synthetic=event\.pointerId===9876/);
  assert.match(direct,/primary=synthetic\?\(selectionBefore\[0\]\?\?null\):picker\('face',event\)\?\.index/);
  assert.match(direct,/workingFaces=synthetic&&selectionBefore\.length\?\[\.\.\.selectionBefore\]/);
});

test('530 synthetic Repeat Exact skips live hit-stack repick',()=>{
  assert.match(direct,/hits=synthetic\?\[\]:/);
  assert.match(direct,/hit=!synthetic&&armed==='extrude'/);
});

test('530 runtime pin current and protected transform unchanged',()=>{
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.530/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
