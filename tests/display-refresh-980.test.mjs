import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {gestureDebugRuntime} from './helpers/gesture-debug-runtime.mjs';
const source=fs.readFileSync(new URL('../src/gesture-debug.js',import.meta.url),'utf8');
function canvas(initial='',priority=''){
 const values=new Map(initial?[['visibility',{value:initial,priority}]]:[]);
 return {id:'viewport',tagName:'CANVAS',width:2732,height:1652,addEventListener(){},removeEventListener(){},getBoundingClientRect:()=>({x:0,y:60,left:0,top:60,width:1366,height:826}),style:{setProperty:(k,value,priority='')=>values.set(k,{value,priority}),getPropertyValue:k=>values.get(k)?.value||'',getPropertyPriority:k=>values.get(k)?.priority||'',removeProperty:k=>values.delete(k)}};
}
function scheduler(){let id=0;const frames=new Map(),timers=new Map();return{frames,timers,requestFrame:fn=>{frames.set(++id,fn);return id;},cancelFrame:i=>frames.delete(i),setTimer:(fn,ms)=>{assert.equal(ms,250);timers.set(++id,fn);return id;},clearTimer:i=>timers.delete(i),frame(){const entries=[...frames];frames.clear();for(const [,fn]of entries)fn();},timeout(){for(const fn of [...timers.values()])fn();}};}
function setup(initial='',priority=''){
 const c={};vm.createContext(c);vm.runInContext(source.slice(source.indexOf('function createCanvasVisibilityProbe('),source.indexOf('const canvasProbe=')),c);
 const node=canvas(initial,priority),s=scheduler();let busy=false;const probe=c.createCanvasVisibilityProbe(node,()=>busy),recovery=c.createCanvasDisplayRefresh(probe,s);return{node,s,probe,recovery,busy:value=>busy=value};
}
test('980 explicit two-frame recovery restores exact inline state/priority and leaves backing dimensions unchanged',()=>{
 for(const initial of ['', 'visible','collapse'])for(const priority of ['', 'important']){
  const {node,s,recovery,probe}=setup(initial,priority);assert.equal(recovery.start(),true);assert.equal(recovery.start(),false);assert.equal(node.style.getPropertyValue('visibility'),'hidden');assert.equal(probe.active(),true);
  s.frame();assert.equal(node.style.getPropertyValue('visibility'),'hidden');assert.equal(recovery.active(),true);s.frame();assert.equal(node.style.getPropertyValue('visibility'),initial);assert.equal(node.style.getPropertyPriority('visibility'),initial?priority:'');assert.equal(recovery.active(),false);assert.equal(s.timers.size,0);assert.equal(node.width,2732);assert.equal(node.height,1652);
 }
});
test('980 fallback and lifecycle cancellation restore even without another animation frame; late frames cannot rehide canvas',()=>{
 for(const finish of ['timeout','cancel']){const {node,s,recovery}=setup('visible','important');recovery.start();const late=[...s.frames.values()];if(finish==='timeout')s.timeout();else recovery.cancel();for(const f of late)f();s.frame();assert.equal(node.style.getPropertyValue('visibility'),'visible');assert.equal(node.style.getPropertyPriority('visibility'),'important');assert.equal(recovery.active(),false);assert.equal(s.frames.size,0);assert.equal(s.timers.size,0);}
});
test('980 busy entry refuses; manual hidden-canvas diagnostic is never stolen; scheduler error still restores',()=>{
 const r=setup();r.busy(true);assert.equal(r.recovery.start(),false);assert.equal(r.node.style.getPropertyValue('visibility'),'');r.busy(false);r.probe.hide();assert.equal(r.recovery.start(),false);r.recovery.cancel();assert.equal(r.probe.active(),true);r.probe.show();
 const c={};vm.createContext(c);vm.runInContext(source.slice(source.indexOf('function createCanvasVisibilityProbe('),source.indexOf('const canvasProbe=')),c);const probe=c.createCanvasVisibilityProbe(r.node),s=scheduler(),recovery=c.createCanvasDisplayRefresh(probe,{...s,requestFrame(){throw Error('scheduler unavailable');}});assert.equal(recovery.start(),false);assert.equal(probe.active(),false);assert.equal(r.node.style.getPropertyValue('visibility'),'');assert.equal(s.timers.size,0);
});
test('980 actual File entry works without debug, preserves model/history, and pagehide/debug-off cancel pending refresh',()=>{
 const node=canvas(),menu={children:[],open:true,appendChild(n){this.children.push(n);}},f=gestureDebugRuntime({canvas:node,fileMenu:menu}),s=scheduler();
 f.c.requestAnimationFrame=s.requestFrame;f.c.cancelAnimationFrame=s.cancelFrame;f.c.setTimeout=s.setTimer;f.c.clearTimeout=s.clearTimer;
 const model={id:'untouched'},history={undoStack:[1],redoStack:[2]};f.c.__boxlabBridgeState={mesh:model};f.c.__boxlabHistory=history;
 f.api.disable();const button=menu.children.find(x=>x.id==='refreshDisplayBtn');assert.ok(button);button.onclick();assert.equal(menu.open,false);assert.equal(node.style.getPropertyValue('visibility'),'hidden');assert.equal(button.disabled,true);s.frame();s.frame();assert.equal(node.style.getPropertyValue('visibility'),'');assert.equal(button.disabled,false);assert.equal(f.api.enabled,false);
 button.onclick();f.events.get('pagehide').fn({});assert.equal(node.style.getPropertyValue('visibility'),'');assert.equal(s.frames.size,0);button.onclick();f.api.disable();assert.equal(node.style.getPropertyValue('visibility'),'');assert.equal(s.frames.size,0);assert.equal(f.c.__boxlabBridgeState.mesh,model);assert.deepEqual(history,{undoStack:[1],redoStack:[2]});assert.equal(node.width,2732);assert.equal(node.height,1652);
 for(const busy of [{__boxlabViewportPaint:{active:true}},{__boxlabMainDirectTool:{busy:()=>true}},{__boxlabFaceDirect:{dragging:()=>true}}]){Object.assign(f.c,busy);button.onclick();assert.equal(node.style.getPropertyValue('visibility'),'');for(const key of Object.keys(busy))delete f.c[key];}
});
