import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const upgrade=fs.readFileSync(new URL('../src/transform-upgrade.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('480 shared transform reads authoritative arming state first',()=>{
  assert.match(upgrade,/function tool\(\)\{return globalThis\.__boxlabTransformArming\?\.tool\?\.\(\)\|\|activeToolButton\(\)\?\.dataset\?\.tool\|\|null;\}/);
});

test('480 shared transform owns Rotate for all component modes',()=>{
  assert.doesNotMatch(upgrade,/if\(m==='face'&&t==='rotate'\)return;/);
  assert.match(upgrade,/\['move','scale','rotate'\]\.includes\(t\)/);
  assert.match(upgrade,/else\{clearRefVisual\(\);const cv=/);
});

test('480 cache-hops shared transform and preserves protected core',()=>{
  assert.match(index,/src\/transform-upgrade\.js\?v=0\.36\.18\.480/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.366/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
