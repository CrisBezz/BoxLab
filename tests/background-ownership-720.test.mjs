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
 const s=read('main.js'),windowHandlers={},canvas={},logs=[];let ids=[1,3],armed=true,hit=false,wall=100000;
 const c={canvas,window:{addEventListener:(t,f)=>{(windowHandlers[t]??=[]).push(f);},dispatchEvent(){}},createBackgroundSelectionTap:()=>createBackgroundSelectionTap({now:()=>wall}),backgroundTap:null,selectionMode:'edge',directTool:null,mesh:{},EDIT_DRAG_THRESHOLD:8,TAP_MAX_MS:320,performance:{now:()=>wall},gestureDebug:(stage,detail)=>logs.push({stage,detail}),pick:()=>hit,selectionIndices:()=>ids,resetEdgeHoldCycle(){},clearSelection(){ids=[];},renderMesh(){},__boxlabLasso:{isArmed:()=>armed,isDrawing:()=>false,setArmed:v=>armed=v},__boxlabSelectionSetPolish:{invert:seed=>ids=[0,1,2,3].filter(i=>!seed.includes(i))}};
 vm.createContext(c);
 const begin=s.slice(s.indexOf('function beginBackgroundTap('),s.indexOf("canvas.addEventListener('pointerdown',event=>{if(event.pointerType==='mouse'"));
 const helper=s.slice(s.indexOf('const backgroundSelectionTap='),s.indexOf("window.addEventListener('pointerup',event=>{\n  if(!backgroundTap"));
 const finish=s.slice(s.indexOf("window.addEventListener('pointerup',event=>{\n  if(!backgroundTap"),s.indexOf('// Pencil orbit owner'));
 const move="window.addEventListener('pointermove',event=>{if(!backgroundTap||backgroundTap.pointerId!==event.pointerId)return;if(Math.hypot(event.clientX-backgroundTap.startX,event.clientY-backgroundTap.startY)>=EDIT_DRAG_THRESHOLD){backgroundTap.moved=true;backgroundSelectionTap.reset();}},true);";
 vm.runInContext(begin+helper+move+finish,c);
 return {c,logs,get ids(){return ids;},get armed(){return armed;},set hit(v){hit=v;},send(type,timeStamp,x=10,extra={}){const e={type,timeStamp,clientX:x,clientY:20,pointerId:1,pointerType:'touch',isPrimary:true,target:canvas,button:0,...extra};for(const f of windowHandlers[type]||[])f(e);},semantic(timeStamp){c.completeBackgroundSelectionTap({pointerId:1,timeStamp,clientX:10,clientY:20});}};
}
test('Actual window owner clears Edge/Lasso despite unavailable canvas delivery and delayed Safari timers',()=>{
 const h=nativeOwner();h.send('pointerdown',1000);h.send('pointerup',1070);assert.deepEqual(h.ids,[]);assert.equal(h.armed,false);h.semantic(1070);assert.deepEqual(h.ids,[],'duplicate semantic release cannot invert');
 h.send('pointerdown',1400);h.send('pointerup',1470);assert.deepEqual(h.ids,[0,2],'440? 400ms release interval inverts original');h.semantic(1470);assert.deepEqual(h.ids,[0,2],'duplicate cannot clear');
 assert.deepEqual(h.logs.filter(x=>x.stage==='BACKGROUND TAP COMPLETE').map(x=>x.detail.result),['clear','invert']);
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
