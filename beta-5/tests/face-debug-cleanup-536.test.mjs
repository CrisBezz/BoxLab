import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('536 temporary Face diagnostics are removed',()=>{
  assert.doesNotMatch(direct,/FACE DEBUG/);
  assert.doesNotMatch(direct,/function debugFace/);
  assert.doesNotMatch(direct,/faceDirectDebug/);
});

test('536 stable selected-face priority remains present',()=>{
  assert.match(direct,/selectedHit=!synthetic&&selectionBefore\.length&&m&&camera\?hitSelectedFace/);
  assert.match(direct,/selectionBefore\.length>1&&Number\.isInteger\(selectedHit\)/);
  assert.match(direct,/selectionBefore\.length===1&&!sequentialValid&&Number\.isInteger\(selectedHit\)/);
});

test('536 runtime pin current and protected transform unchanged',()=>{
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.536/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
