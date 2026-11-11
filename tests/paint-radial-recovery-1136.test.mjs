import test from 'node:test';
import assert from 'node:assert/strict';
import {viewportPaintRuntime as runtime,viewportPaintUIRuntime as uiRuntime} from './helpers/viewport-paint-runtime.mjs';
async function setup(){
 const r=runtime(),u=uiRuntime(r),view=()=>({left:0,top:0,width:1600,height:900});
 u.nodes.get('viewport').getBoundingClientRect=view;u.nodes.get('viewportWrap').getBoundingClientRect=view;
 r.camera.aspect=1600/900;r.camera.position.z=8;r.camera.updateProjectionMatrix();r.camera.lookAt(0,0,0);await u.api.open();
 const handle=u.nodes.get('paint-drag-tools'),pos=()=>({...u.api.palettePosition}),tick=()=>{let n=u.frames.length;while(n--)u.frames.shift()();},event=(id=77,x=20,y=20)=>({button:0,pointerId:id,clientX:x,clientY:y,currentTarget:handle,preventDefault(){},stopPropagation(){},stopImmediatePropagation(){}});
 const down=e=>handle.listeners.get('pointerdown')[0](e),history=r.h.undoStack.length;
 let captured=null,releases=0;handle.setPointerCapture=id=>captured=id;handle.releasePointerCapture=id=>{releases++;captured=null;handle.dispatchEvent({type:'lostpointercapture',pointerId:id});};
 return{r,u,handle,pos,tick,event,down,history,get captured(){return captured;},get releases(){return releases;},pan(){r.camera.position.x+=.3;r.camera.lookAt(r.camera.position.x,0,0);tick();}};
}
test('1136 lost capture restores prior Paint palette position and view following without reopening or history changes',async()=>{
 const f=await setup(),before=f.pos();f.down(f.event());f.u.emit('pointermove',f.event(77,60,60));assert(f.pos().left>before.left);
 f.handle.dispatchEvent({type:'lostpointercapture',pointerId:77});assert.deepEqual(f.pos(),before);
 f.pan();assert(f.pos().left<before.left,'lost capture must not strand positionPaintPalette behind radialDrag');
 assert(f.u.api.active);assert(f.r.controls.enabled);assert.equal(f.r.h.undoStack.length,f.history);
 f.u.emit('pointerdown',{pointerId:101,clientX:800,clientY:450});f.u.emit('pointermove',{pointerId:101,clientX:820,clientY:450});f.u.emit('pointerup',{pointerId:101,clientX:820,clientY:450});assert.equal(f.r.h.undoStack.length,f.history+1,'a new Paint stroke commits normally after recovery');assert(f.r.controls.enabled);assert(f.u.api.active);f.u.api.close();
});
test('1136 cancelled/blurred Paint ring gestures roll back their temporary offsets, ignoring other contacts',async()=>{
 for(const end of ['pointercancel','blur','pagehide']){
  const f=await setup();f.down(f.event());f.u.emit('pointermove',f.event(77,40,40));f.u.emit('pointerup',f.event());const committed=f.pos();
  f.down(f.event(88));f.down(f.event(99));f.u.emit('pointermove',f.event(99,90,90));assert.deepEqual(f.pos(),committed,'second contact must not replace the active owner');
  f.u.emit('pointermove',f.event(88,60,60));assert.notDeepEqual(f.pos(),committed);f.u.emit(end,end==='pointercancel'?f.event(88):{persisted:true});assert.deepEqual(f.pos(),committed,'return to the last completed drag, not the initial palette location');
  f.pan();assert(f.pos().left<committed.left);assert(f.u.api.active);assert.equal(f.r.h.undoStack.length,f.history);assert(f.r.controls.enabled);f.u.api.close();
 }
});
test('1136 Done during a ring drag clears capture; reopen follows the model and commits new drags despite synchronous capture loss',async()=>{
 const f=await setup();f.down(f.event());f.u.emit('pointermove',f.event(77,45,45));f.u.api.close();assert.equal(f.captured,null);assert(!f.u.api.active);
 await f.u.api.open();const reopened=f.pos();f.pan();assert(f.pos().left<reopened.left);
 const before=f.pos();f.down(f.event(91));f.u.emit('pointermove',f.event(91,40,40));const moved=f.pos();f.u.emit('pointerup',f.event(91));assert.deepEqual(f.pos(),moved,'intentional capture release must not trigger rollback');assert(moved.left>before.left);assert.equal(f.captured,null);assert.equal(f.r.h.undoStack.length,f.history);assert(f.r.controls.enabled);f.u.api.close();
});
