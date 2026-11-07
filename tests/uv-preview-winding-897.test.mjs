import test from 'node:test';import assert from 'node:assert/strict';import * as THREE from 'three';
import {comparisonGeometry} from '../evaluations/uv-paint/samples.js';import {EditableMesh} from '../src/mesh.js';import {glbOwnerRuntime} from './helpers/glb-owner-runtime.mjs';
const owner=glbOwnerRuntime().c;
function triangles(g){const p=g.attributes.position,u=g.attributes.uv;return Array.from({length:g.index.count/3},(_,t)=>[0,1,2].map(j=>{const id=g.index.getX(t*3+j);return {p:new THREE.Vector3().fromBufferAttribute(p,id),uv:[u.getX(id),u.getY(id)]};}));}
test('897 every paint sphere/cube triangle and computed normal faces outward, with front-side nearest external hits around the complete model',()=>{
 for(const kind of ['sphere','cube']){const geometry=comparisonGeometry(kind,owner),normal=geometry.attributes.normal,position=geometry.attributes.position;
  for(const tri of triangles(geometry)){const [a,b,c]=tri.map(v=>v.p),n=b.clone().sub(a).cross(c.clone().sub(a)),centre=a.clone().add(b).add(c).multiplyScalar(1/3);assert(n.dot(centre)>0,kind+' triangle inward');}
  for(let i=0;i<normal.count;i++)assert(new THREE.Vector3().fromBufferAttribute(normal,i).dot(new THREE.Vector3().fromBufferAttribute(position,i))>0,kind+' normal inward');
  const mesh=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial());mesh.updateMatrixWorld();
  for(const direction of [[1,.23,.31],[-1,.23,.31],[.23,1,.31],[.23,-1,.31],[.23,.31,1],[.23,.31,-1]]){const d=new THREE.Vector3(...direction).normalize(),ray=new THREE.Raycaster(d.clone().multiplyScalar(4),d.clone().negate()),hit=ray.intersectObject(mesh)[0];assert(hit);assert(hit.point.dot(d)>.7,'hit must be near exterior rather than far inner wall');assert(hit.face.normal.dot(d)>0);}
  mesh.material.dispose();geometry.dispose();
 }
 const plane=comparisonGeometry('plane',owner);for(const tri of triangles(plane)){const [a,b,c]=tri.map(v=>v.p);assert(b.clone().sub(a).cross(c.clone().sub(a)).z>0);}plane.dispose();
});
test('897 shared preview preserves arbitrary source polygon winding, concave/reversed faces and corresponding UV corners without source mutation or forced outward inference',()=>{
 const shape=[[0,0],[2,0],[2,1],[1,1],[1,2],[0,2]],rot=new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(.4,.7,.3));
 for(const reverse of [false,true]){const mesh=new EditableMesh(shape.map(([x,y])=>new THREE.Vector3(x,y,0).applyMatrix4(rot)),[reverse?[5,4,3,2,1,0]:[0,1,2,3,4,5]]),uvCorners=[mesh.faces[0].map(id=>shape[id].map(v=>v/2))],payload={version:1,source:'boxlab',uvTopologySignature:owner.topologySignature(mesh),uvCorners},before=JSON.stringify({mesh,payload}),g=owner.buildUVPreviewGeometry(mesh,payload),source=mesh.faceNormal(0);
  assert.equal(g.index.count,12);for(const tri of triangles(g)){const [a,b,c]=tri.map(v=>v.p);assert(b.clone().sub(a).cross(c.clone().sub(a)).dot(source)>0);for(const corner of tri){const local=mesh.faces[0].findIndex(id=>mesh.vertices[id].distanceTo(corner.p)<1e-6);assert(local>=0);assert.deepEqual(corner.uv,uvCorners[0][local].map(Math.fround));}}
  assert.equal(JSON.stringify({mesh,payload}),before);g.dispose();
 }
});
test('897 winding correction is explicitly preview-only; ordinary export geometry and triangle/corner sets remain unchanged',()=>{
 const mesh=EditableMesh.cube(2),uvCorners=mesh.faces.map((f,i)=>f.map((_,j)=>[i/8,j/8])),payload={version:1,source:'boxlab',uvTopologySignature:owner.topologySignature(mesh),uvCorners},preview=owner.buildUVPreviewGeometry(mesh,payload),legacy=owner.editableToGeometry(mesh,{uvs:uvCorners,preserveUVSeams:true}).geometry,explicit=owner.editableToGeometry(mesh,{uvs:uvCorners,preserveUVSeams:true,preserveFaceWinding:false}).geometry;
 assert.deepEqual([...legacy.index.array],[...explicit.index.array]);assert.deepEqual([...legacy.attributes.position.array],[...explicit.attributes.position.array]);assert.deepEqual([...legacy.attributes.uv.array],[...explicit.attributes.uv.array]);
 const sets=g=>triangles(g).map(tri=>tri.map(v=>[...v.p.toArray(),...v.uv].join(',')).sort().join('|')).sort();assert.deepEqual(sets(preview),sets(legacy));assert.equal(preview.index.count,legacy.index.count);
 preview.dispose();legacy.dispose();explicit.dispose();
});
