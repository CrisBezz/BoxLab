import {assertBevelRadialLaunch} from './helpers/bevel-session-runtime.mjs';
import {assertBevelOwnerDisarm} from './helpers/direct-bevel-runtime.mjs';
import {assetsOrdered} from './helpers/release-contract.mjs';
import {shellReleaseMatches} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const session=fs.readFileSync(new URL('../src/selection-hub-bevel-session.js',import.meta.url),'utf8');
const direct=fs.readFileSync(new URL('../src/direct-bevel.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const checks=[
 ['radial semantic launch',assertBevelRadialLaunch],
 ['width proxy',session.includes('data-proxy-range="#bevelWidth"')],
 ['segments proxy',session.includes('data-proxy-range="#bevelSegments"')],
 ['readout proxies',session.includes('#bevelWidthOut')&&session.includes('#bevelSegmentsOut')],
 ['captured launch selection',session.includes('launchSelection=currentEdgeSelection()')],
 ['exact delegates to owner',session.includes('__boxlabDirectBevel?.applyExact?.(width,launchSelection)')],
 ['cancel disarms owner',session.includes('__boxlabDirectBevel?.disarm?.()')],
 ['completion hides palette',session.includes("reason==='bevel-complete'")&&session.includes("reason==='bevel-exact-complete'")],
 ['direct owner active available',assertBevelOwnerDisarm],
 ['session loaded after direct bevel',assetsOrdered(index,'direct-bevel.js','selection-hub-bevel-session.js')],
 ['current release',shellReleaseMatches(index,version.version)],
 ['protected transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
for(const [name,ok] of checks)test("selection-hub-bevel-session-662.test: "+name,()=>typeof ok==='function'?ok():assert.equal(ok,true,name));
