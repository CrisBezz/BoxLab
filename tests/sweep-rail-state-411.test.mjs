import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const source=fs.readFileSync(new URL('../src/sweep-path.js',import.meta.url),'utf8');

test('411 path mode buttons synchronize immediately',()=>{
  assert.ok(source.includes('function syncPathModeButtons(m)'));
  assert.ok(source.includes("followBtn.classList.toggle('active',edges)"));
  assert.ok(source.includes("drawPathBtn.classList.toggle('active',draw)"));
  assert.ok(source.includes("followBtn.setAttribute('aria-pressed',edges?'true':'false')"));
  assert.ok(source.includes("drawPathBtn.setAttribute('aria-pressed',draw?'true':'false')"));
});

test('411 setPathMode updates button state before stage redraw',()=>{
  const block=source.slice(source.indexOf('function setPathMode'),source.indexOf("stageProfileBtn.addEventListener"));
  const sync=block.indexOf('syncPathModeButtons(m)');
  const stage=block.indexOf("setSweepStage('path')");
  assert.ok(sync>=0&&stage>sync);
});

test('411 Follow Edges has explicit visible active styling',()=>{
  assert.ok(source.includes("#sweepPathControls button.active"));
  assert.ok(source.includes("background:rgba(74,134,205,.28)"));
});

test('411 candidate rails render above shaded faces',()=>{
  const block=source.slice(source.indexOf('function railEdgeOverlay'),source.indexOf('function hotRailOverlay'));
  assert.ok(block.includes('depthTest:false'));
  assert.ok(block.includes('depthWrite:false'));
});
