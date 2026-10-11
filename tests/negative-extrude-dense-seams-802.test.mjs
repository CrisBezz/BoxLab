import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {parseEditableOBJ} from '../src/obj-facegroups-core.js';
import {buildNegativeExtrude,validateThrough} from '../src/through-kernel.js';
import {faceRuntime,snapshot,volume} from './helpers/negative-extrude-runtime.mjs';

const load=name=>{const p=parseEditableOBJ(fs.readFileSync(new URL(`./fixtures/negative-extrude-802-${name}.obj`,import.meta.url),'utf8'))[0].mesh;return new EditableMesh(p.vertices,p.faces,p.creases,p.faceGroups);};
const source=fs.readFileSync(new URL('../src/through-kernel.js',import.meta.url),'utf8');
function kernel(transform=s=>s){const c={THREE,__boxlabTopology:globalThis.__boxlabTopology};vm.createContext(c);vm.runInContext(transform(source).replace(/^import .*;\n/gm,'').replace(/export function/g,'function')+'\nglobalThis.kernel={buildNegativeExtrude,coalesceBoundaryParts,areaVector};',c);return c.kernel;}
const near=(a,b,tol=1e-7)=>assert.ok(Math.abs(a-b)<tol,`${a} != ${b}`);
const capArea=m=>{const f=m.faces[119],o=m.vertices[f[0]];return new THREE.Vector3().crossVectors(m.vertices[f[1]].clone().sub(o),m.vertices[f[3]].clone().sub(o)).length();};

test('802 actual uploaded dense cage is closed; reconstructed cut uses its two rectangular openings',()=>{
  const bad=load('upload'),before=load('recovered');assert.equal(bad.vertices.length,814);assert.equal(bad.faces.length,730);assert.equal(validateThrough(bad).ok,true);
  assert.equal(before.vertices.length,146);assert.equal(before.faces.length,120);assert.equal(validateThrough(before).ok,true);
  assert.equal(before.faces[119].length,4);assert.ok(before.faces[119].every(id=>before.vertices[id].y===.076123));
  // 306 and 304 exported cells occupy the two long last-cut walls. Export rounding
  // perturbs tiny face normals, so compare vertices to the geometric wall planes.
  const points=before.faces[119].map(id=>before.vertices[id]),n=before.faceNormal(119);
  const longWalls=points.map((a,i)=>({a,n:new THREE.Vector3().crossVectors(points[(i+1)%4].clone().sub(a),n).normalize(),length:a.distanceTo(points[(i+1)%4])})).filter(w=>w.length>.4);
  const counts=longWalls.map(w=>bad.faces.slice(118).filter(f=>f.every(id=>Math.abs(bad.vertices[id].clone().sub(w.a).dot(w.n))<2e-6)).length);
  assert.ok(counts.every(count=>count>256),counts.join(','));
});

for(const distance of [-.03,-.08,-.12,-.15227])test(`802 dense rectangular cut ${distance} keeps four walls and at most one cap`,()=>{
  const m=load('recovered'),before=snapshot(m),r=buildNegativeExtrude(m,[119],distance);assert.equal(r.ok,true,r.reason);assert.equal(validateThrough(r.mesh).ok,true);assert.equal(snapshot(m),before);
  const through=-distance>.152246;assert.equal(r.mesh.faces.length,through?122:124);assert.equal(r.mesh.vertices.length,through?146:150);assert.equal(r.faceIndices.length,through?0:1);
  if(!through)assert.equal(r.mesh.faces[r.faceIndices[0]].length,4);
  near(volume(m)-volume(r.mesh),capArea(m)*Math.min(-distance,.152246));
  if(through)near(volume(load('upload')),volume(r.mesh),2e-7);
});

test('802 restoring former 256-cell shortcut reproduces dense wall regression',()=>{
  const old=kernel(s=>s.replace('if(parts.length<2)return parts;','if(parts.length<2||parts.length>256)return parts;')),m=load('recovered');
  const r=old.buildNegativeExtrude(m,[119],-.08);assert.equal(r.ok,true,r.reason);assert.equal(validateThrough(r.mesh).ok,true);assert.ok(r.mesh.faces.length>900);assert.ok(r.mesh.vertices.length>1000);
});

