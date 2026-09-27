import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');

test('535 deliberate selected Face has hit priority',()=>{
  assert.match(direct,/selectedHit=!synthetic&&selectionBefore\.length&&m&&camera\?hitSelectedFace\(event,m,selectionBefore,camera\):null/);
  assert.match(direct,/selectionBefore\.length===1&&!sequentialValid&&Number\.isInteger\(selectedHit\)/);
});

test('535 deliberate multi-face selection has selected-hit priority',()=>{
  assert.match(direct,/selectionBefore\.length>1&&Number\.isInteger\(selectedHit\)/);
  assert.match(direct,/workingFaces=.*selectionBefore\.includes\(hit\)\?\[\.\.\.selectionBefore\]/s);
});

test('535 immediate sequential A to B path remains isolated',()=>{
  assert.match(direct,/armed==='extrude'&&sequentialValid&&selectionBefore\.length===1/);
  assert.match(direct,/hit=firstUnselected/);
});
