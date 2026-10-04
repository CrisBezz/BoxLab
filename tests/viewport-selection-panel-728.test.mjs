import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {placeToolSessionPanel} from '../src/tool-session-panel-position.js';
const read=n=>fs.readFileSync(new URL('../src/'+n,import.meta.url),'utf8');
function fixture(){
 const nodes=new Map(),events={},windowEvents={};
 class Node{
  constructor(){this.children=[];this.style={};this.attrs={};this.listeners={};this.classes=new Set();this.dataset={};this.classList={add:x=>this.classes.add(x),remove:x=>this.classes.delete(x),contains:x=>this.classes.has(x),toggle:(x,on)=>on?this.classes.add(x):this.classes.delete(x)};}
  set id(v){this._id=v;nodes.set('#'+v,this);}get id(){return this._id;}
  append(...ns){for(const n of ns){if(n.parentElement)n.parentElement.children=n.parentElement.children.filter(x=>x!==n);n.parentElement=this;this.children.push(n);}}
  appendChild(n){this.append(n);}
  setAttribute(k,v){this.attrs[k]=v;}
  addEventListener(type,fn){(this.listeners[type]??=[]).push(fn);}
  click(){for(const fn of this.listeners.click||[])fn({});}
  querySelector(q){for(const n of this.children){if(q.split(',').includes('#'+n.id)||n.className&&q.split(',').includes('.'+n.className))return n;const found=n.querySelector(q);if(found)return found;}return null;}
  querySelectorAll(){return [];}
 }
 const make=id=>{const n=new Node();n.id=id;return n;};
 const wrap=make('viewportWrap'),bar=make('viewportSelectionControls'),drawer=make('selectionDrawer'),component=make('componentSelectionTools'),canvas=make('viewport'),title=new Node();title.className='always-selection-title';drawer.append(title,component);wrap.append(canvas,bar);const left=make('left');left.append(drawer);wrap.append(left);
 const doc={querySelector:q=>q==='#selectionDrawer .always-selection-title'?title:nodes.get(q),querySelectorAll:()=>[],createElement:()=>new Node(),head:new Node(),addEventListener:(t,f)=>events[t]=f};
 const c={document:doc,window:{addEventListener:(t,f)=>windowEvents[t]=f},placeToolSessionPanel,Set,setTimeout:fn=>fn(),queueMicrotask:fn=>fn()};vm.createContext(c);
 const install=()=>{vm.runInContext(read('viewport-selection-panel.js').replace(/^import[^\n]+\n/,'').replace('export function','function'),c);return vm.runInContext('installViewportSelectionPanel()',c);};
 return {c,doc,nodes,events,windowEvents,make,drawer,component,wrap,bar,left,canvas,install};
}
test('Selection popout retains original host, late Object toolbar, IDs and original button listeners',()=>{
 const f=fixture(),grow=f.make('growSelectionBtn');f.component.append(grow);let calls=0;grow.addEventListener('click',()=>calls++);
 const api=f.install();assert.equal(api.drawer,f.drawer);assert.equal(f.drawer.parentElement,api.panel);assert.equal(api.panel.parentElement,f.wrap);assert.equal(f.left.children.length,0);grow.click();assert.equal(calls,1);
 const toolbar=f.make('objectManagementTools');f.drawer.append(toolbar);assert.equal(f.doc.querySelector('#selectionDrawer').querySelector('#objectManagementTools'),toolbar);
 assert.equal(api.panel.style.left,'50%');assert.equal(api.panel.style.top,'12px');assert.equal(f.install(),null,'one panel only');
});
test('Original component grow/connected owners still act through moved controls',()=>{
 const f=fixture();for(const id of ['growSelectionBtn','shrinkSelectionBtn','connectedSelectionBtn','angleSelectionBtn','normalSelectionBtn','angleSelectThreshold','angleSelectThresholdOut'])f.component.append(f.make(id));
 let ids=[0];f.c.__boxlabSelectionBridge={mode:()=> 'vertex',indices:()=>ids,set:(mode,x)=>ids=[...x]};f.c.__boxlabBridgeState={mesh:{vertices:[{}, {}, {}],edges:()=>[{a:0,b:1},{a:1,b:2}]}};
 vm.runInContext(read('advanced-selection.js'),f.c);const api=f.install();api.toggle();f.nodes.get('#growSelectionBtn').click();assert.deepEqual(ids,[0,1]);f.nodes.get('#connectedSelectionBtn').click();assert.deepEqual(ids,[0,1,2]);
});
test('Original Object layout remains contextual after host moves out of drawer',()=>{
 const f=fixture(),toolbar=f.make('objectManagementTools');f.drawer.append(toolbar);f.c.document.querySelector=(q)=>q.includes('button.active')?{dataset:{mode:'object'}}:q==='#selectionDrawer .always-selection-title'?f.drawer.children[0]:f.nodes.get(q);
 vm.runInContext(read('object-selection-layout.js'),f.c);f.install();f.c.__boxlabObjectSelectionLayout.sync();assert.equal(f.drawer.classList.contains('object-selection-active'),true);assert.equal(f.component.attrs['aria-hidden'],'true');assert.equal(f.c.__boxlabObjectSelectionLayout.toolbar(),toolbar);
});
test('Selection toggle, close, background/Escape and active-session guard leave gesture owners alone',()=>{
 const f=fixture(),api=f.install();assert.equal(api.panel.hidden,true);api.button.click();assert.equal(api.panel.hidden,false);assert.equal(api.button.attrs['aria-expanded'],'true');
 f.events.pointerdown({target:f.canvas,preventDefault(){throw Error('must not consume');}});assert.equal(api.panel.hidden,true);
 api.toggle();f.events.keydown({key:'Escape'});assert.equal(api.panel.hidden,true);api.toggle();f.windowEvents['boxlab-tool-session-change']({detail:{active:true}});assert.equal(api.panel.hidden,true);
 f.c.__boxlabToolSession={isActive:()=>true};assert.equal(api.toggle(),false);assert.equal(api.panel.hidden,true);
});
