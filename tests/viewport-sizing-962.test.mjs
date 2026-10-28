import test from 'node:test';import assert from 'node:assert/strict';import {bindViewportSizing} from '../src/viewport-sizing.js';
function fixture(storage=null){const events=new Map(),frames=new Map(),calls=[],element={clientWidth:1000,clientHeight:600};let id=0,observe,disconnected=false;const win={localStorage:storage,devicePixelRatio:2,addEventListener:(n,f)=>events.set(n,f),removeEventListener:n=>events.delete(n),requestAnimationFrame:f=>(frames.set(++id,f),id),cancelAnimationFrame:i=>frames.delete(i),visualViewport:{addEventListener:(n,f)=>events.set('visual',f),removeEventListener:()=>events.delete('visual')}};class Observer{constructor(f){observe=f;}observe(){}disconnect(){disconnected=true;}}const dispose=bindViewportSizing({element,resize:(...v)=>calls.push(v),win,Observer});const flush=()=>{const jobs=[...frames.values()];frames.clear();jobs.forEach(f=>f());};return{events,frames,calls,element,win,dispose,flush,observe:()=>observe(),disconnected:()=>disconnected};}
test('962 startup settles across frames, wrapper-only resize and DPR update synchronize actual renderer inputs without polling',()=>{const f=fixture();f.flush();assert.deepEqual(f.calls,[[1000,600,2]]);f.element.clientWidth=1200;f.flush();assert.deepEqual(f.calls.at(-1),[1200,600,2]);f.observe();f.flush();assert.equal(f.calls.length,2);f.element.clientHeight=700;f.observe();f.observe();f.flush();assert.deepEqual(f.calls.at(-1),[1200,700,2]);f.win.devicePixelRatio=1;f.events.get('visual')();f.flush();assert.deepEqual(f.calls.at(-1),[1200,700,1]);assert.equal(f.frames.size,0);});
test('962 same-size lifecycle transitions repaint once, zero-size waits, teardown removes all callbacks',()=>{const f=fixture();f.flush();f.flush();f.events.get('pageshow')();f.events.get('boxlab-tool-session-change')();f.events.get('orientationchange')();f.flush();assert.equal(f.calls.length,3);f.element.clientWidth=0;f.events.get('resize')();f.flush();assert.equal(f.calls.length,3);f.element.clientWidth=1000;f.observe();f.flush();assert.equal(f.calls.length,4);f.events.get('resize')();f.dispose();assert.equal(f.frames.size,0);assert.equal(f.events.size,0);assert(f.disconnected());});
test('962 original main resize updates same renderer and camera, with no scene or camera-position changes',async()=>{const fs=await import('node:fs'),vm=await import('node:vm'),THREE=await import('three');const source=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8'),camera=new THREE.PerspectiveCamera(42,1,.01,100);camera.position.set(4,3,5);const position=camera.position.clone(),calls=[];let ratio=2,selectionUpdates=0;let width=300,height=150;const c={THREE,wrap:{clientWidth:800,clientHeight:600},window:{devicePixelRatio:2},camera,renderer:{getSize:v=>v.set(width,height),getPixelRatio:()=>ratio,setDrawingBufferSize:(w,h,dpr)=>{width=w;height=h;ratio=dpr;calls.push([w,h,dpr]);}},updateScreenSpaceSelection:()=>selectionUpdates++};vm.createContext(c);vm.runInContext(source.slice(source.indexOf('function resize('),source.indexOf('function setPointer(')),c);c.resize(1200,700,1);assert.deepEqual(calls,[[1200,700,1]]);assert.equal(camera.aspect,1200/700);assert(camera.position.equals(position));assert.equal(selectionUpdates,1);c.resize(1200,700,1);assert.equal(calls.length,1);c.resize(0,0,2);assert.equal(calls.length,1);assert(source.includes('bindViewportSizing({element:wrap,resize})'));assert(!source.includes("window.addEventListener('resize',resize)"));});

test('1003 explicit 1x diagnostic uses original sizing, survives mode/size changes and restores automatic DPR on pagehide/disposal',()=>{
 const f=fixture();f.flush();f.flush();const scale=f.win.__boxlabViewportRenderScale;
 assert.equal(scale.requested,null);assert.equal(scale.set(1),true);assert.equal(scale.set(1),false);f.flush();assert.deepEqual(f.calls.at(-1),[1000,600,1]);
 f.element.clientWidth=1366;f.events.get('boxlab-tool-session-change')();f.flush();assert.deepEqual(f.calls.at(-1),[1366,600,1]);
 assert.throws(()=>scale.set(0));assert.throws(()=>scale.set(2));assert.equal(scale.requested,1);
 f.events.get('pagehide')();f.flush();assert.equal(scale.requested,null);assert.deepEqual(f.calls.at(-1),[1366,600,2]);
 f.win.devicePixelRatio=.75;scale.set(1);f.flush();assert.deepEqual(f.calls.at(-1),[1366,600,.75]);
 f.dispose();assert.equal(f.win.__boxlabViewportRenderScale,undefined);assert.equal(scale.set(null),false);assert.equal(f.frames.size,0);
});

test('1005 saved startup 1x is read before sizing, survives Debug reset/pagehide and new binding; normal preference removes it',()=>{
 const data=new Map(),storage={getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)};
 const f=fixture(storage);f.flush();f.flush();const scale=f.win.__boxlabViewportRenderScale;
 assert.equal(scale.saved,null);assert(scale.remember(1));assert.equal(scale.saved,1);f.flush();assert.deepEqual(f.calls.at(-1),[1000,600,1]);
 scale.set(null);f.flush();assert.equal(f.calls.at(-1)[2],2);scale.reset();f.flush();assert.equal(f.calls.at(-1)[2],1);
 f.events.get('pagehide')();f.flush();assert.equal(scale.requested,1);f.dispose();
 const next=fixture(storage);assert.equal(next.win.__boxlabViewportRenderScale.requested,1);next.flush();next.flush();assert(next.calls.every(v=>v[2]===1));
 assert(next.win.__boxlabViewportRenderScale.remember(null));next.flush();assert.equal(next.calls.at(-1)[2],2);assert.equal(data.size,0);next.dispose();
 const normal=fixture(storage);normal.flush();assert.equal(normal.calls[0][2],2);normal.dispose();
});
test('1005 unavailable, throwing or invalid storage leaves automatic default and refuses a false persistence success',()=>{
 for(const storage of [null,{getItem(){throw Error('blocked');},setItem(){throw Error('blocked');}},{getItem:()=> 'wrong',setItem(){},removeItem(){}}]){
  const f=fixture(storage);f.flush();const scale=f.win.__boxlabViewportRenderScale;assert.equal(scale.saved,null);assert.equal(scale.remember(1),false);assert.equal(scale.requested,null);assert.equal(f.calls[0][2],2);assert.throws(()=>scale.remember(2));f.dispose();
 }
});
test('1005 actual main initial resize honors initialized sizing preference without a first high-DPR allocation',async()=>{
 const fs=await import('node:fs'),vm=await import('node:vm'),THREE=await import('three');
 const source=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8'),camera=new THREE.PerspectiveCamera(),sizes=[];let w=300,h=150,dpr=1;
 const context={THREE,camera,window:{devicePixelRatio:2,__boxlabViewportRenderScale:{requested:1}},wrap:{clientWidth:1366,clientHeight:826},renderer:{getSize:v=>v.set(w,h),getPixelRatio:()=>dpr,setDrawingBufferSize:(x,y,r)=>{w=x;h=y;dpr=r;sizes.push([x,y,r]);}},updateScreenSpaceSelection(){}};
 vm.createContext(context);vm.runInContext(source.slice(source.indexOf('function resize('),source.indexOf('function setPointer(')),context);context.resize();context.resize();assert.deepEqual(sizes,[[1366,826,1]]);
 assert(source.indexOf('bindViewportSizing({element:wrap,resize})')<source.indexOf('resize();renderMesh();animate();'));
});
