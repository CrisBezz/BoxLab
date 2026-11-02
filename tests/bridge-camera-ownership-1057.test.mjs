import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {installBridgeTopology} from '../src/bridge-topology.js';
test('editor camera survives reflection and cloned perspective camera projection updates',()=>{
 class Mesh {edges(){return [];}}
 installBridgeTopology(Mesh);
 const editor=new THREE.PerspectiveCamera(42,1,.01,100);
 const state=globalThis.__boxlabBridgeState;
 state.camera=editor;state.controls={object:editor};
 for(let cycle=0;cycle<3;cycle++){
  const reflection=new THREE.PerspectiveCamera(90,1,.1,100);
  reflection.updateProjectionMatrix();editor.clone().updateProjectionMatrix();
  assert.equal(state.camera,editor);
  editor.aspect=1.5;editor.updateProjectionMatrix();assert.equal(state.camera,editor);
 }
});
