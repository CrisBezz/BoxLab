import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const exporter=fs.readFileSync(new URL('../src/export-as-panel.js',import.meta.url),'utf8');
const css=fs.readFileSync(new URL('../styles.css',import.meta.url),'utf8');
const beta5=fs.readFileSync(new URL('../beta-5/index.html',import.meta.url),'utf8');

test('541 busts stale stylesheet cache',()=>{
  assert.match(index,/styles\.css\?v=0\.36\.18\.541/);
  assert.doesNotMatch(index,/styles\.css\?v=0\.36\.18\.270/);
});

test('541 File Name explicitly focuses on touch and restores touch mode on blur',()=>{
  assert.match(exporter,/function focusFileName\(\)/);
  assert.match(exporter,/nameInput\?\.addEventListener\('pointerdown'/);
  assert.match(exporter,/nameInput\?\.addEventListener\('focus',\(\)=>setEditingTouchMode\(true\)\)/);
  assert.match(exporter,/nameInput\?\.addEventListener\('blur',\(\)=>setEditingTouchMode\(false\)\)/);
});

test('541 editable input overrides interaction guard CSS',()=>{
  assert.match(css,/#exportFileName\{touch-action:auto!important/);
  assert.match(css,/-webkit-user-select:text!important/);
});

test('541 protects Beta 5 and transform pin',()=>{
  assert.match(beta5,/data-release-version="0\.36\.18\.538"/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
