import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import { Vector2, Vector3 } from 'three';

const source = readFileSync(new URL('../src/transform-upgrade.js', import.meta.url), 'utf8');
const inference = source.slice(
  source.indexOf('function referenceAlongAxis'),
  source.indexOf('function applyExactTransform'),
);

test('component Move infers an off-rail vertex in world and local axes', () => {
  for (const dir of [new Vector3(1, 0, 0), new Vector3(0, 0, 1)]) {
    const point = dir.clone().multiplyScalar(2).add(new Vector3(0, 5, 0));
    let enabled = true;
    let guide;
    const context = vm.createContext({
      axisVector: () => dir.clone(),
      inferenceSnapOn: () => enabled,
      referenceUnderPointer: () => null,
      clearRefVisual: () => { guide = undefined; },
      showRefVisual: (ref, inferred) => { guide = { ref, inferred }; },
    });
    const apply = vm.runInContext(inference + '\napplyReferenceInference', context);
    const delta = dir.clone().multiplyScalar(1.95);
    const g = {
      axis: 'x',
      axes: { x: new Vector2(100, 0) },
      before: { vertices: [delta.clone(), point] },
      center: new Vector3(),
      indices: [0],
    };

    assert.equal(apply(g, delta, {}).snap.index, 1);
    assert.deepEqual(guide.inferred.toArray(), dir.clone().multiplyScalar(2).toArray());
    assert.equal(apply(g, dir.clone().multiplyScalar(1.7), {}).snap, null);
    assert.equal(guide, undefined);
    enabled = false;
    assert.equal(apply(g, delta, {}).delta, delta);
  }
});

test('face Extrude infers depth off the normal rail for physical drags only', () => {
  const source = readFileSync(new URL('../src/multi-face-direct.js', import.meta.url), 'utf8');
  const inference = source.slice(
    source.indexOf('function referenceAlongExtrusion'),
    source.indexOf('function closestPointOnSegment'),
  );
  const toggle = { checked: true };
  const pick = vm.runInNewContext(inference + '\nreferenceAlongExtrusion', { inferenceToggle: toggle });
  const drag = {
    before: {
      faces: [[0, 1, 2]],
      vertices: [
        new Vector3(0, 1.96, 0), new Vector3(0, 0, 0), new Vector3(1, 0, 0),
        new Vector3(3, 2, 4), new Vector3(2, -2, 4),
      ],
    },
    faces: [0],
    regionCenter: new Vector3(),
    worldNormal: new Vector3(0, 1, 0),
  };
  const physical = { pointerId: 22 };
  assert.equal(pick(physical, drag, 1.95).index, 3);
  assert.equal(pick(physical, drag, -1.95).index, 4);
  assert.equal(pick(physical, drag, 1.8), null);
  assert.equal(pick({ pointerId: 9876 }, drag, 1.95), null);
  toggle.checked = false;
  assert.equal(pick(physical, drag, 1.95), null);
});
