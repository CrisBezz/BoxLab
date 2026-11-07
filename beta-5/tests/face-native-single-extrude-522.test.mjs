import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

test('522 single Face Extrude uses mature native primitive',()=>{
  assert.match(direct,/drag\.faces\.length===1\?drag\.m\.extrudeFace\?\.\(drag\.faces\[0\],distance\):extrudeConnectedFaceSelection/);
});

test('522 deliberate multi-Face Extrude keeps connected-band solver',()=>{
  assert.match(direct,/extrudeConnectedFaceSelection\(drag\.m,drag\.faces,distance\)/);
});

test('522 runtime cache and release stamp are current',()=>{
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.522/);
  assert.match(index,/<title>BoxLab v0\.36\.18\.522<\/title>/);
  assert.equal(version.version,'0.36.18.522');
});

test('522 protected multi-object transform pin is unchanged',()=>{
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
