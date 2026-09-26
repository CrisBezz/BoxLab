import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const ui=fs.readFileSync(new URL('../src/tool-session-ui.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('502 hides Face exact controls and Repeat Previous at rest',()=>{
  assert.match(ui,/\.mode-tools\[data-mode-tools="face"\] #precisionFaceRow,/);
  assert.match(ui,/#precisionFaceReadout,/);
  assert.match(ui,/#repeatFacePreviousRow\{display:none!important\}/);
});

test('502 reveals contextual Face controls for Extrude',()=>{
  assert.match(ui,/:has\(#extrudeBtn\.active\) #precisionFaceRow/);
  assert.match(ui,/:has\(#extrudeBtn\.active\) #repeatFacePreviousRow/);
});

test('502 reveals contextual Face controls for Inset',()=>{
  assert.match(ui,/:has\(#insetBtn\.active\) #precisionFaceRow/);
  assert.match(ui,/:has\(#insetBtn\.active\) #repeatFacePreviousRow/);
});

test('502 is presentation-only and preserves stable Face/Rotate pins',()=>{
  assert.match(index,/src\/tool-session-ui\.js\?v=0\.36\.18\.502/);
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.501/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.501/);
  assert.match(index,/src\/rotate-transform\.js\?v=0\.36\.18\.483/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
