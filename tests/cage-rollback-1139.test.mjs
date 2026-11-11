import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8'),source=read('src/main.js'),line=n=>source.split('\n').find(s=>s.startsWith('function '+n+'('));
test('1139 actual cage owner exactly restores protected1137 and does not load the rejected experiment',()=>{
 const old=read('tests/fixtures/performance/cage-selection-1137.js').split('\n').find(s=>s.startsWith('function addCage('));assert.equal(line('addCage'),old);
 assert(!source.includes('cage-selection-1138.js'));assert(!line('addCage').includes('new Set(selectionIndices())'));
});
test('1139 original selected-edge overlay owner builds real geometry and retains axis style, placement, render order and disposal',()=>{
 const mesh=EditableMesh.cube(),root=new THREE.Group(),materials=Object.fromEntries(['x','y','z','neutral'].map(k=>[k,new THREE.MeshBasicMaterial({depthTest:false})])),c={THREE,mesh,root,axisOverlayMaterials:materials};vm.createContext(c);vm.runInContext(line('addSelectedEdgeOverlay')+'\n'+line('clearGroup'),c);
 for(const [a,b,axis] of [[0,1,'x'],[0,3,'y'],[0,4,'z'],[1,3,'neutral']])c.addSelectedEdgeOverlay(a,b,axis);
 assert.equal(root.children.length,4);for(const o of root.children){assert(o.geometry.isBufferGeometry);assert(o.geometry.attributes.position.count>40);assert.equal(o.userData.kind,'edge-selection-overlay');assert.equal(o.userData.screenPixels,2.2);assert.equal(o.userData.screenShape,'edge');assert.equal(o.renderOrder,30);assert.equal(o.material.depthTest,false);}
 const first=root.children[0];assert.equal(first.material,materials.x);assert.deepEqual(first.position.toArray(),[0,-1,-1]);let disposed=0;root.children.forEach(o=>o.geometry.addEventListener('dispose',()=>disposed++));c.clearGroup(root);assert.equal(disposed,4);assert.equal(root.children.length,0);Object.values(materials).forEach(m=>m.dispose());
});
