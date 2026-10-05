// Historical .453 recovery fixture; current main has accepted Facegroup support.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
test('453 dormant colour core remains separate',()=>{const r=fs.readFileSync(new URL('./fixtures/recovery-453/render-modes.js',import.meta.url),'utf8');const c=fs.readFileSync(new URL('./fixtures/recovery-453/facegroup-colours-core.js',import.meta.url),'utf8');assert.ok(c.includes('applyFaceGroupColours'));assert.ok(!r.includes('applyFaceGroupColours'));});
