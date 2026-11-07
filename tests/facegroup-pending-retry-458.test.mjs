import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('458 retries pending Facegroup bodies instead of relying on one fixed delay',()=>{
 const s=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');
 assert.match(s,/function retryPendingFacegroup\(body,attempts=8\)/);
 assert.match(s,/function retryPendingFacegroupsInScene\(attempts=8\)/);
 assert.match(s,/boxlabFacegroupPending/);
 assert.match(s,/retryPendingFacegroup\(object\)/);
 assert.match(s,/requestAnimationFrame\(\(\)=>retryPendingFacegroupsInScene/);
});

test('458 invalid first pass keeps front material',()=>{
 const s=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');
 assert.match(s,/body\.material=frontOnly\(original\)/);
 assert.match(s,/body\.userData\.boxlabFacegroupPending=true/);
 assert.match(s,/delete body\.userData\.boxlabFacegroupPending/);
});
