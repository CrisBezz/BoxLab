import {assertSweepLaunch} from './helpers/sweep-hub-runtime.mjs';
import {assetsOrdered} from './helpers/release-contract.mjs';
import {hasAssetReference,shellReleaseMatches} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const hub=fs.readFileSync(new URL('../src/total-gizmo.js',import.meta.url),'utf8');
const sweep=fs.readFileSync(new URL('../src/selection-hub-sweep-session.js',import.meta.url),'utf8');
const sweepOwner=fs.readFileSync(new URL('../src/sweep-path.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const checks=[
 ['hub emits semantic tool launch event',hub.includes("boxlab-selection-hub-tool")&&hub.includes("tool:toolLabel")],
 ['Sweep proxy accepts radial Face/Edge Sweep',assertSweepLaunch],
 ['Profile stage proxies existing controls',sweep.includes('#sweepStageProfile')&&sweep.includes('#sweepProfileCircle')&&sweep.includes('#sweepProfileUseSelection')],
 ['Path stage proxies existing controls',sweep.includes('#sweepStagePath')&&sweep.includes('#sweepFollowEdges')&&sweep.includes('#sweepDrawPath')],
 ['Finish proxies authoritative Apply/Cancel',sweep.includes('#sweepApplyBtn')&&sweep.includes('#sweepCancelBtn')],
 ['range proxies forward events',sweep.includes("target.dispatchEvent(new Event('input',{bubbles:true}))")&&sweep.includes("target.dispatchEvent(new Event('change',{bubbles:true}))")],
 ['existing Sweep owner unchanged by proxy',sweepOwner.includes('function applySweep()')&&sweepOwner.includes('function cancelSweepSession')],
 ['new session module published after sweep owner',assetsOrdered(index,'sweep-path.js','selection-hub-sweep-session.js')],
 ['Total Gizmo reviewed cache pin',hasAssetReference(index,'total-gizmo.js')],
 ['current release',shellReleaseMatches(index,version.version)],
 ['protected multi transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
for(const [name,ok] of checks)test("selection-hub-sweep-session-643.test: "+name,()=>typeof ok==='function'?ok():assert.equal(ok,true,name));
