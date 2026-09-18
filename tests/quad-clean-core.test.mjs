import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { EditableMesh } from '../src/mesh.js';
import { evaluateTrianglePair, quadCleanTrianglePairs, quadCleanLocalRetopo, quadCleanSlivers, quadCleanFourTrianglePatches, quadCleanTriangleIslands, quadBoundaryFlowPenalty, quadPatchBoundaryContext, quadRelaxFlow, quadMeshFlowScore, quadCleanMesh } from '../src/quad-clean-core.js';

test('290 merges a clean triangulated quad without moving vertices',()=>{
  const verts=[
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),
    new THREE.Vector3(1,1,0),new THREE.Vector3(0,1,0)
  ];
  const mesh=new EditableMesh(verts,[[0,1,2],[0,2,3]]);
  const before=mesh.vertices.map(v=>v.clone());
  const result=quadCleanTrianglePairs(mesh);
  assert.equal(result.ok,true);
  assert.equal(result.changed,true);
  assert.equal(result.merged,1);
  assert.equal(result.before.triangles,2);
  assert.equal(result.after.triangles,0);
  assert.equal(result.after.quads,1);
  assert.equal(mesh.faces.length,1);
  assert.equal(mesh.faces[0].length,4);
  assert.equal(new Set(mesh.faces[0]).size,4);
  assert.equal(mesh.vertices.length,4);
  for(let i=0;i<4;i++)assert.ok(mesh.vertices[i].distanceTo(before[i])<1e-12);
});

test('290 preserves a creased triangle diagonal',()=>{
  const verts=[
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),
    new THREE.Vector3(1,1,0),new THREE.Vector3(0,1,0)
  ];
  const mesh=new EditableMesh(verts,[[0,1,2],[0,2,3]],[[meshKey(0,2),1]]);
  const pair=evaluateTrianglePair(mesh,0,1);
  assert.equal(pair.ok,false);
  assert.equal(pair.reason,'creased-edge');
  const result=quadCleanTrianglePairs(mesh);
  assert.equal(result.changed,false);
  assert.equal(mesh.faces.length,2);
});

test('290 refuses triangle pairs across a sharp surface break',()=>{
  const verts=[
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),
    new THREE.Vector3(1,1,0),new THREE.Vector3(0,1,1)
  ];
  const mesh=new EditableMesh(verts,[[0,1,2],[0,2,3]]);
  const pair=evaluateTrianglePair(mesh,0,1);
  assert.equal(pair.ok,false);
  assert.equal(pair.reason,'normal-break');
});

test('290 greedily converts two independent triangulated quads',()=>{
  const verts=[
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(1,1,0),new THREE.Vector3(0,1,0),
    new THREE.Vector3(2,0,0),new THREE.Vector3(3,0,0),new THREE.Vector3(3,1,0),new THREE.Vector3(2,1,0)
  ];
  const mesh=new EditableMesh(verts,[[0,1,2],[0,2,3],[4,5,6],[4,6,7]]);
  const result=quadCleanTrianglePairs(mesh);
  assert.equal(result.merged,2);
  assert.equal(result.after.triangles,0);
  assert.equal(result.after.quads,2);
  assert.equal(mesh.faces.length,2);
});

function meshKey(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}


test('291 relax improves a perturbed interior quad vertex while keeping the boundary fixed',()=>{
  const verts=[
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(2,0,0),
    new THREE.Vector3(0,1,0),new THREE.Vector3(1.35,1,0),new THREE.Vector3(2,1,0),
    new THREE.Vector3(0,2,0),new THREE.Vector3(1,2,0),new THREE.Vector3(2,2,0)
  ];
  const mesh=new EditableMesh(verts,[[0,1,4,3],[1,2,5,4],[3,4,7,6],[4,5,8,7]]);
  const boundary=[0,1,2,3,5,6,7,8].map(i=>mesh.vertices[i].clone());
  const before=quadMeshFlowScore(mesh),x=mesh.vertices[4].x;
  const result=quadRelaxFlow(mesh);
  assert.equal(result.ok,true);
  assert.equal(result.changed,true);
  assert.equal(result.relaxedVertices,1);
  assert.ok(mesh.vertices[4].x<x);
  assert.ok(Math.abs(mesh.vertices[4].z)<1e-12);
  assert.ok(quadMeshFlowScore(mesh)<before);
  [0,1,2,3,5,6,7,8].forEach((vi,n)=>assert.ok(mesh.vertices[vi].distanceTo(boundary[n])<1e-12));
});

