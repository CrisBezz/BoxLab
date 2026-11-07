import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const source=readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
test('Object selection toolbar has a single authoritative live owner',()=>{
  assert.match(source,/toolbarOwner=`object-management-/);
  assert.match(source,/__boxlabObjectToolbarOwner=toolbarOwner/);
  assert.match(source,/candidate!==toolbar\)candidate\.remove\(\)/);
  assert.match(source,/\[0,50,150,400,900\]\.forEach/);
});
