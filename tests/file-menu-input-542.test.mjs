import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const topbar=fs.readFileSync(new URL('../src/topbar-layout.js',import.meta.url),'utf8');
const beta5=fs.readFileSync(new URL('../beta-5/index.html',import.meta.url),'utf8');

test('542 File menu does not close when editing form controls',()=>{
  assert.match(topbar,/const editable=event\.target\?\.closest\?\('#fileMenu input,#fileMenu textarea,#fileMenu select/);
  assert.match(topbar,/if\(editable\)return;/);
  assert.doesNotMatch(topbar,/#fileMenu button,#fileMenu input,#fileMenu label/);
});

test('542 File menu still closes after button actions',()=>{
  assert.match(topbar,/const action=event\.target\?\.closest\?\('#fileMenu button'\)/);
  assert.match(topbar,/if\(action\)queueMicrotask/);
});

test('542 runtime pins updated and Beta 5 protected',()=>{
  assert.match(index,/src\/topbar-layout\.js\?v=0\.36\.18\.542/);
  assert.match(index,/src\/export-as-panel\.js\?v=0\.36\.18\.542/);
  assert.match(index,/data-release-version="0\.36\.18\.542"/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.match(beta5,/data-release-version="0\.36\.18\.538"/);
});
