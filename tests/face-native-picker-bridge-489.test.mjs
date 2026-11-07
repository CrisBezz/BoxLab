import {mainPickerRuntime} from './helpers/main-picker-runtime.mjs';
import {delegatedPicker,tapRemoval,tapToggle} from './helpers/armed-face-behavior.mjs';
import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('489 selection bridge exposes exact native component picker',()=>{
  const f=mainPickerRuntime();f.add('face',9,1);f.add('body',88,5);f.add('face',7,3);
  const hit=f.bridge.pick('face',f.event);assert.equal(hit.type,'face');assert.equal(hit.index,7);
  assert.equal(f.events[0],f.event);assert.equal(f.bridge.indices().length,0);
});

test('489 armed Face tools delegate the original pointer event to the native bridge',()=>{
  delegatedPicker();
});

test('489 direct controller resolves additive and subtractive native toggles',()=>{
  tapToggle();tapRemoval();
});

test('489 contains no stale native handoff state',()=>{
  assert.doesNotMatch(direct,/pendingNativePress/);
});

test('489 cache-hops only intended runtimes and preserves protected multi-object pin',()=>{
  assertAssetReference(index,'main.js');
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'rotate-transform.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});


test('489 actual bridge filters component kinds and exposes ordered hit distances',()=>{
  const f=mainPickerRuntime();f.add('face',9,1);f.add('face',7,3);f.add('body',99,6);f.add('edge',4,5);f.add('vertex',2,4);
  const hits=f.bridge.pickHits('face',f.event);assert.deepEqual(Array.from(hits,h=>h.index),[7,7,9,9]);
  // Plane triangles share the exact centre; raw main raycast retains both hits.
  assert.ok(hits.every(h=>h.type==='face'));assert.ok(hits.every((h,i)=>!i||h.distance>=hits[i-1].distance));
  assert.equal(f.bridge.pick('edge',f.event).index,4);assert.equal(f.bridge.pick('vertex',f.event).index,2);
  const object=f.bridge.pick('object',f.event);assert.equal(object.type,'object');assert.equal(object.index,0);assert.equal(object.distance,4);
  assert.equal(f.bridge.pickObject(f.event).distance,4);
});

test('489 actual native bridge recomputes after scene changes and returns empty on a miss',()=>{
  const f=mainPickerRuntime(),front=f.add('face',7,3);f.add('face',9,1);
  assert.equal(f.bridge.pick('face',f.event).index,7);f.root.remove(front);assert.equal(f.bridge.pick('face',f.event).index,9);
  const miss={...f.event,clientX:880,clientY:70};assert.equal(f.bridge.pick('face',miss),null);assert.equal(f.bridge.pickHits('face',miss).length,0);assert.equal(f.bridge.pick('object',miss),null);
});

test('489 real-raycast checks reject type filtering, hit ordering, event and Object routing mutations',()=>{
  const cases=[
    ["root.children.filter(o=>o.userData.kind===kind)","root.children"],
    ["index:hits[0].index","index:hits.at(-1).index"],
    ["pickKind(event,type)","pickKind({...event},type)"],
    ["type==='object'?pickObject(event):pickKind(event,type)","pickKind(event,type)"]
  ];
  function check(transform){const f=mainPickerRuntime({sourceTransform:transform});f.add('face',9,1);f.add('face',7,3);f.add('body',88,5);assert.equal(f.bridge.pick('face',f.event).index,7);assert.equal(f.events[0],f.event);assert.equal(f.bridge.pick('object',f.event)?.type,'object');}
  for(const [before,after] of cases){assert.ok(main.includes(before));assert.throws(()=>check(s=>s.replace(before,after)),assert.AssertionError);}
});
