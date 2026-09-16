import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const source=readFileSync(new URL('../src/object-selection-layout.js',import.meta.url),'utf8');
test('Object selection layout prefers live Objects-drawer toolbar',()=>{
  assert.match(source,/objectsDrawerContent\?\.querySelector\('#objectManagementTools,\.object-management-tools'\)/);
  assert.match(source,/removeStaleExcept\(t\)/);
  assert.match(source,/selectionDrawer\.appendChild\(t\)/);
});
test('Object selection layout owns v255 single-toolbar contract',()=>{
  assert.match(source,/0\.36\.18\.255/);
  assert.match(source,/ownedToolbar/);
});
