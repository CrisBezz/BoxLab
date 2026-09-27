import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
test('453 render runtime does not import 452 facegroup wiring',()=>{const s=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');assert.equal(s.includes('v=0.36.18.452'),false);});
