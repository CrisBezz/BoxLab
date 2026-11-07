import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {FreeOrbitControls} from '../src/free-orbit-controls.js';
import {createThreeFingerCommands} from '../src/three-finger-commands.js';
import {paintBrushPreset} from '../src/paint-brush-presets.js';
import {createBrushSizePreview,brushPreviewPixels} from '../src/paint-brush-preview.js';
import {brushSettings,createPaintLayer} from '../evaluations/uv-paint/paint-core.js';
import {viewportPaintRuntime,viewportPaintUIRuntime} from './helpers/viewport-paint-runtime.mjs';

test('1010 free orbit crosses both world poles repeatedly without radius/target drift and retains native pan/zoom/input owners',()=>{
 const camera=new THREE.PerspectiveCamera();camera.position.set(0,0,5);camera.lookAt(0,0,0);
 const c=new FreeOrbitControls(camera,null);c.enableDamping=false;
 let upside=false,under=false;
 for(let i=0;i<20;i++){
  c._rotateUp(Math.PI/4);c._rotateLeft(.13);c.update();
  assert(Math.abs(camera.position.length()-5)<1e-9);assert(c.target.length()<1e-12);
  assert(Number.isFinite(camera.quaternion.w));assert(Math.abs(camera.up.length()-1)<1e-9);
  upside ||= camera.up.y<-.5;under ||= camera.position.y< -1;
 }
 assert(upside);assert(under);assert(c instanceof OrbitControls);
 assert.equal(c._handleTouchMovePan,OrbitControls.prototype._handleTouchMovePan);
 assert.equal(c._handleTouchMoveDolly,OrbitControls.prototype._handleTouchMoveDolly);
});
test('1010 inertial tail decays and next contact/disabled modelling tool stops spin without camera jump; view up reset remains usable',()=>{
 const camera=new THREE.PerspectiveCamera();camera.position.set(2,3,5);camera.lookAt(0,0,0);
 const c=new FreeOrbitControls(camera,null);c.enableDamping=true;c.dampingFactor=.08;
 c._rotateUp(1);c.update();const first=camera.position.clone();c.update();assert(first.distanceTo(camera.position)>0);
 c.dispatchEvent({type:'start'});const stopped=camera.position.clone();c.update();assert(stopped.distanceTo(camera.position)<1e-10);
 c._rotateLeft(1);c.enabled=false;c.update();assert(stopped.distanceTo(camera.position)<1e-10);
 c.enabled=true;c._rotateUp(2);camera.up.set(0,1,0);camera.position.set(0,0,5);camera.lookAt(0,0,0);c.update();assert(Math.abs(camera.position.y)<1e-10);c._rotateUp(.1);c.update();assert(camera.position.y>0);
});
const contacts=(x=0,y=0,n=3)=>Array.from({length:n},(_,identifier)=>({identifier,clientX:100+identifier*20+x,clientY:100+y}));
function commands(){
 let size=null,ended=null,angle=175,starts=0;
 const controls={enabled:true,stopSpin(){starts++;}},p={active:true,beginBrushResize(){size=10;return true;},updateBrushResize(d){size=d;},endBrushResize(cancel){ended=cancel;}},light={get angle(){return angle;},setAngle(v){angle=v;}};
 const api=createThreeFingerCommands({controls,paint:()=>p,light:()=>light});
 return{api,controls,p,get size(){return size;},get angle(){return angle;},get ended(){return ended;},get starts(){return starts;}};
}
test('1010 three-finger axis locks, wraps same light angle owner and drains all fingers before restoring navigation; taps stay unclaimed by commands',()=>{
 const f=commands();f.api.start(contacts());assert(!f.controls.enabled);assert.equal(f.api.move(contacts(5,5)),false);
 assert.equal(f.api.release([]),false);assert(f.controls.enabled); // existing main tap still Redo
 f.api.start(contacts());assert(f.api.move(contacts(30,2)));assert.equal(f.angle,-170);
 f.api.move(contacts(40,100));assert.equal(f.size,null);assert.equal(f.angle,-165); // horizontal lock
 assert(f.api.release(contacts(40,100,2)));assert(!f.controls.enabled);f.api.release([]);assert(f.controls.enabled);
});
test('1010 vertical Paint size goes through original UI API, cancellation restores and four-finger contacts cannot become size/light commands',()=>{
 const f=commands();f.api.start(contacts());assert(f.api.move(contacts(2,-30)));assert.equal(f.size,-30);
 f.api.cancel();assert.equal(f.ended,true);assert(f.controls.enabled);
 f.api.start(contacts());f.api.start(contacts(0,0,4));assert.equal(f.api.move(contacts(0,-80)),false);assert(f.api.release([]));assert(f.controls.enabled);
 f.controls.enabled=false;f.api.start(contacts());assert(!f.api.active);
 f.controls.enabled=true;f.p.active=false;f.api.start(contacts());assert(f.api.move(contacts(0,-40)));assert.equal(f.size,-30);f.api.release([]);
});
test('1010 standard alpha presets have distinct deterministic footprints and preview uses original raster/settings without a paint resource',()=>{
 const outputs=[];
 for(const name of ['soft','hard','flat','chisel','bristle']){
  const settings=brushSettings({...paintBrushPreset(name),radius:180,colour:'#ff0000',opacity:.6});
  const a=brushPreviewPixels(settings),b=brushPreviewPixels(settings);assert.deepEqual(a,b);
  assert(a.some((v,i)=>i%4===3&&v>0));outputs.push(a);
 }
 for(let i=0;i<outputs.length;i++)for(let j=i+1;j<outputs.length;j++)assert.notDeepEqual(outputs[i],outputs[j]);
 assert.throws(()=>brushSettings({radius:257}));assert.equal(brushSettings({radius:256}).radius,256);
});
test('1010 large brush bounds work per input, renews same baseline and cancellation restores exact pixels',()=>{
 const layer=createPaintLayer(512),before=layer.pixels.slice();layer.begin({radius:256,colour:'#000000',pressure:false,opacity:.5});
 for(let i=0;i<50;i++)layer.stamp(i%2?.2:.8,.5);
 assert(layer.limited);const prefix=layer.pixels.slice();layer.stamp(.5,.2);assert.deepEqual(layer.pixels,prefix);
 layer.resetWorkBudget();layer.stamp(.5,.2);assert.notDeepEqual(layer.pixels,prefix);layer.finish(true);assert.deepEqual(layer.pixels,before);layer.dispose();
});
const node=(ui,k)=>ui.nodes.get('paint-'+k);
test('1010 actual Paint resize UI previews soft/flat tips, clamps1–256, creates no history/resource and cancel restores; next large stroke keeps one Undo',async()=>{
 const r=viewportPaintRuntime(),ui=viewportPaintUIRuntime(r);await ui.api.open();
 const count=r.h.undoStack.length,resource=r.target().colourPaint;
 node(ui,'tip-preset').value='flat';await node(ui,'tip-preset').dispatchEvent({type:'change'});
 assert(ui.api.beginBrushResize());ui.api.updateBrushResize(-2000);assert.equal(node(ui,'radius').value,'256');
 assert.equal(r.target().colourPaint,resource);assert.equal(r.h.undoStack.length,count);
 ui.api.endBrushResize(true);assert.equal(node(ui,'radius').value,'10');
 assert(ui.api.beginBrushResize());ui.api.updateBrushResize(2000);assert.equal(node(ui,'radius').value,'1');ui.api.endBrushResize();
 assert(ui.api.beginBrushResize());ui.api.updateBrushResize(-2000);ui.api.endBrushResize();node(ui,'pressure').checked=false;
 ui.emit('pointerdown');assert.equal(ui.api.beginBrushResize(),false);ui.emit('pointerup');
 assert.equal(r.h.undoStack.length,count+1);assert(r.target().colourPaint);assert(r.controls.enabled);
 const pixels=r.target().colourPaint.pixels.slice();ui.api.close();assert(r.h.undo(r.c.__boxlabBridgeState.mesh));assert.equal(r.target().colourPaint,resource);
 assert(r.h.redo(r.c.__boxlabBridgeState.mesh));assert.deepEqual(r.target().colourPaint.pixels,pixels);
});

