import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('369 Group Boolean operates member-shell by member-shell',()=>{
  const src=fs.readFileSync(new URL('../src/boolean-prototype.js',import.meta.url),'utf8');
  assert.match(src,/function splitConnectedShells\(mesh\)/);
  assert.match(src,/function solidsInteract\(a,b\)/);
  assert.match(src,/function compoundUnion\(shells\)/);
  assert.match(src,/function buildGroupResult\(active,other,operation\)/);
  assert.match(src,/e\.kind==='groups'\?buildGroupResult\(e\.active,e\.other,operation\):buildResult/);
});

test('369 Group operands validate each member as closed instead of concatenated fake solid',()=>{
  const src=fs.readFileSync(new URL('../src/boolean-prototype.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf('const operandFor=id=>'),src.indexOf('const activeObject=',src.indexOf('const operandFor=id=>')));
  assert.match(block,/members\.some\(o=>!topologyInfo\(o\.mesh\)\.closed\)/);
  assert.doesNotMatch(block,/combineEditableMeshes\(members\.map/);
});

test('369 Cut applies every B shell to surviving A shells',()=>{
  const src=fs.readFileSync(new URL('../src/boolean-prototype.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf("if(operation==='difference')"),src.indexOf("const pieces=[]"));
  assert.match(block,/for\(const cutter of bShells\)/);
  assert.match(block,/for\(const shell of shells\)/);
  assert.match(block,/buildResult\(shell,cutter,'difference'\)/);
  assert.match(block,/splitConnectedShells\(result\.mesh\)/);
});

test('369 Swap keeps Active Tools open through operand activation',()=>{
  const src=fs.readFileSync(new URL('../src/boolean-ux-history.js',import.meta.url),'utf8');
  assert.match(src,/function keepBooleanToolsVisible\(on=false\)/);
  assert.match(src,/editDrawer\.dataset\.keepOpen='true';editDrawer\.open=true/);
  const swap=src.slice(src.indexOf("swap.addEventListener('click'"),src.indexOf('panel.append',src.indexOf("swap.addEventListener('click'")));
  assert.match(swap,/keepBooleanToolsVisible\(true\)/);
  assert.match(swap,/requestAnimationFrame\(\(\)=>keepBooleanToolsVisible\(true\)\)/);
});

test('369 protected linked-instance and Group transform baselines remain pinned',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  assert.match(index,/boolean-prototype\.js\?v=0\.36\.18\.457/);
  assert.match(index,/boolean-ux-history\.js\?v=0\.36\.18\.369/);
  assert.match(index,/multi-object\.js\?v=0\.36\.18\.367/);
  assert.match(drawer,/object-origin\.js\?v=0\.36\.18\.355/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
