import test from 'node:test';
import assert from 'node:assert/strict';
import {createPerformanceMonitor} from '../src/performance-core.js';
test('1111 distinguishes callback work from timer scheduling gaps and resets on pause',()=>{
 let clock=0;const m=createPerformanceMonitor(()=>clock);m.heartbeat();m.callback('gizmo',0);assert.equal(m.snapshot().timingTrace.length,0);m.setEnabled(true);
 m.heartbeat(0);m.heartbeat(100);m.heartbeat(1300);clock=80;m.callback('main-controls',10);m.callback('unknown',0);
 const s=m.snapshot();assert.equal(s.heartbeat.maxMs,1100);assert.equal(s.callbacks['main-controls'].maxMs,70);assert.equal(s.callbacks.unknown,undefined);assert.deepEqual(s.timingTrace.map(e=>e.kind),['timer-delay','callback']);
 m.pause();m.heartbeat(5000);assert.equal(m.snapshot().heartbeat.samples,2);m.reset();assert.equal(m.snapshot().heartbeat.samples,0);assert.deepEqual(m.snapshot().callbacks,{});
});
