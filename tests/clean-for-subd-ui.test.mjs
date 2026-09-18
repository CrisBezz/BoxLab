import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const runtime=fs.readFileSync(new URL('../src/quad-clean.js',import.meta.url),'utf8');

test('295 Object Active Tools exposes Clean for SubD without adding another top-level cleanup button',()=>{
  assert.match(index,/<button id="quadCleanBtn" type="button">Clean for SubD<\/button>/);
  assert.equal((index.match(/id="quadCleanBtn"/g)||[]).length,1);
});

test('295 Clean for SubD keeps the existing Quad Clean engine and reports production before-after counts',()=>{
  assert.match(runtime,/quadCleanMesh/);
  assert.match(runtime,/workflow:'clean-for-subd'/);
  assert.match(runtime,/Clean for SubD/);
  assert.match(runtime,/faces \$\{result\.before\.faces\}→\$\{result\.after\.faces\}/);
});

test('316 Clean for SubD cache-hop is isolated from protected Selection styling',()=>{
  assert.match(index,/quad-clean\.js\?v=0\.36\.18\.316/);
  assert.match(index,/styles\.css\?v=0\.36\.18\.270/);
});


test('314 component multi-select initializes hidden toggle for component modes', async()=>{
  const fs=await import('node:fs/promises');
  const source=await fs.readFile(new URL('../src/component-multi-init.js',import.meta.url),'utf8');
  assert.match(source,/toggle\.checked=true/);
  assert.match(source,/dispatchEvent\(new Event\('change'/);
  assert.match(source,/mode==='object'/);
  assert.match(source,/querySelectorAll\('#selectionModes button'\)/);
});
