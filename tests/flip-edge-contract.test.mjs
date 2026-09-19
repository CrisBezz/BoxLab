import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('337 existing Rotate Edge implementation is exposed as Flip Edge',()=>{
  const src=fs.readFileSync(new URL('../src/rotate-edge.js',import.meta.url),'utf8');
  assert.match(src,/button\.textContent='Flip Edge'/);
  assert.doesNotMatch(src,/button\.textContent='Rotate Edge'/);
  assert.match(src,/Flip Edge requires two triangles/);
  assert.match(src,/diagonal flipped/);
  assert.match(src,/owners\.length!==2/);
  assert.match(src,/face0\.length!==3\|\|face1\.length!==3/);
  assert.match(src,/Creased Edges cannot be rotated/);
});

test('337 Flip Edge stays on one authoritative loader path',()=>{
  const workflow=fs.readFileSync(new URL('../src/face-workflow-layout.js',import.meta.url),'utf8');
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  assert.equal((workflow.match(/rotate-edge\.js\?v=0\.36\.18\.337/g)||[]).length,1);
  assert.equal((drawer.match(/face-workflow-layout\.js\?v=0\.36\.18\.337/g)||[]).length,1);
  assert.match(index,/drawer-ui\.js\?v=0\.36\.18\.337/);
  assert.doesNotMatch(index,/rotate-edge\.js\?v=/);
});
