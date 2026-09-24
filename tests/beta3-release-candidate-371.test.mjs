import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const beta3Index=fs.readFileSync(new URL('../beta-3/index.html',import.meta.url),'utf8');
const drawer=fs.readFileSync(new URL('../src/drawer-ui.js',import.meta.url),'utf8');
const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const multi=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
const mgmt=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
const booleanProto=fs.readFileSync(new URL('../src/boolean-prototype.js',import.meta.url),'utf8');

test('371 frozen Beta 3 release version is consistent',()=>{
  assert.match(beta3Index,/BoxLab v0\.36\.18\.371/);
  const version=JSON.parse(fs.readFileSync(new URL('../beta-3/version.json',import.meta.url),'utf8'));
  assert.equal(version.version,'0.36.18.371');
});

test('371 protects linked-instance and navigation baseline',()=>{
  assert.match(index,/multi-object\.js\?v=0\.36\.18\.367/);
  assert.match(multi,/inactiveLayer\.name='BoxLab Inactive Objects'/);
  assert.match(multi,/globalThis\.__boxlabSelectionBridge\?\.mode\?\.\(\)/);
  assert.match(main,/__boxlabBridgeState\.mesh=mesh;clearGroup\(root\)/);
});

test('371 protects Group transform and core transform pins',()=>{
  assert.match(drawer,/object-origin\.js\?v=0\.36\.18\.355/);
  assert.match(index,/multi-object-transform\.js\?v=0\.36\.1\.0/);
});

test('371 protects fresh-load component Multi baseline',()=>{
  assert.match(index,/component-multi-init\.js\?v=0\.36\.18\.314/);
});

test('371 protects mature Through and Clean loaders',()=>{
  assert.match(index,/multi-face-direct\.js\?v=0\.36\.18\.242/);
  assert.match(index,/direct-topology-conformance-guard\.js\?v=0\.36\.18\.242/);
  assert.match(index,/quad-clean\.js\?v=0\.36\.18\.339/);
});

test('371 protects Group Boolean compound solver and additive whole-Group selection',()=>{
  assert.match(booleanProto,/function buildGroupResult\(active,other,operation\)/);
  assert.match(booleanProto,/function compoundUnion\(shells\)/);
  assert.match(mgmt,/completeSelectedGroupIds:selectedCompleteGroupIds/);
  assert.match(index,/boolean-prototype\.js\?v=0\.36\.18\.456/);
  assert.match(index,/boolean-ux-history\.js\?v=0\.36\.18\.369/);
});

test('371 keeps no-service-worker release policy',()=>{
  assert.doesNotMatch(index,/serviceWorker\.register|navigator\.serviceWorker\.register/);
});
