import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const shell=fs.readFileSync(new URL('../src/shell.js',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8')).version;

test('Shell Pencil thickness wrapper follows current app build',()=>{
  const wrapper=index.match(/shell\.js\?v=([^"]+)/)?.[1];
  const stamp=index.match(/data-release-version="([^"]+)"/)?.[1];
  assert.equal(wrapper,version);
  assert.equal(stamp,version);
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
