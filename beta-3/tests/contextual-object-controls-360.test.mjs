import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('360 Object UI exposes single versus multi selection context without touching transform logic',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  assert.match(src,/multiContext=chosen\.length>1\|\|wholeGroupId!=null/);
  assert.match(src,/classList\.toggle\('boxlab-object-multi-context',multiContext\)/);
  assert.match(src,/classList\.toggle\('boxlab-object-single-context',!multiContext\)/);
});

test('360 Origin is single-context and Pivot is multi-context',()=>{
  const src=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  assert.match(src,/\.boxlab-object-multi-context #objectOriginTools\{display:none!important\}/);
  assert.match(src,/\.boxlab-object-single-context #objectPivotTools\{display:none!important\}/);
  assert.match(src,/#objectOriginTools\{grid-template-columns:40px repeat\(3,minmax\(0,1fr\)\)!important\}/);
  assert.match(src,/#objectPivotTools\{grid-template-columns:40px repeat\(4,minmax\(0,1fr\)\)!important\}/);
});

test('360 Object Selection toolbar is compact five-column strip',()=>{
  const src=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  assert.match(src,/#selectionDrawer #objectManagementTools\{grid-template-columns:repeat\(5,minmax\(0,1fr\)\)!important;gap:3px!important/);
  assert.match(src,/#selectionDrawer #objectManagementTools button\{min-height:30px!important/);
  assert.match(src,/\.object-management-count\{font-size:10px!important/);
});

test('360 protected Group transform baseline remains exact',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  assert.match(index,/object-management\.js\?v=0\.36\.18\.368/);
  assert.match(index,/drawer-ui\.js\?v=0\.36\.18\.361/);
  assert.match(drawer,/object-management\.js\?v=0\.36\.18\.368/);
  assert.match(drawer,/object-origin\.js\?v=0\.36\.18\.355/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
