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
 assert.equal(reference.material.transparent,false);
 assert.equal(reference.material.depthWrite,true);
 assert.equal(output.material.isMeshBasicMaterial,true);
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
