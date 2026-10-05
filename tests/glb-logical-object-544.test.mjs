import {assertAssetReference,assertShellRelease} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const importer=fs.readFileSync(new URL('../src/import-mesh.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const beta5=fs.readFileSync(new URL('../beta-5/index.html',import.meta.url),'utf8');

test('544 GLB import uses Split objects by groups toggle',()=>{
  assert.match(importer,/importedMeshes\(gltf\.scene,\{splitByGroups:!!splitGroupsToggle\?\.checked\}\)/);
});

test('544 GLB importer groups sibling primitives into one logical object',()=>{
  assert.match(importer,/function logicalPrimitiveOwner\(/);
  assert.match(importer,/meshChildren\.length>1&&nonMeshChildren\.length===0/);
  assert.match(importer,/function mergeEditableMeshes\(/);
});

test('544 preserves primitive identity as facegroups',()=>{
  assert.match(importer,/fallbackGroupName/);
  assert.match(importer,/groupName:materialName/);
  assert.match(importer,/faceGroups\.push\(entry\.mesh\.faceGroups\?\.\[faceIndex\]\?\?entry\.groupName\?\?null\)/);
});

test('544 runtime pin and frozen Beta 5',()=>{
  assertAssetReference(index,'import-mesh.js');
  assertShellRelease(index);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.match(beta5,/data-release-version="0\.36\.18\.538"/);
});
