import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const ui=fs.readFileSync(new URL('../src/solidify.js',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8')).version;

test('Solidify direct-drag wrapper follows current app build',()=>{
  const wrapper=index.match(/solidify\.js\?v=([^"]+)/)?.[1];
  const stamp=index.match(/data-release-version="([^"]+)"/)?.[1];
  assert.equal(wrapper,version);
  assert.equal(stamp,version);
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
