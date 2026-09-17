import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { canTryAllQuad, densifyLoopToCount, splitBoundaryEdge, installSubdFriendlyBridge } from '../src/bridge-all-quad.js';

const key=(a,b)=>a<b?`${a}:${b}`:`${b}:${a}`;

function square(){return [new THREE.Vector3(-1,-1,0),new THREE.Vector3(1,-1,0),new THREE.Vector3(1,1,0),new THREE.Vector3(-1,1,0)];}
function ring(n,z=2,r=1.2){return Array.from({length:n},(_,i)=>new THREE.Vector3(Math.cos(i*Math.PI*2/n)*r,Math.sin(i*Math.PI*2/n)*r,z));}

test('268 eligibility is deliberately conservative',()=>{
  assert.equal(canTryAllQuad([0,1,2,3],[4,5,6,7,8,9]),true);
  assert.equal(canTryAllQuad([0,1,2,3,4],[5,6,7,8,9,10,11,12]),true);
  assert.equal(canTryAllQuad([0,1,2],[3,4,5,6,7,8,9]),false);
  assert.equal(canTryAllQuad([0,1,2,3],[4,5,6,7]),false);
});

test('densifying a boundary inserts vertices into its owning face',()=>{
  const mesh={vertices:square(),faces:[[0,1,2,3]],creases:new Map(),looseEdges:new Set(),looseVertices:new Set(),edgeKey:key};
  const loop=[0,1,2,3],dense=densifyLoopToCount(mesh,loop,6);
  assert.equal(dense.length,6);
  assert.equal(mesh.vertices.length,6);
  assert.equal(mesh.faces[0].length,6);
  assert.equal(new Set(mesh.faces[0]).size,6);
});

test('boundary split preserves crease strength across both new edge halves',()=>{
  const mesh={vertices:square(),faces:[[0,1,2,3]],creases:new Map([[key(0,1),.75]]),looseEdges:new Set(),looseVertices:new Set(),edgeKey:key};
  const loop=[0,1,2,3],v=splitBoundaryEdge(mesh,loop,0);
  assert.equal(v,4);
  assert.equal(mesh.creases.has(key(0,1)),false);
  assert.equal(mesh.creases.get(key(0,4)),.75);
  assert.equal(mesh.creases.get(key(4,1)),.75);
});

test('4 to 6 uses two inserted vertices and produces six quads',()=>{
  class DummyMesh{
    constructor(){this.vertices=[...square(),...ring(6)];this.faces=[];this.creases=new Map();this.looseEdges=new Set();this.looseVertices=new Set();}
    edgeKey(a,b){return key(a,b);}
    bridgeLoops(a,b){
      if(a.length!==b.length)return{fallback:true,faceIndices:[],plan:{faces:[]},unequal:true};
      const start=this.faces.length;
      for(let i=0;i<a.length;i++){const j=(i+1)%a.length;this.faces.push([a[i],a[j],b[j],b[i]]);}
      return{faceIndices:Array.from({length:a.length},(_,i)=>start+i),plan:{quads:true}};
    }
  }
  globalThis.__boxlabTopology={
    cloneMeshState:m=>({vertices:m.vertices.map(v=>v.clone()),faces:m.faces.map(f=>[...f]),creases:new Map(m.creases),looseEdges:new Set(m.looseEdges),looseVertices:new Set(m.looseVertices)}),
    restoreMeshState:(m,s)=>{m.vertices=s.vertices.map(v=>v.clone());m.faces=s.faces.map(f=>[...f]);m.creases=new Map(s.creases);m.looseEdges=new Set(s.looseEdges);m.looseVertices=new Set(s.looseVertices);}
  };
  installSubdFriendlyBridge(DummyMesh);
  const mesh=new DummyMesh(),before=mesh.vertices.length,result=mesh.bridgeLoops([0,1,2,3],[4,5,6,7,8,9]);
  assert.equal(result?.allQuad,true);
  assert.equal(result?.subdFriendly,true);
  assert.equal(result?.addedVertices,2);
  assert.deepEqual(result?.denseCounts,[6,6]);
  assert.equal(mesh.vertices.length,before+2);
  assert.equal(result.faceIndices.length,6);
  assert.ok(result.faceIndices.every(fi=>mesh.faces[fi]?.length===4));
});

test('extreme mismatch falls through without adding vertices',()=>{
  class FallbackMesh{
    constructor(){this.vertices=[...ring(3,0),...ring(7,2)];this.faces=[];this.creases=new Map();this.looseEdges=new Set();this.looseVertices=new Set();}
    edgeKey(a,b){return key(a,b);}
    bridgeLoops(){return{fallback:true,faceIndices:[99],unequal:true};}
  }
  globalThis.__boxlabTopology={cloneMeshState:()=>null,restoreMeshState:()=>{}};
  installSubdFriendlyBridge(FallbackMesh);
  const mesh=new FallbackMesh(),before=mesh.vertices.length,result=mesh.bridgeLoops([0,1,2],[3,4,5,6,7,8,9]);
  assert.equal(result?.fallback,true);
  assert.equal(mesh.vertices.length,before);
});
