import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
test('453 final runtime guard',()=>{const s=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');assert.ok(s.includes("let mode='studio'"));assert.ok(!s.includes('facegroupMaterial'));});
