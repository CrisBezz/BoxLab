import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../src/mesh.js';
import {cutNativeUVEdges,createPlanarUV,createBoxUV,moveImportedUV} from '../src/imported-uv-edit.js';
import {meshTopologySignature as signature} from '../src/mesh-topology-signature.js';
import {inspectImportedUV,importedUVIslandBounds} from '../src/imported-uv-inspection.js';
import {viewportPaintRuntime} from './helpers/viewport-paint-runtime.mjs';
import {glbOwnerRuntime,decodeGLB} from './helpers/glb-owner-runtime.mjs';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
const history={capture:()=>({}),checkpointSnapshot:()=>true};
function grid(n=2){const v=[],f=[];for(let y=0;y<=n;y++)for(let x=0;x<=n;x++)v.push([x,y,0]);for(let y=0;y<n;y++)for(let x=0;x<n;x++){const a=y*(n+1)+x;f.push([a,a+1,a+n+2,a+n+1]);}return new EditableMesh(v,f);}
function mapped(m=grid()){const o={};assert(createPlanarUV(o,m,signature,history,'xy').ok);return {m,o};}
const cut=(o,m,p,h=history)=>cutNativeUVEdges(o,m,signature,h,p);
const report=(o,m)=>inspectImportedUV(m,o.glbPassthrough,signature);
function separate(o,m,count){const r=report(o,m);assert.equal(r.islandCount,count);const bounds=Array.from({length:count},(_,id)=>importedUVIslandBounds(o.glbPassthrough.uvCorners,r.faceIslands.flatMap((n,i)=>n===id?[i]:[])));for(let i=0;i<count;i++){const a=bounds[i];assert(a.minU>=.02-1e-12&&a.maxU<=.98+1e-12&&a.minV>=.02-1e-12&&a.maxV<=.98+1e-12);for(let j=i+1;j<count;j++){const b=bounds[j];assert(a.maxU<b.minU||b.maxU<a.minU||a.maxV<b.minV||b.maxV<a.minV);}}return r;}
test('953 complete selected cut splits and packs original native UVs, preserves quads/peers and every unselected connection; repeat no-op',()=>{
 const {m,o}=mapped(),original=o.glbPassthrough,bytes=JSON.stringify(original),shape=JSON.stringify(m),peer={glbPassthrough:original};let checkpoints=0;
 assert(cut(o,m,[[1,4],[7,4],[4,1]],{capture:()=>({}),checkpointSnapshot:()=>{checkpoints++;return true;}}).changed);
 const r=separate(o,m,2);assert.deepEqual(r.faceIslands,[0,1,0,1]);assert.equal(r.seamEdges,2);assert.equal(JSON.stringify(m),shape);assert.equal(JSON.stringify(peer.glbPassthrough),bytes);assert.notEqual(o.glbPassthrough,original);assert.equal(checkpoints,1);
 const after=o.glbPassthrough;assert.equal(cut(o,m,[[1,4],[4,7]],{capture(){throw Error('no-op history');}}).changed,false);assert.equal(o.glbPassthrough,after);
 const old=structuredClone(after.uvCorners);assert(moveImportedUV(o,m,signature,history,.02,0,{payload:after,island:0}).changed);for(const fi of [1,3])assert.deepEqual(o.glbPassthrough.uvCorners[fi],old[fi]);
});
test('953 closed selected loop detaches centre patch; partial slits and mixed complete/incomplete cuts refuse atomically',()=>{
 const {m,o}=mapped(grid(3));assert(cut(o,m,[[5,6],[6,10],[10,9],[9,5]]).changed);const r=separate(o,m,2);assert.equal(r.faceIslands.filter(id=>id===r.faceIslands[4]).length,1);
 for(const p of [[[1,5]],[[1,5],[5,9],[9,13],[5,6]]]){const {m,o}=mapped(grid(3)),old=o.glbPassthrough;let captures=0;const result=cut(o,m,p,{capture(){captures++;return{};},checkpointSnapshot:()=>true});assert.equal(result.ok,false);assert.match(result.reason,/boundary-to-boundary/);assert.equal(captures,0);assert.equal(o.glbPassthrough,old);}
});
test('953 all paint channels/unsupported targets/stale or malformed selection/work/history failures preserve scene and do not silently clear paint',()=>{
 for(const extra of [{colourPaint:{}},{roughnessPaint:{}},{metalnessPaint:{}},{locked:true},{kind:'reference'},{sourceId:7},{arrayRecipe:{}},{booleanRecipe:{}},{curveProfile:{}},{settings:{subd:true}},{settings:{mirror:{x:true}}},{materials:[]}]){const {m,o}=mapped();Object.assign(o,extra);const before=JSON.stringify(o);let captures=0;assert(!cut(o,m,[[1,4],[4,7]],{capture(){captures++;return{};}}).ok);assert.equal(captures,0);assert.equal(JSON.stringify(o),before);}
 for(const pairs of [[],null,[[99,1]],[[1,1]],[[1,4],null],[[0,4]],[[1.2,4]]]){const {m,o}=mapped(),old=o.glbPassthrough;assert(!cut(o,m,pairs).ok);assert.equal(o.glbPassthrough,old);}
 for(const h of [null,{capture:()=>null,checkpointSnapshot:()=>true},{capture:()=>({}),checkpointSnapshot:()=>false}]){const {m,o}=mapped(),old=o.glbPassthrough;assert(!cut(o,m,[[1,4],[4,7]],h).ok);assert.equal(o.glbPassthrough,old);}
 const {m,o}=mapped();o.glbPassthrough={...o.glbPassthrough,uvTopologySignature:'stale'};assert(!cut(o,m,[[1,4]]).ok);o.glbPassthrough={...o.glbPassthrough,uvTopologySignature:signature(m),source:'glb'};assert(!cut(o,m,[[1,4]]).ok);
 const big=mapped(grid(72));assert.match(cut(big.o,big.m,[[1,74]]).reason,/20,000/);
});
test('953 existing seam/boundary no-op, nonmanifold/same-winding refusal and pack 4096-island cap remain atomic',()=>{
 const m=EditableMesh.cube(2),o={};createBoxUV(o,m,signature,history);const old=o.glbPassthrough;assert.equal(cut(o,m,[[0,1]]).changed,false);assert.equal(o.glbPassthrough,old);
 const plane=mapped();assert.equal(cut(plane.o,plane.m,[[0,1]]).changed,false);
 for(const faces of [[[0,1,2],[1,0,3],[0,1,4]],[[0,1,2],[0,1,3]]]){const m=new EditableMesh([[0,0,0],[1,0,0],[0,1,0],[0,-1,0],[1,1,0]],faces),o={};createPlanarUV(o,m,signature,history,'xy');assert.match(cut(o,m,[[0,1]]).reason,/manifold/);}
 const large=mapped(grid(65)),pairs=[];for(const e of large.m.edges())if(e.faces.length===2)pairs.push([e.a,e.b]);const previous=large.o.glbPassthrough;assert.match(cut(large.o,large.m,pairs).reason,/4096/);assert.equal(large.o.glbPassthrough,previous);
});
test('953 actual scene Undo/Redo, paint after cut and exact Save/Open plus original GLB UV transport retain split membership',async()=>{
 const r=viewportPaintRuntime();r.manager.replaceActiveMesh(grid());delete r.target().glbPassthrough;createPlanarUV(r.target(),r.live,signature,r.c.__boxlabObjectHistory,'xy');const original=r.target().glbPassthrough,n=r.h.undoStack.length;
 assert(cut(r.target(),r.live,[[1,4],[4,7]],r.c.__boxlabObjectHistory).changed);const result=r.target().glbPassthrough;assert.equal(r.h.undoStack.length,n+1);
 r.manager.replaceActiveMesh(r.h.undo(r.live));assert.equal(r.target().glbPassthrough,original);r.manager.replaceActiveMesh(r.h.redo(r.live));assert.equal(r.target().glbPassthrough,result);separate(r.target(),r.live,2);
 const owner=glbOwnerRuntime();r.body.geometry.dispose();r.body.geometry=owner.c.buildUVPreviewGeometry(r.live,result);r.body.updateMatrixWorld(true);await r.painter.open();assert(r.painter.begin({x:500,y:250,width:900,height:600,pressure:1},{radius:8,colour:'#3388dd',opacity:1,hardness:1,pressure:false}));r.painter.finish();r.painter.close();assert(r.target().colourPaint);
 const opened=decodeBoxlabScene(JSON.parse(JSON.stringify(encodeBoxlabScene(r.c.__boxlabObjectHistory.capture()))),(...a)=>new EditableMesh(...a)),object=opened.objects.find(o=>o.id===3);assert.equal(JSON.stringify(object.glbPassthrough),JSON.stringify(result));assert.deepEqual(object.colourPaint,r.target().colourPaint);separate(object,object.mesh,2);
 delete object.colourPaint;const glb=await owner.build([object]);assert.equal(glb.uvRestoredCount,1);const {json}=decodeGLB(glb.buffer);assert(json.meshes[0].primitives.every(p=>p.attributes.TEXCOORD_0!==undefined));const imported=await owner.import(glb.buffer);assert.equal(report(imported[0],imported[0].mesh).seamEdges,2);
});
test('953 actual Edge action resolves current selected indices once, preserves selection and delegates current target/history/render owners; radial uses one-shot exit',()=>{
 const source=fs.readFileSync(new URL('../src/mesh-health.js',import.meta.url),'utf8'),gizmo=fs.readFileSync(new URL('../src/total-gizmo.js',import.meta.url),'utf8'),{m,o}=mapped();const ids=m.edges().flatMap((e,i)=>[[1,4],[4,7]].some(([a,b])=>a===Math.min(e.a,e.b)&&b===Math.max(e.a,e.b))?[i]:[]);let saves=0,renders=0,text='';
 const c={cutNativeUVEdges,currentMode:()=> 'edge',activeObject:()=>o,liveMesh:()=>m,manager:()=>({saveActive:()=>saves++}),setStatus:s=>text=s,__boxlabSelectionBridge:{mode:()=> 'edge',indices:()=>ids},__boxlabExportAs:{topologySignature:signature},__boxlabObjectHistory:history,__boxlabBridgeState:{scene:{traverse:f=>f({userData:{kind:'body'}})}},__boxlabRenderModes:{apply:()=>renders++}};vm.createContext(c);vm.runInContext(source.slice(source.indexOf('function cutSelectedUVEdges('),source.indexOf('const VERSION=')),c);
 assert(c.cutSelectedUVEdges());assert.match(text,/UVs cut \+ repacked/);assert.equal(saves,1);assert.equal(renders,1);assert.equal(ids.length,2);separate(o,m,2);assert(c.cutSelectedUVEdges());assert.match(text,/already UV seams/);assert.equal(saves,1);c.currentMode=()=> 'object';assert(!c.cutSelectedUVEdges());
 // Execute the actual radial listener, not a duplicate launch path.
 createPlanarUV(o,m,signature,history,'xy');c.currentMode=()=> 'edge';const tasks=[],hub=[],events=[],listeners={};
 const button={textContent:'Cut UVs',dataset:{toolTarget:'#cutUVEdgesBtn'},disabled:false,closest:()=>({dataset:{ringMode:'edge'}}),addEventListener:(t,f)=>listeners[t]=f};
 Object.assign(c,{toolSectors:[button],syncContextToolAvailability(){},document:{querySelector:q=>q==='#cutUVEdgesBtn'?{click:()=>c.cutSelectedUVEdges()}:null},root:{hidden:false},state:()=>({mesh:m}),selectionAvailable:()=>true,selectionKey:()=> 'edge:selection',setHubState:(value,detail)=>hub.push(detail.reason),gestureDebug(){},queueMicrotask:f=>tasks.push(f),window:{dispatchEvent:e=>events.push(e)},CustomEvent:class{constructor(type,options){Object.assign(this,{type,...options});}},lastSelectionKey:'edge:selection',hubSuppressedKey:''});
 vm.runInContext(gizmo.slice(gizmo.indexOf('toolSectors.forEach(button=>{'),gizmo.indexOf('\ntoolButtons.forEach')),c);
 listeners.click({preventDefault(){},stopPropagation(){}});assert(c.root.hidden);tasks.forEach(f=>f());assert.equal(c.root.hidden,false);assert.equal(c.hubSuppressedKey,'');assert.equal(hub.at(-1),'edge-one-shot-complete');assert.equal(events.at(-1).detail.tool,'Cut UVs');separate(o,m,2);
 assert.match(source,/cutUVButton.addEventListener\('click',cutSelectedUVEdges\)/);const edge=gizmo.slice(gizmo.indexOf('data-ring-mode="edge"'),gizmo.indexOf('data-ring-mode="vertex"'));assert.match(edge,/data-tool-target="#cutUVEdgesBtn"/);assert.match(gizmo,/mode==='edge'&&\['Cut UVs','Dissolve'/);
});
