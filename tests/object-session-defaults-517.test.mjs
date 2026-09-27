import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const retain=fs.readFileSync(new URL('../src/object-drawer-retain.js',import.meta.url),'utf8');
const revolve=fs.readFileSync(new URL('../src/revolve-profile.js',import.meta.url),'utf8');
const session=fs.readFileSync(new URL('../src/tool-session-ui.js',import.meta.url),'utf8');
const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('517 Objects drawer yields while a Tool Session is active',()=>{
  assert.match(retain,/__boxlabToolSession\?\.isActive\?\.\(\)/);
  assert.match(retain,/if \(globalThis\.__boxlabToolSession\?\.isActive\?\.\(\)\) return;/);
});

test('517 new Revolve Profile starts in Edit Profile',()=>{
  assert.match(revolve,/revolveProfile=\{version:VERSION,points:\[\],segments:24,edit:true,applied:false,pointHistory:\[\],selectedPoint:null,interacted:true/);
  assert.match(revolve,/beginRevolveSession\(\);/);
  assert.match(revolve,/Edit Profile active/);
});

test('517 Boolean enables authoritative Multi selection on open',()=>{
  assert.match(session,/const objectSelection=globalThis\.__boxlabObjectSelection/);
  assert.match(session,/if\(objectSelection&&!objectSelection\.multi\)/);
  assert.match(session,/objectSelection\.select\?\.\(\[\.\.\.\(objectSelection\.ids\|\|\[\]\)\]\)/);
});

test('517 cache-hops only Object-session owners and preserves protected runtimes',()=>{
  assert.match(drawer,/object-drawer-retain\.js\?v=0\.36\.18\.517/);
  assert.match(index,/src\/tool-session-ui\.js\?v=0\.36\.18\.517/);
  assert.match(index,/src\/revolve-profile\.js\?v=0\.36\.18\.517/);
  assert.match(index,/src\/drawer-ui\.js\?v=0\.36\.18\.517/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.501/);
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.516/);
  assert.match(index,/src\/component-slide\.js\?v=0\.36\.18\.514/);
  assert.match(index,/src\/edge-extrude\.js\?v=0\.36\.18\.514/);
  assert.match(index,/src\/sweep-path\.js\?v=0\.36\.18\.515/);
  assert.match(index,/src\/rotate-transform\.js\?v=0\.36\.18\.483/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
