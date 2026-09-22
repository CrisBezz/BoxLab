import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import fs from 'node:fs';
import {EditableMesh} from '../src/mesh.js';
import {installLooseTopology} from '../src/loose-topology.js';
import {boundarySelectionInfo,extrudeBoundaryEdges} from '../src/edge-extrude-core.js';

installLooseTopology(EditableMesh);

function openCube(){
  const mesh=EditableMesh.cube(2);
  mesh.deleteFace(1);
  return mesh;
}
function boundaryEdges(mesh){
  return mesh.edges().map((edge,index)=>({edge,index})).filter(({edge})=>(edge.faces||[]).filter(fi=>fi>=0).length===1);
}

test('423 Edge Extrude creates a quad from one boundary edge and returns the new outer edge',()=>{
  const mesh=openCube(),before=mesh.clone(),seed=boundaryEdges(before)[0].index;
  const info=boundarySelectionInfo(before,[seed]);
  assert.ok(info);
  const v0=mesh.vertices.length,f0=mesh.faces.length;
  const result=extrudeBoundaryEdges(mesh,before,info,new THREE.Vector3(0,0.5,0));
  assert.ok(result);
  assert.equal(mesh.vertices.length,v0+2);
  assert.equal(mesh.faces.length,f0+1);
  assert.equal(result.outer.length,1);
  assert.ok(boundarySelectionInfo(mesh,result.outer));
});

test('423 connected boundary edges share duplicated corner vertices and make a ribbon strip',()=>{
  const mesh=openCube(),before=mesh.clone(),boundary=boundaryEdges(before);
  const first=boundary[0],second=boundary.find(item=>item.index!==first.index&&(item.edge.a===first.edge.a||item.edge.a===first.edge.b||item.edge.b===first.edge.a||item.edge.b===first.edge.b));
  assert.ok(second);
  const ids=[first.index,second.index],info=boundarySelectionInfo(before,ids);
  assert.ok(info);
  const uniqueVertices=new Set(info.infos.flatMap(e=>[e.a,e.b])).size;
  const v0=mesh.vertices.length,f0=mesh.faces.length;
  const result=extrudeBoundaryEdges(mesh,before,info,new THREE.Vector3(0.4,0.2,0));
  assert.ok(result);
  assert.equal(mesh.vertices.length,v0+uniqueVertices);
  assert.equal(mesh.faces.length,f0+2);
  assert.equal(result.outer.length,2);
});

test('423 returned outer rail can immediately be extruded again',()=>{
  const mesh=openCube(),before=mesh.clone(),seed=boundaryEdges(before)[0].index;
  const first=extrudeBoundaryEdges(mesh,before,boundarySelectionInfo(before,[seed]),new THREE.Vector3(0.3,0,0));
  assert.ok(first);
  const beforeSecond=mesh.clone(),infoSecond=boundarySelectionInfo(beforeSecond,first.outer);
  assert.ok(infoSecond);
  const facesBefore=mesh.faces.length;
  const second=extrudeBoundaryEdges(mesh,beforeSecond,infoSecond,new THREE.Vector3(0.3,0.2,0));
  assert.ok(second);
  assert.equal(mesh.faces.length,facesBefore+1);
  assert.ok(boundarySelectionInfo(mesh,second.outer));
});

test('423 loose edge can seed the first ribbon face',()=>{
  const mesh=new EditableMesh([],[]);
  const a=mesh.addLooseVertex(new THREE.Vector3(0,0,0)),b=mesh.addLooseVertex(new THREE.Vector3(1,0,0));
  mesh.addLooseEdge(a,b);
  const before=mesh.clone(),seed=before.edges().findIndex(e=>e.loose);
  const info=boundarySelectionInfo(before,[seed]);
  assert.ok(info);
  const result=extrudeBoundaryEdges(mesh,before,info,new THREE.Vector3(0,1,0));
  assert.ok(result);
  assert.equal(mesh.faces.length,1);
  assert.equal(result.outer.length,1);
});

test('423 rejects interior and branched edge selections',()=>{
  const cube=EditableMesh.cube(2),interior=0;
  assert.equal(boundarySelectionInfo(cube,[interior]),null);
  const mesh=openCube(),boundary=boundaryEdges(mesh);
  const centerVertex=boundary[0].edge.a;
  const incident=boundary.filter(item=>item.edge.a===centerVertex||item.edge.b===centerVertex).map(item=>item.index);
  if(incident.length>2)assert.equal(boundarySelectionInfo(mesh,incident),null);
});

test('423 UI stays armed for repeated pulls and preserves protected transform pin',()=>{
  const ui=fs.readFileSync(new URL('../src/edge-extrude.js',import.meta.url),'utf8');
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  assert.ok(ui.includes("button.id='edgeExtrudeBtn'"));
  assert.ok(ui.includes("setArmed(true)"));
  assert.ok(ui.includes("bridge()?.set?.('edge',next)"));
  assert.ok(ui.includes("repeat(3,minmax(0,1fr))"));
  assert.ok(index.includes('src/edge-extrude.js?v=0.36.18.423'));
  assert.ok(index.includes('src/multi-object-transform.js?v=0.36.1.0'));
});
