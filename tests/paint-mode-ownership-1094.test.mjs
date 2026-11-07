import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
import {editableBooleanRuntime} from './helpers/editable-boolean-runtime.mjs';
const source=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
function inputRuntime(multi=false){
 const handlers={window:{},canvas:{}},canvas={addEventListener:(name,fn)=>handlers.canvas[name]=fn};let picked=0,activated=0;const paint={active:true};
 const c={canvas,window:{addEventListener:(name,fn)=>handlers.window[name]=fn,dispatchEvent(){}},__boxlabObjectSelection:{multi},__boxlabViewportPaint:paint,pickViewportObject:()=>{picked++;return {id:2,inactive:true};},currentMode:()=> 'object',handleViewportActivation:()=>activated++,touchTap:null,TOUCH_TAP_MOVE_PX:8,performance:{now:()=>0},CustomEvent:class{}};
 vm.createContext(c);vm.runInContext(source.slice(source.indexOf('function installViewportActivation('),source.indexOf('\nfunction ensureInactiveLayer'))+'\ninstallViewportActivation();',c);
 const event=(type='pen')=>({target:canvas,isPrimary:true,pointerId:1,pointerType:type,clientX:20,clientY:20,preventDefault(){this.prevented=true;},stopImmediatePropagation(){this.stopped=true;}});
 return {c,paint,handlers,event,read:()=>({picked,activated})};
}
for(const multi of [false,true])test(`1094 Paint blocks pen/mouse/touch object activation without consuming navigation, Multi=${multi}`,()=>{
 const r=inputRuntime(multi),down=multi?r.handlers.window.pointerdown:r.handlers.canvas.pointerdown;
 for(const type of ['pen','mouse','touch']){const e=r.event(type);down(e);r.handlers.window.pointermove(e);r.handlers.window.pointerup(e);assert.deepEqual(r.read(),{picked:0,activated:0});assert.equal(e.prevented,undefined);assert.equal(e.stopped,undefined);}
 r.paint.active=false;down(r.event());assert.equal(r.read().activated,1,'ordinary activation returns after Paint exits');
});
test('1094 a queued touch tap cannot activate an object after entering Paint',()=>{
 const r=inputRuntime();r.paint.active=false;const e=r.event('touch');r.handlers.canvas.pointerdown(e);assert(r.c.touchTap);r.paint.active=true;r.handlers.window.pointerup(e);assert.equal(r.read().activated,0);assert.equal(r.c.touchTap,null);
});
test('1094 authoritative object activation also protects Outliner/API selection while Paint is active',()=>{
 const r=editableBooleanRuntime(),id=r.manager.activeId,other=r.manager.objects.find(o=>o.id!==id);r.c.__boxlabViewportPaint={active:true};assert.equal(r.manager.activate(other.id),false);assert.equal(r.manager.activeId,id);r.c.__boxlabViewportPaint.active=false;assert.equal(r.manager.activate(other.id),true);assert.equal(r.manager.activeId,other.id);
});
test('1094 each original bottom mode button closes Paint and permits its existing mode action',()=>{
 const s=fs.readFileSync(new URL('../src/viewport-paint.js',import.meta.url),'utf8'),line=s.split('\n').find(l=>l.startsWith("document.querySelectorAll('#selectionModes button')"));
 for(const mode of ['vertex','edge','face','object']){let active=true,closed=0,selected=null,listener;const button={addEventListener:(name,fn,capture)=>{assert.equal(name,'click');assert.equal(capture,true);listener=fn;}};const c={controller:{get active(){return active;}},close:()=>{closed++;active=false;},document:{querySelectorAll:()=>[button]}};vm.createContext(c);vm.runInContext(line,c);const e={preventDefault(){this.prevented=true;},stopImmediatePropagation(){this.stopped=true;}};listener(e);if(!e.prevented&&!e.stopped)selected=mode;assert.equal(active,false);assert.equal(closed,1);assert.equal(selected,mode);listener(e);assert.equal(closed,1);}
});
test('1094 original canvas selection/transform entry yields to Paint without swallowing finger navigation',()=>{
 const s=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8'),start=s.indexOf("canvas.addEventListener('pointerdown',event=>{if(event.pointerType==='mouse'"),end=s.indexOf(" if(globalThis.__boxlabDirectBevel",start);let listener;const c={canvas:{addEventListener:(_name,fn)=>listener=fn},__boxlabViewportPaint:{active:true},backgroundTap:null,backgroundSelectionTap:{},document:{querySelector:()=>null},entered:0};vm.createContext(c);vm.runInContext(s.slice(start,end)+'entered++;});',c);
 for(const pointerType of ['touch','pen','mouse']){const e={pointerType,button:0,preventDefault(){this.prevented=true;}};listener(e);assert.equal(c.entered,0);assert.equal(e.prevented,undefined);}
 c.__boxlabViewportPaint.active=false;listener({pointerType:'touch'});assert.equal(c.entered,1);
});
test('1094 delayed Object-mode restoration cannot click a mode button while Paint owns the session',()=>{
 const s=fs.readFileSync(new URL('../src/object-mode-retain.js',import.meta.url),'utf8');let clicks=0;const button={classList:{contains:()=>false},click:()=>clicks++},drawer={open:false},c={document:{querySelector:selector=>selector.includes('data-mode')?button:selector==='#objectsDrawer'?drawer:{},addEventListener(){}},window:{addEventListener(){}},queueMicrotask:fn=>fn(),requestAnimationFrame:fn=>fn(),__boxlabViewportPaint:{active:true}};vm.createContext(c);vm.runInContext(s,c);c.deferRestore();assert.equal(clicks,0);assert.equal(drawer.open,false);c.__boxlabViewportPaint.active=false;c.deferRestore();assert.equal(clicks,1);assert.equal(drawer.open,true);
});
