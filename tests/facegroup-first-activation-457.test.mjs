import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('457 entering Facegroups rebuilds and reapplies after viewport settles',()=>{
 const render=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');
 assert.match(render,/function enterFacegroupsReady\(\)/);
 assert.match(render,/facegroupView=normaliseFacegroupView\(facegroupView\)/);
 assert.match(render,/requestAnimationFrame\(\(\)=>requestAnimationFrame/);
 assert.match(render,/if\(mode==='facegroups'\)applyToSceneBodies\(\)/);
});

test('457 facegroup material is assigned only after colour application succeeds',()=>{
 const render=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');
 assert.match(render,/if\(result\?\.ok\)\{/);
 assert.match(render,/body\.material=facegroupMaterial/);
 assert.match(render,/body\.userData\.boxlabFacegroupPending=true/);
 assert.match(render,/body\.material=frontOnly\(original\)/);
});
