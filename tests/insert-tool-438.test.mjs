import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const ui=fs.readFileSync(new URL('../src/insert-tool.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('438 Insert shares the Transform surface-frame engine and tap cycle',()=>{
  assert.match(ui,/surfaceTransformMesh/);
  assert.match(ui,/cycleSurfaceTransformMode\(mode\)/);
  assert.match(ui,/sourceAnchor:sourceFace\?\.center\|\|sourceCenter/);
  assert.match(ui,/sourceNormal:sourceFace\?\.normal/);
  assert.match(ui,/oppose:true/);
  assert.match(ui,/event\.pointerType==='touch'/);
});

test('438 Insert creates a linked duplicate only after source and target faces are chosen',()=>{
  assert.match(ui,/phase='source'/);
  assert.match(ui,/phase='target'/);
  assert.match(ui,/linkedDuplicateObject\?\.\(sourceObjectId/);
  assert.match(ui,/insertedObjectId=copy\.id;target=hit;phase='placed'/);
  assert.match(ui,/name:m\.nextDuplicateName\?\.\(sourceObject\.name\)/);
});

test('438 Insert is transactional and preserves linked placement ownership',()=>{
  assert.match(ui,/beforeScene=globalThis\.__boxlabObjectHistory\?\.capture/);
  assert.match(ui,/history\?\.restore\?\.\(beforeScene\)/);
  assert.match(ui,/checkpointSnapshot\?\.\(beforeScene\)/);
  assert.match(ui,/manager\(\)\?\.saveActive\?\.\(\)/);
  assert.doesNotMatch(ui,/multi-object-transform\.js/);
});

test('438 shell loads Insert beside Transform and Beta 4 stays frozen',()=>{
  const beta4=JSON.parse(fs.readFileSync(new URL('../beta-4/version.json',import.meta.url),'utf8'));
  assert.match(index,/src\/surface-transform\.js\?v=0\.36\.18\.441/);
  assert.match(index,/src\/insert-tool\.js\?v=0\.36\.18\.441/);
  assert.equal(beta4.version,'0.36.18.427');
});
