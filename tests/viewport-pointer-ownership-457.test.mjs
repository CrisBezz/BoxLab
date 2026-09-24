import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const paint=fs.readFileSync(new URL('../src/edge-paint-select.js',import.meta.url),'utf8');
const revolve=fs.readFileSync(new URL('../src/revolve.js',import.meta.url),'utf8');

test('457 finger touch is never captured by component paint selection',()=>{
  assert.match(paint,/if\(event\.pointerType==='touch'\)return/);
});

test('459 component paint remains available for armed direct tools',()=>{
  assert.doesNotMatch(paint,/function directToolActive\(\)/);
  assert.doesNotMatch(paint,/if\(directToolActive\(\)/);
});

test('457 Edge Revolve keeps only its launcher visible until armed',()=>{
  assert.match(revolve,/data-revolve-settings/);
  assert.match(revolve,/revolve-controls:not\(\.revolve-active\)/);
  assert.match(revolve,/controls\.classList\.add\('revolve-active'\)/);
  assert.match(revolve,/controls\.classList\.remove\('revolve-active'\)/);
});

test('457 protected modelling pins remain intact',()=>{
  assert.match(index,/multi-face-direct\.js\?v=0\.36\.18\.461/);
  assert.match(index,/direct-bevel\.js\?v=0\.36\.18\.253/);
  assert.match(index,/direct-multi-vertex-bevel\.js\?v=0\.30\.1/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
