import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {createBackgroundSelectionTap} from '../src/background-selection-tap.js';
const read=n=>fs.readFileSync(new URL('../src/'+n,import.meta.url),'utf8');
function mainOwner({mode='face',lasso=null}={}){
 const handlers={},tasks=[];let time=0,ids=[1,3],objectIds=[1,3],hit=null,clears=0,inverts=0;
 const c={createBackgroundSelectionTap:()=>createBackgroundSelectionTap({now:()=>time}),Set,setTimeout:f=>tasks.push(f),window:{addEventListener:(type,f)=>handlers[type]=f},canvas:{addEventListener(){}},selectionMode:mode,directTool:null,mesh:{},backgroundTap:null,selectionIndices:()=>[...ids],resetEdgeHoldCycle(){},clearSelection(){ids=[];clears++;},renderMesh(){},__boxlabLasso:lasso,__boxlabObjectManager:{activeId:1,pickObject:()=>hit},__boxlabObjectSelection:{get ids(){return objectIds;},invert(seed){objectIds=[1,2,3,4].filter(x=>!seed.includes(x));inverts++;}},__boxlabSelectionSetPolish:{invert(seed){ids=[0,1,2,3].filter(x=>!seed.includes(x));inverts++;}}};
 vm.createContext(c);const s=read('main.js'),a=s.indexOf('const backgroundSelectionTap='),b=s.indexOf("canvas.addEventListener('pointerup',event=>{",a);vm.runInContext(s.slice(a,b),c);
 return {c,complete:p=>c.completeBackgroundSelectionTap(p),flush(){while(tasks.length)tasks.shift()();},advance(t){time=t;},get ids(){return ids;},get objectIds(){return objectIds;},get clears(){return clears;},get inverts(){return inverts;},set hit(v){hit=v;}};
}
test('Actual main background owner counts semantic and canvas delivery once per release',()=>{
 for(const mode of ['face','object']){
  const h=mainOwner({mode}),p={pointerId:1,clientX:10,clientY:20};
  h.complete(p);h.complete(p);assert.equal(h.clears,1);assert.equal(h.inverts,0,'one physical tap cannot invert');h.flush();
  h.advance(150);h.complete(p);h.complete(p);assert.equal(h.inverts,1);assert.equal(h.clears,1,'duplicate second delivery cannot clear inverted result');assert.deepEqual(mode==='object'?h.objectIds:h.ids,mode==='object'?[2,4]:[0,2]);
 }
});
test('Actual main disarms stationary background Lasso and clears; drawing and object hits retain it',()=>{
 let armed=true,drawing=true;const lasso={isArmed:()=>armed,isDrawing:()=>drawing,setArmed:v=>armed=v};const h=mainOwner({lasso}),p={pointerId:1,clientX:10,clientY:20};
 h.complete(p);assert.equal(armed,true);assert.equal(h.clears,0,'early Pencil semantic cannot interrupt current lasso');drawing=false;h.hit={id:1};h.complete(p);assert.equal(armed,true);assert.equal(h.clears,0);h.hit=null;h.complete(p);assert.equal(armed,false);assert.deepEqual(h.ids,[]);assert.equal(h.clears,1);h.complete(p);assert.equal(h.inverts,0);
});
test('Sessions and navigation reset retain existing background exclusions',()=>{
 const h=mainOwner(),p={pointerId:1,clientX:10,clientY:20};h.c.directTool='loopCut';h.complete(p);assert.equal(h.clears,0);h.c.directTool=null;h.c.__boxlabToolSession={isActive:()=>true};h.complete(p);assert.equal(h.clears,0);h.c.__boxlabToolSession=null;h.complete(p);h.flush();vm.runInContext('backgroundSelectionTap.reset()',h.c);h.advance(100);h.complete(p);assert.equal(h.inverts,0);
});
function lassoOwner(){
 const handlers={},semantic=[],released=[],nodes=new Map();
 const element=()=>({style:{},children:[],classList:{toggle(){}},addEventListener(){},appendChild(n){this.children.push(n);},setAttribute(){}});
 const canvas=element();canvas.addEventListener=(t,f)=>{(handlers[t]??=[]).push(f);};canvas.setPointerCapture=()=>{};canvas.releasePointerCapture=id=>released.push(id);nodes.set('#viewport',canvas);nodes.set('#componentSelectionTools .selection-dock',element());
 const c={THREE,document:{querySelector:s=>nodes.get(s),querySelectorAll:()=>[],createElement:element,createElementNS:element,body:element()},window:{dispatchEvent:e=>semantic.push(e)},CustomEvent:class{constructor(type,{detail}){this.type=type;this.detail=detail;}},__boxlabObjectManager:{pickObject:()=>null},__boxlabSelectionBridge:{mode:()=> 'face'},queueMicrotask};
 vm.createContext(c);vm.runInContext(read('lasso-select.js').replace(/^import[^\n]+\n/,''),c);
 const event=(type,x,y=0)=>({type,isPrimary:true,pointerType:'pen',pointerId:7,button:0,clientX:x,clientY:y,preventDefault(){},stopImmediatePropagation(){}});
 return {c,semantic,released,send(type,x,y){for(const f of handlers[type]||[])f(event(type,x,y));}};
}
test('Actual Lasso owner emits stationary background tap after releasing capture, retaining drag/cancel',()=>{
 const h=lassoOwner();h.c.__boxlabLasso.setArmed(true);h.send('pointerdown',0);assert.equal(h.c.__boxlabLasso.isDrawing(),true);h.send('pointerup',1);assert.equal(h.c.__boxlabLasso.isDrawing(),false);assert.equal(h.semantic.length,1);assert.equal(h.semantic[0].type,'boxlab-pencil-background-tap');assert.equal(h.semantic[0].detail.source,'lasso');assert.deepEqual(h.released,[7]);
 h.send('pointerdown',0);h.send('pointermove',20);h.send('pointerup',0);assert.equal(h.semantic.length,1,'draw away and return is not a tap');
 h.send('pointerdown',0);h.send('pointercancel',0);assert.equal(h.semantic.length,1,'cancel never clears');
 h.c.__boxlabObjectManager.pickObject=()=>({id:1});h.send('pointerdown',0);h.send('pointerup',0);assert.equal(h.semantic.length,1,'stationary mesh hit leaves Lasso armed');
});
