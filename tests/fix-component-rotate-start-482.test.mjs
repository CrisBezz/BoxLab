import {checkRotateGizmo} from './helpers/rotate-owner-checks.mjs';
import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const upgrade=fs.readFileSync(new URL('../src/transform-upgrade.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('482 Rotate no longer depends on selected-component hit test',()=>{
  checkRotateGizmo();
});

test('482 Move and Scale keep existing hit-test behavior',()=>{
  assert.match(upgrade,/hitSelectedIndex\(event,m,ids\)/);
});

test('482 cache-hops shared transform and preserves protected core',()=>{
  assertAssetReference(index,'transform-upgrade.js');
  assertAssetReference(index,'main.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
