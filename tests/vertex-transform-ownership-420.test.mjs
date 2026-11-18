import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const pick=fs.readFileSync(new URL('../src/vertex-pick-assist.js',import.meta.url),'utf8');
const transform=fs.readFileSync(new URL('../src/transform-upgrade.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('420 Vertex Pick Assist yields while a transform is armed',()=>{
  assert.ok(pick.includes('function transformArmed()'));
  assert.ok(pick.includes('api?.active?.()'));
  assert.ok(pick.includes("document.querySelector('#toolModes button.active[data-tool]')"));
  assert.ok(pick.includes('directToolActive()||transformArmed())return'));
});

test('420 in-flight Vertex pick is abandoned if transform ownership appears',()=>{
  assert.ok(pick.includes('if(addVertexSessionActive()||transformArmed()){press=null;return;}'));
  assert.ok(pick.includes('if(p.moved||addVertexSessionActive()||transformArmed())return;'));
});

test('420 component transform path and protected multi-object transform remain untouched',()=>{
  assert.ok(transform.includes('function startGesture(event)'));
  assert.ok(transform.includes("['move','scale','rotate'].includes(t)"));
  assert.ok(index.includes('src/multi-object-transform.js?v=0.36.1.0'));
});

test('Vertex taps accept primary Pencil contact at zero pressure and arbitrate the collapsed puck',async()=>{
 const vm=await import('node:vm'),THREE=await import('three');
 const handlers=new Map(),canvas={},puck={closest:()=>puck},mesh={};let ids=[0];
 const context={THREE,document:{querySelector:id=>id==='#viewport'?canvas:null,addEventListener:(type,handler)=>handlers.set(type,handler)},__boxlabBridgeState:{mesh},__boxlabSelectionBridge:{mode:()=> 'vertex',indices:()=>ids,set:(_,next)=>{ids=next;}}};
 vm.createContext(context);
 vm.runInContext(pick.replace(/^import .*;\n/m,'')+'\nnearestVertexAt=(x)=>({i:x,d:0});',context);
 function tap(target,vertex,buttons,pressure){
  let consumed=false;
  const event={target,isPrimary:true,pointerType:'pen',pointerId:1,clientX:vertex,clientY:0,buttons,pressure,preventDefault(){},stopImmediatePropagation(){consumed=true;}};
  handlers.get('pointerdown')(event);
  handlers.get('pointerup')({...event,buttons:0,pressure:0});
  return consumed;
 }
 assert(tap(canvas,1,1,0));assert.deepEqual([...ids],[0,1]);
 assert(!tap(canvas,2,0,0));assert.deepEqual([...ids],[0,1]);
 assert(tap(puck,2,1,0));assert.deepEqual([...ids],[0,1,2]);
 assert(!tap(puck,2,1,0));assert.deepEqual([...ids],[0,1,2]);
 assert(tap(canvas,1,1,0));assert.deepEqual([...ids],[0,2]);
});
