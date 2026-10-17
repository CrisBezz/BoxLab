import {uvPaintLabRuntime as lab} from './helpers/uv-paint-lab-runtime.mjs';
import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import crypto from 'node:crypto';import * as THREE from 'three';
import {createPaintLayer,createPaintComparison,topDownPixels} from '../evaluations/uv-paint/paint-core.js';
import {createStroke} from '../evaluations/uv-paint/stroke.js';
import {comparisonGeometry,comparisonSample} from '../evaluations/uv-paint/samples.js';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
import {createPaintSessionIO,PAINT_SESSION_LIMIT} from '../evaluations/uv-paint/paint-session.js';
const owner=glbOwnerRuntime().c,read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8'),pixel=(l,x,y)=>[...l.pixels.slice((x+y*l.size)*4,(x+y*l.size)*4+4)];
test('896 single-layer raster has exact sRGB endpoints, per-stroke opacity cap, pressure size, clipping, no-op and top-down PNG rows',()=>{
 const l=createPaintLayer(32);l.consumeDirty();l.begin({colour:'#804020',radius:4,hardness:1,opacity:.5});l.stamp(0,0);const first=l.pixels.slice();for(let i=0;i<20;i++)l.stamp(0,0);assert.deepEqual(l.pixels,first);assert.deepEqual(pixel(l,0,0),[192,160,144,255]);assert.deepEqual(pixel(l,31,0),[255,255,255,255]);assert(l.finish());assert(l.consumeDirty());assert(!l.consumeDirty());
 const rows=topDownPixels(l);assert.deepEqual([...rows.slice((31*32)*4,31*32*4+4)],pixel(l,0,0));assert.deepEqual([...rows.slice(0,4)],pixel(l,0,31));
 l.begin({colour:'#000000',radius:4,pressure:true});assert(!l.stamp(.5,.5,0));assert(!l.finish());
 l.begin({colour:'#000000',radius:4,hardness:1});l.stamp(.5,.5,.25);assert.deepEqual(pixel(l,18,16),[255,255,255,255]);l.finish(true);assert.deepEqual(l.pixels,first);
 for(const s of [{radius:49},{opacity:NaN},{colour:'red'}])assert.throws(()=>l.begin(s));l.dispose();assert.throws(()=>l.begin({}));
});
test('896 paired history commits once even if only one brush changes, bounds history, rolls back cancellation and retires Redo on changed commits',()=>{
 const c=createPaintComparison(16,2),white=c.layers[0].pixels.slice();c.begin({colour:'#000000',radius:2});c.layers[1].stamp(.5,.5);assert(c.finish());assert.equal(c.state.undo,1);const black=c.layers[1].pixels.slice();assert(c.undo());c.layers.forEach(l=>assert.deepEqual(l.pixels,white));assert(c.redo());assert.deepEqual(c.layers[1].pixels,black);
 c.begin({colour:'#ff0000'});c.layers.forEach(l=>l.stamp(.2,.2));assert(!c.finish(true));assert.deepEqual(c.layers[0].pixels,white);assert.deepEqual(c.layers[1].pixels,black);
 for(let i=0;i<4;i++){c.begin({colour:i%2?'#00ff00':'#0000ff'});c.layers.forEach(l=>l.stamp(.5,.5));c.finish();}assert.equal(c.state.undo,2);assert(c.undo());c.begin({opacity:0});c.layers.forEach(l=>l.stamp(.5,.5));assert(!c.finish());assert.equal(c.state.redo,1);c.begin({colour:'#888888'});c.layers[0].stamp(.2,.8);c.finish();assert.equal(c.state.redo,0);c.dispose();assert(!c.undo());
});
function marks(kind,points){const result=[],s=createStroke(kind,p=>result.push(p));s.start(points[0]);points.slice(1).forEach(p=>s.move(p));s.end();return result;}
test('896 BoxLab distance carry is independent of event subdivision; Klecks produces bounded finite curve marks and final tail, never UV splines',()=>{
 const point=(x,y=0,pressure=1)=>({x,y,pressure});const a=marks('boxlab',[point(0),point(100)]),b=marks('boxlab',Array.from({length:101},(_,i)=>point(i)));assert.equal(a.length,b.length);a.forEach((p,i)=>{for(const key of ['x','y','pressure'])assert(Math.abs(p[key]-b[i][key])<1e-12);});assert.equal(a.length,51);
 const curve=marks('klecks',[point(0,0,.2),point(30,20,.5),point(60,0,1)]);assert(curve.length>20);assert(curve.some(p=>p.x>55));assert(curve.every(p=>[p.x,p.y,p.pressure].every(Number.isFinite)&&p.pressure>=0&&p.pressure<=1));
 for(const kind of ['boxlab','klecks']){const out=[],s=createStroke(kind,p=>out.push(p),{maxDabs:3});s.start(point(0));s.move(point(100));s.move(point(200));s.end();assert.equal(out.length,3);assert(s.stats.limited);s.cancel();assert(!s.move(point(50)));}
});
test('896 samples use original BoxLab sphere/box/planar UV owners and export triangulator, actual Three ray hits and unchanged production state',()=>{
 for(const kind of ['sphere','cube','plane']){const g=comparisonGeometry(kind,owner);assert(g.attributes.uv);assert(g.index.count>0);const mesh=new THREE.Mesh(g,new THREE.MeshBasicMaterial()),camera=new THREE.PerspectiveCamera(38,1,.01,100);camera.position.set(0,.15,4);camera.lookAt(0,0,0);camera.updateMatrixWorld();mesh.updateMatrixWorld();const ray=new THREE.Raycaster();ray.setFromCamera(new THREE.Vector2(),camera);const hit=ray.intersectObject(mesh)[0];assert(hit?.uv,kind);assert(hit.uv.x>=0&&hit.uv.x<=1&&hit.uv.y>=0&&hit.uv.y<=1);g.dispose();mesh.material.dispose();}assert.throws(()=>comparisonGeometry('sphere',{}));assert.throws(()=>comparisonGeometry('unknown',owner));
});
test('896 actual standalone controller paints both buffers on movement, pairs Undo, rolls back lost capture, owns one texture upload per dirty frame and controls switching',async()=>{
 const f=lab(),api=await f.run(),canvas=f.nodes.get('canvas'),white=api.paint.layers[0].pixels.slice();canvas.dispatch('pointerdown');canvas.dispatch('pointermove',{clientX:480});assert(api.paint.layers.every(l=>l.pixels.some((v,i)=>v!==white[i])));const version=api.mesh.material.map.version;f.frame();assert(api.mesh.material.map.version>version);const after=api.mesh.material.map.version;f.frame();assert.equal(api.mesh.material.map.version,after);canvas.dispatch('pointerup',{pressure:0,buttons:0,clientX:480});assert.equal(api.paint.state.undo,1);
 f.nodes.get('undo').dispatch('click');api.paint.layers.forEach(l=>assert.deepEqual(l.pixels,white));f.nodes.get('redo').dispatch('click');const before=api.paint.layers.map(l=>l.pixels.slice());canvas.dispatch('pointerdown',{clientX:420});canvas.dispatch('pointermove',{clientX:430});canvas.dispatch('lostpointercapture');assert(!api.paint.state.drawing);api.paint.layers.forEach((l,i)=>assert.deepEqual(l.pixels,before[i]));f.nodes.get('klecks').dispatch('click');assert.equal(api.mesh.material.map.image.data,api.paint.layers[1].pixels);
});
test('896 controller keeps fingers out of paint, suppresses palm until release, cancels demo/resize/blur and resets geometry and resources',async()=>{
 const f=lab(),api=await f.run(),canvas=f.nodes.get('canvas');canvas.dispatch('pointerdown',{pointerType:'touch',pointerId:2});assert(!api.paint.state.drawing);const pen=canvas.dispatch('pointerdown');assert(pen.stopped);assert(!api.paint.state.drawing);canvas.dispatch('pointerup',{pointerType:'touch',pointerId:2});canvas.dispatch('pointerdown');const palm=canvas.dispatch('pointerdown',{pointerType:'touch',pointerId:3});assert(palm.stopped);canvas.dispatch('pointerup');assert(!api.paint.state.drawing);assert(canvas.dispatch('pointermove',{pointerType:'touch',pointerId:3}).stopped);canvas.dispatch('pointerup',{pointerType:'touch',pointerId:3});
 api.demo();assert(f.raf.length);f.raf.shift()();assert(api.paint.state.drawing);f.events.get('blur')();assert(!api.paint.state.drawing);f.raf.shift()();assert(!api.paint.state.drawing);
 let geometryDisposed=0;api.mesh.geometry.addEventListener('dispose',()=>geometryDisposed++);f.nodes.get('model').value='cube';f.nodes.get('model').dispatch('change');assert.equal(geometryDisposed,1);assert.equal(api.paint.state.undo,0);f.events.get('pagehide')({persisted:false});assert(api.renderer.disposed);
});
test('896 source provenance preserves upstream bytes/licence and restricts production entry to a new-tab link with no editor/gesture imports',()=>{
 const base='evaluations/uv-paint/';for(const [p,sha]of [['line.upstream.ts','6336d91fcc70507bb67765310b7bbb3d6e77bbb316e0c0ff9fb443444c6815d0'],['vec2.upstream.ts','188bab9d9f70fc1c917b1fd7461220f421b683bb8b8627237a6aca8c30d39ba3']])assert.equal(crypto.createHash('sha256').update(read(base+'vendor/'+p)).digest('hex'),sha);
 assert.match(read(base+'vendor/KLECKS-LICENSE'),/Copyright \(c\) 2026 bitbof/);assert.match(read(base+'klecks-curve.js'),/cc24e97712c199929760250881ffe2e25233ce6d/);assert.doesNotMatch(read(base+'klecks-curve.js'),/export class SplineInterpolator|KlHistory|document\./);
 const index=read('index.html');assert.match(index,/href="\.\/evaluations\/uv-paint\/\?build=900" target="_blank" rel="noopener"/);assert.doesNotMatch(index,/<script[^>]+evaluations\/uv-paint/);assert.doesNotMatch(read(base+'lab.js'),/src\/main\.js|__boxlabObjectManager|__boxlabObjectHistory/);
});
