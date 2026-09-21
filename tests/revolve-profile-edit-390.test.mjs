import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const ui=fs.readFileSync(new URL('../src/revolve-profile.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('390 Revolve profile editor runtime is current',()=>{
  assert.match(index,/revolve-profile\.js\?v=0\.36\.18\.390/);
  assert.match(ui,/const VERSION='0\.36\.18\.390'/);
});

test('390 profile point selection has a visible selected marker',()=>{
  assert.match(ui,/selectedPoint/);
  assert.match(ui,/0xffe14a/);
  assert.match(ui,/meta\.selectedPoint=index/);
});

test('390 can insert a point into an existing profile segment',()=>{
  assert.match(ui,/function nearestProfileSegment/);
  assert.match(ui,/distanceToSegment2D/);
  assert.match(ui,/d<=18/);
  assert.match(ui,/meta\.points\.splice\(segment\+1,0,planeUV\(frame,world\)\)/);
});

test('390 can delete selected profile point',()=>{
  assert.match(ui,/revolveProfileDeletePointBtn/);
  assert.match(ui,/Delete Point/);
  assert.match(ui,/meta\.points\.splice\(meta\.selectedPoint,1\)/);
  assert.match(ui,/deletePointButton\.disabled=/);
});

test('390 undo and clear remove stale selected-point index',()=>{
  assert.match(ui,/meta\.points=meta\.pointHistory\.pop\(\);meta\.selectedPoint=null/);
  assert.match(ui,/meta\.points=\[\];meta\.selectedPoint=null/);
});

test('390 preserves .389 touch-navigation ownership',()=>{
  const begin=ui.slice(ui.indexOf('function beginProfilePointer'),ui.indexOf('function moveProfilePointer'));
  assert.match(begin,/if\(event\.pointerType==='touch'\)return/);
});
