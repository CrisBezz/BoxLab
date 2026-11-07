import test from 'node:test';
import assert from 'node:assert/strict';
import {viewportPaintRuntime,viewportPaintUIRuntime} from './helpers/viewport-paint-runtime.mjs';

async function start(){
 const events=[],r=viewportPaintRuntime(),u=viewportPaintUIRuntime(r,{gestureDebug:{paint:(stage,data)=>events.push({stage,data})}});
 await u.api.open();await u.nodes.get('paint-tool-paint').click();u.nodes.get('paint-radius').value='256';
 return {r,u,events};
}

function coalescedMove(u,pressures,startX=501){
 const samples=pressures.map((pressure,index)=>({clientX:startX+index,clientY:300+index,pressure,buttons:1}));
 u.emit('pointermove',{clientX:startX+pressures.length,clientY:301+pressures.length,pressure:pressures.at(-1),getCoalescedEvents:()=>samples});
}

test('1085 clamps only an unsettled pressure spike when the onset sample window expires',async()=>{
 const {r,u,events}=await start();
 u.emit('pointerdown',{pressure:.08,clientX:500,clientY:300});
 coalescedMove(u,[.08,.08,.08,.08,.08,.08,.056687,.08]);
 u.emit('pointermove',{clientX:530,clientY:330,pressure:.003});
 u.emit('pointerup',{clientX:530,clientY:330,pressure:0,buttons:0});
 const onset=events.find(event=>event.stage==='onset-confirm')?.data;
 assert(onset,JSON.stringify(events));
 assert.equal(onset.settleReason,'sample-window');
 assert.equal(onset.pressureClamped,true);
 assert(onset.observedRadius>8,JSON.stringify(onset));
 assert(onset.initialRadius<=2,JSON.stringify(onset));
 assert(events.some(event=>event.stage==='dab'&&event.data.index===0&&event.data.primaryRadius<=2));
 assert(events.some(event=>event.stage==='stroke-finish'&&event.data.committed===true));
 assert.equal(r.h.undoStack.length,1);assert(r.controls.enabled);u.api.close();
});

test('1085 preserves a stable intentional Pencil pressure at the same onset window',async()=>{
 const {r,u,events}=await start();
 u.emit('pointerdown',{pressure:.08,clientX:500,clientY:300});
 coalescedMove(u,Array(8).fill(.08));
 u.emit('pointermove',{clientX:530,clientY:330,pressure:.08});
 u.emit('pointerup',{clientX:530,clientY:330,pressure:0,buttons:0});
 const onset=events.find(event=>event.stage==='onset-confirm')?.data;
 assert(onset,JSON.stringify(events));
 assert.equal(onset.pressureClamped,false);
 assert.equal(onset.appliedPressure,onset.resolvedPressure);
 assert(onset.initialRadius>2,JSON.stringify(onset));
 assert(events.some(event=>event.stage==='stroke-finish'&&event.data.committed===true));
 assert.equal(r.h.undoStack.length,1);u.api.close();
});