test('291 relax freezes vertices touching a crease',()=>{
  const verts=[
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(2,0,0),
    new THREE.Vector3(0,1,0),new THREE.Vector3(1.35,1,0),new THREE.Vector3(2,1,0),
    new THREE.Vector3(0,2,0),new THREE.Vector3(1,2,0),new THREE.Vector3(2,2,0)
  ];
  const mesh=new EditableMesh(verts,[[0,1,4,3],[1,2,5,4],[3,4,7,6],[4,5,8,7]],[[meshKey(1,4),1]]);
  const center=mesh.vertices[4].clone();
  const result=quadRelaxFlow(mesh);
  assert.equal(result.changed,false);
  assert.ok(mesh.vertices[4].distanceTo(center)<1e-12);
});

test('291 Quad Clean runs merge then relax as one pipeline',()=>{
  const verts=[
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(2,0,0),
    new THREE.Vector3(0,1,0),new THREE.Vector3(1.25,1,0),new THREE.Vector3(2,1,0),
    new THREE.Vector3(0,2,0),new THREE.Vector3(1,2,0),new THREE.Vector3(2,2,0)
  ];
  const faces=[[0,1,4],[0,4,3],[1,2,5,4],[3,4,7,6],[4,5,8,7]];
  const mesh=new EditableMesh(verts,faces);
  const result=quadCleanMesh(mesh);
  assert.equal(result.ok,true);
  assert.equal(result.merged,1);
  assert.equal(result.after.triangles,0);
  assert.equal(result.after.quads,4);
  assert.ok(result.relaxedVertices>=0);
});


test('292 local retopo turns a four-triangle fan into one quad and removes the centre vertex',()=>{
  const verts=[
    new THREE.Vector3(-1,-1,0),new THREE.Vector3(1,-1,0),new THREE.Vector3(1,1,0),new THREE.Vector3(-1,1,0),
    new THREE.Vector3(0,0,0)
  ];
  const mesh=new EditableMesh(verts,[[4,0,1],[4,1,2],[4,2,3],[4,3,0]]);
  const boundary=verts.slice(0,4).map(v=>v.clone());
  const result=quadCleanLocalRetopo(mesh);
  assert.equal(result.ok,true);
  assert.equal(result.changed,true);
  assert.equal(result.fanRepairs,1);
  assert.equal(result.removedVertices,1);
  assert.equal(mesh.vertices.length,4);
  assert.equal(mesh.faces.length,1);
  assert.equal(mesh.faces[0].length,4);
  assert.equal(new Set(mesh.faces[0]).size,4);
  for(let i=0;i<4;i++)assert.ok(mesh.vertices[i].distanceTo(boundary[i])<1e-12);
});

test('292 local retopo preserves a fan when a radial edge is creased',()=>{
  const verts=[
    new THREE.Vector3(-1,-1,0),new THREE.Vector3(1,-1,0),new THREE.Vector3(1,1,0),new THREE.Vector3(-1,1,0),
    new THREE.Vector3(0,0,0)
  ];
  const mesh=new EditableMesh(verts,[[4,0,1],[4,1,2],[4,2,3],[4,3,0]],[[meshKey(4,1),1]]);
  const result=quadCleanLocalRetopo(mesh);
  assert.equal(result.changed,false);
  assert.equal(result.fanRepairs,0);
  assert.equal(mesh.vertices.length,5);
  assert.equal(mesh.faces.length,4);
});

