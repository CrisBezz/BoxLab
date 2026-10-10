import {assertFaceRows} from './helpers/face-layout-runtime.mjs';
import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const ui=fs.readFileSync(new URL('../src/tool-session-ui.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('506 forces Inspect Repair Topology Gate to true Face drawer bottom',()=>{
  assert.match(ui,/for\(const node of \[inspect,repair,gate\]\)\{/);
  assert.match(ui,/if\(node\)faceTools\.appendChild\(node\)/);
});

test('506 no longer anchors diagnostics immediately after tertiary modelling row',()=>{
  assert.doesNotMatch(ui,/let tail=tertiary/);
  assert.doesNotMatch(ui,/tail\.insertAdjacentElement\('afterend',node\)/);
});

test('506 keeps compact modelling rows and reviewed interaction pins',()=>{
  assertFaceRows();
  assertAssetReference(index,'tool-session-ui.js');
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'main.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
