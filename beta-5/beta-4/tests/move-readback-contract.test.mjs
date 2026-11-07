import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('326 component Move exposes live XYZ delta readback',()=>{
  assert.match(main,/function formatMoveDelta\(delta\)/);
  assert.match(main,/ΔX/);
  assert.match(main,/ΔY/);
  assert.match(main,/ΔZ/);
  assert.match(main,/liveDelta:new THREE\.Vector3\(\)/);
  assert.match(main,/drag\.liveDelta\.copy\(total\)/);
});

test('326 move readback preserves snap label and protected object transform pin',()=>{
  assert.match(main,/Snap \$\{drag\.inferenceSnap\.type\}/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
