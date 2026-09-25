import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const inset=fs.readFileSync(new URL('../src/uniform-inset.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8')).version;

test('465 public shell and manifest identify the same build',()=>{
  assert.equal(version,'0.36.18.465');
  assert.match(index,/BoxLab v0\.36\.18\.465/);
  assert.match(index,/data-release-version="0\.36\.18\.465"/);
});

test('465 installs Face Region geometry dependencies on the live mesh before Inset methods',()=>{
  const regionAt=inset.indexOf("['faceRegionInfo','faceRegionNormal','faceRegionsInfo']");
  const insetAt=inset.indexOf("['insetFaceRegion','insetFaceRegions','insetFace']");
  assert.ok(regionAt>=0&&insetAt>regionAt);
  assert.match(inset,/LiveEditableMesh\.prototype\[name\]=EditableMesh\.prototype\[name\]/);
});

test('465 does not rerun the face-region installer and duplicate UI ownership',()=>{
  assert.doesNotMatch(inset,/installFaceRegion\(LiveEditableMesh\)/);
});

test('465 preserves proven Face Through and transform pins',()=>{
  assert.match(index,/multi-face-direct\.js\?v=0\.36\.18\.242/);
  assert.match(index,/sequential-through-fallback\.js\?v=0\.36\.18\.465/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
