import test from 'node:test';
import assert from 'node:assert/strict';
import {sweepHubRuntime,assertSweepLaunch} from './helpers/sweep-hub-runtime.mjs';
test('740 actual Sweep semantic launch supports Face/Edge and refuses unrelated tool/mode',assertSweepLaunch);
for(const mode of ['face','edge'])test(`740 ${mode} Sweep end emits one completion with original launch mode`,()=>{
 const r=sweepHubRuntime();r.launch(mode);r.flush();r.end('array');assert.equal(r.c.__boxlabSweepViewportSession.active(),true);assert.equal(r.events.length,0);r.end();r.end();assert.equal(r.events.length,1);assert.equal(r.events[0].type,'boxlab-selection-hub-session-complete');assert.equal(r.events[0].detail.mode,mode);assert.equal(r.palette.hidden,true);
});
test('740 Sweep visibility follows authoritative controls and idle end emits no completion',()=>{const r=sweepHubRuntime();r.end();assert.equal(r.events.length,0);r.launch('edge');r.flush();r.controls.hidden=true;assert.equal(r.c.__boxlabSweepViewportSession.active(),false);});
