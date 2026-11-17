import test from 'node:test';import assert from 'node:assert/strict';import * as THREE from 'three';
import {EditableMesh} from './helpers/modelling-combinations-runtime.mjs';import {knifeScreenRuntime} from './helpers/knife-screen-runtime.mjs';
const snapshot=m=>JSON.stringify({v:m.vertices,f:m.faces,g:m.faceGroups,c:[...m.creases]});
function fixture(gap=false){const vertices=[];for(const y of [-1,1])for(const x of [-1.5,-.5,.5,1.5])vertices.push(new THREE.Vector3(x,y,0));const mesh=new EditableMesh(vertices,gap?[[0,1,5,4],[2,3,7,6]]:[[0,1,5,4],[1,2,6,5],[2,3,7,6]]);const camera=new THREE.OrthographicCamera(-2,2,2,-2,.1,100);camera.position.z=8;camera.updateMatrixWorld();const f=knifeScreenRuntime(mesh,camera),a=f.point(0,4,.4),b=f.point(3,7,.65);a.x+=2;b.x-=2;return{mesh,f,a,b};}
test('1184 preview marks both crossings and counts three faces without touching mesh/history',()=>{
 const {mesh,f,a,b}=fixture(),before=snapshot(mesh);f.arm();f.pointer('pointerdown',a);f.pointer('pointermove',b);
 assert.equal([...f.markers].filter(n=>n.className==='knife-crossing-marker').length,2);assert([...f.markers].some(n=>n.className?.includes('knife-preview-valid')));assert.match(f.node('#selectionStatus').textContent,/3 faces/);assert.equal(snapshot(mesh),before);assert.equal(f.ctx.__boxlabHistory.undoStack.length,0);
 f.pointer('pointerup',b);assert.equal(mesh.faces.length,6);assert.equal(f.ctx.__boxlabHistory.undoStack.length,1);assert.equal(f.markers.size,0);
});
test('1184 gap path is red before release and leaves mesh/redo unchanged on refusal',()=>{
 const {mesh,f,a,b}=fixture(true),before=snapshot(mesh);f.ctx.__boxlabHistory.redoStack.push(mesh.clone());f.arm();f.pointer('pointerdown',a);f.pointer('pointermove',b);assert([...f.markers].some(n=>n.className?.includes('knife-preview-invalid')&&n.style.cssText.includes('#ff6767')));assert.match(f.node('#selectionStatus').textContent,/invalid path/);assert.equal(snapshot(mesh),before);f.pointer('pointerup',b);assert.equal(snapshot(mesh),before);assert.equal(f.ctx.__boxlabHistory.undoStack.length,0);assert.equal(f.ctx.__boxlabHistory.redoStack.length,1);assert.equal(f.markers.size,0);
});
test('1184 queued previews coalesce and cancellation prevents late markers',()=>{
 const {f,a,b}=fixture(),frames=new Map();let serial=0;f.ctx.requestAnimationFrame=fn=>{frames.set(++serial,fn);return serial;};f.ctx.cancelAnimationFrame=id=>frames.delete(id);f.arm();f.pointer('pointerdown',a);f.pointer('pointermove',b);f.pointer('pointermove',b);assert.equal(frames.size,1);const callback=[...frames.values()][0];frames.clear();callback();assert.equal([...f.markers].filter(n=>n.className==='knife-crossing-marker').length,2);f.pointer('pointermove',b);f.pointer('pointercancel',b);assert.equal(frames.size,0);assert.equal(f.markers.size,0);callback();assert.equal(f.markers.size,0);
});