test('802 corrected download retains uploaded exterior boundaries and volume within OBJ rounding',()=>{
  const bad=load('upload'),fixed=load('corrected');assert.equal(validateThrough(fixed).ok,true);assert.equal(fixed.faces.length,122);assert.equal(fixed.vertices.length,146);near(volume(bad),volume(fixed),2e-7);
  const boundaryDistance=(p,poly)=>Math.min(...poly.map((a,i)=>{const ab=poly[(i+1)%poly.length].clone().sub(a),t=THREE.MathUtils.clamp(p.clone().sub(a).dot(ab)/ab.lengthSq(),0,1);return p.distanceTo(a.clone().addScaledVector(ab,t));}));
  for(let i=0;i<118;i++){
    const old=bad.faces[i].map(id=>bad.vertices[id]),next=fixed.faces[i].map(id=>fixed.vertices[id]);
    for(const p of old)assert.ok(boundaryDistance(p,next)<2e-6,`old face ${i}`);
    for(const p of next)assert.ok(boundaryDistance(p,old)<2e-6,`new face ${i}`);
    const normal=new THREE.Vector3();for(let j=1;j<old.length-1;j++)normal.add(new THREE.Vector3().crossVectors(old[j].clone().sub(old[0]),old[j+1].clone().sub(old[0])));normal.normalize();
    if(old.some(p=>Math.abs(p.clone().sub(old[0]).dot(normal))>4e-6))assert.deepEqual(next.map(p=>p.toArray()),old.map(p=>p.toArray()),`warped face ${i} keeps fan anchor`);
  }
});

test('802 indexed private coalescing handles 3000 mismatched seams without filling a hole',()=>{
  const k=kernel(),p=(x,y)=>new THREE.Vector3(x,y,0),parts=[];
  for(let x=0;x<1000;x++){parts.push([p(x,0),p(x+1,0),p(x+1,2),p(x,2)]);parts.push([p(x,2),p(x+1,2),p(x+1,3),p(x+.5,3),p(x,3)]);parts.push([p(x,3),p(x+.5,3),p(x+1,3),p(x+1,4),p(x,4)]);}
  let r=k.coalesceBoundaryParts(parts,1e-7);assert.equal(r.length,1);assert.equal(r[0].length,4);near(k.areaVector(r[0]).z,4000);
  // Remove an interior cell; a two-loop boundary must retain the opening.
  parts.splice(1501,1);r=k.coalesceBoundaryParts(parts,1e-7);assert.ok(r.length>1);near(r.reduce((sum,p)=>sum+k.areaVector(p).z,0),3999);
});

test('802 dense cut preserves source labels and unrelated geometry, including warped target anchors',()=>{
  const m=load('recovered');m.faceGroups=m.faces.map((_,i)=>`original-${i}`);m.creases.set(m.edgeKey(...m.faces[0].slice(0,2)),.7);
  const r=buildNegativeExtrude(m,[119],-.08);assert.equal(r.ok,true,r.reason);assert.equal(r.mesh.faceGroups.length,r.mesh.faces.length);
  for(let i=0;i<118;i++){const fi=r.mesh.faceGroups.indexOf(`original-${i}`);assert.ok(fi>=0);assert.deepEqual(r.mesh.faces[fi].map(id=>r.mesh.vertices[id].toArray()),m.faces[i].map(id=>m.vertices[id].toArray()));}
  assert.ok([...r.mesh.creases.values()].includes(.7));assert.equal(r.mesh.faceGroups[r.faceIndices[0]],'original-119');
});

for(const method of ['physical','exact','replay'])test(`802 actual ${method} commits dense cut once, Undo/Redo and Cancel preserve history`,()=>{
  const m=load('recovered'),f=faceRuntime(m,[119],{fallback:true}),before=snapshot(m);
  if(method==='physical')f.physicalCut(-.08);else if(method==='exact')f.exact(-.08);else assert.equal(f.api.replay('extrude',-.08,119),true);
  assert.equal(m.faces.length,124);assert.equal(m.vertices.length,150);assert.equal(f.history.undoStack.length,1);assert.equal(f.selected().length,1);const after=snapshot(m),undo=f.history.undo(m);assert.equal(snapshot(undo),before);assert.equal(snapshot(f.history.redo(undo)),after);
  const cap=f.selected()[0],second=faceRuntime(m,[cap],{fallback:true}),base=snapshot(m);second.history.redoStack.push(m.clone());assert.equal(second.start(),true);second.move(-.02);assert.equal(validateThrough(m).ok,true);second.finish('pointercancel');assert.equal(snapshot(m),base);assert.equal(second.history.undoStack.length,0);assert.equal(second.history.redoStack.length,1);
});
