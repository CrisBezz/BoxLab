import {assertModeDock} from './helpers/menu-layout-runtime.mjs';
import {assertAssetReference,assertShellRelease} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('557 selection modes are docked bottom-left without DOM/id changes',()=>{
  assertModeDock();
  assert.match(index,/id="selectionModes"/);
  assert.match(index,/data-mode="vertex"/);
  assert.match(index,/data-mode="edge"/);
  assert.match(index,/data-mode="face"/);
  assert.match(index,/data-mode="object"/);
});

test('557 publishes only the CSS/version path and keeps protected runtime pin',()=>{
  assertAssetReference(index,'styles.css');
  assertShellRelease(index);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
