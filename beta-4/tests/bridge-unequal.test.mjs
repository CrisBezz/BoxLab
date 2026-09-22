import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { EditableMesh } from '../src/mesh.js';
import { installBridgeTopology } from '../src/bridge-topology.js';
import { installUnequalBridge } from '../src/bridge-unequal.js';
import { installTransactionalBridge } from '../src/bridge-transactional.js';

installBridgeTopology(EditableMesh);
installUnequalBridge(EditableMesh);
installTransactionalBridge(EditableMesh);

function unequalCaps(){
  const vertices=[];
  const square=[[-1,-1,-1],[-1,1,-1],[1,1,-1],[1,-1,-1]];
  square.forEach(p=>vertices.push(new THREE.Vector3(...p)));
  for(let i=0;i<6;i++){
    const a=i*Math.PI*2/6;
    vertices.push(new THREE.Vector3(Math.cos(a)*1.15,Math.sin(a)*1.15,1));
  }
  // Lower cap points outward toward -Z; upper hex points outward toward +Z.
  return new EditableMesh(vertices,[[0,1,2,3],[4,5,6,7,8,9]]);
}

test('edge Bridge joins 4-edge and 6-edge boundary loops transactionally',()=>{
  const mesh=unequalCaps(),ids=mesh.edges().map((_,i)=>i);
  const info=mesh.bridgeEdgeSelectionInfo(ids);
  assert.ok(info?.unequal);
  assert.deepEqual([...info.counts].sort((a,b)=>a-b),[4,6]);
  const result=mesh.bridgeSelectedEdges(ids);
  assert.ok(result?.unequal);
  assert.ok(result.faceIndices.length>=6);
  assert.ok(result.faceIndices.some(fi=>mesh.faces[fi].length===3));
  const validation=globalThis.__boxlabTopology.validateTopology(mesh,{allowBoundary:false});
  assert.equal(validation.ok,true);
  assert.equal(globalThis.__boxlabBridgeTransaction?.ok,true);
});

test('face Bridge accepts unequal polygon counts without damaging topology',()=>{
  const mesh=unequalCaps();
  const result=mesh.bridgeSelectedFaces([0,1]);
  assert.ok(result?.unequal);
  const validation=globalThis.__boxlabTopology.validateTopology(mesh,{allowBoundary:true});
  assert.equal(validation.ok,true);
  assert.equal(validation.boundary.length,10);
  assert.equal(globalThis.__boxlabBridgeTransaction?.ok,true);
});

test('equal-count Bridge remains on the existing quad solver',()=>{
  const vertices=[
    [-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],
    [-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]
  ].map(p=>new THREE.Vector3(...p));
  const mesh=new EditableMesh(vertices,[[0,3,2,1],[4,5,6,7]]),ids=mesh.edges().map((_,i)=>i);
  const result=mesh.bridgeSelectedEdges(ids);
  assert.ok(result);
  assert.equal(result.unequal,undefined);
  assert.equal(result.faceIndices.length,4);
  assert.ok(result.faceIndices.every(fi=>mesh.faces[fi].length===4));
});
