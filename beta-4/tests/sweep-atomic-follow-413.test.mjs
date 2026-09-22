import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const source=fs.readFileSync(new URL('../src/sweep-path.js',import.meta.url),'utf8');

test('413 selected-profile launch activates Follow Edges atomically',()=>{
  assert.ok(source.includes("function applySelectionProfile({activateFollowEdges=false}={})"));
  const block=source.slice(source.indexOf('function applySelectionProfile'),source.indexOf('function pointOnProfilePlane'));
  assert.ok(block.includes("m.editPath=!!activateFollowEdges"));
  assert.ok(block.includes("if(activateFollowEdges){m.pathMode='edges';m.sessionStage='path';hotRailHit=null;railSnapRefs=null;}"));
});

test('413 rail refs and button state are established before save/render',()=>{
  const block=source.slice(source.indexOf('function applySelectionProfile'),source.indexOf('function pointOnProfilePlane'));
  const activate=block.indexOf("if(activateFollowEdges){railRefs(true);syncPathModeButtons(m);setSweepStage('path');}");
  const save=block.indexOf("manager()?.saveActive?.()");
  const cage=block.indexOf("document.querySelector('#cageToggle')");
  assert.ok(activate>=0&&save>activate&&cage>save);
});

test('413 auto launch no longer re-resolves mode after profile apply',()=>{
  assert.ok(source.includes("queueMicrotask(()=>applySelectionProfile({activateFollowEdges:true}))"));
  assert.equal(source.includes("queueMicrotask(()=>{applySelectionProfile();setPathMode('edges');setSweepStage('path');})"),false);
});

test('413 manual Use Selection remains profile-only',()=>{
  assert.ok(source.includes("useSelectionBtn.addEventListener('click',applySelectionProfile)"));
});
