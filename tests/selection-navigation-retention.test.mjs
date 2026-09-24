import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const index=readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('blank pointer-down arms deselect instead of clearing immediately',()=>{
  assert.match(main,/if\(!hit\)\{if\(event\.isPrimary\)backgroundTap=\{pointerId:event\.pointerId,startX:event\.clientX,startY:event\.clientY,moved:false,cancelled:false\};return;\}backgroundTap=null;/);
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
  assert.match(index,/main\.js\?v=0\.36\.18\.461/);
});
