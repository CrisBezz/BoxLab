import {assertBevelOwnerDisarm} from './helpers/direct-bevel-runtime.mjs';
import {hasAssetReference,shellReleaseMatches} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const gate=fs.readFileSync(new URL('../src/pencil-orbit-gate.js',import.meta.url),'utf8');
const bevel=fs.readFileSync(new URL('../src/direct-bevel.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const checks=[
 ['main exposes direct owner',main.includes('globalThis.__boxlabMainDirectTool')&&main.includes('ownsModellingGesture:()=>!!directTool')],
 ['gate reads main direct owner',gate.includes('const mainDirectTool=globalThis.__boxlabMainDirectTool?.active?.()||null')&&gate.includes('mainDirectActive')],
 ['gate blocks modelling owner',gate.includes('const modellingToolActive=faceToolActive||mainDirectActive')&&gate.includes('BLOCK_MODELLING_TOOL')],
 ['Bevel pointerup disarms',bevel.includes("reason:current.preview?'bevel-complete':'bevel-cancel'")&&bevel.includes('disarm();')],
 ['Bevel pointercancel exists',bevel.includes("canvas?.addEventListener('pointercancel'")&&bevel.includes("reason:'bevel-cancel'")],
 ['Exact bevel disarms',bevel.includes("reason:'bevel-exact-complete'")],
 ['Bevel API exposes active/disarm',assertBevelOwnerDisarm],
 ['main reviewed cache pin',hasAssetReference(index,'main.js')],
 ['gate reviewed cache pin',hasAssetReference(index,'pencil-orbit-gate.js')],
 ['bevel reviewed cache pin',hasAssetReference(index,'direct-bevel.js')],
 ['current release',shellReleaseMatches(index,version.version)],
 ['protected transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
for(const [name,ok] of checks)test("direct-tool-ownership-660.test: "+name,()=>typeof ok==='function'?ok():assert.equal(ok,true,name));
