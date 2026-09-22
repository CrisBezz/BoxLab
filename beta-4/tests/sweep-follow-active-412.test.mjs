import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const source=fs.readFileSync(new URL('../src/sweep-path.js',import.meta.url),'utf8');

test('412 active path mode has hard aria-pressed styling',()=>{
  assert.ok(source.includes('#sweepPathControls button[aria-pressed="true"]'));
  assert.ok(source.includes('!important'));
});

test('412 active path mode labels are explicit',()=>{
  assert.ok(source.includes("followBtn.textContent=edges?'Follow Edges · Active':'Follow Edges'"));
  assert.ok(source.includes("drawPathBtn.textContent=draw?'Draw Path · Active':'Draw Path'"));
});

test('412 candidate rail guide is fully opaque',()=>{
  const block=source.slice(source.indexOf('function railEdgeOverlay'),source.indexOf('function hotRailOverlay'));
  assert.ok(block.includes('transparent:false'));
  assert.ok(block.includes('opacity:1'));
});
