import test from 'node:test';
import assert from 'node:assert/strict';
import {bindRadialMove} from '../src/radial-move.js';
function runtime(){
 const handlers={},local={};let mode='face',active=true,changes=0;
 const node={addEventListener:(n,f)=>local[n]=f,setPointerCapture(){},releasePointerCapture(id){local.lostpointercapture({pointerId:id});}};
 const api=bindRadialMove(node,{active:()=>active,mode:()=>mode,changed:()=>changes++,window:{addEventListener:(n,f)=>handlers[n]=f}});
 const event=(id=1,x=0,y=0)=>({pointerId:id,clientX:x,clientY:y,button:0,preventDefault(){},stopImmediatePropagation(){}});
 return {api,event,down:e=>local.pointerdown(e),emit:(n,e)=>handlers[n](e),mode:m=>mode=m,active:v=>active=v,get changes(){return changes;}};
}
test('radial move retains per-mode relative offsets after release, ignores other contacts, and never changes transform anchor',()=>{
 const r=runtime();r.down(r.event());r.emit('pointermove',r.event(2,999,999));assert.deepEqual(r.api.offset('face'),{x:0,y:0});
 r.emit('pointermove',r.event(1,70,-25));r.emit('pointerup',r.event());assert.deepEqual(r.api.offset('face'),{x:70,y:-25});
 const projected={x:400,y:300},off=r.api.offset('face');assert.deepEqual({x:projected.x+off.x,y:projected.y+off.y},{x:470,y:275});
 projected.x+=40;assert.equal(projected.x+r.api.offset('face').x,510,'relative placement follows projected model');
 for(const mode of ['vertex','edge','object']){r.mode(mode);assert.deepEqual(r.api.offset(mode),{x:0,y:0});r.down(r.event());r.emit('pointermove',r.event(1,20,30));r.emit('pointerup',r.event());assert.deepEqual(r.api.offset(mode),{x:20,y:30});}
 assert.deepEqual(r.api.offset('face'),{x:70,y:-25});
});
test('cancel, capture loss, stale mode and hidden tools restore previous offsets; inactive handle does nothing',()=>{
 const r=runtime();for(const end of ['pointercancel','mode']){r.down(r.event());r.emit('pointermove',r.event(1,20,30));if(end==='mode'){r.mode('edge');r.emit('pointermove',r.event(1,50,50));r.mode('face');}else r.emit(end,r.event());assert.deepEqual(r.api.offset('face'),{x:0,y:0});}
 r.active(false);r.down(r.event());r.emit('pointermove',r.event(1,99,99));assert.deepEqual(r.api.offset('face'),{x:0,y:0});
});
