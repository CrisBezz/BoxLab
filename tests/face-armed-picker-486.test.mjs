import {delegatedPicker,tapToggle,dragWorkingSet,dragCancellation} from './helpers/armed-face-behavior.mjs';
import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const paint=fs.readFileSync(new URL('../src/edge-paint-select.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('486 armed Face tools delegate primary picking to the native bridge',()=>{
  delegatedPicker();
});

test('486 armed Face direct exposes explicit ownership state',()=>{
  assert.match(direct,/globalThis\.__boxlabFaceDirect=/);
  assert.match(direct,/active:\(\)=>!!armed/);
});

test('486 paint selector yields while armed Face direct owns Face mode',()=>{
  assert.match(paint,/type==='face'&&globalThis\.__boxlabFaceDirect\?\.active\?\.\(\)/);
});

test('486 cache-hops both ownership modules and preserves protected pins',()=>{
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'edge-paint-select.js');
  assertAssetReference(index,'rotate-transform.js');
  assertAssetReference(index,'main.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});

// Mutate only the in-memory owner evaluated by the existing fixture.
test('486 current bridge and tap ownership checks reject routing regressions',()=>{
  const cases=[
    [delegatedPicker, "picker('face',event)?.index", "picker('edge',event)?.index"],
    [delegatedPicker, "picker('face',event)?.index", "picker('face',{...event})?.index"],
    [tapToggle, "bridge()?.toggle?.('face',p.hit);", "bridge()?.toggle?.('face',0);"],
    [dragWorkingSet, "if(Math.hypot(dx,dy)<8)return;", "if(Math.hypot(dx,dy)<4)return;"],
    [dragCancellation, "if(beginDirectDrag(event,p.hit,p.selectionBefore,workingFaces)){", "if(false){"]
  ];
  for(const [check,before,after] of cases){
    assert.ok(direct.includes(before),before);
    assert.throws(()=>check(source=>source.replace(before,after)),assert.AssertionError,before);
  }
});
