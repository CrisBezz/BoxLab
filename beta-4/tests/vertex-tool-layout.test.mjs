import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('341 Vertex tool layout has one deterministic six-button order',()=>{
  const src=fs.readFileSync(new URL('../src/face-reconstruct.js',import.meta.url),'utf8');
  assert.match(src,/\[bevel,add,build,slide,button,circle\]/);
  assert.match(src,/const stable=current\.length===ordered\.length&&ordered\.every/);
  assert.match(src,/if\(!stable\)for\(const item of ordered\)row\.appendChild\(item\)/);
  assert.match(src,/__boxlabVertexToolLayout=\{version:'0\.36\.18\.341',sync:place\}/);
});

test('341 Circle delegates Vertex placement to the shared layout owner',()=>{
  const src=fs.readFileSync(new URL('../src/component-circle.js',import.meta.url),'utf8');
  assert.match(src,/__boxlabVertexToolLayout/);
  assert.match(src,/owner\?\.sync\?\.\(\)/);
});

test('341 Build Edge fully hands off Add Vertex before arming',()=>{
  const src=fs.readFileSync(new URL('../src/add-edge-ui.js',import.meta.url),'utf8');
  const stop=src.indexOf("__boxlabAddVertex?.isActive?.()");
  const clearCore=src.indexOf("addButton?.classList.contains('active')");
  const arm=src.indexOf("buildArmed=true");
  assert.ok(stop>=0&&clearCore>stop&&arm>clearCore);
  assert.match(src,/selectionModes button\[data-mode="vertex"\]/);
});

test('341 runtime cache-hops all Vertex layout owners',()=>{
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  assert.match(drawer,/face-reconstruct\.js\?v=0\.36\.18\.341/);
  assert.match(drawer,/component-circle\.js\?v=0\.36\.18\.341/);
  assert.match(index,/add-edge-ui\.js\?v=0\.36\.18\.341/);
  assert.match(index,/drawer-ui\.js\?v=/);
});
