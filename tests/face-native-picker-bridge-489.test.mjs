import {delegatedPicker,tapRemoval,tapToggle} from './helpers/armed-face-behavior.mjs';
import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('489 selection bridge exposes exact native component picker',()=>{
  assert.match(main,/pick:\(type,event\)=>pickKind\(event,type\)/);
});

test('489 armed Face tools delegate the original pointer event to the native bridge',()=>{
  delegatedPicker();
});

test('489 direct controller resolves additive and subtractive native toggles',()=>{
  tapToggle();tapRemoval();
});

test('489 contains no stale native handoff state',()=>{
  assert.doesNotMatch(direct,/pendingNativePress/);
});

test('489 cache-hops only intended runtimes and preserves protected multi-object pin',()=>{
  assertAssetReference(index,'main.js');
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'rotate-transform.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
