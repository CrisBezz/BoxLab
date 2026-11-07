import {snapshot} from './helpers/negative-extrude-runtime.mjs';
import {edgeHoldRuntime,wireCube} from './helpers/edge-hold-runtime.mjs';
import {EditableMesh} from '../src/mesh.js';
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
 ['cancel restores pre-hold selection',main.includes("EDGE HOLD CANCEL RESTORE")&&main.includes('hold.restoreIndices')],
 ['commit diagnostic',main.includes('EDGE HOLD COMMIT')],
 ['main reviewed cache pin',hasAssetReference(index,'main.js')],
 ['current release',shellReleaseMatches(index,version.version)],
 ['Edge Hub retained',hasAssetReference(index,'total-gizmo.js')],
 ['Shell retained',hasAssetReference(index,'selection-hub-shell-session.js')],
 ['protected transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
for(const [name,ok] of checks)test("edge-hold-browser-655.test: "+name,()=>assert.equal(ok,true,name));

// .659 additive ownership superseded .655 candidate-only selection. Evaluate the
// actual timer/move/window-release functions instead of prescribing their spelling.
const sorted=ids=>Array.from(new Set(ids)).sort((a,b)=>a-b);
for(const behaviour of ['fixed base survives candidate changes','overlapping base is deduplicated without accumulating previews'])test(`edge-hold-browser-655.test: ${behaviour}`,()=>{
 for(const m of [wireCube(),EditableMesh.cube(2)]){
  const probe=edgeHoldRuntime(m),candidates=probe.collect(0);assert.ok(candidates.length>1);
  const used=new Set([...candidates[0].indices,...candidates[1].indices]);const outside=m.edges().findIndex((_,i)=>!used.has(i));assert.ok(outside>=0);
  const base=behaviour.startsWith('fixed')?[outside]:[0,outside],f=edgeHoldRuntime(m,base),before=snapshot(m),p=f.hold();f.history.redoStack.push(m.clone());
  const first=f.candidates()[0],second=f.candidates()[1];assert.deepEqual(sorted(f.ids()),sorted([...base,...first.indices]));
  f.pointer('pointermove',{clientX:p.x+32,clientY:p.y});assert.deepEqual(sorted(f.ids()),sorted([...base,...second.indices]));assert.equal(f.ids().length,new Set([...base,...second.indices]).size);
  if(!behaviour.startsWith('fixed')){f.pointer('pointermove',{clientX:p.x,clientY:p.y});assert.deepEqual(sorted(f.ids()),sorted([...base,...first.indices]));f.pointer('pointermove',{clientX:p.x+32,clientY:p.y});}
  f.pointer('pointerup',{clientX:p.x+32,clientY:p.y});assert.deepEqual(sorted(f.ids()),sorted([...base,...second.indices]));assert.equal(f.context.__boxlabModelessSelection.browsing(1),false);assert.equal(f.orbit(),0);assert.equal(snapshot(m),before);assert.equal(f.history.undoStack.length,0);assert.equal(f.history.redoStack.length,1);
 }
});
