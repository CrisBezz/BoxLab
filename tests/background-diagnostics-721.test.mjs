import test from 'node:test';
import assert from 'node:assert/strict';
import {createBackgroundSelectionTap} from '../src/background-selection-tap.js';
test('Diagnostic reports matcher/reset reasons without changing existing tap results',()=>{
 for(const change of ['match','time','distance','selection','mesh','context','reset']){
  const logs=[];let ids=[1,3],inversions=0;
  const helper=createBackgroundSelectionTap({trace:d=>logs.push(d)}),mesh={},options={context:'edge',mesh,read:()=>ids,clear:()=>ids=[],invert:()=>inversions++};
  assert.equal(helper.tap({timeStamp:1000,clientX:10,clientY:10},options),'clear');assert.equal(logs[0].reason,'first');
  if(change==='selection')ids=[2];if(change==='mesh')options.mesh={};if(change==='context')options.context='face';if(change==='reset')helper.reset('pointer-navigation');
  const result=helper.tap({timeStamp:change==='time'?1700:1400,clientX:change==='distance'?80:10,clientY:10},options);
  assert.equal(result,change==='match'?'invert':'clear');assert.equal(inversions,change==='match'?1:0);assert.equal(logs.at(-1).reason,change==='reset'?'first':change);
  if(change==='match'){assert.equal(logs.at(-1).dt,400);assert.equal(logs.at(-1).seed,2);assert.equal(logs.at(-1).current,0);}
  if(change==='reset')assert.equal(logs[1].reason,'pointer-navigation');
 }
});
