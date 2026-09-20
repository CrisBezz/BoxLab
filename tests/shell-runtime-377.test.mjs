import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const shell=fs.readFileSync(new URL('../src/shell.js',import.meta.url),'utf8');
const core=fs.readFileSync(new URL('../src/shell-core.js',import.meta.url),'utf8');

test('377 Shell runtime is loaded and versioned',()=>{
  assert.match(index,/shell\.js\?v=0\.36\.18\.377/);
  assert.match(index,/data-release-version="0\.36\.18\.377"/);
});

test('377 Shell reuses Face selection bridge and shared Solidify core',()=>{
  assert.match(shell,/__boxlabSelectionBridge/);
  assert.match(shell,/b\.indices\?\.\(\)/);
  assert.match(core,/solidifyOpenMesh/);
  assert.match(core,/solidify-core\.js\?v=0\.36\.18\.374/);
});

test('377 Shell preview is apply-gated and keeps Active Tools open',()=>{
  assert.match(shell,/button\.textContent='Apply Shell'/);
  assert.match(shell,/activeToolsDrawer\.dataset\.keepOpen='true'/);
  assert.match(shell,/previewArmed/);
});

test('377 Shell commit uses Object scene history and Object Manager save',()=>{
  assert.match(shell,/__boxlabObjectHistory\?\.checkpoint\?\.\(\)/);
  assert.match(shell,/manager\(\)\?\.saveActive\?\.\(\)/);
  assert.match(shell,/bridge\(\)\?\.set\?\.\('face',\[\]\)/);
});
