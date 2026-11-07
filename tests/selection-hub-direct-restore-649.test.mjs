import {hasAssetReference,shellReleaseMatches} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const giz=fs.readFileSync(new URL('../src/total-gizmo.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));
const checks=[
 ['listens for direct commit',giz.includes("document.addEventListener('boxlab-face-direct-committed'")],
 ['handles extrude and inset',giz.includes("tool!=='extrude'&&tool!=='inset'")],
 ['clears suppression',giz.includes("hubSuppressedKey='';")],
 ['returns closed puck',giz.includes("setHubState('closed',{reason:'direct-complete:'+tool})")],
 ['shows root',giz.includes("root.hidden=false;")],
 ['gizmo reviewed cache pin',hasAssetReference(index,'total-gizmo.js')],
 ['current release',shellReleaseMatches(index,version.version)],
 ['Sweep retained',hasAssetReference(index,'selection-hub-sweep-session.js')],
 ['protected transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
for(const [name,ok] of checks)test("selection-hub-direct-restore-649.test: "+name,()=>assert.equal(ok,true,name));
