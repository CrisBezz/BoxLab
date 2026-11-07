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
 ['edge lookup helper exists',main.includes('function edgeIndexByVertices(a,b)')],
 ['face boundary generator exists',main.includes('function faceBoundaryCandidatesForEdge(seedIndex)')],
 ['generator walks seed incident faces',main.includes('for(const faceIndex of seed.faces||[])')],
 ['generator resolves every face perimeter segment',main.includes('face[(i+1)%face.length]')&&main.includes('edgeIndexByVertices')],
 ['generator requires seed in perimeter',main.includes('indices.includes(seedIndex)')],
 ['Face Boundary candidate added',main.includes("add('Face Boundary',perimeter)")],
 ['Loop candidate retained',main.includes("add('Loop',invokeEdgeSelector('#selectLoopBtn'")],
 ['Boundary candidate retained',main.includes("add('Boundary',invokeEdgeSelector('#selectBoundaryBtn',[seedIndex]))")],
 ['Ring candidate retained',main.includes("add('Ring',invokeEdgeSelector('#selectRingBtn',[seedIndex]))")],
 ['main reviewed cache pin',hasAssetReference(index,'main.js')],
 ['current release',shellReleaseMatches(index,version.version)],
 ['Edge Hub retained',hasAssetReference(index,'total-gizmo.js')],
 ['Shell retained',hasAssetReference(index,'selection-hub-shell-session.js')],
 ['protected transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
for(const [name,ok] of checks)test("edge-face-boundary-candidates-656.test: "+name,()=>assert.equal(ok,true,name));

test('edge-face-boundary-candidates-656.test: candidate probes restore selection; preview keeps fixed base and cancel restores it',()=>{
 const m=EditableMesh.cube(2);m.faceGroups.fill('Shell');m.creases.set('0:1',.75);const f=edgeHoldRuntime(m,[8]),before=snapshot(m);f.history.redoStack.push(m.clone());
 for(let seed=0;seed<m.edges().length;seed++){
  const candidates=f.collect(seed);assert.ok(candidates.length);assert.ok(candidates.some(c=>c.kind==='Face Boundary'));assert.deepEqual(f.ids(),[8]);assert.equal(snapshot(m),before);assert.equal(f.history.undoStack.length,0);assert.equal(f.history.redoStack.length,1);
 }
 const p=f.hold(),expected=[...new Set([8,...f.candidates()[0].indices])].sort((a,b)=>a-b);assert.deepEqual([...f.ids()].sort((a,b)=>a-b),expected);f.pointer('pointercancel',{clientX:p.x,clientY:p.y});assert.deepEqual(f.ids(),[8]);assert.equal(snapshot(m),before);assert.equal(f.history.undoStack.length,0);assert.equal(f.history.redoStack.length,1);
});
