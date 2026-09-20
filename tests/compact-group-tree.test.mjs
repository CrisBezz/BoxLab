import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('350 Group creation control is contextual instead of permanently occupying drawer space',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  assert.match(src,/canGroup=chosen\.length>=2&&wholeGroupId==null/);
  assert.match(src,/if\(host\)host\.hidden=!canGroup/);
  assert.match(drawer,/#objectGroupTools\[hidden\]\{display:none!important\}/);
  assert.match(drawer,/#objectGroupTools \[data-group-action="ungroup"\]\{display:none!important\}/);
});

test('350 existing groups render as a compact tree row with a More menu',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  assert.match(src,/grid-template-columns:20px minmax\(0,1fr\) 26px 28px/);
  assert.match(src,/className='boxlab-group-more'/);
  assert.match(src,/moreSummary\.textContent='•••'/);
  assert.match(src,/menuRename\.textContent='Rename Group'/);
  assert.match(src,/menuUngroup\.textContent='Ungroup'/);
  assert.match(src,/boxlab-group-children\{display:grid;gap:2px/);
});

test('350 group visibility and lock each checkpoint Object scene history',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  const at=src.indexOf("visible.addEventListener('click'");
  const visibility=src.slice(at,at+700);
  assert.match(visibility,/__boxlabObjectHistory\?\.checkpoint\?\.\(\)/);
  const lockAt=src.indexOf("menuLock.textContent=editableMembers.length?(allLocked?'Unlock':'Lock'):'Reference • Read Only'");
  const lock=src.slice(lockAt,lockAt+1200);
  assert.match(lock,/__boxlabObjectHistory\?\.checkpoint\?\.\(\)/);
});

test('350 compact group row preserves first-class group selection and direct actions',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  assert.match(src,/function selectedWholeGroupId\(/);
  assert.match(src,/name\.title='Select whole group'/);
  assert.match(src,/renameGroup\(groupId\)/);
  assert.match(src,/data-group-action="ungroup"/);
});

test('350 cache chain and protected transform pin remain intact',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  assert.match(index,/object-management\.js\?v=0\.36\.18\.368/);
  assert.match(index,/drawer-ui\.js\?v=0\.36\.18\.361/);
  assert.match(drawer,/object-management\.js\?v=0\.36\.18\.368/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