test('292 Quad Clean pipeline repairs a quad fan before triangle-pair merging',()=>{
  const verts=[
    new THREE.Vector3(-1,-1,0),new THREE.Vector3(1,-1,0),new THREE.Vector3(1,1,0),new THREE.Vector3(-1,1,0),
    new THREE.Vector3(0,0,0)
  ];
  const mesh=new EditableMesh(verts,[[4,0,1],[4,1,2],[4,2,3],[4,3,0]]);
  const result=quadCleanMesh(mesh);
  assert.equal(result.ok,true);
  assert.equal(result.fanRepairs,1);
  assert.equal(result.merged,0);
  assert.equal(result.after.triangles,0);
  assert.equal(result.after.quads,1);
  assert.equal(result.after.vertices,4);
});


function triangulatedGrid4(shortInterior=false){
  const verts=[];
  for(let y=0;y<4;y++)for(let x=0;x<4;x++){
    let px=x;
    if(shortInterior&&x===2&&y===1)px=1.04;
    verts.push(new THREE.Vector3(px,y,0));
  }
  const faces=[];
  for(let y=0;y<3;y++)for(let x=0;x<3;x++){
    const a=y*4+x,b=a+1,c=a+4,d=c+1;
    faces.push([a,b,d],[a,d,c]);
  }
  return new EditableMesh(verts,faces);
}

test('293 sliver cleanup collapses an extremely short smooth interior triangle edge when quality improves',()=>{
  const mesh=triangulatedGrid4(true);
  const beforeV=mesh.vertices.length,beforeF=mesh.faces.length;
  const result=quadCleanSlivers(mesh);
  assert.equal(result.ok,true);
  assert.equal(result.changed,true);
  assert.equal(result.sliverRepairs,1);
  assert.equal(mesh.vertices.length,beforeV-1);
  assert.equal(mesh.faces.length,beforeF-2);
});

test('293 sliver cleanup preserves a short boundary edge',()=>{
  const verts=[];
  for(let y=0;y<4;y++)for(let x=0;x<4;x++){
    let px=x;
    if(x===2&&y===0)px=1.04;
    verts.push(new THREE.Vector3(px,y,0));
  }
  const faces=[];
  for(let y=0;y<3;y++)for(let x=0;x<3;x++){
    const a=y*4+x,b=a+1,c=a+4,d=c+1;
    faces.push([a,b,d],[a,d,c]);
  }
  const mesh=new EditableMesh(verts,faces);
  const before=mesh.vertices.map(v=>v.clone());
  const result=quadCleanSlivers(mesh);
  assert.equal(result.changed,false);
  assert.equal(mesh.vertices.length,16);
  for(let i=0;i<16;i++)assert.ok(mesh.vertices[i].distanceTo(before[i])<1e-12);
});

test('293 sliver cleanup preserves a creased short interior edge',()=>{
  const mesh=triangulatedGrid4(true);
  mesh.creases.set(meshKey(5,6),1);
  const result=quadCleanSlivers(mesh);
  assert.equal(result.changed,false);
  assert.equal(mesh.vertices.length,16);
});


test('296 four-triangle patch solver converts a bounded triangle island into two quads',()=>{
  const verts=[
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(2,0,0),
    new THREE.Vector3(0,1,0),new THREE.Vector3(1,1,0),new THREE.Vector3(2,1,0)
  ];
  const mesh=new EditableMesh(verts,[[0,1,4],[0,4,3],[1,2,5],[1,5,4]]);
  const result=quadCleanFourTrianglePatches(mesh);
  assert.equal(result.ok,true);
  assert.equal(result.changed,true);
  assert.equal(result.patchRepairs,1);
  assert.equal(result.merged,2);
  assert.equal(mesh.faces.length,2);
  assert.equal(mesh.faces.every(face=>face.length===4),true);
});

