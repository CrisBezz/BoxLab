import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {revolveRuntime} from './helpers/revolve-runtime.mjs';

const revolve=fs.readFileSync(new URL('../src/revolve-profile.js',import.meta.url),'utf8');
const toolSession=fs.readFileSync(new URL('../src/tool-session-ui.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8')).version;

function currentLauncher(sourceTransform){
  const f=revolveRuntime(sourceTransform);
  assert.equal(f.launchRow().hidden,false,'launcher available without construction');
  assert.equal(f.session(),null);
  const original=f.state.mesh;
  const redoToken=original.clone(),undoToken=original.clone();
  f.history.limit=1; // Opening the construction evicts the old undo token.
  f.history.redoStack.push(redoToken);
  f.history.undoStack.push(undoToken);
  f.click('#revolveProfileLaunchBtn');f.frame();
  assert.equal(f.manager.objects.length,2,'launcher creates construction');
  const object=f.manager.objects.at(-1);
  assert.equal(f.owner.active,true);
  assert.equal(f.session().id,'revolve-profile');
  assert.equal(f.session().title,'Revolve Profile');
  assert.equal(f.session().node.hidden,false);
  f.click('#revolveProfileLaunchBtn');f.frame();
  assert.equal(f.manager.objects.length,2,'launcher reuses current construction');
  f.click('#revolveProfileCancelBtn');f.frame();
  assert.equal(f.manager.objects.length,1);
  assert.equal(f.state.mesh,original);
  assert.equal(f.history.undoStack.length,1);
  assert.equal(f.history.undoStack[0],undoToken,'Cancel restores original undo token');
  assert.equal(f.history.redoStack[0],redoToken,'Cancel restores original redo token');
  assert.equal(f.history.redoStack.length,1);
  assert.equal(f.owner.active,false);
  assert.equal(f.session(),null);
  assert.equal(f.launchRow().hidden,false,'launcher available after cancellation');
  f.click('#revolveProfileLaunchBtn');f.frame();
  assert.equal(f.manager.objects.length,2,'launcher can restart');
  return object;
}

test('422 current Revolve launcher creates, reuses, cancels and restarts construction',()=>currentLauncher());

test('422 Revolve Profile claims exclusive Tool Session after interaction or launch',()=>{
  assert.ok(revolve.includes("id:'revolve-profile'"));
  assert.ok(revolve.includes("title:'Revolve Profile'"));
  assert.ok(revolve.includes('claimRevolveTools(meta)'));
  assert.ok(revolve.includes("toolSession()?.isActive?.('revolve-profile')"));
});

test('422 profile authoring and Pencil segment slider are preserved',()=>{
  assert.ok(revolve.includes('beginProfilePointer'));
  assert.ok(revolve.includes('nearestProfileSegment'));
  assert.ok(revolve.includes('installPenRange(segmentInput'));
  assert.ok(revolve.includes('min="3" max="64"'));
});

test('422 Apply ends Tool Session and keeps proven Revolve geometry path',()=>{
  assert.ok(revolve.includes('buildRevolveFromPoints(points'));
  assert.ok(revolve.includes('endRevolveSession();'));
  assert.ok(revolve.includes("__boxlabObjectSelection?.single?.(object.id)"));
});

test('422 shared drawer ownership and protected transform pin remain intact',()=>{
  assert.ok(toolSession.includes('enforceOpenWhileActive'));
  assertAssetReference(index,'revolve-profile.js');
  assert.ok(index.includes('src/multi-object-transform.js?v=0.36.1.0'));
});


test('788 current Revolve contract rejects retired default',()=>{
 let changed=false;
 assert.throws(()=>currentLauncher((source,name)=>{
  if(name!=='revolve-profile.js')return source;
  const needle='launchRow.hidden=false;';
  assert.ok(source.includes(needle));changed=true;
  return source.replace(needle,'launchRow.hidden=true;');
 }),/launcher available without construction/);
 assert.equal(changed,true);
});


test('788 Revolve Cancel rejects restoring history length without tokens',()=>{
 let changed=false;
 assert.throws(()=>currentLauncher((source,name)=>{
  if(name!=='revolve-profile.js')return source;
  const needle='history.redoStack.splice(0,history.redoStack.length,...profileRedoEntries)';
  assert.ok(source.includes(needle));changed=true;
  return source.replace(needle,'history.redoStack.length=profileRedoEntries.length');
 }),/Cancel restores original redo token/);
 assert.equal(changed,true);
});


test('788 Revolve Cancel restores undo tokens evicted at the history limit',()=>{
 let changed=false;
 assert.throws(()=>currentLauncher((source,name)=>{
  if(name!=='revolve-profile.js')return source;
  const needle='history.undoStack.splice(0,history.undoStack.length,...profileUndoEntries)';
  assert.ok(source.includes(needle));changed=true;
  return source.replace(needle,'history.undoStack.length=profileUndoEntries.length');
 }),/Cancel restores original undo token/);
 assert.equal(changed,true);
});


test('788 Revolve Cancel preserves real object-history redo scene tags',()=>{
 const f=revolveRuntime(),h=f.history,bridge=f.context.__boxlabObjectHistory;
 const original=bridge.capture();
 const future=f.manager.addMesh(f.state.mesh.clone(),'Future object');
 bridge.checkpointSnapshot(original);
 h.undo(f.state.mesh);
 assert.equal(f.manager.objects.length,1);
 const redo=h.redoStack[0];
 f.click('#revolveProfileLaunchBtn');f.frame();
 f.click('#revolveProfileCancelBtn');f.frame();
 assert.equal(h.redoStack[0],redo);
 const result=h.redo(f.state.mesh);
 assert.ok(result);
 assert.equal(f.manager.objects.length,2,'original tagged future scene restored');
 assert.equal(f.manager.activeId,future.id);
});
