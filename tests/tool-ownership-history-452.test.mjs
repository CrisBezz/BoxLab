import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('453 keeps Boolean transactional one-step history fix without loading Boolean UI wrapper',()=>{
  const src=fs.readFileSync(new URL('../src/boolean-prototype.js',import.meta.url),'utf8');
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  assert.match(src,/const beforeScene=globalThis\.__boxlabObjectHistory\?\.capture\?\.\(\)\|\|null/);
  assert.match(src,/checkpointSnapshot\?\.\(beforeScene\)/);
  assert.doesNotMatch(index,/boolean-tool-session-ui\.js/);
  assert.match(index,/boolean-prototype\.js\?v=0\.36\.18\.452/);
});

test('453 uses the proven .449 transform ownership model',()=>{
  const src=fs.readFileSync(new URL('../src/transform-upgrade.js',import.meta.url),'utf8');
  assert.match(src,/directFaceToolActive\(\)/);
  assert.doesNotMatch(src,/directComponentToolActive/);
});
