import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('453 retains critical render runtime functions and modes',()=>{
  const s=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');
  for(const token of ['function ensureStudioRig()','function refreshStudio()','function syncStudio()','function applyMode(body)','function setMode(next)','data-render="studio"','data-render="xray"']) assert.ok(s.includes(token),token);
});
