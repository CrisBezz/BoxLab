import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('367 touch activation allows OrbitControls pointerup cleanup',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf("canvas?.addEventListener('pointerup'"),src.indexOf("canvas?.addEventListener('pointercancel'"));
  assert.match(block,/handleViewportActivation\(event, false\)/);
  assert.doesNotMatch(block,/handleViewportActivation\(event, true\)/);
});

test('367 mode reads authoritative selection bridge before DOM classes',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  assert.match(src,/function currentMode\(\) \{ return globalThis\.__boxlabSelectionBridge\?\.mode\?\.\(\) \|\| document\.querySelector/);
});

test('367 activation performs post-handoff inactive rebuilds',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf('function activateObject'),src.indexOf('function uniqueName'));
  assert.match(block,/queueMicrotask\(\(\)=>\{ if\(activeBody\) rebuildInactiveLayer\(activeBody\); \}\)/);
  assert.match(block,/requestAnimationFrame\(\(\)=>\{ if\(activeBody\) rebuildInactiveLayer\(activeBody\); \}\)/);
});

test('367 live mesh bridge and protected transform pins remain intact',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
  assert.match(index,/multi-object\.js\?v=0\.36\.18\.367/);
  assert.match(main,/__boxlabBridgeState\.mesh=mesh;clearGroup\(root\)/);
  assert.match(drawer,/object-origin\.js\?v=0\.36\.18\.355/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
