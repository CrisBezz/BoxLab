import test from 'node:test';
import assert from 'node:assert/strict';
import {viewportPaintRuntime as runtime,viewportPaintUIRuntime as uiRuntime} from './helpers/viewport-paint-runtime.mjs';
import {createPaintLayer,brushSettings} from '../evaluations/uv-paint/paint-core.js';

const brush={colour:'#e34b37',radius:12,hardness:1,opacity:1,pressure:false};
const point={x:450,y:300,width:900,height:600,pressure:1};
test('1045 Colour, Roughness and Metalness can share one dab and one undo checkpoint',async()=>{
 const r=runtime();await r.painter.open();assert(r.painter.setMultiPaintChannels(['roughness','metalness']));
 const before=r.h.undoStack.length;assert(r.painter.begin(point,brush,'boxlab',0,64,220));assert(r.painter.finish(point));
 const colour=r.target().colourPaint,rough=r.target().roughnessPaint,metal=r.target().metalnessPaint;
 assert(colour&&rough&&metal);assert.equal(r.h.undoStack.length,before+1);
 const changed=(bytes,baseline)=>bytes.some((n,i)=>n!==baseline[i]);
 assert(changed(colour.pixels,new Uint8Array(colour.pixels.length).fill(255)));
 assert.equal(rough.width,512);assert.equal(metal.width,512);
 assert(r.h.undo(r.live));assert.equal(r.target().colourPaint,undefined);assert.equal(r.target().roughnessPaint,undefined);assert.equal(r.target().metalnessPaint,undefined);
 r.painter.close();
});
test('1045 Brush radial opens Material & Paint directly; quick radial controls are tool-specific',async()=>{
 const r=runtime(),u=uiRuntime(r);await u.api.open();const n=k=>u.nodes.get('paint-'+k);
 await n('tool-paint').click();assert.equal(u.api.paletteState,'material');assert.equal(n('material-body').hidden,false);assert.equal(n('quick-body').hidden,true);
 n('multi-roughness').checked=true;n('multi-roughness').dispatchEvent({type:'change'});n('multi-metalness').checked=true;n('multi-metalness').dispatchEvent({type:'change'});assert.equal(n('multi-roughness').checked,true);assert.equal(n('multi-metalness').checked,true);const history=r.h.undoStack.length;u.emit('pointerdown');u.emit('pointerup');assert(r.target().colourPaint);assert(r.target().roughnessPaint);assert(r.target().metalnessPaint);assert.equal(r.h.undoStack.length,history+1);
 await n('show-tools').click();await n('tool-blur').click();assert.equal(u.api.paletteState,'controls');assert.equal(n('blur-controls').hidden,false);assert.equal(n('fill-controls').hidden,true);assert.equal(n('size-control').hidden,false);
 await n('show-tools').click();await n('tool-fill').click();assert.equal(n('fill-controls').hidden,false);assert.equal(n('blur-controls').hidden,true);assert.equal(n('size-control').hidden,true);
 u.api.close();
});
test('1045 Paint leaves background Pencil contacts to viewport navigation',async()=>{
 const r=runtime(),u=uiRuntime(r);await u.api.open();const e=u.emit('pointerdown',{clientX:0,clientY:0,pointerType:'pen',pressure:.8});assert.equal(e.prevented,undefined);assert.equal(e.stopped,undefined);assert.equal(r.controls.enabled,true);assert.equal(r.painter.drawing,false);u.api.close();
});
test('1045 scalar channel selection stays in Lit mode and normal Paint exit refreshes the surface',async()=>{
 let refreshes=0;const r=runtime({refresh:()=>refreshes++});await r.painter.open();r.painter.selectPaintTarget('roughness');assert.equal(r.painter.state.previewMode,'material');r.painter.selectPreviewMode('material');r.painter.close();assert(refreshes>0);assert.equal(r.controls.enabled,true);
});
test('1045 Smudge drags a mixed reservoir forward and blends again on the next surface sample',()=>{
 const size=32,pixels=new Uint8Array(size*size*4),faces=new Int32Array(size*size);for(let y=0;y<size;y++)for(let x=0;x<size;x++)pixels.set(x<16?[255,0,0,255]:[0,0,255,255],(x+y*size)*4);
 const layer=createPaintLayer(size);layer.restore(pixels);layer.begin(brushSettings({colour:'#00ff00',radius:3,hardness:1,pressure:false}),{filter:{domains:faces},smudge:true});
 for(const x of [14,18,22])layer.stamp(x/(size-1),16/(size-1),1,0);
 assert.deepEqual([...layer.pixels.slice((18+16*size)*4,(18+16*size)*4+4)],[128,0,128,255]);
 assert.deepEqual([...layer.pixels.slice((22+16*size)*4,(22+16*size)*4+4)],[64,0,191,255]);layer.finish(true);layer.dispose();
});
