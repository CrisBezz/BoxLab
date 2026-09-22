import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const source=fs.readFileSync(new URL('../src/sweep-path.js',import.meta.url),'utf8');

test('408 Follow Edges has a temporary rail-edge overlay',()=>{
  assert.ok(source.includes('function railEdgeOverlay(refs)'));
  assert.ok(source.includes("group.name='Sweep Rail Edge Guide'"));
  assert.ok(source.includes('new THREE.LineSegments(geometry,material)'));
});

test('408 rail guide uses the same evaluated references as snapping',()=>{
  assert.ok(source.includes('railEdgeOverlay(railRefs())'));
  assert.ok(source.includes('const edges=mesh?.edges?.()||[]'));
});

test('408 rail guide appears only in PATH Follow Edges',()=>{
  assert.ok(source.includes("if(m.sessionStage==='path'&&m.pathMode==='edges')"));
  const block=source.slice(source.indexOf("if(m.sessionStage==='path'&&m.pathMode==='edges')"),source.indexOf('const result=buildResult'));
  assert.ok(block.includes('overlay.add(railGuide)'));
});

test('408 rail guide is depth-tested and does not write depth',()=>{
  assert.ok(source.includes('depthTest:true,depthWrite:false'));
});
