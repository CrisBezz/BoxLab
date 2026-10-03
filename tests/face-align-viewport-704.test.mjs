import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import * as core from '../src/component-align-core.js';
import {analyzeMeshHealth} from '../src/mesh-health-core.js';
import {History} from '../src/history.js';

function fixture(){
  const fields=new Map(),handlers=new Map(),calls=[],events=[];
  let mode='face',ids=[0,1],axis=null,disabled=false,locked=false;
  const el=()=>({style:{},dataset:{},hidden:true,textContent:'',listeners:{},classList:{toggle(){}},appendChild(){},setAttribute(){},addEventListener(t,f){this.listeners[t]=f;},querySelector(s){if(!fields.has(s))fields.set(s,el());return fields.get(s);},querySelectorAll(){return axes;}});
  const axes=['x','y','z','face'].map(a=>Object.assign(el(),{dataset:{axis:a}}));
  const target={get disabled(){return disabled;}},host=el();
  const emit=e=>{events.push(e);handlers.get(e.type)?.(e);};
  const context={placeToolSessionPanel:p=>Object.assign(p.style,{top:'12px',left:'50%'}),document:{createElement:el,head:el(),querySelector:s=>s==='#viewportWrap'?host:s==='#app'?{classList:{contains:()=>locked}}:target},window:{addEventListener:(t,f)=>handlers.set(t,f),dispatchEvent:emit},CustomEvent:class{constructor(type,{detail}){Object.assign(this,{type,detail});}},queueMicrotask:f=>f(),requestAnimationFrame:()=>1,cancelAnimationFrame(){},__boxlabBridgeState:{mesh:{}},__boxlabSelectionBridge:{mode:()=>mode,indices:()=>ids},__boxlabComponentAlign:{sync(){},axis:()=>axis,arm(a){calls.push(['arm',a]);axis=a===axis?null:a;emit({type:'boxlab-component-align-change',detail:{axis}});},disarm(){calls.push('disarm');axis=null;emit({type:'boxlab-component-align-change',detail:{axis:null}});}}};
  vm.runInNewContext(fs.readFileSync(new URL('../src/face-align-viewport.js',import.meta.url),'utf8').replace(/^import .*;\n/,''),context);
  return{api:context.__boxlabFaceAlignViewportSession,context,calls,events,axes,fields,emit,handlers,setMode:m=>{mode=m;},setIds:i=>{ids=i;},setDisabled:d=>{disabled=d;},setLocked:l=>{locked=l;},clickAxis:a=>axes.find(b=>b.dataset.axis===a).listeners.click({preventDefault(){},stopPropagation(){}}),cancel:()=>fields.get('.fa-cancel').listeners.click({preventDefault(){},stopPropagation(){}})};
}
test('Align opens top-centre settings without auto-arming; axes delegate to current owner',()=>{
  const f=fixture();assert.equal(f.api.openFromHub(),true);assert.equal(f.calls.length,0);
  assert.equal(f.api.element.style.left,'50%');f.clickAxis('z');assert.deepEqual(f.calls,[['arm','z']]);
  assert.match(f.fields.get('.fa-instruction').textContent,/Align Z/);
});
test('Cancel disarms once and emits shared completion, keeping selection',()=>{
  const f=fixture();f.api.openFromHub();f.clickAxis('x');f.cancel();f.cancel();
  assert.equal(f.calls.filter(c=>c==='disarm').length,1);assert.equal(f.api.active(),false);
  assert.equal(f.events.filter(e=>e.type==='boxlab-selection-hub-session-complete').length,1);
  assert.deepEqual(f.context.__boxlabSelectionBridge.indices(),[0,1]);
});
test('owner completion closes panel and returns hub without re-disarming or re-applying',()=>{
  const f=fixture();f.api.openFromHub();f.clickAxis('y');
  f.emit({type:'boxlab-component-align-change',detail:{axis:null,reason:'apply'}});
  assert.equal(f.api.active(),false);assert.equal(f.calls.length,1);
  assert.equal(f.events.at(-1).detail.tool,'Align');
});
test('context changes and selection loss close settings before another anchor can apply',()=>{
  for(const change of [f=>f.setMode('vertex'),f=>f.setIds([]),f=>{f.context.__boxlabBridgeState.mesh={};},f=>f.setLocked(true)]){
    const f=fixture();f.api.openFromHub();change(f);f.clickAxis('x');
    assert.equal(f.api.active(),false);assert.equal(f.calls.filter(c=>Array.isArray(c)).length,0);
  }
});
test('disabled Align cannot launch; another tool ends settings without resetting its hub',()=>{
  const f=fixture();f.setDisabled(true);assert.equal(f.api.openFromHub(),false);
  f.setDisabled(false);f.api.openFromHub();f.events.length=0;
  f.handlers.get('boxlab-selection-hub-tool')({detail:{mode:'face',tool:'Sweep'}});
  assert.equal(f.api.active(),false);assert.equal(f.events.filter(e=>e.type==='boxlab-selection-hub-session-complete').length,0);
});

