import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {sweepRuntime} from './helpers/sweep-runtime.mjs';

const sweep=fs.readFileSync(new URL('../src/sweep-path.js',import.meta.url),'utf8');
const transform=fs.readFileSync(new URL('../src/transform-upgrade.js',import.meta.url),'utf8');

test('400 Draw Profile explicitly stays open for append authoring',()=>{
  assert.match(sweep,/if\(type==='draw'\)\{m\.profileClosed=false;m\.editProfile=true;disarmOther\(m,'profile'\);\}/);
  assert.match(sweep,/m\.profileClosed&&hit===null&&m\.profilePoints\.length>2\?nearestProfileSegment/);
});

test('400 Sweep edit modes disarm transforms',()=>{
  assert.match(sweep,/function disarmTransforms\(\)/);
  assert.match(sweep,/__boxlabTransformArming\?\.disarm\?\.\(\)/);
  assert.match(sweep,/if\(which==='profile'\|\|which==='path'\)disarmTransforms\(\)/);
});

function editingOwnership(source=transform){
 const f=sweepRuntime();f.add();
 const c={canvas:f.canvas,__boxlabSweepPath:f.owner,directFaceToolActive:()=>false,
  mode:()=> 'object',gestureDebug(){},state(){throw new Error('transform-preflight');}};
 vm.createContext(c);
 const a=source.indexOf('function startGesture(event){'),b=source.indexOf('function beginGizmoGesture(spec,event){',a),end=source.indexOf("document.addEventListener('pointerdown',startGesture",b);
 assert.ok(a>=0&&b>a&&end>b,'actual transform entrypoints present');
 vm.runInContext(source.slice(a,end),c);
 const e={target:f.canvas,isPrimary:true,pointerType:'pen',pointerId:1};
 const run=()=>{c.startGesture(e);assert.equal(c.beginGizmoGesture({tool:'move',constraint:'free'},e),false);};
 assert.equal(f.owner.editing,false);
 assert.throws(()=>c.startGesture(e),/transform-preflight/);
 assert.throws(()=>c.beginGizmoGesture({tool:'move'},e),/transform-preflight/);
 f.click('#sweepProfileDraw');f.frame();assert.equal(f.owner.editing,true);run();
 f.click('#sweepEditProfile');f.frame();assert.equal(f.owner.editing,false);
 f.click('#sweepDrawPath');f.frame();assert.equal(f.owner.editing,true);run();
 f.click('#sweepEditPath');f.frame();assert.equal(f.owner.editing,false);
 assert.throws(()=>c.startGesture(e),/transform-preflight/);
 f.click('#sweepCancelBtn');f.frame();assert.equal(f.owner.editing,false);
}

test('400 transform gestures yield to current Sweep editing getter',()=>editingOwnership());

test('789 Sweep editing regression rejects omitted transform yield',()=>{
 const needle='globalThis.__boxlabSweepPath?.editing';assert.ok(transform.includes(needle));
 assert.throws(()=>editingOwnership(transform.replaceAll(needle,'false')),/transform-preflight/);
});
