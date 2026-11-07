import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../../src/mesh.js';
import {History} from '../../src/history.js';
import {snapshot} from './negative-extrude-runtime.mjs';

// Actual tap-intent release/cancel and endDrag listeners plus native toggle owner.
// Press intent is seeded as established by retained down-source assertion; movement,
// hold arbitration and renderer remain controlled, not a full main/Safari fixture.
export function selectedComponentTap(sourceTransform=source=>source){
 const s=sourceTransform(fs.readFileSync(new URL('../../src/main.js',import.meta.url),'utf8'));
 const a=s.indexOf("canvas.addEventListener('pointerup',event=>{\n  if(!componentTapIntent"),b=s.indexOf("window.addEventListener('boxlab-pencil-orbit-claim'",a);
 assert.ok(a>=0&&b>a);const release=s.slice(a,b);
 const toggle=s.match(/function toggleSelection\(hit\)\{[^\n]+\}/)?.[0];assert.ok(toggle);
 const end=s.slice(s.indexOf('function endDrag(event){'),s.indexOf('function endDrag(event){')+s.slice(s.indexOf('function endDrag(event){')).indexOf('\n'));
 for(const mode of ['vertex','edge','face'])for(const kind of ['tap','wrong-pointer','cancel','long','moved','cancelled']){
  const handlers=new Map(),m=EditableMesh.cube(),history=new History();history.redoStack.push(m.clone());
  const before=snapshot(m),captures=new Set([7]);let now=1000,renders=0;
  const canvas={addEventListener:(type,fn)=>{if(!handlers.has(type))handlers.set(type,[]);handlers.get(type).push(fn);},releasePointerCapture:id=>captures.delete(id)};
  const c={canvas,mesh:m,history,selection:{type:mode,indices:[1,3]},selectionMode:mode,componentTapIntent:{pointerId:7,hit:{type:mode,index:1},startX:10,startY:20,startTime:1000,cancelled:kind==='cancelled'},drag:{kind:'component',pointerId:7,armed:false,startMesh:m},controls:{enabled:false},performance:{now:()=>now},TAP_MAX_MS:320,TAP_MAX_MOVE:7,selectedEdgeCutT:.2,renderMesh:()=>renders++,resetEdgeHoldCycle(){},selectionIndices:()=>c.selection?.indices||[],makeSelection:(type,indices)=>indices.length?{type,indices:[...indices]}:null,toolMode:'move',window:{dispatchEvent(){}},CustomEvent:class{}};
  vm.createContext(c);vm.runInContext(toggle+'\n'+release+'\n'+end,c);
  const send=(type,extra={})=>{for(const fn of handlers.get(type)||[])fn({type,pointerId:7,clientX:10,clientY:20,...extra});};
  if(kind==='wrong-pointer'){send('pointerup',{pointerId:8});assert.deepEqual(c.selection.indices,[1,3]);assert.ok(c.componentTapIntent);}
  if(kind==='cancel')send('pointercancel');
  if(kind==='long')now=1400;
  send('pointerup',kind==='moved'?{clientX:30}:{});
  assert.deepEqual(c.selection.indices,kind==='tap'||kind==='wrong-pointer'?[3]:[1,3],mode+':'+kind);
  assert.equal(c.componentTapIntent,null);assert.equal(c.drag,null);assert.equal(c.controls.enabled,true);
  if(kind==='tap'||kind==='wrong-pointer')assert.equal(captures.size,0);
  const count=renders;send('pointerup');assert.equal(renders,count,'retired release is inert');
  assert.equal(snapshot(c.mesh),before);assert.equal(history.undoStack.length,0);assert.equal(history.redoStack.length,1);
 }
}
