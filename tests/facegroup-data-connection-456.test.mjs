import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('456 restores split import control and authoritative Facegroups mesh lookup',()=>{
 const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
 const importer=fs.readFileSync(new URL('../src/import-mesh.js',import.meta.url),'utf8');
 const render=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');
 assert.match(index,/id="splitImportGroups" type="checkbox"/);
 assert.doesNotMatch(index,/id="splitImportGroups"[^>]*checked/);
 assert.match(importer,/splitByGroups:!!splitGroupsToggle\?\.checked/);
 assert.match(render,/return bridge\(\)\?\.mesh\|\|null/);
 assert.match(render,/__boxlabObjectManager/);
 assert.match(render,/objectId/);
 assert.match(index,/import-mesh\.js\?v=0\.36\.18\.456/);
 assert.match(index,/render-modes\.js\?v=0\.36\.18\.456/);
 assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
