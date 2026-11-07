// Historical .453 recovery fixture; current main has accepted Facegroup support.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('451 does not wire facegroup colours into render runtime yet',()=>{
  const render=fs.readFileSync(new URL('./fixtures/recovery-453/render-modes.js',import.meta.url),'utf8');
  assert.equal(render.includes("facegroup-colours-core.js"),false);
  assert.equal(render.includes("data-render=\"facegroups\""),false);
});
