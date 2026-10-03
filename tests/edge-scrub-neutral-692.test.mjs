import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';

const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const owner=main.slice(main.indexOf('function applyVerticalSelectionScrub('),main.indexOf('function cancelVertexHold('));
const advanced=fs.readFileSync(new URL('../src/advanced-selection.js',import.meta.url),'utf8');
function fixture(base=[2]){
  const handlers=new Map(),nodes=new Map(),status={textContent:''};
  const context=vm.createContext({
    selection:null,selectionMode:'edge',SELECTION_SCRUB_LOCK:18,SELECTION_VERTICAL_STEP:30,
    makeSelection:(type,indices)=>({type,indices:[...indices]}),renderMesh(){},gestureDebug(){},
    MouseEvent:class{},document:{querySelector(id){
      if(id==='#selectionStatus')return status;
      if(!nodes.has(id))nodes.set(id,{addEventListener(_event,fn){handlers.set(id,fn);},dispatchEvent(){handlers.get(id)?.();}});
      return nodes.get(id);
    }}
  });
  context.__boxlabSelectionBridge={mode:()=>'edge',indices:()=>context.selection?.indices||[],set:(_type,indices)=>{context.selection={type:'edge',indices};}};
  context.__boxlabBridgeState={mesh:{vertices:Array.from({length:6},()=>({})),edges:()=>Array.from({length:5},(_,i)=>({a:i,b:i+1,faces:[]}))}};
  vm.runInContext(advanced,context);vm.runInContext(owner,context);
  const hold={type:'edge',gestureBaseIndices:base,verticalDirection:null,verticalSteps:0,pointerId:1};
  return {scrub:dy=>context.applyVerticalSelectionScrub(hold,dy),ids:()=>Array.from(context.selection.indices).sort((a,b)=>a-b),status};
}
test('Edge Grow reduces preview on reversal and neutral restores its fixed base',()=>{
  const f=fixture();
  f.scrub(-60);assert.deepEqual(f.ids(),[0,1,2,3,4]);
  f.scrub(-30);assert.deepEqual(f.ids(),[1,2,3]);
  for(const dy of [-17,0,17]){f.scrub(dy);assert.deepEqual(f.ids(),[2]);}
  assert.match(f.status.textContent,/Starting selection/);
  f.scrub(-30);assert.deepEqual(f.ids(),[1,2,3]);
});
test('Edge Shrink returning to neutral restores a multi-edge base',()=>{
  const f=fixture([1,2,3]);
  f.scrub(30);assert.deepEqual(f.ids(),[2]);
  f.scrub(60);assert.deepEqual(f.ids(),[]);
  f.scrub(0);assert.deepEqual(f.ids(),[1,2,3]);
  f.scrub(-30);assert.deepEqual(f.ids(),[0,1,2,3,4]);
});
test('Edge neutral band leaves existing 18px entry and step scaling intact',()=>{
  const f=fixture();
  f.scrub(-18);assert.deepEqual(f.ids(),[1,2,3]);
  f.scrub(-17);assert.deepEqual(f.ids(),[2]);
});
