import {readFileSync} from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {Raycaster,Vector2} from 'three';
import * as watlas from '../src/uv-vendor/watlas.js';
import {EditableMesh} from '../src/mesh.js';
import {prepareAutoUnwrapMesh,runAutoUnwrap} from '../src/auto-unwrap-core.js';
import {commitAutoUnwrapUV} from '../src/imported-uv-edit.js';
import {viewportPaintRuntime,viewportPaintUIRuntime} from './helpers/viewport-paint-runtime.mjs';

test('B2 guided multi-face charts accept a continuous Pencil stroke and preserve maps through Cancel, Done and history',async()=>{
 const wasm=readFileSync(new URL("../src/uv-vendor/watlas.wasm.base64",import.meta.url),"utf8");
 await watlas.Initialize({wasmBinary:Buffer.from(wasm,"base64")});
 const runtime=viewportPaintRuntime();
 const mesh=new EditableMesh(
  [[-2,-1,0],[-1,-1,0],[0,-1,0],[1,-1,0],[2,-1,0],
   [-2,1,0],[-1,1,0],[0,1,0],[1,1,0],[2,1,0]],
  [[0,1,6,5],[1,2,7,6],[2,3,8,7],[3,4,9,8]]);
 mesh.faceGroups=['Left','Left','Right','Right'];
 runtime.manager.replaceActiveMesh(mesh);
 const object=runtime.target();
 object.glbPassthrough=null;
 const input=prepareAutoUnwrapMesh(mesh,runtime.owner,{guided:true,markedEdges:[[2,7]]});
 input.packing={mapSize:1024,gutter:8,rotate:true};
 const layout=await runAutoUnwrap(input,watlas);
 assert.equal(layout.chartCount,2);
 assert(commitAutoUnwrapUV(object,mesh,runtime.owner.topologySignature,runtime.c.__boxlabObjectHistory,layout).ok);
 const uvSnapshot=JSON.stringify(object.glbPassthrough);
 runtime.body.geometry.dispose();
 runtime.body.geometry=runtime.owner.buildUVPreviewGeometry(mesh,object.glbPassthrough,{faceIndices:true});
 const ui=viewportPaintUIRuntime(runtime);
 await ui.api.open();
 const inputControl=id=>ui.nodes.get('paint-'+id);
 for(const id of ['multi-roughness','multi-metalness','multi-opacity']){
  inputControl(id).checked=true;
  inputControl(id).dispatchEvent({type:'change'});
 }
 inputControl('radius').value='18';
 const count=runtime.h.undoStack.length;
 const samples=(y,last)=>{for(let x=275;x<=last;x+=5)ui.emit('pointermove',{clientX:x,clientY:y,pressure:.75});};
 const stroke=(y,last)=>{ui.emit('pointerdown',{clientX:270,clientY:y,pressure:.5});samples(y,last);};
 stroke(300,630);
 ui.emit('pointercancel');
 assert.equal(runtime.h.undoStack.length,count);
 assert.equal(runtime.target().colourPaint,undefined);
 assert(runtime.controls.enabled);

 stroke(300,630);
 ui.emit('pointerup',{clientX:630,clientY:300,pressure:.75});
 assert.equal(runtime.h.undoStack.length,count+1);
 const resources=['colourPaint','roughnessPaint','metalnessPaint','opacityPaint'];
 const paint=resources.map(key=>runtime.target()[key]);
 assert(paint.every(Boolean));
 assert.equal(paint[0].width,1024);
 const ray=new Raycaster();
 const channelBaselines=[255,255,0,255];
 for(let x=285;x<=615;x+=5){
  ray.setFromCamera(new Vector2(x/450-1,0),runtime.camera);
  const uv=ray.intersectObject(runtime.body,false)[0]?.uv;
  assert(uv);
  for(const [channel,map] of paint.entries()){
   const stride=map.pixels.length/(map.width*map.height);
   const u=Math.round(uv.x*(map.width-1)),v=Math.round(uv.y*(map.height-1));
   const pixel=(v*map.width+u)*stride;
   const index=channel===0?pixel+1:pixel;
   assert.notEqual(map.pixels[index],channelBaselines[channel],`stroke gap on channel ${channel} at screen x=${x}`);
  }
 }
 ui.api.close();
 assert(runtime.controls.enabled);
 assert(runtime.h.undo(runtime.live));
 assert(resources.every(key=>runtime.target()[key]===undefined));
 assert(runtime.h.redo(runtime.live));
 for(const [i,key] of resources.entries())assert.deepEqual(runtime.target()[key].pixels,paint[i].pixels);
 assert.equal(JSON.stringify(runtime.target().glbPassthrough),uvSnapshot);
 runtime.body.geometry.dispose();
});
