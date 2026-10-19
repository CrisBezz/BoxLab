import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {viewportPaintRuntime as runtime,viewportPaintUIRuntime as uiRuntime} from './helpers/viewport-paint-runtime.mjs';
import {brushSettings} from '../evaluations/uv-paint/paint-core.js';
import {captureRoughnessResource} from '../src/roughness-resource.js';
import {paintTargetDigest,paintTargetKey} from '../src/paint-target.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';import {EditableMesh} from '../src/mesh.js';
import {buildNomadProjectWithMaps} from '../src/nomad-packed-maps.js';import {readNomadProject} from '../src/nomad-export-core.js';import {inspectPNG} from './helpers/png-inspect.mjs';
const p=(x=450)=>({x,y:300,width:900,height:600,pressure:1}),brush=brushSettings({hardness:1,pressure:false});
function draw(r,value,settings=brush){const h=r.painter.hit(p()),index=Math.round(h.uv.x*511)+Math.round(h.uv.y*511)*512;r.painter.begin(p(),settings,'boxlab',0,value);r.painter.move(p());r.painter.finish();return index;}
function change(ui,key,value){const n=ui.nodes.get('paint-'+key);n.value=value;for(const f of n.listeners.get('change')||[])f({});}
test('919 real Paint channel UI paints independent linear R8 bytes and restores Colour controls/preview without a selection checkpoint',async()=>{
 const r=runtime(),ui=uiRuntime(r);await ui.api.open();ui.emit('pointerdown');ui.emit('pointerup');const colour=r.target().colourPaint,n=r.h.undoStack.length;
 change(ui,'channel','roughness');assert.equal(r.h.undoStack.length,n);assert(ui.nodes.get('paint-colour').disabled);assert(ui.nodes.get('paint-layer').disabled);assert(!ui.nodes.get('paint-roughness-controls').hidden);
 ui.nodes.get('paint-roughness-value').value='0';ui.emit('pointerdown');ui.emit('pointerup');const rough=r.target().roughnessPaint;assert(rough.pixels.some(x=>x===0));assert.equal(rough.colorSpace,'linear');assert.equal(r.target().colourPaint,colour);assert.equal(r.h.undoStack.length,n+1);
 change(ui,'channel','colour');assert(!ui.nodes.get('paint-colour').disabled);assert(!ui.nodes.get('paint-layer').disabled);assert(ui.nodes.get('paint-roughness-controls').hidden);ui.api.close();await r.painter.open();assert.deepEqual(r.painter.pixels,colour.pixels);r.painter.selectPaintTarget('roughness');r.painter.tick();for(let i=0;i<rough.pixels.length;i++)assert.equal(r.painter.pixels[i*4],rough.pixels[i]);r.painter.close();
});
test('919 scalar raster uses linear per-stroke coverage, no gamma or repeated accumulation; cancel/settings/channel/body loss keep committed resources',async()=>{
 const r=runtime();await r.painter.open();r.painter.selectPaintTarget('roughness');const i=draw(r,0,brushSettings({...brush,opacity:.5}));assert.equal(r.target().roughnessPaint.pixels[i],128);const kept=r.target().roughnessPaint,n=r.h.undoStack.length;
 r.painter.begin(p(),brush,'klecks',0,255);r.painter.move(p(480));r.painter.tick();r.painter.cancel();r.painter.tick();assert.equal(r.painter.pixels[i*4],128);assert.equal(r.target().roughnessPaint,kept);assert(r.controls.enabled);
 for(const v of [-1,256,.5,NaN])assert.throws(()=>r.painter.begin(p(),brush,'boxlab',0,v),/0 to 255/);
 r.painter.begin(p(),brush,'boxlab',0,255);r.painter.selectPaintTarget('colour');assert.equal(r.target().roughnessPaint,kept);assert.equal(r.h.undoStack.length,n);r.painter.selectPaintTarget('roughness');r.painter.begin(p(),brush,'boxlab',0,0);r.body.geometry.dispose();assert(!r.painter.active);assert(r.controls.enabled);assert.equal(r.target().roughnessPaint,kept);
});
test('919 scalar commits use existing history, Save/Open, duplicate copy-on-write and native scalar export',async()=>{
 const r=runtime();await r.painter.open();r.painter.selectPaintTarget('roughness');const i=draw(r,10),first=r.target().roughnessPaint;draw(r,220);const second=r.target().roughnessPaint;r.painter.close();assert(r.h.undo(r.c.__boxlabBridgeState.mesh));assert.deepEqual(r.target().roughnessPaint.pixels,first.pixels);assert(r.h.redo(r.c.__boxlabBridgeState.mesh));assert.deepEqual(r.target().roughnessPaint.pixels,second.pixels);
 const encoded=encodeBoxlabScene(r.c.__boxlabObjectHistory.capture());assert.equal(encoded.version,6);const decoded=decodeBoxlabScene(JSON.parse(JSON.stringify(encoded)),(...a)=>new EditableMesh(...a));assert(r.manager.replaceBasicProjectScene(decoded.objects,decoded.activeId));assert.equal(r.target().roughnessPaint.pixels[i],220);
 const shared=r.target().roughnessPaint,copy={...r.target(),id:90,mesh:r.target().mesh.clone()};r.manager.objects.push(copy);await r.painter.open();r.painter.selectPaintTarget('roughness');draw(r,80);r.painter.close();assert.equal(copy.roughnessPaint,shared);assert.equal(copy.roughnessPaint.pixels[i],220);assert.equal(r.target().roughnessPaint.pixels[i],80);
 const result=await buildNomadProjectWithMaps([r.target()],fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url)),{topologySignature:r.owner.topologySignature}),nom=readNomadProject(result.bytes),m=nom.json.materials[nom.json.meshes[0].material],im=nom.json.images[m.textures.roughness.index],png=inspectPNG(nom.bin.subarray(im.offset,im.offset+im.length));assert.equal(png.rgba[i*4+1],80);assert.equal(r.target().colourPaint,undefined);
});
test('919 checkpoint/quota failures roll back the live scalar preview and do not alter history or shared bytes',async()=>{
 const r=runtime({checkpoint:()=>false});await r.painter.open();r.painter.selectPaintTarget('roughness');assert.throws(()=>draw(r,0),/checkpoint/);assert.equal(r.target().roughnessPaint,undefined);assert(r.painter.pixels.every(v=>v===255));assert(r.controls.enabled);r.painter.close();
 let q;const others=Array.from({length:16},(_,i)=>({roughnessPaint:captureRoughnessResource({width:512,height:512,binding:'a'.repeat(64),pixels:new Uint8Array(512*512).fill(i)})}));q=runtime({objects:()=>[q.target(),...others]});await q.painter.open();q.painter.selectPaintTarget('roughness');assert.throws(()=>draw(q,0),/4 MiB/);assert.equal(q.target().roughnessPaint,undefined);assert(q.painter.pixels.every(v=>v===255));assert.equal(q.h.undoStack.length,0);q.painter.close();
});
test('919 stale async scalar ownership and malformed bindings refuse; non-512 maps are retained without resampling, colour-layer actions cannot overwrite scalar data',async()=>{
 const r=runtime(),binding=await paintTargetDigest(paintTargetKey(r.target(),r.target().mesh,r.owner));const small=captureRoughnessResource({width:16,height:17,binding,pixels:new Uint8Array(272).fill(80)});r.target().roughnessPaint=small;await r.painter.open();assert.throws(()=>r.painter.selectPaintTarget('roughness'),/512/);assert.equal(r.painter.state.paintTarget,'colour');assert.equal(r.target().roughnessPaint,small);r.painter.close();
 r.target().roughnessPaint=captureRoughnessResource({width:512,height:512,binding,pixels:new Uint8Array(512*512).fill(80)});await r.painter.open();r.painter.selectPaintTarget('roughness');for(const fn of [()=>r.painter.addLayer(),()=>r.painter.addMask(),()=>r.painter.removeLayer(),()=>r.painter.projectImage(null,null)])assert.throws(fn,/Switch to Colour/);r.painter.close();
 const pending=r.painter.open();r.target().roughnessPaint=null;await assert.rejects(pending,/changed/);assert(!r.painter.active);r.target().roughnessPaint={...small,binding:'a'.repeat(64)};await assert.rejects(r.painter.open(),/no longer matches/);
});
test('919 actual single and Multi Duplicate retain scalar sharing; subsequent real strokes isolate originals and both exported GLB maps',async()=>{
 const vm=await import('node:vm'),multi=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8'),management=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
 const {decodeGLB}=await import('./helpers/glb-owner-runtime.mjs');
 for(const multiMode of [false,true]){
  const r=runtime();await r.painter.open();r.painter.selectPaintTarget('roughness');const i=draw(r,20);r.painter.close();const shared=r.target().roughnessPaint,before=new Set(r.manager.objects.map(o=>o.id));
  r.c.selectedIds=new Set([3]);r.c.multiEnabled=multiMode;
  vm.runInContext(multi.slice(multi.indexOf('function duplicateStem('),multi.indexOf('function addObject(')).replace(/\bobjects\b/g,'sceneObjects')+multi.slice(multi.indexOf('function duplicateActive('),multi.indexOf('function linkedDuplicateActive(')),r.c);
  vm.runInContext(management.slice(management.indexOf('function nextGroupId('),management.indexOf('function cleanupSingletonGroups('))+management.slice(management.indexOf('function duplicateSelection('),management.indexOf('function linkedDuplicateSelection(')),r.c);r.manager.nextDuplicateName=r.c.nextDuplicateName;
  multiMode?r.c.duplicateSelection():r.c.duplicateActive();const copy=r.manager.objects.find(o=>!before.has(o.id));assert(copy);assert.equal(copy.roughnessPaint,shared);r.manager.activate(3);
  await r.painter.open();r.painter.selectPaintTarget('roughness');draw(r,200);r.painter.close();assert.equal(copy.roughnessPaint,shared);assert.equal(copy.roughnessPaint.pixels[i],20);assert.equal(r.target().roughnessPaint.pixels[i],200);
  const oldBitmap=globalThis.createImageBitmap,oldSelf=globalThis.self;globalThis.self=globalThis;globalThis.createImageBitmap=async b=>{const p=inspectPNG(new Uint8Array(await b.arrayBuffer()));return{width:p.width,height:p.height,close(){}};};
  try{const result=await r.owner.buildGLB([r.target(),copy],false),{json,bin}=decodeGLB(result.buffer);assert(result.verification.pass);const values=json.meshes.map(mesh=>{const m=json.materials[mesh.primitives[0].material].pbrMetallicRoughness,t=json.textures[m.metallicRoughnessTexture.index],view=json.bufferViews[json.images[t.source].bufferView];return inspectPNG(bin.slice(view.byteOffset,view.byteOffset+view.byteLength)).rgba[i*4+1];});assert.deepEqual(values,[200,20]);}finally{if(oldBitmap===undefined)delete globalThis.createImageBitmap;else globalThis.createImageBitmap=oldBitmap;if(oldSelf===undefined)delete globalThis.self;else globalThis.self=oldSelf;}
 }
});
