import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source=readFileSync(new URL('../src/transform-arming.js',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');

test('Duplicate clears stale transform before deferred real Move handoff',()=>{
  assert.match(source,/closest\?\.\('#outlinerDuplicateBtn'\)/);
  assert.match(source,/disarm\(\);\s*queueMicrotask\(\(\)=>\{/s);
  assert.match(source,/if\(mode==='object'\)activateRealMove\(\)/);
});

test('real Move handoff drives main engine toolMode through normal Move button',()=>{
  assert.match(source,/function activateRealMove\(\)[\s\S]*moveButton\.click\(\)/);
  assert.match(main,/toolMode=btn\.dataset\.tool/);
});

test('Duplicate handoff is captured above button-level interceptors',()=>{
  assert.match(source,/document\.addEventListener\('click',[\s\S]*#outlinerDuplicateBtn[\s\S]*,true\);/);
});
