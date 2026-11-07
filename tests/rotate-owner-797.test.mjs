import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as THREE from 'three';
import {rotateOwnerRuntime} from './helpers/rotate-owner-runtime.mjs';
import {checkRotateRouting,checkRotateGizmo,checkLegacyRotateSelection} from './helpers/rotate-owner-checks.mjs';
test('797 original component canvas owners yield with modern puck; explicit gizmo owns Rotate',()=>{checkRotateRouting();checkRotateGizmo();});
test('797 fallback Rotate uses actual bridge component selection when modern gizmo absent',checkLegacyRotateSelection);
test('797 routing mutations reject competing owner and lost gizmo rotation',()=>{
 const source=fs.readFileSync(new URL('../src/transform-upgrade.js',import.meta.url),'utf8');
 const competing=source.replace("if(['vertex','edge','face'].includes(m)&&!gizmo)return;",'');
 assert.throws(()=>checkRotateRouting({upgradeSource:competing}),assert.AssertionError);
 const absent=source.replace("const t=spec.tool,axis=", "const t='missing',axis=");assert.equal(rotateOwnerRuntime({upgradeSource:absent}).begin(380,240),false);
});
