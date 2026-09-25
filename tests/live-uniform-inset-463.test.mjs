import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const inset=fs.readFileSync(new URL('../src/uniform-inset.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('463 uniform Inset installs onto live versioned EditableMesh class',()=>{
  assert.match(inset,/EditableMesh as LiveEditableMesh/);
  assert.match(inset,/LiveEditableMesh\.prototype\[name\]=EditableMesh\.prototype\[name\]/);
  assert.match(inset,/\['insetFaceRegion','insetFaceRegions','insetFace'\]/);
});

test('463 loads live Inset patch before proven Face direct controller',()=>{
  const insetAt=index.indexOf('uniform-inset.js?v=0.36.18.465');
  const faceAt=index.indexOf('multi-face-direct.js?v=0.36.18.242');
  assert.ok(insetAt>=0&&faceAt>insetAt);
});

test('463 preserves proven Face direct and critical modelling pins',()=>{
  assert.match(index,/multi-face-direct\.js\?v=0\.36\.18\.242/);
  assert.match(index,/direct-bevel\.js\?v=0\.36\.18\.253/);
  assert.match(index,/direct-multi-vertex-bevel\.js\?v=0\.30\.1/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
