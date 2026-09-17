import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { EditableMesh } from '../src/mesh.js';
import { installLooseTopology } from '../src/loose-topology.js';
import { installBridgeTopology } from '../src/bridge-topology.js';
import { installUnequalBridge } from '../src/bridge-unequal.js';
import { installUnequalBridgeQuality } from '../src/bridge-unequal-quality.js';
import { installUnequalBridgeAlignment } from '../src/bridge-unequal-alignment.js';
import { installUnequalBridgeGlobal } from '../src/bridge-unequal-global.js';
import { installTransactionalBridge } from '../src/bridge-transactional.js';
import { installOpenChainBridge } from '../src/bridge-open-chain.js';

installLooseTopology(EditableMesh);
installBridgeTopology(EditableMesh);
installUnequalBridge(EditableMesh);
installUnequalBridgeQuality(EditableMesh);
installUnequalBridgeAlignment(EditableMesh);
installUnequalBridgeGlobal(EditableMesh);
installTransactionalBridge(EditableMesh);
installOpenChainBridge(EditableMesh);

function edgeIndex(mesh,a,b){const key=mesh.edgeKey(a,b);return mesh.edges().findIndex(e=>mesh.edgeKey(e.a,e.b)===key);}
function twoQuads(){
  const v=[
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(1,1,0),new THREE.Vector3(0,1,0),
    new THREE.Vector3(0,0,2),new THREE.Vector3(1,0,2),new THREE.Vector3(1,1,2),new THREE.Vector3(0,1,2)
  ];
  return new EditableMesh(v,[[0,3,2,1],[4,5,6,7]]);
}

test('1 edge to 1 edge creates one open quad',()=>{
  const mesh=twoQuads();
  const ids=[edgeIndex(mesh,0,1),edgeIndex(mesh,4,5)];
  const info=mesh.bridgeEdgeSelectionInfo(ids);
  assert.equal(info?.openChain,true);
  assert.equal(info.edgeCount,1);
  const before=mesh.faces.length,result=mesh.bridgeSelectedEdges(ids);
  assert.equal(result?.openChain,true);
  assert.equal(result.faceIndices.length,1);
  assert.equal(mesh.faces.length,before+1);
  assert.equal(globalThis.__boxlabTopology.validateTopology(mesh,{allowBoundary:true}).ok,true);
});

test('2 edges to 2 edges creates two quads and remains open',()=>{
  const mesh=twoQuads();
  const ids=[edgeIndex(mesh,0,1),edgeIndex(mesh,1,2),edgeIndex(mesh,4,5),edgeIndex(mesh,5,6)];
  const info=mesh.bridgeEdgeSelectionInfo(ids);
  assert.equal(info?.openChain,true);
  assert.equal(info.edgeCount,2);
  const result=mesh.bridgeSelectedEdges(ids);
  assert.equal(result?.faceIndices.length,2);
  assert.ok(result.faceIndices.every(fi=>mesh.faces[fi]?.length===4));
  const validation=globalThis.__boxlabTopology.validateTopology(mesh,{allowBoundary:true});
  assert.equal(validation.ok,true);
  assert.ok(validation.boundary.length>0);
});

test('3 edges to 3 edges creates a three-quad open strip',()=>{
  const mesh=twoQuads();
  const ids=[edgeIndex(mesh,0,1),edgeIndex(mesh,1,2),edgeIndex(mesh,2,3),edgeIndex(mesh,4,5),edgeIndex(mesh,5,6),edgeIndex(mesh,6,7)];
  const info=mesh.bridgeEdgeSelectionInfo(ids);
  assert.equal(info?.openChain,true);
  assert.equal(info.edgeCount,3);
  const result=mesh.bridgeSelectedEdges(ids);
  assert.equal(result?.faceIndices.length,3);
  assert.equal(globalThis.__boxlabTopology.validateTopology(mesh,{allowBoundary:true}).ok,true);
});

test('two loose edges can seed a single open quad',()=>{
  const mesh=new EditableMesh([
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),
    new THREE.Vector3(0,0,2),new THREE.Vector3(1,0,2)
  ],[]);
  mesh.ensureLooseTopology();
  mesh.addLooseEdge(0,1);mesh.addLooseEdge(2,3);
  const ids=[edgeIndex(mesh,0,1),edgeIndex(mesh,2,3)];
  const info=mesh.bridgeEdgeSelectionInfo(ids);
  assert.equal(info?.openChain,true);
  const result=mesh.bridgeSelectedEdges(ids);
  assert.equal(result?.faceIndices.length,1);
  assert.equal(mesh.faces.length,1);
  assert.equal(mesh.looseEdges.size,0);
  assert.equal(globalThis.__boxlabTopology.validateTopology(mesh,{allowBoundary:true}).ok,true);
});

test('unequal open chains are deferred rather than bridged in 264',()=>{
  const mesh=twoQuads();
  const ids=[edgeIndex(mesh,0,1),edgeIndex(mesh,4,5),edgeIndex(mesh,5,6)];
  assert.equal(mesh.bridgeEdgeSelectionInfo(ids),null);
  assert.equal(mesh.bridgeSelectedEdges(ids),null);
});
