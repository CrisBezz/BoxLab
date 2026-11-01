import {pencilSelectionRuntime} from './helpers/pencil-selection-runtime.mjs';
import * as THREE from 'three';
import {hasAssetReference,shellReleaseMatches} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const gate=fs.readFileSync(new URL('../src/pencil-orbit-gate.js',import.meta.url),'utf8');
const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const paint=fs.readFileSync(new URL('../src/edge-paint-select.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const checks=[
 ['deferred intent exists',gate.includes('let pendingMeshOrbit = null')&&gate.includes('DEFERRED_ORBIT_PX = 8')],
 ['real OrbitControls down listener captured',gate.includes("if(type==='pointerdown')orbitPointerDownListener=listener")],
 ['drag promotes deferred orbit',gate.includes('PEN ORBIT DEFER CLAIM')&&gate.includes('orbitPointerDownListener.call(canvas,downEvent)')],
 ['hold browser wins',gate.includes("PEN ORBIT DEFER YIELD HOLD")],
 ['pre-down selection restored',gate.includes("bridge.set?.(pending.selectionMode,pending.selectionIndices)")],
 ['main yields component ownership',main.includes("boxlab-pencil-orbit-claim")&&main.includes("PEN ORBIT MAIN YIELD")],
 ['paint yields ownership',paint.includes("PAINT YIELD TO ORBIT")],
 ['gate reviewed cache pin',hasAssetReference(index,'pencil-orbit-gate.js')],
 ['main reviewed cache pin',hasAssetReference(index,'main.js')],
 ['paint reviewed cache pin',hasAssetReference(index,'edge-paint-select.js')],
 ['current release',shellReleaseMatches(index,version.version)],
 ['Sweep retained',hasAssetReference(index,'selection-hub-sweep-session.js')],
 ['protected transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
for(const [name,ok] of checks)test("pencil-deferred-orbit-651.test: "+name,()=>assert.equal(ok,true,name));

test('pencil-deferred-orbit-651.test: idle mesh waits for deliberate movement while matching Edge paint keeps ownership',()=>{
 for(const owner of ['idle','paint']){const f=pencilSelectionRuntime();f.multi.checked=owner==='paint';f.body(new THREE.Vector3(0,0,-1));f.setIds([1]);const p=f.screen(new THREE.Vector3());f.pointer('pointerdown',{clientX:p.x,clientY:p.y});assert.equal(f.orbit().down,0);assert.equal(f.context.__boxlabPencilOrbitDebug.snapshot().pendingMeshOrbit?.pointerId,1);f.pointer('pointermove',{clientX:p.x+4,clientY:p.y});assert.equal(f.orbit().down,0);f.pointer('pointermove',{clientX:p.x+40,clientY:p.y});assert.equal(f.orbit().down,owner==='idle'?1:0);assert.equal(f.events.some(e=>e.type==='boxlab-pencil-orbit-claim'),owner==='idle');if(owner==='idle')assert.deepEqual(f.ids(),[1]);else assert.equal(f.context.__boxlabPaintSelectDebug.active()?.type,'edge');f.pointer('pointerup',{clientX:p.x+40,clientY:p.y});f.flush();assert.equal(f.context.__boxlabPencilOrbitDebug.snapshot().pendingMeshOrbit,null);assert.equal(f.context.__boxlabPaintSelectDebug.active(),null);assert.equal(f.history.undoStack.length,0);}
});

test('pencil-deferred-orbit-651.test: UV Paint keeps every mesh Pencil contact out of orbit after brush changes while background orbit remains available',()=>{
 const painted=pencilSelectionRuntime(null,{paintActive:true});painted.body(new THREE.Vector3(0,0,-1));const p=painted.screen(new THREE.Vector3());
 painted.pointer('pointerdown',{clientX:p.x,clientY:p.y});painted.pointer('pointermove',{clientX:p.x+40,clientY:p.y});
 assert.equal(painted.orbit().down,0);assert.equal(painted.context.__boxlabPencilOrbitDebug.snapshot().pendingMeshOrbit,null);
 const background=pencilSelectionRuntime(null,{paintActive:true});background.body();background.pointer('pointerdown',{clientX:40,clientY:40});background.pointer('pointermove',{clientX:80,clientY:40});
 assert.equal(background.orbit().down,1);assert.equal(background.logs.some(x=>x.stage==='PEN ORBIT ROUTE'&&x.detail.route==='FORWARD_ORBIT'),true);
});
