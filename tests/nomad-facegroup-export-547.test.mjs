import {assertAssetReference,assertShellRelease} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const exporter=fs.readFileSync(new URL('../src/export-as-panel.js',import.meta.url),'utf8');
const colours=fs.readFileSync(new URL('../src/facegroup-colours-core.js',import.meta.url),'utf8');
const renderModes=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');
const beta5=fs.readFileSync(new URL('../beta-5/index.html',import.meta.url),'utf8');

test('547 facegroup display palette deliberately spaces group hues',()=>{
  assert.match(colours,/index\*\.618033988749895/);
  assert.match(colours,/function spacedFaceGroupColours\(/);
  assertAssetReference(renderModes,'facegroup-colours-core.js');
});

test('547 GLB uses one shared material across facegroup primitives',()=>{
  assert.match(exporter,/function sharedNomadMaterial\(/);
  assert.match(exporter,/const materials=built\.groups\.map\(\(\)=>sharedMaterial\)/);
});

test('547 patches Nomad group table and primitive group ids into GLB',()=>{
  assert.match(exporter,/function patchNomadFaceGroupGLB\(/);
  assert.match(exporter,/groups:names\.map/);
  assert.match(exporter,/primitive\.extras\.nomad=.*group:index/);
  assert.match(exporter,/buffer=patchNomadFaceGroupGLB\(buffer,objectDetails\)/);
});

test('547 runtime pins current and frozen Beta 5 remains untouched',()=>{
  assertAssetReference(index,'export-as-panel.js');
  assertAssetReference(index,'render-modes.js');
  assertShellRelease(index);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.match(beta5,/data-release-version="0\.36\.18\.538"/);
});
