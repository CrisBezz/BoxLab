import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const solidify=fs.readFileSync(new URL('../src/solidify.js',import.meta.url),'utf8');
const shell=fs.readFileSync(new URL('../src/shell.js',import.meta.url),'utf8');
const toolSession=fs.readFileSync(new URL('../src/tool-session-ui.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8')).version;

test('421 Solidify launches an exclusive Tool Session with cancel/apply controls',()=>{
  assert.ok(solidify.includes("id:'solidify'"));
  assert.ok(solidify.includes("title:'Solidify'"));
  assert.ok(solidify.includes('solidifyCancelBtn'));
  assert.ok(solidify.includes('solidifyApplyBtn'));
  assert.ok(solidify.includes('endSolidifySession()'));
});

test('421 Shell launches an exclusive Tool Session and preserves selected opening faces',()=>{
  assert.ok(shell.includes("id:'shell'"));
  assert.ok(shell.includes("title:'Shell'"));
  assert.ok(shell.includes('shellCancelBtn'));
  assert.ok(shell.includes('shellApplyBtn'));
  assert.ok(shell.includes('previewFaces=[...check.selectedFaces]'));
});

test('421 Solidify keeps direct viewport thickness interaction',()=>{
  assert.ok(solidify.includes('beginThicknessDrag'));
  assert.ok(solidify.includes('moveThicknessDrag'));
  assert.ok(solidify.includes('canvas?.setPointerCapture?.(event.pointerId)'));
});

test('421 Shell keeps Pencil-owned thickness slider guard',()=>{
  assert.ok(shell.includes('beginPencilThickness'));
  assert.ok(shell.includes('pencilReleaseFrame=requestAnimationFrame'));
  assert.ok(shell.includes('enforcePencilThickness'));
});

test('421 shared Tool Session owns drawer visibility and protected multi-object transform remains pinned',()=>{
  assert.ok(toolSession.includes('enforceOpenWhileActive'));
  assert.ok(index.includes('src/tool-session-ui.js?v='+version));
  assert.ok(index.includes('src/solidify.js?v='+version));
  assert.ok(index.includes('src/shell.js?v='+version));
  assert.ok(index.includes('src/multi-object-transform.js?v=0.36.1.0'));
});
