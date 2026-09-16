import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { EditableMesh } from '../src/mesh.js';
import { installBridgeTopology } from '../src/bridge-topology.js';
import { installUnequalBridge } from '../src/bridge-unequal.js';
import { installUnequalBridgeQuality } from '../src/bridge-unequal-quality.js';
import { installTransactionalBridge } from '../src/bridge-transactional.js';

installBridgeTopology(EditableMesh);
installUnequalBridge(EditableMesh);
installUnequalBridgeQuality(EditableMesh);
installTransactionalBridge(EditableMesh);

function capLoop(count,z,radius=1,stretch=1){
  return Array.from({length:count},(_,i)=>{
    const a=(Math.PI*2*i/count)+(count%2?0.13:0);
    const radial=radius*(i===1?1.45:1);
    return new THREE.Vector3(Math.cos(a)*radial*stretch,Math.sin(a)*radial,z);
  });
}

function unequalCaps(aCount,bCount){
  const bottom=capLoop(aCount,-1,1,1.2),top=capLoop(bCount,1,1.15,.85);
  const vertices=[...bottom,...top];
  const bottomFace=Array.from({length:aCount},(_,i)=>aCount-1-i);
  const topFace=Array.from({length:bCount},(_,i)=>aCount+i);
  return new EditableMesh(vertices,[bottomFace,topFace]);
}

test('perimeter-aware planner handles an irregular 4 to 7 Bridge',()=>{
  const mesh=unequalCaps(4,7),ids=mesh.edges().map((_,i)=>i);
  const info=mesh.bridgeEdgeSelectionInfo(ids);
  assert.ok(info?.unequal);
  const plan=mesh.bestUnequalBridgePlan(info.loops[0],info.loops[1]);
  assert.ok(plan?.perimeterAware);
  const result=mesh.bridgeSelectedEdges(ids);
  assert.ok(result?.unequal);
  assert.equal(result.plan?.perimeterAware,true);
  assert.equal(globalThis.__boxlabTopology.validateTopology(mesh,{allowBoundary:false}).ok,true);
  assert.equal(globalThis.__boxlabBridgeTransaction?.ok,true);
});

test('awkward 3 to 7 ratio remains closed and transactional',()=>{
  const mesh=unequalCaps(3,7),ids=mesh.edges().map((_,i)=>i);
  const result=mesh.bridgeSelectedEdges(ids);
  assert.ok(result?.unequal);
  assert.equal(result.plan?.perimeterAware,true);
  assert.equal(globalThis.__boxlabTopology.validateTopology(mesh,{allowBoundary:false}).ok,true);
});

test('equal-count Bridge remains on the original quad solver',()=>{
  const mesh=unequalCaps(4,4),ids=mesh.edges().map((_,i)=>i);
  const result=mesh.bridgeSelectedEdges(ids);
  assert.ok(result);
  assert.equal(result.unequal,undefined);
  assert.equal(result.plan?.perimeterAware,undefined);
  assert.equal(result.faceIndices.length,4);
  assert.equal(globalThis.__boxlabTopology.validateTopology(mesh,{allowBoundary:false}).ok,true);
});
