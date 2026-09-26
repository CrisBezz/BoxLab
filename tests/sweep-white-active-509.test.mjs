import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const sweep=fs.readFileSync(new URL('../src/sweep-path.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('509 Sweep active buttons use standard white appearance',()=>{
  assert.match(sweep,/box-shadow:none!important;background:#eef1f7!important;color:#15171b!important/);
  assert.doesNotMatch(sweep,/138,208,255/);
});

test('509 cache-hops Sweep only and preserves protected interaction pins',()=>{
  assert.match(index,/src\/sweep-path\.js\?v=0\.36\.18\.509/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.501/);
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.501/);
  assert.match(index,/src\/rotate-transform\.js\?v=0\.36\.18\.483/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
