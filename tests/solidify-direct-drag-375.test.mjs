import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const ui=fs.readFileSync(new URL('../src/solidify.js',import.meta.url),'utf8');

test('375 Solidify direct-drag runtime is pinned',()=>{
  assert.match(index,/solidify\.js\?v=0\.36\.18\.375/);
  assert.match(index,/data-release-version="0\.36\.18\.375"/);
});

test('375 preview supports viewport ray-picked thickness dragging',()=>{
  assert.match(ui,/new THREE\.Raycaster\(\)/);
  assert.match(ui,/raycaster\.intersectObject\(preview,false\)/);
  assert.match(ui,/function projectedNormalAxis\(hit\)/);
  assert.match(ui,/projected=dx\*thicknessDrag\.axisX\+dy\*thicknessDrag\.axisY/);
  assert.match(ui,/setThickness\(next,\{rebuild:true\}\)/);
});

test('375 direct thickness drag protects navigation and remains preview-only',()=>{
  assert.match(ui,/if\(ctl\)ctl\.enabled=false/);
  assert.match(ui,/ctl\.enabled=thicknessDrag\.controlsWereEnabled/);
  assert.match(ui,/canvas\?\.addEventListener\('pointerdown',beginThicknessDrag,true\)/);
  assert.match(ui,/working\.faces=working\.faces\.slice\(sourceFaceCount\)/);
  const dragBlock=ui.slice(ui.indexOf('function beginThicknessDrag'),ui.indexOf('button?.addEventListener'));
  assert.doesNotMatch(dragBlock,/checkpoint\?\./);
  assert.doesNotMatch(dragBlock,/saveActive\?\./);
});
