import {assertAssetReference,assertShellRelease} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const exporter=fs.readFileSync(new URL('../src/export-as-panel.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const beta5=fs.readFileSync(new URL('../beta-5/index.html',import.meta.url),'utf8');

test('553 emits indexed GLB geometry instead of triangle-corner soup',()=>{
  assert.match(exporter,/const vertexMap=new Map\(\)/);
  assert.match(exporter,/const key=cornerKey\(index,data\)/);
  assert.match(exporter,/if\(existing!==undefined\)return existing/);
  assert.match(exporter,/geometry\.setIndex\(indices\)/);
  assert.match(exporter,/boxlabIndexed=true/);
});

test('553 keeps preserved corner channels in the weld key',()=>{
  assert.match(exporter,/if\(uvComplete\)parts\.push\('u:'/);
  assert.match(exporter,/if\(tangentComplete\)parts\.push\('t:'/);
  assert.match(exporter,/if\(colorComplete\)parts\.push\('c:'/);
  assert.match(exporter,/if\(morphComplete\)data\.morphs\.forEach/);
});

test('553 runtime pins current and protected baselines remain intact',()=>{
  assertAssetReference(index,'export-as-panel.js');
  assertShellRelease(index);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.match(beta5,/data-release-version="0\.36\.18\.538"/);
});
