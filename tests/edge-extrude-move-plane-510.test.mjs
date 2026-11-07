import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {edgeRuntime} from './helpers/edge-extrude-runtime.mjs';
import {snapshot} from './helpers/negative-extrude-runtime.mjs';

const edge=fs.readFileSync(new URL('../src/edge-extrude.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('510 Edge Extrude arms real Move on first arm transition',()=>{
  assert.match(edge,/const wasArmed=armed/);
  assert.match(edge,/if\(armed&&!wasArmed\)\{/);
  assert.match(edge,/__boxlabTransformArming\?\.activateRealMove\?\.\(\)/);
});

test('510 Edge Extrude defaults transform constraint to Plane',()=>{
  assert.match(edge,/__boxlabTransformArming\?\.setConstraint\?\.\('plane'\)/);
  assert.match(edge,/Move armed • Plane constraint/);
  assert.match(edge,/edgeExtrudePlaneConstraintBtn/);
});

function repeatedPulls(sourceTransform){
  const f=edgeRuntime(undefined,{sourceTransform});
  f.edgeSession.openFromHub();f.flush();
  assert.equal(f.edge.direction(),'plane');
  f.choose('y');
  for(let i=0;i<2;i++){
    f.edgePull(f.ids()[0]);
    assert.equal(f.history.undoStack.length,i+1);
    assert.equal(f.state.mesh.faces.length,i+1);
    assert.equal(f.edge.direction(),'y','commit preserves chosen direction');
    assert.equal(f.edge.isArmed(),true);
    assert.equal(f.edge.busy(),false);
  }
  const before=snapshot(f.state.mesh);
  f.history.redoStack.push(f.state.mesh.clone());
  f.edgePull(f.ids()[0],30,-60,'pointercancel');
  assert.equal(snapshot(f.state.mesh),before);
  assert.equal(f.history.undoStack.length,2);
  assert.equal(f.history.redoStack.length,1);
  assert.equal(f.edge.direction(),'y');
  assert.equal(f.canvas.capture,null);
  f.edge.setArmed(true);f.flush();
  assert.equal(f.edge.direction(),'y','idempotent arm retains choice');
  f.click('.vts-done');f.flush();
  assert.equal(f.edge.isArmed(),false);
  f.edgeSession.openFromHub();f.flush();
  assert.equal(f.edge.direction(),'plane','fresh session restores Plane default');
}

test('510 repeated pulls preserve later user-selected constraint',()=>repeatedPulls());

test('787 repeated-pull regression rejects resetting Plane on every arm',()=>{
  let changed=false;
  assert.throws(()=>repeatedPulls((source,name)=>{
    if(name!=='edge-extrude.js')return source;
    const needle='if(armed&&!wasArmed){';
    assert.ok(source.includes(needle));changed=true;
    return source.replace(needle,'if(armed){');
  }),/commit preserves chosen direction/);
  assert.equal(changed,true);
});

test('510 cache-hops only Edge Extrude and preserves protected pins',()=>{
  assertAssetReference(index,'edge-extrude.js');
  assertAssetReference(index,'main.js');
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'rotate-transform.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
