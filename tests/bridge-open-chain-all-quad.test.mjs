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
import { installOpenChainAllQuadBridge,canTryOpenAllQuad,densifyOpenChainToCount,validateOpenAllQuadCandidate } from '../src/bridge-open-chain-all-quad.js';

installLooseTopology(EditableMesh);
installBridgeTopology(EditableMesh);
installUnequalBridge(EditableMesh);
installUnequalBridgeQuality(EditableMesh);
installUnequalBridgeAlignment(EditableMesh);
installUnequalBridgeGlobal(EditableMesh);
installTransactionalBridge(EditableMesh);
installOpenChainBridge(EditableMesh);
installOpenChainAllQuadBridge(EditableMesh);

function edgeIndex(mesh,a,b){const key=mesh.edgeKey(a,b);return mesh.edges().findIndex(e=>mesh.edgeKey(e.a,e.b)===key);}
function twoQuads(){
  const v=[
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(1,1,0),new THREE.Vector3(0,1,0),
    new THREE.Vector3(0,0,2),new THREE.Vector3(1,0,2),new THREE.Vector3(1,1,2),new THREE.Vector3(0,1,2)
  ];
  return new EditableMesh(v,[[0,3,2,1],[4,5,6,7]]);
}
function looseParallel(edgeCountA,edgeCountB){
  const vertices=[];
  for(let i=0;i<=edgeCountA;i++)vertices.push(new THREE.Vector3(i/edgeCountA,0,0));
  const offset=vertices.length;
  for(let i=0;i<=edgeCountB;i++)vertices.push(new THREE.Vector3(i/edgeCountB,.15,2));
  const mesh=new EditableMesh(vertices,[]);mesh.ensureLooseTopology();
  for(let i=0;i<edgeCountA;i++)mesh.addLooseEdge(i,i+1);
  for(let i=0;i<edgeCountB;i++)mesh.addLooseEdge(offset+i,offset+i+1);
  const ids=[];
  for(let i=0;i<edgeCountA;i++)ids.push(edgeIndex(mesh,i,i+1));
  for(let i=0;i<edgeCountB;i++)ids.push(edgeIndex(mesh,offset+i,offset+i+1));
  return{mesh,ids};
}

test('273 eligibility is conservative for unequal open chains',()=>{
  assert.equal(canTryOpenAllQuad([0,1],[2,3,4]),true);
  assert.equal(canTryOpenAllQuad([0,1,2],[3,4,5,6]),true);
  assert.equal(canTryOpenAllQuad([0,1],[2,3,4,5,6]),false);
  assert.equal(canTryOpenAllQuad([0,1,2],[3,4,5]),false);
});

test('273 densifies only interior edges and preserves open endpoints',()=>{
  const mesh={vertices:[new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(2,0,0)],faces:[],creases:new Map(),looseEdges:new Set(['0:1','1:2']),looseVertices:new Set(),edgeKey:(a,b)=>a<b?`${a}:${b}`:`${b}:${a}`};
  const dense=densifyOpenChainToCount(mesh,[0,1,2],5);
  assert.equal(dense.length,5);
  assert.equal(dense[0],0);
  assert.equal(dense.at(-1),2);
  assert.equal(mesh.vertices.length,5);
});

test('1 edge to 2 edges becomes a two-quad open strip',()=>{
  const mesh=twoQuads();
  const ids=[edgeIndex(mesh,0,1),edgeIndex(mesh,4,5),edgeIndex(mesh,5,6)];
  const beforeVertices=mesh.vertices.length,result=mesh.bridgeSelectedEdges(ids);
  assert.equal(result?.allQuad,true);
  assert.equal(result?.subdFriendly,true);
  assert.equal(result?.balancedDensification,true);
  assert.equal(result?.addedVertices,1);
  assert.equal(result?.plan?.triangleCount,0);
  assert.equal(result?.plan?.quadCount,2);
  assert.equal(mesh.vertices.length,beforeVertices+1);
  assert.ok(result.faceIndices.every(fi=>mesh.faces[fi]?.length===4));
  assert.equal(globalThis.__boxlabTopology.validateTopology(mesh,{allowBoundary:true}).ok,true);
});

