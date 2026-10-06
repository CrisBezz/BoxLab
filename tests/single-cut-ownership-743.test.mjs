import test from 'node:test';
import assert from 'node:assert/strict';
import {bands,uploadedFixture,faceRuntime,volume,snapshot} from './helpers/negative-extrude-runtime.mjs';
import {validateThrough} from '../src/through-kernel.js';

test('743 absence of the ownership capability reproduces legacy triangular takeover',()=>{
  const m=uploadedFixture({before:true}),runtime=faceRuntime(m,[3],{fallback:true});
  // .742 had the finite cutter but no ownership capability for its legacy peer.
  delete runtime.api.ownsClosedCuts;runtime.physicalCut(-1.08);
  assert.ok(m.faces.filter(f=>f.length===3).length>0,'legacy fallback reproduces diagonal fragmentation');
});

for(const distance of [-.5,-1.08,-2.2])test(`743 real single-face gesture with legacy fallback loaded preserves polygons ${distance}`,()=>{
  const m=uploadedFixture({before:true}),runtime=faceRuntime(m,[3],{fallback:true}),before=snapshot(m);
  runtime.physicalCut(distance);
  assert.equal(validateThrough(m).ok,true);assert.equal(m.faces.filter(f=>f.length===3).length,0);
  assert.ok(Math.abs(volume(m)-(8-.5*Math.min(2,-distance)))<1e-6);
  assert.equal(runtime.history.undoStack.length,1);assert.equal(runtime.selected().length,distance>-2?1:0);
  const after=snapshot(m),undo=runtime.history.undo(m);assert.equal(snapshot(undo),before);assert.equal(snapshot(runtime.history.redo(undo)),after);
});
test('743 competing handlers preserve cancelled single cut and redo stack',()=>{
  const m=uploadedFixture({before:true}),before=snapshot(m),runtime=faceRuntime(m,[3],{fallback:true});runtime.history.redoStack.push(m.clone());runtime.physicalCut(-1.08,'pointercancel');
  assert.equal(snapshot(m),before);assert.deepEqual(runtime.selected(),[3]);assert.equal(runtime.history.undoStack.length,0);assert.equal(runtime.history.redoStack.length,1);
});
test('743 multi-region cut stays clean with fallback loaded',()=>{
  const m=uploadedFixture({before:true}),runtime=faceRuntime(m,bands,{fallback:true});runtime.physicalCut(-1.08);assert.ok(Math.abs(volume(m)-5.84)<1e-6);assert.equal(m.faces.filter(f=>f.length===3).length,0);assert.equal(runtime.history.undoStack.length,1);
});
test('743 explicit closed-cut ownership applies only while Extrude is armed',()=>{
  const m=uploadedFixture({before:true}),runtime=faceRuntime(m,[3],{fallback:true});assert.equal(runtime.api.ownsClosedCuts(m),false);runtime.owner.setTool('extrude');assert.equal(runtime.api.ownsClosedCuts(m),true);const open=m.clone();open.faces.pop();assert.equal(runtime.api.ownsClosedCuts(open),false);runtime.owner.setTool('inset');assert.equal(runtime.api.ownsClosedCuts(m),false);
});
