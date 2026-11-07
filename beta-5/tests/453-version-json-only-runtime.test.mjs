import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
test('453 is recovery runtime with dormant facegroup core',()=>{const m=JSON.parse(fs.readFileSync(new URL('../recovery-453.json',import.meta.url),'utf8'));assert.equal(m.restores,'0.36.18.451-render-runtime');});
