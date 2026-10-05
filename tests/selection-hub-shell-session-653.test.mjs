import {assetsOrdered} from './helpers/release-contract.mjs';
import {hasAssetReference,shellReleaseMatches} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const proxy=fs.readFileSync(new URL('../src/selection-hub-shell-session.js',import.meta.url),'utf8');
const shell=fs.readFileSync(new URL('../src/shell.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const version=JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8'));

const checks=[
 ['proxy listens only to radial Face Shell',proxy.includes("event.detail?.tool!=='Shell'||event.detail?.mode!=='face'")],
 ['thickness proxies authoritative control',proxy.includes('data-proxy-range="#shellThickness"')&&proxy.includes('data-proxy-output="#shellThicknessOut"')],
 ['apply/cancel proxy authoritative buttons',proxy.includes('data-proxy-click="#shellApplyBtn"')&&proxy.includes('data-proxy-click="#shellCancelBtn"')],
 ['range forwards input/change',proxy.includes("dispatchEvent(new Event('input',{bubbles:true}))")&&proxy.includes("dispatchEvent(new Event('change',{bubbles:true}))")],
 ['palette follows shell session lifecycle',proxy.includes("boxlab-tool-session-change")&&proxy.includes("detail.id!=='shell'")],
 ['Shell owner remains authoritative',shell.includes('function launchShell()')&&shell.includes('shellClosedMesh(live,previewFaces,thickness())')],
 ['proxy loads after Shell owner',assetsOrdered(index,'shell.js','selection-hub-shell-session.js')],
 ['current release',shellReleaseMatches(index,version.version)],
 ['Sweep proxy retained',hasAssetReference(index,'selection-hub-sweep-session.js')],
 ['Face-direct .652 retained',hasAssetReference(index,'multi-face-direct.js')],
 ['protected transform unchanged',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];
for(const [name,ok] of checks)test("selection-hub-shell-session-653.test: "+name,()=>assert.equal(ok,true,name));
