import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const source=fs.readFileSync(new URL('../src/sweep-path.js',import.meta.url),'utf8');

test('409 distinguishes candidate hot and accepted rail states',()=>{
  assert.ok(source.includes('color:0xe8f8ff'));
  assert.ok(source.includes('color:0xffc857'));
  assert.ok(source.includes('color:0x62d8ff'));
  assert.ok(source.includes('function hotRailOverlay(hit)'));
  assert.ok(source.includes('function acceptedPathOverlay(points)'));
});

test('409 hot edge uses the same Follow Edges picker',()=>{
  assert.ok(source.includes("const hit=externalEdgeSnap(event,railRefs())"));
  assert.ok(source.includes("const next=hit?.kind==='Edge'?hit:null"));
  assert.ok(source.includes('hotRailHit=next'));
});

test('409 hot edge updates only during PATH Follow Edges editing',()=>{
  assert.ok(source.includes("m?.sessionStage==='path'&&m.pathMode==='edges'&&m.editPath"));
});

test('409 hot state clears on stage or mode exit',()=>{
  assert.ok(source.includes("if(valid!=='path'){hotRailHit=null;railSnapRefs=null;}"));
  assert.ok(source.includes("if(mode!=='edges'){hotRailHit=null;railSnapRefs=null;}else railRefs(true)"));
  assert.ok(source.includes('disposeOverlay();hotRailHit=null;controls.hidden=true'));
});
