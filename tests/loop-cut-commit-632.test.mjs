import {hasAssetReference,shellReleaseMatches} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const mod=fs.readFileSync(new URL('../src/loop-cut-commit.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const checks=[
  ['no synthetic pointer replay',!mod.includes("dispatchEvent(new PointerEvent('pointerdown'")&&!mod.includes("dispatchEvent(new PointerEvent('pointerup'")],
  ['direct edge selection bridge',mod.includes("globalThis.__boxlabSelectionBridge?.set?.('edge', indices)")],
  ['undo/redo loop-slide commit retained',mod.includes("document.querySelector('#undoBtn')?.click()")&&mod.includes("document.querySelector('#redoBtn')?.click()")],
  ['published module reviewed cache pin',hasAssetReference(index,'loop-cut-commit.js')],
  ['current release',shellReleaseMatches(index,version.version)],
  ['protected multi-object transform pin unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];

for(const [name,ok] of checks)test("loop-cut-commit-632.test: "+name,()=>assert.equal(ok,true,name));
