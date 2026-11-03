import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as THREE from 'three';
import {viewportPaintRuntime as runtime,viewportPaintUIRuntime as uiRuntime} from './helpers/viewport-paint-runtime.mjs';
import {captureColourResource} from '../src/paint-resource.js';
import {createPaintLayerStack,appendPaintLayer,appendImagePaintLayer} from '../src/paint-layer-stack.js';
import {captureLayeredColourResource} from '../src/paint-layer-resource.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {EditableMesh} from '../src/mesh.js';
import {paintImagePlacementFromCamera} from '../src/paint-image-placement.js';
import {encodeNomadColourPNG} from '../src/nomad-scalar-png.js';
import {buildNomadProjectWithMaps} from '../src/nomad-packed-maps.js';
import {readNomadProject} from '../src/nomad-export-core.js';
import {inspectPNG} from './helpers/png-inspect.mjs';
const p={x:450,y:300,width:900,height:600,pressure:1},brush={colour:'#c03020',radius:12,hardness:1,opacity:1,pressure:false};
async function painted(size=512){const r=runtime({newColourSize:size});await r.painter.open();r.painter.setMultiPaintChannels(['roughness','metalness']);r.painter.begin(p,brush,'boxlab',0,64,180,'fill');r.painter.finish();return r;}
test('1066 actual Base to Layer preserves exact 512/1024 appearance, scalar/UV bytes, backing and one Undo/Redo',async()=>{
 for(const size of [512,1024]){
  const r=await painted(size),before=r.target().colourPaint,rough=r.target().roughnessPaint,metal=r.target().metalnessPaint,uv=r.target().glbPassthrough,history=r.h.undoStack.length;assert(r.painter.baseToLayer());const next=r.target().colourPaint;
  assert.deepEqual(next.pixels,before.pixels);assert(next.layers.base.pixels.every(v=>v===255));assert.deepEqual(next.layers.layers[0].pixels,before.pixels);assert.equal(next.layers.layers[0].id,r.painter.state.selected);assert.equal(next.layers.layers[0].name,'Base paint');assert.equal(r.h.undoStack.length,history+1);assert.equal(r.target().roughnessPaint,rough);assert.equal(r.target().metalnessPaint,metal);assert.equal(r.target().glbPassthrough,uv);
  r.painter.close();assert(r.h.undo(r.live));assert.deepEqual(r.target().colourPaint,before);assert(r.h.redo(r.live));assert.deepEqual(r.target().colourPaint,next);
 }
});
test('1066 lifted pixels accept original masks and reveal backing without mutating raw pixels; project and NOM keep resulting appearance',async()=>{
 const r=await painted(),raw=r.target().colourPaint.pixels.slice();r.painter.baseToLayer();const id=r.painter.state.selected;r.painter.addMask();r.painter.begin(p,brush,'boxlab',0,64,180,'fill');r.painter.finish();const masked=r.target().colourPaint;
 assert(masked.pixels.every(v=>v===255));assert.deepEqual(masked.layers.layers[0].pixels,raw);assert(masked.layers.layers[0].mask.pixels.every(v=>v===0));
 const project=decodeBoxlabScene(JSON.parse(JSON.stringify(encodeBoxlabScene(r.c.__boxlabObjectHistory.capture()))),(...args)=>new EditableMesh(...args)),loaded=project.objects.find(o=>o.id===r.target().id).colourPaint;assert.deepEqual(loaded,masked);assert.equal(loaded.layers.layers[0].id,id);
 const result=await buildNomadProjectWithMaps([r.target()],fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url)),{topologySignature:r.owner.topologySignature}),nom=readNomadProject(result.bytes),material=nom.json.materials[nom.json.meshes[0].material],image=nom.json.images[material.textures.color.index];assert.deepEqual(inspectPNG(nom.bin.subarray(image.offset,image.offset+image.length)).rgba,masked.pixels);r.painter.close();
});
test('1066 lifting inserts beneath mixed/masked/image overlays and retains exact original layer recipes/order/settings',async()=>{
 const r=await painted(),base=captureColourResource(r.target().colourPaint),pixels=new Uint8Array(16*16*4).fill(255),source={version:1,mime:'image/png',width:16,height:16,rowOrder:'image-top-first',colourSpace:'srgb',alpha:'straight',pixels,encoded:await encodeNomadColourPNG(pixels,16,16)},image={version:1,source,placement:paintImagePlacementFromCamera(new THREE.OrthographicCamera(-1,1,1,-1,.01,10)),objectToWorld:new THREE.Matrix4().toArray()},overlay=new Uint8Array(base.pixels.length);for(let i=0;i<overlay.length;i+=4)overlay.set([20,180,50,70],i);
 let stack=appendPaintLayer(createPaintLayerStack(base),{id:'first',name:'Masked multiply',pixels:overlay,blendMode:'multiply',opacity:.4,mask:{enabled:true,inverted:true,pixels:new Uint8Array(512*512).fill(100)}});stack=appendImagePaintLayer(stack,{id:'image',name:'Original image',image,pixels:overlay,blendMode:'screen',opacity:.6});r.painter.close();r.target().colourPaint=captureLayeredColourResource(stack);await r.painter.open();r.painter.selectLayer('$base');const old=r.target().colourPaint,before=structuredClone(old);r.painter.baseToLayer();const next=r.target().colourPaint;
 assert.deepEqual(next.pixels,old.pixels);assert.equal(next.version,3);assert.deepEqual(next.layers.layers.slice(1),old.layers.layers);assert.deepEqual(old,before);assert.equal(next.layers.layers[0].image,null);r.painter.close();
});
test('1066 full-slot, quota, checkpoint and stale refusals preserve original resources/history/selection',async()=>{
 const r=await painted();for(let i=0;i<3;i++)r.painter.addLayer();r.painter.selectLayer('$base');const full=r.target().colourPaint,count=r.h.undoStack.length;assert.throws(()=>r.painter.baseToLayer(),/three overlays/);assert.equal(r.target().colourPaint,full);assert.equal(r.h.undoStack.length,count);r.painter.close();
 let allow=true,extras=[];const q=runtime({checkpoint:()=>allow,objects:()=>[q.target(),...extras]});await q.painter.open();q.painter.begin(p,brush,'boxlab',0,64,180,'fill');q.painter.finish();const old=q.target().colourPaint;allow=false;assert.throws(()=>q.painter.baseToLayer(),/checkpoint/);assert.equal(q.target().colourPaint,old);assert.equal(q.painter.state.selected,'$base');allow=true;
 extras=[1,2].map(n=>({colourPaint:captureColourResource({width:1024,height:1024,binding:'a'.repeat(64),pixels:Uint8Array.from({length:4*1024*1024},(_,i)=>i%4===3?255:n)})}));assert.throws(()=>q.painter.baseToLayer(),/MiB/);assert.equal(q.target().colourPaint,old);extras=[];q.target().locked=true;assert.equal(q.painter.baseToLayer(),false);assert.equal(q.target().colourPaint,old);assert(!q.painter.active);
});
test('1066 actual UI exposes Base to Layer only for Base, selects maskable result and keeps the command blocked at full capacity',async()=>{
 const r=await painted();r.painter.close();const u=uiRuntime(r),n=k=>u.nodes.get('paint-'+k);await u.api.open();assert(!n('base-to-layer').hidden);assert(!n('base-to-layer').disabled);const before=r.target().colourPaint.pixels.slice(),history=r.h.undoStack.length;await n('base-to-layer').click();assert(n('base-to-layer').hidden);assert(!n('add-mask').disabled);assert.equal(n('layer-settings').hidden,false);assert.deepEqual(r.target().colourPaint.pixels,before);assert.equal(r.h.undoStack.length,history+1);await n('add-mask').click();assert.equal(n('paint-target').value,'mask');
 await n('add-layer').click();await n('add-layer').click();n('layer').value='$base';n('layer').dispatchEvent({type:'change'});assert(!n('base-to-layer').hidden);assert(n('base-to-layer').disabled);assert.match(n('base-to-layer').title,/three overlays/);u.api.close();
});
test('1066 staged image placement is retained when Base conversion is requested; cancellation then permits lifting',async()=>{
 const pixels=new Uint8Array(16*16*4).fill(255),source={version:1,mime:'image/png',width:16,height:16,rowOrder:'image-top-first',colourSpace:'srgb',alpha:'straight',pixels,encoded:await encodeNomadColourPNG(pixels,16,16)},r=await painted();r.painter.close();const u=uiRuntime(r,{imageImport:async()=>source}),n=k=>u.nodes.get('paint-'+k);await u.api.open();const old=r.target().colourPaint,history=r.h.undoStack.length;n('image-file').files=[{name:'source.png',size:source.encoded.length,arrayBuffer:async()=>source.encoded.buffer}];await n('image-file').listeners.get('change')[0]({});await n('base-to-layer').click();assert.match(u.nodes.get('selectionStatus').textContent,/Apply or cancel/);assert.equal(n('image-controls').hidden,false);assert.equal(r.target().colourPaint,old);assert.equal(r.h.undoStack.length,history);await n('cancel-image').click();await n('base-to-layer').click();assert.notEqual(r.target().colourPaint,old);assert.equal(r.h.undoStack.length,history+1);u.api.close();
});
