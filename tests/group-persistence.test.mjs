import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('348 Object scene snapshots include group names and collapsed state',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  assert.match(src,/function groupMetadataSnapshot\(\)/);
  assert.match(src,/names:\[\.\.\.groupNames\.entries\(\)\]/);
  assert.match(src,/collapsed:\[\.\.\.collapsedGroups\]/);
  assert.match(src,/groups:groupMetadataSnapshot\(\)/);
  assert.match(src,/restoreGroupMetadata\(snapshot,restored\)/);
});

test('348 restored group metadata is filtered to groups that actually exist',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  const block=src.slice(src.indexOf('function restoreGroupMetadata'),src.indexOf('function captureScene'));
  assert.match(block,/validGroups=new Set/);
  assert.match(block,/validGroups\.has\(id\)/);
  assert.match(block,/groupNames\.clear\(\);collapsedGroups\.clear\(\)/);
});

test('348 group rename is one Object scene-history step',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  const at=src.indexOf("rename.title='Rename group'");
  const block=src.slice(at,at+900);
  assert.match(block,/__boxlabObjectHistory\?\.checkpoint\?\.\(\)/);
  assert.match(block,/groupNames\.set\(groupId,clean\)/);
});

test('348 stale group names and collapse flags are pruned after group removal',()=>{
  const src=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
  assert.match(src,/function pruneGroupMetadata\(\)/);
  assert.match(src,/groupNames\.delete\(id\)/);
  assert.match(src,/collapsedGroups\.delete\(id\)/);
  assert.match(src,/cleanSelection\(\);pruneGroupMetadata\(\);decorateHierarchy\(\)/);
});

test('348 cache chain and protected transform pin are intact',()=>{
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
  assert.match(index,/drawer-ui\.js\?v=0\.36\.18\.348/);
  assert.match(index,/object-management\.js\?v=0\.36\.18\.348/);
  assert.match(drawer,/object-management\.js\?v=0\.36\.18\.348/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
