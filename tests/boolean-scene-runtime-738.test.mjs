import test from 'node:test';
import assert from 'node:assert/strict';
import {booleanSceneRuntime} from './helpers/boolean-scene-runtime.mjs';
for(const groups of [false,true])for(const operation of ['union','difference','intersection']){
  test(`738 actual ${groups?'Group':'Object'} Boolean ${operation} restores complete scene in one Undo/Redo`,()=>{
    const r=booleanSceneRuntime({groups}),before=r.snapshot();r.events.length=0;
    r.apply(operation);
    assert.deepEqual(r.events.filter(e=>['capture','add','checkpoint'].includes(e)),['capture','add','checkpoint']);
    assert.equal(r.history.undoStack.length,1);assert.equal(r.manager.activeId,6);
    assert.deepEqual(Array.from(r.c.selectedIds),[6]);
    const operands=groups?[1,2,4]:[1,2];
    for(const id of operands)assert.equal(r.manager.objects.find(o=>o.id===id).visible,false);
    assert.equal(r.manager.objects.find(o=>o.id===3).visible,true);
    assert.equal(r.manager.objects.find(o=>o.id===5).locked,true);
    const result=r.manager.objects.find(o=>o.id===6);
    assert.equal(result.sourceId,undefined);assert.equal(result.instanceMatrix,undefined);
    assert.equal(result.name,groups?'Group A B1':'A B1');
    const after=r.snapshot();
    assert.ok(r.undo());assert.deepEqual(r.snapshot(),before);assert.equal(r.history.undoStack.length,0);
    assert.ok(r.redo());assert.deepEqual(r.snapshot(),after);assert.equal(r.history.undoStack.length,1);
    assert.ok(r.undo());assert.deepEqual(r.snapshot(),before);
  });
}
for(const groups of [false,true])for(const [label,options] of [['ineligible',{eligible:false}],['solver refusal',{solverOK:false}],['creation failure',{createOK:false}]]){
  test(`738 actual ${groups?'Group':'Object'} Boolean ${label} preserves scene and both history stacks`,()=>{
    const r=booleanSceneRuntime({groups,...options});
    // Keep a redo entry to ensure a refused operation does not erase it.
    r.history.push(r.c.__boxlabBridgeState.mesh);r.undo();
    const before=r.snapshot(),undo=[...r.history.undoStack],redo=[...r.history.redoStack];r.events.length=0;
    r.apply('union');assert.deepEqual(r.snapshot(),before);
    assert.deepEqual(r.history.undoStack,undo);assert.deepEqual(r.history.redoStack,redo);
    assert.ok(!r.events.includes('checkpoint'));assert.ok(!r.events.includes('sync'));
    if(label!=='creation failure')assert.ok(!r.events.includes('add'));
  });
}
test('738 Join capture and Boolean snapshots use the same installed scene-history bridge',()=>{
  const r=booleanSceneRuntime(),before=r.snapshot();
  const listener=r.listeners.find(l=>l.type==='click');assert.equal(listener.capture,true);
  listener.fn({target:{closest:()=>({disabled:false,textContent:'Join'})}});
  assert.equal(r.history.undoStack.length,1);
  r.manager.objects[1].visible=false;r.manager.objects[0].mesh.vertices[0].x=42;
  assert.ok(r.undo());assert.deepEqual(r.snapshot(),before);
});
