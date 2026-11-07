import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const session=fs.readFileSync(new URL('../src/tool-session-ui.js',import.meta.url),'utf8');
const sweep=fs.readFileSync(new URL('../src/sweep-path.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8')).version;

test('406 Tool Session module loads before Sweep',()=>{
  const tool=index.indexOf('src/tool-session-ui.js?v='+version);
  const sweepIndex=index.indexOf('src/sweep-path.js?v='+version);
  assert.ok(tool>=0&&sweepIndex>tool);
});

test('406 Tool Session owns Active Tools and hides unrelated drawer content',()=>{
  assert.ok(session.includes('#editDrawer[data-tool-session-active="true"]>.drawer-content>:not(#boxlabToolSessionHost){display:none!important}'));
  assert.ok(session.includes("drawer.dataset.toolSessionActive='true'"));
  assert.ok(session.includes("globalThis.__boxlabToolSession={begin,end,isActive,current,host}"));
});

test('406 Tool Session restores previous drawer state',()=>{
  assert.ok(session.includes("keepOpen:drawer.dataset.keepOpen"));
  assert.ok(session.includes("if(old.keepOpen===undefined)delete drawer.dataset.keepOpen;else drawer.dataset.keepOpen=old.keepOpen"));
});

test('406 Sweep exposes Profile Path Finish stages',()=>{
  assert.ok(sweep.includes('sweepStageProfile'));
  assert.ok(sweep.includes('sweepStagePath'));
  assert.ok(sweep.includes('sweepStageFinish'));
  assert.ok(sweep.includes('sweepProfilePanel'));
  assert.ok(sweep.includes('sweepPathPanel'));
  assert.ok(sweep.includes('sweepFinishPanel'));
});

test('406 Sweep begins and ends exclusive Tool Session',()=>{
  assert.ok(sweep.includes("toolSession()?.begin?.({id:'sweep',title:'Sweep',node:controls,subtitle:'Profile · Path · Finish'})"));
  assert.ok(sweep.includes("function endSweepSession(){toolSession()?.end?.('sweep');}"));
  const apply=sweep.slice(sweep.indexOf('function applySweep'),sweep.indexOf('function installPenRange'));
  assert.ok(apply.includes('endSweepSession()'));
});

test('406 selected Face or Edge launch jumps directly to Path Follow Edges',()=>{
  assert.ok(sweep.includes("sessionStage:selectionProfile&&autoUseSelection?'path':'profile'"));
  assert.ok(sweep.includes("queueMicrotask(()=>applySelectionProfile({activateFollowEdges:true}))"));
});

test('406 Face and Edge Sweep launch is promoted near top of contextual tools',()=>{
  assert.ok(sweep.includes("button.textContent='Sweep'"));
  assert.ok(sweep.includes("container.insertBefore(button._sweepRow,title.nextSibling)"));
});

test('406 Profile Path and Finish stage ownership is exclusive',()=>{
  assert.ok(sweep.includes("if(valid==='profile')m.editPath=false"));
  assert.ok(sweep.includes("if(valid==='path')m.editProfile=false"));
  assert.ok(sweep.includes("if(valid==='finish'&&m){m.editProfile=false;m.editPath=false;disarmTransforms();}"));
});
