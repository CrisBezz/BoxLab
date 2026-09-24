import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('454 Boolean uses frozen Beta 4 one-checkpoint transaction path',()=>{
  const src=fs.readFileSync(new URL('../src/boolean-prototype.js',import.meta.url),'utf8');
  assert.match(src,/globalThis\.__boxlabObjectHistory\?\.checkpoint\?\.\(\)/);
  assert.doesNotMatch(src,/checkpointSnapshot\?\.\(beforeScene\)/);
});

test('454 shared transform yields to all armed direct component tools',()=>{
  const src=fs.readFileSync(new URL('../src/transform-upgrade.js',import.meta.url),'utf8');
  assert.match(src,/function directComponentToolActive\(\)/);
  assert.match(src,/#bevelBtn\.active,#vertexBevelBtn\.active/);
  assert.match(src,/__boxlabRevolve\?\.active/);
});
