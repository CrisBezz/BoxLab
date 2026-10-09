import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {explicitExactAndReplay} from './helpers/armed-face-behavior.mjs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const fallback=fs.readFileSync(new URL('../src/sequential-through-fallback.js',import.meta.url),'utf8');
const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

// Repeat moved to direct replay in .531; Exact retains the 9876 synthetic path.
test('528 Repeat/Exact paths keep explicit selected Face',()=>explicitExactAndReplay());

test('528 Through fallback ignores synthetic Repeat/Exact gesture',()=>{
  assert.match(fallback,/if\(detail\.pointerId===9876\)return;/);
});

test('528 runtime pins current Repeat-safe Face ownership',()=>{
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'drawer-ui.js');
  assertAssetReference(drawer,'sequential-through-fallback.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
