import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
test('453 facegroup colour core remains dormant',()=>{const s=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');assert.doesNotMatch(s,/applyFaceGroupColours/);});