test('296 four-triangle patch solver preserves a bounded island when one required pairing is creased',()=>{
  const verts=[
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(2,0,0),
    new THREE.Vector3(0,1,0),new THREE.Vector3(1,1,0),new THREE.Vector3(2,1,0)
  ];
  const mesh=new EditableMesh(verts,[[0,1,4],[0,4,3],[1,2,5],[1,5,4]],[[meshKey(0,4),1],[meshKey(1,5),1]]);
  const result=quadCleanFourTrianglePatches(mesh);
  assert.equal(result.ok,true);
  assert.equal(result.changed,false);
  assert.equal(result.patchRepairs,0);
  assert.equal(mesh.faces.length,4);
});


test('297 bounded island solver converts six connected triangles into three quads',()=>{
  const verts=[
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(2,0,0),new THREE.Vector3(3,0,0),
    new THREE.Vector3(0,1,0),new THREE.Vector3(1,1,0),new THREE.Vector3(2,1,0),new THREE.Vector3(3,1,0)
  ];
  const faces=[
    [0,1,5],[0,5,4],
    [1,2,6],[1,6,5],
    [2,3,7],[2,7,6]
  ];
  const mesh=new EditableMesh(verts,faces);
  const result=quadCleanTriangleIslands(mesh);
  assert.equal(result.ok,true);
  assert.equal(result.changed,true);
  assert.equal(result.patchRepairs,1);
  assert.equal(result.patchTriangles,6);
  assert.equal(result.merged,3);
  assert.equal(mesh.faces.length,3);
  assert.equal(mesh.faces.every(face=>face.length===4),true);
});

test('297 bounded island solver leaves six-triangle island untouched when no complete safe pairing exists',()=>{
  const verts=[
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(2,0,0),new THREE.Vector3(3,0,0),
    new THREE.Vector3(0,1,0),new THREE.Vector3(1,1,0),new THREE.Vector3(2,1,0),new THREE.Vector3(3,1,0)
  ];
  const faces=[
    [0,1,5],[0,5,4],
    [1,2,6],[1,6,5],
    [2,3,7],[2,7,6]
  ];
  const mesh=new EditableMesh(verts,faces);
  for(const edge of mesh.edges())if(edge.faces?.length===2)mesh.creases.set(meshKey(edge.a,edge.b),1);
  const result=quadCleanTriangleIslands(mesh);
  assert.equal(result.ok,true);
  assert.equal(result.changed,false);
  assert.equal(result.patchRepairs,0);
  assert.equal(result.merged,0);
  assert.equal(mesh.faces.length,6);
});


test('298 surrounding quad-flow penalty prefers continuation of neighbouring quad rows',()=>{
  const verts=[
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),
    new THREE.Vector3(1,1,0),new THREE.Vector3(0,1,0),
    new THREE.Vector3(0,-1,0),new THREE.Vector3(1,-1,0),
    new THREE.Vector3(1,2,0)
  ];
  const mesh=new EditableMesh(verts,[
    [0,1,2],[0,2,3],
    [4,5,1,0]
  ]);
  const patchFaces=new Set([0,1]);
  const aligned=quadBoundaryFlowPenalty(mesh,[0,1,2,3],patchFaces);
  const crossed=quadBoundaryFlowPenalty(mesh,[0,1,2,6],patchFaces);
  assert.ok(aligned<1e-12);
  assert.ok(crossed>0.99);
});

test('298 quad-flow scoring is neutral when a repaired patch has no neighbouring quads',()=>{
  const verts=[
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),
    new THREE.Vector3(1,1,0),new THREE.Vector3(0,1,0)
  ];
  const mesh=new EditableMesh(verts,[[0,1,2],[0,2,3]]);
  const penalty=quadBoundaryFlowPenalty(mesh,[0,1,2,3],new Set([0,1]));
  assert.equal(penalty,0);
});


test('299 aggregate patch quality guard accepts regular six-triangle island',()=>{
  const verts=[
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(2,0,0),new THREE.Vector3(3,0,0),
    new THREE.Vector3(0,1,0),new THREE.Vector3(1,1,0),new THREE.Vector3(2,1,0),new THREE.Vector3(3,1,0)
  ];
  const faces=[
    [0,1,5],[0,5,4],
    [1,2,6],[1,6,5],
    [2,3,7],[2,7,6]
  ];
  const mesh=new EditableMesh(verts,faces);
  const result=quadCleanTriangleIslands(mesh);
  assert.equal(result.changed,true);
  assert.equal(result.patchRepairs,1);
  assert.equal(result.rejectedPatches,0);
});

