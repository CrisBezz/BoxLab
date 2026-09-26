import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const upgrade=fs.readFileSync(new URL('../src/transform-upgrade.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('481 shared transform pointerdown and pointermove both live on document capture',()=>{
  assert.match(upgrade,/document\.addEventListener\('pointerdown',startGesture,true\)/);
  assert.match(upgrade,/document\.addEventListener\('pointermove',event=>\{const g=gesture;/);
  assert.doesNotMatch(upgrade,/canvas\?\.addEventListener\('pointermove',event=>\{const g=gesture;/);
});

test('481 shared Rotate still owns vertex edge and face modes',()=>{
  assert.match(upgrade,/\['move','scale','rotate'\]\.includes\(t\)/);
  assert.doesNotMatch(upgrade,/m==='face'&&t==='rotate'/);
});

test('481 cache-hops shared transform and preserves protected core',()=>{
  assert.match(index,/src\/transform-upgrade\.js\?v=0\.36\.18\.481/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.366/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
