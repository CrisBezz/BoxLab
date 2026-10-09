import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {selectedPriority,sequentialScope,explicitResets,explicitExactAndReplay} from './helpers/armed-face-behavior.mjs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('529 deliberate preselection suppresses sequential overlap substitution',()=>{selectedPriority();explicitResets();});

test('529 successful Extrude enables only the next sequential overlap opportunity',()=>{
  assert.match(direct,/preferSequentialUnselected=true;/);
});

test('529 explicit Face tap resets sequential overlap preference',()=>explicitResets());

test('777 targeting checks reject selected-priority, continuation, reset and Exact/replay regressions',()=>{
  const mutations=[
    [source=>source.replace('selectionBefore.length===1&&!sequentialValid&&Number.isInteger(selectedHit)','false'),selectedPriority],
    [source=>source.replace('selectionBefore.length>1&&Number.isInteger(selectedHit)','false'),selectedPriority],
    [source=>source.replace("armed==='extrude'&&sequentialValid","sequentialValid"),sequentialScope],
    [source=>source.replace("armed==='extrude'&&sequentialValid&&selectionBefore.length===1&&","armed==='extrude'&&sequentialValid&&"),sequentialScope],
    [source=>source.replace('sequentialValid=preferSequentialUnselected&&sequentialSelectionKey===faceSelectionKey(selectionBefore)','sequentialValid=preferSequentialUnselected'),sequentialScope],
    [source=>source.replace("bridge()?.toggle?.('face',p.hit);\n      clearSequentialPreference();","bridge()?.toggle?.('face',p.hit);"),explicitResets],
    [source=>source.replace('pendingSelection=null;clearSequentialPreference();disarmTransforms();','pendingSelection=null;disarmTransforms();'),explicitResets],
    [source=>source.replace("primary=synthetic?(selectionBefore[0]??null):picker('face',event)?.index","primary=picker('face',event)?.index"),explicitExactAndReplay],
    [source=>source.replace('hits=synthetic?[]:','hits='),explicitExactAndReplay],
    [source=>source.replace('const result=m.extrudeFace?.(faceIndex,distance);','const result=m.extrudeFace?.(0,distance);'),explicitExactAndReplay],
  ];
  for(const [mutate,verify] of mutations){
    assert.notEqual(mutate(direct),direct,'mutation must change the runtime under test');
    assert.throws(()=>verify(mutate),assert.AssertionError);
  }
});

test('529 runtime pin current and protected transform unchanged',()=>{
  assertAssetReference(index,'multi-face-direct.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
