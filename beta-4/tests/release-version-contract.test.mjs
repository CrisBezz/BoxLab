import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const source=fs.readFileSync(new URL('../src/release-version.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('visible release version is not pinned to Beta 2',()=>{
  assert.equal(source.includes("const VERSION='0.36.18.242'"),false);
  assert.match(source,/version\.json/);
  assert.match(source,/cache:'no-store'/);
});

test('release-version module remains the final visible version owner',()=>{
  assert.match(index,/src\/release-version\.js\?v=/);
});
