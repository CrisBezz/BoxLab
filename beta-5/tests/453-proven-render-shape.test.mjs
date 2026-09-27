import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
test('453 render runtime is proven shape',()=>{const s=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');assert.ok(s.length>8000);assert.ok(s.includes("host.innerHTML='<button type=\"button\" data-render=\"studio\""));});
