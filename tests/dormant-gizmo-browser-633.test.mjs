import {hasAssetReference,shellReleaseMatches} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const gizmo=fs.readFileSync(new URL('../src/total-gizmo.js',import.meta.url),'utf8');
const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const paint=fs.readFileSync(new URL('../src/edge-paint-select.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const checks=[
  ['component gizmo has dormant activator puck',gizmo.includes('class="tg-activator"')&&gizmo.includes("data-expanded")],
  ['selection change collapses component gizmo',gizmo.includes("setExpanded(mode==='object',{reason:'selection-change'})")],
  ['object mode keeps full gizmo',gizmo.includes("expanded=mode==='object'?true:!!next")],
  ['transform controls can expand component gizmo',gizmo.includes("reason:'transform-control'")],
  ['puck can expand component gizmo',gizmo.includes("reason:'puck'")],
  ['main exposes modeless browser ownership',main.includes('globalThis.__boxlabModelessSelection')&&main.includes('browsing:')],
  ['Paint Select yields to active browser',paint.includes('PAINT YIELD TO BROWSER')&&paint.includes('__boxlabModelessSelection?.browsing?.')],
  ['published pins .633',hasAssetReference(index,'total-gizmo.js')&&hasAssetReference(index,'main.js')&&hasAssetReference(index,'edge-paint-select.js')],
  ['current release',shellReleaseMatches(index,version.version)],
  ['protected multi-object transform pin unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];

for(const [name,ok] of checks)test("dormant-gizmo-browser-633.test: "+name,()=>assert.equal(ok,true,name));
