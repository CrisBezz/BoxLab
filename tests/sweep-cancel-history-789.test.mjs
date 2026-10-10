import test from 'node:test';
import assert from 'node:assert/strict';
import {sweepRuntime} from './helpers/sweep-runtime.mjs';
import {snapshot} from './helpers/negative-extrude-runtime.mjs';
function cancelHistory(sourceTransform){
 const f=sweepRuntime(sourceTransform),h=f.history,original=f.state.mesh;
 const undo=original.clone(),redo=original.clone();h.limit=1;h.undoStack.push(undo);h.redoStack.push(redo);
 f.add();assert.equal(f.owner.active,true);assert.equal(f.session().id,'sweep');
 assert.equal(h.redoStack.length,0,'opening checkpoints construction');
 f.click('#sweepCancelBtn');f.frame();
 assert.equal(f.owner.active,false);assert.equal(f.session(),null);assert.equal(f.state.mesh,original);
 assert.equal(h.undoStack[0],undo,'Cancel restores undo token');
 assert.equal(h.redoStack[0],redo,'Cancel restores redo token');
 assert.equal(h.undoStack.length,1);assert.equal(h.redoStack.length,1);
 assert.equal(f.state.controls.enabled,true);assert.equal(f.owner.cancel(),false,'duplicate Cancel inert');
}
test('789 Sweep Cancel preserves redo and undo tokens evicted at history limit',()=>cancelHistory());

for(const stack of ['undo','redo'])test(`789 Sweep Cancel rejects length-only ${stack} restoration`,()=>{
 let changed=false;
 assert.throws(()=>cancelHistory((source,name)=>{
  if(name!=='sweep-path.js')return source;
  const title=stack==='undo'?'Undo':'Redo';
  const needle=`history.${stack}Stack.splice(0,history.${stack}Stack.length,...sweep${title}Entries)`;
  assert.ok(source.includes(needle));changed=true;
  return source.replace(needle,`history.${stack}Stack.length=sweep${title}Entries.length`);
 }),new RegExp(`Cancel restores ${stack} token`));
 assert.equal(changed,true);
});

test('789 Sweep Cancel retains actual object-history tagged redo scene',()=>{
 const f=sweepRuntime(),h=f.history,bridge=f.context.__boxlabObjectHistory,before=bridge.capture();
 const future=f.manager.addMesh(f.state.mesh.clone(),'Future');bridge.checkpointSnapshot(before);h.undo(f.state.mesh);
 const token=h.redoStack[0];f.add();f.click('#sweepCancelBtn');f.frame();assert.equal(h.redoStack[0],token);
 assert.ok(h.redo(f.state.mesh));assert.equal(f.manager.objects.length,2);assert.equal(f.manager.activeId,future.id);
});

test('789 Sweep competing-session exit restores tokens and keeps newer session',()=>{
 const f=sweepRuntime(),h=f.history,token=f.state.mesh.clone();h.redoStack.push(token);f.add();
 f.context.__boxlabToolSession.begin({id:'array'});
 f.context.window.dispatchEvent(new f.context.CustomEvent('boxlab-tool-session-change',{detail:{active:true,id:'array'}}));f.frame();
 assert.equal(f.owner.active,false);assert.equal(h.redoStack[0],token);assert.equal(f.session().id,'array');
});


test('789 Sweep refuses incomplete path then Apply commits original core without rollback',()=>{
 const f=sweepRuntime(),h=f.history,o=f.add(),plane=snapshot(f.state.mesh),depth=h.undoStack.length;
 const redo=f.state.mesh.clone();h.redoStack.push(redo);
 assert.equal(f.owner.apply(),false);assert.equal(snapshot(f.state.mesh),plane);
 assert.equal(h.undoStack.length,depth);assert.equal(h.redoStack[0],redo);
 const center=f.state.mesh.vertices[0].clone().add(f.state.mesh.vertices[2]).multiplyScalar(.5);
 o.sweepPath.pathPoints=[{x:center.x,y:center.y,z:center.z+1}];f.frame();
 assert.equal(f.owner.apply(),true);assert.equal(f.session(),null);assert.equal(f.owner.active,false);
 assert.equal(h.undoStack.length,depth+1);assert.equal(h.redoStack.length,0);
 assert.equal(f.selected(),o.id);assert.equal(f.saved(),1);
 const after=snapshot(f.state.mesh.clone()),undo=h.undo(f.state.mesh);
 assert.equal(snapshot(undo),plane);assert.equal(snapshot(h.redo(undo)),after);
 const committedToken=h.undoStack.at(-1);f.owner.cancel();
 assert.equal(snapshot(f.state.mesh.clone()),after);assert.equal(h.undoStack.at(-1),committedToken);assert.equal(h.undoStack.length,depth+1);
});
