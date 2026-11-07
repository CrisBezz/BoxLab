import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {assertEdgeRows} from './helpers/edge-layout-runtime.mjs';

const ui=fs.readFileSync(new URL('../src/tool-session-ui.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('508 current Edge home retains three-column rows, Circle and contextual order',()=>assertEdgeRows());

test('508 keeps Edge options progressive and hides legacy layout chrome',()=>{
  assert.match(ui,/edge-section-label\{display:none!important\}/);
  assert.match(ui,/crease-button-row\{display:none!important\}/);
  assert.match(ui,/:has\(#loopCutBtn\.active\) \.loop-cut-option/);
  assert.match(ui,/loops\.insertAdjacentElement\('afterend',loopSlide\)/);
  assert.match(ui,/:has\(#bevelBtn\.active\) \.bevel-option > \.range-row/);
  assert.match(ui,/:has\(#applyCreaseBtn\.active\) \.crease-options/);
  assert.match(ui,/:has\(#edgeSlideBtn\.active\) #precisionEdgeSlideRow/);
  assert.match(ui,/:has\(#offsetLoopBtn\.active\) \.offset-option/);
});

test('508 preserves protected interaction pins',()=>{
  assertAssetReference(index,'tool-session-ui.js');
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'main.js');
  assertAssetReference(index,'rotate-transform.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});


test('790 Edge layout contract rejects dropping Circle from compact row',()=>{
 assert.throws(()=>assertEdgeRows((source,name)=>name==='tool-session-ui.js'?source.replace('[dissolveEdge,del,circle]','[dissolveEdge,del]'):source),/current compact row contents/);
});
