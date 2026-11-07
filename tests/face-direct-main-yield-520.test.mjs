import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

function guardedDown({active=false,hit=false,second=false}={}){
  const start=main.indexOf("canvas.addEventListener('pointerdown',event=>{if(event.pointerType==='mouse'");
  const end=main.indexOf("\n if(directTool",start);
  const prefix=main.slice(start,end).split('event=>{')[1];
  const context={document:{querySelector:()=>({})},__boxlabFaceValueViewportSession:{active:()=>active},pick:()=>hit?{}:null,backgroundTap:second?{pointerId:1,cancelled:false}:null,entered:false};
  vm.runInNewContext(`function down(event){${prefix}entered=true;}down({pointerType:'touch',pointerId:2});`,context);
  return context;
}

test('520 legacy Face handling yields while armed, including contextual Face hits',()=>{
  assert.equal(guardedDown().entered,false);
  assert.equal(guardedDown({active:true,hit:true}).entered,false);
  assert.equal(guardedDown({active:true,hit:false}).entered,true);
});

test('700 second contact cancels pending background tap while Face hits still yield',()=>{
  const c=guardedDown({active:true,hit:true,second:true});
  assert.equal(c.entered,false);assert.equal(c.backgroundTap.cancelled,true);
});

test('520 runtime pins Face direct and guarded main together',()=>{
  assertAssetReference(index,'main.js');
  assertAssetReference(index,'multi-face-direct.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
