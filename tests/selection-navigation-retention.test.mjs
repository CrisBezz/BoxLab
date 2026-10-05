import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const index=readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('blank pointer-down arms deselect instead of clearing immediately',()=>{
  const begin=main.slice(main.indexOf('function beginBackgroundTap('),main.indexOf("canvas.addEventListener('pointerdown',event=>{if(event.pointerType==='mouse'"));
  assert.match(begin,/backgroundTap=\{pointerId:event\.pointerId/);
  assert.match(begin,/window\.addEventListener\('pointerdown',beginBackgroundTap,true\)/);
  assert.doesNotMatch(begin,/clearSelection\(\)/);
  assert.doesNotMatch(main,/if\(!hit\)\{clearSelection\(\);renderMesh\(\);return;\}/);
});

test('navigation movement preserves current selection',()=>{
  assert.match(main,/Math\.hypot\(event\.clientX-backgroundTap\.startX,event\.clientY-backgroundTap\.startY\)>=EDIT_DRAG_THRESHOLD\)backgroundTap\.moved=true/);
  assert.match(main,/if\(!tap\.cancelled&&!moved\)\{clearSelection\(\);renderMesh\(\);\}/);
});

test('second pointer cancels pending blank deselect for pan and pinch',()=>{
  assert.match(main,/if\(backgroundTap&&backgroundTap\.pointerId!==event\.pointerId\)backgroundTap\.cancelled=true/);
});

test('current main runtime retains navigation-selection baseline',()=>{
  assertAssetReference(index,'main.js');
});
