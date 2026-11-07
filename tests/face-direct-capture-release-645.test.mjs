import {hasAssetReference,shellReleaseMatches} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const src=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));
const finish=src.slice(src.indexOf('function finish(event){'),src.indexOf("window.addEventListener('pointerup',finish,true)"));
const checks=[
 ['release helper exists',src.includes('function releaseDirectPointer(pointerId)')&&src.includes('canvas.releasePointerCapture(pointerId)')],
 ['background completion releases first',finish.includes('pendingBackgroundPress=null;\n    releaseDirectPointer(event.pointerId);\n    event.preventDefault();event.stopImmediatePropagation();')],
 ['Face-tap completion releases first',finish.includes('pendingFacePress=null;\n    releaseDirectPointer(event.pointerId);\n    event.preventDefault();event.stopImmediatePropagation();')],
 ['drag completion releases first',finish.includes("if(!drag||drag.id!==event.pointerId)return;\n  releaseDirectPointer(event.pointerId);\n  event.preventDefault();event.stopImmediatePropagation();")],
 ['Through still disarms Extrude',finish.includes("tool:'none',reason:'through-complete'")],
 ['Through debug reports capture state',finish.includes("pointerCapture:canvas.hasPointerCapture?.(event.pointerId)||false")],
 ['published Face-direct reviewed cache pin',hasAssetReference(index,'multi-face-direct.js')],
 ['current release',shellReleaseMatches(index,version.version)],
 ['Sweep proxy retained',hasAssetReference(index,'selection-hub-sweep-session.js')],
 ['protected multi transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
for(const [name,ok] of checks)test("face-direct-capture-release-645.test: "+name,()=>assert.equal(ok,true,name));
