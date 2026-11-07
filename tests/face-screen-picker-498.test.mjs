import {nativeFacePicker,nativeFaceViewpoints,selectedPriority,sequentialScope} from './helpers/armed-face-behavior.mjs';
import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('498 armed Face tools use the current native bridge rather than retired screen polygons',()=>{
  nativeFacePicker();
});

test('498 native camera-side hit is chosen from all six cube viewpoints',()=>{
  nativeFaceViewpoints();
});

test('498 native primary is the nearest distance-ordered shell hit',()=>{
  nativeFaceViewpoints();
});

test('498 armed ownership retains deliberate selection and scoped hit-stack continuation',()=>{
  selectedPriority();sequentialScope();
});

test('498 preserves tap toggle, drag flow and protected pins',()=>{
  assert.match(direct,/bridge\(\)\?\.toggle\?\.\('face',p\.hit\)/);
  assert.match(direct,/beginDirectDrag\(event,p\.hit,p\.selectionBefore,workingFaces\)/);
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'rotate-transform.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});

test('498 six-viewpoint checks reject wrong pointer coordinates and farthest primary',()=>{
  const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
  for(const [before,after] of [["raycaster.setFromCamera(pointer,camera)","raycaster.setFromCamera(new THREE.Vector2(1,1),camera)"],["index:hits[0].index","index:hits.at(-1).index"]]){
    assert.ok(main.includes(before));assert.throws(()=>nativeFaceViewpoints(s=>s.replace(before,after)),assert.AssertionError);
  }
});
