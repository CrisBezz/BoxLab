import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';

// Exercise the real scrub owner and real Grow/Shrink selection owner together.
const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const owner=main.slice(main.indexOf('function applyVerticalSelectionScrub('),main.indexOf('function cancelVertexHold('));
const advanced=fs.readFileSync(new URL('../src/advanced-selection.js',import.meta.url),'utf8');
function fixture(type='face',base=[2]){
  const handlers=new Map(),status={textContent:''};
  const nodes=new Map();
  const context=vm.createContext({
    selection:null,selectionMode:type,SELECTION_SCRUB_LOCK:18,SELECTION_VERTICAL_STEP:30,
    makeSelection:(type,indices)=>({type,indices:[...indices]}),renderMesh(){},gestureDebug(){},
    MouseEvent:class{},
    document:{querySelector(id){
      if(id==='#selectionStatus')return status;
      if(!nodes.has(id))nodes.set(id,{addEventListener(_event,fn){handlers.set(id,fn);},dispatchEvent(){handlers.get(id)?.();}});
      return nodes.get(id);
    }}
  });
  context.__boxlabSelectionBridge={mode:()=>type,indices:()=>context.selection?.indices||[],set:(_type,indices)=>{context.selection={type,indices};}};
  context.__boxlabBridgeState={mesh:{faces:Array.from({length:5},()=>[]),vertices:Array.from({length:5},()=>({})),edges:()=>Array.from({length:4},(_,i)=>({a:i,b:i+1,faces:[i,i+1]}))}};
  vm.runInContext(advanced,context);
  vm.runInContext(owner,context);
  const hold={type,gestureBaseIndices:base,verticalDirection:null,verticalSteps:0,pointerId:1};
  return {scrub:dy=>context.applyVerticalSelectionScrub(hold,dy),ids:()=>Array.from(context.selection.indices).sort((a,b)=>a-b),status};
}
test('Face grow previews recompute from fixed base and return to neutral',()=>{
  const f=fixture();
  f.scrub(-30);assert.deepEqual(f.ids(),[1,2,3]);
  f.scrub(-60);assert.deepEqual(f.ids(),[0,1,2,3,4]);
  f.scrub(-30);assert.deepEqual(f.ids(),[1,2,3]);
  for(const dy of [-17,0,17]){f.scrub(dy);assert.deepEqual(f.ids(),[2]);}
  assert.match(f.status.textContent,/Starting selection/);
  f.scrub(-30);assert.deepEqual(f.ids(),[1,2,3]);
});
test('Face can reverse from Grow to Shrink and return to the same base',()=>{
  const f=fixture('face',[1,2,3]);
  f.scrub(-30);assert.deepEqual(f.ids(),[0,1,2,3,4]);
  f.scrub(30);assert.deepEqual(f.ids(),[2]);
  f.scrub(0);assert.deepEqual(f.ids(),[1,2,3]);
});
test('Face neutral band starts below 18 pixels',()=>{
  const f=fixture();
  f.scrub(-18);assert.deepEqual(f.ids(),[1,2,3]);
  f.scrub(-17);assert.deepEqual(f.ids(),[2]);
});

test('Edge and Vertex keep their existing one-step behavior at the hold point',()=>{
  for(const type of ['edge','vertex']){
    const f=fixture(type);f.scrub(0);assert.deepEqual(f.ids(),[]);
    assert.match(f.status.textContent,/Shrink ×1/);
  }
});