test('1010 real main touch owner preserves two-tap Undo/three-tap Redo and suppresses history after command drag/cancel',()=>{
 const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8'),start=main.indexOf('const threeFingerCommands='),source=main.slice(start,main.indexOf('\n\n',start));
 const listeners=new Map();let undo=0,redo=0,angle=0;
 const on=(k,f)=>listeners.set(k,f),controls={enabled:true,stopSpin(){}},gesture={active:false,maxTouches:0,startedAt:0,starts:new Map(),moved:false};
 const c=vm.createContext({createThreeFingerCommands,controls,gesture,drag:null,directTool:null,performance:{now:()=>0},TAP_MAX_MOVE:12,TAP_MAX_MS:320,backgroundSelectionTap:{reset(){}},canvas:{addEventListener:on},window:{addEventListener:on},document:{addEventListener:on},doUndo:()=>undo++,doRedo:()=>redo++,__boxlabStudioLightAngle:{get angle(){return angle;},setAngle:v=>angle=v}});
 vm.runInContext(source,c);
 listeners.get('touchstart')({touches:contacts()});listeners.get('touchend')({touches:[]});assert.equal(redo,1);assert(controls.enabled);
 listeners.get('touchstart')({touches:contacts(0,0,2)});listeners.get('touchend')({touches:[]});assert.equal(undo,1);
 listeners.get('touchstart')({touches:contacts()});listeners.get('touchmove')({touches:contacts(80,0)});listeners.get('touchend')({touches:contacts(80,0,2)});assert(!controls.enabled);listeners.get('touchend')({touches:[]});assert(controls.enabled);assert.equal(redo,1);assert.equal(angle,40);
 listeners.get('touchstart')({touches:contacts()});listeners.get('touchcancel')();assert(controls.enabled);listeners.get('touchend')({touches:[]});assert.equal(redo,1);
});

