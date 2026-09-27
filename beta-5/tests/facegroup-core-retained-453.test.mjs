import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('453 retains isolated facegroup colour core',()=>{
  assert.equal(fs.existsSync(new URL('../src/facegroup-colours-core.js',import.meta.url)),true);
});
