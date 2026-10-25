import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createPaintLayer,brushSettings} from '../evaluations/uv-paint/paint-core.js';
import {viewportPaintRuntime as runtime,viewportPaintUIRuntime as uiRuntime} from './helpers/viewport-paint-runtime.mjs';
import {EditableMesh} from '../src/mesh.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {buildNomadProjectWithMaps} from '../src/nomad-packed-maps.js';
import {readNomadProject} from '../src/nomad-export-core.js';
import {inspectPNG} from './helpers/png-inspect.mjs';
const brush=brushSettings({colour:'#00ff00',hardness:1,pressure:false,radius:3});
const labels=new Int32Array(32*32);
function split(alpha=false){const data=new Uint8Array(32*32*4);for(let y=0;y<32;y++)for(let x=0;x<32;x++)data.set(x<16?[255,0,0,255]:alpha?[0,0,255,0]:[0,0,255,255],(x+y*32)*4);return data;}
function drag(l,opacity=1,domain=labels){l.begin({...brush,opacity},{filter:{domains:domain},smudge:true});assert(!l.stamp(14/31,16/31,1,0));assert(l.stamp(18/31,16/31,1,0));}
test('941 Smudge carries a tip-local patch with exact opacity and premultiplied alpha; tap/repeated position is no-op and cancel restores owned source',()=>{
 for(const opacity of [1,.5]){const l=createPaintLayer(32),source=split();l.restore(source);drag(l,opacity);const at=(18+16*32)*4;assert.deepEqual([...l.pixels.slice(at,at+4)],opacity===1?[191,0,64,255]:[96,0,159,255]);const moved=l.pixels.slice();assert(!l.stamp(18/31,16/31,1,0));assert.deepEqual(l.pixels,moved);l.finish(true);assert.deepEqual(l.pixels,source);assert.deepEqual(source,split());l.begin(brush,{filter:{domains:labels},smudge:true});l.stamp(.5,.5,1,0);assert(!l.finish());l.dispose();}
 const l=createPaintLayer(32,{transparent:true});l.restore(split(true));drag(l);const at=(18+16*32)*4;assert.deepEqual([...l.pixels.slice(at,at+4)],[255,0,0,191]);assert(l.finish());l.dispose();
});
test('941 adjacent UV faces cannot supply colour, pickup resets on a new face or miss, and alpha tips/raw grayscale retain their original semantics',()=>{
 const domain=labels.slice();for(let y=0;y<32;y++)for(let x=16;x<32;x++)domain[x+y*32]=1;
 const l=createPaintLayer(32),source=split();l.restore(source);l.begin(brush,{filter:{domains:domain},smudge:true});domain.fill(0);assert(!l.stamp(14/31,16/31,1,0));assert(!l.stamp(18/31,16/31,1,1));assert(!l.stamp(19/31,16/31,1,1));assert(!l.finish());assert.deepEqual(l.pixels,source);
 l.begin(brush,{filter:{domains:labels},smudge:true});l.stamp(14/31,16/31,1,0);l.resetPickup();assert(!l.stamp(18/31,16/31,1,0));assert(!l.finish());
 const grey=source.slice();for(let i=0;i<grey.length;i+=4)grey[i]=grey[i+1]=grey[i+2]=source[i];l.restore(grey);drag(l);const at=(18+16*32)*4;assert.deepEqual([...l.pixels.slice(at,at+4)],[191,191,191,255]);l.finish(true);
 l.begin({...brush,alphaTip:{version:1,width:1,height:1,pixels:new Uint8Array([0])}},{filter:{domains:labels},smudge:true});l.stamp(14/31,16/31,1,0);assert(!l.stamp(18/31,16/31,1,0));assert(!l.finish());assert.deepEqual(l.pixels,grey);l.dispose();
 assert.throws(()=>createPaintLayer(32).begin(brush,{smudge:true}),/ownership/);
});
const node=(u,k)=>u.nodes.get('paint-'+k),change=(u,k,value)=>{node(u,k).value=value;node(u,k).dispatchEvent({type:'change'});};
function paint(u){u.emit('pointerdown');u.emit('pointerup');}
function smear(u){u.emit('pointerdown');u.emit('pointermove',{clientX:480});u.emit('pointerup',{clientX:480});}
async function wait(u){for(let i=0;i<500&&!u.api.active;i++)await new Promise(r=>setTimeout(r,10));assert(u.api.active);}
test('941 actual UI Smudge moves selected-layer pixels, keeps Paint/tool through UndoRedo, SaveOpen and exact native PNG, and never samples lower layers',async()=>{
 const r=runtime(),u=uiRuntime(r);await u.api.open();node(u,'pressure').checked=false;node(u,'hardness').value='1';node(u,'radius').value='12';node(u,'colour').value='#ff0000';paint(u);const base=r.target().colourPaint;
 await node(u,'add-layer').click();node(u,'colour').value='#0000ff';paint(u);const before=r.target().colourPaint,n=r.h.undoStack.length;change(u,'paint-action','smudge');assert(node(u,'colour').disabled);assert(node(u,'blur-controls').hidden);assert.match(u.nodes.get('selectionStatus').textContent,/within a face/);smear(u);const after=r.target().colourPaint;assert.notEqual(after,before);assert.equal(r.h.undoStack.length,n+1);assert.deepEqual(after.layers.base.pixels,base.pixels);assert.deepEqual(before.layers.base.pixels,base.pixels);assert.notDeepEqual(after.layers.layers[0].pixels,before.layers.layers[0].pixels);for(let i=0;i<after.layers.layers[0].pixels.length;i+=4)assert.equal(after.layers.layers[0].pixels[i],0);
 const undo=u.api.beforeHistory();assert(r.h.undo(r.live));undo();await wait(u);assert.equal(r.target().colourPaint,before);assert.equal(node(u,'paint-action').value,'smudge');const redo=u.api.beforeHistory();assert(r.h.redo(r.live));redo();await wait(u);assert.equal(r.target().colourPaint,after);assert(u.api.active);u.api.close();
 const decoded=decodeBoxlabScene(JSON.parse(JSON.stringify(encodeBoxlabScene(r.c.__boxlabObjectHistory.capture()))),(...a)=>new EditableMesh(...a));assert.deepEqual(decoded.objects.find(o=>o.id===3).colourPaint.pixels,after.pixels);
 const result=await buildNomadProjectWithMaps([r.target()],fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url)),{topologySignature:r.owner.topologySignature}),nom=readNomadProject(result.bytes),m=nom.json.materials[nom.json.meshes[0].material],im=nom.json.images[m.textures.color.index];assert.deepEqual(inspectPNG(nom.bin.slice(im.offset,im.offset+im.length)).rgba,after.pixels);
});
const p={x:450,y:300,width:900,height:600,pressure:1},end={...p,x:480};
test('941 scalar/mask Smudge is independent, uses original checkpoint/COW and rolls back cancellation, misses and checkpoint refusal',async()=>{
 let allow=true;const r=runtime({checkpoint:()=>allow});await r.painter.open();const paintValue=value=>{r.painter.begin(p,brush,'boxlab',value,value,value);r.painter.finish(p);},smudge=()=>{r.painter.begin(p,brush,'boxlab',0,0,0,'smudge');r.painter.move(end);return r.painter.finish(end);};
 r.painter.selectPaintTarget('roughness');paintValue(0);const rough=r.target().roughnessPaint;assert(smudge());const kept=r.target().roughnessPaint;assert.notDeepEqual(kept.pixels,rough.pixels);r.painter.selectPaintTarget('metalness');paintValue(255);assert(smudge());assert.equal(r.target().roughnessPaint,kept);
 r.painter.selectPaintTarget('colour');r.painter.addLayer();r.painter.addMask();paintValue(0);const mask=r.target().colourPaint;assert(smudge());const resource=r.target().colourPaint;assert.notDeepEqual(resource.layers.layers[0].mask.pixels,mask.layers.layers[0].mask.pixels);assert.deepEqual(resource.layers.layers[0].pixels,mask.layers.layers[0].pixels);const count=r.h.undoStack.length;
 r.painter.begin(p,brush,'boxlab',0,0,0,'smudge');r.painter.move(end);r.painter.cancel();assert.equal(r.target().colourPaint,resource);assert.equal(r.h.undoStack.length,count);assert(r.controls.enabled);
 assert(!r.painter.begin({...p,x:0,y:0},brush,'boxlab',0,0,0,'smudge'));assert(r.controls.enabled);allow=false;r.painter.begin(p,{...brush,radius:20},'boxlab',0,0,0,'smudge');r.painter.move(end);assert.throws(()=>r.painter.finish(end),/checkpoint/);assert.equal(r.target().colourPaint,resource);assert.equal(r.h.undoStack.length,count);assert(r.controls.enabled);r.painter.close();
});
test('941 965 work guard bounds long Smudge contacts, preserves prefix on lift and retains explicit cancellation',async()=>{
 const l=createPaintLayer(32);l.restore(split());l.begin({...brush,radius:48},{filter:{domains:labels},smudge:true});l.stamp(14/31,.5,1,0);for(let i=0;i<2000;i++)l.stamp((i%2?18:14)/31,.5,1,0);assert(l.limited);const prefix=l.pixels.slice();l.stamp(.8,.5,1,0);assert.deepEqual(l.pixels,prefix);l.finish(true);assert.deepEqual(l.pixels,split());l.dispose();
 const r=runtime(),u=uiRuntime(r);await u.api.open();node(u,'pressure').checked=false;node(u,'radius').value='48';paint(u);const resource=r.target().colourPaint,count=r.h.undoStack.length;change(u,'paint-action','smudge');u.emit('pointerdown');for(let i=0;i<100;i++)u.emit('pointermove',{clientX:i%2?480:420});assert.match(u.nodes.get('selectionStatus').textContent,/limit/);assert.equal(r.target().colourPaint,resource);assert.equal(r.h.undoStack.length,count);assert(!r.controls.enabled);u.emit('pointerup',{clientX:480});assert.notEqual(r.target().colourPaint,resource);assert.equal(r.h.undoStack.length,count+1);assert(r.controls.enabled);assert.equal(u.nodes.get('viewport').capture,null);assert(u.api.active);change(u,'paint-action','paint');paint(u);assert(u.api.active);u.api.close();
});
test('941 real surface-picked Smudge is invariant to event subdivision, refuses invalid UV ownership before navigation/history changes',async()=>{
 const outputs=[];
 for(const subdivide of [false,true]){const r=runtime();await r.painter.open();r.painter.begin(p,{...brush,radius:12});r.painter.finish(p);r.painter.begin(p,brush,'boxlab',0,0,0,'smudge');if(subdivide)for(let x=452;x<480;x+=2)r.painter.move({...p,x});r.painter.move(end);assert(r.painter.finish(end));outputs.push(r.target().colourPaint.pixels);r.painter.close();}
 assert.deepEqual(outputs[0],outputs[1]);
 const r=runtime();r.target().glbPassthrough={...r.target().glbPassthrough,uvCorners:r.target().mesh.faces.map(()=>[[0,0],[1,0],[1,1],[0,1]])};await r.painter.open();const count=r.h.undoStack.length;assert.throws(()=>r.painter.begin(p,brush,'boxlab',0,0,0,'smudge'),/Overlapping/);assert(r.controls.enabled);assert(r.painter.active);assert.equal(r.h.undoStack.length,count);assert.equal(r.target().colourPaint,undefined);r.painter.close();
});
