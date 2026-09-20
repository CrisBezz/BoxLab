import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('344 Reference imports are locked guide objects',()=>{
  const src=fs.readFileSync(new URL('../src/import-mesh.js',import.meta.url),'utf8');
  assert.match(src,/kind:isReference\?'reference':'editable'/);
  assert.match(src,/locked:isReference/);
});

test('344 object manager always forces Reference objects locked',()=>{
  const src=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  assert.match(src,/locked: options\.kind === 'reference' \? true : !!options\.locked/);
  assert.match(src,/const referenceGuide = object\.kind === 'reference'/);
  assert.match(src,/lock\.disabled = referenceGuide/);
  assert.match(src,/Reference • Read Only/);
});

test('344 Multi and Group lock controls never unlock Reference guides',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  assert.match(src,/chosen\.filter\(o=>o\.kind!=='reference'\)/);
  assert.match(src,/if\(o\.kind==='reference'\)o\.locked=true/);
  assert.match(src,/groupMembers\(groupId\)\.filter\(o=>o\.kind!=='reference'\)/);
});

test('344 scene restore reasserts Reference locked state',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  assert.match(src,/locked:s\.kind==='reference'\?true:!!s\.locked/);
});

test('344 Reference guides remain eligible cross-object snap targets',()=>{
  const snap=fs.readFileSync(new URL('../src/cross-object-snap.js',import.meta.url),'utf8');
  const core=fs.readFileSync(new URL('../src/cross-object-snap-core.js',import.meta.url),'utf8');
  assert.match(snap,/if\(object\.id===activeId\|\|object\.visible===false\)continue/);
  assert.doesNotMatch(snap,/kind.*reference.*continue/);
  assert.match(core,/if\(!object\|\|object\.id===activeId\|\|object\.visible===false\)continue/);
  assert.doesNotMatch(core,/kind.*reference.*continue/);
});

test('344 Reference duplication stays Reference and therefore stays locked',()=>{
  const management=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  const multi=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
  assert.match(management,/kind:src\.kind/);
  assert.match(multi,/options\.kind === 'reference' \? true : !!options\.locked/);
});
