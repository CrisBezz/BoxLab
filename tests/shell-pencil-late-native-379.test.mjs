import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const shell=fs.readFileSync(new URL('../src/shell.js',import.meta.url),'utf8');

test('379 Shell late-native Pencil guard is loaded',()=>{
  assert.match(index,/shell\.js\?v=0\.36\.18\.379/);
  assert.match(index,/data-release-version="0\.36\.18\.379"/);
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
