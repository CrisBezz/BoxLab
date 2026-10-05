import {hasAssetReference,shellReleaseMatches} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const gizmo=fs.readFileSync(new URL('../src/total-gizmo.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

const checks=[
  ['version stamp',gizmo.includes('v0.36.18.570 — Total Gizmo v1')],
  ['object mode gate',gizmo.includes("currentMode()!=='object'")],
  ['free move center',gizmo.includes('data-tool="move" data-constraint="free" data-kind="free"')],
  ['screen rotate ring',gizmo.includes('data-tool="rotate" data-constraint="free" data-kind="screen"')],
  ['uniform scale ring',gizmo.includes('data-tool="scale" data-constraint="free" data-kind="uniform"')],
  ['axis move x/y/z',['x','y','z'].every(a=>gizmo.includes(`data-tool="move" data-constraint="${a}"`))],
  ['axis scale x/y/z',['x','y','z'].every(a=>gizmo.includes(`class="tg-handle tg-scale-node tg-${a}" data-tool="scale" data-constraint="${a}"`))],
  ['fat invisible hit zones',gizmo.includes("hit.style.strokeWidth='16'")],
  ['hover proxy',gizmo.includes('hover-proxy')],
  ['live transform HUD',gizmo.includes("const hud=root.querySelector('.tg-hud')")&&gizmo.includes('new MutationObserver')],
  ['touch/Pencil forwarding',gizmo.includes("pointerType:'pen'")],
  ['projected axis template',gizmo.includes('syncAxisVisuals(center,camera)')],
  ['published module pin',hasAssetReference(index,'total-gizmo.js')],
  ['release version',shellReleaseMatches(index,JSON.parse(fs.readFileSync(new URL('../version.json',import.meta.url),'utf8')).version)],
  ['protected transform pin',index.includes('src/multi-object-transform.js?v=0.36.1.0')]
];

for(const [name,ok] of checks)test("total-gizmo-570.test: "+name,()=>assert.equal(ok,true,name));