test('299 aggregate patch quality guard rejects stretched but technically valid quad patch',()=>{
  const verts=[
    new THREE.Vector3(0,0,0),new THREE.Vector3(4.5,0,0),new THREE.Vector3(9,0,0),
    new THREE.Vector3(0,1,0),new THREE.Vector3(4.5,1,0),new THREE.Vector3(9,1,0)
  ];
  const faces=[
    [0,1,4],[0,4,3],
    [1,2,5],[1,5,4]
  ];
  const mesh=new EditableMesh(verts,faces);
  const result=quadCleanTriangleIslands(mesh);
  assert.equal(result.ok,true);
  assert.equal(result.changed,false);
  assert.equal(result.patchRepairs,0);
  assert.equal(result.rejectedPatches,1);
  assert.equal(mesh.faces.length,4);
});


test('300 residual triangle-pair cleanup keeps a regular isolated pair working',()=>{
  const verts=[
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),
    new THREE.Vector3(1,1,0),new THREE.Vector3(0,1,0)
  ];
  const mesh=new EditableMesh(verts,[[0,1,2],[0,2,3]]);
  const result=quadCleanTrianglePairs(mesh);
  assert.equal(result.ok,true);
  assert.equal(result.changed,true);
  assert.equal(result.merged,1);
  assert.equal(result.contextRejected,0);
  assert.equal(mesh.faces.length,1);
  assert.equal(mesh.faces[0].length,4);
});

test('300 residual triangle-pair cleanup rejects stretched mixed-context merge',()=>{
  const verts=[
    new THREE.Vector3(0,0,0),new THREE.Vector3(4.5,0,0),
    new THREE.Vector3(4.5,1,0),new THREE.Vector3(0,1,0),
    new THREE.Vector3(0,-1,0),new THREE.Vector3(4.5,-1,0)
  ];
  const mesh=new EditableMesh(verts,[
    [0,1,2],[0,2,3],
    [4,5,1,0]
  ]);
  const result=quadCleanTrianglePairs(mesh);
  assert.equal(result.ok,true);
  assert.equal(result.changed,false);
  assert.equal(result.merged,0);
  assert.equal(result.contextRejected,1);
  assert.equal(mesh.faces.length,3);
});

test('300 residual triangle-pair cleanup preserves a context-misaligned candidate',()=>{
  const verts=[
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),
    new THREE.Vector3(1,1,0),new THREE.Vector3(0,1,0),
    new THREE.Vector3(0,-1,0),new THREE.Vector3(1,-1,0),
    new THREE.Vector3(1.1,2,0)
  ];
  const mesh=new EditableMesh(verts,[
    [0,1,2],[0,2,6],
    [4,5,1,0]
  ]);
  const result=quadCleanTrianglePairs(mesh);
  assert.equal(result.ok,true);
  assert.equal(result.changed,false);
  assert.equal(result.merged,0);
  assert.equal(result.contextRejected,1);
});


test('301 whole-patch boundary context tracks worst local flow instead of hiding it in the average',()=>{
  const result=quadPatchBoundaryContext([
    {flowPenalty:0.05},
    {flowPenalty:0.1},
    {flowPenalty:0.9}
  ]);
  assert.equal(result.samples,3);
  assert.ok(result.avgFlow>0.34&&result.avgFlow<0.36);
  assert.equal(result.worstFlow,0.9);
  assert.equal(result.penalty,0.45);
});

test('301 whole-patch boundary context is neutral with no surrounding quad evidence',()=>{
  const result=quadPatchBoundaryContext([{flowPenalty:0},{flowPenalty:0}]);
  assert.deepEqual(result,{samples:0,avgFlow:0,worstFlow:0,penalty:0});
});


