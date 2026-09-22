import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const source=fs.readFileSync(new URL('../src/sweep-path.js',import.meta.url),'utf8');

test('415 fresh Sweep has visible camera-facing construction placement',()=>{
  assert.ok(source.includes('function visibleFreshConstructionPlane()'));
  const block=source.slice(source.indexOf('function visibleFreshConstructionPlane'),source.indexOf('function looksConstructionMesh'));
  assert.ok(block.includes('new THREE.Box3().setFromPoints(source.vertices)'));
  assert.ok(block.includes('box.getBoundingSphere(sphere)'));
  assert.ok(block.includes('camera.position.clone().sub(sphere.center)'));
  assert.ok(block.includes('applyQuaternion(camera.quaternion)'));
});

test('415 fresh and selected-profile Sweep use different placement paths',()=>{
  assert.ok(source.includes("const plane=selectionProfile?constructionPlane():visibleFreshConstructionPlane()"));
});

test('415 fresh Sweep arms real Move after creation',()=>{
  assert.ok(source.includes("else requestAnimationFrame(()=>{if(manager()?.activeId===o.id)globalThis.__boxlabTransformArming?.activateRealMove?.();})"));
});

test('415 selected-profile auto launch still applies captured geometry',()=>{
  assert.ok(source.includes("if(selectionProfile&&autoUseSelection)queueMicrotask(()=>applySelectionProfile({activateFollowEdges:true}))"));
});
