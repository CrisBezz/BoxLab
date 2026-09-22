import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const source=fs.readFileSync(new URL('../src/sweep-path.js',import.meta.url),'utf8');

test('402 adds direct Sweep launch buttons to Face and Edge Active Tools',()=>{
  assert.ok(source.includes("data-mode-tools=\"face\""));
  assert.ok(source.includes("data-mode-tools=\"edge\""));
  assert.ok(source.includes("button.textContent='Sweep'"));
  assert.ok(source.includes("faceSelectionSweepBtn"));
  assert.ok(source.includes("edgeSelectionSweepBtn"));
});

test('402 captures selection before creating Sweep object',()=>{
  const launch=source.indexOf('const candidate=selectionProfileCandidate();');
  const add=source.indexOf('addSweepPath(candidate,true);');
  assert.ok(launch>=0&&add>launch);
});

test('402 auto-applies captured selection after object-mode handoff',()=>{
  assert.ok(source.includes('function addSweepPath(selectionProfileOverride=null,autoUseSelection=false)'));
  assert.ok(source.includes('selectionProfileOverride||selectionProfileCandidate()'));
  assert.ok(source.includes("if(selectionProfile&&autoUseSelection)queueMicrotask(()=>{applySelectionProfile();setPathMode('edges');setSweepStage('path');})"));
});

test('402 launch buttons follow current component selection context',()=>{
  assert.ok(source.includes("faceSelectionSweepBtn.disabled=!(mode==='face'&&ids.length===1)"));
  assert.ok(source.includes("edgeSelectionSweepBtn.disabled=!(mode==='edge'&&ids.length>=3)"));
});
