import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const ui=fs.readFileSync(new URL('../src/revolve.js',import.meta.url),'utf8');
const core=fs.readFileSync(new URL('../src/revolve-core.js',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8')).version;

test('Revolve runtime follows current app build',()=>{
  const wrapper=index.match(/revolve\.js\?v=([^"]+)/)?.[1];
  const stamp=index.match(/data-release-version="([^"]+)"/)?.[1];
  assert.equal(wrapper,version);
  assert.equal(stamp,version);
});

test('386 Revolve UI has X Y Z and Segments preview controls',()=>{
  assert.match(ui,/data-revolve-axis="x"/);
  assert.match(ui,/data-revolve-axis="y"/);
  assert.match(ui,/data-revolve-axis="z"/);
  assert.match(ui,/revolveSegments/);
  assert.match(ui,/Apply Revolve/);
  assert.match(ui,/BoxLab Revolve Preview/);
});

test('386 Revolve uses Object Origin and one mesh-history commit',()=>{
  assert.match(ui,/__boxlabObjectOrigins/);
  assert.match(ui,/api\?\.originFor/);
  assert.match(ui,/__boxlabHistory\?\.push\(before\)/);
  assert.match(ui,/manager\(\)/);
  assert.match(ui,/saveActive\?\.\(\)/);
});

test('386 Revolve keeps preview non-destructive and Pencil-safe',()=>{
  const preview=ui.slice(ui.indexOf('function buildPreview'),ui.indexOf('function preflight'));
  assert.doesNotMatch(preview,/__boxlabHistory|restore\(live/);
  assert.match(ui,/function installPenRange/);
  assert.match(ui,/event\.pointerType!=='pen'/);
  assert.match(ui,/requestAnimationFrame/);
});

test('386 core requires standalone loose open chain and pole collapse',()=>{
  assert.match(core,/standalone loose-edge profile/);
  assert.match(core,/Profile branches are not supported/);
  assert.match(core,/Profile must be one open chain/);
  assert.match(core,/Array\(segments\)\.fill\(id\)/);
});
