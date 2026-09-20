import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const bsp=fs.readFileSync(new URL('../src/boolean-bsp.js',import.meta.url),'utf8');

test('sequential Boolean has conservative planar boundary-loop repair',()=>{
  assert.match(bsp,/function boundaryLoops\(/);
  assert.match(bsp,/function tryPlanarBoundaryRepair\(/);
  assert.match(bsp,/loops\.length!==1/);
  assert.match(bsp,/topologyInfo\(candidate\)/);
  assert.match(bsp,/after\.closed/);
});

test('Boolean repair remains validation-gated',()=>{
  assert.match(bsp,/repaired=tryPlanarBoundaryRepair\(mesh,eps\)/);
  assert.match(bsp,/globalThis\.__boxlabTopologyGate\?\.validate\?\.\(repaired\.mesh\)/);
  assert.match(bsp,/!topology\.closed\|\|gate&&!gate\.booleanReady/);
});
