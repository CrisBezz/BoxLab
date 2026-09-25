import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
test('453 retains render mode change event',()=>{const s=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');assert.ok(s.includes('boxlab-render-mode-change'));});
