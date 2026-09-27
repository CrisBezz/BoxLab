import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('490 pointerdown records face hit without validating modelling region',()=>{
  assert.match(direct,/pendingFacePress=\{/);
  const down=direct.slice(direct.indexOf("document.addEventListener('pointerdown'"),direct.indexOf("document.addEventListener('pointermove'"));
  assert.doesNotMatch(down,/selectionComponentsInfo\(|faceRegionsInfo/);
});

test('490 tap selection resolves before modelling validation',()=>{
  assert.match(direct,/if\(pendingFacePress\?\.id===event\.pointerId\)/);
  assert.match(direct,/const next=p\.selectionBefore\.includes\(p\.hit\)/);
  assert.match(direct,/bridge\(\)\?\.set\?\.\('face',next\)/);
});

test('490 modelling validation begins only after drag threshold',()=>{
  assert.match(direct,/if\(Math\.hypot\(dx,dy\)<8\)return;/);
  assert.match(direct,/beginDirectDrag\(event,p\.hit,p\.selectionBefore,workingFaces\)/);
});

test('490 keeps native picker bridge and protected pins',()=>{
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.489/);
  assert.match(index,/src\/multi-face-direct\.js\?v=0\.36\.18\.490/);
  assert.match(index,/src\/rotate-transform\.js\?v=0\.36\.18\.483/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
