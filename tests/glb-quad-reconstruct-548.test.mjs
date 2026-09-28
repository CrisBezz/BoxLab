import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const importer=fs.readFileSync(new URL('../src/import-mesh.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const beta5=fs.readFileSync(new URL('../beta-5/index.html',import.meta.url),'utf8');

test('548 GLB import reconstructs only safe same-facegroup triangle pairs',()=>{
  assert.match(importer,/import \{ evaluateTrianglePair \} from '\.\/quad-clean-core\.js\?v=0\.36\.18\.323';/);
  assert.match(importer,/function reconstructImportedQuads\(/);
  assert.match(importer,/if\(!groupA\|\|groupA!==groupB\)continue;/);
  assert.match(importer,/evaluated\.normalDot<0\.9995/);
});

test('548 only GLB/GLTF path requests reconstruction',()=>{
  assert.match(importer,/addImported\(meshes,fileBaseName\(file\),\{reconstructQuads:true\}\)/);
  assert.match(importer,/addImported\(meshes,fileBaseName\(file\)\);/);
});

test('548 import status reports reconstructed quads',()=>{
  assert.match(importer,/reconstructedQuads/);
  assert.match(importer,/quad\$\{reconstructedQuads===1\?'':'s'\} reconstructed/);
});

test('548 runtime pin current and Beta 5 protected',()=>{
  assert.match(index,/src\/import-mesh\.js\?v=0\.36\.18\.548/);
  assert.match(index,/data-release-version="0\.36\.18\.548"/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.match(beta5,/data-release-version="0\.36\.18\.538"/);
});
