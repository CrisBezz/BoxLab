import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {EditableMesh} from '../src/mesh.js';
import {glbOwnerRuntime,decodeGLB} from './helpers/glb-owner-runtime.mjs';
import {viewportPaintRuntime as runtime,viewportPaintUIRuntime as uiRuntime} from './helpers/viewport-paint-runtime.mjs';
import {createPaintAOPixels} from '../src/paint-ao-layer.js';
import {createPaintFilterDomain} from '../src/paint-filter-domain.js';
import {captureColourResource} from '../src/paint-resource.js';
import {paintTargetKey,paintTargetDigest} from '../src/paint-target.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {buildNomadProjectWithMaps} from '../src/nomad-packed-maps.js';import {readNomadProject} from '../src/nomad-export-core.js';
import {inspectPNG} from './helpers/png-inspect.mjs';
import {encodeNomadColourPNG} from '../src/nomad-scalar-png.js';
import {surfaceImagePlacement} from '../src/paint-image-surface.js';
const owner=glbOwnerRuntime().c,node=(u,k)=>u.nodes.get('paint-'+k),p={x:450,y:300,width:900,height:600,pressure:1};
function fixture(count=2){
 const vertices=[],faces=[],uvCorners=[];
 for(let i=0;i<count;i++){
  const id=vertices.length;vertices.push([0,0,i*.1],[1,0,i*.1],[1,1,i*.1],[0,1,i*.1]);faces.push([id,id+1,id+2,id+3]);
  if(count===2){const x=.05+i*.5;uvCorners.push([[x,.05],[x+.4,.05],[x+.4,.45],[x,.45]]);}
  else{const x=i%16/16,y=Math.floor(i/16)/8;uvCorners.push([[x+.002,y+.002],[x+.0605,y+.002],[x+.0605,y+.123],[x+.002,y+.123]]);}
 }
 const mesh=new EditableMesh(vertices,faces),payload={source:'boxlab',version:1,uvTopologySignature:owner.topologySignature(mesh),uvCorners},geometry=owner.buildUVPreviewGeometry(mesh,payload,{faceIndices:true});return{mesh,payload,geometry,topologySignature:owner.topologySignature};
}
async function setup(options={},count=2){const r=runtime(options),f=fixture(count);r.c.replaceMeshInPlace(r.live,f.mesh);r.target().glbPassthrough=f.payload;r.target().booleanRecipe=undefined;f.geometry.dispose();return r;}
const wait=async u=>{for(let i=0;i<500&&!u.api.active;i++)await new Promise(r=>setTimeout(r,10));assert(u.api.active);};
test('944 AO transfer keeps unrelated faces white and gaps transparent at512/1024, with same-face normalized coverage and owned pixels',()=>{
 const f=fixture(),before=JSON.stringify({mesh:f.mesh,payload:f.payload,geometry:f.geometry.toJSON()});
 for(const size of [512,1024]){const a=createPaintAOPixels({...f,size}),d=createPaintFilterDomain(f.geometry,size);let shaded=0,roof=0;
  for(let i=0;i<d.labels.length;i++){const at=i*4;if(d.labels[i]<0)assert.equal(a[at+3],0);if(a[at+3]){assert.equal(a[at],a[at+1]);assert.equal(a[at],a[at+2]);if(d.labels[i]===0&&a[at]<128)shaded++;if(d.labels[i]===1){assert.equal(a[at],255);roof++;}}}assert(shaded>100);assert(roof>100);
  const b=createPaintAOPixels({...f,size});assert.deepEqual(a,b);a.fill(0);assert(b.some(v=>v));
 }
 assert.equal(JSON.stringify({mesh:f.mesh,payload:f.payload,geometry:f.geometry.toJSON()}),before);f.geometry.dispose();
});
test('944 actual painter preview is transient, Cancel restores pixels/history, Apply creates one selected editable Multiply layer and keeps source/scalars',async()=>{
 const r=await setup();await r.painter.open();r.painter.selectPaintTarget('roughness');r.painter.begin(p,{colour:'#ff0000',radius:8,opacity:1,pressure:false},'boxlab',0,0);r.painter.finish(p);const rough=r.target().roughnessPaint;r.painter.selectPaintTarget('colour');
 r.painter.addLayer();const original=r.target().colourPaint,peer={colourPaint:original},n=r.h.undoStack.length,before=original.pixels.slice();assert(r.painter.previewAO({strength:.5}));assert(r.painter.state.aoPreview);assert.equal(r.target().colourPaint,original);assert.equal(r.h.undoStack.length,n);assert.notDeepEqual(r.painter.pixels,before);assert.equal(encodeBoxlabScene(r.c.__boxlabObjectHistory.capture()).objects.length,r.manager.objects.length);
 assert.throws(()=>r.painter.begin(p,{}),/Apply or cancel AO/);assert.throws(()=>r.painter.selectLayer('$base'),/Apply or cancel AO/);assert(r.painter.cancelAO());assert.deepEqual(r.painter.pixels,before);assert(!r.painter.applyAO());assert.equal(r.h.undoStack.length,n);
 r.painter.previewAO({strength:.5});const candidate=r.painter.pixels.slice();assert(r.painter.applyAO());const resource=r.target().colourPaint,layer=resource.layers.layers.at(-1);assert.equal(layer.id,r.painter.state.selected);assert.equal(layer.blendMode,'multiply');assert.equal(layer.opacity,.5);assert.equal(layer.image,undefined);assert.deepEqual(resource.pixels,candidate);assert.equal(r.h.undoStack.length,n+1);assert.equal(peer.colourPaint,original);assert.deepEqual(original.pixels,before);assert.equal(r.target().roughnessPaint,rough);
 r.painter.editLayer({visible:false});assert.deepEqual(r.target().colourPaint.pixels,before);r.painter.editLayer({visible:true});assert.deepEqual(r.target().colourPaint.pixels,candidate);r.painter.close();
});
test('944 actual1024 UI Bake Cancel Apply, Paint UndoRedo and SaveOpen retain editable AO and exact native/GLB flattened colour',async()=>{
 const r=await setup(),u=uiRuntime(r);await u.api.open();const original=r.target().colourPaint,n=r.h.undoStack.length;await node(u,'bake-ao').click();assert(!node(u,'apply-ao').hidden);assert(node(u,'channel').disabled);assert.equal(r.target().colourPaint,original);assert.equal(r.h.undoStack.length,n);await node(u,'cancel-ao').click();assert(node(u,'apply-ao').hidden);assert(!node(u,'channel').disabled);assert(!node(u,'preview').disabled);assert(!node(u,'paint-action').disabled);
 await node(u,'bake-ao').click();await node(u,'apply-ao').click();const baked=r.target().colourPaint;assert(baked);assert.equal(baked.width,1024);assert.equal(node(u,'layer').value,'ao1');assert.equal(node(u,'layer-blend').value,'multiply');assert.equal(r.h.undoStack.length,n+1);assert(u.api.active);
 const undo=u.api.beforeHistory();assert(r.h.undo(r.live));undo();await wait(u);assert.equal(r.target().colourPaint,original);const redo=u.api.beforeHistory();assert(r.h.redo(r.live));redo();await wait(u);assert.equal(r.target().colourPaint,baked);assert.equal(node(u,'layer').value,'$base');node(u,'layer').value='ao1';node(u,'layer').dispatchEvent({type:'change'});assert.equal(node(u,'layer-blend').value,'multiply');u.api.close();
 const saved=encodeBoxlabScene(r.c.__boxlabObjectHistory.capture()),opened=decodeBoxlabScene(JSON.parse(JSON.stringify(saved)),(...a)=>new EditableMesh(...a));assert.deepEqual(opened.objects.find(o=>o.id===3).colourPaint,baked);
 const out=await buildNomadProjectWithMaps([r.target()],fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url)),{topologySignature:r.owner.topologySignature}),nom=readNomadProject(out.bytes),m=nom.json.materials[nom.json.meshes[0].material],im=nom.json.images[m.textures.color.index];assert.deepEqual(inspectPNG(nom.bin.slice(im.offset,im.offset+im.length)).rgba,baked.pixels);
 const oldBitmap=globalThis.createImageBitmap,oldSelf=globalThis.self;globalThis.self=globalThis;globalThis.createImageBitmap=async blob=>{const d=inspectPNG(new Uint8Array(await blob.arrayBuffer()));return{width:d.width,height:d.height,close(){}};};
 try{const out=await r.owner.buildGLB([r.target()],false);assert(out.verification.pass);const {json,bin}=decodeGLB(out.buffer),bv=json.bufferViews[json.images[0].bufferView];assert.deepEqual(inspectPNG(bin.subarray(bv.byteOffset,bv.byteOffset+bv.byteLength)).rgba,baked.pixels);}finally{if(oldBitmap===undefined)delete globalThis.createImageBitmap;else globalThis.createImageBitmap=oldBitmap;if(oldSelf===undefined)delete globalThis.self;else globalThis.self=oldSelf;}
});
test('944 checkpoint/pool/stale deformation refusal preserves committed paint and history; candidate can cancel or retry safely',async()=>{
 let allow=true,extras=[];const r=await setup({checkpoint:()=>allow,objects:()=>[r.target(),...extras]});await r.painter.open();r.painter.addLayer();const original=r.target().colourPaint,n=r.h.undoStack.length;r.painter.previewAO();const preview=r.painter.pixels.slice();allow=false;assert.throws(()=>r.painter.applyAO(),/checkpoint/);assert.equal(r.target().colourPaint,original);assert(r.painter.state.aoPreview);assert.deepEqual(r.painter.pixels,preview);assert.equal(r.h.undoStack.length,n);allow=true;
 r.live.vertices[0].x+=.01;r.manager.saveActive();assert.throws(()=>r.painter.applyAO(),/Object changed/);assert(!r.painter.state.aoPreview);assert.equal(r.target().colourPaint,original);r.painter.close();await r.painter.open();
 extras=[1,2].map(c=>({colourPaint:captureColourResource({width:1024,height:1024,binding:'a'.repeat(64),pixels:Uint8Array.from({length:4*1024*1024},(_,i)=>i%4===3?255:c)})}));assert.throws(()=>r.painter.previewAO(),/8 MiB/);assert(!r.painter.state.aoPreview);assert.equal(r.target().colourPaint,original);assert(r.controls.enabled);extras=[];r.painter.previewAO();r.painter.close();assert.equal(r.target().colourPaint,original);assert.equal(r.h.undoStack.length,n);
});
test('944 scalar/mask/full stack and complex bake guards refuse atomically; UI channel/full-slot state remain accurate',async()=>{
 const r=await setup();await r.painter.open();for(const channel of ['roughness','metalness']){r.painter.selectPaintTarget(channel);assert.throws(()=>r.painter.previewAO(),/Switch to Colour/);}r.painter.selectPaintTarget('colour');r.painter.addLayer();r.painter.addMask();assert.throws(()=>r.painter.previewAO(),/Switch to Colour/);r.painter.selectPaintTarget('colour');r.painter.addLayer();r.painter.addLayer();const original=r.target().colourPaint,n=r.h.undoStack.length;assert.throws(()=>r.painter.previewAO(),/three overlays/);assert.equal(r.target().colourPaint,original);assert.equal(r.h.undoStack.length,n);r.painter.close();
 const u=uiRuntime(r);await u.api.open();assert(node(u,'bake-ao').disabled);u.api.close();const many=await setup({},128);await many.painter.open();const old=many.target().colourPaint,count=many.h.undoStack.length;assert.throws(()=>many.painter.previewAO(),/too complex/);assert.equal(many.target().colourPaint,old);assert.equal(many.h.undoStack.length,count);assert(!many.painter.state.aoPreview);assert(many.controls.enabled);many.painter.close();
});
test('944 staged image and AO previews stay separate; retained image sources survive AO, while Done discards unapplied AO without history',async()=>{
 const pixels=new Uint8Array(16*16*4).fill(255),source={version:1,mime:'image/png',width:16,height:16,rowOrder:'image-top-first',colourSpace:'srgb',alpha:'straight',encoded:await encodeNomadColourPNG(pixels,16,16),pixels};
 const r=runtime();await r.painter.open();const frame=r.painter.surfaceFrame(p,source);r.painter.previewImage(source,surfaceImagePlacement(frame),{surface:frame});const staged=r.painter.pixels.slice(),old=r.target().colourPaint,n=r.h.undoStack.length;assert.throws(()=>r.painter.previewAO(),/Apply or cancel image/);assert.deepEqual(r.painter.pixels,staged);assert.equal(r.target().colourPaint,old);assert.equal(r.h.undoStack.length,n);
 r.painter.applyImagePreview();const image=r.target().colourPaint.layers.layers[0];r.painter.previewAO();assert.throws(()=>r.painter.previewImage(source,surfaceImagePlacement(frame),{surface:frame}),/Apply or cancel AO/);r.painter.applyAO();const result=r.target().colourPaint;assert.equal(result.layers.version,3);assert.deepEqual(result.layers.layers[0],image);assert.equal(result.layers.layers[1].image,null);r.painter.close();
 const u=uiRuntime(r,{imageImport:async()=>source});await u.api.open();node(u,'image-file').files=[{name:'source.png',size:source.encoded.length,arrayBuffer:async()=>source.encoded.buffer}];await node(u,'image-file').listeners.get('change')[0]({});await node(u,'bake-ao').click();assert.match(u.nodes.get('selectionStatus').textContent,/Apply or cancel image/);assert(!node(u,'image-controls').hidden);assert.equal(r.target().colourPaint,result);await node(u,'cancel-image').click();const history=r.h.undoStack.length;await node(u,'bake-ao').click();assert(!node(u,'apply-ao').hidden);u.emit('pointerdown');u.emit('pointerup');assert(!node(u,'apply-ao').hidden);assert.equal(r.target().colourPaint,result);await node(u,'done').click();assert(!u.api.active);assert.equal(r.target().colourPaint,result);assert.equal(r.h.undoStack.length,history);assert(r.controls.enabled);
});
