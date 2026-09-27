import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('345 interaction guard disables native selection and touch callout on app surface',()=>{
  const src=fs.readFileSync(new URL('../src/app-interaction-guard.js',import.meta.url),'utf8');
  assert.match(src,/-webkit-user-select:none/);
  assert.match(src,/user-select:none/);
  assert.match(src,/-webkit-touch-callout:none/);
  assert.match(src,/document\.addEventListener\('selectstart'/);
  assert.match(src,/document\.addEventListener\('dragstart'/);
});

test('345 editable controls remain selectable',()=>{
  const src=fs.readFileSync(new URL('../src/app-interaction-guard.js',import.meta.url),'utf8');
  assert.match(src,/input,textarea,select/);
  assert.match(src,/contenteditable/);
  assert.match(src,/data-allow-selection/);
  assert.match(src,/-webkit-user-select:text/);
  assert.match(src,/if\(editableTarget\(event\.target\)\)return/);
});

test('345 interaction guard loads once from index and leaves gesture modules untouched',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  assert.equal((index.match(/app-interaction-guard\.js\?v=0\.36\.18\.345/g)||[]).length,1);
  assert.match(index,/pencil-orbit-gate\.js\?v=0\.32\.35/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
