import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';
import {nativeOwner} from './helpers/background-selection-runtime.mjs';
import {viewportPaintRuntime,viewportPaintUIRuntime} from './helpers/viewport-paint-runtime.mjs';
function setup(){
 const h=nativeOwner();let opens=0,active=true,hit=false,allowed=true,key=1;
 const paint={get active(){return active;},get sessionKey(){return key;},backgroundHoldAllowed:()=>allowed,isBackgroundPoint:()=>allowed&&!hit,showTools:()=>opens++};
 h.c.__boxlabViewportPaint=paint;h.c.__boxlabToolSession={isActive:()=>true};
 return{h,paint,get opens(){return opens;},active:v=>active=v,hit:v=>hit=v,allowed:v=>allowed=v,nextSession:()=>key++};
}
test('1137 Paint opens tools on first background tap release for Pencil, mouse and finger, never from a hold timer or duplicate delivery',()=>{
 for(const pointerType of ['pen','mouse','touch']){
  const f=setup(),send=(type,t)=>f.h.send(type,t,2,{pointerType,buttons:1,pressure:.5});
  send('pointerdown',1000);f.h.fireHold();assert.equal(f.opens,0,'Paint no longer arms the 500ms menu timer');send('pointerup',1080);assert.equal(f.opens,1);assert.deepEqual(f.h.ids,[1,3]);assert(f.paint.active);
  send('pointerup',1080);f.h.semantic(1080);assert.equal(f.opens,1);
  send('pointerdown',2000);send('pointerup',2080);assert.equal(f.opens,2,'every new tap can reopen the radial');
 }
});
test('1137 Paint background tap refuses navigation, cancellation, surface hits, stale sessions and non-primary contacts',()=>{
 for(const scenario of ['drag','return','release-drag','secondary','cancel','surface','up-surface','blocked','close','reopen','context','mesh','blur','right-click','non-primary']){
  const f=setup(),h=f.h,extra={pointerType:'pen',buttons:1,pressure:.5};
  if(scenario==='surface')f.hit(true);if(scenario==='blocked')f.allowed(false);
  h.send('pointerdown',1000,2,{...extra,...scenario==='right-click'?{pointerType:'mouse',button:2}:{},...scenario==='non-primary'?{isPrimary:false}:{}});
  if(scenario==='drag'||scenario==='return')h.send('pointermove',1020,30,extra);
  if(scenario==='return')h.send('pointermove',1040,2,extra);
  if(scenario==='secondary')h.send('pointerdown',1020,2,{...extra,pointerId:2,isPrimary:false});
  if(scenario==='close')f.active(false);if(scenario==='reopen')f.nextSession();if(scenario==='context')h.c.selectionMode='vertex';if(scenario==='mesh')h.c.mesh={};if(scenario==='up-surface')f.hit(true);if(scenario==='blur')h.send('blur',1050);
  h.send(scenario==='cancel'?'pointercancel':'pointerup',1080,scenario==='release-drag'?30:2,extra);assert.equal(f.opens,0,scenario);assert.deepEqual(h.ids,[1,3],scenario);
 }
});
test('1137 actual Paint UI repeatedly returns to radial by background tap, hides on strokes, and stays locked until Done',async()=>{
 const r=viewportPaintRuntime(),u=viewportPaintUIRuntime(r);await u.api.open();const h=nativeOwner(),paint=Object.create(u.api);let opens=0;
 paint.showTools=p=>{opens++;return u.api.showTools(p);};h.c.__boxlabViewportPaint=paint;h.c.__boxlabToolSession={isActive:()=>u.api.active};const object=r.manager.activeId,history=r.h.undoStack.length;
 for(let i=0;i<2;i++){
  await u.nodes.get('paint-tool-paint').click();u.emit('pointerdown');assert(!u.nodes.get('paint-tool-picker').open);u.emit('pointermove',{clientX:470});u.emit('pointerup',{clientX:470});assert(u.api.active);
  h.send('pointerdown',1000+i*1000,2,{pointerType:'pen',buttons:1,pressure:.5});assert(!u.nodes.get('paint-tool-picker').open);h.send('pointerup',1080+i*1000,2,{pointerType:'pen',buttons:0,pressure:0});assert(u.nodes.get('paint-tool-picker').open);assert.equal(u.api.paletteState,'tools');assert(u.api.active);assert.equal(r.manager.activeId,object);assert.deepEqual(h.ids,[1,3]);
 }
 assert.equal(opens,2);assert.equal(r.h.undoStack.length,history+2,'background taps add no Paint history');
 h.send('pointerdown',4000,2,{pointerType:'pen',buttons:1,pressure:.5});await u.nodes.get('paint-done').click();await u.api.open();h.send('pointerup',4080,2,{pointerType:'pen'});assert.equal(opens,2,'a tap from the previous session cannot reopen the new one');await u.nodes.get('paint-done').click();assert(!u.api.active);
});

test('1137 original Pencil semantic completion before/after pointerup cannot consume or duplicate the Paint background tap',()=>{
 const f=setup(),s=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8'),a=s.indexOf("window.addEventListener('boxlab-pencil-background-tap',event=>{"),b=s.indexOf("canvas.addEventListener('pointermove',event=>{if(!drag",a);
 vm.runInContext(s.slice(a,b),f.h.c);
 f.h.send('pointerdown',1000,2,{pointerType:'pen',buttons:1,pressure:.5});
 f.h.send('boxlab-pencil-background-tap',1080,2,{detail:{pointerId:1,timeStamp:1080,clientX:2,clientY:20}});assert.equal(f.opens,0);
 f.h.send('pointerup',1080,2,{pointerType:'pen'});assert.equal(f.opens,1);
 f.h.send('boxlab-pencil-background-tap',1080,2,{detail:{pointerId:1,timeStamp:1080,clientX:2,clientY:20}});assert.equal(f.opens,1);assert.deepEqual(f.h.ids,[1,3]);
});
