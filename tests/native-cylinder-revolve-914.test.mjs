import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {makeCone,makeCylinder} from '../src/primitive-factory.js';
import {buildRevolveFromPoints} from '../src/revolve-core.js';
import {createCylinderUV,moveImportedUV} from '../src/imported-uv-edit.js';
import {inspectImportedUV} from '../src/imported-uv-inspection.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {buildNomadProject,readNomadProject} from '../src/nomad-export-core.js';
import {editableBooleanRuntime} from './helpers/editable-boolean-runtime.mjs';
import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
const exporter=glbOwnerRuntime(),signature=m=>exporter.c.topologySignature(m);
function fixture(mesh){const r=editableBooleanRuntime();r.manager.activate(3);r.manager.replaceActiveMesh(mesh);return {...r,object:r.manager.objects.find(o=>o.id===3),owner:r.c.__boxlabObjectHistory};}
const project=r=>createCylinderUV(r.object,r.live,signature,r.owner);
function revolve(profile,segments=12){const result=buildRevolveFromPoints(profile.map(([r,y])=>new THREE.Vector3(r-2,y,0)),{axisOrigin:new THREE.Vector3(-2,0,0),segments});assert(result.ok);return result.mesh;}
const profiles=[[[0,-1],[1,-1],[.6,0],[.8,1],[0,1]],[[.7,-1],[1,-.5],[.5,.2],[.7,1]],[[0,-1],[1,-1],[1,0],[.7,0],[.7,1],[.5,1],[.5,.2],[0,.2]]];
function valid(r){const p=r.object.glbPassthrough,report=inspectImportedUV(r.live,p,signature);assert.equal(report.state,'ready');assert.equal(report.missingFaces,0);assert.equal(report.mappedFaces,r.live.faces.length);for(const face of p.uvCorners){let area=0;face.forEach((a,i)=>{const b=face[(i+1)%face.length];area+=a[0]*b[1]-a[1]*b[0];assert(a.every(Number.isFinite));assert(a.every(v=>v>=.02-1e-12&&v<=.98+1e-12));});assert(Math.abs(area)>1e-15);}return p;}
test('914 native cones at every supported radial minimum and multiple bands get complete finite noncollapsed Cylinder UVs',()=>{
 for(const radial of [3,5,12,24,64])for(const bands of [1,2,6]){const r=fixture(makeCone(1,2,radial,bands)),before=JSON.stringify(r.live.vertices),n=r.h.undoStack.length;assert.deepEqual(project(r),{ok:true,changed:true});valid(r);assert.equal(JSON.stringify(r.live.vertices),before);assert.equal(r.h.undoStack.length,n+1);assert.equal(project(r).changed,false);assert.equal(r.h.undoStack.length,n+1);}
 for(const factor of [1e150,1e-150]){const mesh=makeCone();mesh.vertices.forEach(v=>v.multiplyScalar(factor));const r=fixture(mesh);assert(project(r).ok);valid(r);}
});
test('914 original Revolve owner output supports taper, poles, shoulders and return walls without changing geometry or metadata',()=>{
 for(const profile of profiles)for(const segments of [3,5,12,24]){const r=fixture(revolve(profile,segments));r.object.revolveProfile={applied:true,points:[{u:.5,v:0}],segments};const meta=JSON.stringify(r.object.revolveProfile),before=JSON.stringify(r.live.vertices),n=r.h.undoStack.length;assert(project(r).ok);const p=valid(r);assert.equal(JSON.stringify(r.live.vertices),before);assert.equal(JSON.stringify(r.object.revolveProfile),meta);assert.equal(r.h.undoStack.length,n+1);r.manager.replaceActiveMesh(r.h.undo(r.live));assert.equal(r.manager.objects.find(o=>o.id===3).glbPassthrough,undefined);r.manager.replaceActiveMesh(r.h.redo(r.live));assert.equal(r.manager.objects.find(o=>o.id===3).glbPassthrough,p);}
});
test('914 cone UV edits, scene Save/Open and actual GLB/Nomad writers retain the same corner UV channel',async()=>{
 const r=fixture(makeCone(1,2,12,3));assert(project(r).ok);assert(moveImportedUV(r.object,r.live,signature,r.owner,.001,0,{payload:r.object.glbPassthrough,island:0}).ok);
 const decoded=decodeBoxlabScene(JSON.parse(JSON.stringify(encodeBoxlabScene(r.owner.capture()))),(...a)=>new EditableMesh(...a)),o=decoded.objects.find(o=>o.id===3);assert.equal(JSON.stringify(o.glbPassthrough),JSON.stringify(r.object.glbPassthrough));
 const nom=readNomadProject(buildNomadProject([o],fs.readFileSync(new URL('../src/templates/nomad-tube.nom',import.meta.url)),{topologySignature:signature}).bytes),m=nom.json.meshes[0];assert(m.count_uv>m.count_vertex);const uv=new DataView(nom.bin.buffer,nom.bin.byteOffset+m.uvs.offset,m.uvs.length),expected=new Set(o.glbPassthrough.uvCorners.flat().map(p=>p.map(Math.fround).join(',')));for(let i=0;i<m.count_uv;i++)assert(expected.has([uv.getFloat32(i*8,true),uv.getFloat32(i*8+4,true)].join(',')));
 const glb=await exporter.build([o]);assert.equal(glb.uvRestoredCount,1);const scene=await exporter.decode(glb.buffer);let checked=0;scene.traverse(n=>{if(n.isMesh){const a=n.geometry.getAttribute('uv');for(let i=0;i<a.count;i++){assert(expected.has([a.getX(i),a.getY(i)].join(',')));checked++;}}});assert(checked>0);
});
test('914 malformed, elliptical, tilted, twisted and branching profiles refuse atomically; original cylinder mapping stays unchanged',()=>{
 for(const mutate of [m=>m.vertices.forEach(v=>v.x*=2),m=>m.vertices.forEach(v=>v.applyAxisAngle(new THREE.Vector3(0,0,1),.3)),m=>m.vertices.slice(12,24).forEach(v=>v.applyAxisAngle(new THREE.Vector3(0,1,0),.07)),m=>m.faces.push([0,13,24]),m=>m.faces[0]=[0,0,1]]){const mesh=makeCone(1,2,12,3);mutate(mesh);const r=fixture(mesh),n=r.h.undoStack.length;assert.equal(project(r).ok,false);assert.equal(r.object.glbPassthrough,undefined);assert.equal(r.h.undoStack.length,n);}
 const r=fixture(makeCylinder(1,2,12,3));assert(project(r).ok);assert.equal(inspectImportedUV(r.live,r.object.glbPassthrough,signature).islandCount,3);
});
