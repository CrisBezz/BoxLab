import test from 'node:test';import assert from 'node:assert/strict';
import {planConcaveBandWalls as oldPlan} from './fixtures/performance/connected-extrude-corners-1117.js';
import {cornerBand} from './helpers/corner-band-fixture.mjs';import {previewRuntime} from './helpers/dense-edit-runtime.mjs';
import {topologySummary} from '../src/topology-seam-conformance.js';
for(const subdivisions of [2,4,12])test(`1118 ${subdivisions}: minimum quad wall count, no added wall vertices, no fan diagonals, exact .1117 cap/boundary geometry`,()=>{
 const current=cornerBand({subdivisions}),old=cornerBand({subdivisions}),baseVertices=current.mesh.vertices.length,baseFaces=current.mesh.faces.length,n=current.ids.length;
 const r=previewRuntime(current.mesh,current.ids),before=previewRuntime(old.mesh,old.ids);before.context.planConcaveBandWalls=oldPlan;r.begin();before.begin();r.preview(.6);before.preview(.6);
 const generated=current.mesh.faces.slice(baseFaces),prior=old.mesh.faces.slice(baseFaces);
 assert.equal(generated.length,2*n);assert.ok(generated.every(f=>f.length===4));assert.equal(prior.length,4*n);assert.ok(prior.every(f=>f.length===3));
 assert.equal(current.mesh.vertices.length,baseVertices+2*n);assert.deepEqual(current.mesh.vertices,old.mesh.vertices);
 for(let i=0;i<baseFaces;i++)assert.deepEqual(Array.from(current.mesh.faces[i]),Array.from(old.mesh.faces[i]));
 assert.equal(old.mesh.edges().length-current.mesh.edges().length,2*n);
 assert.equal(topologySummary(current.mesh).closed,true);assert.equal(r.renderCount(),1);
 // For each annular wall: V=2N, boundary=2N, no interior vertices.
 // Euler and at-most-four-sided Faces imply F>=N; the all-quad strip attains N.
 assert.equal(generated.length/2,n);
 const used=new Set(current.mesh.faces.flat());assert.equal(used.size,current.mesh.vertices.length);
});
test('1118 actual mesh data uses the original boundary-edge quad connectivity rather than hiding triangle wire edges',()=>{
 const {mesh,ids}=cornerBand(),r=previewRuntime(mesh,ids),baseFaces=mesh.faces.length;r.begin();const before=r.owner.drag().before;
 const region=r.context.selectionComponentsInfo(before,ids).regions[0],replacement=new Map(region.regionVertices.map((v,i)=>[v,before.vertices.length+i]));
 r.preview(.6);
 const expected=new Set(region.boundaryEdges.map(e=>[e.a,e.b,replacement.get(e.b),replacement.get(e.a)].join(':')));
 for(const face of mesh.faces.slice(baseFaces))assert.ok(expected.delete(face.join(':')));
 assert.equal(expected.size,0);
});
