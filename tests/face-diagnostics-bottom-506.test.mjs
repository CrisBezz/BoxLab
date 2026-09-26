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

test('506 keeps compact modelling rows and frozen interaction pins',()=>{
  assert.match(ui,/facePrimaryCompactRow/);
  assert.match(ui,/faceSecondaryCompactRow/);
  assert.match(ui,/faceTertiaryCompactRow/);
  assert.match(index,/src\/tool-session-ui\.js\?v=0\.36\.18\.506/);
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.501/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.501/);
});
