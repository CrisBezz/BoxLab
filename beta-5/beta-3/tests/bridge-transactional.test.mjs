import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { EditableMesh } from '../src/mesh.js';
import { installBridgeTopology } from '../src/bridge-topology.js';
import { installTransactionalBridge } from '../src/bridge-transactional.js';

installBridgeTopology(EditableMesh);
installTransactionalBridge(EditableMesh);

const snapshot = mesh => JSON.stringify({
  vertices: mesh.vertices.map(v=>[v.x,v.y,v.z]),
  faces: mesh.faces.map(f=>[...f]),
  creases: [...(mesh.creases||[])],
  looseEdges: [...(mesh.looseEdges||[])].sort(),
  looseVertices: [...(mesh.looseVertices||[])].sort()
});

function twoCaps(){
  const v=[
    [-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],
    [-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]
  ].map(p=>new THREE.Vector3(...p));
  return new EditableMesh(v,[[0,3,2,1],[4,5,6,7]]);
}

function twoCubes(){
  const a=EditableMesh.cube(2),b=EditableMesh.cube(2);
  a.vertices.forEach(v=>v.z-=1.5);
  b.vertices.forEach(v=>v.z+=1.5);
  const vertices=[...a.vertices.map(v=>v.clone()),...b.vertices.map(v=>v.clone())];
  const faces=[...a.faces.map(f=>[...f]),...b.faces.map(f=>f.map(i=>i+8))];
  return new EditableMesh(vertices,faces);
}

test('edge Bridge commits a closed validated trial result',()=>{
  const mesh=twoCaps(),ids=mesh.edges().map((_,i)=>i);
  const result=mesh.bridgeSelectedEdges(ids);
  assert.ok(result);
  assert.equal(result.faceIndices.length,4);
  const validation=globalThis.__boxlabTopology.validateTopology(mesh,{allowBoundary:false});
  assert.equal(validation.ok,true);
  assert.equal(globalThis.__boxlabBridgeTransaction?.ok,true);
});

test('face Bridge removes two caps and commits only a valid closed result',()=>{
  const mesh=twoCubes();
  const result=mesh.bridgeSelectedFaces([1,6]);
  assert.ok(result);
  assert.equal(result.faceIndices.length,4);
  const validation=globalThis.__boxlabTopology.validateTopology(mesh,{allowBoundary:false});
  assert.equal(validation.ok,true);
  assert.equal(globalThis.__boxlabBridgeTransaction?.ok,true);
});

test('invalid Bridge output is rejected without mutating the live mesh',()=>{
  const mesh=twoCaps(),ids=mesh.edges().map((_,i)=>i),before=snapshot(mesh);
  const original=EditableMesh.prototype.bestBridgePlan;
  EditableMesh.prototype.bestBridgePlan=function(loopA,loopB){
    return {score:0,direction:1,offset:0,flip:false,windingPenalty:0,quads:[[loopA[0],loopA[1],loopA[1],loopB[0]]]};
  };
  try{
    const result=mesh.bridgeSelectedEdges(ids);
    assert.equal(result,null);
    assert.equal(snapshot(mesh),before);
    assert.equal(globalThis.__boxlabBridgeTransaction?.ok,false);
  }finally{
    EditableMesh.prototype.bestBridgePlan=original;
  }
});
