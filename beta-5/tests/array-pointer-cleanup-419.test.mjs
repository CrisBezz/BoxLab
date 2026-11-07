import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const array=fs.readFileSync(new URL('../src/linear-array.js',import.meta.url),'utf8');
const transform=fs.readFileSync(new URL('../src/transform-upgrade.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('419 Array explicitly releases endpoint pointer capture on drag teardown',()=>{
  const block=array.slice(array.indexOf('function endEndpointDrag'),array.indexOf('function cancelPreview'));
  assert.ok(block.includes('const pointerId=endpointDrag.pointerId'));
  assert.ok(block.includes('canvas?.hasPointerCapture?.(pointerId)'));
  assert.ok(block.includes('canvas.releasePointerCapture?.(pointerId)'));
  assert.ok(block.indexOf('releasePointerCapture')<block.indexOf('endpointDrag=null'));
});

test('419 Array restores the previous OrbitControls state before ending endpoint drag',()=>{
  const block=array.slice(array.indexOf('function endEndpointDrag'),array.indexOf('function cancelPreview'));
  assert.ok(block.includes('if(ctl)ctl.enabled=endpointDrag.controlsWereEnabled'));
});

test('419 free component Move path remains unchanged and protected transform pin stays frozen',()=>{
  assert.ok(transform.includes("constraint==='free'?'Free'"));
  assert.ok(transform.includes("if(g.t==='move')"));
  assert.ok(transform.includes("else{const now=planePoint(event,g.plane,g.camera)"));
  assert.ok(index.includes('src/multi-object-transform.js?v=0.36.1.0'));
});
