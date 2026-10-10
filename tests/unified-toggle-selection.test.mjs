import test from 'node:test';
import {confirmedBackgroundTap,backgroundRetention} from './helpers/background-selection-runtime.mjs';
import {selectedComponentTap} from './helpers/component-tap-runtime.mjs';
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
  selectedComponentTap();
});

test('blank component-area tap still clears selection, but only after tap confirmation',()=>{
  confirmedBackgroundTap();
  assert.doesNotMatch(main,/const hit=pick\(event\);if\(!hit\)\{clearSelection\(\);renderMesh\(\);return;\}/);
});

test('legacy Multi control is hidden and edge-only toggle repair is retired',()=>{
  assert.match(index,/<input id=\"multiSelectToggle\" type=\"checkbox\" hidden\/>/);
  assert.doesNotMatch(index,/edge-toggle-repair\.js/);
});


test('785 current selection checks reject removed movement, missing toggle and premature blank completion',()=>{
 assert.throws(()=>backgroundRetention(source=>source.replace('backgroundTap.moved=true;','backgroundTap.moved=false;')),{name:'AssertionError'});
 assert.throws(()=>selectedComponentTap(source=>source.replace('toggleSelection(intent.hit);','void 0;')),{name:'AssertionError'});
 assert.throws(()=>confirmedBackgroundTap(source=>source.replace('beginBackgroundHold(event);','completeBackgroundSelectionTap(event);')),{name:'AssertionError'});
});