test('clean parallel 2 edge to 3 edge chains become a three-quad open strip',()=>{
  const {mesh,ids}=looseParallel(2,3),result=mesh.bridgeSelectedEdges(ids);
  assert.equal(result?.allQuad,true);
  assert.equal(result?.plan?.triangleCount,0);
  assert.equal(result?.plan?.quadCount,3);
  assert.deepEqual([...result.denseCounts].sort((a,b)=>a-b),[3,3]);
  assert.equal(globalThis.__boxlabTopology.validateTopology(mesh,{allowBoundary:true}).ok,true);
});

test('fold-prone L-shaped 2 to 3 boundary case safely falls back to 266',()=>{
  const mesh=twoQuads();
  const ids=[edgeIndex(mesh,0,1),edgeIndex(mesh,1,2),edgeIndex(mesh,4,5),edgeIndex(mesh,5,6),edgeIndex(mesh,6,7)];
  const result=mesh.bridgeSelectedEdges(ids);
  assert.equal(result?.allQuad,undefined);
  assert.equal(result?.unequal,true);
  assert.equal(result?.plan?.triangleCount,1);
  assert.equal(globalThis.__boxlabTopology.validateTopology(mesh,{allowBoundary:true}).ok,true);
});

test('3 edge to 5 edge loose chains become five quads with two balanced inserts',()=>{
  const {mesh,ids}=looseParallel(3,5),result=mesh.bridgeSelectedEdges(ids);
  assert.equal(result?.allQuad,true);
  assert.equal(result?.addedVertices,2);
  assert.equal(result?.plan?.quadCount,5);
  assert.equal(result?.plan?.triangleCount,0);
  assert.ok(result.faceIndices.every(fi=>mesh.faces[fi]?.length===4));
  assert.equal(globalThis.__boxlabTopology.validateTopology(mesh,{allowBoundary:true}).ok,true);
});

test('extreme open-chain mismatch falls back to the proven 266 solver',()=>{
  const {mesh,ids}=looseParallel(1,4),result=mesh.bridgeSelectedEdges(ids);
  assert.equal(result?.allQuad,undefined);
  assert.equal(result?.unequal,true);
  assert.equal(result?.plan?.triangleCount,3);
  assert.equal(globalThis.__boxlabTopology.validateTopology(mesh,{allowBoundary:true}).ok,true);
});


test('274 guard reports folded quad explicitly',()=>{
  const mesh={vertices:[new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(1,1,0),new THREE.Vector3(1,-1,0)]};
  const result=validateOpenAllQuadCandidate(mesh,[[0,1,2,3]],[0,1],[3,2],1);
  assert.equal(result.ok,false);
  assert.equal(result.reason,'folded-quad');
});

test('274 guard reports extreme connector distortion explicitly',()=>{
  const mesh={vertices:[new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(100,1,0),new THREE.Vector3(101,1,0)]};
  const result=validateOpenAllQuadCandidate(mesh,[[0,1,3,2]],[0,1],[2,3],1);
  assert.equal(result.ok,false);
  assert.equal(result.reason,'connector-distortion');
});

test('274 fallback records reason for fold-prone L-shaped all-quad attempt',()=>{
  const mesh=twoQuads();
  const ids=[edgeIndex(mesh,0,1),edgeIndex(mesh,1,2),edgeIndex(mesh,4,5),edgeIndex(mesh,5,6),edgeIndex(mesh,6,7)];
  const result=mesh.bridgeSelectedEdges(ids);
  assert.equal(result?.allQuad,undefined);
  assert.equal(globalThis.__boxlabOpenChainAllQuadBridge?.ok,false);
  assert.ok(['folded-quad','degenerate-quad','connector-distortion','topology-rejected','same-direction-edge','non-manifold-edge'].includes(globalThis.__boxlabOpenChainAllQuadBridge?.lastReject));
});
