import {snapshot} from './helpers/negative-extrude-runtime.mjs';
import {edgeHoldRuntime} from './helpers/edge-hold-runtime.mjs';
import {EditableMesh} from '../src/mesh.js';
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
 ['main reviewed cache pin',hasAssetReference(index,'main.js')],
 ['current release',shellReleaseMatches(index,version.version)],
 ['protected transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
for(const [name,ok] of checks)test("edge-face-boundary-candidates-657.test: "+name,()=>assert.equal(ok,true,name));

test('edge-face-boundary-candidates-657.test: every incident face perimeter is available without preview geometry mutation',()=>{
 const m=EditableMesh.cube(2),f=edgeHoldRuntime(m),before=snapshot(m),sort=a=>Array.from(a).sort((x,y)=>x-y);
 for(let seed=0;seed<m.edges().length;seed++){
  const edge=m.edges()[seed],expected=edge.faces.map(fi=>m.faces[fi].map((a,j)=>m.edges().findIndex(e=>m.edgeKey(e.a,e.b)===m.edgeKey(a,m.faces[fi][(j+1)%m.faces[fi].length]))));
  const candidates=f.collect(seed);for(const perimeter of expected)assert.ok(candidates.some(c=>JSON.stringify(sort(c.indices))===JSON.stringify(sort(perimeter))),`seed ${seed} missing incident face perimeter`);
  assert.deepEqual(f.ids(),[]);assert.equal(snapshot(m),before);
 }
 const p=f.hold(),candidate=f.candidates()[0];assert.deepEqual(sort(f.ids()),sort(candidate.indices));f.pointer('pointerup',{clientX:p.x,clientY:p.y});assert.deepEqual(sort(f.ids()),sort(candidate.indices));assert.equal(snapshot(m),before);assert.equal(f.history.undoStack.length,0);
});
