import {hasAssetReference,shellReleaseMatches} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const giz=fs.readFileSync(new URL('../src/total-gizmo.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const checks=[
 ['availability sync function',giz.includes('function syncContextToolAvailability()')],
 ['disabled derives from target.disabled',giz.includes('const unavailable=!target||!!target.disabled;')],
 ['sector disabled mirrors target',giz.includes('sector.disabled=unavailable;')],
 ['unavailable class',giz.includes("sector.classList.toggle('tg-tool-unavailable',unavailable)")],
 ['active class mirrors target',giz.includes("target.classList.contains('active')")&&giz.includes("tg-tool-active")],
 ['ring open sync',giz.includes("if(next==='tools')syncContextToolAvailability();")],
 ['click guard',giz.includes('if(button.disabled)return;')],
 ['disabled styling',giz.includes('.tg-tool-sector.tg-tool-unavailable')],
 ['active styling',giz.includes('.tg-tool-sector.tg-tool-active')],
 ['gizmo reviewed cache pin',hasAssetReference(index,'total-gizmo.js')],
 ['current release',shellReleaseMatches(index,version.version)],
 ['main .657 retained',hasAssetReference(index,'main.js')],
 ['Shell retained',hasAssetReference(index,'selection-hub-shell-session.js')],
 ['protected transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
for(const [name,ok] of checks)test("selection-hub-availability-658.test: "+name,()=>assert.equal(ok,true,name));