test('302 bounded island solver converts ten connected triangles into five quads',()=>{
  const verts=[
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(2,0,0),new THREE.Vector3(3,0,0),new THREE.Vector3(4,0,0),new THREE.Vector3(5,0,0),
    new THREE.Vector3(0,1,0),new THREE.Vector3(1,1,0),new THREE.Vector3(2,1,0),new THREE.Vector3(3,1,0),new THREE.Vector3(4,1,0),new THREE.Vector3(5,1,0)
  ];
  const faces=[];
  for(let x=0;x<5;x++){
    const a=x,b=x+1,c=x+6,d=x+7;
    faces.push([a,b,d],[a,d,c]);
  }
  const mesh=new EditableMesh(verts,faces);
  const result=quadCleanTriangleIslands(mesh);
  assert.equal(result.ok,true);
  assert.equal(result.changed,true);
  assert.equal(result.patchRepairs,1);
  assert.equal(result.patchTriangles,10);
  assert.equal(result.merged,5);
  assert.equal(result.rejectedPatches,0);
  assert.equal(mesh.faces.length,5);
  assert.equal(mesh.faces.every(face=>face.length===4),true);
});

test('303 bounded island solver converts twelve connected triangles into six quads',()=>{
  const verts=[
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(2,0,0),new THREE.Vector3(3,0,0),new THREE.Vector3(4,0,0),new THREE.Vector3(5,0,0),new THREE.Vector3(6,0,0),
    new THREE.Vector3(0,1,0),new THREE.Vector3(1,1,0),new THREE.Vector3(2,1,0),new THREE.Vector3(3,1,0),new THREE.Vector3(4,1,0),new THREE.Vector3(5,1,0),new THREE.Vector3(6,1,0)
  ];
  const faces=[];
  for(let x=0;x<6;x++){
    const a=x,b=x+1,c=x+7,d=x+8;
    faces.push([a,b,d],[a,d,c]);
  }
  const mesh=new EditableMesh(verts,faces);
  const result=quadCleanTriangleIslands(mesh);
  assert.equal(result.ok,true);
  assert.equal(result.changed,true);
  assert.equal(result.patchRepairs,1);
  assert.equal(result.patchTriangles,12);
  assert.equal(result.merged,6);
  assert.equal(result.rejectedPatches,0);
  assert.equal(mesh.faces.length,6);
  assert.equal(mesh.faces.every(face=>face.length===4),true);
});


test('304 bounded island solver converts fourteen connected triangles into seven quads',()=>{
  const verts=[
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(2,0,0),new THREE.Vector3(3,0,0),new THREE.Vector3(4,0,0),new THREE.Vector3(5,0,0),new THREE.Vector3(6,0,0),new THREE.Vector3(7,0,0),
    new THREE.Vector3(0,1,0),new THREE.Vector3(1,1,0),new THREE.Vector3(2,1,0),new THREE.Vector3(3,1,0),new THREE.Vector3(4,1,0),new THREE.Vector3(5,1,0),new THREE.Vector3(6,1,0),new THREE.Vector3(7,1,0)
  ];
  const faces=[];
  for(let x=0;x<7;x++){
    const a=x,b=x+1,c=x+8,d=x+9;
    faces.push([a,b,d],[a,d,c]);
  }
  const mesh=new EditableMesh(verts,faces);
  const result=quadCleanTriangleIslands(mesh);
  assert.equal(result.ok,true);
  assert.equal(result.changed,true);
  assert.equal(result.patchRepairs,1);
  assert.equal(result.patchTriangles,14);
  assert.equal(result.merged,7);
  assert.equal(result.rejectedPatches,0);
  assert.equal(mesh.faces.length,7);
  assert.equal(mesh.faces.every(face=>face.length===4),true);
});


