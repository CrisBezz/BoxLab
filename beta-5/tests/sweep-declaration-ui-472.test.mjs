import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const sweep=fs.readFileSync(new URL('../src/sweep-path.js',import.meta.url),'utf8');
const bevel=fs.readFileSync(new URL('../src/precision-bevel.js',import.meta.url),'utf8');
const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('472 Sweep transaction state is declared before Add uses it',()=>{
  assert.match(sweep,/sweepBeforeScene=null,sweepUndoDepth=null,sweepRedoDepth=null/);
  assert.match(sweep,/sweepBeforeScene=before/);
  assert.match(sweep,/sweepUndoDepth=Array\.isArray/);
  assert.match(sweep,/sweepRedoDepth=Array\.isArray/);
});

test('472 Edge Bevel exact control is repositioned before Slide precision anchor',()=>{
  assert.match(bevel,/edgePrecisionAnchor=document\.querySelector\('\.loop-slide-option'\)/);
  assert.match(bevel,/insertBefore\(edgeUi\.row,edgePrecisionAnchor\)/);
  assert.match(bevel,/insertBefore\(edgeUi\.readout,edgePrecisionAnchor\)/);
});

test('472 changed runtime loaders are cache-hopped',()=>{
  assert.match(drawer,/precision-bevel\.js\?v=0\.36\.18\.472/);
  assert.match(index,/src\/drawer-ui\.js\?v=0\.36\.18\.472/);
  assert.match(index,/src\/sweep-path\.js\?v=0\.36\.18\.472/);
});
