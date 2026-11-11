import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {History} from '../src/history.js';
import {pickScreenEdges} from '../src/edge-screen-picking.js';
import {mainPickerRuntime} from './helpers/main-picker-runtime.mjs';
const canvas={getBoundingClientRect:()=>({left:70,top:40,width:800,height:800})};
const at=(point,camera)=>{const p=point.clone().project(camera);return {clientX:70+(p.x*.5+.5)*800,clientY:40+(-p.y*.5+.5)*800,pointerType:'pen',isPrimary:true};};
function line(root,a,b,index){const o=new THREE.Line(new THREE.BufferGeometry().setFromPoints([a,b]),new THREE.LineBasicMaterial({visible:false}));o.userData={kind:'edge',index};root.add(o);return o;}
function fixture(scale=1,ortho=false){
 const root=new THREE.Group(),c=ortho?new THREE.OrthographicCamera(-2*scale,2*scale,2*scale,-2*scale,.01*scale,100*scale):new THREE.PerspectiveCamera(45,1,.01*scale,100*scale);c.position.set(0,0,5*scale);c.lookAt(0,0,0);c.updateMatrixWorld();
 // Recessed floor, near left rim and inside wall: visible line on the floor,
 // competing hidden line behind it. The Pencil lands closer to the hidden line.
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(4*scale,4*scale),new THREE.MeshBasicMaterial({side:THREE.DoubleSide}));floor.userData.kind='body';root.add(floor);
 const rim=new THREE.Mesh(new THREE.PlaneGeometry(2*scale,4*scale),floor.material);rim.position.set(-scale,0,scale);rim.userData.kind='body';root.add(rim);
 const wall=new THREE.Mesh(new THREE.PlaneGeometry(scale,4*scale),floor.material);wall.rotation.y=Math.PI/2;wall.position.set(0,0,.5*scale);wall.userData.kind='body';root.add(wall);
 const a=new THREE.Vector3(.15*scale,0,0),b=new THREE.Vector3(.85*scale,0,0);
 line(root,a,b,1);
 const factor=ortho?1:1.2;line(root,new THREE.Vector3(a.x*factor,.01*scale,-scale),new THREE.Vector3(b.x*factor,.01*scale,-scale),2);
 root.updateMatrixWorld(true);const event=at(new THREE.Vector3(.5*scale,.01*scale,-scale),c);
 return {root,c,event,floor,rim,wall,a,b,pick:options=>pickScreenEdges(event,c,canvas,root.children,options)};
}
test('1141 rear edge closer to Pencil cannot steal recessed visible edge; explicit Through retains both, at three scales and both camera types',()=>{
 for(const scale of [.001,1,10000])for(const ortho of [false,true]){const f=fixture(scale,ortho),before=f.root.children.map(o=>o.geometry.attributes.position.array.slice());
 assert.equal(f.pick({through:true})[0].index,2,'old screen-only ranking reproduces rear-edge theft');
 assert.deepEqual(f.pick().map(h=>h.index),[1]);
 assert.deepEqual(f.root.children.map(o=>o.geometry.attributes.position.array),before);
 const native=mainPickerRuntime({root:f.root,camera:f.c,canvas});assert.equal(native.bridge.pick('edge',f.event).index,1);assert.deepEqual(Array.from(native.bridge.pickHits('edge',f.event)).map(h=>h.index),[1]);assert.equal(native.bridge.pickHits('edge',f.event,{through:true})[0].index,2);
 }
});
test('1141 tests visibility at the edge rather than offset contact, ignores highlights/pickers/hidden bodies, and never falls back to hidden edges',()=>{
 const f=fixture();f.root.remove(f.root.children.find(o=>o.userData.index===1));assert.deepEqual(f.pick(),[],'no visible line is a miss');
 f.floor.visible=false;assert.equal(f.pick()[0].index,2,'hidden floor cannot occlude');f.floor.visible=true;
 const edge=line(f.root,new THREE.Vector3(.0005,-.2,0),new THREE.Vector3(.0005,.2,0),3);f.root.updateMatrixWorld(true);
 const event=at(new THREE.Vector3(.0005,0,0),f.c);event.clientX-=6; // contact lies on the near rim, edge lies in the recess
 assert.equal(pickScreenEdges(event,f.c,canvas,f.root.children)[0]?.index,3);
 const blocker=new THREE.Mesh(new THREE.PlaneGeometry(4,4),new THREE.MeshBasicMaterial({side:THREE.DoubleSide,visible:false}));blocker.position.z=2;blocker.userData.kind='face';f.root.add(blocker);f.root.updateMatrixWorld(true);assert.equal(pickScreenEdges(event,f.c,canvas,f.root.children)[0]?.index,3);
 blocker.userData.kind='edge-selection-overlay';assert.equal(pickScreenEdges(event,f.c,canvas,f.root.children)[0]?.index,3);
 edge.visible=false;assert(!pickScreenEdges(event,f.c,canvas,f.root.children).some(h=>h.index===3));
});
test('1141 real closed L-section keeps concave edge, rebuild, coordinate edits and Undo/Redo pickable without stale visibility',()=>{
 const section=[[-1,-1],[1,-1],[1,0],[0,0],[0,1],[-1,1]],vertices=[-1,1].flatMap(y=>section.map(([x,z])=>[x,y,z]));
 const faces=[[5,4,3,2,1,0],[6,7,8,9,10,11],...section.map((_,i)=>[i,(i+1)%6,(i+1)%6+6,i+6])],root=new THREE.Group(),c=new THREE.PerspectiveCamera(42,1,.01,100);let m=new EditableMesh(vertices,faces);c.position.set(3,1,4);c.lookAt(0,0,0);c.updateMatrixWorld();
 function rebuild(){root.clear();const body=new THREE.Mesh(m.triangulatedGeometry(),new THREE.MeshBasicMaterial({side:THREE.DoubleSide}));body.userData.kind='body';root.add(body);m.edges().forEach((e,i)=>line(root,m.vertices[e.a],m.vertices[e.b],i));root.updateMatrixWorld(true);}
 function check(){rebuild();const index=m.edges().findIndex(e=>e.a===3&&e.b===9),event=at(m.vertices[3].clone().lerp(m.vertices[9],.5),c),before=JSON.stringify(m);assert.equal(pickScreenEdges(event,c,canvas,root.children)[0]?.index,index);assert.equal(JSON.stringify(m),before);}
 const history=new History(),before=JSON.stringify(m);check();history.push(m);m.vertices[3].x=.15;m.vertices[9].x=.15;const after=JSON.stringify(m);check();m=history.undo(m);assert.equal(JSON.stringify(m),before);check();m=history.redo(m);assert.equal(JSON.stringify(m),after);check();
});
test('1141 depth tests use transformed world coordinates and camera ray origin, while a loose scaffold retains screen-only selection',()=>{
 for(const ortho of [false,true]){const f=fixture(1,ortho),group=new THREE.Group();group.position.set(.2,.1,0);group.scale.setScalar(.8);for(const object of [...f.root.children])group.add(object);f.root.add(group);f.root.updateMatrixWorld(true);const event=at(group.localToWorld(new THREE.Vector3(.5,0,0)),f.c);assert.deepEqual(pickScreenEdges(event,f.c,canvas,group.children).map(h=>h.index),[1]);
 for(const object of [...group.children])if(object.userData.kind==='body')group.remove(object);assert.equal(pickScreenEdges(event,f.c,canvas,group.children)[0].index,1);assert.equal(pickScreenEdges(event,f.c,canvas,group.children).length,2);}
});
test('1141 actual Edge paint hit owner explicitly requests Through, Visible shares native filtered ordering',()=>{
 const f=fixture(),native=mainPickerRuntime({root:f.root,camera:f.c,canvas}),source=fs.readFileSync(new URL('../src/edge-paint-select.js',import.meta.url),'utf8'),context={selection:()=>native.bridge,paintDepth:'visible'};vm.createContext(context);vm.runInContext(source.slice(source.indexOf('function hitIndices('),source.indexOf('function addHits(')),context);
 assert.deepEqual(Array.from(context.hitIndices(f.event,'edge')),[1]);context.paintDepth='through';assert.deepEqual(Array.from(context.hitIndices(f.event,'edge')),[2,1]);context.paintDepth='visible';assert.deepEqual(Array.from(context.hitIndices(f.event,'edge')),[1]);
});
