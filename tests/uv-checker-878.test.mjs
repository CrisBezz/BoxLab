import test from 'node:test';
import assert from 'node:assert/strict';
import {drawImportedUV,pickImportedUVIsland} from '../src/imported-uv-inspection.js';
import {createUVWorkspace} from '../src/uv-workspace.js';
const report=()=>({state:'ready',islandCount:1,faceIslands:[0],previewIslands:[0],previewFaces:[[[0,0],[1,0],[0,1]]],bounds:{minU:0,minV:0,maxU:1,maxV:1}});
function canvasContext(){
 const calls=[],ctx=Object.fromEntries(['clearRect','fillRect','strokeRect','beginPath','moveTo','lineTo','closePath','stroke','fill'].map(k=>[k,(...args)=>calls.push([k,...args,ctx.fillStyle])]));
 return {ctx,calls};
}
test('878 checker uses renderer projection at DPR/pan/zoom, bounded tile only, and keeps UV picking/arrays read-only',()=>{
 const r=report(),before=JSON.stringify(r);
 for(const ratio of [1,2]){
  const {ctx,calls}=canvasContext(),canvas={width:1000*ratio,height:600*ratio,getContext:()=>ctx},options={checker:true,center:true,padding:24*ratio,pixelRatio:ratio,view:{zoom:1.25,panX:20*ratio,panY:10*ratio}};
  assert(drawImportedUV(canvas,r,options));const cells=calls.filter(c=>c[0]==='fillRect'&&['#26384c','#1b2839'].includes(c.at(-1)));
  assert(cells.length>0&&cells.length<=256);for(const c of cells){assert(c.slice(1,5).every(Number.isFinite));assert(c[1]>=0&&c[2]>=0&&c[1]+c[3]<=canvas.width&&c[2]+c[4]<=canvas.height);}
  const outline=calls.find(c=>c[0]==='strokeRect');assert(Math.abs(outline[1]/ratio-175)<1e-9);assert(Math.abs(outline[3]/ratio-690)<1e-9);
  assert.equal(pickImportedUVIsland(canvas.width,canvas.height,r,{x:250*ratio,y:400*ratio},options),0);
  assert.equal(JSON.stringify(r),before);
  calls.length=0;drawImportedUV(canvas,r,{...options,checker:false});assert.equal(calls.filter(c=>c[0]==='fillRect').length,1);
 }
});
test('878 checker remains constant bounded work for extreme/tiled/offscreen/stale layouts and draws beneath selection/seams',()=>{
 for(const bounds of [{minU:-1.7e308,maxU:1.7e308,minV:-1.7e308,maxV:1.7e308},{minU:0,maxU:1e-300,minV:0,maxV:1e-300},{minU:-100,maxU:100,minV:-100,maxV:100}]){
  const {ctx,calls}=canvasContext();drawImportedUV({width:800,height:600,getContext:()=>ctx},{...report(),bounds},{checker:true,view:{zoom:32,panX:1e10,panY:-1e10}});assert(calls.filter(c=>c[0]==='fillRect').length<=257);assert(calls.filter(c=>c[0]==='fillRect').every(c=>c.slice(1,5).every(Number.isFinite)));
 }
 const {ctx,calls}=canvasContext(),canvas={width:800,height:600,getContext:()=>ctx},r={...report(),previewSeams:[[[0,0],[1,0]]],previewSeamIslands:[0]};
 drawImportedUV(canvas,r,{checker:true,selectedIsland:0,previewOffset:{u:.2,v:.1}});
 const lastCell=calls.findLastIndex(c=>c[0]==='fillRect');assert(lastCell<calls.findIndex(c=>c[0]==='strokeRect'));assert(calls.findIndex(c=>c[0]==='fill')>lastCell);
 calls.length=0;drawImportedUV(canvas,{...r,state:'stale'},{checker:true});assert.equal(calls.filter(c=>c[0]==='fillRect').length,1);
});
function node(){const fields=new Map(),events=new Map(),captures=new Set();return {hidden:false,style:{},attrs:{},append(){},appendChild(){},setAttribute(k,v){this.attrs[k]=v;},querySelector(k){if(!fields.has(k))fields.set(k,node());return fields.get(k);},addEventListener(k,fn){events.set(k,[...(events.get(k)||[]),fn]);},fire(k,e={}){for(const fn of events.get(k)||[])fn({button:0,cancelable:true,stopPropagation(){},preventDefault(){},...e});},getBoundingClientRect(){return {left:0,top:0,width:1000,height:600};},setPointerCapture:id=>captures.add(id),hasPointerCapture:id=>captures.has(id),releasePointerCapture:id=>captures.delete(id),captures};}
test('878 actual workspace checker is view-only, cancels pending Pencil, retains selection/view on refresh, resets on reopen',()=>{
 const keys=['document','window','ResizeObserver','devicePixelRatio','__boxlabUVWorkspace'],old=keys.map(k=>Object.getOwnPropertyDescriptor(globalThis,k)),root=node(),canvas=node(),{ctx,calls}=canvasContext();let first=true,edits=0,histories=0;
 globalThis.document={head:node(),querySelector:()=>node(),createElement:()=>first?(first=false,node()):root};globalThis.window={addEventListener(){},removeEventListener(){}};globalThis.ResizeObserver=undefined;globalThis.devicePixelRatio=2;canvas.getContext=()=>ctx;
 let api;try{
  api=createUVWorkspace({canvas,note:node(),controls:node(),onDone(){},onHistory(){histories++;},onTransform(){edits++;}});api.setReport(report(),'UVs');api.open();
  const checker=root.querySelector('[data-uv="checker"]'),fire=(name,x,y)=>canvas.fire(name,{pointerId:1,pointerType:'pen',clientX:x,clientY:y});
  assert.equal(checker.attrs['aria-pressed'],'false');fire('pointerdown',280,520);fire('pointerup',280,520);assert.equal(api.selectedIsland,0);
  root.querySelector('[data-uv="in"]').fire('click');const view=api.view;
  fire('pointerdown',280,520);fire('pointermove',350,520);checker.fire('click');fire('pointerup',350,520);
  assert.equal(edits,0);assert.equal(histories,0);assert.equal(canvas.captures.size,0);assert.equal(api.selectedIsland,0);assert.deepEqual(api.view,view);assert.equal(checker.attrs['aria-pressed'],'true');assert(calls.some(c=>c[0]==='fillRect'&&c.at(-1)==='#26384c'));
  api.setReport(report(),'UVs refreshed');assert.equal(checker.attrs['aria-pressed'],'true');assert.deepEqual(api.view,view);
  checker.fire('click');calls.length=0;root.querySelector('[data-uv="fit"]').fire('click');assert.equal(calls.filter(c=>c[0]==='fillRect').length,1);
  checker.fire('click');api.close();api.open();assert.equal(checker.attrs['aria-pressed'],'false');assert.equal(edits,0);assert.equal(histories,0);
 }finally{api?.close();keys.forEach((k,i)=>old[i]?Object.defineProperty(globalThis,k,old[i]):delete globalThis[k]);}
});
