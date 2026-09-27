import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const beta5=fs.readFileSync(new URL('../beta-5/index.html',import.meta.url),'utf8');
const panel=fs.readFileSync(new URL('../src/export-as-panel.js',import.meta.url),'utf8');

test('539 Export As panel exposes filename, OBJ/GLB and Base/SubD',()=>{
  assert.match(index,/id="exportFileName"/);
  assert.match(index,/data-export-format="obj"/);
  assert.match(index,/data-export-format="glb"/);
  assert.match(index,/data-export-geometry="base"/);
  assert.match(index,/data-export-geometry="subd"/);
  assert.match(index,/id="exportAsBtn"/);
});

test('539 GLB preserves separate named BoxLab objects',()=>{
  assert.match(panel,/root\.add\(node\)/);
  assert.match(panel,/node\.name=safeOBJName/);
  assert.match(panel,/GLTFExporter/);
});

test('539 save path supports native picker, iPad share sheet and download fallback',()=>{
  assert.match(panel,/showSaveFilePicker/);
  assert.match(panel,/navigator\.share/);
  assert.match(panel,/downloadBlob/);
});

test('539 leaves Beta 5 frozen and protected transform pinned',()=>{
  assert.match(beta5,/data-release-version="0\.36\.18\.538"/);
  assert.doesNotMatch(beta5,/export-as-panel\.js/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
