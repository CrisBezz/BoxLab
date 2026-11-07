import {hasAssetReference,shellReleaseMatches} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const gizmo=fs.readFileSync(new URL('../src/total-gizmo.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));
const checks=[
 ['Face direct exposes suspend',direct.includes('suspendForTransform:()=>')],
 ['Face direct exposes resume',direct.includes('resumeAfterTransform:()=>')],
 ['gizmo suspends Face tool',gizmo.includes('__boxlabFaceDirect?.suspendForTransform?.()')],
 ['gizmo resumes Face tool',gizmo.includes('__boxlabFaceDirect?.resumeAfterTransform?.()')],
 ['component failed handoff blocked',gizmo.includes("if(!directSemanticHandoff&&mode!=='object')")&&gizmo.includes("GIZMO HANDOFF BLOCKED")],
 ['component block occurs before synthetic fallback',gizmo.indexOf("GIZMO HANDOFF BLOCKED")<gizmo.indexOf("if(!directSemanticHandoff)syntheticDown(event)")],
 ['published pins .636',hasAssetReference(index,'multi-face-direct.js')&&hasAssetReference(index,'total-gizmo.js')],
 ['current release',shellReleaseMatches(index,version.version)],
 ['protected multi unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
for(const [name,ok] of checks)test("gizmo-direct-tool-ownership-636.test: "+name,()=>assert.equal(ok,true,name));
