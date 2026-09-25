import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8')).version;

test('464 public shell and manifest identify the same build',()=>{
  assert.equal(version,'0.36.18.465');
  assert.match(index,/BoxLab v0\.36\.18\.465/);
  assert.match(index,/data-release-version="0\.36\.18\.465"/);
});

test('464 loads inward Extrude/Through takeover explicitly',()=>{
  const faceAt=index.indexOf('multi-face-direct.js?v=0.36.18.242');
  const throughAt=index.indexOf('sequential-through-fallback.js?v=0.36.18.465');
  assert.ok(faceAt>=0&&throughAt>faceAt);
  assert.match(drawer,/sequential-through-fallback\.js\?v=0\.36\.18\.465/);
});

test('464 keeps protected Through kernel and transform pins',()=>{
  assert.match(index,/multi-face-direct\.js\?v=0\.36\.18\.242/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
