import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {createCageBatch,addMirrorCageBatch} from '../src/cage-render-batches.js';
function cage(){
 const mesh=EditableMesh.cube(1),root=new THREE.Group(),batch=createCageBatch(),material=new THREE.LineBasicMaterial(),markerMaterial=new THREE.MeshBasicMaterial();
 mesh.edges().forEach((e,index)=>{const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints([mesh.vertices[e.a],mesh.vertices[e.b]]),material);line.userData={kind:'edge',index};batch.edge(line,material);root.add(line);});
 mesh.vertices.forEach((v,index)=>{const dot=new THREE.Mesh(batch.sphereGeometry,markerMaterial);dot.position.copy(v);dot.scale.setScalar(.05);dot.userData={kind:'vertex',index};batch.vertex(dot,markerMaterial);root.add(dot);});batch.finish(root);addMirrorCageBatch(root,mesh,material);
 const body=new THREE.Mesh(mesh.triangulatedGeometry(),new THREE.MeshBasicMaterial({side:THREE.DoubleSide}));body.userData.kind='body';root.add(body);root.updateMatrixWorld(true);return{root,mesh,body};
}
function runtime(scene){
 const frames=new Map(),events=new Map();let next=0;
 const c={__boxlabBridgeState:{scene},document:{querySelector:()=>null,dispatchEvent(){} ,addEventListener:(name,fn)=>events.set(name,fn)},window:{addEventListener:(name,fn)=>events.set(name,fn)},performance:{now:()=>1000},CustomEvent:class{constructor(type,opts){this.type=type;this.detail=opts?.detail;}},setInterval:()=>1,clearInterval(){},queueMicrotask:fn=>fn(),requestAnimationFrame:fn=>{frames.set(++next,fn);return next;},cancelAnimationFrame:id=>frames.delete(id)};
 vm.createContext(c);vm.runInContext(fs.readFileSync(new URL('../src/clean-view.js',import.meta.url),'utf8'),c);
 return{api:c.__boxlabCleanView,frames,events,frame(){const [id,fn]=frames.entries().next().value;frames.delete(id);fn();}};
}
test('845 Clean hides actual batched cage lines/markers/mirrors and legacy overlays while leaving surface and picking unchanged',()=>{
 const {root,mesh,body}=cage(),scene=new THREE.Scene();scene.add(root);const r=runtime(scene),before=mesh.vertices.map(v=>v.toArray());
 const ray=new THREE.Raycaster(new THREE.Vector3(.5,.5,3),new THREE.Vector3(0,0,-1));ray.params.Line.threshold=.03;
 const proxies=root.children.filter(o=>['edge','vertex'].includes(o.userData.kind));const hits=()=>ray.intersectObjects(proxies,false).map(h=>[h.object.userData.kind,h.object.userData.index,h.distance]);const oldHits=hits();assert(oldHits.length);
 assert.equal(root.children.filter(o=>o.material?.visible!==false&&o!==body).length,3);
 r.api.setEnabled(true);assert.equal(r.api.enabled,true);for(const o of root.children)if(o!==body)assert.equal(o.visible,false,o.userData.kind);assert.equal(body.visible,true);
 assert.deepEqual(hits(),oldHits);assert.deepEqual(mesh.vertices.map(v=>v.toArray()),before);
 r.api.setEnabled(false);for(const o of root.children)assert.equal(o.visible,true,o.userData.kind);assert.equal(r.frames.size,0);
});
test('845 Clean Off restores prior visibility without revealing suppressed groups, hidden objects or unrelated overlays',()=>{
 const {root,body}=cage(),scene=new THREE.Scene();scene.add(root);const batches=root.children.filter(o=>o.userData.kind.startsWith('cage-'));batches.forEach(o=>o.visible=false);
 const guide=new THREE.Object3D();guide.userData.kind='guide';guide.visible=false;root.add(guide);body.visible=false;
 const selection=new THREE.Object3D();selection.userData.kind='edge-selection-overlay';root.add(selection);const r=runtime(scene);
 r.api.setEnabled(false);batches.forEach(o=>assert.equal(o.visible,false));
 r.api.setEnabled(true);r.api.apply();r.api.setEnabled(false);batches.forEach(o=>assert.equal(o.visible,false));assert.equal(body.visible,false);assert.equal(guide.visible,false);assert.equal(selection.visible,true);
});
test('845 Clean remains effective after native cage rebuild and bridge/render events, with reversible repeated toggles',()=>{
 const scene=new THREE.Scene(),first=cage();scene.add(first.root);const r=runtime(scene);r.api.setEnabled(true);
 const rebuilt=cage();scene.remove(first.root);scene.add(rebuilt.root);r.events.get('boxlab-bridge-state')();
 rebuilt.root.children.filter(o=>o!==rebuilt.body).forEach(o=>assert.equal(o.visible,false));
 const third=cage();scene.add(third.root);r.frame();third.root.children.filter(o=>o!==third.body).forEach(o=>assert.equal(o.visible,false));
 r.events.get('boxlab-render-mode-change')();for(let i=0;i<3;i++){r.api.setEnabled(false);third.root.children.forEach(o=>assert.equal(o.visible,true));r.api.setEnabled(true);r.api.apply();}
 r.api.setEnabled(false);
});
