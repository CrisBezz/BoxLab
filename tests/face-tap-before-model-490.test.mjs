import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {deferredModelling,tapToggle,delegatedPicker,dragWorkingSet,dragCancellation} from './helpers/armed-face-behavior.mjs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('490 pointerdown records face hit without validating modelling region',()=>deferredModelling());

test('490 tap selection resolves before modelling validation',()=>tapToggle());

test('776 armed Face behavior rejects picker, tap, cancellation, threshold, working-set and history mutations',()=>{
  const mutations=[
    [source=>source.replace("picker('face',event)?.index","null"),delegatedPicker],
    [source=>source.replace("bridge()?.toggle?.('face',p.hit);","bridge()?.toggle?.('face',p.hit+1);"),tapToggle],
    [source=>source.replace("if(event.type==='pointerup'){\n      bridge()?.toggle?.('face',p.hit);","if(event.type==='pointerup'||event.type==='pointercancel'){\n      bridge()?.toggle?.('face',p.hit);"),tapToggle],
    [source=>source.replace('if(Math.hypot(dx,dy)<8)return;','if(Math.hypot(dx,dy)<4)return;'),deferredModelling],
    [source=>source.replace('(selectionBefore.includes(hit)?[...selectionBefore]:[hit])','(selectionBefore.includes(hit)?[...selectionBefore]:[...selectionBefore,hit])'),dragWorkingSet],
    [source=>source.replaceAll('globalThis.__boxlabHistory?.push(d.before);',''),dragWorkingSet],
    [source=>source.replace('const provisionalSelection=!selectionBefore.includes(hit);','info(selectionBefore);const provisionalSelection=!selectionBefore.includes(hit);'),deferredModelling],
    [source=>source.replace("if(event.type==='pointerup'&&d.changed&&d.preview&&!d.blocked){","if((event.type==='pointerup'||event.type==='pointercancel')&&d.changed&&d.preview&&!d.blocked){"),dragCancellation],
  ];
  for(const [mutate,verify] of mutations){
    assert.notEqual(mutate(direct),direct,'mutation must change the source under test');
    assert.throws(()=>verify(mutate),assert.AssertionError);
  }
});

test('490 modelling validation begins only after drag threshold',()=>{
  assert.match(direct,/if\(Math\.hypot\(dx,dy\)<8\)return;/);
  assert.match(direct,/beginDirectDrag\(event,p\.hit,p\.selectionBefore,workingFaces\)/);
});

test('490 keeps native picker bridge and protected pins',()=>{
  assertAssetReference(index,'main.js');
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'rotate-transform.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
