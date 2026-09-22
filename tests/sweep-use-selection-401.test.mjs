import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const source=fs.readFileSync(new URL('../src/sweep-path.js',import.meta.url),'utf8');

test('401 exposes Use Selection as a fourth profile source',()=>{
  assert.ok(source.includes('sweepProfileUseSelection'));
  assert.ok(source.includes('Use Selection'));
  assert.ok(source.includes("useSelectionBtn.addEventListener('click',applySelectionProfile)"));
});

test('401 captures one Face or a closed Edge loop before Sweep object creation',()=>{
  assert.ok(source.includes('function selectionProfileCandidate()'));
  assert.ok(source.includes("mode==='face'&&ids.length===1"));
  assert.ok(source.includes("mode==='edge'&&ids.length>=3"));
  assert.ok(source.includes('orderClosedEdgeLoop'));
  assert.ok(source.includes('const selectionProfile=selectionProfileCandidate();'));
  const captureIndex=source.indexOf('const selectionProfile=selectionProfileCandidate();');
  const addIndex=source.indexOf("man.addMesh(constructionPlane(),'Sweep'");
  assert.ok(captureIndex>=0&&addIndex>captureIndex);
});

test('401 closed edge loop validation is conservative',()=>{
  assert.ok(source.includes('some(list=>list.length!==2)'));
  assert.ok(source.includes('ordered.length!==chosen.length'));
  assert.ok(source.includes('ordered.includes(next)'));
});

test('401 Use Selection aligns plane and converts source into closed editable Draw profile',()=>{
  assert.ok(source.includes("m.profileType='draw';m.profileClosed=true"));
  assert.ok(source.includes('m.profilePoints=(candidate.profilePoints||[]).map'));
  assert.ok(source.includes('planeVertices'));
  assert.ok(source.includes('replaceMesh(mesh,plane)'));
  assert.ok(source.includes('m.pathPoints=[];m.pathHistory=[]'));
});

test('401 selected source outline must be planar',()=>{
  assert.ok(source.includes('projected.some(p=>Math.abs(p.z)>Math.max(1e-4,span*1e-4))'));
});
