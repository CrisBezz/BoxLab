import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const legacy=fs.readFileSync(new URL('../src/persistent-face-tool-select.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('501 removes temporary FaceOwner diagnostics',()=>{
  assert.doesNotMatch(direct,/FaceOwner|ownerTrace|setOwnerTrace/);
  assert.doesNotMatch(main,/directTool:\(\)=>directTool/);
});

test('501 preserves single-owner armed Face selection fix',()=>{
  assert.match(legacy,/if\(globalThis\.__boxlabFaceDirect\?\.active\?\.\(\)\)return;/);
  assert.match(direct,/hit=picker\('face',event\)\?\.index/);
  assert.match(direct,/bridge\(\)\?\.toggle\?\.\('face',p\.hit\)/);
});

test('501 preserves protected pins',()=>{
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'main.js');
  assertAssetReference(index,'rotate-transform.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
