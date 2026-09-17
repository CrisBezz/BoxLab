import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const index=readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('component taps add regardless of legacy Multi state',()=>{
  assert.match(main,/if\(selectionMode!=='object'&&!alreadySelected\)\{toggleSelection\(hit\)/);
  assert.doesNotMatch(main,/multiSelectEnabled&&selectionMode!=='object'&&!alreadySelected/);
});

test('selected component tap records exact hit and toggles it off on pointer-up',()=>{
  assert.match(main,/tapHit:selectionMode==='object'\?null:\{type:hit\.type,index:hit\.index\}/);
  assert.match(main,/current\.kind==='component'&&!current\.armed&&event\.type==='pointerup'&&current\.tapHit/);
  assert.match(main,/toggleSelection\(current\.tapHit\)/);
});

test('blank component-area tap clears selection without Multi mode distinction',()=>{
  assert.match(main,/const hit=pick\(event\);if\(!hit\)\{clearSelection\(\);renderMesh\(\);return;\}/);
});

test('legacy Multi control is hidden and edge-only toggle repair is retired',()=>{
  assert.match(index,/<input id=\"multiSelectToggle\" type=\"checkbox\" hidden\/>/);
  assert.doesNotMatch(index,/edge-toggle-repair\.js/);
});
