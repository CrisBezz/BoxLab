import test from 'node:test';
import assert from 'node:assert/strict';
import {parseEditableOBJ} from '../src/obj-facegroups-core.js';
import {buildSceneOBJ} from '../src/scene-obj-export-core.js';
import {EditableMesh} from '../src/mesh.js';
import {subdivide} from '../src/subdivision.js';
import {applyMirror} from '../src/mirror.js';
import fs from 'node:fs';

function eightGroupOBJ(){
  const lines=['o Cube'];
  for(let i=0;i<24;i++)lines.push(`v ${i%3} ${Math.floor(i/3)%3} ${Math.floor(i/9)}`);
  for(let g=0;g<8;g++){
    lines.push(`g Patch${g?'_'+g:''}`);
    const a=g*3+1;
    lines.push(`f ${a} ${a+1} ${a+2}`);
  }
  return lines.join('\n');
}

test('445 OBJ groups remain one BoxLab object by default',()=>{
  const entries=parseEditableOBJ(eightGroupOBJ());
  assert.equal(entries.length,1);
  assert.equal(entries[0].name,'Cube');
  assert.equal(entries[0].mesh.faces.length,8);
  assert.deepEqual(entries[0].mesh.faceGroups,['Patch','Patch_1','Patch_2','Patch_3','Patch_4','Patch_5','Patch_6','Patch_7']);
});

test('445 split-by-groups explicitly creates separate objects',()=>{
  const entries=parseEditableOBJ(eightGroupOBJ(),{splitByGroups:true});
  assert.equal(entries.length,8);
  assert.ok(entries.every(entry=>entry.mesh.faces.length===1));
  assert.equal(entries[0].name,'Cube • Patch');
  assert.equal(entries[7].name,'Cube • Patch_7');
});

test('445 OBJ export writes facegroups inside one object and round-trips',()=>{
  const [entry]=parseEditableOBJ(eightGroupOBJ());
  const out=buildSceneOBJ([{name:'Cube',mesh:entry.mesh,settings:{}}],{version:'0.36.18.445'});
  assert.equal((out.content.match(/^o /gm)||[]).length,1);
  assert.equal((out.content.match(/^g /gm)||[]).length,8);
  assert.match(out.content,/o Cube[\s\S]*g Patch\nf /);
  const [roundTrip]=parseEditableOBJ(out.content);
  assert.equal(roundTrip.mesh.faces.length,8);
  assert.deepEqual(roundTrip.mesh.faceGroups,entry.mesh.faceGroups);
});

test('445 obvious face descendants inherit parent facegroup',()=>{
  const mesh=EditableMesh.cube(2);
  mesh.faceGroups[0]='Front';
  mesh.extrudeFace(0,.2);
  assert.equal(mesh.faceGroups[0],'Front');
  assert.ok(mesh.faceGroups.slice(-4).every(group=>group==='Front'));

  const subd=subdivide(mesh,1);
  assert.ok(subd.faceGroups.filter(Boolean).every(group=>group==='Front'));

  const mirrored=applyMirror(mesh,{x:true,y:false,z:false});
  assert.ok(mirrored.faceGroups.filter(Boolean).every(group=>group==='Front'));
});

test('445 import UI defaults to preserved facegroups with optional split',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const importer=fs.readFileSync(new URL('../src/import-mesh.js',import.meta.url),'utf8');
  const beta4=JSON.parse(fs.readFileSync(new URL('../beta-4/version.json',import.meta.url),'utf8'));
  assert.match(index,/id="splitImportGroups" type="checkbox"/);
  assert.doesNotMatch(index,/id="splitImportGroups"[^>]*checked/);
  assert.match(importer,/splitByGroups:!!splitGroupsToggle\?\.checked/);
  assert.match(index,/src\/import-mesh\.js\?v=0\.36\.18\.445/);
  assert.match(index,/scene-obj-export-238\.js\?v=0\.36\.18\.445/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.equal(beta4.version,'0.36.18.427');
});
