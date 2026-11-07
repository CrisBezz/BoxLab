import {hasAssetReference,shellReleaseMatches} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const src=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const through=src.slice(src.indexOf("if(d.tool==='extrude'&&d.throughPlan)"),src.indexOf("}else if(d.tool==='extrude'){"));
const checks=[
 ['successful Through still clears Face selection',through.includes("bridge()?.set?.('face',[])")],
 ['successful Through disarms Extrude',through.includes('armed=null')],
 ['successful Through clears pending ownership',through.includes('pendingFacePress=null')&&through.includes('pendingBackgroundPress=null')],
 ['successful Through emits tool-none',through.includes("tool:'none',reason:'through-complete'")],
 ['debug marker exists',through.includes('FACE DIRECT THROUGH RELEASE')],
 ['normal Extrude branch still separate',src.includes("}else if(d.tool==='extrude'){")&&src.includes('preferSequentialUnselected=true')],
 ['published Face-direct reviewed cache pin',hasAssetReference(index,'multi-face-direct.js')],
 ['current release',shellReleaseMatches(index,version.version)],
 ['Sweep proxy retained',hasAssetReference(index,'selection-hub-sweep-session.js')],
 ['protected multi transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
for(const [name,ok] of checks)test("through-navigation-release-644.test: "+name,()=>assert.equal(ok,true,name));
