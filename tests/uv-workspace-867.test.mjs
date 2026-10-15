import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createUVNavigation} from '../src/uv-navigation.js';
import {createUVWorkspace} from '../src/uv-workspace.js';
import {drawImportedUV} from '../src/imported-uv-inspection.js';
const report=()=>({state:'ready',bounds:{minU:0,minV:0,maxU:1,maxV:1},previewFaces:[[[0,0],[1,0],[1,1]]],previewIslands:[0],previewSeams:[]});
function context2D(){const calls=[];return {calls,...Object.fromEntries(['clearRect','fillRect','strokeRect','beginPath','moveTo','lineTo','closePath','stroke'].map(k=>[k,(...v)=>calls.push([k,...v])]))};}
test('867 UV navigation pans without jumps, pinches around contact midpoint and keeps wheel zoom anchored and bounded',()=>{
 const nav=createUVNavigation({size:()=>({width:1000,height:700})});nav.down(1,100,100,'pen');nav.move(1,160,130);assert.deepEqual(nav.view,{zoom:1,panX:60,panY:30});nav.up(1);nav.fit();
 nav.down(1,400,300);nav.down(2,600,300);nav.move(1,300,320);nav.move(2,700,320);assert.equal(nav.view.zoom,2);assert.equal(nav.view.panX,0);assert.equal(nav.view.panY,70);
 nav.up(1);nav.move(2,720,340);assert.deepEqual(nav.view,{zoom:2,panX:20,panY:90});nav.up(2);
 const p={x:700,y:200},world={x:(p.x-500-nav.view.panX)/nav.view.zoom,y:(p.y-350-nav.view.panY)/nav.view.zoom};nav.zoomAt(p,1.5);assert.equal(world.x*nav.view.zoom+500+nav.view.panX,p.x);assert.equal(world.y*nav.view.zoom+350+nav.view.panY,p.y);
 nav.zoomAt(p,1e9);assert.equal(nav.view.zoom,100);nav.zoomAt(p,1e-9);assert.equal(nav.view.zoom,.1);const before={...nav.view};nav.zoomAt(p,NaN);assert.deepEqual(nav.view,before);nav.fit();assert.deepEqual(nav.view,{zoom:1,panX:0,panY:0});
});
test('867 two/three-finger taps delegate native history, while pan/pinch/long/pen/cancel contacts cannot become history taps',()=>{
 let time=0,undos=0,redos=0;const n=createUVNavigation({size:()=>({width:800,height:600}),undo:()=>undos++,redo:()=>redos++,now:()=>time});
 n.down(1,0,0);n.down(2,100,0);n.up(1);n.up(2);assert.equal(undos,1);
 for(let i=1;i<=3;i++)n.down(i,i*100,0);for(let i=1;i<=3;i++)n.up(i);assert.equal(redos,1);
 n.down(1,0,0);n.down(2,100,0);n.move(2,150,0);n.up(1);n.up(2);assert.equal(undos,1);
 n.down(1,0,0);n.down(2,100,0);time=400;n.up(1);n.up(2);assert.equal(undos,1);
 n.down(1,0,0,'pen');n.down(2,100,0);n.up(1);n.up(2);assert.equal(undos,1);
 n.down(1,0,0);n.down(2,100,0);n.cancel();n.up(1);n.up(2);assert.equal(undos,1);
});
test('867 shared UV renderer supports centred large-canvas navigation and pixel ratio without changing report or legacy fit',()=>{
 const r=report(),before=JSON.stringify(r),ctx=context2D(),canvas={width:1000,height:600,getContext:()=>ctx};drawImportedUV(canvas,r,{center:true,padding:24,pixelRatio:2,view:{zoom:2,panX:10,panY:-20}});
 const tile=ctx.calls.find(c=>c[0]==='strokeRect');assert.deepEqual(tile,['strokeRect',-42,-272,1104,1104]);assert.equal(JSON.stringify(r),before);
});
function browserFixture(){
 const originals=new Map(['document','window','devicePixelRatio','ResizeObserver','__boxlabUVWorkspace'].map(k=>[k,Object.getOwnPropertyDescriptor(globalThis,k)]));const nodes=[],winEvents=new Map(),ctx=context2D();let observed=0,disconnected=0;
 function node(){const listeners=new Map(),children=[],n={style:{},hidden:false,children,parentElement:null,rect:{left:0,top:0,width:1000,height:600},setAttribute(k,v){this[k]=v;},append(...items){for(const child of items){if(child.parentElement){const old=child.parentElement.children;old.splice(old.indexOf(child),1);}child.parentElement=this;children.push(child);}},appendChild(child){this.append(child);return child;},querySelector(selector){this.fields??=new Map();if(!this.fields.has(selector)){const child=node();this.fields.set(selector,child);this.append(child);}return this.fields.get(selector);},getBoundingClientRect(){return this.rect;},addEventListener(k,fn){if(!listeners.has(k))listeners.set(k,[]);listeners.get(k).push(fn);},fire(k,event={}){const e={cancelable:true,button:0,stopPropagation(){},preventDefault(){},...event};for(const fn of listeners.get(k)||[])fn(e);}};nodes.push(n);return n;}
 const viewport=node(),head=node(),canvas=node(),note=node(),controls=node(),button=node();controls.append(button);let originalClicks=0;button.addEventListener('click',()=>originalClicks++);
 const captures=new Set();Object.assign(canvas,{width:256,height:200,getContext:()=>ctx,setPointerCapture:id=>captures.add(id),hasPointerCapture:id=>captures.has(id),releasePointerCapture(id){captures.delete(id);canvas.fire('lostpointercapture',{pointerId:id});}});
 globalThis.document={head,createElement:node,querySelector:s=>s==='#viewportWrap'?viewport:null};globalThis.window={addEventListener(k,fn){if(!winEvents.has(k))winEvents.set(k,new Set());winEvents.get(k).add(fn);},removeEventListener(k,fn){winEvents.get(k)?.delete(fn);}};globalThis.devicePixelRatio=2;globalThis.ResizeObserver=class{observe(){observed++;}disconnect(){disconnected++;}};
 const restore=()=>{for(const [k,descriptor] of originals)descriptor?Object.defineProperty(globalThis,k,descriptor):delete globalThis[k];};
 return {viewport,canvas,note,controls,button,ctx,captures,winEvents,restore,get originalClicks(){return originalClicks;},get observed(){return observed;},get disconnected(){return disconnected;}};
}
test('867 actual workspace moves original nodes, sizes canvas, scopes navigation/history, handles capture transitions and closes cleanly',()=>{
 const f=browserFixture();try{
  const history=[];let done=0;const api=createUVWorkspace({canvas:f.canvas,note:f.note,controls:f.controls,onDone:()=>done++,onHistory:x=>history.push(x)}),root=f.viewport.children[0];api.setReport(report(),'UV quad · 1 island');assert.equal(api.open(),true);assert.equal(api.active,true);assert.equal(f.canvas.width,2000);assert.equal(f.canvas.height,1200);assert.equal(f.observed,1);assert.equal(f.canvas.parentElement,root.querySelector('.uv-canvas-wrap'));assert.equal(f.controls.parentElement,root.querySelector('.uv-footer'));
  f.button.fire('click');assert.equal(f.originalClicks,1);
  f.canvas.fire('pointerdown',{pointerId:1,pointerType:'touch',clientX:400,clientY:300});f.canvas.fire('pointerdown',{pointerId:2,pointerType:'touch',clientX:600,clientY:300});f.canvas.fire('pointermove',{pointerId:2,clientX:700,clientY:300});f.canvas.fire('pointerup',{pointerId:1});const before={...api.view};f.canvas.fire('pointermove',{pointerId:2,clientX:720,clientY:320});assert.equal(api.view.panX,before.panX+20);assert.equal(api.view.panY,before.panY+20);f.canvas.fire('pointerup',{pointerId:2});assert.deepEqual(history,[]);
  root.querySelector('[data-uv="fit"]').fire('click');assert.deepEqual(api.view,{zoom:1,panX:0,panY:0});root.querySelector('[data-uv="in"]').fire('click');assert.equal(api.view.zoom,1.25);root.querySelector('[data-uv="undo"]').fire('click');root.querySelector('[data-uv="redo"]').fire('click');assert.deepEqual(history,['undo','redo']);
  f.canvas.fire('pointerdown',{pointerId:3,pointerType:'pen',clientX:100,clientY:100});f.canvas.fire('pointerdown',{pointerId:4,pointerType:'touch',clientX:600,clientY:300});assert.equal(f.captures.has(4),false);f.canvas.fire('pointermove',{pointerId:3,clientX:130,clientY:120});assert.equal(api.view.panX,30);
  f.canvas.rect={left:0,top:0,width:600,height:400};for(const fn of f.winEvents.get('resize'))fn();assert.equal(f.canvas.width,1200);assert.equal(f.canvas.height,800);root.querySelector('[data-uv="done"]').fire('click');assert.equal(done,1);api.close();assert.equal(api.active,false);assert.equal(root.hidden,true);assert.equal(f.captures.size,0);assert.equal(f.disconnected,1);assert.equal(f.winEvents.get('resize').size,0);assert.equal(f.winEvents.get('keydown').size,0);
  api.setReport(report(),'UV quad');assert(api.open());api.close();assert.equal(f.viewport.children.length,1);
 }finally{f.restore();}
});
test('867 Mesh Health opens one workspace with original controls and native Undo/Redo/session exit owners',()=>{
 const source=fs.readFileSync(new URL('../src/mesh-health.js',import.meta.url),'utf8'),controls={},canvas={},note={},panel={hidden:false};let options,refreshes=0,undo=0,redo=0,ends=0;
 const workspace={active:false,setReport(){},open(){this.active=true;return true;},close(){this.active=false;}};
 const c={active:true,objectId:1,uvWorkspace:null,uvPreview:canvas,uvNote:note,uvRotate:{parentElement:controls},panel,activeObject:()=>({id:1}),currentMode:()=> 'object',createUVWorkspace:o=>(options=o,workspace),renderReport:()=>refreshes++,document:{querySelector:s=>({click:()=>s==='#undoBtn'?undo++:redo++})},queueMicrotask:fn=>fn(),toolSession:()=>({end:id=>{assert.equal(id,'mesh-health');ends++;}}),setStatus(){}};
 vm.createContext(c);vm.runInContext(source.slice(source.indexOf('function openUVEditor(){'),source.indexOf("uvOpen.addEventListener"))+source.slice(source.indexOf('function close(){'),source.indexOf('function launch(){')),c);
 assert.equal(c.openUVEditor(),true);assert.equal(panel.hidden,true);assert.equal(options.canvas,canvas);assert.equal(options.controls,controls);options.onHistory('undo');options.onHistory('redo');assert.equal(undo,1);assert.equal(redo,1);assert.equal(refreshes,3);options.onDone();assert.equal(workspace.active,false);assert.equal(c.active,false);assert.equal(ends,1);assert.equal(c.openUVEditor(),false);
});
test('867 both actual Delete keyboard owners yield to active UV workspace and retain normal 3D deletion outside it',()=>{
 const router=fs.readFileSync(new URL('../src/delete-key-router.js',import.meta.url),'utf8'),manager=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');let deletes=0;const handlers=[];
 const c={__boxlabUVWorkspace:{active:true},__boxlabSelectionBridge:{mode:()=> 'object'},window:{addEventListener:(_type,fn)=>handlers.push(fn)},document:{querySelector:()=>({disabled:false,click:()=>deletes++})},currentMode:()=> 'object',deleteButton:{disabled:false,click:()=>deletes++}};vm.createContext(c);vm.runInContext(router,c);vm.runInContext(manager.slice(manager.indexOf("  window.addEventListener('keydown', event => {"),manager.indexOf('  globalThis.__boxlabObjectManager =')),c);
 const event=()=>({key:'Delete',target:{matches:()=>false,closest:()=>null},preventDefault(){},stopPropagation(){},stopImmediatePropagation(){}});handlers.forEach(fn=>fn(event()));assert.equal(deletes,0);c.__boxlabUVWorkspace.active=false;handlers.forEach(fn=>fn(event()));assert.equal(deletes,2);
});
