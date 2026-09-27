import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const source=fs.readFileSync(new URL('../src/sweep-path.js',import.meta.url),'utf8');

test('410 Follow Edges has a dedicated edge-only picker',()=>{
  assert.ok(source.includes('function externalEdgeSnap(event,refs)'));
  const block=source.slice(source.indexOf('function externalEdgeSnap'),source.indexOf('function railRefs'));
  assert.ok(block.includes("kind:'Edge'"));
  assert.equal(block.includes("kind:'Vertex'"),false);
});

test('410 Follow Edges click uses edge-only picker',()=>{
  const block=source.slice(source.indexOf('function addEdgeToPath'),source.indexOf('function begin(event)'));
  assert.ok(block.includes('externalEdgeSnap(event,railRefs())'));
  assert.equal(block.includes('externalGeometrySnap'),false);
});

test('410 hot rail preview uses same edge-only picker',()=>{
  const block=source.slice(source.indexOf('function move(event)'),source.indexOf('function end(event)'));
  assert.ok(block.includes('externalEdgeSnap(event,railRefs())'));
});

test('410 Follow Edges caches rail references for hover and click',()=>{
  assert.ok(source.includes('function railRefs(refresh=false)'));
  assert.ok(source.includes('else railRefs(true)'));
  assert.ok(source.includes('railSnapRefs=null'));
});

test('410 Draw Path still uses generic geometry snapper',()=>{
  const begin=source.slice(source.indexOf('function begin(event)'),source.indexOf('function move(event)'));
  assert.ok(begin.includes('externalGeometrySnap(event,refs)'));
});
