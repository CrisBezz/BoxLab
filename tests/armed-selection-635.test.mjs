import {hasAssetReference,shellReleaseMatches} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const face=fs.readFileSync(new URL('../src/face-transform.js',import.meta.url),'utf8');
const rotate=fs.readFileSync(new URL('../src/rotate-transform.js',import.meta.url),'utf8');
const loose=fs.readFileSync(new URL('../src/loose-bootstrap.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const checks=[
 ['direct Face tool tracks background tap',direct.includes('pendingBackgroundPress')],
 ['background tap clears Face selection',direct.includes("bridge()?.set?.('face',[])")],
 ['touch background remains navigation',direct.includes("if(event.pointerType==='touch')return;")],
 ['legacy Face transform yields to Total Gizmo',face.includes('__boxlabTotalGizmo?.visible?.()')],
 ['legacy Rotate transform yields to Total Gizmo',rotate.includes('__boxlabTotalGizmo?.visible?.()')],
 ['face transform cache reviewed cache pin',hasAssetReference(loose,'face-transform.js')],
 ['published pins .635',hasAssetReference(index,'multi-face-direct.js')&&hasAssetReference(index,'rotate-transform.js')&&hasAssetReference(index,'loose-bootstrap.js')],
 ['current release',shellReleaseMatches(index,version.version)&&shellReleaseMatches(index,version.version)],
 ['protected multi-object transform pin unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
for(const [name,ok] of checks)test("armed-selection-635.test: "+name,()=>assert.equal(ok,true,name));
