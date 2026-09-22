import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('335 Face Split exposes armed state and direct-tool exclusivity',()=>{
  const split=fs.readFileSync(new URL('../src/face-split.js',import.meta.url),'utf8');
  assert.match(split,/tool:'face-split'/);
  assert.match(split,/isArmed:\(\)=>armed/);
  assert.match(split,/tool:'none'/);
});

test('335 canonical additive paint selection yields while Face Split is armed',()=>{
  const paint=fs.readFileSync(new URL('../src/edge-paint-select.js',import.meta.url),'utf8');
  assert.match(paint,/__boxlabFaceSplit\?\.isArmed\?\.\(\)/);
  const guard=paint.indexOf("__boxlabFaceSplit?.isArmed?.()");
  const handler=paint.indexOf("canvas?.addEventListener('pointerdown'");
  assert.ok(handler>=0&&guard>handler);
});

test('335 runtime cache-hops both Split and Edge paint selection',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  assert.match(index,/edge-paint-select\.js\?v=/);
  assert.match(index,/face-split\.js\?v=0\.36\.18\.335/);
});
