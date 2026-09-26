import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const edge=fs.readFileSync(new URL('../src/edge-extrude.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('510 Edge Extrude arms real Move on first arm transition',()=>{
  assert.match(edge,/const wasArmed=armed/);
  assert.match(edge,/if\(armed&&!wasArmed\)\{/);
  assert.match(edge,/__boxlabTransformArming\?\.activateRealMove\?\.\(\)/);
});

test('510 Edge Extrude defaults transform constraint to Plane',()=>{
  assert.match(edge,/__boxlabTransformArming\?\.setConstraint\?\.\('plane'\)/);
  assert.match(edge,/Move armed • Plane constraint/);
  assert.match(edge,/edgeExtrudePlaneConstraintBtn/);
});

test('510 repeated pulls preserve later user-selected constraint',()=>{
  const block=edge.slice(edge.indexOf('function setArmed'),edge.indexOf('precision?.querySelectorAll'));
  assert.match(block,/if\(armed&&!wasArmed\)/);
  assert.doesNotMatch(block,/if\(armed\)\s*\{/);
});

test('510 cache-hops only Edge Extrude and preserves protected pins',()=>{
  assert.match(index,/src\/edge-extrude\.js\?v=0\.36\.18\.510/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.501/);
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.501/);
  assert.match(index,/src\/rotate-transform\.js\?v=0\.36\.18\.483/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