function ownerFixture(){
  const events=[],histories=[],handlers=new Map();
  const el=()=>({style:{setProperty(){},removeProperty(){}},dataset:{},children:[],append(...els){this.children.push(...els);},appendChild(e){this.children.push(e);},remove(){},setAttribute(){},addEventListener(){},dispatchEvent(){},querySelector(){return null;},querySelectorAll(){return this.children.filter(c=>c.dataset.alignAxis);}});
  const m=new EditableMesh([[0,0,0],[1,0,0],[0,1,0],[3,0,0],[4,0,0],[3,1,0]],[[0,1,2],[3,4,5]]);
  const context={...core,analyzeMeshHealth,THREE,document:{createElement:el,body:el(),querySelector:()=>el(),addEventListener(){}},window:{addEventListener:(t,f)=>handlers.set(t,f),dispatchEvent:e=>events.push(e)},CustomEvent:class{constructor(type,{detail}){Object.assign(this,{type,detail});}},Event:class{},setTimeout(){},clearTimeout(){},queueMicrotask:f=>f(),__boxlabBridgeState:{mesh:m},__boxlabHistory:{push:before=>histories.push(before)},__boxlabSelectionBridge:{mode:()=> 'face',indices:()=>[0,1],set(){}}};
  const source=fs.readFileSync(new URL('../src/component-align.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,'');
  vm.runInNewContext(source,context);
  return{api:context.__boxlabComponentAlign,m,events,histories,context};
}
test('actual Align owner keeps anchor vertices fixed, commits once and emits semantic completion',()=>{
  const f=ownerFixture(),before=f.m.vertices.map(v=>v.clone());
  assert.equal(f.api.arm('x'),true);assert.equal(f.api.axis(),'x');
  assert.equal(f.api.applyAnchor(0,{clientX:100,clientY:100}),true);
  for(const i of [0,1,2])assert.deepEqual(f.m.vertices[i],before[i]);
  for(const i of [3,4,5]){assert.equal(f.m.vertices[i].x,1/3);assert.equal(f.m.vertices[i].y,before[i].y);}
  assert.equal(f.histories.length,1);assert.equal(f.api.isArmed(),false);
  assert.equal(f.events.at(-1).detail.reason,'apply');assert.equal(f.events.at(-1).detail.axis,null);
});

test('Align to Face panel delegates the new option and retains owner rejection feedback',()=>{
  const f=fixture();f.api.openFromHub();f.clickAxis('face');
  assert.deepEqual(f.calls,[['arm','face']]);assert.match(f.fields.get('.fa-instruction').textContent,/planar group/);
  f.emit({type:'boxlab-component-align-change',detail:{axis:'face',reason:'reject',message:'Bent groups are not flattened'}});
  f.api.sync();assert.equal(f.api.active(),true);assert.match(f.fields.get('.fa-instruction').textContent,/Bent groups/);
  f.cancel();assert.equal(f.api.active(),false);
});
test('actual Face-plane owner commits once; gate rejection preserves geometry/history',()=>{
  for(const reject of [false,true]){
    const f=ownerFixture();
    f.m.vertices[3].set(3,0,2);f.m.vertices[4].set(3,1,2);f.m.vertices[5].set(3,0,3);
    const before=f.m.clone();
    f.context.__boxlabTopologyGate={validate:m=>({valid:!reject||m===f.m})};
    f.api.arm('face');
    const result=f.api.applyAnchor(0,{clientX:100,clientY:100});
    assert.equal(result,!reject);assert.equal(f.histories.length,reject?0:1);
    for(const i of [0,1,2])assert.deepEqual(f.m.vertices[i],before.vertices[i]);
    if(reject){assert.deepEqual(f.m.vertices,before.vertices);assert.equal(f.api.axis(),'face');assert.equal(f.events.at(-1).detail.reason,'reject');}
    else for(const i of [3,4,5])assert.ok(Math.abs(f.m.vertices[i].z)<1e-7);
  }
});
test('already coplanar Face-plane completion adds no history',()=>{
  const f=ownerFixture();f.api.arm('face');assert.equal(f.api.applyAnchor(0,{clientX:0,clientY:0}),true);
  assert.equal(f.histories.length,0);assert.equal(f.api.isArmed(),false);
});
test('Face-plane operation restores exact geometry through one Undo and Redo',()=>{
  const f=ownerFixture();f.m.vertices[3].set(3,0,2);f.m.vertices[4].set(3,1,2);f.m.vertices[5].set(3,0,3);
  const history=new History(),before=f.m.clone();f.context.__boxlabHistory=history;
  f.api.arm('face');f.api.applyAnchor(0,{clientX:0,clientY:0});const after=f.m.clone();
  assert.equal(history.undoStack.length,1);
  const undone=history.undo(f.m);assert.deepEqual(undone.vertices,before.vertices);assert.deepEqual(undone.faces,before.faces);
  const redone=history.redo(undone);assert.deepEqual(redone.vertices,after.vertices);assert.deepEqual(redone.faces,after.faces);
});
test('Face-plane collapse of opposite cube Faces rejects before history',()=>{
  const f=ownerFixture(),cube=EditableMesh.cube(),before=cube.clone();
  f.context.__boxlabBridgeState.mesh=cube;f.context.__boxlabSelectionBridge.indices=()=>[0,1];
  f.api.arm('face');assert.equal(f.api.applyAnchor(0,{clientX:0,clientY:0}),false);
  assert.equal(f.histories.length,0);assert.deepEqual(cube.vertices,before.vertices);
  assert.equal(f.events.at(-1).detail.reason,'reject');
});
