import test from 'node:test';
import assert from 'node:assert/strict';
import {bevelSessionRuntime,assertBevelRadialLaunch} from './helpers/bevel-session-runtime.mjs';
import {assertBevelOwnerDisarm} from './helpers/direct-bevel-runtime.mjs';
test('739 actual Bevel API exposes active state and idempotent preview disposal/disarm',assertBevelOwnerDisarm);
test('739 actual radial Bevel handler opens Edge and Face sessions, ignores other tools',assertBevelRadialLaunch);
for(const change of ['mode','mesh','object'])test(`739 actual Edge Bevel ${change} change closes stale session once`,()=>{
 const r=bevelSessionRuntime();r.launch();r.flush();assert.equal(r.active(),true);
 if(change==='mode')r.mode('face');if(change==='mesh')r.c.__boxlabBridgeState.mesh={};if(change==='object')r.c.__boxlabObjectManager.activeId=2;
 r.sync();r.sync();assert.equal(r.active(),false);assert.deepEqual(r.counts(),{disarms:1,cancels:0});assert.equal(r.emitted.length,1);assert.equal(r.emitted[0].detail.tool,'Bevel');
});
test('739 actual Edge Bevel background exit waits for drag completion and disarms once',()=>{
 const r=bevelSessionRuntime();r.launch();r.flush();r.busy(true);r.tap();assert.equal(r.active(),true);r.busy(false);r.tap();r.tap();assert.equal(r.active(),false);assert.equal(r.counts().disarms,1);assert.deepEqual(r.selection(),[1,2]);
});
test('739 actual Face Bevel invalid context cancels via Face owner',()=>{
 const r=bevelSessionRuntime({mode:'face'});r.launch();r.flush();r.faceValid(false);r.sync();r.sync();assert.equal(r.active(),false);assert.deepEqual(r.counts(),{disarms:0,cancels:1});
});
test('739 actual Bevel Cancel retains launch selection and invokes existing owner',()=>{
 const r=bevelSessionRuntime();r.launch();r.flush();r.select([]);r.cancel();assert.deepEqual(r.selection(),[1,2]);assert.equal(r.active(),false);assert.equal(r.counts().disarms,1);
});
