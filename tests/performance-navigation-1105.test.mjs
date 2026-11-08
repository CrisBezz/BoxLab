import test from 'node:test';
import assert from 'node:assert/strict';
import {createPerformanceMonitor} from '../src/performance-core.js';

class Events{
 constructor(){this.handlers=new Map();}
 addEventListener(type,fn){const list=this.handlers.get(type)||[];list.push(fn);this.handlers.set(type,list);}
 removeEventListener(type,fn){this.handlers.set(type,(this.handlers.get(type)||[]).filter(x=>x!==fn));}
 dispatch(type,event={}){for(const fn of this.handlers.get(type)||[])fn({...event,type});}
}

test('1105 records first input-to-camera response and subsequent updates per navigation kind',()=>{
 let clock=0;const monitor=createPerformanceMonitor(()=>clock);monitor.setEnabled(true);
 monitor.navigationStart();monitor.navigationInput('orbit');clock=14;monitor.navigationChange();
 clock=20;monitor.navigationInput('orbit');clock=34;monitor.navigationChange();monitor.navigationEnd();
 const nav=monitor.snapshot().navigation;
 assert.deepEqual(nav.gestures,{orbit:1,pan:0,zoom:0,'pan+zoom':0});
 assert.deepEqual(nav.firstResponse,{samples:1,meanMs:14,maxMs:14,p95Ms:14});
 assert.deepEqual(nav.inputToCameraChange,{samples:2,meanMs:14,maxMs:14,p95Ms:14});
 assert.deepEqual(nav.byKind.orbit.firstResponse,{samples:1,meanMs:14,maxMs:14,p95Ms:14});
 monitor.reset();assert.equal(monitor.snapshot().navigation.inputs,0);
});

test('1105 observes actual camera controls and classifies one-finger orbit, two-finger pan and pinch without consuming input',()=>{
 let clock=0;const monitor=createPerformanceMonitor(()=>clock),view=new Events(),controls=new Events(),canvas={ownerDocument:{defaultView:view},contains:target=>target==='inside'};
 controls.enabled=true;monitor.setEnabled(true);const cleanup=monitor.observeNavigation(controls,canvas);
 const input={pointerId:1,pointerType:'touch',clientX:0,clientY:0,buttons:1,target:'inside',prevented:false,preventDefault(){this.prevented=true;}};
 view.dispatch('pointerdown',input);controls.dispatch('start');input.clientX=8;view.dispatch('pointermove',input);clock=12;controls.dispatch('change');controls.dispatch('end');view.dispatch('pointerup',input);
 let nav=monitor.snapshot().navigation;assert.equal(nav.gestures.orbit,1);assert.equal(nav.byKind.orbit.firstResponse.samples,1);assert.equal(input.prevented,false);

 monitor.reset();const a={pointerId:2,pointerType:'touch',clientX:0,clientY:0,buttons:1,target:'inside'},b={pointerId:3,pointerType:'touch',clientX:100,clientY:0,buttons:1,target:'inside'};
 view.dispatch('pointerdown',a);view.dispatch('pointerdown',b);controls.dispatch('start');a.clientY=4;view.dispatch('pointermove',a);b.clientY=4;view.dispatch('pointermove',b);clock=30;controls.dispatch('change');controls.dispatch('end');
 nav=monitor.snapshot().navigation;assert.equal(nav.gestures.pan,1);assert.equal(nav.byKind.pan.inputToCameraChange.samples,1);

 monitor.reset();view.dispatch('pointerdown',a);view.dispatch('pointerdown',b);controls.dispatch('start');a.clientX=-1.5;view.dispatch('pointermove',a);clock=45;controls.dispatch('change');controls.dispatch('end');
 nav=monitor.snapshot().navigation;assert.equal(nav.gestures.zoom,1);assert.equal(nav.byKind.zoom.firstResponse.samples,1);cleanup();
});

test('1105 records wheel zoom before the existing controls change event',async()=>{
 let clock=0;const monitor=createPerformanceMonitor(()=>clock),view=new Events(),controls=new Events(),canvas={ownerDocument:{defaultView:view},contains:()=>false};controls.enabled=true;monitor.setEnabled(true);monitor.observeNavigation(controls,canvas);
 view.dispatch('wheel',{target:canvas});controls.dispatch('start');clock=9;controls.dispatch('change');controls.dispatch('end');await Promise.resolve();
 const nav=monitor.snapshot().navigation;assert.equal(nav.gestures.zoom,1);assert.deepEqual(nav.byKind.zoom.firstResponse,{samples:1,meanMs:9,maxMs:9,p95Ms:9});
});

test('1105 navigation timings stay opt-in and ignore disabled camera controls',()=>{
 let clock=0;const monitor=createPerformanceMonitor(()=>clock);monitor.navigationStart();monitor.navigationInput('orbit');clock=10;monitor.navigationChange();assert.equal(monitor.snapshot().navigation.inputs,0);
 monitor.setEnabled(true);monitor.navigationStart();monitor.navigationInput('pan');monitor.navigationEnd();assert.equal(monitor.snapshot().navigation.gestures.pan,0);
});
