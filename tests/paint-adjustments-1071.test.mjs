import test from 'node:test';import assert from 'node:assert/strict';
import {createPaintAdjustments,PAINT_ADJUSTMENTS,paintAdjustmentSettings} from '../src/paint-adjustments.js';
import {createPaintLayer,filterPaintPixels} from '../evaluations/uv-paint/paint-core.js';
import {viewportPaintRuntime as runtime,viewportPaintUIRuntime as uiRuntime} from './helpers/viewport-paint-runtime.mjs';
import {encodeNomadColourPNG} from '../src/nomad-scalar-png.js';
import {surfaceImagePlacement} from '../src/paint-image-surface.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';import {EditableMesh} from '../src/mesh.js';
const size=16,p={x:450,y:300,width:900,height:600,pressure:1},brush={colour:'#a06030',radius:12,opacity:1,pressure:false,hardness:1};
function sample(){const pixels=new Uint8Array(size*size*4);for(let i=0;i<pixels.length;i+=4)pixels.set([30+(i/4%16)*12,50+(i/64|0)*8,80+(i/4%7)*12,i%28?160:0],i);return pixels;}
const filter=()=>({domains:new Int32Array(size*size)});
test('1071 every requested slider has bounded defaults and a measurable independent effect; neutral/reset is exact and non-cumulative',()=>{
 const pixels=sample(),original=pixels.slice(),engine=createPaintAdjustments({pixels,size,filter});assert.equal(PAINT_ADJUSTMENTS.length,14);assert.deepEqual(engine.render(),original);assert(!PAINT_ADJUSTMENTS.some(([key])=>key==='auto'));assert.throws(()=>paintAdjustmentSettings({auto:50}));
 for(const [key,,min,max]of PAINT_ADJUSTMENTS){const result=engine.render({[key]:key==='exposure'?1:70});assert.notDeepEqual(result,original,key);for(let i=3;i<result.length;i+=4)assert.equal(result[i],original[i],key+' alpha');assert.deepEqual(engine.render({[key]:key==='exposure'?1:70}),result);assert.throws(()=>paintAdjustmentSettings({[key]:max+1}));assert.throws(()=>paintAdjustmentSettings({[key]:min-1}));}
 assert.deepEqual(engine.render(),original);assert.deepEqual(pixels,original);assert.throws(()=>paintAdjustmentSettings({unknown:1}));assert.throws(()=>paintAdjustmentSettings({exposure:NaN}));
 const grey=engine.render({saturation:-100});for(let i=0;i<grey.length;i+=4)if(grey[i+3])assert.equal(grey[i],grey[i+1]),assert.equal(grey[i+1],grey[i+2]);
});
test('1071 whole-layer filters preserve alpha/hidden RGB and never mix disconnected atlas domains',()=>{
 const pixels=new Uint8Array(size*size*4),domains=new Int32Array(size*size);for(let y=0;y<size;y++)for(let x=0;x<size;x++){const at=y*size+x;domains[at]=x<8?0:1;pixels.set(x<8?[80,30,10,128]:[10,40,80,255],at*4);}
 const engine=createPaintAdjustments({pixels,size,filter:()=>({domains})});for(const values of [{blur:100},{sharpness:100},{definition:100}])assert.deepEqual(engine.render(values),pixels);
 pixels.set([255,0,255,0],0);const result=createPaintAdjustments({pixels,size,filter:()=>({domains})}).render({blur:100,sharpness:100,exposure:1});assert.deepEqual(result.slice(0,4),pixels.slice(0,4));for(let i=3;i<result.length;i+=4)assert.equal(result[i],pixels[i]);
});
test('1071 original brush Sharpen increases local detail, preserves coverage, stroke cancellation and scalar equal-RGB semantics',()=>{
 const pixels=new Uint8Array(size*size*4);for(let y=0;y<size;y++)for(let x=0;x<size;x++)pixels.set([x<8?80:160,x<8?80:160,x<8?80:160,128],(y*size+x)*4);
 const layer=createPaintLayer(size,{transparent:true});layer.restore(pixels);layer.begin(brush,{filter:{...filter(),amount:8,sharpen:true}});assert(layer.stamp(7/15,8/15,1,0));assert(layer.pixels[(8*16+7)*4]<80);assert(layer.pixels[(8*16+8)*4]>160);for(let i=0;i<pixels.length;i+=4){assert.equal(layer.pixels[i],layer.pixels[i+1]);assert.equal(layer.pixels[i+1],layer.pixels[i+2]);assert.equal(layer.pixels[i+3],pixels[i+3]);}layer.finish(true);assert.deepEqual(layer.pixels,pixels);layer.dispose();assert.throws(()=>filterPaintPixels(pixels,size,{domains:new Int32Array(1)}));
});
async function painted(options={}){const r=runtime(options);await r.painter.open();r.painter.begin(p,brush,'boxlab',0,128,255,'fill');r.painter.finish();return r;}
function brighter(source){const out=source.pixels.slice();for(let i=0;i<out.length;i+=4)for(let c=0;c<3;c++)out[i+c]=Math.min(255,out[i+c]+20);return out;}
test('1071 actual selected-layer preview/cancel/apply uses one history step and preserves other layers/masks/scalars; Save/Open and Undo/Redo retain pixels',async()=>{
 const r=await painted();r.painter.addLayer();r.painter.begin(p,brush,'boxlab',0,128,255,'fill');r.painter.finish();r.painter.addMask();r.painter.selectPaintTarget('colour');const old=r.target().colourPaint,n=r.h.undoStack.length,preview=r.painter.pixels.slice(),source=r.painter.beginAdjustment(),pixels=brighter(source);
 assert(source.preview(pixels));assert.equal(r.target().colourPaint,old);assert.equal(r.h.undoStack.length,n);assert.notDeepEqual(r.painter.pixels,preview);source.cancel();assert.deepEqual(r.painter.pixels,preview);source.preview(pixels);assert(source.apply());assert.equal(r.h.undoStack.length,n+1);const next=r.target().colourPaint;assert.deepEqual(next.layers.base,old.layers.base);assert.deepEqual(next.layers.layers[0].mask,old.layers.layers[0].mask);assert.deepEqual(next.layers.layers[0].pixels,pixels);
 const saved=encodeBoxlabScene(r.c.__boxlabObjectHistory.capture()),opened=decodeBoxlabScene(JSON.parse(JSON.stringify(saved)),(...a)=>new EditableMesh(...a));assert.deepEqual(opened.objects.find(o=>o.id===3).colourPaint,next);
 r.painter.close();r.h.undo(r.c.__boxlabBridgeState.mesh);assert.deepEqual(r.target().colourPaint,old);r.h.redo(r.c.__boxlabBridgeState.mesh);assert.deepEqual(r.target().colourPaint,next);
});
test('1071 identity, stale source and failed checkpoint refuse atomically and can retry',async()=>{
 let allow=true;const r=await painted({checkpoint:()=>allow}),old=r.target().colourPaint,source=r.painter.beginAdjustment();assert.equal(source.preview(source.pixels),false);assert.equal(source.apply(),false);source.preview(brighter(source));allow=false;assert.throws(()=>source.apply(),/checkpoint/);assert.equal(r.target().colourPaint,old);allow=true;assert(source.apply());
 const stale=r.painter.beginAdjustment();r.painter.addLayer();assert.throws(()=>stale.preview(brighter(stale)),/changed/);r.painter.close();assert.throws(()=>stale.apply(),/changed/);
});
test('1071 retained image is converted only on Apply; Cancel retains recipe and one Undo restores image editing',async()=>{
 const r=await painted(),pixels=sample().map((v,i)=>i%4===3?255:v),encoded=await encodeNomadColourPNG(pixels,size,size),image={version:1,mime:'image/png',width:size,height:size,rowOrder:'image-top-first',colourSpace:'srgb',alpha:'straight',encoded,pixels};r.painter.previewImage(image,surfaceImagePlacement(r.painter.surfaceFrame(p,image)));r.painter.applyImagePreview();const old=r.target().colourPaint,n=r.h.undoStack.length,source=r.painter.beginAdjustment();assert(source.image);source.preview(brighter(source));assert(r.target().colourPaint.layers.layers[0].image);source.cancel();assert.equal(r.target().colourPaint,old);source.preview(brighter(source));source.apply();assert.equal(r.h.undoStack.length,n+1);assert.equal(r.target().colourPaint.layers.layers[0].image,null);r.painter.close();r.h.undo(r.c.__boxlabBridgeState.mesh);assert.deepEqual(r.target().colourPaint,old);
});
test('1071 actual Paint UI exposes Sharpen with shared channel controls and Adjust layer via the selected layer settings',async()=>{
 const r=runtime(),u=uiRuntime(r);await u.api.open();await u.nodes.get('paint-tool-sharpen').click();assert.equal(u.nodes.get('paint-paint-action').value,'sharpen');assert.equal(u.nodes.get('paint-filter-label').textContent,'Sharpen amount');assert.equal(u.nodes.get('paint-blur-controls').hidden,false);assert.equal(u.nodes.get('paint-multi-channel-controls').hidden,false);assert.equal(u.nodes.get('paint-adjust-layer').disabled,false);u.api.close();
});

test('1071 actual Sharpen stroke commits Colour/Roughness/Metalness together with one Undo entry',async()=>{
 const r=await painted();r.painter.setMultiPaintChannels(['roughness','metalness']);r.painter.begin(p,{...brush,colour:'#806040'},'boxlab',0,100,160,'paint');r.painter.finish();const old=r.target().colourPaint,rough=r.target().roughnessPaint,metal=r.target().metalnessPaint,n=r.h.undoStack.length;r.painter.begin(p,{...brush,radius:24,blurAmount:8},'boxlab',0,100,160,'sharpen');assert(r.painter.finish());assert.equal(r.h.undoStack.length,n+1);assert.notDeepEqual(r.target().colourPaint.pixels,old.pixels);assert.notDeepEqual(r.target().roughnessPaint.pixels,rough.pixels);assert.notDeepEqual(r.target().metalnessPaint.pixels,metal.pixels);r.painter.close();r.h.undo(r.c.__boxlabBridgeState.mesh);assert.deepEqual(r.target().colourPaint,old);assert.deepEqual(r.target().roughnessPaint,rough);assert.deepEqual(r.target().metalnessPaint,metal);
});
