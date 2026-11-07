import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {viewportPaintRuntime as runtime,viewportPaintUIRuntime as uiRuntime} from './helpers/viewport-paint-runtime.mjs';
import {captureOpacityResource} from '../src/opacity-resource.js';
import {createCommittedPaintSurface,paintTargetDigest,paintTargetKey} from '../src/paint-target.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {EditableMesh} from '../src/mesh.js';

const p=(x=450)=>({x,y:300,width:900,height:600,pressure:1});
const brush={colour:'#ffffff',radius:18,hardness:1,opacity:1,pressure:false};
function draw(r,value,action='paint'){
 const h=r.painter.hit(p()),index=Math.round(h.uv.x*511)+Math.round(h.uv.y*511)*512;
 assert(r.painter.begin(p(),brush,'boxlab',0,255,0,action,value));
 r.painter.move(p(475));r.painter.finish();return index;
}

test('1075 primary opacity paints an independent linear R8 map, preserves colour, and undoes/redoes through scene history',async()=>{
 const r=runtime();await r.painter.open();const colour=r.target().colourPaint,n=r.h.undoStack.length;
 r.painter.selectPaintTarget('opacity');const index=draw(r,0);assert.equal(r.target().opacityPaint.pixels[index],0);assert.equal(r.target().opacityPaint.pixels[0],255);
 assert.equal(r.target().opacityPaint.colorSpace,'linear');assert.equal(r.target().opacityPaint.channel,'opacity');assert.equal(r.target().colourPaint,colour);assert.equal(r.h.undoStack.length,n+1);
 assert(r.h.undo(r.c.__boxlabBridgeState.mesh));assert.equal(r.target().opacityPaint,undefined);
 assert(r.h.redo(r.c.__boxlabBridgeState.mesh));assert.equal(r.target().opacityPaint.pixels[index],0);r.painter.close();
});

test('1075 channel UI exposes opacity value and previews it as transparency after Done',async()=>{
 const r=runtime(),ui=uiRuntime(r);await ui.api.open();const channel=ui.nodes.get('paint-channel');channel.value='opacity';channel.dispatchEvent({type:'change'});
 const value=ui.nodes.get('paint-opacity-value');assert.equal(value.hidden,false);value.value='0';value.dispatchEvent({type:'input'});
 for(const tool of ['fill','erase','smudge','blur']){await ui.nodes.get('paint-tool-'+tool).click();assert.equal(ui.nodes.get('paint-opacity-controls').hidden,false,tool+' keeps opacity value available');}await ui.nodes.get('paint-tool-paint').click();
 ui.emit('pointerdown');ui.emit('pointermove',{clientX:475});ui.emit('pointerup');const resource=r.target().opacityPaint;assert(resource?.pixels.includes(0));
 const displays=[];ui.c.__boxlabRenderModes.apply=body=>{const d=createCommittedPaintSurface(body,r.target(),r.target().mesh,r.owner);if(d)displays.push(d);};
 await ui.nodes.get('paint-done').click();await Promise.all(displays.map(d=>d.ready));
 const surface=r.body.children.find(c=>c.userData.boxlabColourPaintDispose);assert(surface);const m=surface.material;
 assert(m.isMeshStandardMaterial);assert.equal(m.transparent,true);assert.equal(m.depthWrite,false);assert(m.alphaMap);assert.equal(m.alphaMap.colorSpace,THREE.NoColorSpace);
 const green=Array.from(m.alphaMap.image.data).filter((_,i)=>i%4===1);assert(green.includes(0));assert(green.includes(255));assert.equal(r.target().colourPaint,undefined);
 displays.forEach(d=>d.dispose());
});

test('1075 project v8 stores and restores exact opacity bytes and rejects malformed opacity resources',async()=>{
 const r=runtime();await r.painter.open();r.painter.selectPaintTarget('opacity');draw(r,37);r.painter.close();
 const bytes=r.target().opacityPaint.pixels.slice(),encoded=encodeBoxlabScene(r.c.__boxlabObjectHistory.capture());assert.equal(encoded.version,8);assert.equal(encoded.opacityBaseVersion,1);
 const decoded=decodeBoxlabScene(JSON.parse(JSON.stringify(encoded)),(...args)=>new EditableMesh(...args));assert.deepEqual(decoded.objects.find(o=>o.id===r.target().id).opacityPaint.pixels,bytes);
 assert.deepEqual(JSON.parse(JSON.stringify(encodeBoxlabScene(decoded))),JSON.parse(JSON.stringify(encoded)));
 const painted=encoded.objects.findIndex(o=>o.opacityPaintResource);
 for(const change of [x=>x.opacityPaintPool[0].descriptor.channel='metalness',x=>x.opacityPaintPool[0].data.byteLength++,x=>x.objects[painted].opacityPaintResource.index=1]){
  const bad=structuredClone(encoded);change(bad);assert.throws(()=>decodeBoxlabScene(bad,(...args)=>new EditableMesh(...args)));
 }
});

test('1075 opacity resource copies bytes and guards the UV binding',async()=>{
 const r=runtime(),binding=await paintTargetDigest(paintTargetKey(r.target(),r.target().mesh,r.owner)),pixels=new Uint8Array(512*512).fill(255);
 const resource=captureOpacityResource({width:512,height:512,binding,pixels});pixels[0]=0;assert.equal(resource.pixels[0],255);
 assert.throws(()=>captureOpacityResource({width:512,height:512,binding,pixels:new Uint8Array(512*512*4)}));
 assert.throws(()=>captureOpacityResource({width:512,height:512,binding:'bad',pixels:resource.pixels}));
});
