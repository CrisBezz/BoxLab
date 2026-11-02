import test from 'node:test';
import assert from 'node:assert/strict';
import {viewportPaintRuntime as runtime,viewportPaintUIRuntime as uiRuntime} from './helpers/viewport-paint-runtime.mjs';
const n=(u,k)=>u.nodes.get('paint-'+k);
async function setup(){const r=runtime(),u=uiRuntime(r);await u.api.open();await n(u,'open-material').click();n(u,'multi-metalness').checked=true;n(u,'multi-metalness').dispatchEvent({type:'change'});n(u,'colour').value='#ff0000';n(u,'colour').dispatchEvent({type:'input'});return {r,u};}
test('fresh Pencil down recovers a missed release without Done, and intentional capture release cannot re-enter cancellation',async()=>{
 const {r,u}=await setup(),canvas=u.nodes.get('viewport');const release=canvas.releasePointerCapture.bind(canvas);let releases=0;
 canvas.releasePointerCapture=id=>{releases++;release(id);canvas.dispatchEvent({type:'lostpointercapture',pointerId:id});};
 u.emit('pointerdown',{pointerId:8});assert(!r.controls.enabled);
 u.emit('pointerdown',{pointerId:9});u.emit('pointermove',{pointerId:9,clientX:470});u.emit('pointerup',{pointerId:9,clientX:470});
 assert(r.controls.enabled);assert(u.api.active);assert(r.target().metalnessPaint);assert.equal(releases,2);assert.equal(r.h.undoStack.length,1);
 u.emit('pointerdown',{pointerId:10});u.emit('pointerup',{pointerId:10});assert(r.controls.enabled);assert(u.api.active);u.api.close();
});
test('positive-pressure zero-buttons movement paints a trail after colour focus is blurred before the stroke starts',async()=>{
 const {r,u}=await setup(),radial=u.nodes.get('viewportWrap').children.find(x=>x.id==='boxlabPaintRadial');let blurred=0;
 const field={blur(){assert(r.controls.enabled);blurred++;u.c.document.activeElement=null;n(u,'colour').dispatchEvent({type:'input'});}};
 radial.contains=x=>x===field;u.c.document.activeElement=field;
 u.emit('pointerdown');u.emit('pointermove',{buttons:0,pressure:.6,clientX:480,getCoalescedEvents:()=>[{pointerType:'pen',buttons:0,pressure:.6,clientX:480,clientY:300}]});u.emit('pointerup');
 assert.equal(blurred,1);assert(r.controls.enabled);assert(u.api.active);
 const trail=r.target().colourPaint.pixels;const count=a=>a.reduce((n,v,i)=>n+(i%4===1&&v<250),0);
 const other=await setup();other.u.emit('pointerdown');other.u.emit('pointerup');assert(count(trail)>count(other.r.target().colourPaint.pixels)*1.5,'movement must extend the first dab');other.u.api.close();u.api.close();
});
