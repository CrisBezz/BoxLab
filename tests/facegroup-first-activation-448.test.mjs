import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('448 entering Facegroups rebuilds then reapplies after viewport settles',()=>{
  const render=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');
  assert.match(render,/function enterFacegroupsReady\(\)/);
  assert.match(render,/facegroupView=normaliseFacegroupView\(facegroupView\)/);
  assert.match(render,/rebuild\(\);/);
  assert.match(render,/requestAnimationFrame\(\(\)=>requestAnimationFrame/);
  assert.match(render,/if\(mode==='facegroups'\)applyToSceneBodies\(\)/);
});

test('448 facegroup material is assigned only after colour application succeeds',()=>{
  const render=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');
  assert.match(render,/if\(result\?\.ok\)\{/);
  assert.match(render,/body\.material=inactive\?facegroupInactiveMaterial:facegroupMaterial/);
  assert.match(render,/body\.userData\.boxlabFacegroupPending=true/);
  assert.match(render,/body\.material=frontOnly\(original\)/);
});

test('448 runtime pins keep protected modelling baseline',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const beta4=JSON.parse(fs.readFileSync(new URL('../beta-4/version.json',import.meta.url),'utf8'));
  assert.match(index,/src\/render-modes\.js\?v=0\.36\.18\.449/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.366/);
  assert.match(index,/src\/multi-object\.js\?v=0\.36\.18\.367/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.equal(beta4.version,'0.36.18.427');
});
