import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {createEditableBooleanController,editableBooleanEligibility,recordBooleanRecipe,booleanMeshSignature} from '../src/editable-boolean-core.js';
import {editableBooleanRuntime} from './helpers/editable-boolean-runtime.mjs';
import {createLiveBooleanPreview} from '../src/live-boolean-preview.js';
function ui({sourceEdit=s=>s}={}){
 const r=editableBooleanRuntime(),c=r.c,nodes=new Map(),tasks=[],events=[],timers=new Map();let timerId=0;
 function node(id=''){
  const listeners=new Map(),classes=new Set(),n={id,dataset:{},hidden:false,style:{},children:[],classList:{toggle(k,on){on?classes.add(k):classes.delete(k);}},
   appendChild(child){this.children.push(child);},contains(child){return child===this||this.children.includes(child);},
   addEventListener(type,fn){if(!listeners.has(type))listeners.set(type,[]);listeners.get(type).push(fn);},
   dispatchEvent(event){event.target??=this;for(const fn of listeners.get(event.type)||[])fn(event);},
   querySelector(selector){return nodes.get(selector)||null;},querySelectorAll(selector){return [...nodes.values()].filter(x=>selector==='[data-edit-source]'?x.dataset.editSource:selector==='[data-edit-operation]'?x.dataset.editOperation:selector==='[data-edit-view]'?x.dataset.editView:false);}};
  n.click=()=>n.dispatchEvent({type:'click'});if(id)nodes.set('#'+id,n);return n;
 }
 const parent=node(),status=node('selectionStatus'),launch=node('booleanLaunchBtn'),cage=node('cageToggle'),doc=node(),win=node();
 doc.head=node();doc.createElement=tag=>{if(tag==='style')return node();const panel=node('editableBooleanPanel');Object.defineProperty(panel,'innerHTML',{set(){for(const id of ['editableBooleanNote','editableBooleanCancel','editableBooleanApply'])panel.appendChild(node(id));for(const [key,attr,values] of [['source','editSource',['a','b']],['operation','editOperation',['union','difference','intersection']],['view','editView',['result','sources']]])for(const value of values){const button=node();button.dataset[attr]=value;nodes.set(`[data-edit-${key}="${value}"]`,button);panel.appendChild(button);}}});return panel;};
 doc.querySelector=selector=>selector==='[data-mode-tools="object"]'?parent:nodes.get(selector)||null;
 const radial=node();nodes.set('.tg-tool-ring[data-ring-mode="object"] [data-tool-target="#booleanLaunchBtn"]',radial);
 const modeButton=node();modeButton.dataset.mode='object';let modeClicks=0;
 modeButton.closest=selector=>selector.includes('#selectionModes button')?modeButton:null;
 modeButton.click=()=>{assert.ok(++modeClicks<30,'activation mode clicks must not recursively Cancel');doc.dispatchEvent({type:'click',target:modeButton});};
 const query=doc.querySelector;doc.querySelector=selector=>selector==='#selectionModes button.active'?modeButton:query(selector);
 // Actual manager activation clears selection by clicking the current mode.
 const multi=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');vm.runInContext(multi.slice(multi.indexOf('function clearComponentSelection()'),multi.indexOf('function enterObjectMode()')),c);
 const scene=new THREE.Scene();c.__boxlabBridgeState.scene=scene;
 Object.assign(c,{document:doc,window:win,queueMicrotask:fn=>tasks.push(fn),createEditableBooleanController,editableBooleanEligibility,recordBooleanRecipe,booleanMeshSignature,createLiveBooleanPreview:options=>createLiveBooleanPreview({...options,setTimer:fn=>{timers.set(++timerId,fn);return timerId;},clearTimer:id=>timers.delete(id)}),
  setTimeout:fn=>{timers.set(++timerId,fn);return timerId;},clearTimeout:id=>timers.delete(id),
  Event:class{constructor(type){this.type=type;}},CustomEvent:class{constructor(type,options){this.type=type;this.detail=options?.detail;}},
  __boxlabSelectionBridge:{mode:()=> 'object'},__boxlabBooleanPrototype:{buildResult:c.buildResult},__boxlabBooleanToolSession:{close(){}},
  __boxlabObjectSelection:{single(id){c.selectedIds=new Set([id]);c.multiEnabled=false;}},__boxlabToolSession:{begin(value){events.push(value);},end(id){events.push({end:id});}}});
 let current=null;Object.assign(c.__boxlabToolSession,{current:()=>current,begin(value){current=value;events.push(value);},end(id){if(current?.id===id)current=null;events.push({end:id});}});
 const source=fs.readFileSync(new URL('../src/editable-boolean.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,'');vm.runInContext('(function(){'+sourceEdit(source)+'})()',c);
 function flush(){let i=0;while(tasks.length){assert.ok(i++<30,'bounded UI synchronization');tasks.shift()();}}
 function tick(){for(const [id,fn] of [...timers]){timers.delete(id);fn();flush();}}
 flush();return{r,c,nodes,doc,win,scene,events,flush,tick,timers,api:c.__boxlabEditableBoolean};
}
test('798 whole UI opens shared source session, draws real guides/preview and disposes on Apply',()=>{
 const u=ui();assert.equal(u.nodes.get('#booleanLaunchBtn').textContent,'Edit Boolean');assert.equal(u.api.open(),true);u.flush();
 assert.equal(u.events.at(-1).id,'boolean-edit');assert.equal(u.nodes.get('#editableBooleanPanel').hidden,false);assert.equal(u.scene.children.length,1);
 u.nodes.get('[data-edit-source="b"]').click();u.r.move(new THREE.Vector3(.08,.03,.01));u.flush();u.tick();
 assert.equal(u.scene.children[0].children.length,1);assert.match(u.nodes.get('#editableBooleanNote').textContent,/Live preview updated/);
 u.nodes.get('#editableBooleanApply').click();u.flush();assert.equal(u.api.active(),false);assert.equal(u.scene.children.length,0);assert.equal(u.nodes.get('#editableBooleanPanel').hidden,true);assert.equal(u.r.manager.activeId,4);
});
test('798 whole UI Escape and conflicting action cancel source transaction',()=>{
 const u=ui(),before=u.r.snapshot();u.api.open();u.r.move(new THREE.Vector3(.1,0,0));u.flush();
 let prevented=false;u.win.dispatchEvent({type:'keydown',key:'Escape',target:{closest(){return null;}},preventDefault(){prevented=true;},stopImmediatePropagation(){}});u.flush();assert.equal(prevented,true);assert.deepEqual(u.r.snapshot(),before);assert.equal(u.scene.children.length,0);
 u.api.open();u.r.move(new THREE.Vector3(0,.1,0));u.doc.dispatchEvent({type:'click',target:{closest(){return {};}}});u.flush();assert.deepEqual(u.r.snapshot(),before);assert.equal(u.api.active(),false);
});

test('799 actual Object radial launches Edit Boolean without premature completion; cancellation and background exit restore scene',()=>{
 const u=ui(),before=u.r.snapshot();
 for(const file of ['object-radial-session.js','tool-background-exit.js'])vm.runInContext('(function(){'+fs.readFileSync(new URL('../src/'+file,import.meta.url),'utf8')+'})()',u.c);
 const radial=u.c.__boxlabObjectRadialSession;
 assert.equal(radial.available('Edit Boolean'),true);
 assert.equal(u.nodes.get('.tg-tool-ring[data-ring-mode="object"] [data-tool-target="#booleanLaunchBtn"]').textContent,'Edit Boolean');
 assert.equal(radial.launch('Edit Boolean'),true);u.flush();assert.equal(u.c.__boxlabToolSession.current().id,'boolean-edit');assert.equal(radial.hidesGizmo(),false);
 u.r.move(new THREE.Vector3(.1,0,0));assert.equal(u.c.__boxlabToolBackgroundExit.active(),true);
 u.win.dispatchEvent({type:'boxlab-viewport-background-tap'});u.flush();assert.equal(u.api.active(),false);assert.equal(u.c.__boxlabToolSession.current(),null);assert.deepEqual(u.r.snapshot(),before);assert.equal(u.scene.children.length,0);
 radial.launch('Edit Boolean');u.r.move(new THREE.Vector3(0,.1,0));assert.equal(radial.cancelCurrent(),true);u.flush();assert.deepEqual(u.r.snapshot(),before);
});
test('799 actual UI Cancel button exits, including after a refused preview',()=>{
 const u=ui(),before=u.r.snapshot();u.api.open();u.nodes.get('[data-edit-source="b"]').click();u.r.move(new THREE.Vector3(30,0,0));u.nodes.get('[data-edit-operation="intersection"]').click();assert.equal(u.api.update().ok,false);
 u.nodes.get('#editableBooleanCancel').click();u.flush();assert.equal(u.api.active(),false);assert.equal(u.c.__boxlabToolSession.current(),null);assert.equal(u.nodes.get('#editableBooleanPanel').hidden,true);assert.deepEqual(u.r.snapshot(),before);
});

test('801 actual activation mode-button click keeps edit open; A/B switch, Apply and Cancel exit without recursion',()=>{
 const u=ui(),before=u.r.snapshot();assert.equal(u.api.open(),true);u.flush();assert.equal(u.api.active(),true);assert.equal(u.r.manager.activeId,1);
 u.nodes.get('[data-edit-source="b"]').click();u.flush();assert.equal(u.api.active(),true);assert.equal(u.r.manager.activeId,2);assert.equal(u.scene.children[0].children.length,1);
 u.r.move(new THREE.Vector3(.08,.03,.01));u.nodes.get('#editableBooleanCancel').click();u.flush();assert.deepEqual(u.r.snapshot(),before);assert.equal(u.c.__boxlabToolSession.current(),null);
 u.api.open();u.nodes.get('[data-edit-source="b"]').click();u.r.move(new THREE.Vector3(.08,.03,.01));assert.equal(u.api.apply().ok,true);u.flush();assert.equal(u.api.active(),false);assert.equal(u.r.manager.activeId,4);
});

test('801 regression rejects old capture guard with actual activation click (previous stub missed this)',()=>{
 const u=ui({sourceEdit:s=>s.replace(/  const nextMode=[\s\S]*?if\(nextMode&&nextMode!==mode\(\)\|\|event.target\?\.closest\?\.\('#outlinerAddBtn/,"  if(event.target?.closest?.('#selectionModes button,#outlinerAddBtn")});
 assert.throws(()=>u.api.open(),/Cannot read properties of null.*undo/);
});

test('801 Cancel closes an orphaned edit host even when its transaction already ended',()=>{
 const u=ui(),before=u.r.snapshot(),panel=u.nodes.get('#editableBooleanPanel');panel.hidden=false;u.c.__boxlabToolSession.begin({id:'boolean-edit',node:panel});
 assert.equal(u.api.cancel(),true);assert.equal(panel.hidden,true);assert.equal(u.c.__boxlabToolSession.current(),null);assert.deepEqual(u.r.snapshot(),before);
});

test('803 whole UI automatically previews latest A/B geometry and operation without Update',()=>{
 const u=ui();let solves=0;const solve=u.c.__boxlabBooleanPrototype.buildResult;u.c.__boxlabBooleanPrototype.buildResult=(...args)=>{solves++;return solve(...args);};
 u.api.open();u.flush();u.tick();assert.equal(solves,1);assert.equal(u.scene.children[0].children.length,1);
 u.nodes.get('[data-edit-source="b"]').click();u.flush();
 for(let i=0;i<5;i++){u.r.move(new THREE.Vector3(.01,.003,0));u.win.dispatchEvent({type:'boxlab-bridge-state'});u.flush();}
 assert.equal(u.timers.size,1);const undo=[...u.r.h.undoStack];u.tick();assert.equal(solves,2);assert.match(u.nodes.get('#editableBooleanNote').textContent,/Live preview updated/);
 assert.deepEqual(u.r.h.undoStack,undo);const preview=u.api.state().preview;
 u.nodes.get('[data-edit-operation="union"]').click();u.flush();u.tick();assert.equal(solves,3);assert.notEqual(u.api.state().preview,preview);
 u.api.apply();u.flush();assert.equal(u.api.active(),false);assert.equal(u.timers.size,0);assert.equal(u.r.h.undoStack.length,2);
});

test('803 automatic failed preview retains last valid result, retries after change, and Cancel clears pending work',()=>{
 const u=ui(),before=u.r.snapshot();u.api.open();u.flush();u.tick();const preview=u.api.state().preview;
 u.nodes.get('[data-edit-source="b"]').click();u.r.move(new THREE.Vector3(30,0,0));u.nodes.get('[data-edit-operation="intersection"]').click();u.flush();u.tick();
 assert.equal(u.api.state().preview,preview);assert.match(u.nodes.get('#editableBooleanNote').textContent,/last valid result retained/);
 for(let i=0;i<4;i++){u.win.dispatchEvent({type:'boxlab-bridge-state'});u.flush();}assert.equal(u.timers.size,0);
 u.r.move(new THREE.Vector3(-30,.03,.01));u.win.dispatchEvent({type:'boxlab-transform-end'});u.flush();assert.equal(u.timers.size,1);u.tick();assert.notEqual(u.api.state().preview,preview);
 u.r.move(new THREE.Vector3(.01,0,0));u.win.dispatchEvent({type:'boxlab-bridge-state'});u.flush();assert.equal(u.timers.size,1);u.api.cancel();u.flush();u.tick();assert.deepEqual(u.r.snapshot(),before);assert.equal(u.scene.children.length,0);
});

test('803 UI reads unsaved live Rotate/Scale geometry during gizmo drag; idle events do not solve again',()=>{
 const u=ui();u.api.open();u.flush();u.tick();u.nodes.get('[data-edit-source="b"]').click();u.flush();
 const old=u.api.state().previewSignature,undo=[...u.r.h.undoStack];u.nodes.set('#totalGizmo',{dataset:{dragging:'true'}});
 const q=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),.12);u.r.live.vertices.forEach(v=>v.applyQuaternion(q).multiplyScalar(1.04));
 u.win.dispatchEvent({type:'boxlab-bridge-state'});u.flush();u.tick();assert.notEqual(u.api.state().previewSignature,old);assert.deepEqual(u.r.h.undoStack,undo);assert.equal(u.api.apply().ok,false);
 for(let i=0;i<3;i++){u.win.dispatchEvent({type:'boxlab-bridge-state'});u.flush();}assert.equal(u.timers.size,0);
 u.nodes.get('#totalGizmo').dataset.dragging='false';u.api.cancel();u.flush();assert.equal(u.timers.size,0);
});

test('804 Result/Sources presentation is exclusive; original result is displayed until first live preview',()=>{
 const u=ui(),before=u.r.snapshot();u.api.open();u.flush();assert.equal(u.api.view(),'result');
 assert.equal(u.scene.children[0].children.length,1);assert.equal(u.scene.children[0].children[0].isMesh,true);assert.equal(u.scene.children[0].children[0].material.transparent,false);
 const undo=[...u.r.h.undoStack];u.nodes.get('[data-edit-view="sources"]').click();u.flush();assert.equal(u.api.view(),'sources');assert.equal(u.scene.children[0].children.length,2);assert.ok(u.scene.children[0].children.every(o=>o.isLineSegments));
 u.tick();assert.ok(u.scene.children[0].children.every(o=>o.isLineSegments));u.nodes.get('[data-edit-view="result"]').click();u.flush();assert.equal(u.scene.children[0].children.length,1);assert.deepEqual(u.r.h.undoStack,undo);
 u.api.cancel();u.flush();assert.deepEqual(u.r.snapshot(),before);assert.equal(u.scene.children.length,0);
});

test('804 actual native render owner hides A/B bodies and cage only in Result; Sources and exit restore Solo policy',()=>{
 const u=ui(),c=u.c,source=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8'),baseAdd=THREE.Group.prototype.add,installed=THREE.Group.prototype.__boxlabMultiObjectInstalled;
 const section=(a,b)=>source.slice(source.indexOf(a),source.indexOf(b,source.indexOf(a)));
 Object.assign(c,{inactiveLayer:null,inactiveBodies:[],activeRoot:null,activeBody:null,soloId:4,queueOutliner(){}});
 vm.runInContext(section('function activeShouldShow()','function syncLiveLinkedFromSource(').split('function displayMeshFor(')[0],c);
 c.displayMeshFor=o=>o.mesh;
 vm.runInContext((section('function ensureInactiveLayer()','function installUI()')).replace(/\bobjects\b/g,'sceneObjects').replace(/\bactiveId\b/g,'sceneActiveId'),c);
 try{
  c.installRenderObserver();u.api.open();u.flush();u.tick();
  const root=new THREE.Group(),body=()=>{const b=new THREE.Mesh(u.r.live.triangulatedGeometry(),new THREE.MeshStandardMaterial());b.userData.kind='body';return b;};
  const resultBody=body();root.add(resultBody);assert.equal(resultBody.visible,false);assert.equal(c.inactiveBodies.length,0);
  const edge=new THREE.LineSegments();edge.userData.kind='edge';root.add(edge);assert.equal(edge.visible,false);
  u.nodes.get('[data-edit-view="sources"]').click();u.flush();const sourceBody=body();root.add(sourceBody);assert.equal(sourceBody.visible,true);assert.equal(c.inactiveBodies.length,1);assert.equal(c.inactiveBodies[0].userData.objectId,2);
  u.api.cancel();u.flush();const restored=body();root.add(restored);assert.equal(restored.visible,true);assert.equal(c.inactiveBodies.length,0);assert.equal(c.soloId,4);
 }finally{THREE.Group.prototype.add=baseAdd;if(installed===undefined)delete THREE.Group.prototype.__boxlabMultiObjectInstalled;else THREE.Group.prototype.__boxlabMultiObjectInstalled=installed;}
});
