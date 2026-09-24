import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const transform=fs.readFileSync(new URL('../src/transform-upgrade.js',import.meta.url),'utf8');
const revolve=fs.readFileSync(new URL('../src/revolve.js',import.meta.url),'utf8');
const profile=fs.readFileSync(new URL('../src/revolve-profile.js',import.meta.url),'utf8');

test('453 removes the post-449 presentation wrappers from the runtime',()=>{
  assert.doesNotMatch(index,/ui-presentation-451\.js/);
  assert.match(index,/boolean-tool-session-ui\.js\?v=0\.36\.18\.457/);
});

test('453 restores the proven direct component interaction path',()=>{
  assert.match(index,/transform-upgrade\.js\?v=0\.36\.18\.457/);
  assert.doesNotMatch(transform,/directComponentToolActive/);
  assert.match(transform,/directFaceToolActive\(\)/);
});

test('453 restores proven Edge Revolve while retaining confirmed-good Revolve Profile controller',()=>{
  assert.match(index,/revolve\.js\?v=0\.36\.18\.457/);
  assert.match(index,/revolve-profile\.js\?v=0\.36\.18\.457/);
  assert.doesNotMatch(revolve,/function armRevolve\(\)/);
  assert.match(profile,/revolveProfileCancelBtn/);
});

test('453 preserves protected modelling and navigation pins',()=>{
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.366/);
  assert.match(index,/src\/multi-object\.js\?v=0\.36\.18\.367/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.match(index,/styles\.css\?v=0\.36\.18\.270/);
  assert.match(index,/multi-face-direct\.js\?v=0\.36\.18\.242/);
  assert.match(index,/direct-bevel\.js\?v=0\.36\.18\.253/);
  assert.match(index,/direct-multi-vertex-bevel\.js\?v=0\.30\.1/);
});
