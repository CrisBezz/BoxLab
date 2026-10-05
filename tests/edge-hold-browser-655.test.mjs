import {hasAssetReference,shellReleaseMatches} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const checks=[
 ['transactional edge selector saves original',main.includes("const original=selection?.type==='edge'?[...selectionIndices()]:[];")],
 ['transactional edge selector restores original',main.includes("selection=makeSelection('edge',original,original.at(-1)??null);")],
 ['endpoint hint enumeration',main.includes('function edgeEndpointHints(seedIndex,vertex)')],
 ['two-ended loop enumeration',main.includes('for(const a of hintsA)for(const b of hintsB)')],
 ['Boundary candidate',main.includes("add('Boundary',invokeEdgeSelector('#selectBoundaryBtn',[seedIndex]))")],
 ['Ring candidate',main.includes("add('Ring',invokeEdgeSelector('#selectRingBtn',[seedIndex]))")],
 ['candidate preview replaces selection',main.includes("selection=makeSelection('edge',candidate.indices,hold.edgeIndex);")],
 ['old additive merge removed',!main.includes("merged=[...new Set([...hold.baseIndices,...candidate.indices])]")],
 ['cancel restores pre-hold selection',main.includes("EDGE HOLD CANCEL RESTORE")&&main.includes('hold.restoreIndices')],
 ['commit diagnostic',main.includes('EDGE HOLD COMMIT')],
 ['main reviewed cache pin',hasAssetReference(index,'main.js')],
 ['current release',shellReleaseMatches(index,version.version)],
 ['Edge Hub retained',hasAssetReference(index,'total-gizmo.js')],
 ['Shell retained',hasAssetReference(index,'selection-hub-shell-session.js')],
 ['protected transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
for(const [name,ok] of checks)test("edge-hold-browser-655.test: "+name,()=>assert.equal(ok,true,name));
