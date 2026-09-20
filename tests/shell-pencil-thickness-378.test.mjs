import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const shell=fs.readFileSync(new URL('../src/shell.js',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8')).version;

test('378 Shell Pencil thickness runtime is pinned',()=>{
  assert.match(index,/shell\.js\?v=0\.36\.18\.378/);
  assert.match(index,/data-release-version="0\.36\.18\.378"/);
});

test('378 Shell owns a Pencil-only thickness range path',()=>{
  assert.match(shell,/event\.pointerType!=='pen'/);
  assert.match(shell,/rangeValueAtClientX\(event\.clientX\)/);
  assert.match(shell,/setPointerCapture\?\.\(event\.pointerId\)/);
  assert.match(shell,/hasPointerCapture\?\.\(event\.pointerId\)/);
});

test('378 Pencil thickness maps bounds and reuses normal input pathway',()=>{
  assert.match(shell,/\(clientX-rect\.left\)\/rect\.width/);
  assert.match(shell,/Math\.round\(\(raw-min\)\/step\)\*step/);
  assert.match(shell,/input\.dispatchEvent\(new Event\('input',\{bubbles:true\}\)\)/);
});

test('378 native finger range path remains intact',()=>{
  assert.match(shell,/input\?\.addEventListener\('input'/);
  assert.doesNotMatch(shell,/event\.pointerType==='touch'.*preventDefault/s);
});
