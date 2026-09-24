import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('352 exactly two selected objects keep amber blue viewport tint without Outliner takeover',()=>{
  const src=fs.readFileSync(new URL('../src/boolean-ux-history.js',import.meta.url),'utf8');
  const sync=src.slice(src.indexOf('function syncUI'),src.indexOf('function queueSelectionSync'));
  assert.match(sync,/markOutliner\(\{ok:false\}\)/);
  assert.match(sync,/syncSelectionColours\(\)/);
  assert.match(src,/else if\(ids\.size===2\)/);
  assert.match(src,/const COLOR_A=0xf3b34a,COLOR_B=0x5da9ff/);
});

test('352 ordinary Duplicate and Linked Duplicate use numbered object names',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  assert.match(src,/function nextDuplicateName\(name\)/);
  assert.match(src,/padStart\(2, '0'\)/);
  assert.match(src,/addObject\(source\.mesh, nextDuplicateName\(source\.name\)/);
  assert.match(src,/name\|\|nextDuplicateName\(sourceObject\.name\)/);
  assert.doesNotMatch(src,/\$\{source\.name\} copy/);
});

test('352 Multi duplicate also delegates numbered naming',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  assert.match(src,/m\.nextDuplicateName\?\.\(src\.name\)/);
  assert.match(src,/name:m\.nextDuplicateName\?\.\(source\.name\)/);
  assert.doesNotMatch(src,/\$\{src\.name\} copy/);
});

test('352 Boolean results use compact B numbering',()=>{
  const src=fs.readFileSync(new URL('../src/boolean-prototype.js',import.meta.url),'utf8');
  assert.match(src,/function nextBooleanName\(name\)/);
  assert.match(src,/candidate=\`\$\{stem\} B\$\{i\+\+\}\`/);
  assert.match(src,/addMesh\?\.\(result\.mesh,nextBooleanName\(e\.active\.name\)/);
  assert.doesNotMatch(src,/\$\{e\.active\.name\} \$\{label\} \$\{e\.other\.name\}/);
});

test('352 current release cache chain and protected transform pin remain intact',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  assert.match(index,/multi-object\.js\?v=0\.36\.18\.367/);
  assert.match(index,/object-management\.js\?v=0\.36\.18\.392/);
  assert.match(index,/boolean-ux-history\.js\?v=0\.36\.18\.369/);
  assert.match(index,/boolean-prototype\.js\?v=0\.36\.18\.452/);
  assert.match(index,/drawer-ui\.js\?v=0\.36\.18\.361/);
  assert.match(drawer,/object-management\.js\?v=0\.36\.18\.392/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
