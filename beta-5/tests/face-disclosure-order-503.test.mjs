import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const ui=fs.readFileSync(new URL('../src/tool-session-ui.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('503 installs Face contextual controls directly after primary Face row',()=>{
  assert.match(ui,/function installFaceControlOrder\(\)/);
  assert.match(ui,/const primary=faceTools\?\.querySelector\(':scope > \.outliner-actions'\)/);
  assert.match(ui,/for\(const node of \[value,readout,repeat\]\)/);
  assert.match(ui,/cursor\.insertAdjacentElement\('afterend',node\)/);
});

test('503 keeps Face contextual controls hidden until Extrude or Inset is armed',()=>{
  assert.match(ui,/#precisionFaceRow,/);
  assert.match(ui,/#repeatFacePreviousRow\{display:none!important\}/);
  assert.match(ui,/:has\(#extrudeBtn\.active\) #precisionFaceRow/);
  assert.match(ui,/:has\(#insetBtn\.active\) #precisionFaceRow/);
});

test('503 preserves frozen Face and Rotate runtime pins',()=>{
  assert.match(index,/src\/tool-session-ui\.js\?v=0\.36\.18\.503/);
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.501/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.501/);
  assert.match(index,/src\/rotate-transform\.js\?v=0\.36\.18\.483/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
