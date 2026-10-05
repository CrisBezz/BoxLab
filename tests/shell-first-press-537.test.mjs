import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const shell=fs.readFileSync(new URL('../src/shell.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('537 Shell launches on touch or Pencil pointerdown before layout pointerup',()=>{
  assert.match(shell,/button\?\.addEventListener\('pointerdown'/);
  assert.match(shell,/if\(event\.pointerType==='mouse'\|\|button\.disabled\|\|previewArmed\)return/);
  assert.match(shell,/launchShell\(\)/);
});

test('537 mouse and keyboard click path remains available',()=>{
  assert.match(shell,/button\?\.addEventListener\('click'/);
  assert.match(shell,/event\.preventDefault\(\)/);
});

test('537 Shell geometry path unchanged',()=>{
  assert.match(shell,/analyzeShellInput\(live,ids\)/);
  assert.match(shell,/beginShellSession\(\)/);
  assert.match(shell,/buildPreview\(\)/);
  assert.match(shell,/shellClosedMesh\(live,previewFaces,thickness\(\)\)/);
});

test('537 runtime pin current and protected transform unchanged',()=>{
  assertAssetReference(index,'shell.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
