import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const release=fs.readFileSync(new URL('../src/release-version.js',import.meta.url),'utf8');
const transform=fs.readFileSync(new URL('../src/multi-object-transform.js',import.meta.url),'utf8');

test('373 shell carries authoritative release version stamp',()=>{
  assert.match(index,/data-release-version="0\.36\.18\.373"/);
  assert.match(index,/release-version\.js\?v=0\.36\.18\.373/);
});

test('373 release owner prefers shell version before legacy module UI stamps',()=>{
  assert.match(release,/label\?\.dataset\?\.releaseVersion/);
  assert.match(release,/SHELL_VERSION\|\|document\.title/);
  assert.match(release,/stamp\(SHELL_VERSION\|\|VERSION\)/);
  assert.match(release,/MutationObserver\(\(\)=>stamp\(\)\)/);
});

test('protected transform remains byte-era pinned and legacy stamp is contained rather than edited',()=>{
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.match(transform,/version\.textContent = 'v0\.36\.1\.0'/);
  assert.match(transform,/document\.title = 'BoxLab v0\.36\.1\.0'/);
});
