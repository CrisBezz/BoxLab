import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as THREE from 'three';
import {EditableMesh} from '../../src/mesh.js';
import {History} from '../../src/history.js';
import {solidifyOpenMesh,__solidifyInternals} from '../../src/solidify-core.js';
import {shellClosedMesh} from '../../src/shell-core.js';

// In-memory mutation of the whole core with actual dependencies; no source writes.
export async function loadGroupCore(name,transform){
 const file=new URL('../../src/'+name,import.meta.url);
 let source=transform(fs.readFileSync(file,'utf8'));
 source=source.replace(/from (['"])([^'"]+)\1/g,(_,q,spec)=>'from '+q+(spec.startsWith('.')?new URL(spec,file).href:import.meta.resolve(spec))+q);
 return import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
}
const snapshot=mesh=>({vertices:mesh.vertices.map(v=>v.toArray()),faces:mesh.faces.map(f=>[...f]),groups:[...mesh.faceGroups],creases:[...mesh.creases].sort()});
const strip=()=>new EditableMesh([new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(2,0,0),new THREE.Vector3(0,1,0),new THREE.Vector3(1,1,0),new THREE.Vector3(2,1,0)],[[0,1,4,3],[1,2,5,4]],new Map([['0:1',.75]]),['Panel']);

function roundTrip(before,after){
 // Real mesh History serialization, separate from tool-session checkpoint wiring.
 const history=new History();history.push(before);
 const undone=history.undo(after);assert.deepEqual(snapshot(undone),snapshot(before));
 const redone=history.redo(undone);assert.deepEqual(snapshot(redone),snapshot(after));
}

export function assertSolidifyGroups(solidify=solidifyOpenMesh){
 const mesh=strip(),before=mesh.clone(),sourceFaces=before.faces.map(f=>[...f]),count=before.vertices.length;
 const result=solidify(mesh,.1);assert.equal(result.ok,true);
 assert.equal(__solidifyInternals.inspectClosed(mesh).ok,true);
 assert.deepEqual(mesh.faces.slice(0,2),sourceFaces);
 assert.deepEqual(mesh.faces.slice(2,4),sourceFaces.map(f=>f.map(i=>i+count).reverse()));
 assert.deepEqual(mesh.faceGroups,['Panel',null,'Panel',null,...Array(6).fill(null)]);
 assert.equal(mesh.creases.get('0:1'),.75);assert.equal(mesh.creases.get('6:7'),.75);
 assert.equal(mesh.faceGroups.length,mesh.faces.length);
 roundTrip(before,mesh);
}

export function assertShellGroups(shell=shellClosedMesh){
 for(const twoFaces of [false,true]){
  const mesh=EditableMesh.cube(2);
  mesh.faceGroups=['Opening','Side A','Side B',null,'Side D','Side E'];
  mesh.creases.set(mesh.edgeKey(...mesh.faces[1].slice(0,2)),.5);
  const ids=[0];if(twoFaces)ids.push(mesh.faces.findIndex((f,i)=>i!==0&&f.filter(v=>mesh.faces[0].includes(v)).length===2));
  const before=mesh.clone(),surviving=before.faces.map((_,i)=>i).filter(i=>!ids.includes(i));
  const groups=surviving.map(i=>before.faceGroups[i]??null);
  const used=new Set(surviving.flatMap(i=>before.faces[i])),map=new Map();
  before.vertices.forEach((_,i)=>{if(used.has(i))map.set(i,map.size);});
  const outer=surviving.map(i=>before.faces[i].map(v=>map.get(v)));
  const result=shell(mesh,[...ids,ids[0]],.1);assert.equal(result.ok,true);
  assert.equal(result.removedFaces,ids.length);
  assert.equal(__solidifyInternals.inspectClosed(mesh).ok,true);
  assert.deepEqual(mesh.faces.slice(0,outer.length),outer,'surviving source cycles match compacted labels');
  assert.deepEqual(mesh.faces.slice(outer.length,outer.length*2),outer.map(f=>f.map(i=>i+map.size).reverse()));
  assert.deepEqual(mesh.faceGroups,[...groups,...groups,...Array(result.sideFaces).fill(null)]);
  assert.equal(mesh.faceGroups.length,mesh.faces.length);
  assert.ok(!mesh.faceGroups.includes('Opening'));
  assert.ok(mesh.creases.size>0);
  roundTrip(before,mesh);
 }
}

export function assertGroupRefusalRollback(solidify=solidifyOpenMesh,shell=shellClosedMesh){
 for(const kind of ['solidify','shell']){
  const make=()=>kind==='solidify'?strip():EditableMesh.cube(2);
  const run=(mesh,value)=>kind==='solidify'?solidify(mesh,value):shell(mesh,[0],value);
  const mesh=make();if(kind==='shell')mesh.faceGroups=mesh.faces.map((_,i)=>'G'+i);
  const before=snapshot(mesh);
  for(const value of [0,NaN,Infinity]){assert.equal(run(mesh,value).ok,false);assert.deepEqual(snapshot(mesh),before);}
  const originalEdges=mesh.edges;let injected=false;
  mesh.edges=function(){if(!injected&&this.faces.length>before.faces.length){injected=true;throw Error('controlled-post-mutation-failure');}return originalEdges.call(this);};
  const result=run(mesh,.1);assert.equal(injected,true);assert.equal(result.ok,false);assert.equal(result.rolledBack,true);
  assert.deepEqual(snapshot(mesh),before,'post-mutation exception restores geometry/groups/creases');
 }
}
