import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const slide=fs.readFileSync(new URL('../src/component-slide.js',import.meta.url),'utf8');
const precision=fs.readFileSync(new URL('../src/precision-edge-slide.js',import.meta.url),'utf8');
const offset=fs.readFileSync(new URL('../src/loop-offset.js',import.meta.url),'utf8');
const extrude=fs.readFileSync(new URL('../src/edge-extrude.js',import.meta.url),'utf8');
const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('514 Edge Slide exact controls follow the Edge Slide action row',()=>{
  assert.match(precision,/const actionRow=edgeSlideButton\.closest\('\.edge-compact-row,\.outliner-actions'\)/);
  assert.match(precision,/actionRow\.insertAdjacentElement\('afterend',row\)/);
  assert.match(precision,/row\.insertAdjacentElement\('afterend',readout\)/);
});

test('514 Edge Slide and Offset Loop are mutually exclusive',()=>{
  assert.match(slide,/boxlab-direct-tool-exclusive/);
  assert.match(slide,/tool:'edge-slide'/);
  assert.match(slide,/tool!=='offset-loop'\|\|activeTool!=='edge'/);
  assert.match(offset,/event\.detail\?\.tool!=='edge-slide'\|\|!armed/);
});

test('514 Edge Extrude reasserts Move + Plane after the arm click stack',()=>{
  assert.match(extrude,/function applyPlaneDefault\(\)/);
  assert.match(extrude,/activateRealMove\?\.\(\)/);
  assert.match(extrude,/setConstraint\?\.\('plane'\)/);
  assert.match(extrude,/queueMicrotask\(\(\)=>\{if\(armed\)applyPlaneDefault\(\);\}\)/);
  assert.match(extrude,/control\.dataset\.constraint==='plane'/);
});

test('514 cache-hops only Edge-owned modules and preserves frozen baselines',()=>{
  assert.match(drawer,/precision-edge-slide\.js\?v=0\.36\.18\.514/);
  assert.match(drawer,/loop-offset\.js\?v=0\.36\.18\.514/);
  assert.match(index,/src\/component-slide\.js\?v=0\.36\.18\.514/);
  assert.match(index,/src\/edge-extrude\.js\?v=0\.36\.18\.514/);
  assert.match(index,/src\/drawer-ui\.js\?v=0\.36\.18\.514/);
  assert.match(index,/src\/tool-session-ui\.js\?v=0\.36\.18\.512/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.501/);
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.501/);
  assert.match(index,/src\/rotate-transform\.js\?v=0\.36\.18\.483/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
