import {EditableMesh} from '../src/mesh.js';
import test from 'node:test';import assert from 'node:assert/strict';
import {captureColourResource} from '../src/paint-resource.js';
import {createPaintLayerStack,capturePaintLayerStack,appendPaintLayer,replacePaintLayer,flattenPaintLayerStack} from '../src/paint-layer-stack.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
import {comparisonSample} from '../evaluations/uv-paint/samples.js';
import {paintTargetKey,paintTargetDigest} from '../src/paint-target.js';
import {buildNomadProjectWithMaps} from '../src/nomad-packed-maps.js';import {readNomadProject} from '../src/nomad-export-core.js';
import {inspectPNG} from './helpers/png-inspect.mjs';import fs from 'node:fs';
function pixels(rgba=[255,255,255,255],size=16){const p=new Uint8Array(size*size*4);for(let i=0;i<p.length;i+=4)p.set(rgba,i);return p;}
function base(size=16){return captureColourResource({width:size,height:size,pixels:pixels(undefined,size),binding:'a'.repeat(64)});}
function overlay(stack,id,rgba,opacity=1){return appendPaintLayer(stack,{id,pixels:pixels(rgba,stack.base.width),opacity});}
test('902 source-over uses straight alpha, layer opacity, order, visibility and opaque output',()=>{
 const b=createPaintLayerStack(base()),red=overlay(b,'red',[255,0,0,128]),blue=overlay(red,'blue',[0,0,255,255],.5);
 assert.deepEqual([...flattenPaintLayerStack(red).pixels.slice(0,4)],[255,127,127,255]);
 assert.deepEqual([...flattenPaintLayerStack(blue).pixels.slice(0,4)],[128,64,191,255]);
 assert.deepEqual(flattenPaintLayerStack(replacePaintLayer(blue,'blue',{visible:false})).pixels,flattenPaintLayerStack(red).pixels);
 assert.deepEqual(flattenPaintLayerStack(replacePaintLayer(blue,'blue',{opacity:0})).pixels,flattenPaintLayerStack(red).pixels);
 const reversed=capturePaintLayerStack({...blue,layers:[...blue.layers].reverse()});assert.notDeepEqual(flattenPaintLayerStack(reversed).pixels,flattenPaintLayerStack(blue).pixels);
 assert.deepEqual(flattenPaintLayerStack(overlay(b,'clear',[0,0,0,0])).pixels,b.base.pixels);
});
test('902 captures/edits/flatten isolate caller and duplicate buffers without creating history',()=>{
 const input=base(),stack=createPaintLayerStack(input),data=pixels([0,50,100,150]),withLayer=appendPaintLayer(stack,{id:'one',pixels:data}),copy=capturePaintLayerStack(withLayer);
 input.pixels.fill(0);data.fill(0);assert.equal(stack.base.pixels[0],255);assert.equal(withLayer.layers[0].pixels[1],50);
 const before=flattenPaintLayerStack(withLayer).pixels,edited=replacePaintLayer(copy,'one',{opacity:.25});assert.deepEqual(flattenPaintLayerStack(withLayer).pixels,before);assert.notDeepEqual(flattenPaintLayerStack(edited).pixels,before);
 const flat=flattenPaintLayerStack(withLayer);flat.pixels.fill(0);assert.deepEqual(flattenPaintLayerStack(withLayer).pixels,before);
 copy.layers[0].pixels.fill(0);assert.equal(withLayer.layers[0].pixels[1],50);assert(Object.isFrozen(withLayer.layers));assert(Object.isFrozen(withLayer.layers[0]));
});
test('902 rejects ambiguous schemas, invalid buffers/opacity/IDs and over-budget layers without source edits',()=>{
 const stack=createPaintLayerStack(base()),withLayer=overlay(stack,'one',[1,2,3,255]),before=flattenPaintLayerStack(withLayer).pixels;
 for(const patch of [{opacity:NaN},{opacity:-1},{opacity:1.1},{visible:1},{pixels:new Uint8Array(3)},{blendMode:'multiply'},{name:''}])assert.throws(()=>replacePaintLayer(withLayer,'one',patch));
 assert.throws(()=>replacePaintLayer(withLayer,'missing',{}));assert.throws(()=>appendPaintLayer(withLayer,{id:'one'}));assert.throws(()=>appendPaintLayer(stack,{id:'bad id'}));
 assert.throws(()=>capturePaintLayerStack({...stack,flattened:stack.base.pixels}));assert.throws(()=>createPaintLayerStack({...base(),version:2}));assert.throws(()=>createPaintLayerStack(base(513)));
 const full=appendPaintLayer(appendPaintLayer(withLayer,{id:'two'}),{id:'three'});assert.equal(full.layers.length,3);assert.throws(()=>appendPaintLayer(full,{id:'four'}));assert.deepEqual(flattenPaintLayerStack(withLayer).pixels,before);
});
test('902 base/transparent endpoints preserve asymmetric row bytes and maximum supported stack',()=>{
 const b=base(512);b.pixels.set([1,2,3,255],0);b.pixels.set([4,5,6,255],b.pixels.length-4);let s=createPaintLayerStack(b);assert.deepEqual(flattenPaintLayerStack(s).pixels,b.pixels);
 for(let i=0;i<3;i++)s=appendPaintLayer(s,{id:'layer'+i});assert.deepEqual(flattenPaintLayerStack(s).pixels,b.pixels);
 const p=pixels([9,8,7,255],512);s=replacePaintLayer(s,'layer2',{pixels:p});assert.deepEqual(flattenPaintLayerStack(s).pixels,p);
});
test('902 flattened layer output uses original project/native PNG export owners; editable stack is explicitly rejected by project storage',async()=>{
 const owner=glbOwnerRuntime().c,sample=comparisonSample('cube',owner),o=sample.object;sample.geometry.dispose();o.id=1;
 const b=captureColourResource({...base(512),binding:await paintTargetDigest(paintTargetKey(o,o.mesh,owner))}),stack=overlay(createPaintLayerStack(b),'colour',[12,34,56,128]);
 o.colourPaint=flattenPaintLayerStack(stack);const expected=o.colourPaint.pixels.slice(),encoded=encodeBoxlabScene({objects:[o]}),decoded=decodeBoxlabScene(encoded,(...args)=>new EditableMesh(...args));assert.deepEqual(decoded.objects[0].colourPaint.pixels,expected);
 const result=await buildNomadProjectWithMaps([o],fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url)),{topologySignature:owner.topologySignature});
 const p=readNomadProject(result.bytes),m=p.json.materials[p.json.meshes[0].material],image=p.json.images[m.textures.color.index];assert.deepEqual(inspectPNG(p.bin.subarray(image.offset,image.offset+image.length)).rgba,expected);assert.deepEqual(o.colourPaint.pixels,expected);
 assert.throws(()=>encodeBoxlabScene({objects:[{...o,colourPaint:stack}]}));
});
