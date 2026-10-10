import {faceDiagnostics,nativeFacePicker} from './helpers/armed-face-behavior.mjs';
import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('494 native picker can expose ordered hit stack',()=>{
  assert.match(main,/function pickKindHits\(event,kind\)/);
  assert.match(main,/pickHits:\(type,event\)=>pickKindHits\(event,type\)/);
});

test('494 current semantic press reports chosen Face and working selection',()=>{
  faceDiagnostics();
});

test('494 real native picker and direct toggles remain connected',()=>{
  nativeFacePicker();
});

test('494 cache hops only diagnostic runtimes and protects multi-object pin',()=>{
  assertAssetReference(index,'main.js');
  assertAssetReference(index,'multi-face-direct.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
