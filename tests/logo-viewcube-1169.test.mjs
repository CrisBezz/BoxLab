import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {installProjection} from '../src/logo-viewcube.js';
test('1169 shared camera orthographic rays stay parallel, zoom and restore perspective',()=>{
 const camera=new THREE.PerspectiveCamera(42,1.5,.01,100);camera.position.z=10;camera.updateMatrixWorld();
 const initial=camera.projectionMatrix.clone(),projection=installProjection(camera);
 projection.set(true,8);assert.equal(camera.isOrthographicCamera,true);
 const ray=new THREE.Raycaster();ray.setFromCamera(new THREE.Vector2(-.5,0),camera);const left=ray.ray.clone();
 ray.setFromCamera(new THREE.Vector2(.5,0),camera);assert.ok(left.direction.distanceTo(ray.ray.direction)<1e-8);assert.ok(left.origin.distanceTo(ray.ray.origin)>1);
 camera.zoom=2;camera.updateProjectionMatrix();assert.equal(camera.projectionMatrix.elements[0],1/3);
 projection.set(false);assert.equal(camera.isPerspectiveCamera,true);assert.ok(camera.projectionMatrix.equals(initial));
});
