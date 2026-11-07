import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('453 restores dormant facegroup core and proven 451 render runtime',()=>{
  const render=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');
  assert.equal(render.includes('facegroup-colours-core.js'),false);
  assert.equal(render.includes('data-render="facegroups"'),false);
  assert.match(render,/function refreshStudio\(\)/);
  assert.match(render,/function syncStudio\(\)/);
});
