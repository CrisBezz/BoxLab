import test from 'node:test';import assert from 'node:assert/strict';import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';import {assemblyProfile} from './helpers/through-assembly-profile.mjs';import {closedGrid} from './helpers/through-validation-profile.mjs';import {quadBand} from './helpers/corner-band-fixture.mjs';import {snapshot,volume} from './helpers/negative-extrude-runtime.mjs';import {previewRuntime} from './helpers/dense-edit-runtime.mjs';
const old=assemblyProfile({baseline:'1124'}),current=assemblyProfile(),plain=r=>JSON.parse(JSON.stringify({...r,mesh:r.mesh?JSON.parse(snapshot(r.mesh)):undefined}));
function compare(method,m,...args){const before=snapshot(m),a=old.run(method,m,...args),b=current.run(method,m,...args);assert.deepEqual(plain(b.result),plain(a.result));assert.equal(snapshot(m),before);return [a,b];}
function frame(){const m=EditableMesh.cube(),f=m.faces[1],ids=f.map(i=>(m.vertices.push(m.vertices[i].clone().multiplyScalar(.5).setZ(1)),m.vertices.length-1));m.faces[1]=ids;f.forEach((a,i)=>m.faces.push([a,f[(i+1)%4],ids[(i+1)%4],ids[i]]));m.faceGroups=m.faces.map((_,i)=>'face '+i);return m;}
test('1125 inward and THROUGH exactly match .1124 vertices, face order, metadata, creases, cap IDs and source',()=>{
 for(const m of [frame(),closedGrid(4,EditableMesh)]){m.faceGroups=m.faces.map((_,i)=>'label '+i);m.creases.set(m.edgeKey(...m.faces[0].slice(0,2)),.5);const fi=m.faces.length===10?1:10;for(const d of [-.1,-1,-2,-3])assert(compare('buildNegativeExtrude',m,[fi],d)[1].result.ok);const plan=current.run('planThrough',m,fi).result;assert(plan.ok);assert(compare('buildThrough',m,plan)[1].result.ok);}
 const f=quadBand();assert(compare('buildNegativeExtrude',f.mesh,f.ids,-.1)[1].result.ok);
});
test('1125 fresh assemblies after edits/transforms preserve exact .1124 refusal and volume',()=>{
 for(const scale of [.01,1,100]){const m=frame(),q=new THREE.Quaternion().setFromEuler(new THREE.Euler(.3,.7,.2));m.vertices.forEach(p=>p.multiplyScalar(scale).applyQuaternion(q).add(new THREE.Vector3(4,-2,7)));const r=compare('buildNegativeExtrude',m,[1],-2*scale)[1].result;assert(r.ok);assert(Math.abs(volume(r.mesh)-6*scale**3)<Math.max(1e-7,scale**3*1e-7));assert.equal(r.mesh.faces.length,16);m.vertices.forEach(p=>p.x+=.1);assert(compare('buildNegativeExtrude',m,[1],-.5*scale)[1].result.ok);}
 for(const edit of [m=>m.faces.pop(),m=>m.faces[0].reverse(),m=>m.vertices[0].x=NaN]){const m=frame();edit(m);assert.equal(compare('buildNegativeExtrude',m,[1],-.5)[1].result.ok,false);}
});
function endpointCase(k){const m=EditableMesh.cube(),eps=1e-8,p=new THREE.Vector3(-1+1.8e-8,-1,-1),q=new THREE.Vector3(-1+2.2e-8,-1,-1),polys=[[p,m.vertices[2],m.vertices[6]],[q,m.vertices[3],m.vertices[7]],[p.clone(),m.vertices[4],m.vertices[5]]];return k.run('assemble',m,polys,eps).result;}
test('1125 canonical endpoint beyond eps is not cached; a later appended true match must win',()=>{
 const a=endpointCase(old),b=endpointCase(current);assert.equal(snapshot(b),snapshot(a));assert.equal(b.faces[0][0],0);assert.equal(b.faces[1][0],8);assert.equal(b.faces[2][0],8);
 const naive=assemblyProfile({transform:s=>s.replace('if(key!==null&&m.vertices[r.vertex].distanceTo(p)<=eps)vertexQueries.set(key,r.vertex);','if(key!==null)vertexQueries.set(key,r.vertex);')});assert.notEqual(snapshot(endpointCase(naive)),snapshot(a));
});
test('1125 first tolerance match stays the earliest ID even when a later vertex exactly equals the query',()=>{
 const m=EditableMesh.cube(),p=m.vertices[0].clone().add(new THREE.Vector3(5e-8,0,0));m.vertices.push(p.clone());const polys=[[p,m.vertices[2],m.vertices[6]],[p.clone(),m.vertices[4],m.vertices[5]]],a=old.run('assemble',m,polys,1e-7).result,b=current.run('assemble',m,polys,1e-7).result;assert.equal(snapshot(b),snapshot(a));assert.equal(b.faces[0][0],0);assert.equal(b.faces[1][0],0);
});
test('1125 actual linear-scan comparisons fall by at least 3x with exact complete-cut output',()=>{
 const m=closedGrid(12,EditableMesh),[a,b]=compare('buildNegativeExtrude',m,[78],-.25);assert(b.result.ok);assert(a.counts.vertexDistanceTests>1000000);assert(b.counts.vertexDistanceTests<a.counts.vertexDistanceTests/3);
});
test('1125 real preview cancellation and Done/Undo/Redo retain one checkpoint and exact state',()=>{
 const m=frame(),before=snapshot(m),r=previewRuntime(m,[1]);r.begin();r.preview(-2);assert(r.owner.drag().preview);r.finish('pointercancel');assert.equal(snapshot(m),before);assert.equal(r.history.undoStack.length,0);const c=previewRuntime(m,[1]);c.begin();c.preview(-2);const after=snapshot(m);c.finish();assert.equal(c.history.undoStack.length,1);assert.equal(snapshot(c.history.undo(m)),before);assert.equal(snapshot(c.history.redo(m)),after);
});
