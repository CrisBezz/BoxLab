// Historical .453 recovery fixture; current main has accepted Facegroup support.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
test('453 excludes rejected sourceMeshForBody helper',()=>{const s=fs.readFileSync(new URL('./fixtures/recovery-453/render-modes.js',import.meta.url),'utf8');assert.equal(s.includes('sourceMeshForBody'),false);});
