import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('453 recovery has no Facegroups render-look button',()=>{
  const s=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');
  assert.equal(s.includes('data-render="facegroups"'),false);
});
