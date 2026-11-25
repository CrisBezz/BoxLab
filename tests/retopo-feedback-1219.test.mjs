import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {quadStrokeCorners} from '../src/retopo-stroke.js';
import {applyRetopoDisplay} from '../src/retopo-display.js';

test('recognizes a small quad and a loose, nearly closed Pencil outline',()=>{
 const fit=points=>quadStrokeCorners(points.map(([x,y])=>({x,y})));
 assert.equal(fit([[0,0],[11,0],[11,12],[0,12],[1,1]])?.length,4);
 assert.equal(fit([[0,0],[28,-5],[60,0],[65,25],[60,50],[25,56],[0,50],[-4,23],[-2,14]])?.length,4);
 assert.equal(fit([[0,0],[60,0],[60,50],[0,50],[0,35]]),null);
});

test('Retopo fill clears the reference depth and outlines only front-facing polygon edges',()=>{
 const mesh=new EditableMesh([[-1,-1,0],[1,-1,0],[1,1,.2],[-1,1,0]].map(p=>new THREE.Vector3(...p)),[[0,1,2,3]]);
 const reference=new THREE.Mesh(mesh.triangulatedGeometry()),output=new THREE.Mesh(mesh.triangulatedGeometry());
 const session={active:true,referenceId:1,retopoId:2};
 applyRetopoDisplay(reference,1,mesh,session);applyRetopoDisplay(output,2,mesh,session);
 assert.equal(reference.material.uniforms.referenceColor.value.getHex(),0xd8d5d0);
 assert.equal(reference.geometry.getAttribute('retopoNormal').count,6);
 const original = reference.geometry.getAttribute('normal');
 const smooth = reference.geometry.getAttribute('retopoNormal');
 assert.notEqual(original,smooth);
 assert.deepEqual([smooth.getX(0),smooth.getY(0),smooth.getZ(0)],
   [smooth.getX(3),smooth.getY(3),smooth.getZ(3)]);
 applyRetopoDisplay(reference,1,mesh,session);
 assert.equal(reference.geometry.getAttribute('retopoNormal'),smooth);
 assert.equal(reference.geometry.getAttribute('normal'),original);
 assert.equal(reference.material.toneMapped,false);
 assert.equal(reference.material.transparent,false);
 assert.equal(reference.material.depthWrite,true);
 assert.equal(output.material.isMeshBasicMaterial,true);
 assert.equal(output.material.color.getHex(),0xf3b34a);
 assert.equal(output.material.depthTest,false);
 const edges=output.children[0],camera=new THREE.PerspectiveCamera();
 const renderer={getViewport(rect){return rect.set(0,0,800,600);}};
 camera.position.z=5;edges.onBeforeRender(renderer,null,camera);
 assert.equal(edges.geometry.instanceCount,4);
 camera.position.z=-5;edges.onBeforeRender(renderer,null,camera);
 assert.equal(edges.geometry.instanceCount,0);
 output.userData.boxlabRetopoCleanup();
 assert.equal(output.renderOrder,0);
 assert.equal(output.children.length,0);
});
