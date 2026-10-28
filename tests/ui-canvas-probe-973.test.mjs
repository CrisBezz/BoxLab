import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {gestureDebugRuntime} from './helpers/gesture-debug-runtime.mjs';
const source=fs.readFileSync(new URL('../src/gesture-debug.js',import.meta.url),'utf8');
function canvas(initial='',priority=''){
 const values=new Map(initial?[['visibility',{value:initial,priority}]]:[]);
 return {id:'viewport',tagName:'CANVAS',width:2732,height:1652,
  addEventListener(){},removeEventListener(){},getBoundingClientRect:()=>({x:0,y:60,left:0,top:60,width:1366,height:826}),
  style:{setProperty:(k,value,priority='')=>values.set(k,{value,priority}),getPropertyValue:k=>values.get(k)?.value||'',getPropertyPriority:k=>values.get(k)?.priority||'',removeProperty:k=>values.delete(k)}};
}
test('973 canvas-only probe restores exact inline visibility/priority, never size or renderer/history, and refuses busy entry',()=>{
 const context={};vm.createContext(context);vm.runInContext(source.slice(source.indexOf('function createCanvasVisibilityProbe('),source.indexOf('const canvasProbe=')),context);
 for(const initial of ['', 'visible','collapse'])for(const priority of ['','important']){
  const c=canvas(initial,priority);let busy=true;const probe=context.createCanvasVisibilityProbe(c,()=>busy);
  assert.equal(probe.hide(),false);assert.equal(c.style.getPropertyValue('visibility'),initial);
  busy=false;assert.equal(probe.hide(),true);assert.equal(probe.hide(),true);assert.equal(c.style.getPropertyValue('visibility'),'hidden');assert.equal(c.style.getPropertyPriority('visibility'),'important');
  busy=true;assert.equal(probe.show(),true);assert.equal(probe.show(),false);assert.equal(c.style.getPropertyValue('visibility'),initial);assert.equal(c.style.getPropertyPriority('visibility'),initial?priority:'');assert.equal(c.width,2732);assert.equal(c.height,1652);
 }
 assert.equal(context.createCanvasVisibilityProbe(null).hide(),false);
});
test('973 actual debug controls record hidden-canvas observation, restore on Show/off/pagehide, and keep model/history untouched',()=>{
 const c=canvas(),f=gestureDebugRuntime({canvas:c});f.c.getComputedStyle=()=>({visibility:c.style.getPropertyValue('visibility')||'visible'});
 f.events.get('boxlab-gesture-debug-change').fn({});
 const controls=f.root.children.find(x=>x.id==='boxlabUIDebugControls'),button=text=>controls.children.find(x=>x.textContent===text);
 const capture=button('Capture report');capture.click=capture.onclick;
 const probe=button('Hide 3D only');probe.onclick();assert.equal(f.api.uiSnapshot().canvasProbe.hidden,true);
 button('Still missing').onclick();assert(f.api.uiSnapshot().events.some(x=>x.kind==='canvas-probe-observation'&&x.data.rightUI==='missing'&&x.data.hidden));
 probe.onclick();assert.equal(c.style.getPropertyValue('visibility'),'');assert.equal(f.api.uiSnapshot().canvasProbe.hidden,false);
 probe.onclick();f.events.get('pagehide').fn({});assert.equal(c.style.getPropertyValue('visibility'),'');
 probe.onclick();f.api.disable();assert.equal(c.style.getPropertyValue('visibility'),'');assert.equal(c.width,2732);assert.equal(c.height,1652);
 assert(!f.c.__boxlabHistory);assert(!f.c.__boxlabBridgeState);
});

test('1003 actual debug render scale button refuses busy state, switches without history, and Debug off restores automatic',()=>{
 const f=gestureDebugRuntime({canvas:canvas()});f.c.getComputedStyle=()=>({});let requested=null;const calls=[];
 f.c.__boxlabViewportRenderScale={get requested(){return requested;},set(v){requested=v;calls.push(v);}};
 f.events.get('boxlab-gesture-debug-change').fn({});
 const controls=f.root.children.find(n=>n.id==='boxlabUIDebugControls'),button=controls.children.find(n=>n.id==='uiDebugRenderScaleBtn');
 f.c.__boxlabToolSession={current:()=>({id:'uv-tools'})};button.onclick();assert.deepEqual(calls,[]);delete f.c.__boxlabToolSession;
 f.c.__boxlabFaceDirect={dragging:()=>true};button.onclick();assert.deepEqual(calls,[]);delete f.c.__boxlabFaceDirect;
 button.onclick();assert.equal(requested,1);assert.equal(f.api.uiSnapshot().renderScale.requested,1);assert.match(button.textContent,/Restore/);
 button.onclick();assert.equal(requested,null);button.onclick();f.api.disable();assert.equal(requested,null);assert(!f.c.__boxlabHistory);
});
