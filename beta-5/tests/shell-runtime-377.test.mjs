import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const shell=fs.readFileSync(new URL('../src/shell.js',import.meta.url),'utf8');
const core=fs.readFileSync(new URL('../src/shell-core.js',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8')).version;

test('Shell wrapper follows current app build',()=>{
  const wrapper=index.match(/shell\.js\?v=([^"]+)/)?.[1];
  const stamp=index.match(/data-release-version="([^"]+)"/)?.[1];
  assert.equal(wrapper,version);
  assert.equal(stamp,version);
});

test('377 Shell reuses Face selection bridge and shared Solidify core',()=>{
  assert.match(shell,/__boxlabSelectionBridge/);
  assert.match(shell,/b\.indices\?\.\(\)/);
  assert.match(core,/solidifyOpenMesh/);
  assert.match(core,/solidify-core\.js\?v=0\.36\.18\.374/);
});

test('377 Shell preview remains apply-gated and now delegates Active Tools ownership to Tool Session',()=>{
  assert.match(shell,/shellApplyBtn/);
  assert.match(shell,/toolSession\(\)\?\.begin\?\.\(\{id:'shell'/);
  assert.match(shell,/toolSession\(\)\?\.end\?\.\('shell'\)/);
  assert.match(shell,/previewArmed/);
});

test('377 Shell commit uses Object scene history and Object Manager save',()=>{
  assert.match(shell,/__boxlabObjectHistory\?\.checkpoint\?\.\(\)/);
  assert.match(shell,/manager\(\)\?\.saveActive\?\.\(\)/);
  assert.match(shell,/bridge\(\)\?\.set\?\.\('face',\[\]\)/);
});
