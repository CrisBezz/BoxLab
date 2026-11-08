import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createPerformanceMonitor} from '../src/performance-core.js';

class Events{
 constructor(){this.handlers=new Map();}
 addEventListener(type,fn){const list=this.handlers.get(type)||[];list.push(fn);this.handlers.set(type,list);}
 removeEventListener(type,fn){this.handlers.set(type,(this.handlers.get(type)||[]).filter(x=>x!==fn));}
 dispatch(type,event={}){for(const fn of this.handlers.get(type)||[])fn({...event,type});}
}
const canvasEvent=(pointerId,pointerType,x,y,target='inside')=>({pointerId,pointerType,clientX:x,clientY:y,buttons:1,target});

test('1106 separates OrbitControls camera response from the next completed render submission',()=>{
 let clock=0;const monitor=createPerformanceMonitor(()=>clock);monitor.setEnabled(true);
 monitor.navigationStart();monitor.navigationInput('orbit');clock=14;monitor.navigationChange();clock=20;monitor.navigationRendered(clock);
 clock=25;monitor.navigationInput('orbit');clock=34;monitor.navigationChange();clock=40;monitor.navigationRendered(clock);monitor.navigationEnd();
 const nav=monitor.snapshot().navigation;
 assert.deepEqual(nav.gestures,{orbit:1,pan:0,zoom:0,'pan+zoom':0});
 assert.deepEqual(nav.firstResponse,{samples:1,meanMs:14,maxMs:14,p95Ms:14});
 assert.deepEqual(nav.firstInputToRenderSubmit,{samples:1,meanMs:20,maxMs:20,p95Ms:20});
 assert.deepEqual(nav.inputToRenderSubmit,{samples:2,meanMs:17.5,maxMs:20,p95Ms:20});
 assert.deepEqual(nav.byKind.orbit.inputToCameraChange,{samples:2,meanMs:11.5,maxMs:14,p95Ms:14});
 monitor.reset();assert.equal(monitor.snapshot().navigation.inputToRenderSubmit.samples,0);
});

test('1106 pointer lifecycle counts completed orbit, two-finger pan and pinch zoom sessions',()=>{
 let clock=0;const monitor=createPerformanceMonitor(()=>clock),view=new Events(),controls=new Events(),canvas={ownerDocument:{defaultView:view},contains:target=>target==='inside'};
 controls.enabled=true;monitor.setEnabled(true);const cleanup=monitor.observeNavigation(controls,canvas);
 const orbit=canvasEvent(1,'touch',0,0);view.dispatch('pointerdown',orbit);orbit.clientX=8;view.dispatch('pointermove',orbit);clock=10;controls.dispatch('change');clock=22;monitor.navigationRendered(clock);view.dispatch('pointerup',orbit);
 const panA=canvasEvent(2,'touch',0,0),panB=canvasEvent(3,'touch',100,0);view.dispatch('pointerdown',panA);view.dispatch('pointerdown',panB);panA.clientY=6;view.dispatch('pointermove',panA);clock=35;controls.dispatch('change');clock=49;monitor.navigationRendered(clock);panB.clientY=6;view.dispatch('pointermove',panB);clock=52;controls.dispatch('change');clock=66;monitor.navigationRendered(clock);view.dispatch('pointerup',panA);assert.equal(monitor.snapshot().navigation.gestures.pan,0);view.dispatch('pointerup',panB);
 const zoomA=canvasEvent(4,'touch',0,0),zoomB=canvasEvent(5,'touch',100,0);view.dispatch('pointerdown',zoomA);view.dispatch('pointerdown',zoomB);zoomA.clientX=-6;view.dispatch('pointermove',zoomA);clock=80;controls.dispatch('change');clock=94;monitor.navigationRendered(clock);zoomB.clientX=106;view.dispatch('pointermove',zoomB);clock=100;controls.dispatch('change');clock=114;monitor.navigationRendered(clock);view.dispatch('pointerup',zoomA);view.dispatch('pointerup',zoomB);
 const nav=monitor.snapshot().navigation;assert.equal(nav.gestures.orbit,1);assert.equal(nav.gestures.pan,1);assert.equal(nav.gestures.zoom,1);assert.equal(nav.gestures['pan+zoom'],0);
 assert.equal(nav.byKind.pan.firstInputToRenderSubmit.samples,1);assert.equal(nav.byKind.zoom.firstInputToRenderSubmit.samples,1);cleanup();
});

