import {assertAssetReference,hasAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const ui=fs.readFileSync(new URL('../src/solidify.js',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8')).version;

test('Solidify drawer-lock wrapper uses its reviewed runtime cache pin',()=>{
  const wrapper=index.match(/solidify\.js\?v=([^"]+)/)?.[1];
  const stamp=index.match(/data-release-version="([^"]+)"/)?.[1];
  assertAssetReference(index,'solidify.js');
  assert.equal(stamp,version);
});

test('376 armed Solidify delegates drawer ownership to shared Tool Session',()=>{
  assert.match(ui,/toolSession\(\)\?\.begin\?\.\(\{id:'solidify'/);
  assert.match(ui,/toolSession\(\)\?\.end\?\.\('solidify'\)/);
  assert.ok(hasAssetReference(index,'tool-session-ui.js'));
});

test('376 Solidify reasserts its Tool Session while preview is armed',()=>{
  assert.match(ui,/if\(previewArmed&&!toolSession\(\)\?\.isActive\?\.\('solidify'\)\)beginSolidifySession\(\)/);
});

test('376 does not edit global drawer owner or hard-fold core pin',()=>{
  assertAssetReference(ui,'solidify-core.js');
  assertAssetReference(index,'drawer-ui.js');
});
