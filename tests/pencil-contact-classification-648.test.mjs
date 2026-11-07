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
 ['contact uses buttons or pressure',gate.includes("return (event.buttons & 1)===1 || event.pressure>0;")],
 ['release never contact',gate.includes("if(event.type==='pointerup'||event.type==='pointercancel')return false;")],
 ['hover derives from contact',gate.includes("return event.pointerType==='pen'&&!isPenContact(event);")],
 ['move forward diagnostic',gate.includes("PEN ORBIT MOVE FORWARD")],
 ['hover block diagnostic',gate.includes("PEN ORBIT MOVE HOVER BLOCK")],
 ['registration handoff retained',gate.includes("explicitOrbitPointer = pointerEvent && orbitRegistrationDepth>0")],
 ['gate reviewed cache pin',hasAssetReference(index,'pencil-orbit-gate.js')],
 ['current release',shellReleaseMatches(index,version.version)],
 ['Sweep retained',hasAssetReference(index,'selection-hub-sweep-session.js')],
 ['protected transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
for(const [name,ok] of checks)test("pencil-contact-classification-648.test: "+name,()=>assert.equal(ok,true,name));

test('pencil-contact-classification-648.test: hover does not select or navigate; buttons or pressure begin a real mesh contact',()=>{
 for(const [buttons,pressure] of [[1,0],[0,.5]]){const f=pencilSelectionRuntime();f.multi.checked=false;const p=f.screen(new THREE.Vector3());f.pointer('pointerdown',{clientX:p.x,clientY:p.y,buttons:0,pressure:0});assert.deepEqual(f.ids(),[]);assert.equal(f.orbit().down,0);assert.deepEqual(Array.from(f.context.__boxlabPencilOrbitDebug.snapshot().contactPointers),[]);f.pointer('pointerdown',{clientX:p.x,clientY:p.y,buttons,pressure});assert.deepEqual(f.ids(),[0]);assert.equal(f.context.__boxlabPencilOrbitDebug.snapshot().pendingMeshOrbit?.pointerId,1);assert.deepEqual(Array.from(f.context.__boxlabPencilOrbitDebug.snapshot().contactPointers),[1]);f.pointer('pointerup',{clientX:p.x,clientY:p.y,buttons:0,pressure:0});assert.deepEqual(Array.from(f.context.__boxlabPencilOrbitDebug.snapshot().contactPointers),[]);}
});
