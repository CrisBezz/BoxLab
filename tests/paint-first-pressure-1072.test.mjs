import test from 'node:test';import assert from 'node:assert/strict';
import {viewportPaintRuntime as runtime,viewportPaintUIRuntime as uiRuntime} from './helpers/viewport-paint-runtime.mjs';
const n=(u,k)=>u.nodes.get('paint-'+k),count=p=>p.reduce((s,v,i)=>s+(i%4===0&&v<250),0);
async function setup({pressure=true,brush='boxlab',combined=false}={}){const r=runtime(),u=uiRuntime(r);await u.api.open();await n(u,'tool-paint').click();n(u,'colour').value='#202020';n(u,'pressure').checked=pressure;n(u,'brush').value=brush;n(u,'radius').value='40';if(combined){n(u,'multi-roughness').checked=true;n(u,'multi-roughness').dispatchEvent({type:'change'});n(u,'multi-metalness').checked=true;n(u,'multi-metalness').dispatchEvent({type:'change'});}return {r,u};}
test('1072 zero-pressure Pencil contact creates no dab, scalar resources or history with either brush/pressure mode',async()=>{
 for(const brush of ['boxlab','klecks'])for(const pressure of [true,false]){const {r,u}=await setup({brush,pressure,combined:true}),before=r.target().colourPaint,history=r.h.undoStack.length;u.emit('pointerdown',{pressure:0});u.emit('pointermove',{pressure:0,clientX:460});u.emit('pointerup',{pressure:0,buttons:0,clientX:460});assert.equal(r.target().colourPaint,before);assert.equal(r.target().roughnessPaint,undefined);assert.equal(r.target().metalnessPaint,undefined);assert.equal(r.h.undoStack.length,history);assert(r.controls.enabled);u.api.close();}
});
test('1072 stationary pressure rise begins an intentional dab without requiring movement; one history step covers all channels',async()=>{
 for(const brush of ['boxlab','klecks']){const {r,u}=await setup({brush,combined:true});u.emit('pointerdown',{pressure:0});u.emit('pointermove',{pressure:.15});u.emit('pointerup',{pressure:0,buttons:0});assert(r.target().colourPaint);assert(r.target().roughnessPaint);assert(r.target().metalnessPaint);assert.equal(r.h.undoStack.length,1);assert(r.controls.enabled);u.api.close();}
});
test('1072 light first dab remains small, and a later zero/unknown-pressure contact never inherits a firm stroke',async()=>{
 const {r,u}=await setup();u.emit('pointerdown',{pressure:.02});u.emit('pointerup',{pressure:0,buttons:0});const tiny=count(r.target().colourPaint.pixels);assert(tiny>0);u.api.close();
 const firm=await setup();firm.u.emit('pointerdown',{pressure:.9});firm.u.emit('pointerup',{pressure:0,buttons:0});assert(count(firm.r.target().colourPaint.pixels)>tiny*20);const before=firm.r.target().colourPaint,h=firm.r.h.undoStack.length;
 for(const pressure of [0,NaN,undefined]){firm.u.emit('pointerdown',{pressure,clientX:500});firm.u.emit('pointerup',{pressure:0,buttons:0,clientX:500});assert.equal(firm.r.target().colourPaint,before);assert.equal(firm.r.h.undoStack.length,h);}firm.u.api.close();
});
test('1072 pending contact starts at the first pressured location, cancels cleanly and preserves mouse taps and Fill',async()=>{
 const {r,u}=await setup();u.emit('pointerdown',{pressure:0,clientX:400});u.emit('pointermove',{pressure:0,clientX:430});u.emit('pointercancel',{pressure:0,buttons:0});assert.equal(r.target().colourPaint,undefined);assert(r.controls.enabled);
 u.emit('pointerdown',{pointerType:'mouse',pressure:0});u.emit('pointerup',{pointerType:'mouse',pressure:0,buttons:0});assert(r.target().colourPaint);assert.equal(r.h.undoStack.length,1);
 await n(u,'tool-fill').click();n(u,'fill-scope').value='object';n(u,'fill-scope').dispatchEvent({type:'change'});n(u,'colour').value='#ff0000';u.emit('pointerdown',{pressure:0});u.emit('pointerup',{pressure:0,buttons:0});assert.equal(r.h.undoStack.length,2);assert(r.controls.enabled);u.api.close();
});

test('1072 unpressured travel does not connect the initial touch to the first pressured point',async()=>{
 for(const brush of ['boxlab','klecks']){const pending=await setup({brush});pending.u.emit('pointerdown',{pressure:0,clientX:400});pending.u.emit('pointermove',{pressure:0,clientX:440});pending.u.emit('pointermove',{pressure:.25,clientX:480});pending.u.emit('pointerup',{pressure:0,buttons:0,clientX:480});const direct=await setup({brush});direct.u.emit('pointerdown',{pressure:.25,clientX:480});direct.u.emit('pointerup',{pressure:0,buttons:0,clientX:480});assert.deepEqual(pending.r.target().colourPaint.pixels,direct.r.target().colourPaint.pixels);assert.equal(pending.r.h.undoStack.length,1);pending.u.api.close();direct.u.api.close();}
});
