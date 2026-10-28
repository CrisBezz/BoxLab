import test from 'node:test';import assert from 'node:assert/strict';import * as THREE from 'three';
import {viewportPaintRuntime as runtime,viewportPaintUIRuntime as uiRuntime} from './helpers/viewport-paint-runtime.mjs';
import {brushSettings,createPaintLayer} from '../evaluations/uv-paint/paint-core.js';
import {createPaintFilterDomain} from '../src/paint-filter-domain.js';
import {EditableMesh} from '../src/mesh.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {createFaceAtlasUV} from '../src/imported-uv-edit.js';
import {coplanarRegion,traceStrip,stepRegion} from '../src/face-selection-regions.js';
const p={x:400,y:300,width:900,height:600,pressure:1},red=brushSettings({colour:'#ff0000',opacity:1,pressure:false});
function fixture(groups=null){let next=0;const timers=new Map();const r=runtime({setTimer:(fn,ms)=>{assert.equal(ms,420);timers.set(++next,fn);return next;},clearTimer:id=>timers.delete(id)});
 const mesh=new EditableMesh([[-1,-.5,0],[0,-.5,0],[1,-.5,0],[-1,.5,0],[0,.5,0],[1,.5,0],[1,-.5,-1],[1,.5,-1]],[[0,1,4,3],[1,2,5,4],[2,6,7,5]]);
 if(groups)mesh.faceGroups=groups;r.manager.replaceActiveMesh(mesh);const o=r.target();o.glbPassthrough=null;assert(createFaceAtlasUV(o,mesh,r.owner.topologySignature,{capture:()=>({}),checkpointSnapshot:()=>true},r.owner).ok);
 r.body.geometry.dispose();r.body.geometry=r.owner.buildUVPreviewGeometry(mesh,o.glbPassthrough,{faceIndices:true});
 const labels=createPaintFilterDomain(r.body.geometry,512).labels;
 return {...r,mesh:r.c.__boxlabBridgeState.mesh,labels,timers,hold(){const jobs=[...timers.values()];timers.clear();jobs.forEach(fn=>fn());}};
}
function painted(r,ids){const want=new Set(ids),pixels=r.painter.pixels;let hits=0;for(let at=0;at<r.labels.length;at++){const f=r.labels[at];if(f<0)continue;hits++;assert.equal(pixels[at*4+1],want.has(f)?0:255,'face '+f);}assert(hits>10000);}
test('1004 original shared region owners agree on coplanar, strip and fixed-base grow/shrink without source edits',()=>{
 const r=fixture(),before=JSON.stringify(r.mesh);assert.deepEqual(coplanarRegion(r.mesh,0).indices,[0,1]);assert.deepEqual(new Set(traceStrip(r.mesh,0,1)),new Set([0,1,2]));assert.deepEqual(stepRegion(r.mesh,'face',[0,1],'grow'),[0,1,2]);assert.deepEqual(stepRegion(r.mesh,'face',[0,1],'shrink'),[0]);assert.equal(JSON.stringify(r.mesh),before);
});
test('1004 tap fills exactly the source polygon; hold previews planar, grow/shrink and reversal replace pixels; one original history commit',async()=>{
 const r=fixture();await r.painter.open();const history=r.h.undoStack.length;
 assert(r.painter.begin(p,red,'boxlab',0,128,255,'fill-face'));assert.equal(r.target().colourPaint,undefined);r.painter.tick();painted(r,[0]);r.hold();r.painter.tick();painted(r,[0,1]);
 r.painter.move({...p,y:240});r.painter.tick();painted(r,[0,1,2]);r.painter.move({...p,y:330});r.painter.tick();painted(r,[0]);r.painter.move(p);r.painter.tick();painted(r,[0,1]);
 r.painter.move({...p,x:450});r.painter.tick();painted(r,[0]);r.painter.move({...p,x:350});r.painter.tick();painted(r,[0,1,2]);r.painter.move(p);assert(r.painter.finish(p));assert.equal(r.timers.size,0);assert.equal(r.h.undoStack.length,history+1);assert(r.controls.enabled);
 const committed=r.target().colourPaint;r.painter.close();assert(r.h.undo(r.c.__boxlabBridgeState.mesh));assert.equal(r.target().colourPaint,undefined);assert(r.h.redo(r.c.__boxlabBridgeState.mesh));assert.deepEqual(r.target().colourPaint.pixels,committed.pixels);
});
test('1004 group fill includes all same-name faces, boundary overlay follows body and cleans on scope/close; unnamed safely refuses',async()=>{
 const r=fixture(['G','Other','G']);await r.painter.open();const before=JSON.stringify(r.mesh);r.painter.setFillScope('facegroup');const overlay=r.scene.children.find(x=>x.userData.boxlabFacegroupUVSeams);assert(overlay);r.body.position.x=.2;r.painter.tick();assert.equal(overlay.matrix.elements[12],.2);r.body.position.x=0;
 assert(r.painter.begin(p,red,'boxlab',0,128,255,'fill-facegroup'));r.painter.tick();painted(r,[0,2]);assert(r.painter.finish(p));assert.equal(JSON.stringify(r.mesh),before);
 r.painter.setFillScope('face');assert(!r.scene.children.includes(overlay));r.painter.setFillScope('facegroup');r.painter.close();assert(!r.scene.children.some(x=>x.userData.boxlabFacegroupUVSeams));
 const plain=fixture();await plain.painter.open();assert.throws(()=>plain.painter.begin(p,red,'boxlab',0,128,255,'fill-facegroup'),/Assign a Facegroup/);assert.equal(plain.target().colourPaint,undefined);assert(plain.controls.enabled);
});
test('1004 preview cancellation, pre-hold drag, source loss and timer cleanup retain source/history; opacity never accumulates on expansion',async()=>{
 for(const kind of ['cancel','move','close']){const r=fixture();await r.painter.open();r.painter.begin(p,red,'boxlab',0,128,255,'fill-face');if(kind==='move')r.painter.move({...p,x:430});else if(kind==='close')r.painter.close();else{r.hold();r.painter.cancel();}r.hold();assert.equal(r.timers.size,0);assert.equal(r.target().colourPaint,undefined);assert(r.controls.enabled);}
 const l=createPaintLayer(16),mask=new Uint8Array(256);mask[0]=1;l.begin(brushSettings({...red,opacity:.5}));l.fill(mask,{replace:true});const sample=l.pixels.slice(0,4);mask[1]=1;l.fill(mask,{replace:true});assert.deepEqual(l.pixels.slice(0,4),sample);mask[0]=0;l.fill(mask,{replace:true});assert.deepEqual([...l.pixels.slice(0,4)],[255,255,255,255]);l.finish(true);assert(l.pixels.every(v=>v===255));
});
test('1004 actual UV Paint UI exposes Face/Facegroup/Object scopes and cancels active fill when scope changes',async()=>{
 const r=runtime(),ui=uiRuntime(r);await ui.api.open();assert.equal(ui.nodes.get('paint-fill-scope').value,'face');
 ui.nodes.get('paint-paint-action').value='fill';ui.nodes.get('paint-paint-action').dispatchEvent(new Event('change'));assert.equal(ui.nodes.get('paint-fill-controls').hidden,false);
 ui.nodes.get('paint-colour').value='#ff0000';ui.emit('pointerdown');assert(r.controls.enabled===false);ui.nodes.get('paint-fill-scope').value='object';ui.nodes.get('paint-fill-scope').dispatchEvent(new Event('change'));assert(r.controls.enabled);ui.emit('pointerup');assert.equal(r.target().colourPaint,undefined);
 ui.emit('pointerdown');ui.emit('pointerup');assert(r.target().colourPaint.pixels.every((v,i)=>i%4===1||i%4===2?v===0:v===255));ui.api.close();
});

test('1004 actual UI Face default commits a partial texture and subset pixels survive original Save/Open',async()=>{
 const r=runtime(),ui=uiRuntime(r);await ui.api.open();ui.nodes.get('paint-paint-action').value='fill';ui.nodes.get('paint-paint-action').dispatchEvent(new Event('change'));ui.nodes.get('paint-colour').value='#ff0000';
 ui.emit('pointerdown');ui.emit('pointerup');const resource=r.target().colourPaint;assert(resource);let red=0,white=0;
 for(let i=0;i<resource.pixels.length;i+=4){if(resource.pixels[i+1]===0)red++;else if(resource.pixels[i+1]===255)white++;}assert(red>10000);assert(white>10000);
 const saved=encodeBoxlabScene(r.c.__boxlabObjectHistory.capture()),loaded=decodeBoxlabScene(JSON.parse(JSON.stringify(saved)),(...args)=>new EditableMesh(...args));
 assert.deepEqual(loaded.objects.find(o=>o.id===3).colourPaint.pixels,resource.pixels);ui.api.close();
});
