import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const ui=fs.readFileSync(new URL('../src/tool-session-ui.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('508 compacts Edge home into requested three-column rows',()=>{
  assert.match(ui,/for\(const button of \[loop,bevel,crease\]\)/);
  assert.match(ui,/for\(const button of \[split,extrude,sweep\]\)/);
  assert.match(ui,/for\(const button of \[slide,offset,uncrease\]\)/);
  assert.match(ui,/for\(const button of \[bridge,fill,dissolveLoop\]\)/);
  assert.match(ui,/for\(const button of \[dissolveEdge,del\]\)/);
});

test('508 keeps Edge options progressive and hides legacy layout chrome',()=>{
  assert.match(ui,/edge-section-label\{display:none!important\}/);
  assert.match(ui,/crease-button-row\{display:none!important\}/);
  assert.match(ui,/:has\(#loopCutBtn\.active\) \.loop-cut-option/);
  assert.match(ui,/:has\(#bevelBtn\.active\) \.bevel-option > \.range-row/);
  assert.match(ui,/:has\(#applyCreaseBtn\.active\) \.crease-options/);
  assert.match(ui,/:has\(#edgeSlideBtn\.active\) #precisionEdgeSlideRow/);
  assert.match(ui,/:has\(#offsetLoopBtn\.active\) \.offset-option/);
});

test('508 preserves protected interaction pins',()=>{
  assert.match(index,/src\/tool-session-ui\.js\?v=0\.36\.18\.508/);
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.501/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.501/);
  assert.match(index,/src\/rotate-transform\.js\?v=0\.36\.18\.483/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
