import {assertAssetReference,assertModuleStamp} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const ui=fs.readFileSync(new URL('../src/revolve-profile.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8')).version;

test('Revolve Active Tools runtime uses its reviewed runtime cache pin',()=>{
  const wrapper=index.match(/revolve-profile\.js\?v=([^"]+)/)?.[1];
  assertAssetReference(index,'revolve-profile.js');
  assertModuleStamp(ui,'revolve-profile.js');
});

test('391 construction transform claims Active Tools',()=>{
  assert.match(ui,/initialPlaneSignature/);
  assert.match(ui,/currentPlaneSignature!==meta\.initialPlaneSignature/);
  assert.match(ui,/claimRevolveTools\(meta\)/);
});

test('391 construction interaction still claims persistent Active Tools ownership through shared Tool Session',()=>{
  assert.match(ui,/toolSession\(\)\?\.begin\?\.\(\{id:'revolve-profile'/);
  assert.match(ui,/toolSession\(\)\?\.isActive\?\.\('revolve-profile'\)/);
  assert.match(ui,/endRevolveSession/);
});

test('391 Edit Profile opens Revolve tools immediately',()=>{
  assert.match(ui,/if\(meta\.edit\)claimRevolveTools\(meta\)/);
});

test('391 Apply releases Active Tools ownership',()=>{
  const apply=ui.slice(ui.indexOf('function applyRevolve'),ui.indexOf('function installPenRange'));
  assert.match(apply,/endRevolveSession\(\)/);
});
