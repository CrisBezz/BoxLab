import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const revolve=fs.readFileSync(new URL('../src/revolve-profile.js',import.meta.url),'utf8');
const objectManagement=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('392 runtime is current',()=>{
  assert.match(index,/revolve-profile\.js\?v=0\.36\.18\.392/);
  assert.match(revolve,/const VERSION='0\.36\.18\.392'/);
  assert.match(drawer,/object-management\.js\?v=0\.36\.18\.392/);
});

test('392 object selection exposes authoritative single-selection reset',()=>{
  assert.match(objectManagement,/single\(id=activeId\(\)\)\{multiEnabled=false;selectedIds=new Set\(id==null\?\[\]:\[id\]\);updateUI\(\);\}/);
});

test('392 Revolve Apply resets selection to active result and resyncs Boolean tint',()=>{
  const apply=revolve.slice(revolve.indexOf('function applyRevolve'),revolve.indexOf('function installPenRange'));
  assert.match(apply,/__boxlabObjectSelection\?\.single\?\.\(object\.id\)/);
  assert.match(apply,/__boxlabBooleanUX\?\.sync\?\.\(\)/);
  assert.ok(apply.indexOf('saveActive')<apply.indexOf('__boxlabObjectSelection'));
});

test('392 does not special-case Boolean colours in Revolve',()=>{
  assert.doesNotMatch(revolve,/0xf3b34a|0x5da9ff|objectSelectionTint/);
});
