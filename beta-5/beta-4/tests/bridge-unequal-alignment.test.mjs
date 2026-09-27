import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { EditableMesh } from '../src/mesh.js';
import { installBridgeTopology } from '../src/bridge-topology.js';
import { installUnequalBridge } from '../src/bridge-unequal.js';
import { installUnequalBridgeQuality } from '../src/bridge-unequal-quality.js';
import { installUnequalBridgeAlignment } from '../src/bridge-unequal-alignment.js';
import { installTransactionalBridge } from '../src/bridge-transactional.js';

installBridgeTopology(EditableMesh);
installUnequalBridge(EditableMesh);
installUnequalBridgeQuality(EditableMesh);
installUnequalBridgeAlignment(EditableMesh);
installTransactionalBridge(EditableMesh);

function ring(count,z,{radius=1,rotation=0,offsetX=0,offsetY=0,stretchX=1,stretchY=1}={}){
  return Array.from({length:count},(_,i)=>{
    const a=rotation+Math.PI*2*i/count;
    const wobble=i===1?1.35:1;
    return new THREE.Vector3(
      offsetX+Math.cos(a)*radius*stretchX*wobble,
      offsetY+Math.sin(a)*radius*stretchY,
      z
    );
  });
}

function caps(aCount,bCount,topOptions={}){
  const bottom=ring(aCount,-1,{radius:1.1,stretchX:1.25,stretchY:.9});
  const top=ring(bCount,1,{radius:1.0,rotation:.52,offsetX:.35,offsetY:-.2,stretchX:.85,stretchY:1.2,...topOptions});
  const vertices=[...bottom,...top];
  const bottomFace=Array.from({length:aCount},(_,i)=>aCount-1-i);
  const topFace=Array.from({length:bCount},(_,i)=>aCount+i);
  return new EditableMesh(vertices,[bottomFace,topFace]);
}

test('rotated offset 4 to 7 Bridge uses twist-aware correspondence and remains closed',()=>{
  const mesh=caps(4,7),ids=mesh.edges().map((_,i)=>i);
  const result=mesh.bridgeSelectedEdges(ids);
  assert.ok(result?.unequal);
  assert.equal(result.plan?.perimeterAware,true);
  assert.equal(result.plan?.twistAware,true);
  assert.equal(globalThis.__boxlabTopology.validateTopology(mesh,{allowBoundary:false}).ok,true);
  assert.equal(globalThis.__boxlabBridgeTransaction?.ok,true);
});

test('rotated offset 5 to 8 Bridge produces a finite deterministic alignment plan',()=>{
  const mesh=caps(5,8,{rotation:.93,offsetX:-.45,offsetY:.3});
  const ids=mesh.edges().map((_,i)=>i),info=mesh.bridgeEdgeSelectionInfo(ids);
  assert.ok(info?.unequal);
  const first=mesh.bestUnequalBridgePlan(info.loops[0],info.loops[1]);
  const second=mesh.bestUnequalBridgePlan(info.loops[0],info.loops[1]);
  assert.ok(first?.twistAware);
  assert.ok(Number.isFinite(first.score));
  assert.equal(first.offset,second.offset);
  assert.equal(first.direction,second.direction);
  assert.equal(first.flip,second.flip);
});

test('equal-count Bridge still bypasses the unequal twist-aware planner',()=>{
  const mesh=caps(4,4),ids=mesh.edges().map((_,i)=>i);
  const result=mesh.bridgeSelectedEdges(ids);
  assert.ok(result);
  assert.equal(result.unequal,undefined);
  assert.equal(result.plan?.twistAware,undefined);
  assert.equal(result.faceIndices.length,4);
  assert.equal(globalThis.__boxlabTopology.validateTopology(mesh,{allowBoundary:false}).ok,true);
});
