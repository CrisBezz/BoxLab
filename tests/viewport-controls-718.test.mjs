import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createBackgroundSelectionTap} from '../src/background-selection-tap.js';
import {gizmoIcons} from '../src/gizmo-corner-controls.js';
const read=n=>fs.readFileSync(new URL('../src/'+n,import.meta.url),'utf8');
test('Double background tap inverts original selection after immediate single-tap clear',()=>{
 let time=0,ids=[1,3];const mesh={};const owner=createBackgroundSelectionTap({now:()=>time});const options={context:'face',mesh,read:()=>[...ids],clear:()=>ids=[],invert:seed=>ids=[0,1,2,3].filter(x=>!seed.includes(x))};
 assert.equal(owner.tap({clientX:10,clientY:20},options),'clear');assert.deepEqual(ids,[]);time=150;assert.equal(owner.tap({clientX:12,clientY:21},options),'invert');assert.deepEqual(ids,[0,2]);
});
test('Context, mesh, selection changes, time expiry and distant taps cannot invert stale selections',()=>{
 for(const change of ['mode','mesh','selection','time','distance']){let time=0,ids=[1],inversions=0;const owner=createBackgroundSelectionTap({now:()=>time});const options={context:'face',mesh:{},read:()=>[...ids],clear:()=>ids=[],invert:()=>inversions++};owner.tap({clientX:0,clientY:0},options);time=100;if(change==='mode')options.context='edge';if(change==='mesh')options.mesh={};if(change==='selection')ids=[2];if(change==='time')time=600;owner.tap({clientX:change==='distance'?100:0,clientY:0},options);assert.equal(inversions,0,change);}
});
test('Existing Object owner activates Multi before transform consumers and preserves touch cleanup',()=>{
 const s=read('multi-object.js'),a=s.indexOf('function installViewportActivation('),b=s.indexOf('\nfunction ensureInactiveLayer',a),handlers={window:{},canvas:{}};const canvas={addEventListener:(t,f)=>handlers.canvas[t]=f};let hit={id:2,inactive:true},activated=0,taps=0,time=0;
 const c={canvas,window:{addEventListener:(t,f)=>handlers.window[t]=f,dispatchEvent:e=>{if(e.type==='boxlab-pencil-background-tap')taps++;}},__boxlabObjectSelection:{multi:true},pickViewportObject:()=>hit,currentMode:()=> 'object',handleViewportActivation:(e,stop)=>{activated++;if(stop)e.stopImmediatePropagation();},touchTap:null,TOUCH_TAP_MOVE_PX:8,performance:{now:()=>time},CustomEvent:class{constructor(type){this.type=type;}}};vm.createContext(c);vm.runInContext(s.slice(a,b)+'\ninstallViewportActivation();',c);
 const e={target:canvas,pointerType:'pen',pointerId:1,isPrimary:true,clientX:0,clientY:0,stopImmediatePropagation(){this.stopped=true;}};handlers.window.pointerdown(e);assert.equal(activated,1);assert.equal(e.stopped,true);handlers.canvas.pointerdown(e);assert.equal(activated,1);
 hit=null;handlers.window.pointerdown({...e,stopped:false});time=100;handlers.window.pointerup(e);assert.equal(taps,1);
 handlers.window.pointerdown(e);handlers.window.pointermove({...e,clientX:50});handlers.window.pointerup(e);assert.equal(taps,1,'navigation is not a confirmed tap');
 c.__boxlabLasso={isArmed:()=>true};hit={id:2,inactive:true};handlers.window.pointerdown(e);assert.equal(activated,1,'armed Lasso retains its gesture');c.__boxlabLasso=null;
 hit={id:2,inactive:true};handlers.window.pointerdown({...e,pointerType:'touch'});handlers.window.pointerup({...e,pointerType:'touch'});assert.equal(activated,2);assert.equal(c.touchTap,null);
});
test('Original Snap inputs and lazy Lasso button move into viewport; toolbar icons share gizmo source',()=>{
 const nodes=new Map(),observers=[];
 class N{constructor(tag){this.tag=tag;this.children=[];this.dataset={};this.listeners={};this.attrs={};}append(...ns){for(const n of ns){if(n.parentElement)n.parentElement.children=n.parentElement.children.filter(x=>x!==n);this.children.push(n);n.parentElement=this;}}setAttribute(k,v){this.attrs[k]=v;}closest(){return this.parentElement;}querySelector(){return this.children.find(n=>n.tag==='span');}addEventListener(t,f){this.listeners[t]=f;}}
 const doc={querySelector:s=>nodes.get(s),createElement:t=>new N(t),body:new N('body'),head:new N('head')};const add=(id,tag='button')=>{const n=new N(tag);nodes.set('#'+id,n);return n;};add('viewportWrap','div');add('selectionModes','div');
 for(const id of ['axisSnapToggle','inferenceSnapToggle']){const input=add(id,'input'),label=new N('label');label.append(input,new N('span'));input.addEventListener('change',()=>{});}
 const depth=add('paintSelectDepth','div'),visible=new N('button'),through=new N('button');let depthClicks=0;depth.append(visible,through);visible.addEventListener('click',()=>depthClicks++);through.addEventListener('click',()=>depthClicks++);
 for(const id of ['undoBtn','redoBtn','frameAllBtn','focusViewBtn'])add(id).addEventListener('click',()=>{});
 const ctx={gizmoIcons,MutationObserver:class{constructor(fn){observers.push(fn);}observe(){}},document:doc};vm.createContext(ctx);vm.runInContext(read('viewport-toolbar-controls.js').replace(/^import[^\n]+\n/,'').replace('export function','function')+'\ninstallViewportToolbarControls();',ctx);const bar=nodes.get('#viewportWrap').children[0];assert.equal(bar.id,'viewportSelectionControls');for(const id of ['axisSnapToggle','inferenceSnapToggle'])assert.equal(nodes.get('#'+id).parentElement.parentElement,bar);
 assert.notEqual(depth.parentElement,bar);assert.equal(depth.hidden,true);assert.equal(depth.attrs['aria-hidden'],'true');assert.equal(depth.children[0],visible);assert.equal(depth.children[1],through);visible.listeners.click();through.listeners.click();assert.equal(depthClicks,2,'original depth button listeners retained');assert.match(read('viewport-toolbar-controls.js'),/#paintSelectDepth\{display:none!important\}/);
 const lasso=add('lassoSelectBtn');lasso.addEventListener('click',()=>{});observers[0]();assert.equal(lasso.parentElement,bar);assert.ok(lasso.listeners.click);assert.equal(nodes.get('#undoBtn').innerHTML,'<svg viewBox="0 0 24 24" aria-hidden="true">'+gizmoIcons.undo+'</svg>');assert.ok(nodes.get('#focusViewBtn').listeners.click);assert.equal(nodes.get('#focusViewBtn').attrs['aria-label'],'Focus view');
});
test('Object invert lives in authoritative owner; component invert accepts original tap seed',()=>{
 const s=read('object-management.js');const start=s.indexOf('invert(seed=');const end=s.indexOf(',get wholeGroupId',start);let selectedIds=new Set([1]),multiEnabled=false;const c={selectedIds,multiEnabled,objects:()=>[{id:1,visible:true},{id:2,visible:true},{id:3,visible:false}],updateUI(){}};vm.createContext(c);vm.runInContext('const api={'+s.slice(start,end)+'};api.invert([1]);',c);assert.deepEqual([...c.selectedIds],[2]);assert.equal(c.multiEnabled,true);assert.match(read('selection-set-polish.js'),/function invert\(seed=selected\(\)\)/);
});
