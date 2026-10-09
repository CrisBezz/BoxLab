import {pencilSelectionRuntime} from './helpers/pencil-selection-runtime.mjs';
import * as THREE from 'three';
import {hasAssetReference,shellReleaseMatches} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const gate=fs.readFileSync(new URL('../src/pencil-orbit-gate.js',import.meta.url),'utf8');
const paint=fs.readFileSync(new URL('../src/edge-paint-select.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const checks=[
 ['route log exists',gate.includes("gestureDebug('PEN ORBIT ROUTE'")],
 ['route captures selection',gate.includes('selectionMode,')&&gate.includes('selectionCount,')],
 ['route captures tool/paint/controls',gate.includes('faceToolActive,')&&gate.includes('paintPending,')&&gate.includes('paintActive,')&&gate.includes('controlsEnabled,')],
 ['forwarded log exists',gate.includes("gestureDebug('PEN ORBIT FORWARDED'")],
 ['paint diagnostic API read-only getters',paint.includes('globalThis.__boxlabPaintSelectDebug')&&paint.includes('pending:()=>')&&paint.includes('active:()=>')],
 ['published gate reviewed cache pin',hasAssetReference(index,'pencil-orbit-gate.js')],
 ['published paint reviewed cache pin',hasAssetReference(index,'edge-paint-select.js')],
 ['current release',shellReleaseMatches(index,version.version)],
 ['Sweep proxy retained',hasAssetReference(index,'selection-hub-sweep-session.js')],
 ['protected transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
for(const [name,ok] of checks)test("pencil-orbit-diagnostics-646.test: "+name,()=>assert.equal(ok,true,name));

// Later accepted mesh deferral/active-tool routing superseded .646's binary route.
test('pencil-orbit-diagnostics-646.test: live diagnostics distinguish deferred mesh hit and background Orbit',()=>{
 for(const hit of [true,false]){const f=pencilSelectionRuntime();f.multi.checked=false;f.setIds([1]);const p=hit?f.screen(new THREE.Vector3()):{x:990,y:590};f.pointer('pointerdown',{clientX:p.x,clientY:p.y});const route=f.logs.findLast(e=>e.stage==='PEN ORBIT ROUTE')?.detail;assert.ok(route);assert.equal(route.meshHit,hit);assert.equal(route.selectionMode,'edge');assert.equal(route.selectionCount,1);assert.equal(route.controlsEnabled,true);assert.equal(route.route,hit?'DEFER_MESH_INTENT':'FORWARD_ORBIT');assert.equal(f.orbit().down,hit?0:1);f.pointer('pointerup',{clientX:p.x,clientY:p.y});}
});
test('pencil-orbit-diagnostics-646.test: current routing blocks active modelling and armed Lasso',()=>{
 for(const owner of ['Face','main','Lasso']){const f=pencilSelectionRuntime();f.multi.checked=false;if(owner==='Face')f.context.__boxlabFaceDirect={active:()=>true};if(owner==='main')f.context.__boxlabMainDirectTool={active:()=> 'test-tool',ownsModellingGesture:()=>true};if(owner==='Lasso')f.lasso();const p=f.screen(new THREE.Vector3());f.pointer('pointerdown',{clientX:p.x,clientY:p.y});const route=f.logs.findLast(e=>e.stage==='PEN ORBIT ROUTE')?.detail;assert.equal(route.route,'BLOCK_MODELLING_TOOL',owner);assert.equal(f.context.__boxlabPencilOrbitDebug.snapshot().pendingMeshOrbit,null);f.pointer('pointermove',{clientX:p.x+40,clientY:p.y});assert.equal(f.orbit().down,0);assert.equal(f.events.some(e=>e.type==='boxlab-pencil-orbit-claim'),false);f.pointer('pointercancel',{clientX:p.x+40,clientY:p.y});}
});
