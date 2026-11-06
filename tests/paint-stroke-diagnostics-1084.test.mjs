import test from 'node:test';
import assert from 'node:assert/strict';
import {viewportPaintRuntime,viewportPaintUIRuntime} from './helpers/viewport-paint-runtime.mjs';

async function setup(){
 const events=[];const r=viewportPaintRuntime(),u=viewportPaintUIRuntime(r,{gestureDebug:{paint:(stage,data)=>events.push({stage,data})}});
 await u.api.open();await u.nodes.get('paint-tool-paint').click();u.nodes.get('paint-radius').value='256';
 return {r,u,events};
}

test('1084 actual Paint pointer trace reports hit, onset, dab and committed stroke',async()=>{
 const {r,u,events}=await setup();
 u.emit('pointerdown',{pressure:.08});
 u.emit('pointermove',{clientX:452,pressure:.08});
 u.emit('pointermove',{clientX:460,pressure:.02});
 u.emit('pointerup',{clientX:460,pressure:0,buttons:0});
 const stages=events.map(event=>event.stage);
 assert(stages.includes('surface-hit'));
 assert(stages.includes('begin-result'));
 assert(stages.includes('stroke-begin'));
 assert(stages.includes('onset-confirm'),JSON.stringify({events,status:u.nodes.get('selectionStatus')?.textContent}));
 assert(events.some(event=>event.stage==='dab'&&event.data.hit===true));
 assert(events.some(event=>event.stage==='stroke-finish'&&event.data.committed===true&&event.data.channels.includes('colour')));
 assert(events.some(event=>event.stage==='pointer-finish'&&event.data.committed===true));
 assert(!stages.some(stage=>stage.endsWith('-error')));
 assert(r.target().colourPaint);assert.equal(r.h.undoStack.length,1);assert(r.controls.enabled);u.api.close();
});

test('1084 actual Paint pointer trace identifies a captured zero-pressure contact with no ink',async()=>{
 const {r,u,events}=await setup();
 u.emit('pointerdown',{pressure:0});
 u.emit('pointermove',{clientX:460,pressure:0});
 u.emit('pointerup',{clientX:460,pressure:0,buttons:0});
 assert(events.some(event=>event.stage==='surface-hit'&&event.data.hit===true));
 assert(events.some(event=>event.stage==='begin-result'&&event.data.accepted===true));
 assert(events.some(event=>event.stage==='stroke-finish'&&event.data.committed===false&&event.data.reason==='no-visible-pixels'));
 assert(events.some(event=>event.stage==='pointer-finish'&&event.data.committed===false));
 assert(!events.some(event=>event.stage.endsWith('-error')));
 assert.equal(r.target().colourPaint,undefined);assert.equal(r.h.undoStack.length,0);assert(r.controls.enabled);u.api.close();
});
