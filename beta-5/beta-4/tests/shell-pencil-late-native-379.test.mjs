import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const shell=fs.readFileSync(new URL('../src/shell.js',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8')).version;

test('Shell late-native Pencil guard follows current app build',()=>{
  const wrapper=index.match(/shell\.js\?v=([^"]+)/)?.[1];
  const stamp=index.match(/data-release-version="([^"]+)"/)?.[1];
  assert.equal(wrapper,version);
  assert.equal(stamp,version);
});

test('379 stores and enforces Pencil-owned thickness',()=>{
  assert.match(shell,/pencilThicknessValue=null/);
  assert.match(shell,/function enforcePencilThickness\(\)/);
  assert.match(shell,/if\(input\.value!==expected\)input\.value=expected/);
});

test('379 keeps Pencil ownership beyond pointerup to beat Safari late events',()=>{
  assert.match(shell,/requestAnimationFrame\(\(\)=>\{/);
  assert.match(shell,/pencilThicknessValue=null/);
  const end=shell.slice(shell.indexOf('function endPencilThickness'),shell.indexOf('function setStatus'));
  assert.match(end,/requestAnimationFrame/);
  assert.match(end,/enforcePencilThickness\(\)/);
});

test('379 input and change enforce Pencil value before preview update',()=>{
  assert.match(shell,/addEventListener\('input',[\s\S]*enforcePencilThickness\(\)[\s\S]*buildPreview\(\)/);
  assert.match(shell,/addEventListener\('change',[\s\S]*enforcePencilThickness\(\)[\s\S]*buildPreview\(\)/);
});
