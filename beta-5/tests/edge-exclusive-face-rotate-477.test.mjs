import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const handoff=fs.readFileSync(new URL('../src/edge-crease-handoff.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('477 Loop and Bevel are mutually exclusive',()=>{
  assert.match(handoff,/button\.id==='bevelBtn'.*loop\?\.classList\.contains\('active'\).*loop\.click\(\)/s);
  assert.match(handoff,/button\.id==='loopCutBtn'.*bevel\?\.classList\.contains\('active'\).*bevel\.click\(\)/s);
});

test('477 proven transform runtime is cache-hopped without changing protected core pins',()=>{
  assert.match(index,/src\/transform-upgrade\.js\?v=0\.36\.18\.477/);
  assert.match(index,/src\/rotate-transform\.js\?v=0\.25\.0/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.366/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});

test('477 edge handoff shim is cache-hopped',()=>{
  assert.match(index,/src\/edge-crease-handoff\.js\?v=0\.36\.18\.477/);
});
