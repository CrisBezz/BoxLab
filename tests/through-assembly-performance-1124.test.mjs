import test from 'node:test';import assert from 'node:assert/strict';import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';import {assemblyProfile} from './helpers/through-assembly-profile.mjs';import {closedGrid} from './helpers/through-validation-profile.mjs';
import {quadBand} from './helpers/corner-band-fixture.mjs';import {snapshot,volume} from './helpers/negative-extrude-runtime.mjs';import {previewRuntime} from './helpers/dense-edit-runtime.mjs';
const old=assemblyProfile({legacy:true}),current=assemblyProfile(),plain=r=>JSON.parse(JSON.stringify({...r,mesh:r.mesh?JSON.parse(snapshot(r.mesh)):undefined}));
function compare(method,m,...args){const before=snapshot(m),a=old.run(method,m,...args),b=current.run(method,m,...args);assert.deepEqual(plain(b.result),plain(a.result));assert.equal(snapshot(m),before);return [a,b];}
function frame(){const m=EditableMesh.cube(),f=m.faces[1],ids=f.map(i=>(m.vertices.push(m.vertices[i].clone().multiplyScalar(.5).setZ(1)),m.vertices.length-1));m.faces[1]=ids;f.forEach((a,i)=>m.faces.push([a,f[(i+1)%4],ids[(i+1)%4],ids[i]]));m.faceGroups=m.faces.map(()=>null);return m;}
test('1124 exact .1123 parity: inward and THROUGH preserve every index, coordinate, metadata and refusal',()=>{
 for(const m of [frame(),closedGrid(4,EditableMesh)]){m.faceGroups=m.faces.map((_,i)=>'surface '+i);m.creases.set(m.edgeKey(...m.faces[0].slice(0,2)),.6);const fi=m.faces.length===10?1:10;
  for(const distance of [-.1,-1,-2,-3])assert.equal(compare('buildNegativeExtrude',m,[fi],distance)[1].result.ok,true);
  const plan=current.run('planThrough',m,fi).result;assert(plan.ok);assert.equal(compare('buildThrough',m,plan)[1].result.ok,true);
 }
 for(const mutate of [m=>m.faces.pop(),m=>m.faces[0].reverse(),m=>m.vertices[0].x=NaN]){const m=frame();mutate(m);assert.equal(compare('buildNegativeExtrude',m,[1],-.5)[1].result.ok,false);}
});
test('1124 corner-band and transformed framed cuts keep exact .1123 output and analytic geometry',()=>{
 const f=quadBand();assert.equal(compare('buildNegativeExtrude',f.mesh,f.ids,-.1)[1].result.ok,true);
 for(const scale of [.01,1,100]){const m=frame(),q=new THREE.Quaternion().setFromEuler(new THREE.Euler(.3,.7,.2));m.vertices.forEach(p=>p.multiplyScalar(scale).applyQuaternion(q).add(new THREE.Vector3(4,-2,7)));const r=compare('buildNegativeExtrude',m,[1],-2*scale)[1].result;assert(r.ok);assert(Math.abs(volume(r.mesh)-6*scale**3)<Math.max(1e-7,scale**3*1e-7));assert.equal(r.mesh.faces.length,16);assert(r.mesh.faces.every(f=>f.length===4));}
});
test('1124 broad phase retains exact boundary candidates, orientation and original used order',()=>{
 const eps=1e-7,points=[new THREE.Vector3(0,0,0),new THREE.Vector3(1,1,1)];
 for(const t of [0,eps,eps*1.01,.25,.5,.75,1-eps,1])for(const d of [-eps*1.01,-eps,0,eps,eps*1.01])points.push(new THREE.Vector3(t+d,t-d,t));
 for(let i=0;i<200;i++)points.push(new THREE.Vector3(Math.sin(i)*4,Math.cos(i)*3,i/20));
 const used=points.map((_,i)=>i).reverse(),select=current.run('seamVertexCandidates',points,used,eps).result;
 for(const [a,b]of [[points[0],points[1]],[points[1],points[0]],[new THREE.Vector3(1e12,1e12,1e12),new THREE.Vector3(1e12+1,1e12+1,1e12+1)]]){const actual=Array.from(select(a,b)),delta=b.clone().sub(a),l2=delta.lengthSq(),needed=used.filter(id=>{const t=points[id].clone().sub(a).dot(delta)/l2;return t>eps/Math.sqrt(l2)&&t<1-eps/Math.sqrt(l2)&&a.clone().addScaledVector(delta,t).distanceTo(points[id])<=eps;});assert.deepEqual(actual.filter(id=>needed.includes(id)),needed);assert.deepEqual(actual,[...actual].sort((a,b)=>used.indexOf(a)-used.indexOf(b)));}
});
test('1124 collapsed near-epsilon seams retain exact .1123 refusal and source',()=>{
 const eps=1e-7,m=EditableMesh.cube();m.vertices.push(new THREE.Vector3(0,-1,-1),new THREE.Vector3(0,-1+eps*.99,-1),new THREE.Vector3(0,-1+eps*1.01,-1));const polys=m.faces.map(f=>f.map(i=>m.vertices[i]));polys.push(m.vertices.slice(-3));
 const before=snapshot(m),[a,b]=[old,current].map(k=>{try{return {mesh:snapshot(k.run('assemble',m,polys,eps).result)};}catch(e){return {reason:e.message};}});assert.deepEqual(b,a);assert.equal(a.reason,'collapsed-output-edge');assert.equal(snapshot(m),before);
});
test('1124 real cuts reduce exact all-edge/all-vertex seam predicates without topology changes',()=>{
 const mesh=closedGrid(8,EditableMesh),[a,b]=compare('buildNegativeExtrude',mesh,[36],-.25);assert(b.result.ok);assert(a.counts.seamPredicates>500000);assert(b.counts.seamPredicates<a.counts.seamPredicates/100);
});
test('1124 actual framed preview retains Cancel and single-checkpoint Done/Undo/Redo',()=>{
 const mesh=frame(),before=snapshot(mesh),r=previewRuntime(mesh,[1]);r.begin();r.preview(-2);assert(r.owner.drag().preview);r.finish('pointercancel');assert.equal(snapshot(mesh),before);assert.equal(r.history.undoStack.length,0);
 const c=previewRuntime(mesh,[1]);c.begin();c.preview(-2);const after=snapshot(mesh);c.finish();assert.equal(c.history.undoStack.length,1);assert.equal(snapshot(c.history.undo(mesh)),before);assert.equal(snapshot(c.history.redo(mesh)),after);
});

test('1124 necessary T-junction seam vertices remain in every incident output edge in both directions',()=>{
 const m=EditableMesh.cube();const r=globalThis.__boxlabTopology.canonicalEdgeSplit(m,0,1,.5);assert(r.ok);const id=r.vertex,polys=m.faces.map(f=>f.map(i=>m.vertices[i]));const fi=m.faces.findIndex(f=>f.includes(id));polys[fi]=polys[fi].filter(p=>p!==m.vertices[id]);const before=snapshot(m),a=old.run('assemble',m,polys,1e-7),b=current.run('assemble',m,polys,1e-7);assert.equal(snapshot(a.result),snapshot(b.result));assert(b.counts.seamPredicates>0);assert.equal(b.result.faces.filter(f=>f.includes(id)).length,2);assert.equal(current.run('validateThrough',b.result).result.ok,true);assert.equal(snapshot(m),before);
});
