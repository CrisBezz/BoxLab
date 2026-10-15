import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../src/mesh.js';
import {inspectImportedUV,drawImportedUV,importedUVScreenDelta} from '../src/imported-uv-inspection.js';
import {createUVWorkspace} from '../src/uv-workspace.js';
import {moveImportedUV} from '../src/imported-uv-edit.js';
import {editableBooleanRuntime} from './helpers/editable-boolean-runtime.mjs';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
const exporter=glbOwnerRuntime(),signature=m=>exporter.c.topologySignature(m);
function fixture(){
 const r=editableBooleanRuntime();r.manager.activate(3);
 r.manager.replaceActiveMesh(new EditableMesh([[0,0,0],[1,0,0],[0,1,0],[2,0,0],[3,0,0],[2,1,0]],[[0,1,2],[3,4,5]]));
 const object=r.manager.objects.find(o=>o.id===3),payload={version:1,source:'glb',uvTopologySignature:signature(r.live),uvCorners:[[[0,0],[.4,0],[0,.4]],[[.6,.6],[1,.6],[.6,1]]],images:[{data:new Uint8Array([1,2,3])}]};
 object.glbPassthrough=payload;r.manager.objects.find(o=>o.id===2).glbPassthrough=payload;
 return {...r,object,payload,owner:r.c.__boxlabObjectHistory};
}
function node(){
 const fields=new Map(),events=new Map(),captures=new Set();
 return {hidden:false,style:{},append(){},appendChild(){},setAttribute(){},querySelector(k){if(!fields.has(k))fields.set(k,node());return fields.get(k);},addEventListener(k,fn){if(!events.has(k))events.set(k,[]);events.get(k).push(fn);},fire(k,e={}){for(const fn of events.get(k)||[])fn({button:0,cancelable:true,stopPropagation(){},preventDefault(){},...e});},getBoundingClientRect(){return {left:10,top:20,width:1000,height:600};},setPointerCapture(id){captures.add(id);},hasPointerCapture:id=>captures.has(id),releasePointerCapture(id){captures.delete(id);this.fire('lostpointercapture',{pointerId:id});},captures};
}
function harness(run){
 const keys=['document','window','ResizeObserver','devicePixelRatio','__boxlabUVWorkspace'],old=keys.map(k=>Object.getOwnPropertyDescriptor(globalThis,k)),root=node(),canvas=node(),events=new Map(),paths=[];
 let first=true;globalThis.document={head:node(),querySelector:()=>node(),createElement:()=>first?(first=false,node()):root};globalThis.window={addEventListener(k,fn){events.set(k,fn);},removeEventListener(){}};globalThis.ResizeObserver=undefined;globalThis.devicePixelRatio=2;
 const ctx=Object.fromEntries(['clearRect','fillRect','strokeRect','beginPath','moveTo','lineTo','closePath','stroke','fill'].map(k=>[k,(...p)=>paths.push([k,...p])]));canvas.getContext=()=>ctx;
 const r=fixture(),calls=[],history=[],base=r.h.undoStack.length;let editable=true,api;
 const refresh=()=>api.setReport(inspectImportedUV(r.live,r.object.glbPassthrough,signature),'UVs');
 const context=()=>({object:r.object,mesh:r.live,payload:r.object.glbPassthrough});
 api=createUVWorkspace({canvas,note:node(),controls:node(),canEdit:()=>editable,getTransformContext:context,onDone:()=>api.close(),onHistory:kind=>history.push(kind),onTransform:(kind,u,v,expected)=>{
  calls.push({kind,u,v,expected});if(expected&&(expected.object!==r.object||expected.mesh!==r.live||expected.payload!==r.object.glbPassthrough))return false;
  const result=moveImportedUV(r.object,r.live,signature,r.owner,u,v,{island:api.selectedIsland,payload:r.object.glbPassthrough});refresh();if(result.selectedFaces)api.retainSelection(result.selectedFaces);return result.ok;
 }});refresh();api.open();
 const fire=(name,x,y,id=1,type='pen')=>canvas.fire(name,{pointerId:id,pointerType:type,clientX:x+10,clientY:y+20});
 const tap=(x=280,y=520)=>{fire('pointerdown',x,y);fire('pointerup',x,y);};
 try{run({r,api,root,canvas,events,paths,calls,history,base,refresh,fire,tap,setEditable:v=>editable=v});}finally{api.close();keys.forEach((k,i)=>old[i]?Object.defineProperty(globalThis,k,old[i]):delete globalThis[k]);}
}
const near=(a,b)=>assert(Math.abs(a-b)<1e-12,`${a} != ${b}`);
test('871 Pencil stroke previews only, commits once through native Move/history, keeps mapping and peers then UndoRedo',()=>harness(({r,api,root,canvas,paths,calls,base,fire,tap})=>{
 tap();assert.equal(api.selectedIsland,0);const before=JSON.stringify(r.payload),view=api.view;paths.length=0;
 fire('pointerdown',280,520);for(let i=1;i<=20;i++)fire('pointermove',280+i*5.52,520-i*2.76);
 assert.equal(r.object.glbPassthrough,r.payload);assert.equal(r.h.undoStack.length,base);assert.equal(calls.length,0);assert.deepEqual(api.view,view);assert(paths.some(p=>p[0]==='moveTo'&&p[1]>600));
 fire('pointerup',390.4,464.8);assert.equal(calls.length,1);near(calls[0].u,.2);near(calls[0].v,.1);assert.equal(r.h.undoStack.length,base+1);assert.equal(api.selectedIsland,0);assert.equal(canvas.captures.size,0);
 const next=r.object.glbPassthrough;near(next.uvCorners[0][0][0],.2);near(next.uvCorners[0][0][1],.1);assert.equal(next.uvCorners[1],r.payload.uvCorners[1]);assert.equal(next.images,r.payload.images);assert.equal(JSON.stringify(r.payload),before);assert.equal(r.manager.objects.find(o=>o.id===2).glbPassthrough,r.payload);
 // Continue at the moved island: same scale and cursor mapping, no auto-fit jump.
 fire('pointerdown',390.4,464.8);fire('pointermove',445.6,464.8);fire('pointerup',445.6,464.8);assert.equal(calls.length,2);near(calls[1].u,.1);assert.equal(r.h.undoStack.length,base+2);
 r.manager.replaceActiveMesh(r.h.undo(r.live));assert.equal(r.manager.objects.find(o=>o.id===3).glbPassthrough,next);r.manager.replaceActiveMesh(r.h.redo(r.live));near(r.manager.objects.find(o=>o.id===3).glbPassthrough.uvCorners[0][0][0],.3);
 assert.match(root.innerHTML,/<details><summary>Exact Move \/ Scale/);
}));
test('871 Pencil tap/jitter, cancelled/lost/stale/locked/closed strokes never commit; history/fit/resize abandon preview',()=>{
 for(const exit of ['pointercancel','lostpointercapture','refresh','locked','close','undo','fit','resize'])harness(({r,api,root,canvas,events,calls,base,refresh,fire,tap,setEditable})=>{
  tap();fire('pointerdown',280,520);fire('pointermove',330,490);
  if(exit==='refresh')refresh();else if(exit==='locked')setEditable(false);else if(exit==='close')api.close();else if(exit==='undo'||exit==='fit')root.querySelector(`[data-uv="${exit}"]`).fire('click');else if(exit==='resize')events.get('resize')();else canvas.fire(exit,{pointerId:1});
  fire('pointerup',330,490);assert.equal(calls.length,0,exit);assert.equal(r.object.glbPassthrough,r.payload);assert.equal(r.h.undoStack.length,base);assert.equal(canvas.captures.size,0);
 });
 harness(({r,api,calls,base,fire,tap})=>{tap();fire('pointerdown',280,520);fire('pointermove',282,521);fire('pointerup',282,521);assert.equal(calls.length,0);assert.equal(r.h.undoStack.length,base);assert.deepEqual(api.view,{zoom:1,panX:0,panY:0});});
});
test('871 finger/pinch/background Pencil stay navigation, palms cannot move UVs, screen deltas follow zoom and DPR',()=>harness(({r,api,root,calls,history,fire,tap})=>{
 tap();fire('pointerdown',280,520,2,'touch');fire('pointermove',330,520,2,'touch');fire('pointerup',330,520,2,'touch');assert.equal(api.view.panX,50);assert.equal(calls.length,0);
 root.querySelector('[data-uv="fit"]').fire('click');fire('pointerdown',500,300);fire('pointermove',530,310);fire('pointerup',530,310);assert.equal(api.view.panX,30);assert.equal(calls.length,0);
 root.querySelector('[data-uv="fit"]').fire('click');fire('pointerdown',400,300,2,'touch');fire('pointerdown',600,300,3,'touch');fire('pointermove',700,300,3,'touch');fire('pointerup',400,300,2,'touch');fire('pointerup',700,300,3,'touch');assert.equal(api.view.zoom,1.5);assert.equal(calls.length,0);
 root.querySelector('[data-uv="fit"]').fire('click');fire('pointerdown',280,520);fire('pointerdown',100,100,9,'touch');fire('pointermove',400,100,9,'touch');fire('pointerup',400,100,9,'touch');fire('pointermove',335.2,520);fire('pointerup',335.2,520);assert.equal(calls.length,1);near(calls[0].u,.1);assert.deepEqual(history,[]);
 const report=inspectImportedUV(r.live,r.object.glbPassthrough,signature),opts={center:true,padding:24,view:{zoom:2,panX:40,panY:-30}};const delta=importedUVScreenDelta(1000,600,report,110.4,-55.2,opts);near(delta.u,.1);near(delta.v,.05);assert.equal(importedUVScreenDelta(1000,600,report,Infinity,0,opts),null);
}));
test('871 live seam preview is read-only and Mesh Health refuses replaced payload/mesh/object at Pencil release',()=>{
 const r=fixture(),report=inspectImportedUV(r.live,r.payload,signature),before=JSON.stringify(report),ctx=Object.fromEntries(['clearRect','fillRect','strokeRect','beginPath','moveTo','lineTo','closePath','stroke','fill'].map(k=>[k,()=>{}]));drawImportedUV({width:1000,height:600,getContext:()=>ctx},report,{selectedIsland:0,previewOffset:{u:.2,v:.1}});assert.equal(JSON.stringify(report),before);
 // Shared point references must not drag the unselected side of a UV seam.
 const shared=[0,0],seamed=inspectImportedUV({faces:[[0,1,2],[1,3,2]]},{uvTopologySignature:'s',uvCorners:[[shared,[.4,0],[0,.4]],[[.8,0],[1,.4],shared]]},()=> 's'),lines=[];
 const recording={...ctx,moveTo:(...p)=>lines.push(p)};
 drawImportedUV({width:1000,height:600,getContext:()=>recording},seamed,{center:true,padding:24,selectedIsland:0,previewOffset:{u:.2,v:.1}});
 assert.deepEqual(seamed.previewSeamIslands,[0,1]);
 // Two island outlines + selected highlight, followed by both orange seam sides.
 near(lines[3][0],555.2);near(lines[3][1],520.8);near(lines[4][0],224);near(lines[4][1],576);
 const source=fs.readFileSync(new URL('../src/mesh-health.js',import.meta.url),'utf8'),c={active:true,objectId:3,uvWorkspace:{active:true,selectedIsland:0,retainSelection(){}},uvPayload:r.payload,currentMode:()=> 'object',activeObject:()=>r.object,liveMesh:()=>r.live,moveImportedUV,__boxlabExportAs:{topologySignature:signature},__boxlabObjectHistory:r.owner,renderReport(){},setStatus(){}};vm.createContext(c);vm.runInContext(source.slice(source.indexOf('function transformUVs('),source.indexOf('function manager(){')),c);
 const good={object:r.object,mesh:r.live,payload:r.payload},n=r.h.undoStack.length;for(const key of ['object','mesh','payload']){assert.equal(c.transformUVs('move',.2,.1,{...good,[key]:{}}),false);assert.equal(r.h.undoStack.length,n);}r.object.glbPassthrough={...r.payload};assert.equal(c.transformUVs('move',.2,.1,good),false);assert.equal(r.h.undoStack.length,n);
});
