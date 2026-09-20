import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const release=fs.readFileSync(new URL('../src/release-version.js',import.meta.url),'utf8');
const transform=fs.readFileSync(new URL('../src/multi-object-transform.js',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8')).version;

test('release shell carries the current authoritative version stamp',()=>{
  const stamp=index.match(/data-release-version="([^"]+)"/)?.[1];
  const loader=index.match(/release-version\.js\?v=([^"]+)/)?.[1];
  assert.equal(stamp,version);
  assert.equal(loader,version);
});

test('release owner prefers shell version before legacy module UI stamps',()=>{
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
