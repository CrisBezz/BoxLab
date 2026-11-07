import {assertAssetReference,assertShellRelease} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const importer=fs.readFileSync(new URL('../src/import-mesh.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const beta5=fs.readFileSync(new URL('../beta-5/index.html',import.meta.url),'utf8');

test('546 importer has valid facegroup fallback template syntax',()=>{
  assert.match(importer,/\|\| `FaceGroup \$\{primitiveIndex\}`;/);
  assert.doesNotMatch(importer,/\\`FaceGroup \\$\{primitiveIndex\}\\`/);
});

test('546 import controls are still wired in importer module',()=>{
  assert.match(importer,/kindButtons\.forEach\(item=>item\.addEventListener\('click'/);
  assert.match(importer,/button\?\.addEventListener\('click',\(\)=>input\?\.click\(\)\)/);
});

test('546 runtime pin current and Beta 5 protected',()=>{
  assertAssetReference(index,'import-mesh.js');
  assertShellRelease(index);
  assert.match(beta5,/data-release-version="0\.36\.18\.538"/);
});
