import {hasAssetReference,shellReleaseMatches} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));
const checks=[
 ['lookup helper',main.includes('function edgeIndexByVertices(a,b)')],
 ['face helper',main.includes('function faceBoundaryCandidatesForEdge(seedIndex)')],
 ['incident faces',main.includes('for(const faceIndex of seed.faces||[])')],
 ['perimeter segment mapping',main.includes('edgeIndexByVertices(face[i],face[(i+1)%face.length])')],
 ['candidate inserted',main.includes("add('Face Boundary',perimeter)")],
 ['candidate-only preview retained',main.includes("selection=makeSelection('edge',candidate.indices,hold.edgeIndex);")],
 ['main reviewed cache pin',hasAssetReference(index,'main.js')],
 ['current release',shellReleaseMatches(index,version.version)],
 ['protected transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
for(const [name,ok] of checks)test("edge-face-boundary-candidates-657.test: "+name,()=>assert.equal(ok,true,name));
