import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const shell=fs.readFileSync(new URL('../src/shell.js',import.meta.url),'utf8');

test('380 Shell preview visibility runtime is loaded',()=>{
  assert.match(index,/shell\.js\?v=0\.36\.18\.380/);
  assert.match(index,/data-release-version="0\.36\.18\.380"/);
});

test('380 Shell preview uses filled DoubleSide layer plus wire overlay',()=>{
  assert.match(shell,/fillMaterial=new THREE\.MeshBasicMaterial/);
  assert.match(shell,/wireMaterial=new THREE\.MeshBasicMaterial/);
  assert.match(shell,/side:THREE\.DoubleSide/);
  assert.match(shell,/wireframe:true/);
  assert.match(shell,/preview=new THREE\.Group\(\)/);
  assert.match(shell,/preview\.add\(fill,wire\)/);
});

test('380 preview backfaces remain visible through source mesh',()=>{
  const start=shell.indexOf('const fillMaterial');
  const end=shell.indexOf('preview.userData.boxlabShellPreview=true');
  const block=shell.slice(start,end);
  assert.match(block,/depthTest:false/);
  assert.match(block,/depthWrite:false/);
  assert.match(block,/opacity:\.18/);
  assert.match(block,/opacity:\.72/);
});

test('380 grouped preview disposes child geometry and materials safely',()=>{
  assert.match(shell,/preview\.traverse\?\.\(node=>/);
  assert.match(shell,/const geometries=new Set\(\),materials=new Set\(\)/);
  assert.match(shell,/geometries\.forEach\(g=>g\.dispose\?\.\(\)\)/);
  assert.match(shell,/materials\.forEach\(m=>m\.dispose\?\.\(\)\)/);
});
