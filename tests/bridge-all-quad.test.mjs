import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { canTryAllQuad, densifyLoopToCount, splitBoundaryEdge, balancedSplitEdgeIndex, validateClosedAllQuadCandidate, installSubdFriendlyBridge } from '../src/bridge-all-quad.js';

const key=(a,b)=>a<b?`${a}:${b}`:`${b}:${a}`;

function square(){return [new THREE.Vector3(-1,-1,0),new THREE.Vector3(1,-1,0),new THREE.Vector3(1,1,0),new THREE.Vector3(-1,1,0)];}
function ring(n,z=2,r=1.2){return Array.from({length:n},(_,i)=>new THREE.Vector3(Math.cos(i*Math.PI*2/n)*r,Math.sin(i*Math.PI*2/n)*r,z));}

test('279 eligibility remains conservative beyond the expanded envelope',()=>{
  assert.equal(canTryAllQuad([0,1,2,3],[4,5,6,7,8,9]),true);
  assert.equal(canTryAllQuad([0,1,2,3,4],[5,6,7,8,9,10,11,12]),true);
  assert.equal(canTryAllQuad([0,1,2],[3,4,5,6,7,8,9]),true);
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
    constructor(){this.vertices=[...ring(4,0,1.2),...ring(6,2,1.2)];this.faces=[];this.creases=new Map();this.looseEdges=new Set();this.looseVertices=new Set();}
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
    restoreMeshState:(m,s)=>{m.vertices=s.vertices.map(v=>v.clone());m.faces=s.faces.map(f=>[...f]);m.creases=new Map(s.creases);m.looseEdges=new Set(s.looseEdges);m.looseVertices=new Set(s.looseVertices);},
    validateTopology:()=>({ok:true})
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

test('3 to 9 mismatch falls through without adding vertices',()=>{
  class FallbackMesh{
    constructor(){this.vertices=[...ring(3,0),...ring(10,2)];this.faces=[];this.creases=new Map();this.looseEdges=new Set();this.looseVertices=new Set();}
    edgeKey(a,b){return key(a,b);}
    bridgeLoops(){return{fallback:true,faceIndices:[99],unequal:true};}
  }
  globalThis.__boxlabTopology={cloneMeshState:()=>null,restoreMeshState:()=>{},validateTopology:()=>({ok:true})};
  installSubdFriendlyBridge(FallbackMesh);
  const mesh=new FallbackMesh(),before=mesh.vertices.length,result=mesh.bridgeLoops([0,1,2],[3,4,5,6,7,8,9,10,11,12]);
  assert.equal(result?.fallback,true);
  assert.equal(mesh.vertices.length,before);
});


test('272 spreads comparable splits around a regular loop',()=>{
  const mesh={vertices:square(),faces:[[0,1,2,3]],creases:new Map(),looseEdges:new Set(),looseVertices:new Set(),edgeKey:key};
  const dense=densifyLoopToCount(mesh,[0,1,2,3],6);
  assert.equal(dense.length,6);
  const added=mesh.vertices.slice(4);
  assert.equal(added.length,2);
  assert.ok(added[0].distanceTo(new THREE.Vector3(0,-1,0))<1e-9);
  assert.ok(added[1].distanceTo(new THREE.Vector3(0,1,0))<1e-9);
});

test('272 still gives a materially longer edge priority over spread',()=>{
  const verts=[new THREE.Vector3(0,0,0),new THREE.Vector3(4,0,0),new THREE.Vector3(3,1,0),new THREE.Vector3(0,1,0)];
  const mesh={vertices:verts,faces:[[0,1,2,3]],creases:new Map(),looseEdges:new Set(),looseVertices:new Set(),edgeKey:key};
  assert.equal(balancedSplitEdgeIndex(mesh,[0,1,2,3],[new THREE.Vector3(2,0,0)]),0);
});


test('282 eligibility includes 3 to 8 but still excludes 3 to 9',()=>{
  assert.equal(canTryAllQuad([0,1,2],[3,4,5,6,7,8,9]),true);
  assert.equal(canTryAllQuad([0,1,2],[3,4,5,6,7,8,9,10]),true);
  assert.equal(canTryAllQuad([0,1,2],[3,4,5,6,7,8,9,10,11]),true);
  assert.equal(canTryAllQuad([0,1,2],[3,4,5,6,7,8,9,10,11,12]),false);
});

test('279 3 to 7 can produce seven quads with four inserted vertices',()=>{
  class DummyMesh{
    constructor(){this.vertices=[...ring(3,0,1),...ring(7,2,1.2)];this.faces=[];this.creases=new Map();this.looseEdges=new Set();this.looseVertices=new Set();}
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
    restoreMeshState:(m,s)=>{m.vertices=s.vertices.map(v=>v.clone());m.faces=s.faces.map(f=>[...f]);m.creases=new Map(s.creases);m.looseEdges=new Set(s.looseEdges);m.looseVertices=new Set(s.looseVertices);},
    validateTopology:()=>({ok:true})
  };
  installSubdFriendlyBridge(DummyMesh);
  const mesh=new DummyMesh(),before=mesh.vertices.length,result=mesh.bridgeLoops([0,1,2],[3,4,5,6,7,8,9]);
  assert.equal(result?.allQuad,true);
  assert.equal(result?.addedVertices,4);
  assert.deepEqual(result?.denseCounts,[7,7]);
  assert.equal(mesh.vertices.length,before+4);
  assert.equal(result.faceIndices.length,7);
  assert.ok(result.faceIndices.every(fi=>mesh.faces[fi]?.length===4));
});


test('280 guard rejects a folded closed-loop quad explicitly',()=>{
  const mesh={vertices:[new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(1,1,0),new THREE.Vector3(1,-1,0)]};
  const result=validateClosedAllQuadCandidate(mesh,[[0,1,2,3]],[0,1],[3,2],1);
  assert.equal(result.ok,false);
  assert.equal(result.reason,'folded-quad');
});

test('280 guard rejects extreme closed-loop connector distortion explicitly',()=>{
  const mesh={vertices:[new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(100,1,0),new THREE.Vector3(101,1,0)]};
  const result=validateClosedAllQuadCandidate(mesh,[[0,1,3,2]],[0,1],[2,3],1);
  assert.equal(result.ok,false);
  assert.equal(result.reason,'connector-distortion');
});

test('280 quality guard marks successful 3 to 7 all-quad bridge',()=>{
  class DummyMesh{
    constructor(){this.vertices=[...ring(3,0,1),...ring(7,2,1.2)];this.faces=[];this.creases=new Map();this.looseEdges=new Set();this.looseVertices=new Set();}
    edgeKey(a,b){return key(a,b);}
    bridgeLoops(a,b){
      if(a.length!==b.length)return{fallback:true,faceIndices:[],unequal:true};
      const start=this.faces.length;
      for(let i=0;i<a.length;i++){const j=(i+1)%a.length;this.faces.push([a[i],a[j],b[j],b[i]]);}
      return{faceIndices:Array.from({length:a.length},(_,i)=>start+i),plan:{quads:true}};
    }
  }
  globalThis.__boxlabTopology={
    cloneMeshState:m=>({vertices:m.vertices.map(v=>v.clone()),faces:m.faces.map(f=>[...f]),creases:new Map(m.creases),looseEdges:new Set(m.looseEdges),looseVertices:new Set(m.looseVertices)}),
    restoreMeshState:(m,s)=>{m.vertices=s.vertices.map(v=>v.clone());m.faces=s.faces.map(f=>[...f]);m.creases=new Map(s.creases);m.looseEdges=new Set(s.looseEdges);m.looseVertices=new Set(s.looseVertices);},
    validateTopology:()=>({ok:true})
  };
  installSubdFriendlyBridge(DummyMesh);
  const mesh=new DummyMesh(),result=mesh.bridgeLoops([0,1,2],[3,4,5,6,7,8,9]);
  assert.equal(result?.allQuad,true);
  assert.equal(result?.qualityGuarded,true);
  assert.equal(globalThis.__boxlabClosedAllQuadBridge?.ok,true);
  assert.equal(globalThis.__boxlabClosedAllQuadBridge?.lastReject,null);
});


test('281 regular triangle to seven spaces repeated inserts evenly on original edges',()=>{
  const verts=ring(3,0,1.5),mesh={vertices:verts,faces:[[0,1,2]],creases:new Map(),looseEdges:new Set(),looseVertices:new Set(),edgeKey:key};
  const dense=densifyLoopToCount(mesh,[0,1,2],7);
  assert.equal(dense.length,7);
  assert.equal(mesh.vertices.length,7);
  const original=[0,1,2];
  for(const a of original)assert.ok(dense.includes(a));
});

test('281 two inserts on one closed-loop edge are placed at thirds and preserve crease segments',()=>{
  const verts=[new THREE.Vector3(0,0,0),new THREE.Vector3(9,0,0),new THREE.Vector3(6,.1,0),new THREE.Vector3(3,.1,0)];
  const mesh={vertices:verts,faces:[[0,1,2,3]],creases:new Map([[key(0,1),.6]]),looseEdges:new Set(),looseVertices:new Set(),edgeKey:key};
  const dense=densifyLoopToCount(mesh,[0,1,2,3],6);
  const between=dense.slice(1,dense.indexOf(1));
  assert.equal(between.length,2);
  assert.ok(Math.abs(mesh.vertices[between[0]].x-3)<1e-9);
  assert.ok(Math.abs(mesh.vertices[between[1]].x-6)<1e-9);
  assert.equal(mesh.creases.get(key(0,between[0])),.6);
  assert.equal(mesh.creases.get(key(between[0],between[1])),.6);
  assert.equal(mesh.creases.get(key(between[1],1)),.6);
});

test('281 regular square to eight allocates one insert per original edge',()=>{
  const mesh={vertices:square(),faces:[[0,1,2,3]],creases:new Map(),looseEdges:new Set(),looseVertices:new Set(),edgeKey:key};
  const dense=densifyLoopToCount(mesh,[0,1,2,3],8);
  assert.equal(dense.length,8);
  assert.equal(mesh.faces[0].length,8);
  assert.equal(mesh.vertices.length,8);
});


test('284 eligibility expands to closed-loop 3 to 9 but not 3 to 10',()=>{
  assert.equal(canTryAllQuad([0,1,2],[3,4,5,6,7,8,9,10,11]),true);
  assert.equal(canTryAllQuad([0,1,2],[3,4,5,6,7,8,9,10,11,12]),false);
});

test('282 guarded 3 to 8 can produce eight quads with five inserted vertices',()=>{
  class DummyMesh{
    constructor(){this.vertices=[...ring(3,0,1),...ring(8,2,1.2)];this.faces=[];this.creases=new Map();this.looseEdges=new Set();this.looseVertices=new Set();}
    edgeKey(a,b){return key(a,b);}
    bridgeLoops(a,b){
      if(a.length!==b.length)return{fallback:true,faceIndices:[],unequal:true};
      const start=this.faces.length;
      for(let i=0;i<a.length;i++){const j=(i+1)%a.length;this.faces.push([a[i],a[j],b[j],b[i]]);}
      return{faceIndices:Array.from({length:a.length},(_,i)=>start+i),plan:{quads:true}};
    }
  }
  globalThis.__boxlabTopology={
    cloneMeshState:m=>({vertices:m.vertices.map(v=>v.clone()),faces:m.faces.map(f=>[...f]),creases:new Map(m.creases),looseEdges:new Set(m.looseEdges),looseVertices:new Set(m.looseVertices)}),
    restoreMeshState:(m,s)=>{m.vertices=s.vertices.map(v=>v.clone());m.faces=s.faces.map(f=>[...f]);m.creases=new Map(s.creases);m.looseEdges=new Set(s.looseEdges);m.looseVertices=new Set(s.looseVertices);},
    validateTopology:()=>({ok:true})
  };
  installSubdFriendlyBridge(DummyMesh);
  const mesh=new DummyMesh(),before=mesh.vertices.length,result=mesh.bridgeLoops([0,1,2],[3,4,5,6,7,8,9,10]);
  assert.equal(result?.allQuad,true);
  assert.equal(result?.qualityGuarded,true);
  assert.equal(result?.addedVertices,5);
  assert.deepEqual(result?.denseCounts,[8,8]);
  assert.equal(mesh.vertices.length,before+5);
  assert.equal(result.faceIndices.length,8);
  assert.ok(result.faceIndices.every(fi=>mesh.faces[fi]?.length===4));
});

test('284 3 to 10 remains on proven unequal fallback without densification',()=>{
  class FallbackMesh{
    constructor(){this.vertices=[...ring(3,0),...ring(10,2)];this.faces=[];this.creases=new Map();this.looseEdges=new Set();this.looseVertices=new Set();}
    edgeKey(a,b){return key(a,b);}
    bridgeLoops(){return{fallback:true,faceIndices:[99],unequal:true};}
  }
  globalThis.__boxlabTopology={cloneMeshState:()=>null,restoreMeshState:()=>{},validateTopology:()=>({ok:true})};
  installSubdFriendlyBridge(FallbackMesh);
  const mesh=new FallbackMesh(),before=mesh.vertices.length,result=mesh.bridgeLoops([0,1,2],[3,4,5,6,7,8,9,10,11,12]);
  assert.equal(result?.fallback,true);
  assert.equal(mesh.vertices.length,before);
});


test('284 guarded 3 to 9 can produce nine quads with six inserted vertices',()=>{
  class DummyMesh{
    constructor(){this.vertices=[...ring(3,0,1),...ring(9,2,1.2)];this.faces=[];this.creases=new Map();this.looseEdges=new Set();this.looseVertices=new Set();}
    edgeKey(a,b){return key(a,b);}
    bridgeLoops(a,b){
      if(a.length!==b.length)return{fallback:true,faceIndices:[],unequal:true};
      const start=this.faces.length;
      for(let i=0;i<a.length;i++){const j=(i+1)%a.length;this.faces.push([a[i],a[j],b[j],b[i]]);}
      return{faceIndices:Array.from({length:a.length},(_,i)=>start+i),plan:{quads:true}};
    }
  }
  globalThis.__boxlabTopology={
    cloneMeshState:m=>({vertices:m.vertices.map(v=>v.clone()),faces:m.faces.map(f=>[...f]),creases:new Map(m.creases),looseEdges:new Set(m.looseEdges),looseVertices:new Set(m.looseVertices)}),
    restoreMeshState:(m,s)=>{m.vertices=s.vertices.map(v=>v.clone());m.faces=s.faces.map(f=>[...f]);m.creases=new Map(s.creases);m.looseEdges=new Set(s.looseEdges);m.looseVertices=new Set(s.looseVertices);},
    validateTopology:()=>({ok:true})
  };
  installSubdFriendlyBridge(DummyMesh);
  const mesh=new DummyMesh(),before=mesh.vertices.length,result=mesh.bridgeLoops([0,1,2],[3,4,5,6,7,8,9,10,11]);
  assert.equal(result?.allQuad,true);
  assert.equal(result?.qualityGuarded,true);
  assert.equal(result?.addedVertices,6);
  assert.deepEqual(result?.denseCounts,[9,9]);
  assert.equal(mesh.vertices.length,before+6);
  assert.equal(result.faceIndices.length,9);
  assert.ok(result.faceIndices.every(fi=>mesh.faces[fi]?.length===4));
});


test('287 closed-loop guarded Bridge reports bounded multi-phase search',()=>{
  class DummyMesh{
    constructor(){this.vertices=[...ring(3,0,1),...ring(9,2,1.2)];this.faces=[];this.creases=new Map();this.looseEdges=new Set();this.looseVertices=new Set();}
    edgeKey(a,b){return key(a,b);}
    bridgeLoops(a,b){
      if(a.length!==b.length)return{fallback:true,faceIndices:[],unequal:true};
      const start=this.faces.length;
      for(let i=0;i<a.length;i++){const j=(i+1)%a.length;this.faces.push([a[i],a[j],b[j],b[i]]);}
      return{faceIndices:Array.from({length:a.length},(_,i)=>start+i),plan:{quads:true}};
    }
  }
  globalThis.__boxlabTopology={
    cloneMeshState:m=>({vertices:m.vertices.map(v=>v.clone()),faces:m.faces.map(f=>[...f]),creases:new Map(m.creases),looseEdges:new Set(m.looseEdges),looseVertices:new Set(m.looseVertices)}),
    restoreMeshState:(m,s)=>{m.vertices=s.vertices.map(v=>v.clone());m.faces=s.faces.map(f=>[...f]);m.creases=new Map(s.creases);m.looseEdges=new Set(s.looseEdges);m.looseVertices=new Set(s.looseVertices);},
    validateTopology:()=>({ok:true})
  };
  installSubdFriendlyBridge(DummyMesh);
  const mesh=new DummyMesh(),result=mesh.bridgeLoops([0,1,2],[3,4,5,6,7,8,9,10,11]);
  assert.equal(result?.allQuad,true);
  assert.equal(result?.correspondenceSearch,true);
  assert.ok(result?.searchCandidates>=1&&result.searchCandidates<=9);
  assert.ok(Number.isFinite(result?.searchScore));
  assert.equal(globalThis.__boxlabClosedAllQuadBridge?.ok,true);
  assert.equal(globalThis.__boxlabClosedAllQuadBridge?.searchCandidates,result.searchCandidates);
});


test('287 closed-loop densification phases vary comparable-edge allocations',()=>{
  const make=()=>({vertices:square(),faces:[[0,1,2,3]],creases:new Map(),looseEdges:new Set(),looseVertices:new Set(),edgeKey:key});
  const a=make(),b=make();
  const da=densifyLoopToCount(a,[0,1,2,3],6,0),db=densifyLoopToCount(b,[0,1,2,3],6,1);
  const addedA=a.vertices.slice(4).map(v=>[Number(v.x.toFixed(6)),Number(v.y.toFixed(6))]);
  const addedB=b.vertices.slice(4).map(v=>[Number(v.x.toFixed(6)),Number(v.y.toFixed(6))]);
  assert.notDeepEqual(addedA,addedB);
  assert.equal(da.length,6);
  assert.equal(db.length,6);
});

test('287 3 to 9 closed-loop search evaluates nine bounded attempts',()=>{
  class DummyMesh{
    constructor(){this.vertices=[...ring(3,0,1),...ring(9,2,1.2)];this.faces=[];this.creases=new Map();this.looseEdges=new Set();this.looseVertices=new Set();}
    edgeKey(a,b){return key(a,b);}
    bridgeLoops(a,b){
      if(a.length!==b.length)return{fallback:true,faceIndices:[],unequal:true};
      const start=this.faces.length;
      for(let i=0;i<a.length;i++){const j=(i+1)%a.length;this.faces.push([a[i],a[j],b[j],b[i]]);}
      return{faceIndices:Array.from({length:a.length},(_,i)=>start+i),plan:{quads:true}};
    }
  }
  globalThis.__boxlabTopology={
    cloneMeshState:m=>({vertices:m.vertices.map(v=>v.clone()),faces:m.faces.map(f=>[...f]),creases:new Map(m.creases),looseEdges:new Set(m.looseEdges),looseVertices:new Set(m.looseVertices)}),
    restoreMeshState:(m,s)=>{m.vertices=s.vertices.map(v=>v.clone());m.faces=s.faces.map(f=>[...f]);m.creases=new Map(s.creases);m.looseEdges=new Set(s.looseEdges);m.looseVertices=new Set(s.looseVertices);},
    validateTopology:()=>({ok:true})
  };
  installSubdFriendlyBridge(DummyMesh);
  const mesh=new DummyMesh(),result=mesh.bridgeLoops([0,1,2],[3,4,5,6,7,8,9,10,11]);
  assert.equal(result?.allQuad,true);
  assert.equal(result?.searchAttempts,9);
  assert.ok(result?.searchCandidates>=1&&result.searchCandidates<=9);
  assert.ok(result?.searchRotation>=0&&result.searchRotation<3);
  assert.ok(result?.searchPhase>=0&&result.searchPhase<3);
  assert.equal(globalThis.__boxlabClosedAllQuadBridge?.searchAttempts,9);
});

test('287 keeps the closed-loop 3x envelope unchanged',()=>{
  assert.equal(canTryAllQuad([0,1,2],[3,4,5,6,7,8,9,10,11]),true);
  assert.equal(canTryAllQuad([0,1,2],[3,4,5,6,7,8,9,10,11,12]),false);
});
