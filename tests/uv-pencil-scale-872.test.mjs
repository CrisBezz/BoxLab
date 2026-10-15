import test from 'node:test';
import assert from 'node:assert/strict';
import {EditableMesh} from '../src/mesh.js';
import {inspectImportedUV,drawImportedUV,importedUVIslandCentre} from '../src/imported-uv-inspection.js';
import {createUVWorkspace} from '../src/uv-workspace.js';
import {moveImportedUV,scaleImportedUV} from '../src/imported-uv-edit.js';
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
  const scope={island:api.selectedIsland,payload:r.object.glbPassthrough};
  const result=kind==='scale'?scaleImportedUV(r.object,r.live,signature,r.owner,u,scope):moveImportedUV(r.object,r.live,signature,r.owner,u,v,scope);refresh();if(result.selectedFaces)api.retainSelection(result.selectedFaces);return result.ok;
 }});refresh();api.open();
 const fire=(name,x,y,id=1,type='pen')=>canvas.fire(name,{pointerId:id,pointerType:type,clientX:x+10,clientY:y+20});
 const tap=(x=280,y=520)=>{fire('pointerdown',x,y);fire('pointerup',x,y);};
 try{run({r,api,root,canvas,events,paths,calls,history,base,refresh,fire,tap,setEditable:v=>editable=v});}finally{api.close();keys.forEach((k,i)=>old[i]?Object.defineProperty(globalThis,k,old[i]):delete globalThis[k]);}
}
const near=(a,b)=>assert(Math.abs(a-b)<1e-12,`${a} != ${b}`);
test('872 Pencil Scale previews about the full island centre, commits once and retains resources/native history',()=>harness(({r,api,root,paths,calls,base,fire,tap})=>{
 tap();root.querySelector('[data-uv="drag-scale"]').fire('click');assert.match(root.querySelector('.uv-drag-hint').textContent,/up to enlarge/);
 const before=JSON.stringify(r.payload),mesh=r.live;paths.length=0;fire('pointerdown',280,520);for(let dy=10;dy<=120;dy+=10)fire('pointermove',280,520-dy);
 assert.equal(r.object.glbPassthrough,r.payload);assert.equal(r.h.undoStack.length,base);assert.equal(calls.length,0);assert.equal(root.querySelector('.uv-drag-status').textContent,'Scale ×2.00');
 assert(paths.some(p=>p[0]==='moveTo'&&Math.abs(p[1]-227.2)<1e-9&&Math.abs(p[2]-1372.8)<1e-9));
 fire('pointerup',280,400);assert.equal(calls.length,1);assert.equal(calls[0].kind,'scale');assert.equal(calls[0].u,2);assert.equal(r.h.undoStack.length,base+1);assert.equal(api.selectedIsland,0);assert.equal(r.live,mesh);
 const next=r.object.glbPassthrough;next.uvCorners[0].forEach((p,j)=>p.forEach((v,k)=>near(v,.2+(r.payload.uvCorners[0][j][k]-.2)*2)));assert.equal(next.uvCorners[1],r.payload.uvCorners[1]);assert.equal(next.images,r.payload.images);assert.equal(r.manager.objects.find(o=>o.id===2).glbPassthrough,r.payload);assert.equal(JSON.stringify(r.payload),before);
 fire('pointerdown',280,520);fire('pointermove',280,640);fire('pointerup',280,640);assert.equal(calls[1].u,.5);assert.equal(r.h.undoStack.length,base+2);r.payload.uvCorners[0].forEach((p,j)=>p.forEach((v,k)=>near(v,r.object.glbPassthrough.uvCorners[0][j][k])));
 r.manager.replaceActiveMesh(r.h.undo(r.live));assert.equal(r.manager.objects.find(o=>o.id===3).glbPassthrough,next);r.manager.replaceActiveMesh(r.h.redo(r.live));near(r.manager.objects.find(o=>o.id===3).glbPassthrough.uvCorners[0][0][0],0);
}));
test('872 Scale gesture cancellation/mode switch and zero/jitter/horizontal strokes leave UVs and history intact',()=>{
 for(const exit of ['pointercancel','lostpointercapture','refresh','locked','close','undo','fit','resize','mode'])harness(({r,api,root,canvas,events,calls,base,refresh,fire,tap,setEditable})=>{
  tap();root.querySelector('[data-uv="drag-scale"]').fire('click');fire('pointerdown',280,520);fire('pointermove',280,460);
  if(exit==='refresh')refresh();else if(exit==='locked')setEditable(false);else if(exit==='close')api.close();else if(exit==='mode')root.querySelector('[data-uv="drag-move"]').fire('click');else if(exit==='undo'||exit==='fit')root.querySelector(`[data-uv="${exit}"]`).fire('click');else if(exit==='resize')events.get('resize')();else canvas.fire(exit,{pointerId:1});
  fire('pointerup',280,460);assert.equal(calls.length,0,exit);assert.equal(r.object.glbPassthrough,r.payload);assert.equal(r.h.undoStack.length,base);assert.equal(canvas.captures.size,0);
 });
 harness(({r,api,root,calls,base,fire,tap})=>{
  assert.equal(root.querySelector('[data-uv="drag-scale"]').disabled,true);tap();root.querySelector('[data-uv="drag-scale"]').fire('click');
  for(const [dx,dy] of [[0,0],[1,2],[100,0]]){fire('pointerdown',280,520);fire('pointermove',280+dx,520+dy);fire('pointerup',280+dx,520+dy);}assert.equal(calls.length,0);
  fire('pointerdown',280,520);fire('pointermove',280,400);fire('pointermove',280,520);fire('pointerup',280,520);assert.equal(calls.length,1);assert.equal(calls[0].u,1);assert.equal(r.h.undoStack.length,base);assert.equal(r.object.glbPassthrough,r.payload);
  api.close();api.open();tap();fire('pointerdown',280,520);fire('pointermove',335.2,520);fire('pointerup',335.2,520);assert.equal(calls[1].kind,'move');near(calls[1].u,.1);
 });
});
test('872 Scale mode keeps pan/palm navigation; sensitivity uses CSS pixels at every zoom and has positive limits',()=>harness(({r,api,root,history,calls,fire,tap})=>{
 tap();root.querySelector('[data-uv="drag-scale"]').fire('click');fire('pointerdown',280,520,2,'touch');fire('pointermove',310,530,2,'touch');fire('pointerup',310,530,2,'touch');assert.equal(api.view.panX,30);assert.equal(calls.length,0);
 root.querySelector('[data-uv="fit"]').fire('click');root.querySelector('[data-uv="in"]').fire('click');
 // zoom1.25: original (280,520) becomes (225,575).
 fire('pointerdown',225,575);fire('pointerdown',100,100,9,'touch');fire('pointermove',500,50,9,'touch');fire('pointerup',500,50,9,'touch');fire('pointermove',225,455);fire('pointerup',225,455);assert.equal(calls[0].u,2);assert.equal(api.view.zoom,1.25);assert.deepEqual(history,[]);
 // Large upward/downward displacements remain positive and finite.
 fire('pointerdown',225,575);fire('pointermove',225,575-1e6);fire('pointerup',225,575-1e6);assert.equal(calls[1].u,100);
 fire('pointerdown',225,575);fire('pointermove',225,575+1e6);fire('pointerup',225,575+1e6);assert.equal(calls[2].u,.01);
}));
test('872 shared pivot includes unpreviewed faces, scaled seam sides stay isolated and malformed pivots refuse',()=>{
 const payload={uvTopologySignature:'s',uvCorners:[[[0,0],[.4,0],[0,.4]],[[.4,0],[2,2],[0,.4]]]},mesh={faces:[[0,1,2],[1,3,2]]},report=inspectImportedUV(mesh,payload,()=> 's',{maxPreviewCorners:3});
 assert.equal(report.previewFaces.length,1);const faces=report.faceIslands.flatMap((id,fi)=>id===0?[fi]:[]);assert.deepEqual(importedUVIslandCentre(payload.uvCorners,faces),[1,1]);
 const calls=[],ctx=Object.fromEntries(['clearRect','fillRect','strokeRect','beginPath','moveTo','lineTo','closePath','stroke','fill'].map(k=>[k,(...p)=>calls.push([k,...p])]));const before=JSON.stringify(payload);
 drawImportedUV({width:1000,height:600,getContext:()=>ctx},report,{center:true,padding:24,selectedIsland:0,previewScale:{factor:2,centre:importedUVIslandCentre(payload.uvCorners,faces)}});assert(calls.some(p=>p[0]==='moveTo'&&p[1]===-52&&p[2]===852));assert.equal(JSON.stringify(payload),before);
 const shared=[0,0],seamed=inspectImportedUV({faces:[[0,1,2],[1,3,2]]},{uvTopologySignature:'s',uvCorners:[[shared,[.4,0],[0,.4]],[[.8,0],[1,.4],shared]]},()=> 's'),lines=[];ctx.moveTo=(...p)=>lines.push(p);drawImportedUV({width:1000,height:600,getContext:()=>ctx},seamed,{center:true,padding:24,selectedIsland:0,previewScale:{factor:2,centre:[.2,.2]}});near(lines[3][0],555.2);near(lines[3][1],686.4);near(lines[4][0],224);near(lines[4][1],576);
 assert.equal(importedUVIslandCentre([],[]),null);assert.equal(importedUVIslandCentre([[[Infinity,0]]],[0]),null);assert.equal(importedUVIslandCentre([[[1,0]]],[1]),null);
});
