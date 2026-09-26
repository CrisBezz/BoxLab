import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const session=fs.readFileSync(new URL('../src/tool-session-ui.js',import.meta.url),'utf8');
const bevel=fs.readFileSync(new URL('../src/precision-bevel.js',import.meta.url),'utf8');
const offset=fs.readFileSync(new URL('../src/precision-offset-loop.js',import.meta.url),'utf8');
const handoff=fs.readFileSync(new URL('../src/edge-crease-handoff.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');

test('476 Loop Slide is moved immediately below Loops',()=>{
  assert.match(session,/loops\.insertAdjacentElement\('afterend',loopSlide\)/);
});

test('476 Edge Bevel exact control sits after Segments inside bevel options',()=>{
  assert.match(bevel,/edgeBevelSegments=.*querySelectorAll.*range-row/);
  assert.match(bevel,/edgeBevelSegments\.insertAdjacentElement\('afterend',edgeUi\.row\)/);
  assert.match(bevel,/edgeUi\.row\.insertAdjacentElement\('afterend',edgeUi\.readout\)/);
});

test('476 Offset Support Spacing stays above exact Offset control',()=>{
  assert.match(offset,/anchor\.insertAdjacentElement\('afterend',row\)/);
  assert.match(offset,/row\.insertAdjacentElement\('afterend',readout\)/);
});

test('476 Crease disarms when another Edge or transform tool takes over',()=>{
  assert.match(handoff,/crease\?\.classList\.contains\('active'\)/);
  assert.match(handoff,/otherEdgeTools/);
  assert.match(handoff,/closest\?\.\('#toolModes'\)/);
  assert.match(handoff,/crease\.click\(\)/);
  assert.match(handoff,/button\.dataset\.mode!=='edge'/);
});

test('476 changed UI modules are cache-hopped',()=>{
  assert.match(index,/tool-session-ui\.js\?v=0\.36\.18\.476/);
  assert.match(index,/drawer-ui\.js\?v=0\.36\.18\.476/);
  assert.match(index,/edge-crease-handoff\.js\?v=0\.36\.18\.476/);
  assert.match(drawer,/precision-bevel\.js\?v=0\.36\.18\.476/);
  assert.match(drawer,/precision-offset-loop\.js\?v=0\.36\.18\.476/);
});
