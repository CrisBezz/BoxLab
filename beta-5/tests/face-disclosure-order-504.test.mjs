import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const ui=fs.readFileSync(new URL('../src/tool-session-ui.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('504 anchors Face primary row by extrude button instead of first row',()=>{
  assert.match(ui,/document\.querySelector\('#extrudeBtn'\)\?\.closest\('\.outliner-actions'\)/);
  assert.doesNotMatch(ui,/faceTools\?\.querySelector\(':scope > \.outliner-actions'\)/);
});

test('504 keeps primary Face tools directly under Face title',()=>{
  assert.match(ui,/title\.insertAdjacentElement\('afterend',primary\)/);
});

test('504 keeps contextual Value and Repeat immediately under primary Face tools',()=>{
  assert.match(ui,/for\(const node of \[value,readout,repeat\]\)/);
  assert.match(ui,/cursor\.insertAdjacentElement\('afterend',node\)/);
});

test('504 orders Inspect and Repair directly above Topology Gate',()=>{
  assert.match(ui,/const inspect=document\.querySelector\('#faceInspectDrawer'\)/);
  assert.match(ui,/const repair=document\.querySelector\('#faceRepairDrawer'\)/);
  assert.match(ui,/const gate=document\.querySelector\('#topologyValidityGate'\)/);
  assert.match(ui,/repair\.insertAdjacentElement\('afterend',gate\)/);
});

test('504 waits for late Face drawer startup and preserves frozen interaction pins',()=>{
  assert.match(ui,/1800,1950,2200/);
  assert.match(index,/src\/tool-session-ui\.js\?v=0\.36\.18\.504/);
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.501/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.501/);
  assert.match(index,/src\/rotate-transform\.js\?v=0\.36\.18\.483/);
});
