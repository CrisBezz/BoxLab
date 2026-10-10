import assert from 'node:assert/strict';
import * as THREE from 'three';
import {rotateOwnerRuntime} from './rotate-owner-runtime.mjs';
const snapshot=mesh=>mesh.vertices.map(v=>v.toArray());
export function checkRotateRouting(options={}){
 for(const mode of ['vertex','edge','face'])for(const tool of ['move','scale','rotate']){
  const r=rotateOwnerRuntime({mode,ids:mode==='vertex'?[0,1]:[0],tool,...options}),before=snapshot(r.mesh);
  const down=r.dispatch('pointerdown',5,5);r.dispatch('pointermove',200,80);r.dispatch('pointerup',200,80);
  assert.equal(down.stopped,undefined);assert.equal(r.captured(),null);assert.deepEqual(snapshot(r.mesh),before);assert.equal(r.history.undoStack.length,0);
 }
}
export function checkRotateGizmo(){
 for(const mode of ['vertex','edge','face','object']){
  const ids=mode==='vertex'?[0,1]:[0],r=rotateOwnerRuntime({mode,ids}),before=snapshot(r.mesh),p=r.centre();
  assert.equal(r.begin(p.x+60,p.y),true);r.c.__boxlabActiveGizmoDrag={tool:'rotate',constraint:'z'};
  r.dispatch('pointermove',p.x,p.y+60);r.dispatch('pointermove',p.x,p.y+60);
  const selected=mode==='vertex'?ids:mode==='edge'?(()=>{const e=r.mesh.edges()[0];return[e.a,e.b];})():mode==='face'?r.mesh.faces[0]:r.mesh.vertices.map((_,i)=>i);
  const centre=new THREE.Vector3();for(const id of selected)centre.add(new THREE.Vector3(...before[id]));centre.divideScalar(selected.length);
  const q=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),Math.PI/2);
  r.mesh.vertices.forEach((v,i)=>{const expected=new THREE.Vector3(...before[i]);if(selected.includes(i))expected.sub(centre).applyQuaternion(q).add(centre);assert.ok(v.distanceTo(expected)<1e-9);});
  assert.equal(r.history.undoStack.length,1);r.dispatch('pointerup',p.x,p.y+60);assert.deepEqual(r.selected(),ids);assert.equal(r.events.filter(e=>e.type==='boxlab-transform-end').length,mode==='object'?0:1);
  const after=snapshot(r.mesh),undone=r.history.undo(r.mesh);assert.deepEqual(snapshot(undone),before);assert.deepEqual(snapshot(r.history.redo(undone)),after);
 }
}
export function checkLegacyRotateSelection(){
 for(const mode of ['vertex','edge','face']){
  const ids=mode==='vertex'?[0,1]:[0],r=rotateOwnerRuntime({mode,ids,visible:false}),before=snapshot(r.mesh),p=r.centre();
  r.c.__boxlabBridgeState.selectedFaces=[999];r.dispatch('pointerdown',p.x+60,p.y);r.dispatch('pointermove',p.x,p.y+60);r.dispatch('pointerup',p.x,p.y+60);
  assert.notDeepEqual(snapshot(r.mesh),before);assert.equal(r.history.undoStack.length,1);assert.deepEqual(r.selected(),ids);assert.equal(r.events.at(-1).detail.owner,'rotate-transform');
 }
}
