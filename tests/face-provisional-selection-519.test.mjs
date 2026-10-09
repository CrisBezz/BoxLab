import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {assertAssetReference} from './helpers/release-contract.mjs';
import {dragWorkingSet} from './helpers/armed-face-behavior.mjs';

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
  dragWorkingSet();
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'main.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
