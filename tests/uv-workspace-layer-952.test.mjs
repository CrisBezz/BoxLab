import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createUVWorkspace} from '../src/uv-workspace.js';
const ready={state:'ready',islandCount:1,faceIslands:[0],previewFaceIndices:[0],previewIslands:[0],previewFaces:[[[0,0],[1,0],[0,1]]],previewSeams:[],bounds:{minU:0,minV:0,maxU:1,maxV:1}};
function fixture(){
 const keys=['document','window','ResizeObserver','devicePixelRatio','__boxlabUVWorkspace'],old=keys.map(k=>Object.getOwnPropertyDescriptor(globalThis,k));
 const ctx=Object.fromEntries(['clearRect','fillRect','strokeRect','beginPath','moveTo','lineTo','closePath','stroke','fill'].map(k=>[k,()=>{}]));
 function node(){const fields=new Map(),listeners=new Map();return {hidden:false,children:[],parentElement:null,style:{},width:256,height:200,rect:{left:0,top:0,width:1340,height:590},setAttribute(k,v){this[k]=v;},append(...children){for(const n of children){if(n.parentElement){const a=n.parentElement.children;a.splice(a.indexOf(n),1);}n.parentElement=this;this.children.push(n);}},appendChild(n){this.append(n);return n;},querySelector(k){if(!fields.has(k)){const n=node();fields.set(k,n);this.append(n);}return fields.get(k);},getBoundingClientRect(){return this.rect;},getContext:()=>ctx,addEventListener(k,fn){if(!listeners.has(k))listeners.set(k,new Set());listeners.get(k).add(fn);},removeEventListener(k,fn){listeners.get(k)?.delete(fn);},fire(k,e={}){for(const fn of listeners.get(k)||[])fn({button:0,cancelable:true,stopPropagation(){},preventDefault(){},...e});},count:k=>listeners.get(k)?.size||0};}
 const app=node(),header=node(),viewport=node(),head=node(),canvas=node(),note=node(),controls=node(),original=node();app.append(header,viewport);controls.append(original);viewport.append(canvas,controls,note);
 let clicks=0,history=[];original.addEventListener('click',()=>clicks++);
 const frames=new Map();let next=0,disconnected=0;const visual=node(),win=node();win.visualViewport=visual;win.requestAnimationFrame=fn=>{frames.set(++next,fn);return next;};win.cancelAnimationFrame=id=>frames.delete(id);
 globalThis.document={head,querySelector:k=>k==='#viewportWrap'?viewport:null,createElement:node};globalThis.window=win;globalThis.devicePixelRatio=2;globalThis.ResizeObserver=class{observe(){}disconnect(){disconnected++;}};
 const api=createUVWorkspace({canvas,note,controls,onDone:()=>api.close(),onHistory:x=>history.push(x)}),root=app.children[2];
 return {app,header,viewport,root,canvas,note,controls,original,head,api,win,visual,frames,history,get clicks(){return clicks;},get disconnected(){return disconnected;},flush(){const jobs=[...frames.values()];frames.clear();jobs.forEach(fn=>fn());},restore(){api.close();keys.forEach((k,i)=>old[i]?Object.defineProperty(globalThis,k,old[i]):delete globalThis[k]);}};
}
test('952 real workspace sits beside viewport below original header, reuses controls and retains one root through repeated entry/exit',()=>{
 const f=fixture();try{
  assert.equal(f.root.parentElement,f.app);assert.deepEqual(f.app.children,[f.header,f.viewport,f.root]);assert(!f.viewport.children.includes(f.root));assert.equal(f.canvas.parentElement,f.root.querySelector('.uv-canvas-wrap'));assert.equal(f.controls.parentElement,f.root.querySelector('.uv-footer'));
  for(let i=0;i<12;i++){f.api.setReport(ready,'Cube');assert(f.api.open());assert.equal(f.root.hidden,false);assert.equal(f.win.count('resize'),1);assert.equal(f.visual.count('resize'),1);assert.equal(f.frames.size,1);f.flush();f.original.fire('click');f.root.querySelector('[data-uv="undo"]').fire('click');f.root.querySelector('[data-uv="redo"]').fire('click');f.root.querySelector('[data-uv="done"]').fire('click');assert.equal(f.api.active,false);assert.equal(f.root.hidden,true);assert.equal(f.frames.size,0);assert.equal(f.visual.count('resize'),0);assert.equal(f.win.count('resize'),0);assert.equal(f.win.count('keydown'),0);}
  assert.equal(f.clicks,12);assert.equal(f.history.length,24);assert.equal(f.app.children.length,3);assert.equal(f.disconnected,12);
 }finally{f.restore();}
});
test('952 deferred opening measurement and visual viewport resize use final CSS bounds/DPR with no history and cancel pending work on close',()=>{
 const f=fixture();try{
  f.api.setReport(ready,'Cube');assert(f.api.open());assert.equal(f.canvas.width,2680);f.canvas.rect.width=1000;f.canvas.rect.height=500;f.flush();assert.equal(f.canvas.width,2000);assert.equal(f.canvas.height,1000);
  f.canvas.rect.width=720;f.canvas.rect.height=320;f.visual.fire('resize');assert.equal(f.canvas.width,1440);assert.equal(f.canvas.height,640);assert.deepEqual(f.history,[]);
  f.api.close();f.api.open();const late=[...f.frames.values()][0];assert.equal(f.frames.size,1);f.api.close();assert.equal(f.frames.size,0);f.canvas.rect.width=400;late();assert.equal(f.canvas.width,1440);assert.deepEqual(f.history,[]);
 }finally{f.restore();}
});
test('952 CSS isolates only active UV layers, keeps header priority and places one reachable Back to 3D beside title with bounded scrolling canvas',()=>{
 const f=fixture();try{
  const css=f.head.children[0].textContent;assert.match(css,/#app:has\(> #boxlabUVWorkspace:not\(\[hidden\]\)\) > #viewportWrap/);assert.match(css,/#viewportWrap:has\(> #boxlabUVWorkspace:not\(\[hidden\]\)\)\{isolation:isolate\}/);assert.match(css,/#boxlabUVWorkspace\{position:fixed;top:calc\(var\(--boxlab-topbar-h/);assert.match(css,/z-index:9;isolation:isolate;overflow:auto/);assert.match(css,/\.uv-canvas-wrap\{flex:1 0 120px;min-height:120px;isolation:isolate;contain:paint/);assert.match(css,/canvas\{position:absolute;inset:0/);
  const html=f.root.innerHTML;assert.equal((html.match(/data-uv="done"/g)||[]).length,1);assert.match(html,/<strong class="uv-title">UV Editor<\/strong><button data-uv="done" type="button">Back to 3D<\/button>/);
  const shell=fs.readFileSync(new URL('../styles.css',import.meta.url),'utf8');assert.match(shell,/\.topbar\{[^}]*z-index:10/);
 }finally{f.restore();}
});
