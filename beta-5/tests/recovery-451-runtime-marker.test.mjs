import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('451 recovery step is isolated to dormant facegroup colour core',()=>{
  assert.equal(fs.existsSync(new URL('../src/facegroup-colours-core.js',import.meta.url)),true);
  const render=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');
  assert.doesNotMatch(render,/facegroup-colours-core/);
});
