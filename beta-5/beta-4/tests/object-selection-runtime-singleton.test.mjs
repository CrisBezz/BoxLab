import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const source=readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
test('Object selection runtime initializes only once across duplicate module URLs',()=>{
  assert.match(source,/__boxlabObjectSelectionRuntime\?\.initialized\)return true/);
  assert.match(source,/__boxlabObjectSelectionRuntime=\{initialized:true,owner:toolbarOwner\}/);
  assert.match(source,/__boxlabObjectSelection=\{__authoritative:true,owner:toolbarOwner/);
});
