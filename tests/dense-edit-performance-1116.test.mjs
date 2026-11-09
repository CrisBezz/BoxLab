import test from 'node:test';import assert from 'node:assert/strict';
import {EditableMesh} from '../src/mesh.js';import {snapshot} from './helpers/negative-extrude-runtime.mjs';
import {previewRuntime,loopReadRuntime} from './helpers/dense-edit-runtime.mjs';
const plain=x=>JSON.parse(JSON.stringify(x));
test('1116 loop pending keys have exact parity, including empty/yellow colours and live topology changes, with one enumeration per read',()=>{
 const a=EditableMesh.cube(),b=a.clone(),current=loopReadRuntime(a),old=loopReadRuntime(b,{legacy:true});
 for(let step=0;step<3;step++){
  current.reset();old.reset();assert.deepEqual(Array.from(current.read()),Array.from(old.read()));assert.equal(current.counts(),1);assert.equal(old.counts(),old.edgeObjects.size);
  if(step===0){a.loopCut(0,.4);b.loopCut(0,.4);}else{current.edgeObjects.clear();old.edgeObjects.clear();}
 }
});
test('1116 loop commit owner, listener guards and history paths remain byte-identical',()=>{
 const m=EditableMesh.cube(),a=loopReadRuntime(m),b=loopReadRuntime(m.clone(),{legacy:true});
 assert.equal(a.source.slice(a.source.indexOf('function commitLoop(')),b.source.slice(b.source.indexOf('function commitLoop(')));
});
for(const ids of [[0],[0,2]])for(const distance of [.08,-.03])test(`1116 real Face controller + real main selection bridge: ${ids.length} Faces, signed distance ${distance}, exact final preview/history parity`,()=>{
 const m=EditableMesh.cube(),before=snapshot(m),n=m.clone(),a=previewRuntime(m,ids),b=previewRuntime(n,ids,{legacy:true});
 assert.equal(a.begin(),true);assert.equal(b.begin(),true);
 const renders=a.preview(distance),oldRenders=b.preview(distance);
 assert.equal(renders.length,1);assert.equal(oldRenders.length,2);
 assert.equal(renders.at(-1),oldRenders.at(-1));assert.equal(snapshot(m),snapshot(n));assert.deepEqual(a.selection(),b.selection());
 assert.equal(a.history.undoStack.length,0);assert.equal(b.history.undoStack.length,0);
 a.finish();b.finish();assert.equal(snapshot(m),snapshot(n));assert.deepEqual(a.selection(),b.selection());
 assert.equal(a.history.undoStack.length,b.history.undoStack.length);assert.equal(a.history.undoStack.length,1);
 const undone=a.history.undo(m),oldUndone=b.history.undo(n);assert.equal(snapshot(undone),snapshot(oldUndone));assert.equal(snapshot(undone),before);
 assert.equal(snapshot(a.history.redo(undone)),snapshot(b.history.redo(oldUndone)));
});
test('1116 repeated preview restores source each time; cancel retains source geometry, original selection and both history stacks',()=>{
 const m=EditableMesh.cube(),n=m.clone(),before=snapshot(m),a=previewRuntime(m,[0,2]),b=previewRuntime(n,[0,2],{legacy:true});a.history.redoStack.push(m.clone());b.history.redoStack.push(n.clone());a.begin();b.begin();
 for(const distance of [.05,.1,.02]){assert.equal(a.preview(distance).length,1);b.preview(distance);assert.equal(snapshot(m),snapshot(n));}
 a.finish('pointercancel');b.finish('pointercancel');assert.equal(snapshot(m),before);assert.equal(snapshot(m),snapshot(n));assert.deepEqual(a.selection(),b.selection());assert.equal(a.history.undoStack.length,0);assert.equal(a.history.redoStack.length,1);
});
test('1116 fallback bridge without a successful rendering set still requests the original cage render',()=>{
 const m=EditableMesh.cube(),a=previewRuntime(m,[0,2]);a.begin();const prior=a.context.__boxlabSelectionBridge;a.context.__boxlabSelectionBridge={...prior,set:()=>false};assert.equal(a.preview(.05).length,1);
});
