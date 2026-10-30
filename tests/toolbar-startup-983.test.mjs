import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const source=read('src/view-modes.js');
function fixture(seeded=true){
 const nodes=new Map(),styles=[],top={children:[],append(n){this.children.push(n);n.parentElement=this;}};
 class Node{
  constructor(tag,id){this.tagName=tag;this.id=id||'';this.dataset={};this.listeners={};this.children=[];this.attributes={};this._html='';}
  set innerHTML(s){this._html=s;this.replaced=(this.replaced||0)+1;}
  get innerHTML(){return this._html;}
  setAttribute(k,v){this.attributes[k]=v;}
  addEventListener(k,f){(this.listeners[k]||=[]).push(f);}
  querySelector(q){return q==='.viewport-menu-panel'&&this.id==='viewModes'&&this._html.includes('viewport-menu-panel')?this.panel:null;}
 }
 const doc={querySelector:q=>q==='.top-actions'?top:nodes.get(q)||null,createElement:tag=>new Node(tag),head:{append:n=>styles.push(n)}};
 if(seeded){for(const id of ['frameAllBtn','undoBtn','redoBtn','focusViewBtn','objectBrowserBtn','floorToggleBtn','viewModes']){const n=new Node(id==='viewModes'?'details':'button',id);nodes.set('#'+id,n);top.append(n);if(id==='viewModes'){n._html='<summary>VIEW</summary><div class="viewport-menu-panel"></div>';n.panel={original:true};}else {n.dataset.iconAction=id;n._html='<svg>original artwork</svg>';}}}
 let objects=0;const ctx={document:doc,topActions:top,activateObjectListFromView:()=>objects++};vm.createContext(ctx);vm.runInContext(source.slice(source.indexOf('function ensureUI(){'),source.indexOf('function modelBounds(')),ctx);
 return {nodes,styles,top,ctx,get objects(){return objects;}};
}
test('983 shell contains final ordered original toolbar and artwork before any module; accepted mode dock stays out of initial header flow',()=>{
 const shell=read('index.html'),top=shell.slice(shell.indexOf('<div class="top-actions">'),shell.indexOf('</header>'));
 const ids=[...top.matchAll(/id="(frameAllBtn|undoBtn|redoBtn|focusViewBtn|objectBrowserBtn|floorToggleBtn|viewModes)"/g)].map(m=>m[1]);
 assert.deepEqual(ids,['frameAllBtn','undoBtn','redoBtn','focusViewBtn','objectBrowserBtn','floorToggleBtn','viewModes']);
 for(const id of ids)assert.equal([...shell.matchAll(new RegExp('id="'+id+'"','g'))].length,1);
 assert.equal([...top.matchAll(/data-icon-action=/g)].length,6);assert.match(top,/id="focusViewBtn"[^>]*aria-pressed="true"/);assert.match(top,/viewport-menu-panel/);
 const css=read('viewport-toolbar-shell.css');assert.match(css,/\.topbar > #selectionModes\{display:none\}/);assert.match(css,/width:40px;min-width:40px/);assert.match(css,/width:24px;height:24px/);assert.doesNotMatch(css,/filter:|contain:|will-change:|transform:|animation:|visibility:/);
});
test('983 VIEW hydrates same shell nodes without replacing artwork/panel or reordering header; one Objects activation',()=>{
 const f=fixture(),before=[...f.top.children],panel=f.nodes.get('#viewModes').panel;
 assert.equal(f.ctx.ensureUI(),f.nodes.get('#viewModes'));f.ctx.ensureUI();
 assert.deepEqual(f.top.children,before);assert.equal(f.nodes.get('#viewModes').panel,panel);
 for(const n of before)assert.equal(n.replaced,undefined,'no shell child replacement');
 const b=f.nodes.get('#objectBrowserBtn');assert.equal(b.listeners.click.length,1);b.listeners.click[0]({preventDefault(){},stopPropagation(){}});assert.equal(f.objects,1);assert.equal(b.attributes['aria-controls'],'objectBrowserPanel');assert(f.styles.length>0);
 const legacy=fixture(false);legacy.ctx.ensureUI();assert.deepEqual(legacy.top.children.map(n=>n.id),['focusViewBtn','objectBrowserBtn','viewModes']);
});
test('983 original Frame All binds pre-existing shell button once and frames with original geometry/camera owner',()=>{
 const f=fixture(),camera=new THREE.PerspectiveCamera(42,1.5,.01,100),controls={target:new THREE.Vector3(),update(){this.calls=(this.calls||0)+1;}};camera.position.set(4,3,4);
 const mesh={vertices:[new THREE.Vector3(-2,-1,-3),new THREE.Vector3(2,1,3)]};const status={textContent:''};f.nodes.set('#selectionStatus',status);
 f.ctx.THREE=THREE;f.ctx.state=()=>({camera,controls,mesh});f.ctx.globalThis=f.ctx;
 const direct=read('src/direct-bevel.js');vm.runInContext(direct.slice(direct.indexOf('function installFrameAll(){'),direct.indexOf('\ninstallFrameAll();')),f.ctx);
 const before=[...f.top.children],b=f.nodes.get('#frameAllBtn');f.ctx.installFrameAll();f.ctx.installFrameAll();assert.deepEqual(f.top.children,before);assert.equal(b.listeners.click.length,1);assert.equal(b.replaced,undefined);
 b.listeners.click[0]();assert.equal(controls.calls,1);assert(controls.target.equals(new THREE.Vector3()));assert(camera.position.length()>6);assert.equal(status.textContent,'View framed to whole model');assert.equal(b.innerHTML,'<svg>original artwork</svg>');
});
