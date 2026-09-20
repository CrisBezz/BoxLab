import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('351 Object management owns Group and Ungroup mutations',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  assert.match(src,/function groupSelection\(/);
  assert.match(src,/function ungroupSelection\(/);
  assert.match(src,/__boxlabObjectGroups=\{groupSelection,ungroupSelection/);
  assert.match(src,/for\(const o of chosen\)o\.groupId=groupId/);
  assert.match(src,/updateUI\(\);setStatus\(/);
});

test('351 legacy object-origin delegates instead of stamping G tags',()=>{
  const src=fs.readFileSync(new URL('../src/object-origin.js',import.meta.url),'utf8');
  assert.match(src,/__boxlabObjectGroups\?\.groupSelection\?\.\(ids\)/);
  assert.match(src,/__boxlabObjectGroups\?\.ungroupSelection\?\.\(ids\)/);
  assert.doesNotMatch(src,/tag\.textContent = `G\$\{object\.groupId\}`/);
  assert.match(src,/querySelectorAll\('\.boxlab-group-tag'\)\.forEach\(tag=>tag\.remove\(\)\)/);
});

test('351 Group button no longer depends on outliner mutation to trigger hierarchy',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  const group=src.slice(src.indexOf('function groupSelection'),src.indexOf('function ungroupSelection'));
  assert.match(group,/updateUI\(\)/);
  assert.match(group,/checkpoint\?\.\(\)/);
});

test('351 ordinary two-object selection no longer gets automatic Boolean A B takeover',()=>{
  const src=fs.readFileSync(new URL('../src/boolean-ux-history.js',import.meta.url),'utf8');
  const sync=src.slice(src.indexOf('function syncUI'),src.indexOf('function queueSelectionSync'));
  assert.match(sync,/markOutliner\(\{ok:false\}\)/);
  assert.match(src,/function syncSelectionColours\(\)\{\s*restoreViewportMaterials\(\)/s);
  assert.match(sync,/keepBooleanToolsVisible\(!!e\.ok\)/);
  assert.match(sync,/syncSelectionColours\(\)/);
});

test('351 cache chain and protected transform pin remain intact',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  assert.match(index,/object-management\.js\?v=0\.36\.18\.368/);
  assert.match(index,/drawer-ui\.js\?v=0\.36\.18\.361/);
  assert.match(index,/boolean-ux-history\.js\?v=0\.36\.18\.369/);
  assert.match(drawer,/object-origin\.js\?v=0\.36\.18\.355/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
