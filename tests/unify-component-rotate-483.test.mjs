import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const rotate=fs.readFileSync(new URL('../src/rotate-transform.js',import.meta.url),'utf8');
const upgrade=fs.readFileSync(new URL('../src/transform-upgrade.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('483 dedicated Rotate owns vertex edge and face',()=>{
  assert.match(rotate,/\['vertex','edge','face'\]\.includes\(mode\)/);
  assert.match(rotate,/if \(mode === 'vertex'\) return selectedIndices\('vertex'\)/);
  assert.match(rotate,/selectedIndices\('edge'\)/);
  assert.match(rotate,/selectedIndices\('face'\)/);
});

test('483 dedicated Rotate reads X Y Z constraint and 15 degree snap',()=>{
  assert.match(rotate,/function constraint\(\).*__boxlabTransformArming/);
  assert.match(rotate,/function axisVector\(axis\)/);
  assert.match(rotate,/transformSnapBtn/);
  assert.match(rotate,/Math\.round\(THREE\.MathUtils\.radToDeg\(angle\) \/ 15\) \* 15/);
});

test('483 shared transform yields component Rotate only',()=>{
  assert.match(upgrade,/if\(t==='rotate'&&\['vertex','edge','face'\]\.includes\(m\)\)return;/);
});

test('483 cache-hops both Rotate owners and preserves protected core',()=>{
  assert.match(index,/src\/transform-upgrade\.js\?v=0\.36\.18\.483/);
  assert.match(index,/src\/rotate-transform\.js\?v=0\.36\.18\.483/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.366/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
