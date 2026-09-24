import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('452 transform yields to Face, Edge Bevel, Vertex Bevel and Edge Revolve',()=>{
  const src=fs.readFileSync(new URL('../src/transform-upgrade.js',import.meta.url),'utf8');
  assert.match(src,/function directFaceToolActive\(\).*#extrudeBtn\.active,#insetBtn\.active/s);
  assert.match(src,/function directComponentToolActive\(\).*#bevelBtn\.active,#vertexBevelBtn\.active/s);
  assert.match(src,/__boxlabRevolve\?\.active/);
  assert.match(src,/startGesture\(event\).*directFaceToolActive\(\).*directComponentToolActive\(\)/s);
});

test('452 Edge Revolve launcher calls authoritative arm API',()=>{
  const revolve=fs.readFileSync(new URL('../src/revolve.js',import.meta.url),'utf8');
  const ui=fs.readFileSync(new URL('../src/ui-presentation-451.js',import.meta.url),'utf8');
  assert.match(revolve,/function armRevolve\(\)/);
  assert.match(revolve,/__boxlabTransformArming\?\.disarm\?\.\(\)/);
  assert.match(revolve,/arm:armRevolve/);
  assert.match(ui,/__boxlabRevolve\?\.arm\?\.\(\)/);
  assert.doesNotMatch(ui,/source\.click\(\)/);
});

test('452 Boolean stores exactly one pre-operation scene snapshot after successful commit',()=>{
  const src=fs.readFileSync(new URL('../src/boolean-prototype.js',import.meta.url),'utf8');
  assert.match(src,/const beforeScene=globalThis\.__boxlabObjectHistory\?\.capture\?\.\(\)\|\|null/);
  assert.match(src,/if\(beforeScene\)globalThis\.__boxlabObjectHistory\?\.checkpointSnapshot\?\.\(beforeScene\)/);
  assert.doesNotMatch(src,/__boxlabObjectHistory\?\.checkpoint\?\.\(\)/);
  const capture=src.indexOf('const beforeScene=');
  const add=src.indexOf('addMesh?.(result.mesh');
  const checkpoint=src.indexOf('checkpointSnapshot?.(beforeScene)');
  assert.ok(capture>=0&&add>capture&&checkpoint>add);
});

test('452 protected modelling cores remain pinned while changed ownership modules advance',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  assert.match(index,/multi-face-direct\.js\?v=0\.36\.18\.242/);
  assert.match(index,/direct-bevel\.js\?v=0\.36\.18\.253/);
  assert.match(index,/direct-multi-vertex-bevel\.js\?v=0\.30\.1/);
  assert.match(index,/transform-upgrade\.js\?v=0\.36\.18\.452/);
  assert.match(index,/revolve\.js\?v=0\.36\.18\.452/);
  assert.match(index,/boolean-prototype\.js\?v=0\.36\.18\.452/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
