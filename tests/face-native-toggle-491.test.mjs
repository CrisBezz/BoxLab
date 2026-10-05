import {assertAssetReference} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const direct=fs.readFileSync(new URL('../src/multi-face-direct.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('491 selection bridge exposes native toggleSelection',()=>{
  assert.match(main,/toggle:\(type,index\)=>\{if\(selectionMode!==type\|\|!Number\.isInteger\(index\)\)return false;toggleSelection\(\{type,index\}\);renderMesh\(\);return true;\}/);
});

test('491 armed Face tap uses native toggle instead of rebuilding arrays',()=>{
  assert.match(direct,/bridge\(\)\?\.toggle\?\.\('face',p\.hit\)/);
  const tap=direct.slice(direct.indexOf("if(pendingFacePress?.id===event.pointerId)"),direct.indexOf("if(!drag||drag.id!==event.pointerId)return;"));
  assert.doesNotMatch(tap,/bridge\(\)\?\.set\?\.\('face'/);
});

test('491 drag path still uses working selection and existing modelling flow',()=>{
  assert.match(direct,/workingFaces=p\.selectionBefore\.includes\(p\.hit\)\?\[\.\.\.p\.selectionBefore\]:\[\.\.\.p\.selectionBefore,p\.hit\]/);
  assert.match(direct,/beginDirectDrag\(event,p\.hit,p\.selectionBefore,workingFaces\)/);
});

test('491 cache hops main/direct and preserves protected multi-object pin',()=>{
  assertAssetReference(index,'main.js');
  assertAssetReference(index,'multi-face-direct.js');
  assertAssetReference(index,'rotate-transform.js');
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
});
