import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createBackgroundSelectionTap} from '../../src/background-selection-tap.js';
const read=n=>fs.readFileSync(new URL('../../src/'+n,import.meta.url),'utf8');

// Original .720 native owner fixture; extract main movement rather than manufacture it.
// Controlled selection/DOM/timers; no Safari or whole-application propagation claim.
export function nativeOwner({sourceTransform=source=>source}={}){
 const s=sourceTransform(read('main.js')),windowHandlers={},canvas={},logs=[],timers=new Map();let timerId=0;let ids=[1,3],armed=true,hit=false,wall=100000;
 const c={setTimeout:(fn,ms)=>{timers.set(++timerId,{fn,ms});return timerId;},clearTimeout:id=>timers.delete(id),canvas,window:{addEventListener:(t,f)=>{(windowHandlers[t]??=[]).push(f);},dispatchEvent(){}},createBackgroundSelectionTap:()=>createBackgroundSelectionTap({now:()=>wall}),backgroundTap:null,selectionMode:'edge',directTool:null,mesh:{},EDIT_DRAG_THRESHOLD:8,TAP_MAX_MS:320,performance:{now:()=>wall},gestureDebug:(stage,detail)=>logs.push({stage,detail}),pick:()=>hit,selectionIndices:()=>ids,resetEdgeHoldCycle(){},clearSelection(){ids=[];},renderMesh(){},__boxlabLasso:{isArmed:()=>armed,isDrawing:()=>false,setArmed:v=>armed=v},__boxlabSelectionSetPolish:{invert:seed=>ids=[0,1,2,3].filter(i=>!seed.includes(i))}};
 vm.createContext(c);
 const begin=s.slice(s.indexOf('function beginBackgroundTap('),s.indexOf("canvas.addEventListener('pointerdown',event=>{if(event.pointerType==='mouse'"));
 const helper=s.slice(s.indexOf('const backgroundSelectionTap='),s.indexOf("window.addEventListener('pointerup',event=>{\n  if(backgroundHold"));
 const finish=s.slice(s.indexOf("window.addEventListener('pointerup',event=>{\n  if(backgroundHold"),s.indexOf('// Pencil orbit owner'));
 const move=s.match(/window\.addEventListener\('pointermove',event=>\{if\(!backgroundTap\|\|backgroundTap\.pointerId!==event\.pointerId\)return;[^\n]+?\},true\);/)?.[0];
 if(!move)throw new Error('actual main background movement owner missing');
 vm.runInContext(begin+helper+move+finish,c);
 return {c,logs,fireHold(){for(const [id,t] of [...timers]){timers.delete(id);assert.equal(t.ms,500);t.fn();}},get ids(){return ids;},get armed(){return armed;},set hit(v){hit=v;},send(type,timeStamp,x=10,extra={}){const e={type,timeStamp,clientX:x,clientY:20,pointerId:1,pointerType:'touch',isPrimary:true,target:canvas,button:0,...extra};for(const f of windowHandlers[type]||[])f(e);},semantic(timeStamp){c.completeBackgroundSelectionTap({pointerId:1,timeStamp,clientX:10,clientY:20});}};
}

export function backgroundRetention(sourceTransform=source=>source){
 for(const mode of ['vertex','edge','face'])for(const kind of ['move','return','diagonal','threshold','cancel','secondary','release-move']){
  const h=nativeOwner({sourceTransform});h.c.selectionMode=mode;h.send('pointerdown',1000);
  assert.deepEqual(h.ids,[1,3],'press cannot clear selection');
  if(kind==='move'||kind==='return')h.send('pointermove',1020,30);
  if(kind==='return')h.send('pointermove',1040,10);
  if(kind==='diagonal')h.send('pointermove',1020,16,{clientY:26});
  if(kind==='threshold')h.send('pointermove',1020,18);
  if(kind==='secondary')h.send('pointerdown',1020,10,{pointerId:2,isPrimary:false});
  h.send(kind==='cancel'?'pointercancel':'pointerup',1080,kind==='release-move'?20:10);
  assert.deepEqual(h.ids,[1,3],mode+':'+kind);assert.equal(h.armed,true);
  assert.equal(h.logs.filter(x=>x.stage==='BACKGROUND TAP COMPLETE').length,0);
 }
}

export function confirmedBackgroundTap(sourceTransform=source=>source){
 for(const mode of ['vertex','edge','face']){
  const h=nativeOwner({sourceTransform});h.c.selectionMode=mode;h.send('pointerdown',1000);
  assert.deepEqual(h.ids,[1,3]);h.send('pointermove',1020,15);
  h.send('pointerup',1070,15);assert.deepEqual(h.ids,[]);assert.equal(h.armed,false);
  h.semantic(1070);h.send('pointerup',1070,15);
  assert.equal(h.logs.filter(x=>x.stage==='BACKGROUND TAP COMPLETE').length,1,'duplicate delivery cannot complete twice');
 }
}
