import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const solid=fs.readFileSync(new URL('../src/solidify.js',import.meta.url),'utf8');

test('381 Solidify preview visibility runtime is loaded',()=>{
  assert.match(index,/solidify\.js\?v=0\.36\.18\.381/);
  assert.match(index,/data-release-version="0\.36\.18\.381"/);
});

test('381 Solidify preview uses filled DoubleSide layer plus wire overlay',()=>{
  assert.match(solid,/fillMaterial=new THREE\.MeshBasicMaterial/);
  assert.match(solid,/wireMaterial=new THREE\.MeshBasicMaterial/);
  assert.match(solid,/side:THREE\.DoubleSide/);
  assert.match(solid,/wireframe:true/);
  assert.match(solid,/preview=new THREE\.Group\(\)/);
  assert.match(solid,/preview\.add\(fill,wire\)/);
});

test('381 Solidify preview stays visible through source sheet',()=>{
  const start=solid.indexOf('const fillMaterial');
  const end=solid.indexOf('preview.userData.boxlabSolidifyPreview=true');
  const block=solid.slice(start,end);
  assert.match(block,/depthTest:false/);
  assert.match(block,/depthWrite:false/);
  assert.match(block,/opacity:\.18/);
  assert.match(block,/opacity:\.72/);
});

test('381 direct Solidify drag still ray-picks grouped preview correctly',()=>{
  assert.match(solid,/intersectObject\(preview,true\)/);
  assert.match(solid,/hit\.object\?\.matrixWorld\|\|preview\.matrixWorld/);
});

test('381 grouped Solidify preview disposes child resources safely',()=>{
  assert.match(solid,/preview\.traverse\?\.\(node=>/);
  assert.match(solid,/const geometries=new Set\(\),materials=new Set\(\)/);
});
