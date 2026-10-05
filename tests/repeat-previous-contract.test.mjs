import {assetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
const precision=fs.readFileSync(new URL('../src/precision-face.js',import.meta.url),'utf8');
const repeat=fs.readFileSync(new URL('../src/repeat-face-previous.js',import.meta.url),'utf8');

test('328 Repeat Previous has one authoritative loader through drawer UI',()=>{
  assert.doesNotMatch(index,/precision-face\.js\?v=/);
  assert.doesNotMatch(index,/repeat-face-previous\.js\?v=/);
  assert.ok(drawer.includes("import('./"+assetReference(drawer,'precision-face.js')+"')"));
  assert.ok(drawer.includes("import('./"+assetReference(drawer,'repeat-face-previous.js')+"')"));
  assert.equal((drawer.match(/precision-face\.js\?v=/g)||[]).length,1);
  assert.equal((drawer.match(/repeat-face-previous\.js\?v=/g)||[]).length,1);
});

test('327 precision Face exposes exact replay API and committed last operation',()=>{
  assert.match(precision,/function commitOperation\(tool,value,source='drag'\)/);
  assert.match(precision,/globalThis\.__boxlabLastFaceOperation=saved/);
  assert.match(precision,/function applyFor\(tool,value\)/);
  assert.match(precision,/window\.__boxlabPrecisionFace=\{version:'\d+(?:\.\d+){2,3}'/);
});

test('327 Repeat Previous replays only Extrude or Inset committed values',()=>{
  assert.match(repeat,/direct\.tool==='extrude'\|\|direct\.tool==='inset'/);
  for(const tool of ['extrude','inset']){
    const calls=[],selection=[],operation={tool,value:.125};
    const c={armed:true,applying:false,armedOperation:operation,mesh:()=>({faces:[[0,1,2],[2,3,0]]}),multiToggle:{checked:false},bridge:()=>({set:(mode,ids)=>selection.push([mode,ids])}),render(){},__boxlabFaceDirect:{replay:(...args)=>{calls.push(args);return true;}},status:{},shortLabel:()=>tool,setTimeout:fn=>fn(),forcePaintBurst(){}};
    vm.createContext(c);vm.runInContext(repeat.slice(repeat.indexOf('function replayFace('),repeat.indexOf('// window capture')),c);
    assert.equal(c.replayFace(1),true);
    assert.deepEqual(calls,[[tool,.125,1]],'delegate once to actual Face owner with committed amount');
    assert.equal(selection[0][0],'face');assert.deepEqual(Array.from(selection[0][1]),[1]);
    assert.equal(c.applying,false);assert.deepEqual(operation,{tool,value:.125});
    c.applying=true;assert.equal(c.replayFace(1),false);assert.equal(calls.length,1);
    c.applying=false;assert.equal(c.replayFace(99),false);assert.equal(calls.length,1);
    c.__boxlabFaceDirect.replay=()=>false;assert.equal(c.replayFace(1),false);
  }
  assert.match(repeat,/globalThis\.__boxlabRepeatFacePrevious=\{version:'\d+(?:\.\d+){2,3}'/);
});

test('327 Through and rollback states remain excluded from repeat capture',()=>{
  assert.match(precision,/THROUGH READY\|Extrude Through\|BLOCKED\|rollback/i);
  assert.match(precision,/gesture\.repeatable=false/);
});
