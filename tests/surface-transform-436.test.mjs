import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import fs from 'node:fs';
import {EditableMesh} from '../src/mesh.js';
import {surfaceTransformMesh,cycleSurfaceTransformMode} from '../src/surface-transform-core.js';

function approxVec(a,b,eps=1e-7){return a.distanceTo(b)<=eps;}

test('436 mode cycle follows Move Rotate Scale Move',()=>{
  assert.equal(cycleSurfaceTransformMode('move'),'rotate');
  assert.equal(cycleSurfaceTransformMode('rotate'),'scale');
  assert.equal(cycleSurfaceTransformMode('scale'),'move');
});

test('436 surface transform aligns source +Y to target normal around placement point',()=>{
  const source=EditableMesh.cube(2);
  const center=new THREE.Vector3(0,0,0);
  const point=new THREE.Vector3(3,4,5);
  const normal=new THREE.Vector3(1,1,1).normalize();
  const transformed=surfaceTransformMesh(source,{sourceCenter:center,point,normal,spin:0,scale:1});
  assert.ok(transformed);
  const top=new THREE.Vector3(0,1,0);
  const expected=point.clone().add(normal);
  const q=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),normal);
  const actual=top.clone().applyQuaternion(q).add(point);
  assert.ok(approxVec(actual,expected));
});

test('436 placement preserves mesh topology while move rotate scale change coordinates only',()=>{
  const source=EditableMesh.cube(2);
  const out=surfaceTransformMesh(source,{
    point:new THREE.Vector3(2,-1,4),
    normal:new THREE.Vector3(.2,.9,.3).normalize(),
    spin:THREE.MathUtils.degToRad(37),
    scale:1.7
  });
  assert.equal(out.vertices.length,source.vertices.length);
  assert.deepEqual(out.faces,source.faces);
  assert.equal(out.creases.size,source.creases.size);
  assert.ok(out.vertices.some((v,i)=>!v.equals(source.vertices[i])));
});

test('436 UI owns a surface-relative transactional Tool Session',()=>{
  const ui=fs.readFileSync(new URL('../src/surface-transform.js',import.meta.url),'utf8');
  const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const beta4=JSON.parse(fs.readFileSync(new URL('../beta-4/version.json',import.meta.url),'utf8'));
  assert.ok(ui.includes('Tap a target face'));
  assert.ok(ui.includes("event.pointerType==='touch'"));
  assert.ok(ui.includes('cycleSurfaceTransformMode(mode)'));
  assert.ok(ui.includes('state.point.copy(hit.point)'));
  assert.ok(ui.includes('state.normal.copy(hit.normal)'));
  assert.ok(ui.includes('checkpointSnapshot?.(beforeScene)'));
  assert.ok(ui.includes("id:'surface-transform'"));
  assert.ok(index.includes('src/surface-transform.js?v=0.36.18.441'));
  assert.equal(beta4.version,'0.36.18.427');
});


test('437 face-to-face placement maps source face centre to target point and opposes normals',()=>{
  const source=EditableMesh.cube(2);
  const sourceFaceIndex=0;
  const sourceAnchor=source.faceCenter(sourceFaceIndex);
  const sourceNormal=source.faceNormal(sourceFaceIndex).normalize();
  const targetPoint=new THREE.Vector3(3,2,-4);
  const targetNormal=new THREE.Vector3(.3,.8,-.5).normalize();
  const out=surfaceTransformMesh(source,{
    sourceAnchor,sourceNormal,
    point:targetPoint,normal:targetNormal,
    spin:0,scale:1,oppose:true
  });
  assert.ok(out);
  const transformedAnchor=sourceAnchor.clone()
    .sub(sourceAnchor)
    .applyQuaternion(new THREE.Quaternion().setFromUnitVectors(sourceNormal,targetNormal.clone().negate()))
    .add(targetPoint);
  assert.ok(approxVec(transformedAnchor,targetPoint));
  const mappedNormal=sourceNormal.clone()
    .applyQuaternion(new THREE.Quaternion().setFromUnitVectors(sourceNormal,targetNormal.clone().negate()))
    .normalize();
  assert.ok(mappedNormal.dot(targetNormal)<-0.999999);
});

test('437 UI requires source face then target face before placement',()=>{
  const ui=fs.readFileSync(new URL('../src/surface-transform.js',import.meta.url),'utf8');
  assert.ok(ui.includes("phase='source'"));
  assert.ok(ui.includes('sourceFaceHit(event)'));
  assert.ok(ui.includes("phase='target'"));
  assert.ok(ui.includes('targetFaceHit(event)'));
  assert.ok(ui.includes('sourceAnchor:sourceFace?.center||sourceCenter'));
  assert.ok(ui.includes('sourceNormal:sourceFace?.normal'));
  assert.ok(ui.includes('oppose:true'));
  assert.ok(ui.includes('face-to-face'));
});
