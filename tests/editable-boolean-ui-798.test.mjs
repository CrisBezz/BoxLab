import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {createEditableBooleanController,editableBooleanEligibility,recordBooleanRecipe,booleanMeshSignature} from '../src/editable-boolean-core.js';
import {editableBooleanRuntime} from './helpers/editable-boolean-runtime.mjs';
function ui(){
 const r=editableBooleanRuntime(),c=r.c,nodes=new Map(),tasks=[],events=[];
 function node(id=''){
  const listeners=new Map(),classes=new Set(),n={id,dataset:{},hidden:false,style:{},children:[],classList:{toggle(k,on){on?classes.add(k):classes.delete(k);}},
   appendChild(child){this.children.push(child);},contains(child){return child===this||this.children.includes(child);},
   addEventListener(type,fn){if(!listeners.has(type))listeners.set(type,[]);listeners.get(type).push(fn);},
   dispatchEvent(event){event.target??=this;for(const fn of listeners.get(event.type)||[])fn(event);},
   querySelector(selector){return nodes.get(selector)||null;},querySelectorAll(selector){return [...nodes.values()].filter(x=>selector==='[data-edit-source]'?x.dataset.editSource:selector==='[data-edit-operation]'?x.dataset.editOperation:false);}};
  n.click=()=>n.dispatchEvent({type:'click'});if(id)nodes.set('#'+id,n);return n;
 }
 const parent=node(),status=node('selectionStatus'),launch=node('booleanLaunchBtn'),cage=node('cageToggle'),doc=node(),win=node();
 doc.createElement=()=>{const panel=node('editableBooleanPanel');Object.defineProperty(panel,'innerHTML',{set(){for(const id of ['editableBooleanNote','editableBooleanUpdate','editableBooleanCancel','editableBooleanApply'])panel.appendChild(node(id));for(const [key,attr,values] of [['source','editSource',['a','b']],['operation','editOperation',['union','difference','intersection']]])for(const value of values){const button=node();button.dataset[attr]=value;nodes.set(`[data-edit-${key}="${value}"]`,button);panel.appendChild(button);}}});return panel;};
 doc.querySelector=selector=>selector==='[data-mode-tools="object"]'?parent:nodes.get(selector)||null;
 const radial=node();nodes.set('.tg-tool-ring[data-ring-mode="object"] [data-tool-target="#booleanLaunchBtn"]',radial);
 const scene=new THREE.Scene();c.__boxlabBridgeState.scene=scene;
 Object.assign(c,{document:doc,window:win,queueMicrotask:fn=>tasks.push(fn),createEditableBooleanController,editableBooleanEligibility,recordBooleanRecipe,booleanMeshSignature,
  Event:class{constructor(type){this.type=type;}},CustomEvent:class{constructor(type,options){this.type=type;this.detail=options?.detail;}},
  __boxlabSelectionBridge:{mode:()=> 'object'},__boxlabBooleanPrototype:{buildResult:c.buildResult},__boxlabBooleanToolSession:{close(){}},
  __boxlabObjectSelection:{single(id){c.selectedIds=new Set([id]);c.multiEnabled=false;}},__boxlabToolSession:{begin(value){events.push(value);},end(id){events.push({end:id});}}});
 let current=null;Object.assign(c.__boxlabToolSession,{current:()=>current,begin(value){current=value;events.push(value);},end(id){if(current?.id===id)current=null;events.push({end:id});}});
 const source=fs.readFileSync(new URL('../src/editable-boolean.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,'');vm.runInContext('(function(){'+source+'})()',c);
 function flush(){let i=0;while(tasks.length){assert.ok(i++<30,'bounded UI synchronization');tasks.shift()();}}
 flush();return{r,c,nodes,doc,win,scene,events,flush,api:c.__boxlabEditableBoolean};
}
test('798 whole UI opens shared source session, draws real guides/preview and disposes on Apply',()=>{
 const u=ui();assert.equal(u.nodes.get('#booleanLaunchBtn').textContent,'Edit Boolean');assert.equal(u.api.open(),true);u.flush();
 assert.equal(u.events.at(-1).id,'boolean-edit');assert.equal(u.nodes.get('#editableBooleanPanel').hidden,false);assert.equal(u.scene.children.length,1);
 u.nodes.get('[data-edit-source="b"]').click();u.r.move(new THREE.Vector3(.08,.03,.01));u.nodes.get('#editableBooleanUpdate').click();u.flush();
 assert.equal(u.scene.children[0].children.length,3);assert.match(u.nodes.get('#editableBooleanNote').textContent,/Preview updated/);
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
