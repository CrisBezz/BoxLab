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
 ['route captures mesh hit',gate.includes('meshHit,')&&gate.includes("route:blocked?'BLOCK_MESH_HIT':'FORWARD_ORBIT'")],
 ['route captures selection',gate.includes('selectionMode,')&&gate.includes('selectionCount,')],
 ['route captures tool/paint/controls',gate.includes('faceToolActive,')&&gate.includes('paintPending,')&&gate.includes('paintActive,')&&gate.includes('controlsEnabled,')],
 ['forwarded log exists',gate.includes("gestureDebug('PEN ORBIT FORWARDED'")],
 ['routing condition unchanged',gate.includes('const blocked=!!meshHit;')&&gate.includes('if (blocked) return;')],
 ['paint diagnostic API read-only getters',paint.includes('globalThis.__boxlabPaintSelectDebug')&&paint.includes('pending:()=>')&&paint.includes('active:()=>')],
 ['published gate reviewed cache pin',hasAssetReference(index,'pencil-orbit-gate.js')],
 ['published paint reviewed cache pin',hasAssetReference(index,'edge-paint-select.js')],
 ['current release',shellReleaseMatches(index,version.version)],
 ['Sweep proxy retained',hasAssetReference(index,'selection-hub-sweep-session.js')],
 ['protected transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
for(const [name,ok] of checks)test("pencil-orbit-diagnostics-646.test: "+name,()=>assert.equal(ok,true,name));
