import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const source=readFileSync(new URL('../src/object-selection-layout.js',import.meta.url),'utf8');
test('Selection drawer forwards to native working Object toolbar',()=>{
  assert.match(source,/function nativeToolbar\(\)/);
  assert.match(source,/native\.click\(\)/);
  assert.match(source,/#objectsDrawer #objectManagementTools/);
  assert.match(source,/objectSelectionProxyTools/);
  assert.doesNotMatch(source,/selectionDrawer\.appendChild\(t\)/);
});
test('Object selection proxy owns v256 layout contract',()=>{
  assert.match(source,/0\.36\.18\.256/);
  assert.match(source,/data-object-action="multi"/);
  assert.match(source,/data-object-action="all"/);
  assert.match(source,/data-object-action="clear"/);
  assert.match(source,/data-object-action="visibility"/);
  assert.match(source,/data-object-action="lock"/);
});
