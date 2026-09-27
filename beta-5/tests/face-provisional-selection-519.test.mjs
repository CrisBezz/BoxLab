import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('519 unselected armed Face becomes provisional live selection on pointerdown',()=>{
  assert.match(direct,/const provisionalSelection=!selectionBefore\.includes\(hit\)/);
  assert.match(direct,/if\(provisionalSelection\)b\.set\?\.\('face',\[hit\]\)/);
  assert.match(direct,/workingFaces:\[\.\.\.workingFaces\],\s*provisionalSelection/);
});

test('519 tap path restores prior selection before native toggle',()=>{
  assert.match(direct,/if\(p\.provisionalSelection\)bridge\(\)\?\.set\?\.\('face',p\.selectionBefore\)/);
  assert.match(direct,/bridge\(\)\?\.toggle\?\.\('face',p\.hit\)/);
});

test('519 drag still uses authoritative one-face working set and protected pins',()=>{
  assert.match(direct,/const workingFaces=selectionBefore\.includes\(hit\)\?\[\.\.\.selectionBefore\]:\[hit\]/);
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.519/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.520/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
