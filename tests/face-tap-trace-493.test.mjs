import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('493 keeps full FaceTap trace instead of overwriting stages',()=>{
  assert.match(direct,/append&&faceTapDebug\.textContent/);
  assert.match(direct,/down hit=\$\{hit\} mode=\$\{bridge\(\)\?\.mode\?\.\(\)\} before=/);
  assert.match(direct,/up ok=\$\{ok\} now=/);
  assert.match(direct,/micro=/);
  assert.match(direct,/raf=/);
});

test('493 is diagnostic-only over 492 behavior',()=>{
  assert.match(direct,/bridge\(\)\?\.toggle\?\.\('face',p\.hit\)/);
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'main.js');
});
