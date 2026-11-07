import {pencilSelectionRuntime} from './helpers/pencil-selection-runtime.mjs';
import * as THREE from 'three';
import {hasAssetReference,shellReleaseMatches} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const gate=fs.readFileSync(new URL('../src/pencil-orbit-gate.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));
const checks=[
 ['active contact set exists',gate.includes('const activePenContacts = new Set();')],
 ['pointerdown tracks contact',gate.includes('activePenContacts.add(event.pointerId)')],
 ['moves trust tracked contact',gate.includes('if(activePenContacts.has(event.pointerId))return true;')],
 ['window release clears contact',gate.includes("window.addEventListener('pointerup',endPenContact,true)")&&gate.includes("window.addEventListener('pointercancel',endPenContact,true)")],
 ['diagnostics expose tracked contact',gate.includes('contactTracked:activePenContacts.has(event.pointerId)')],
 ['registration handoff retained',gate.includes('explicitOrbitPointer = pointerEvent && orbitRegistrationDepth>0')],
 ['gate reviewed cache pin',hasAssetReference(index,'pencil-orbit-gate.js')],
 ['current release',shellReleaseMatches(index,version.version)],
 ['Sweep retained',hasAssetReference(index,'selection-hub-sweep-session.js')],
 ['protected transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
for(const [name,ok] of checks)test("pencil-contact-lifecycle-650.test: "+name,()=>assert.equal(ok,true,name));

test('pencil-contact-lifecycle-650.test: tracked mesh contact survives zero-pressure movement and release/cancel retires navigation',()=>{
 for(const terminal of ['pointerup','pointercancel']){const f=pencilSelectionRuntime();f.multi.checked=false;const p=f.screen(new THREE.Vector3());f.pointer('pointerdown',{clientX:p.x,clientY:p.y});f.pointer('pointermove',{clientX:p.x+40,clientY:p.y,buttons:0,pressure:0});assert.equal(f.orbit().down,1);assert.deepEqual(Array.from(f.context.__boxlabPencilOrbitDebug.snapshot().contactPointers),[1]);f.pointer(terminal,{clientX:p.x+40,clientY:p.y,buttons:0,pressure:0});f.flush();const state=f.context.__boxlabPencilOrbitDebug.snapshot();assert.deepEqual(Array.from(state.contactPointers),[]);assert.deepEqual(Array.from(state.orbitPointers),[]);assert.equal(state.pendingMeshOrbit,null);assert.equal(state.controlsEnabled,true);const n=f.orbit().down;f.pointer('pointerdown',{clientX:990,clientY:590,pointerType:'touch'});assert.equal(f.orbit().down,n+1);f.pointer('pointerup',{clientX:990,clientY:590,pointerType:'touch'});}
});
