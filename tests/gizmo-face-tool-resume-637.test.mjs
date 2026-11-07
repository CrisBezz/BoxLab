import {hasAssetReference,shellReleaseMatches} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));
const checks=[
 ['resume disarms transforms first',direct.includes('resumeAfterTransform:()=>')&&direct.includes('disarmTransforms();')&&direct.indexOf('disarmTransforms();',direct.indexOf('resumeAfterTransform:()=>'))<direct.indexOf('armed=transformSuspendedTool',direct.indexOf('resumeAfterTransform:()=>'))],
 ['resume clears gizmo transient state',direct.includes("globalThis.__boxlabTotalGizmo?.resetTransient?.({hideFloat:true});")],
 ['published pins .637',hasAssetReference(index,'multi-face-direct.js')&&hasAssetReference(index,'total-gizmo.js')],
 ['current release',shellReleaseMatches(index,version.version)],
 ['protected multi unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
for(const [name,ok] of checks)test("gizmo-face-tool-resume-637.test: "+name,()=>assert.equal(ok,true,name));
