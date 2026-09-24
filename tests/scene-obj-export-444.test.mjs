import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import fs from 'node:fs';
import {EditableMesh} from '../src/mesh.js';
import {buildSceneOBJ} from '../src/scene-obj-export-core.js';

test('444 scene OBJ preflight reports clean closed and open export meshes',()=>{
  const closed=EditableMesh.cube(2);
  const open=EditableMesh.cube(2);open.faces.splice(0,1);
  const result=buildSceneOBJ([
    {name:'Closed Cube',mesh:closed,settings:{}},
    {name:'Open Cube',mesh:open,settings:{}}
  ],{version:'0.36.18.445'});
  assert.equal(result.exported,2);
  assert.equal(result.preflight.closed,1);
  assert.equal(result.preflight.open,1);
  assert.equal(result.preflight.issues,0);
  assert.match(result.content,/# Preflight: 1 closed clean \| 1 open clean \| 0 issues/);
  assert.match(result.content,/# BoxLab health: Closed · Clean/);
  assert.match(result.content,/# BoxLab health: Open · Clean/);
  assert.match(result.content,/o Closed Cube/);
  assert.doesNotMatch(result.content,/g Closed Cube/);
});

test('444 export preflight runs after Mirror evaluation',()=>{
  const half=new EditableMesh([
    new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0),new THREE.Vector3(1,1,0),new THREE.Vector3(0,1,0)
  ],[[0,1,2,3]]);
  const result=buildSceneOBJ([{name:'Mirrored',mesh:half,settings:{mirror:{x:true,y:false,z:false}}}],{version:'0.36.18.445'});
  assert.equal(result.exported,1);
  assert.ok(result.reports[0].vertices>=4);
  assert.match(result.content,/# Object 1: Mirrored/);
});

test('444 wrapper exposes preflight status and protected release pins',()=>{
  const wrapper=fs.readFileSync(new URL('../src/scene-obj-export-238.js',import.meta.url),'utf8');
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const beta4=JSON.parse(fs.readFileSync(new URL('../beta-4/version.json',import.meta.url),'utf8'));
  assert.match(wrapper,/buildSceneOBJ/);
  assert.match(wrapper,/open clean/);
  assert.match(wrapper,/issues/);
  assert.match(index,/scene-obj-export-238\.js\?v=0\.36\.18\.445/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.equal(beta4.version,'0.36.18.427');
});
