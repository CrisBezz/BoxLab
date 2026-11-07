import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('364-367 touch object activation now allows OrbitControls pointerup cleanup',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf("canvas?.addEventListener('pointerup'"),src.indexOf("canvas?.addEventListener('pointercancel'"));
  assert.match(block,/event\.pointerType !== 'touch'/);
  assert.match(block,/handleViewportActivation\(event, false\)/);
  assert.doesNotMatch(block,/handleViewportActivation\(event, true\)/);
});

test('364 activation helper can still consume events for callers that explicitly request it',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf('function handleViewportActivation'),src.indexOf('function installViewportActivation'));
  assert.match(block,/if \(inactiveIsCloser\) \{/);
  assert.match(block,/if \(stopEvent\) \{\s*event\.preventDefault\(\);\s*event\.stopImmediatePropagation\(\);/s);
  assert.match(block,/return true/);
  assert.match(block,/return false/);
});

test('364 linked propagation path remains intact',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  assert.match(src,/sourceId:sourceObject\.sourceId/);
  assert.match(src,/instanceMatrix:placement\.elements/);
  assert.match(src,/transformEditableMesh\(source\.mesh,matrixForInstance\(object\)\)/);
});

test('364 current linked runtime and protected Group transform baseline remain untouched',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  assert.match(index,/multi-object\.js\?v=0\.36\.18\.367/);
  assert.match(drawer,/object-origin\.js\?v=0\.36\.18\.355/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
