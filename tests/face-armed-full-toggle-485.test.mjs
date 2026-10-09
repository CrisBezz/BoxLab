import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {delegatedPicker,tapToggle,dragWorkingSet} from './helpers/armed-face-behavior.mjs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

// Native primary picking now belongs to the main selection bridge, while the
// direct owner retains its selected-Face priority raycast (accepted .535).
test('485 armed Face owner accepts unselected hits from the authoritative picker',()=>delegatedPicker());

test('485 tap toggles selected state both directions',()=>tapToggle());

// .516/.518/.519 deliberately replaced .485's old union working set.
test('485 unselected Face drag isolates the hit and selected drag retains the working set',()=>dragWorkingSet());

test('485 cache-hops Face direct owner and preserves Rotate/main protected pins',()=>{
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'rotate-transform.js');
  assertAssetReference(index,'main.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
