import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('453 version marker',()=>{
  const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));
  assert.equal(version.version,'0.36.18.453');
});
