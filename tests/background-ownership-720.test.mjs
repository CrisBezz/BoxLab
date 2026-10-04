import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createBackgroundSelectionTap} from '../src/background-selection-tap.js';
const read=n=>fs.readFileSync(new URL('../src/'+n,import.meta.url),'utf8');
test('Double tap uses native release times through 500ms despite delayed callbacks; late tap clears',()=>{
 for(const interval of [100,360,440,500,501]){
  let ids=[1,3],clears=0,inverts=0;
  const owner=createBackgroundSelectionTap({now:()=>90000}),opts={context:'edge',mesh:{},read:()=>ids,clear:()=>{ids=[];clears++;},invert:seed=>{ids=[0,1,2,3].filter(x=>!seed.includes(x));inverts++;}};
  owner.tap({timeStamp:1000,clientX:10,clientY:20},opts);
  const result=owner.tap({timeStamp:1000+interval,clientX:12,clientY:21},opts);
  assert.equal(result,interval<=500?'invert':'clear');assert.equal(inverts,interval<=500?1:0);assert.equal(clears,interval<=500?1:2);
 }
});
test('Older timestamps cannot invert a newer tap',()=>{
 const owner=createBackgroundSelectionTap();let inversions=0,ids=[1];const opts={context:'edge',read:()=>ids,clear:()=>ids=[],invert:()=>inversions++};
 owner.tap({timeStamp:1000,clientX:0,clientY:0},opts);owner.tap({timeStamp:900,clientX:0,clientY:0},opts);assert.equal(inversions,0);
});
function nativeOwner(){
 const s=read('main.js'),windowHandlers={},canvas={},logs=[],timers=new Map();let timerId=0;let ids=[1,3],armed=true,hit=false,wall=100000;
 const c={setTimeout:(fn,ms)=>{timers.set(++timerId,{fn,ms});return timerId;},clearTimeout:id=>timers.delete(id),canvas,window:{addEventListener:(t,f)=>{(windowHandlers[t]??=[]).push(f);},dispatchEvent(){}},createBackgroundSelectionTap:()=>createBackgroundSelectionTap({now:()=>wall}),backgroundTap:null,selectionMode:'edge',directTool:null,mesh:{},EDIT_DRAG_THRESHOLD:8,TAP_MAX_MS:320,performance:{now:()=>wall},gestureDebug:(stage,detail)=>logs.push({stage,detail}),pick:()=>hit,selectionIndices:()=>ids,resetEdgeHoldCycle(){},clearSelection(){ids=[];},renderMesh(){},__boxlabLasso:{isArmed:()=>armed,isDrawing:()=>false,setArmed:v=>armed=v},__boxlabSelectionSetPolish:{invert:seed=>ids=[0,1,2,3].filter(i=>!seed.includes(i))}};
 vm.createContext(c);
 const begin=s.slice(s.indexOf('function beginBackgroundTap('),s.indexOf("canvas.addEventListener('pointerdown',event=>{if(event.pointerType==='mouse'"));
 const helper=s.slice(s.indexOf('const backgroundSelectionTap='),s.indexOf("window.addEventListener('pointerup',event=>{\n  if(backgroundHold"));
 const finish=s.slice(s.indexOf("window.addEventListener('pointerup',event=>{\n  if(backgroundHold"),s.indexOf('// Pencil orbit owner'));
 const move="window.addEventListener('pointermove',event=>{if(!backgroundTap||backgroundTap.pointerId!==event.pointerId)return;if(Math.hypot(event.clientX-backgroundTap.startX,event.clientY-backgroundTap.startY)>=EDIT_DRAG_THRESHOLD){backgroundTap.moved=true;backgroundSelectionTap.reset();}},true);";
 vm.runInContext(begin+helper+move+finish,c);
 return {c,logs,fireHold(){for(const [id,t] of [...timers]){timers.delete(id);assert.equal(t.ms,500);t.fn();}},get ids(){return ids;},get armed(){return armed;},set hit(v){hit=v;},send(type,timeStamp,x=10,extra={}){const e={type,timeStamp,clientX:x,clientY:20,pointerId:1,pointerType:'touch',isPrimary:true,target:canvas,button:0,...extra};for(const f of windowHandlers[type]||[])f(e);},semantic(timeStamp){c.completeBackgroundSelectionTap({pointerId:1,timeStamp,clientX:10,clientY:20});}};
}
test('Actual window owner clears Edge/Lasso despite unavailable canvas delivery and delayed Safari timers',()=>{
 const h=nativeOwner();h.send('pointerdown',1000);h.send('pointerup',1070);assert.deepEqual(h.ids,[]);assert.equal(h.armed,false);h.semantic(1070);assert.deepEqual(h.ids,[],'duplicate semantic release cannot invert');
 h.send('pointerdown',1400);h.send('pointerup',1470);assert.deepEqual(h.ids,[],'second short tap also clears; double-tap Invert retired');h.semantic(1470);assert.deepEqual(h.ids,[],'duplicate remains harmless');
 assert.deepEqual(h.logs.filter(x=>x.stage==='BACKGROUND TAP COMPLETE').map(x=>x.detail.result),['clear','clear']);
});
test('Window owner rejects navigation, cancellation, secondary contact and long hold',()=>{
 for(const kind of ['move','cancel','secondary','hold']){
  const h=nativeOwner();h.send('pointerdown',1000);
  if(kind==='move')h.send('pointermove',1020,30);
  if(kind==='secondary')h.send('pointerdown',1020,10,{pointerId:2,isPrimary:false});
  h.send(kind==='cancel'?'pointercancel':'pointerup',kind==='hold'?1500:1080);
  assert.deepEqual(h.ids,[1,3],kind);assert.equal(h.armed,true,kind);
 }
});
test('Arming Lasso ends idle main direct ownership; busy drag remains protected',()=>{
 const source=read('main.js'),snippet=source.match(/disarmForSelection:\(\)=>\{[^\n]+\}/)[0];let clears=0,renders=0;const c={drag:null,setDirectTool:()=>clears++,renderMesh:()=>renders++};vm.createContext(c);vm.runInContext('var api={'+snippet+'};',c);assert.equal(c.api.disarmForSelection(),true);assert.equal(clears,1);assert.equal(renders,1);c.drag={};assert.equal(c.api.disarmForSelection(),false);assert.equal(clears,1);
 assert.match(read('lasso-select.js'),/__boxlabMainDirectTool\?\.disarmForSelection\?\.\(\)/);
});
test('Semantic Pencil, Object and Lasso paths carry the same native timestamp',()=>{
 for(const file of ['pencil-orbit-gate.js','multi-object.js','lasso-select.js'])assert.match(read(file),/timeStamp:event\.timeStamp/,file);
 assert.doesNotMatch(read('main.js'),/setTimeout\(\(\)=>completedBackgroundPointers/);
});
test('Edge Paint defers its existing claim to armed Lasso instead of consuming its move/end',()=>{
 const handlers={},node={checked:true,addEventListener:(type,fn)=>handlers[type]=fn};let stopped=0,armed=false;
 class Raycaster{constructor(){this.params={Line:{}};}setFromCamera(){}intersectObjects(){return [{object:{userData:{index:0}}}];}}
 const c={THREE:{Raycaster,Vector2:class{}},document:{querySelector:()=>node,querySelectorAll:()=>[]},window:{addEventListener(){}},__boxlabBridgeState:{camera:{},edgeObjects:new Map([[0,{}]])},__boxlabSelectionBridge:{mode:()=> 'edge',has:()=>false},__boxlabLasso:{isArmed:()=>armed}};
 node.getBoundingClientRect=()=>({left:0,top:0,width:100,height:100});vm.createContext(c);vm.runInContext(read('edge-paint-select.js').replace(/^import[^\n]+\n/,''),c);
 const e={isPrimary:true,pointerId:1,clientX:10,clientY:20,preventDefault(){},stopImmediatePropagation(){stopped++;}};
 handlers.pointerdown(e);assert.equal(c.__boxlabPaintSelectDebug.pending().type,'edge');armed=true;handlers.pointermove({...e,clientX:40});assert.equal(c.__boxlabPaintSelectDebug.pending(),null);assert.equal(stopped,0);
 handlers.pointerdown(e);assert.equal(c.__boxlabPaintSelectDebug.pending(),null);handlers.pointermove({...e,clientX:40});assert.equal(c.__boxlabPaintSelectDebug.active(),null);assert.equal(stopped,0);
});

test('Background hold inverts original seed once at500ms, keeps Lasso armed and release cannot clear',()=>{
 for(const semanticFirst of [false,true]){
  const h=nativeOwner();h.send('pointerdown',1000);assert.deepEqual(h.ids,[1,3]);h.fireHold();assert.deepEqual(h.ids,[0,2]);assert.equal(h.armed,true);
  if(semanticFirst)h.semantic(1550);h.send('pointerup',1550);h.semantic(1550);assert.deepEqual(h.ids,[0,2]);assert.equal(h.armed,true);assert.equal(h.logs.filter(x=>x.stage==='BACKGROUND HOLD INVERT').length,1);
 }
});
test('Hold cancels on movement, secondary contact, cancel, changed selection/mode/mesh or active session',()=>{
 for(const kind of ['move','secondary','cancel','mode','mesh','selection','session','direct']){
  const h=nativeOwner();h.send('pointerdown',1000);
  if(kind==='move')h.send('pointermove',1100,30);
  if(kind==='secondary')h.send('pointerdown',1100,10,{pointerId:2,isPrimary:false});
  if(kind==='cancel')h.send('pointercancel',1100);
  if(kind==='mode')h.c.selectionMode='vertex';if(kind==='mesh')h.c.mesh={};
  if(kind==='selection')h.c.selectionIndices=()=>[2];if(kind==='session')h.c.__boxlabToolSession={isActive:()=>true};if(kind==='direct')h.c.directTool='loopCut';
  h.fireHold();assert.deepEqual(h.ids,[1,3],kind);
 }
});
test('Hold in Object mode invokes original Object complement owner and keeps release harmless',()=>{
 const h=nativeOwner();let ids=[1,3];h.c.selectionMode='object';h.c.__boxlabObjectSelection={get ids(){return ids;},invert:seed=>ids=[1,2,3,4].filter(x=>!seed.includes(x))};
 h.send('pointerdown',1000);h.fireHold();assert.deepEqual(ids,[2,4]);h.send('pointerup',1600);h.semantic(1600);assert.deepEqual(ids,[2,4]);
});

test('Pencil hold requires real contact; real pen hold fires; blur prevents delayed inversion',()=>{
 const hover=nativeOwner();hover.send('pointerdown',1000,10,{pointerType:'pen',buttons:0,pressure:0});hover.fireHold();assert.deepEqual(hover.ids,[1,3]);
 const pen=nativeOwner();pen.send('pointerdown',1000,10,{pointerType:'pen',buttons:1,pressure:.1});pen.fireHold();assert.deepEqual(pen.ids,[0,2]);pen.send('pointerup',1600,10,{pointerType:'pen'});assert.deepEqual(pen.ids,[0,2]);
 const blurred=nativeOwner();blurred.send('pointerdown',1000);blurred.send('blur',1100);blurred.fireHold();assert.deepEqual(blurred.ids,[1,3]);
});

test('731 existing background owner routes touch and Pencil taps to armed Slide without clearing selection',()=>{
 const h=nativeOwner(),events=[];h.c.__boxlabSlideViewportSession={active:()=>true};h.c.CustomEvent=class{constructor(type,{detail}){Object.assign(this,{type,detail});}};h.c.window.dispatchEvent=e=>events.push(e);
 h.send('pointerdown',1000);h.fireHold();assert.deepEqual(h.ids,[1,3]);h.send('pointerup',1070);assert.equal(events.length,1);assert.equal(events[0].type,'boxlab-viewport-background-tap');assert.deepEqual(h.ids,[1,3]);
 const s=read('main.js'),a=s.indexOf("window.addEventListener('boxlab-pencil-background-tap'"),b=s.indexOf("canvas.addEventListener('pointermove'",a);let pencil;h.c.window.addEventListener=(t,f)=>pencil=f;vm.runInContext(s.slice(a,b),h.c);pencil({detail:{pointerId:2,timeStamp:1400}});assert.equal(events.length,2);assert.equal(events[1].type,'boxlab-viewport-background-tap');assert.deepEqual(h.ids,[1,3]);
});

test('732 native and Pencil releases exit idle tool once and preserve selection after owner closes',()=>{
 const h=nativeOwner();let active=true,exits=0;h.c.__boxlabToolBackgroundExit={active:()=>active,ownsPoint:()=>false};h.c.CustomEvent=class{constructor(type,{detail}){Object.assign(this,{type,detail});}};h.c.window.dispatchEvent=()=>{active=false;exits++;};
 const s=read('main.js'),a=s.indexOf("window.addEventListener('boxlab-pencil-background-tap'"),b=s.indexOf("canvas.addEventListener('pointermove'",a);let pencil;h.c.window.addEventListener=(t,f)=>pencil=f;vm.runInContext(s.slice(a,b),h.c);
 h.send('pointerdown',1000);h.send('pointerup',1070);pencil({detail:{pointerId:1,timeStamp:1070}});assert.equal(exits,1);assert.deepEqual(h.ids,[1,3]);assert.equal(h.armed,true);
 active=true;h.send('pointerdown',1400);pencil({detail:{pointerId:1,timeStamp:1470}});h.send('pointerup',1470);assert.equal(exits,2);assert.deepEqual(h.ids,[1,3]);
});
test('732 virtual Array ghost hits and navigation never trigger background exit or deselection',()=>{
 for(const ghost of [true,false]){const h=nativeOwner();let exits=0;h.c.__boxlabToolBackgroundExit={active:()=>true,ownsPoint:()=>ghost};h.c.CustomEvent=class{};h.c.window.dispatchEvent=()=>exits++;h.send('pointerdown',1000);if(!ghost)h.send('pointermove',1030,40);h.send('pointerup',1070);assert.equal(exits,0);assert.deepEqual(h.ids,[1,3]);}
});
