import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {createCageBatch} from '../src/cage-render-batches.js';
function cage(){
 const root=new THREE.Group(),batch=createCageBatch();
 const edgeMaterial=new THREE.LineBasicMaterial({opacity:.8}),vertexMaterial=new THREE.MeshBasicMaterial({opacity:.9});
 const edge=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-1,0,0),new THREE.Vector3(1,0,0)]),edgeMaterial);edge.userData={kind:'edge',index:0};batch.edge(edge,edgeMaterial);root.add(edge);
 const vertex=new THREE.Mesh(batch.sphereGeometry,vertexMaterial);vertex.scale.setScalar(.1);vertex.userData={kind:'vertex',index:0};batch.vertex(vertex,vertexMaterial);root.add(vertex);batch.finish(root);root.updateMatrixWorld(true);
 return{root,edge,vertex,edgeMaterial,vertexMaterial,lines:root.children.find(o=>o.userData.kind==='cage-edge-batch'),markers:root.children.find(o=>o.userData.kind==='cage-vertex-batch')};
}
function runtime(scene,stored='full'){
 const frames=[],events=new Map(),storage=new Map([['boxlab-cage-intensity',stored]]);
 const c={__boxlabBridgeState:{scene},localStorage:{getItem:key=>storage.get(key),setItem:(key,value)=>storage.set(key,value)},document:{querySelector:()=>null,querySelectorAll:()=>[],dispatchEvent:event=>events.get(event.type)?.(event),addEventListener:(type,fn)=>events.set(type,fn)},window:{addEventListener:(type,fn)=>events.set(type,fn)},setInterval:()=>1,clearInterval(){},setTimeout:()=>1,requestAnimationFrame:fn=>{frames.push(fn);return frames.length;},cancelAnimationFrame(){},queueMicrotask:fn=>fn(),performance:{now:()=>1000},CustomEvent:class{constructor(type,options){this.type=type;this.detail=options?.detail;}}};vm.createContext(c);
 const load=name=>vm.runInContext('(function(){'+fs.readFileSync(new URL('../src/'+name,import.meta.url),'utf8')+'})();',c);load('cage-intensity.js');
 return{api:c.__boxlabCageIntensity,load,c,events,frames,storage,flush(){while(frames.length)frames.shift()();}};
}
test('846 Soft acts on real batched lines/markers; repeated apply never compounds opacity and Full restores exact materials',()=>{
 const f=cage(),scene=new THREE.Scene();scene.add(f.root);const r=runtime(scene),ray=new THREE.Raycaster(new THREE.Vector3(0,0,2),new THREE.Vector3(0,0,-1));ray.params.Line.threshold=.05;
 const hits=()=>ray.intersectObjects([f.edge,f.vertex],false).map(h=>[h.object.userData.index,h.distance]);const before=hits();assert(before.length);
 r.api.setMode('soft');assert(Math.abs(f.lines.material.opacity-.8*.42)<1e-8);assert(Math.abs(f.markers.material.opacity-.9*.56)<1e-8);assert.equal(f.edge.material.visible,false);assert.equal(f.vertex.material.visible,false);assert.deepEqual(hits(),before);
 const lines=f.lines.material,markers=f.markers.material;let disposed=0;lines.addEventListener('dispose',()=>disposed++);markers.addEventListener('dispose',()=>disposed++);
 for(let i=0;i<10;i++)r.api.apply();assert.equal(f.lines.material,lines);assert.equal(f.markers.material,markers);assert.equal(f.edgeMaterial.opacity,.8);assert.equal(f.vertexMaterial.opacity,.9);
 r.api.setMode('full');assert.equal(f.lines.material,f.edgeMaterial);assert.equal(f.markers.material,f.vertexMaterial);assert.equal(disposed,2);assert.equal(r.storage.get('boxlab-cage-intensity'),'full');assert.equal(r.api.setMode('invalid'),false);
});
test('846 saved Soft applies to rebuilt batches through existing bridge/render owners without changing surfaces or selection metadata',()=>{
 const scene=new THREE.Scene(),r=runtime(scene,'soft'),f=cage(),body=new THREE.Mesh(new THREE.BoxGeometry(),new THREE.MeshStandardMaterial());scene.add(f.root,body);const material=body.material;
 r.events.get('boxlab-bridge-state')();r.flush();assert.equal(r.api.mode,'soft');assert(Math.abs(f.lines.material.opacity-.336)<1e-8);assert.equal(body.material,material);assert.equal(f.edge.userData.index,0);
 const next=cage();scene.remove(f.root);scene.add(next.root);r.events.get('boxlab-render-mode-change')();r.flush();assert(Math.abs(next.markers.material.opacity-.504)<1e-8);assert.equal(body.material,material);
 r.api.setMode('full');assert.equal(next.lines.material,next.edgeMaterial);
});
test('846 Soft/Full coexist with accepted Clean visibility and do not reveal suppressed batches',()=>{
 const f=cage(),scene=new THREE.Scene();scene.add(f.root);const r=runtime(scene);r.load('clean-view.js');const clean=r.c.__boxlabCleanView;
 f.markers.visible=false;clean.setEnabled(true);r.api.setMode('soft');assert.equal(f.lines.visible,false);assert.equal(f.markers.visible,false);
 // Disable Clean without running its continuous maintenance frame in the adapter.
 clean.setEnabled(false);assert.equal(f.lines.visible,true);assert.equal(f.markers.visible,false);assert(Math.abs(f.lines.material.opacity-.336)<1e-8);
 r.api.setMode('full');assert.equal(f.lines.material,f.edgeMaterial);assert.equal(f.markers.visible,false);
});
