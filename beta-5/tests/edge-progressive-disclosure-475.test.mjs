import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const session=fs.readFileSync(new URL('../src/tool-session-ui.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('475 Edge Loop settings are contextual',()=>{
  assert.match(session,/\.loop-cut-option,/);
  assert.match(session,/:has\(#loopCutBtn\.active\) \.loop-cut-option/);
  assert.match(session,/:has\(#loopCutBtn\.active\) \.loop-slide-option/);
});

test('475 Edge Bevel and Crease settings are contextual',()=>{
  assert.match(session,/\.bevel-option > \.range-row/);
  assert.match(session,/:has\(#bevelBtn\.active\) \.bevel-option > \.range-row/);
  assert.match(session,/:has\(#bevelBtn\.active\) #precisionEdgeBevelRow/);
  assert.match(session,/:has\(#applyCreaseBtn\.active\) \.crease-options/);
});

test('475 Edge Slide and Offset Loop precision settings are contextual',()=>{
  assert.match(session,/#precisionEdgeSlideRow/);
  assert.match(session,/:has\(#edgeSlideBtn\.active\) #precisionEdgeSlideRow/);
  assert.match(session,/#precisionOffsetLoopRow/);
  assert.match(session,/:has\(#offsetLoopBtn\.active\) #precisionOffsetLoopRow/);
  assert.match(session,/:has\(#offsetLoopBtn\.active\) \.offset-option/);
});

test('475 remains presentation-only and protected pins stay intact',()=>{
  assert.match(index,/src\/tool-session-ui\.js\?v=0\.36\.18\.475/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.366/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
