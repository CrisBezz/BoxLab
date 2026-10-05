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
 ['mesh hit defers while idle',gate.includes("route:deferred?'DEFER_MESH_INTENT'")&&gate.includes('const deferred=blocked&&!faceToolActive')],
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
