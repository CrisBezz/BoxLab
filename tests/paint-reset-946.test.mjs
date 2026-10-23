import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
import {clearNativePaint,createBoxUV,createPlanarUV} from '../src/imported-uv-edit.js';
import {viewportPaintRuntime} from './helpers/viewport-paint-runtime.mjs';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';import {EditableMesh} from '../src/mesh.js';
const fields=['colourPaint','roughnessPaint','metalnessPaint'],p={x:450,y:300,width:900,height:600,pressure:1};
async function fixture(){const r=viewportPaintRuntime();delete r.target().booleanRecipe;await r.painter.open();r.painter.addLayer();for(const channel of ['roughness','metalness']){r.painter.selectPaintTarget(channel);r.painter.begin(p,{radius:10,opacity:1,pressure:false},'boxlab',0,0,255);r.painter.finish(p);}r.painter.close();return r;}
const reset=(r,uv=false)=>clearNativePaint(r.target(),r.live,r.c.__boxlabObjectHistory,uv);
test('946 stale paint recovery clears every channel, keeps UVs and geometry, reopens blank Paint and restores exact resources with Undo/Redo',async()=>{
 const r=await fixture(),o=r.target(),old=fields.map(k=>o[k]);assert(old.every(Boolean));const peer=r.manager.objects.find(o=>o.id===2);fields.forEach((k,i)=>peer[k]=old[i]);
 const payload=o.glbPassthrough;assert(createPlanarUV(o,r.live,r.owner.topologySignature,r.c.__boxlabObjectHistory,'xy').changed);const uv=o.glbPassthrough;await assert.rejects(r.painter.open(),/Clear paint/);const n=r.h.undoStack.length,geometry=JSON.stringify(r.live);
 assert.deepEqual(reset(r),{ok:true,changed:true});assert.equal(r.h.undoStack.length,n+1);fields.forEach((k,i)=>{assert.equal(o[k],undefined);assert.equal(peer[k],old[i]);});assert.equal(o.glbPassthrough,uv);assert.notEqual(uv,payload);assert.equal(JSON.stringify(r.live),geometry);
 await r.painter.open();assert(r.painter.pixels.every(v=>v===255));r.painter.close();assert.equal(r.h.undoStack.length,n+1);
 r.manager.replaceActiveMesh(r.h.undo(r.live));fields.forEach((k,i)=>assert.equal(r.target()[k],old[i]));assert.equal(r.target().glbPassthrough,uv);
 r.manager.replaceActiveMesh(r.h.redo(r.live));fields.forEach(k=>assert.equal(r.target()[k],undefined));assert.equal(r.target().glbPassthrough,uv);
});
test('946 clear paint plus stale UVs roundtrips blank native project, unwraps again and paints; no-op makes no history',async()=>{
 const r=await fixture(),old=r.target().glbPassthrough;r.live.faces[0].reverse();r.manager.saveActive();const n=r.h.undoStack.length;
 assert(reset(r,true).changed);assert.equal(r.target().glbPassthrough,undefined);fields.forEach(k=>assert.equal(r.target()[k],undefined));assert.equal(r.h.undoStack.length,n+1);assert.deepEqual(reset(r,true),{ok:true,changed:false});assert.equal(r.h.undoStack.length,n+1);
 const saved=encodeBoxlabScene(r.c.__boxlabObjectHistory.capture()),opened=decodeBoxlabScene(JSON.parse(JSON.stringify(saved)),(...a)=>new EditableMesh(...a));const o=opened.objects.find(o=>o.id===3);assert.equal(o.glbPassthrough,undefined);fields.forEach(k=>assert.equal(o[k],undefined));
 r.manager.replaceActiveMesh(r.h.undo(r.live));assert.equal(r.target().glbPassthrough,old);assert(r.target().colourPaint);r.manager.replaceActiveMesh(r.h.redo(r.live));
 assert(createBoxUV(r.target(),r.live,r.owner.topologySignature,r.c.__boxlabObjectHistory).changed);await r.painter.open();r.painter.addLayer();assert(r.target().colourPaint);r.painter.close();
});
test('946 reset refuses imported, locked, linked, procedural and unavailable history without discarding resources',async()=>{
 const r=await fixture(),base=r.target();for(const patch of [{locked:true},{kind:'reference'},{sourceId:2},{arrayRecipe:{}},{booleanRecipe:{}},{curveProfile:{}},{materials:[]},{textures:[]},{glbPassthrough:{source:'glb',images:[1]}}]){const o={...base,...patch},uv=o.glbPassthrough;assert.equal(clearNativePaint(o,r.live,r.c.__boxlabObjectHistory,true).ok,false);assert.equal(o.colourPaint,base.colourPaint);assert.equal(o.glbPassthrough,uv);}
 for(const history of [null,{capture:()=>null,checkpointSnapshot:()=>true},{capture:()=>({}),checkpointSnapshot:()=>false}]){assert.equal(clearNativePaint(base,r.live,history,true).ok,false);assert(base.colourPaint);}
});
test('946 actual UV panel reset is reachable without Paint, refreshes existing render owner and refuses a stale target',async()=>{
 const r=await fixture();let renders=0,reports=0,message='';const c={active:true,objectId:3,currentMode:()=> 'object',activeObject:r.target,liveMesh:()=>r.live,clearNativePaint,__boxlabObjectHistory:r.c.__boxlabObjectHistory,__boxlabBridgeState:{scene:r.scene},__boxlabRenderModes:{apply:body=>{assert.equal(body,r.body);renders++;}},manager:()=>r.manager,renderReport:()=>reports++,setStatus:s=>message=s};vm.createContext(c);const source=fs.readFileSync(new URL('../src/mesh-health.js',import.meta.url),'utf8');vm.runInContext(source.slice(source.indexOf('function resetPaint('),source.indexOf("clearPaint.addEventListener")),c);
 assert(c.resetPaint(true));assert.equal(renders,1);assert.equal(reports,1);assert.match(message,/choose a UV projection/);assert.equal(r.target().colourPaint,undefined);c.objectId=99;assert.equal(c.resetPaint(),false);assert.equal(reports,1);assert.match(source,/meshHealthClearPaintUV/);
});
