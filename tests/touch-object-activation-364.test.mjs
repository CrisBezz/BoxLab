import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('364 touch object activation consumes pointerup before core background-tap render',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf("canvas?.addEventListener('pointerup'"),src.indexOf("canvas?.addEventListener('pointercancel'"));
  assert.match(block,/event\.pointerType !== 'touch'/);
  assert.match(block,/handleViewportActivation\(event, true\)/);
  assert.doesNotMatch(block,/handleViewportActivation\(event, false\)/);
});

test('364 handleViewportActivation only consumes when it actually handles an object hit',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf('function handleViewportActivation'),src.indexOf('function installViewportActivation'));
  assert.match(block,/if \(inactiveIsCloser\) \{/);
  assert.match(block,/if \(stopEvent\) \{\s*event\.preventDefault\(\);\s*event\.stopImmediatePropagation\(\);/s);
  assert.match(block,/return true/);
  assert.match(block,/return false/);
});

test('364 linked propagation path from 363 remains intact',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  assert.match(src,/sourceId:sourceObject\.sourceId/);
  assert.match(src,/instanceMatrix:placement\.elements/);
  assert.match(src,/transformEditableMesh\(source\.mesh,matrixForInstance\(object\)\)/);
});

test('364 protected Group transform baseline remains untouched',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  assert.match(index,/multi-object\.js\?v=0\.36\.18\.364/);
  assert.match(drawer,/object-origin\.js\?v=0\.36\.18\.355/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
