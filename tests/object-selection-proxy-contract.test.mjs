import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const layout=readFileSync(new URL('../src/object-selection-layout.js',import.meta.url),'utf8');
const management=readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
test('Object management creates the real toolbar in Selection',()=>{
  assert.match(management,/selectionHost=document\.querySelector\('#selectionDrawer'\)/);
  assert.match(management,/\(selectionHost\|\|drawer\)\.appendChild\(toolbar\)/);
});
test('Selection layout has no proxy or toolbar relocation machinery',()=>{
  assert.match(layout,/0\.36\.18\.260/);
  assert.doesNotMatch(layout,/objectSelectionProxyTools/);
  assert.doesNotMatch(layout,/MutationObserver/);
  assert.doesNotMatch(layout,/\.click\(\)/);
  assert.match(layout,/object-selection-active/);
});
