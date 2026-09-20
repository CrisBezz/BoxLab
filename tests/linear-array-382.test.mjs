import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const ui=fs.readFileSync(new URL('../src/linear-array.js',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8')).version;

test('Linear Array runtime follows current app build',()=>{
  const wrapper=index.match(/linear-array\.js\?v=([^"]+)/)?.[1];
  const stamp=index.match(/data-release-version="([^"]+)"/)?.[1];
  assert.equal(wrapper,version);
  assert.equal(stamp,version);
});

test('382 Array is a linked-instance Object Manager client',()=>{
  assert.match(ui,/linkedDuplicateObject\?\.\(sourceId/);
  assert.match(ui,/m\.saveActive\?\.\(\)/);
  assert.match(ui,/m\.activate\?\.\(sourceId\)/);
  assert.doesNotMatch(ui,/multi-object-transform/);
});

test('382 Array has Count Spacing X Y Z and non-destructive preview',()=>{
  assert.match(ui,/linearArrayCount/);
  assert.match(ui,/linearArraySpacing/);
  assert.match(ui,/data-array-axis="x"/);
  assert.match(ui,/data-array-axis="y"/);
  assert.match(ui,/data-array-axis="z"/);
  assert.match(ui,/Apply Array/);
  assert.match(ui,/BoxLab Linear Array Preview/);
});

test('382 Array Apply owns one scene snapshot and keeps source active',()=>{
  assert.match(ui,/__boxlabObjectHistory\?\.capture\?\.\(\)/);
  assert.match(ui,/checkpointSnapshot\?\.\(before\)/);
  assert.match(ui,/m\.activate\?\.\(sourceId\)/);
});

test('382 Array Pencil ranges own pen input and guard late native events',()=>{
  assert.match(ui,/function installPenRange/);
  assert.match(ui,/event\.pointerType!=='pen'/);
  assert.match(ui,/setPointerCapture/);
  assert.match(ui,/requestAnimationFrame/);
});
