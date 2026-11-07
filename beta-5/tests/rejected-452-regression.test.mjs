import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('453 does not replay rejected 452 viewport wiring',()=>{
  const render=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');
  assert.doesNotMatch(render,/facegroupMaterial/);
  assert.doesNotMatch(render,/sourceMeshForBody/);
});
