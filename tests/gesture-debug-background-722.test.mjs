import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
function fixture(){
 class Node{
  constructor(){this.children=[];this.style={};this._text='';}
  set textContent(v){this._text=v;this.children=[];}get textContent(){return this._text;}
  append(...nodes){for(const n of nodes){n.parent=this;this.children.push(n);}}
  appendChild(n){this.append(n);}
  prepend(n){n.parent=this;this.children.unshift(n);}
  get lastElementChild(){return this.children.at(-1);}
  remove(){if(this.parent)this.parent.children=this.parent.children.filter(n=>n!==this);}
 }
 const root=new Node(),c={document:{createElement:()=>new Node(),body:root,addEventListener(){},querySelector:()=>null},window:{dispatchEvent(){}},localStorage:{getItem:()=>null,setItem(){}},CustomEvent:class{},queueMicrotask(){},Set};vm.createContext(c);vm.runInContext(fs.readFileSync(new URL('../src/gesture-debug.js',import.meta.url),'utf8'),c);c.__boxlabGestureDebug.enable();
 return {api:c.__boxlabGestureDebug,root,get summary(){return root.children[0].children[1];},get body(){return root.children[0].children[2];}};
}
test('Background decision remains pinned after unrelated logs and Pencil hover flood',()=>{
 const f=fixture();f.api.log('BACKGROUND DOUBLE TAP',{action:'clear',reason:'time',dt:710});f.api.log('BACKGROUND TAP COMPLETE',{result:'clear'});
 for(let i=0;i<1500;i++){f.api.log('PEN HOVER SWALLOW',{type:'pointermove'});f.api.log('PEN ORBIT MOVE FORWARD',{});f.api.log('ORBIT RELEASE EARLY WINDOW',{pointer:'pen'});}
 assert.equal(f.summary.children.length,2);assert.match(f.summary.children[1].textContent,/reason=time dt=710/);assert.equal(f.body.children.length,12);assert.ok(f.body.children.every(n=>!n.textContent.includes('HOVER SWALLOW')));
});
test('Pinned history is bounded and clear/disable/re-enable cannot show stale evidence',()=>{
 const f=fixture();for(let i=0;i<20;i++)f.api.log('BACKGROUND TAP DOWN',{pid:i});assert.equal(f.summary.children.length,6);assert.match(f.summary.children[0].textContent,/pid=19/);f.api.clear();assert.equal(f.summary.children.length,0);assert.match(f.summary.textContent,/waiting for test/);f.api.disable();assert.equal(f.root.children.length,0);f.api.enable();assert.equal(f.summary.children.length,0);
});
test('Quiet stage filtering retains actual contact and ownership diagnostics',()=>{
 const f=fixture();f.api.log('PEN ORBIT ROUTE',{route:'FORWARD_ORBIT'});f.api.log('RAW POINTERDOWN',{pressure:.5});assert.ok(f.body.children.some(n=>n.textContent.includes('PEN ORBIT ROUTE')));assert.ok(f.body.children.some(n=>n.textContent.includes('pressure=0.5')));
});
