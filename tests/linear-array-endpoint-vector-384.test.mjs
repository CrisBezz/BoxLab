import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const ui=fs.readFileSync(new URL('../src/linear-array.js',import.meta.url),'utf8');

test('384 endpoint-vector Array runtime is loaded',()=>{
  assert.match(index,/linear-array\.js\?v=0\.36\.18\.384/);
  assert.match(index,/data-release-version="0\.36\.18\.384"/);
});

test('384 starts with source plus one END copy and no spacing slider',()=>{
  assert.match(ui,/linearArrayCount[^]*value="2"/);
  assert.doesNotMatch(ui,/linearArraySpacing/);
  assert.match(ui,/arrayEndpoint=isEndpoint/);
});

test('384 supports Free X Y Z endpoint movement',()=>{
  assert.match(ui,/data-array-move="free"/);
  assert.match(ui,/data-array-move="x"/);
  assert.match(ui,/data-array-move="y"/);
  assert.match(ui,/data-array-move="z"/);
  assert.match(ui,/worldPointOnViewPlane/);
  assert.match(ui,/screenAxis/);
});

test('384 distributes preview and committed instances evenly over endpoint vector',()=>{
  assert.match(ui,/const t=i\/\(total-1\)/);
  assert.match(ui,/endpoint\.clone\(\)\.multiplyScalar\(t\)/);
  assert.match(ui,/endpoint\.clone\(\)\.multiplyScalar\(i\/\(total-1\)\)/);
});

test('384 Apply remains linked and one scene-history step',()=>{
  assert.match(ui,/linkedDuplicateObject\?\.\(sourceId/);
  assert.match(ui,/__boxlabObjectHistory\?\.capture\?\.\(\)/);
  assert.match(ui,/checkpointSnapshot\?\.\(before\)/);
  assert.match(ui,/m\.activate\?\.\(sourceId\)/);
});
