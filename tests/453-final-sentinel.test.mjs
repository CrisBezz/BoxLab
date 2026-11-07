import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
test('453 recovery files present',()=>{for(const p of ['../BUILD_453','../RECOVERY_453.md','../version.json','../src/render-modes.js'])assert.equal(fs.existsSync(new URL(p,import.meta.url)),true);});
