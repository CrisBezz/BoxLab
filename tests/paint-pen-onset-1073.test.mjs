import test from 'node:test';import assert from 'node:assert/strict';
import {viewportPaintRuntime as runtime,viewportPaintUIRuntime as uiRuntime} from './helpers/viewport-paint-runtime.mjs';
const n=(u,k)=>u.nodes.get('paint-'+k);
function draft(r,u){u.frames.shift()?.();return r.body.children.find(o=>o.userData.boxlabRenderOverlay).material.map.image.data;}
async function setup(brush='boxlab',pressure=true){const r=runtime(),u=uiRuntime(r);await u.api.open();await n(u,'tool-paint').click();n(u,'brush').value=brush;n(u,'pressure').checked=pressure;n(u,'radius').value='40';n(u,'colour').value='#202020';for(const key of ['multi-roughness','multi-metalness']){n(u,key).checked=true;n(u,key).dispatchEvent({type:'change'});}return {r,u};}
async function line(first,brush,firstMove=.035){const {r,u}=await setup(brush);n(u,'radius').value='256';u.emit('pointerdown',{pressure:first});assert(draft(r,u).every(v=>v===255),'Pencil down must not change even the visible preview');assert.equal(r.target().colourPaint,undefined);assert(r.controls.enabled===false);for(const x of [452,456,460,470,480])u.emit('pointermove',{pressure:x===452?firstMove:.035,clientX:x});u.emit('pointerup',{pressure:0,buttons:0,clientX:480});return {r,u};}
test('1074 positive Pencil-down and first-move spikes cannot create a cap: both brush paths match the exact low-pressure reference in all three channels',async()=>{
 for(const brush of ['boxlab','klecks']){const spike=await line(.9,brush,.9),reference=await line(.035,brush);for(const field of ['colourPaint','roughnessPaint','metalnessPaint'])assert.deepEqual(spike.r.target()[field].pixels,reference.r.target()[field].pixels,brush+' '+field);assert.equal(spike.r.h.undoStack.length,1);assert(spike.r.controls.enabled);spike.u.api.close();reference.u.api.close();}
});
test('1078 coalesced Pencil samples without pointerType use the active Pencil pressure and avoid a start blob in all four channels',async()=>{
 for(const brush of ['boxlab','klecks']){
  const spike=await setup(brush),reference=await setup(brush);
  for(const u of [spike.u,reference.u]){
   n(u,'radius').value='256';n(u,'multi-opacity').checked=true;n(u,'multi-opacity').dispatchEvent({type:'change'});n(u,'opacity-value').value='173';
  }
  spike.u.emit('pointerdown',{pressure:.9});reference.u.emit('pointerdown',{pressure:.035});
  for(const x of [452,456,460,470,480]){
   spike.u.emit('pointermove',{clientX:x,getCoalescedEvents:()=>[{clientX:x,clientY:300,pressure:.035,buttons:1}]});
   reference.u.emit('pointermove',{clientX:x,pressure:.035});
  }
  spike.u.emit('pointerup',{pressure:0,buttons:0,clientX:480});reference.u.emit('pointerup',{pressure:0,buttons:0,clientX:480});
  for(const field of ['colourPaint','roughnessPaint','metalnessPaint','opacityPaint'])assert.deepEqual(spike.r.target()[field].pixels,reference.r.target()[field].pixels,brush+' '+field+' must not inherit the untrusted Pencil-down pressure');
  spike.u.api.close();reference.u.api.close();
 }
});
test('1073 stationary settling does not ink early, and a deliberate tap uses the latest contact pressure on release',async()=>{
 const high=await setup();high.u.emit('pointerdown',{pressure:.9});high.u.emit('pointermove',{pressure:.04});assert(draft(high.r,high.u).every(v=>v===255),'stationary pressure settling must not stamp the preview');assert.equal(high.r.target().colourPaint,undefined);assert(high.u.api.active);high.u.emit('pointerup',{pressure:0,buttons:0});
 const low=await setup();low.u.emit('pointerdown',{pressure:.04});low.u.emit('pointerup',{pressure:0,buttons:0});for(const field of ['colourPaint','roughnessPaint','metalnessPaint'])assert.deepEqual(high.r.target()[field].pixels,low.r.target()[field].pixels);assert.equal(high.r.h.undoStack.length,1);high.u.api.close();low.u.api.close();
});
test('1073 cancelling a pending positive contact restores controls and creates no colour/scalar/history resources',async()=>{
 const {r,u}=await setup('klecks',false);u.emit('pointerdown',{pressure:.5});u.emit('pointercancel',{pressure:0,buttons:0});for(const field of ['colourPaint','roughnessPaint','metalnessPaint'])assert.equal(r.target()[field],undefined);assert.equal(r.h.undoStack.length,0);assert(r.controls.enabled);u.api.close();
});
