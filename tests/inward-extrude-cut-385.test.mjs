import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const ui=fs.readFileSync(new URL('../src/sequential-through-fallback.js',import.meta.url),'utf8');
const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8')).version;

test('Inward-cut runtime follows current app build',()=>{
  const stamp=index.match(/data-release-version="([^"]+)"/)?.[1];
  assert.equal(stamp,version);
  assert.match(drawer,/sequential-through-fallback\.js\?v=0\.36\.18\.464/);
});

test('385 inward cut reuses protected Through and topology gate',()=>{
  assert.match(ui,/planThrough,buildThrough/);
  assert.match(ui,/through-kernel\.js\?v=0\.36\.18\.242/);
  assert.match(ui,/gateClosedEdit/);
  assert.match(ui,/topology-seam-conformance\.js\?v=0\.36\.18\.242/);
});

test('385 partial inward build clips exterior slots and caps moving face',()=>{
  const block=ui.slice(ui.indexOf('function buildPartialRegion'),ui.indexOf('function previewPartialRegion'));
  assert.match(block,/plan\.exteriorEdges/);
  assert.match(block,/clipFaceByCuts/);
  assert.match(block,/if\(exteriorSlots\.has\(i\)\)continue/);
  assert.match(block,/trial\.faces\.push\(orientLike\(trial,opening,sourceNormal\)\)/);
});

test('385 takeover no longer waits for 55 percent depth',()=>{
  const takeover=ui.slice(ui.indexOf("window.addEventListener('pointermove'"),ui.indexOf("window.addEventListener('pointermove'",ui.indexOf("window.addEventListener('pointermove'")+1));
  assert.doesNotMatch(takeover,/plan\.distance\)\*\.55|plan\.distance\*\.55/);
  assert.match(takeover,/if\(!toward\)return/);
  assert.match(ui,/Math\.hypot\(dx,dy\)<8/);
});

test('385 history commits only after validated result',()=>{
  const commit=ui.slice(ui.indexOf('function commitEditedResult'),ui.indexOf("window.addEventListener('pointerdown'"));
  assert.match(commit,/gateClosedEdit/);
  assert.match(commit,/__boxlabHistory\?\.push\(t\.before\)/);
  const firstMove=ui.slice(ui.indexOf("window.addEventListener('pointermove'"),ui.indexOf("window.addEventListener('pointermove'",ui.indexOf("window.addEventListener('pointermove'")+1));
  assert.doesNotMatch(firstMove,/__boxlabHistory/);
});

test('385 remains single-face fallback and does not replace connected multi-face extrude',()=>{
  assert.match(ui,/function selectedFace\(\)/);
  assert.match(ui,/return ids\.length===1\?ids\[0\]:null/);
});
