import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const bootstrap=fs.readFileSync(new URL('../src/release-bootstrap.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

test('521 HTML shell is stamped with the current release',()=>{
  assert.match(index,/<title>BoxLab v0\.36\.18\.521<\/title>/);
  assert.match(index,/data-release-version="0\.36\.18\.521">v0\.36\.18\.521/);
  assert.equal(version.version,'0.36.18.521');
});

test('521 release bootstrap and release-version use fresh cache keys',()=>{
  assert.match(index,/src\/release-bootstrap\.js\?v=0\.36\.18\.521/);
  assert.match(index,/src\/release-version\.js\?v=0\.36\.18\.521/);
});

test('521 stale shell can retry even when build query already matches latest',()=>{
  assert.doesNotMatch(bootstrap,/target\.searchParams\.get\('build'\) === latest\) return/);
  assert.match(bootstrap,/boxlab-refresh-attempts/);
  assert.match(bootstrap,/attempts >= 3/);
  assert.match(bootstrap,/target\.searchParams\.set\('_reload', String\(Date\.now\(\)\)\)/);
});
