import {assertAssetReference} from './helpers/release-contract.mjs';
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
  assertAssetReference(drawer,'object-drawer-retain.js');
  assertAssetReference(index,'tool-session-ui.js');
  assertAssetReference(index,'revolve-profile.js');
  assertAssetReference(index,'drawer-ui.js');
  assertAssetReference(index,'main.js');
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'component-slide.js');
  assertAssetReference(index,'edge-extrude.js');
  assertAssetReference(index,'sweep-path.js');
  assertAssetReference(index,'rotate-transform.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
