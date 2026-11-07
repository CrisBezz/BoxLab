import fs from 'node:fs';
import vm from 'node:vm';

// Shared existing .722 whole-debug-owner fixture; controlled DOM/storage/events.
export function gestureDebugRuntime({canvas=null,fileMenu=null}={}){
 class Node{
  constructor(){this.children=[];this.style={};this._text='';}
  set textContent(v){this._text=v;this.children=[];}get textContent(){return this._text;}
  append(...nodes){for(const n of nodes){n.parent=this;this.children.push(n);}}
  appendChild(n){this.append(n);}
  setAttribute(name,value){(this.attributes??={})[name]=String(value);}
  getAttribute(name){return this.attributes?.[name]??null;}
  prepend(n){n.parent=this;this.children.unshift(n);}
  get lastElementChild(){return this.children.at(-1);}
  remove(){if(this.parent)this.parent.children=this.parent.children.filter(n=>n!==this);}
 }
 const events=new Map();const root=new Node(),c={document:{createElement:()=>new Node(),body:root,addEventListener(){},querySelector:q=>q==='#viewport'?canvas:q==='#fileMenu .top-file-content'||q==='#fileMenu'?fileMenu:null,elementFromPoint:()=>null,elementsFromPoint:()=>[]},window:{dispatchEvent(){},addEventListener(type,fn,options){const prior=events.get(type);events.set(type,{fn:prior?e=>{prior.fn(e);fn(e);}:fn,options:prior?.options?.capture?prior.options:options});}},localStorage:{getItem:()=>null,setItem(){}},CustomEvent:class{},queueMicrotask(){},Set,performance:{now:()=>100},innerWidth:1000,innerHeight:700,devicePixelRatio:2,Date};vm.createContext(c);vm.runInContext(fs.readFileSync(new URL('../../src/gesture-debug.js',import.meta.url),'utf8'),c);c.__boxlabGestureDebug.enable();
 return {c,api:c.__boxlabGestureDebug,root,events,get summary(){return root.children[0].children[2];},get body(){return root.children[0].children[3];}};
}
