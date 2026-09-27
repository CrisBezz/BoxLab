import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const handoff=fs.readFileSync(new URL('../src/edge-crease-handoff.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('478 Loop-Bevel exclusivity happens on click capture so the target click still arms',()=>{
  assert.match(handoff,/document\.addEventListener\('click',event=>\{/);
  assert.doesNotMatch(handoff,/document\.addEventListener\('pointerdown',event=>\{\n  const button=event\.target\?\.closest\?\.\('button'\);\n  if\(!button\)return;\n  if\(button\.id==='bevelBtn'/);
  assert.match(handoff,/button\.id==='bevelBtn'.*loop\.click\(\)/s);
  assert.match(handoff,/button\.id==='loopCutBtn'.*bevel\.click\(\)/s);
});

test('478 cache-hops only the edge handoff shim',()=>{
  assert.match(index,/src\/edge-crease-handoff\.js\?v=0\.36\.18\.478/);
  assert.match(index,/src\/transform-upgrade\.js\?v=0\.36\.18\.477/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.366/);
});