test('1106 incidental midpoint motion during pinch remains zoom; real pan plus pinch classifies combined',()=>{
 let clock=0;const monitor=createPerformanceMonitor(()=>clock),view=new Events(),controls=new Events(),canvas={ownerDocument:{defaultView:view},contains:target=>target==='inside'};controls.enabled=true;monitor.setEnabled(true);monitor.observeNavigation(controls,canvas);
 const a=canvasEvent(1,'touch',0,0),b=canvasEvent(2,'touch',100,0);view.dispatch('pointerdown',a);view.dispatch('pointerdown',b);a.clientX=-6;view.dispatch('pointermove',a);clock=10;controls.dispatch('change');clock=20;monitor.navigationRendered(clock);b.clientX=106;view.dispatch('pointermove',b);clock=25;controls.dispatch('change');clock=35;monitor.navigationRendered(clock);view.dispatch('pointerup',a);view.dispatch('pointerup',b);
 let nav=monitor.snapshot().navigation;assert.equal(nav.gestures.zoom,1);assert.equal(nav.gestures['pan+zoom'],0);
 monitor.reset();const c=canvasEvent(3,'touch',0,0),d=canvasEvent(4,'touch',100,0);view.dispatch('pointerdown',c);view.dispatch('pointerdown',d);c.clientX=-6;c.clientY=8;view.dispatch('pointermove',c);clock=45;controls.dispatch('change');clock=55;monitor.navigationRendered(clock);view.dispatch('pointerup',c);view.dispatch('pointerup',d);
 nav=monitor.snapshot().navigation;assert.equal(nav.gestures['pan+zoom'],1);assert.equal(nav.byKind['pan+zoom'].firstInputToRenderSubmit.samples,1);
});

test('1106 wheel zoom is one completed gesture and receives its next render timing',async()=>{
 let clock=0;const monitor=createPerformanceMonitor(()=>clock),view=new Events(),controls=new Events(),canvas={ownerDocument:{defaultView:view},contains:()=>false};controls.enabled=true;monitor.setEnabled(true);monitor.observeNavigation(controls,canvas);
 view.dispatch('wheel',{target:canvas});clock=4;controls.dispatch('change');await Promise.resolve();clock=17;monitor.navigationRendered(clock);
 const nav=monitor.snapshot().navigation;assert.equal(nav.gestures.zoom,1);assert.deepEqual(nav.byKind.zoom.firstInputToRenderSubmit,{samples:1,meanMs:17,maxMs:17,p95Ms:17});
});

test('1106 keeps render timings when a new gesture starts before the prior frame renders',()=>{
 let clock=0;const monitor=createPerformanceMonitor(()=>clock);monitor.setEnabled(true);
 monitor.navigationStart();monitor.navigationInput('orbit');clock=5;monitor.navigationChange();monitor.navigationEnd();
 clock=8;monitor.navigationStart();monitor.navigationInput('pan');clock=13;monitor.navigationChange();monitor.navigationEnd();
 clock=20;monitor.navigationRendered(clock);
 const nav=monitor.snapshot().navigation;
 assert.deepEqual(nav.gestures,{orbit:1,pan:1,zoom:0,'pan+zoom':0});
 assert.deepEqual(nav.byKind.orbit.firstInputToRenderSubmit,{samples:1,meanMs:20,maxMs:20,p95Ms:20});
 assert.deepEqual(nav.byKind.pan.firstInputToRenderSubmit,{samples:1,meanMs:12,maxMs:12,p95Ms:12});
});

test('1106 production render owner records the measurement after its existing renderer.render call',()=>{
 const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
 assert.match(main,/renderer\.render\(scene,camera\);const end=performance\.now\(\);perf\.navigationRendered\(end\);perf\.frame\(/);
 assert.equal((main.match(/renderer\.render\(scene,camera\)/g)||[]).length,2);
});

test('1106 navigation observer stays opt-in and does not consume touch input',()=>{
 let clock=0;const monitor=createPerformanceMonitor(()=>clock),view=new Events(),controls=new Events(),canvas={ownerDocument:{defaultView:view},contains:target=>target==='inside'};controls.enabled=true;const cleanup=monitor.observeNavigation(controls,canvas);
 const event={...canvasEvent(1,'touch',0,0),prevented:false,preventDefault(){this.prevented=true;}};view.dispatch('pointerdown',event);event.clientX=8;view.dispatch('pointermove',event);clock=10;controls.dispatch('change');monitor.navigationRendered(20);view.dispatch('pointerup',event);
 assert.equal(monitor.snapshot().navigation.inputs,0);assert.equal(event.prevented,false);
 monitor.setEnabled(true);monitor.navigationStart();monitor.navigationInput('pan');monitor.navigationEnd();assert.equal(monitor.snapshot().navigation.gestures.pan,0);cleanup();
});
