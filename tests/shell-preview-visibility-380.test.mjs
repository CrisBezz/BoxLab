import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const shell=fs.readFileSync(new URL('../src/shell.js',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8')).version;

test('Shell preview visibility wrapper follows current app build',()=>{
  const wrapper=index.match(/shell\.js\?v=([^"]+)/)?.[1];
  const stamp=index.match(/data-release-version="([^"]+)"/)?.[1];
  assert.equal(wrapper,version);
  assert.equal(stamp,version);
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
