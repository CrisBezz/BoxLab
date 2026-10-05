import {hasAssetReference,shellReleaseMatches} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const applyStart=main.indexOf('function applyEdgeHoldCandidate');
const applyEnd=main.indexOf('function cancelFaceHold',applyStart);
const apply=main.slice(applyStart,applyEnd);

const checks=[
 ['preview uses fixed base + current candidate',apply.includes("const merged=[...new Set([...(hold.baseIndices||[]),...candidate.indices])]")],
 ['preview writes merged only',apply.includes("selection=makeSelection('edge',merged,hold.edgeIndex);")],
 ['preview diagnostic separates base/candidate',apply.includes('baseCount:hold.baseIndices?.length||0')&&apply.includes('candidateCount:candidate.indices.length')],
 ['commit recomputes fixed base result',main.includes("const result=[...new Set([...(hold.baseIndices||[]),...candidate.indices])]")],
 ['commit stores base and contribution separately',main.includes("baseIndices:[...(hold.baseIndices||[])]")&&main.includes("contributionIndices:[...candidate.indices]")],
 ['cancel restore retained',main.includes('EDGE HOLD CANCEL RESTORE')&&main.includes('hold.restoreIndices')],
 ['transactional probes retained',main.includes("selection=makeSelection('edge',original,original.at(-1)??null);")],
 ['Face Boundary retained',main.includes("add('Face Boundary',perimeter)")],
 ['main reviewed cache pin',hasAssetReference(index,'main.js')],
 ['current release',shellReleaseMatches(index,version.version)],
 ['radial availability .658 retained',hasAssetReference(index,'total-gizmo.js')],
 ['protected transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
for(const [name,ok] of checks)test("edge-hold-additive-base-659.test: "+name,()=>assert.equal(ok,true,name));
