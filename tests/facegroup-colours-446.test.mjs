import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {EditableMesh} from '../src/mesh.js';
import {applyFaceGroupColours,faceGroupColour} from '../src/facegroup-colours-core.js';

test('446 facegroup colours are stable per group and differ between groups',()=>{
  const a1=faceGroupColour('Patch'),a2=faceGroupColour('Patch'),b=faceGroupColour('Patch_1');
  assert.equal(a1.getHex(),a2.getHex());
  assert.notEqual(a1.getHex(),b.getHex());
});

test('446 applies flat per-face colours to triangulated geometry',()=>{
  const mesh=EditableMesh.cube(2);
  mesh.faceGroups=['A','B','C','D','E','F'];
  const geometry=mesh.triangulatedGeometry();
  const result=applyFaceGroupColours(geometry,mesh);
  assert.equal(result.ok,true);
  assert.equal(result.groups,6);
  assert.equal(geometry.getAttribute('color').count,geometry.getAttribute('position').count);
  const colour=geometry.getAttribute('color');
  assert.notDeepEqual(
    [colour.getX(0),colour.getY(0),colour.getZ(0)],
    [colour.getX(6),colour.getY(6),colour.getZ(6)]
  );
});

test('446 viewport exposes Facegroups render look and evaluated mesh handoff',()=>{
  const render=fs.readFileSync(new URL('../src/render-modes.js',import.meta.url),'utf8');
  const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
  const multi=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const beta4=JSON.parse(fs.readFileSync(new URL('../beta-4/version.json',import.meta.url),'utf8'));
  assert.match(render,/data-render="facegroups"/);
  assert.match(render,/applyFaceGroupColours/);
  assert.match(render,/mode==='facegroups'/);
  assert.doesNotMatch(main,/boxlabDisplayMesh/);
  assert.doesNotMatch(multi,/boxlabDisplayMesh/);
  assert.match(render,/evaluatedMeshForBody/);
  assert.match(index,/src\/main\.js\?v=0\.36\.18\.461/);
  assert.match(index,/src\/multi-object\.js\?v=0\.36\.18\.367/);
  assert.match(index,/src\/render-modes\.js\?v=0\.36\.18\.449/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.equal(beta4.version,'0.36.18.427');
});
