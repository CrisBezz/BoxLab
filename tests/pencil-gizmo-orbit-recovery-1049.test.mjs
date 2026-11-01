import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {rotateOwnerRuntime} from './helpers/rotate-owner-runtime.mjs';

const read=path=>fs.readFileSync(new URL('../'+path,import.meta.url),'utf8');
const main=read('src/main.js');
const snapshot=mesh=>mesh.vertices.map(v=>v.toArray());

test('1049 Pencil orbit claim releases only the matching gizmo transform and restores its unfinished preview',()=>{
 assert.match(main,/cancelGizmoGesture\?\.\(pointerId\)/);
 assert.match(main,/__boxlabActiveGizmoDrag\?\.pointerId===pointerId/);
 const r=rotateOwnerRuntime({mode:'object'}),before=snapshot(r.mesh),p=r.centre();
 assert.equal(r.begin(p.x+50,p.y,{tool:'rotate',constraint:'free',kind:'screen'}),true);
 r.dispatch('pointermove',p.x,p.y+50);
 assert.notDeepEqual(snapshot(r.mesh),before);
 assert.equal(r.c.__boxlabTransformUpgrade.cancelGizmoGesture(2),false);
 assert.equal(r.c.__boxlabTransformUpgrade.cancelGizmoGesture(1),true);
 assert.deepEqual(snapshot(r.mesh),before);
 assert.equal(r.c.gizmoReset,1);
 r.dispatch('pointermove',p.x+90,p.y+20);
 assert.deepEqual(snapshot(r.mesh),before);
});
