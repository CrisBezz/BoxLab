import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const sweep=fs.readFileSync(new URL('../src/sweep-path.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('509 Sweep active buttons use standard white appearance',()=>{
  assert.match(sweep,/box-shadow:none!important;background:#eef1f7!important;color:#15171b!important/);
  assert.doesNotMatch(sweep,/138,208,255/);
});

test('509 cache-hops Sweep only and preserves protected interaction pins',()=>{
  assertAssetReference(index,'sweep-path.js');
  assertAssetReference(index,'main.js');
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'rotate-transform.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
