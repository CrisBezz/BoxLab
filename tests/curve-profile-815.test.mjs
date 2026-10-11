import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {curveProfileUIRuntime} from './helpers/curve-profile-ui-runtime.mjs';
const read=name=>fs.readFileSync(new URL('../src/'+name,import.meta.url),'utf8');
function controls(u){const value={enabled:true};u.c.__boxlabBridgeState.controls=value;return value;}
const listeners=u=>['pointerdown','pointermove','pointerup','pointercancel'].map(type=>u.win.listeners.get(type)?.length||0);
test('815 shared editor owns Pencil before competing document capture and restores navigation on release',()=>{
 const u=curveProfileUIRuntime(),nav=controls(u),before=u.r.snapshot();let penMoves=0,touchMoves=0;
 for(const type of ['pointerdown','pointermove','pointerup','pointercancel'])u.doc.addEventListener(type,e=>{e.pointerType==='pen'?penMoves++:touchMoves++;e.stopImmediatePropagation();},true);
 u.api.open(false,true);assert(u.pointer('pointerdown',270,90).stopped);assert.equal(nav.enabled,false);u.pointer('pointermove',200,30);assert.equal(u.pointer('pointermove',100,30,{pointerId:9}).stopped,true);assert.equal(u.api.dragging,true);u.pointer('pointermove',60,90);u.pointer('pointermove',160,155);u.pointer('pointerup',270,90);assert.equal(nav.enabled,true);assert.equal(u.api.dragging,false);assert.equal(penMoves,1,'only unrelated pointer reaches document consumer');assert.deepEqual(u.r.snapshot(),before);
 const event=u.pointer('pointerdown',50,50,{pointerType:'touch'});assert.equal(event.prevented,undefined);assert.equal(nav.enabled,true);assert.equal(touchMoves,1);u.api.cancel();
});
test('815 actual Reset click closes profile before native reset, then same Pencil ID can draw again',()=>{
 const u=curveProfileUIRuntime(),nav=controls(u),reset={id:'resetBtn',listeners:[],addEventListener(type,fn){this.listeners.push(fn);}};let resets=0;
 u.c.__boxlabObjectManager.resetAll=()=>{assert.equal(u.api.active(),false);assert.equal(u.api.dragging,false);assert.equal(nav.enabled,true);resets++;return true;};
 u.c.document.querySelector=s=>s==='#resetBtn'?reset:s==='#viewportWrap'?u.wrap:null;Object.assign(u.c,{setDirectTool(){},clearLoopSlide(){},clearSelection(){},renderMesh(){}});
 const source=read('main.js'),start=source.indexOf("document.querySelector('#resetBtn').addEventListener");vm.runInContext(source.slice(start,source.indexOf("document.querySelector('#exportBaseBtn')",start)),u.c);
 u.api.open(false,true);u.pointer('pointerdown',270,90);u.pointer('pointermove',160,30);assert.equal(nav.enabled,false);u.doc.dispatchEvent({type:'click',target:reset});reset.listeners[0]();assert.equal(resets,1);assert.equal(u.find(n=>n.dataset?.addPreview==='mesh'),null);assert.deepEqual(listeners(u),[0,0,0,0]);
 u.api.open(false,true);u.pointer('pointerdown',270,90);for(let i=1;i<=32;i++){const a=i*Math.PI/16;u.pointer('pointermove',160+110*Math.cos(a),90+60*Math.sin(a));}u.pointer('pointerup',270,90);assert.equal(u.button('apply').disabled,false);assert.equal(nav.enabled,true);assert(u.api.apply());assert.deepEqual(listeners(u),[0,0,0,0]);
});
test('815 early stroke handlers and controls clean up on Cancel, Escape, lost capture and conflicting session',()=>{
 for(const exit of ['cancel','escape','capture','conflict']){
  const u=curveProfileUIRuntime(),nav=controls(u),before=u.r.snapshot();u.api.open();u.pointer('pointerdown',40,120);u.pointer('pointermove',100,30);assert.equal(nav.enabled,false);
  if(exit==='cancel')u.api.cancel();if(exit==='escape')u.win.dispatchEvent({type:'keydown',key:'Escape',preventDefault(){}});if(exit==='capture'){u.pointer('lostpointercapture',100,30);assert.equal(u.api.dragging,false);u.api.cancel();}if(exit==='conflict')u.win.dispatchEvent({type:'boxlab-tool-session-change',detail:{active:true,id:'array'}});
  assert.equal(nav.enabled,true);assert.equal(u.api.active(),false);assert.deepEqual(listeners(u),[0,0,0,0]);assert.deepEqual(u.r.snapshot(),before);if(exit==='conflict')u.c.__boxlabToolSession.end('curve-profile');
  for(let i=0;i<3;i++){u.api.open();assert.deepEqual(listeners(u),[1,1,1,1]);u.api.cancel();assert.deepEqual(listeners(u),[0,0,0,0]);}
 }
});
