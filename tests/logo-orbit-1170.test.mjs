import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {FreeOrbitControls} from '../src/free-orbit-controls.js';
import {orbitFromLogo,installProjection,logoSurfaces} from '../src/logo-viewcube.js';
test('1170 real orbit owner rotates shared camera, preserves pivot and exits orthographic',()=>{
 const doc=new EventTarget();doc.documentElement={style:{}};
 const dom=new EventTarget();dom.style={};dom.ownerDocument=doc;dom.getRootNode=()=>doc;dom.clientHeight=600;dom.clientWidth=800;
 const camera=new THREE.PerspectiveCamera(42,1,.01,100);camera.position.set(4,3,4);
 const controls=new FreeOrbitControls(camera,dom);controls.update();
 const target=controls.target.clone(),distance=camera.position.distanceTo(target),before=camera.quaternion.clone();
 installProjection(camera).set(true,8);
 assert.equal(orbitFromLogo({camera,controls},25,12),true);
 assert.ok(before.angleTo(camera.quaternion)>.1);assert.ok(camera.isPerspectiveCamera);
 assert.ok(controls.target.equals(target));assert.ok(Math.abs(camera.position.distanceTo(target)-distance)<1e-8);
 controls.enabled=false;const position=camera.position.clone();assert.equal(orbitFromLogo({camera,controls},20,20),false);assert.ok(camera.position.equals(position));controls.dispose();
});
test('1170 logo has actual finite world-space hollow surfaces for all six directions',()=>{
 const surfaces=logoSurfaces();assert.equal(surfaces.length,144);assert.equal(new Set(surfaces.map(s=>s.view)).size,6);
 for(const s of surfaces)for(const p of s.points)assert.ok([p.x,p.y,p.z].every(Number.isFinite));
});
