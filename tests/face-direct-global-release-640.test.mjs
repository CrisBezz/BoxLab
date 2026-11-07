import {hasAssetReference,shellReleaseMatches} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));
const checks=[
 ['Face-direct pointerup uses window capture',direct.includes("window.addEventListener('pointerup',finish,true)")],
 ['Face-direct pointercancel uses window capture',direct.includes("window.addEventListener('pointercancel',finish,true)")],
 ['old document finish listeners removed',!direct.includes("document.addEventListener('pointerup',finish,true)")&&!direct.includes("document.addEventListener('pointercancel',finish,true)")],
 ['finish debug marker present',direct.includes("'FACE DIRECT FINISH'")&&direct.includes("type:event.type")],
 ['published Face-direct reviewed cache pin',hasAssetReference(index,'multi-face-direct.js')],
 ['current release',shellReleaseMatches(index,version.version)],
 ['protected multi unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
for(const [name,ok] of checks)test("face-direct-global-release-640.test: "+name,()=>assert.equal(ok,true,name));
