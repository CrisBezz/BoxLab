import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const source=fs.readFileSync(new URL('../src/sweep-path.js',import.meta.url),'utf8');

test('401 exposes Use Selection as a fourth profile source',()=>{
  assert.match(source,/sweepProfileUseSelection/);
  assert.match(source,/Use Selection/);
  assert.match(source,/useSelectionBtn.addEventListener('click',applySelectionProfile)/);
});

test('401 captures one Face or a closed Edge loop before Sweep object creation',()=>{
  assert.match(source,/function selectionProfileCandidate()/);
  assert.match(source,/mode==='face'&&ids.length===1/);
  assert.match(source,/mode==='edge'&&ids.length>=3/);
  assert.match(source,/orderClosedEdgeLoop/);
  assert.match(source,/const selectionProfile=selectionProfileCandidate();/);
  const captureIndex=source.indexOf('const selectionProfile=selectionProfileCandidate();');
  const addIndex=source.indexOf("man.addMesh(constructionPlane(),'Sweep'");
  assert.ok(captureIndex>=0&&addIndex>captureIndex);
});

test('401 closed edge loop validation is conservative',()=>{
  assert.match(source,/some(list=>list.length!==2)/);
  assert.match(source,/ordered.length!==chosen.length/);
  assert.match(source,/ordered.includes(next)/);
});

test('401 Use Selection aligns plane and converts source into closed editable Draw profile',()=>{
  assert.match(source,/m.profileType='draw';m.profileClosed=true/);
  assert.match(source,/m.profilePoints=(candidate.profilePoints||[]).map/);
  assert.match(source,/planeVertices/);
  assert.match(source,/replaceMesh(mesh,plane)/);
  assert.match(source,/m.pathPoints=[];m.pathHistory=[]/);
});

test('401 selected source outline must be planar',()=>{
  assert.match(source,/projected.some(p=>Math.abs(p.z)>Math.max(1e-4,span*1e-4))/);
});
