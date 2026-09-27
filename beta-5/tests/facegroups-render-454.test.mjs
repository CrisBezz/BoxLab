import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('454 Facegroups integration is additive and keeps Studio runtime',()=>{
 const s=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');
 assert.match(s,/applyFaceGroupColours/);
 assert.match(s,/data-render="facegroups"/);
 assert.match(s,/function refreshStudio\(\)/);
 assert.match(s,/function syncStudio\(\)/);
 assert.match(s,/function applyMode\(body\)/);
 assert.match(s,/data-render="studio"/);
 assert.match(s,/data-render="xray"/);
});
