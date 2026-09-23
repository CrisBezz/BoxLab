import test from 'node:test';
import assert from 'node:assert/strict';
import {EditableMesh} from '../src/mesh.js';
import {analyzeSolidifyInput,solidifyOpenMesh} from '../src/solidify-core.js';

test('432 deleting three adjacent cube faces compacts the orphan vertex and remains solidifiable',()=>{
  const mesh=EditableMesh.cube(2);
  [4,2,0].forEach(index=>mesh.deleteFace(index));
  assert.equal(mesh.faces.length,3);
  assert.equal(mesh.vertices.length,8);
  const before=analyzeSolidifyInput(mesh);
  assert.ok(before.ok);
  const raw=solidifyOpenMesh(mesh.clone(),0.2);
  assert.equal(raw.ok,false);
  assert.equal(raw.reason,'zero-vertex-normal');
  const compact=mesh.compactUnusedVertices({preserveLoose:true});
  assert.equal(compact.changed,true);
  assert.equal(compact.removed,1);
  assert.equal(mesh.vertices.length,7);
  const preflight=analyzeSolidifyInput(mesh);
  assert.ok(preflight.ok);
  const result=solidifyOpenMesh(mesh,0.2);
  assert.ok(result.ok);
});

test('432 compaction preserves explicit loose geometry and remaps it',()=>{
  const mesh=EditableMesh.cube(2);
  [4,2,0].forEach(index=>mesh.deleteFace(index));
  mesh.vertices.push(mesh.vertices[1].clone().addScalar(3));
  const loose=mesh.vertices.length-1;
  mesh.looseVertices=new Set([loose]);
  const compact=mesh.compactUnusedVertices({preserveLoose:true});
  assert.ok(compact.changed);
  assert.equal(mesh.looseVertices.size,1);
  const kept=[...mesh.looseVertices][0];
  assert.ok(Number.isInteger(kept));
  assert.ok(mesh.vertices[kept]);
});