test('1010 actual inherited pan and wheel dolly still mutate camera and target without spin, including after an upside-down orbit',()=>{
 const camera=new THREE.PerspectiveCamera(45,1.5,.01,100);camera.position.set(0,0,5);camera.lookAt(0,0,0);
 const c=new FreeOrbitControls(camera,null);c.domElement={clientHeight:600,clientWidth:900};c.enableDamping=false;
 const old=c.target.clone();c._pan(20,10);c.update();assert(c.target.distanceTo(old)>0);
 const distance=camera.position.distanceTo(c.target);c._dollyIn(.8);c.update();assert(camera.position.distanceTo(c.target)<distance);
 c._rotateUp(Math.PI);c.update();assert(camera.up.y<-.9);const target=c.target.clone();c._pan(10,10);c.update();assert(c.target.distanceTo(target)>0);
});

test('1010 visible stroke preview coalesces to latest settings and never draws after gesture exit',()=>{
 let radius=10,draws=0;const queue=[];
 const node=()=>({style:{},hidden:false,children:[],appendChild(n){this.children.push(n);},getContext(){return{createImageData:(w,h)=>({data:new Uint8Array(w*h*4)}),putImageData(){draws++;}};}});
 const host=node(),preview=createBrushSizePreview({document:{createElement:node},host,settings:()=>brushSettings({radius}),schedule:fn=>queue.push(fn)});
 preview.show();preview.hide();queue.shift()();assert.equal(host.children.length,0);assert.equal(draws,0);
 preview.show();radius=200;preview.show();assert.equal(queue.length,1);queue.shift()();assert.equal(draws,1);assert.match(host.children[0].children[0].textContent,/200 texels/);
 preview.hide();assert.equal(host.children[0].hidden,true);
});
