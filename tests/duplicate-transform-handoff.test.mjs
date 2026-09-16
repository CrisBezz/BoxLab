import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const arming=readFileSync(new URL('../src/transform-arming.js',import.meta.url),'utf8');
const single=readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
const multi=readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');

test('single Duplicate owns its post-activation Move handoff',()=>{
  assert.match(single,/function duplicateActive\(\)[\s\S]*requestAnimationFrame\(\(\) => \{[\s\S]*activateRealMove\?\.\(\)/);
});

test('Multi Duplicate owns the same post-transaction Move handoff',()=>{
  assert.match(multi,/function duplicateSelection\(\)[\s\S]*requestAnimationFrame\(\(\)=>\{if\(currentMode\(\)===['"]object['"]\)globalThis\.__boxlabTransformArming\?\.activateRealMove\?\.\(\)/);
});

test('global arming layer no longer tries to infer Duplicate clicks',()=>{
  assert.doesNotMatch(arming,/outlinerDuplicateBtn/);
  assert.match(arming,/moveButton\.click\(\)/);
});

test('real Move button still owns main transform toolMode',()=>{
  assert.match(main,/toolMode=btn\.dataset\.tool/);
});