test('305 bounded island solver converts sixteen connected triangles into eight quads',()=>{
  const verts=[
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(2,0,0),new THREE.Vector3(3,0,0),new THREE.Vector3(4,0,0),new THREE.Vector3(5,0,0),new THREE.Vector3(6,0,0),new THREE.Vector3(7,0,0),new THREE.Vector3(8,0,0),
    new THREE.Vector3(0,1,0),new THREE.Vector3(1,1,0),new THREE.Vector3(2,1,0),new THREE.Vector3(3,1,0),new THREE.Vector3(4,1,0),new THREE.Vector3(5,1,0),new THREE.Vector3(6,1,0),new THREE.Vector3(7,1,0),new THREE.Vector3(8,1,0)
  ];
  const faces=[];
  for(let x=0;x<8;x++){
    const a=x,b=x+1,c=x+9,d=x+10;
    faces.push([a,b,d],[a,d,c]);
  }
  const mesh=new EditableMesh(verts,faces);
  const result=quadCleanTriangleIslands(mesh);
  assert.equal(result.ok,true);
  assert.equal(result.changed,true);
  assert.equal(result.patchRepairs,1);
  assert.equal(result.patchTriangles,16);
  assert.equal(result.merged,8);
  assert.equal(result.rejectedPatches,0);
  assert.equal(mesh.faces.length,8);
  assert.equal(mesh.faces.every(face=>face.length===4),true);
});


test('306 bounded island solver converts eighteen connected triangles into nine quads',()=>{
  const verts=[];
  for(let x=0;x<=9;x++)verts.push(new THREE.Vector3(x,0,0));
  for(let x=0;x<=9;x++)verts.push(new THREE.Vector3(x,1,0));
  const faces=[];
  for(let x=0;x<9;x++){
    const a=x,b=x+1,c=x+10,d=x+11;
    faces.push([a,b,d],[a,d,c]);
  }
  const mesh=new EditableMesh(verts,faces);
  const result=quadCleanTriangleIslands(mesh);
  assert.equal(result.ok,true);
  assert.equal(result.changed,true);
  assert.equal(result.patchRepairs,1);
  assert.equal(result.patchTriangles,18);
  assert.equal(result.merged,9);
  assert.equal(result.rejectedPatches,0);
  assert.equal(mesh.faces.length,9);
  assert.equal(mesh.faces.every(face=>face.length===4),true);
});


test('307 bounded island solver converts twenty connected triangles into ten quads',()=>{
  const verts=[];
  for(let x=0;x<=10;x++)verts.push(new THREE.Vector3(x,0,0));
  for(let x=0;x<=10;x++)verts.push(new THREE.Vector3(x,1,0));
  const faces=[];
  for(let x=0;x<10;x++){
    const a=x,b=x+1,c=x+11,d=x+12;
    faces.push([a,b,d],[a,d,c]);
  }
  const mesh=new EditableMesh(verts,faces);
  const result=quadCleanTriangleIslands(mesh);
  assert.equal(result.ok,true);
  assert.equal(result.changed,true);
  assert.equal(result.patchRepairs,1);
  assert.equal(result.patchTriangles,20);
  assert.equal(result.merged,10);
  assert.equal(result.rejectedPatches,0);
  assert.equal(mesh.faces.length,10);
  assert.equal(mesh.faces.every(face=>face.length===4),true);
});


test('307 bounded island solver keeps twenty-two connected triangles outside the local-search envelope',()=>{
  const verts=[];
  for(let x=0;x<=11;x++)verts.push(new THREE.Vector3(x,0,0));
  for(let x=0;x<=11;x++)verts.push(new THREE.Vector3(x,1,0));
  const faces=[];
  for(let x=0;x<11;x++){
    const a=x,b=x+1,c=x+12,d=x+13;
    faces.push([a,b,d],[a,d,c]);
  }
  const mesh=new EditableMesh(verts,faces);
  const result=quadCleanTriangleIslands(mesh);
  assert.equal(result.ok,true);
  assert.equal(result.changed,false);
  assert.equal(result.patchRepairs,0);
  assert.equal(result.patchTriangles,0);
  assert.equal(mesh.faces.length,22);
});
