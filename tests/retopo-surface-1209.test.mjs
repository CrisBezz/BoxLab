import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {createRetopoSurface,nearestRetopoVertex} from '../src/retopo-surface.js';
const rect={left:0,top:0,width:800,height:800};
function camera(){const c=new THREE.PerspectiveCamera(45,1,.01,100);c.position.set(0,0,5);c.lookAt(0,0,0);c.updateMatrixWorld();return c;}
test('Retopo projects to nearest reference shell without mutating source; disposal and misses are safe',()=>{
 const source=EditableMesh.cube(),before=JSON.stringify(source),surface=createRetopoSurface(source),c=camera();
 const hit=surface.hit(c,rect,400,400);assert.ok(hit);assert.ok(Math.abs(hit.point.z-1)<1e-7);assert.equal(surface.hit(c,rect,0,0),null);assert.equal(JSON.stringify(source),before);
 surface.dispose();surface.dispose();assert.equal(surface.hit(c,rect,400,400),null);
});
test('Retopo refuses empty/nonfinite/oversized reference geometry before allocating a picker',()=>{
 for(const m of [new EditableMesh([],[]),new EditableMesh([[NaN,0,0]],[[0,0,0]]),{faces:Array(250001).fill([0,1,2])}])assert.throws(()=>createRetopoSurface(m));
});
test('Retopo vertex picking distinguishes front and back shells and respects pixel radius',()=>{
 const c=camera(),s=createRetopoSurface(EditableMesh.cube()),h=s.hit(c,rect,400,400);
 assert.equal(nearestRetopoVertex(new EditableMesh([[0,0,-1],[0,0,1]],[]),c,rect,400,400,h),1);
 assert.equal(nearestRetopoVertex(new EditableMesh([[0,0,-1]],[]),c,rect,400,400,h),null);
 assert.equal(nearestRetopoVertex(new EditableMesh([[1,0,1]],[]),c,rect,400,400,h),null);s.dispose();
});
