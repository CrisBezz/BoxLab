import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const topbar=fs.readFileSync(new URL('../src/topbar-layout.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const beta5=fs.readFileSync(new URL('../beta-5/index.html',import.meta.url),'utf8');

test('545 configuration controls do not auto-close File menu',()=>{
  assert.doesNotMatch(topbar,/closest\?\('#fileMenu button'\)/);
  assert.match(topbar,/#importMeshBtn,#exportAsBtn,#exportBaseBtn,#exportSubdBtn,#installAppBtn,#resetBtn/);
  assert.doesNotMatch(topbar,/data-export-format|data-export-geometry|data-import-kind/);
});

test('545 editable controls remain exempt from auto-close',()=>{
  assert.match(topbar,/#fileMenu input,#fileMenu textarea,#fileMenu select/);
  assert.match(topbar,/if\(editable\)return;/);
});

test('545 runtime pin current and Beta 5 protected',()=>{
  assert.match(index,/src\/topbar-layout\.js\?v=0\.36\.18\.545/);
  assert.match(index,/data-release-version="0\.36\.18\.545"/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.match(beta5,/data-release-version="0\.36\.18\.538"/);
});
