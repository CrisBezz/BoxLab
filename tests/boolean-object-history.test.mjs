import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('347 Boolean and Join share the authoritative Object scene-history bridge',()=>{
  const management=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  const boolean=fs.readFileSync(new URL('../src/boolean-prototype.js',import.meta.url),'utf8');
  assert.match(management,/#joinObjectsBtn/);
  assert.match(management,/checkpoint()/);
  assert.match(boolean,/globalThis\.__boxlabObjectHistory\?\.checkpointSnapshot\?\.\(beforeScene\)/);
});

test('347 Boolean UX no longer wraps the global mesh Undo Redo stack',()=>{
  const ux=fs.readFileSync(new URL('../src/boolean-ux-history.js',import.meta.url),'utf8');
  assert.match(ux,/historyOwner:'object-scene'/);
  assert.doesNotMatch(ux,/h\.undo=function/);
  assert.doesNotMatch(ux,/h\.redo=function/);
  assert.doesNotMatch(ux,/booleanUndo|booleanRedo|beginBoolean|finalizeBoolean/);
});

test('347 Boolean result stays unique while only selected operands are hidden',()=>{
  const boolean=fs.readFileSync(new URL('../src/boolean-prototype.js',import.meta.url),'utf8');
  assert.match(boolean,/for\(const object of originals\)object\.visible=false/);
  assert.match(boolean,/addMesh\?\.\(result\.mesh/);
  assert.doesNotMatch(boolean,/sourceId:/);
  assert.match(boolean,/Reference objects cannot be Boolean operands/);
});

test('347 protected multi-object transform pin remains untouched',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.match(index,/boolean-ux-history\.js\?v=0\.36\.18\.369/);
});
