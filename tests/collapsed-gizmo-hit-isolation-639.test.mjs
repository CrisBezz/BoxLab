import {hasAssetReference,shellReleaseMatches} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const gizmo=fs.readFileSync(new URL('../src/total-gizmo.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));
const checks=[
 ['collapsed SVG removed from hit-testing',gizmo.includes('#totalGizmo[data-expanded="false"] svg{display:none!important}')],
 ['collapsed handle runtime guard',gizmo.includes("mode!=='object'&&!expanded")&&gizmo.includes('GIZMO HANDLE REJECT COLLAPSED')],
 ['dormant puck remains outside SVG',gizmo.indexOf('class="tg-activator"')<gizmo.indexOf('<svg')],
 ['published total-gizmo reviewed cache pin',hasAssetReference(index,'total-gizmo.js')],
 ['current release',shellReleaseMatches(index,version.version)],
 ['protected multi unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
for(const [name,ok] of checks)test("collapsed-gizmo-hit-isolation-639.test: "+name,()=>assert.equal(ok,true,name));
