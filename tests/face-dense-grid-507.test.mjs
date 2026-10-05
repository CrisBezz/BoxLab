import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const ui=fs.readFileSync(new URL('../src/tool-session-ui.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('507 builds dense Face rows matching requested layout',()=>{
  assert.match(ui,/for\(const button of \[del,duplicate,extract\]\)/);
  assert.match(ui,/for\(const button of \[join,bridge,sweep\]\)/);
  assert.match(ui,/for\(const button of \[shell,poke,circle\]\)/);
  assert.match(ui,/for\(const button of \[close,triangulate,flip\]\)/);
  assert.match(ui,/for\(const button of \[quadClean,quadify\]\)/);
  assert.doesNotMatch(ui,/quadClean,quadify,orient/);
});

test('507 keeps diagnostics at the true end',()=>{
  assert.match(ui,/for\(const node of \[inspect,repair,gate\]\)\{/);
  assert.match(ui,/if\(node\)faceTools\.appendChild\(node\)/);
});

test('507 hides emptied legacy launch rows and wrappers',()=>{
  assert.match(ui,/\.sweep-selection-launch-row:empty/);
  assert.match(ui,/\.shell-launch-controls/);
});

test('507 preserves armed context placement and frozen interaction pins',()=>{
  assert.match(ui,/for\(const node of \[value,readout,repeat\]\)/);
  assertAssetReference(index,'tool-session-ui.js');
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'main.js');
  assertAssetReference(index,'rotate-transform.js');
});
