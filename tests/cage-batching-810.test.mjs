import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {installLooseTopology} from '../src/loose-topology.js';
import {installBridgeTopology} from '../src/bridge-topology.js';
import {createCageBatch,updateCageBatches,addMirrorCageBatch} from '../src/cage-render-batches.js';
installLooseTopology(EditableMesh);
const source=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const original=fs.readFileSync(new URL('./fixtures/performance/cage-809.js',import.meta.url),'utf8');
const line=name=>{const a=source.indexOf(`function ${name}(`);return source.slice(a,source.indexOf('\n',a));};
function runtime(mesh,legacy=false,mode='edge',loop=true){
 const root=new THREE.Group(),materials=Object.fromEntries(['x','y','z','neutral','edge','crease','vertex','selectedVertex','loop','currentLoop'].map(k=>[k,k==='vertex'||k==='selectedVertex'?new THREE.MeshBasicMaterial():new THREE.LineBasicMaterial()]));
 for(const [k,m] of Object.entries(materials))m.name=k;
 const group=[{vertex:0},{vertex:1}],overlays=[];
 const c={THREE,createCageBatch,updateCageBatches,addMirrorCageBatch,mesh,root,activeLoopSlides:loop?[group]:[],activeLoopSlide:loop?group:null,selection:{type:mode},selectionMode:mode,directTool:null,selectionHas:(type,i)=>type===mode&&[2,3].includes(i),edgeAxis:()=> 'x',axisLineMaterials:materials,creaseEdgeMaterial:materials.crease,edgeMaterial:materials.edge,selectedVertexMaterial:materials.selectedVertex,vertexMaterial:materials.vertex,activeLoopMaterial:materials.loop,currentLoopMaterial:materials.currentLoop,addSelectedEdgeOverlay:(a,b,axis)=>overlays.push([a,b,axis]),addFacePickers:()=>{},camera:new THREE.PerspectiveCamera(42,1,.01,100),renderer:{domElement:{clientHeight:800}}};
 c.camera.position.set(2,2,4);c.camera.lookAt(0,0,0);c.camera.updateMatrixWorld(true);
 vm.createContext(c);vm.runInContext((legacy?original:line('addCage'))+'\n'+line('updateScreenSpaceSelection')+'\n'+line('clearGroup'),c);c.addCage();c.updateScreenSpaceSelection();root.updateMatrixWorld(true);
 return {c,root,materials,overlays,dispose(){c.clearGroup(root);Object.values(materials).forEach(m=>m.dispose());}};
}
function mesh(){const m=EditableMesh.cube(1);m.addLooseEdge(0,6);m.addLooseVertex(new THREE.Vector3(1,1,1));m.creases.set('0:6',1);m.creases.set('0:1',.6);return m;}
test('810 actual cage batches keep every edge/material/order and marker instance transform identical to .809',()=>{
 for(const mode of ['vertex','edge','face','object']){
  const a=runtime(mesh(),true,mode),b=runtime(mesh(),false,mode);
  const prior=a.root.children.filter(o=>o.userData.kind==='edge'),proxies=b.root.children.filter(o=>o.userData.kind==='edge');assert.equal(prior.length,proxies.length);
  const batches=b.root.children.filter(o=>o.userData.kind==='cage-edge-batch'),records=[];
  for(const batch of batches){const attr=batch.geometry.attributes.position;for(let i=0;i<attr.count;i+=2)records.push({position:Array.from(attr.array.slice(i*3,(i+2)*3)),material:batch.material.name,order:batch.renderOrder});}
  const expected=prior.map(o=>({position:Array.from(o.geometry.attributes.position.array),material:o.material.name,order:o.renderOrder}));const sort=x=>JSON.stringify(x);assert.deepEqual(records.map(sort).sort(),expected.map(sort).sort());
  for(let i=0;i<prior.length;i++){assert.deepEqual(Array.from(proxies[i].geometry.attributes.position.array),Array.from(prior[i].geometry.attributes.position.array));assert.equal(proxies[i].userData.index,prior[i].userData.index);assert.equal(proxies[i].userData.loopSlideGroup,prior[i].userData.loopSlideGroup);assert.equal(proxies[i].material.visible,false);assert.equal(proxies[i].visible,true);}
  const vertices=b.root.children.filter(o=>o.userData.kind==='vertex');assert.equal(new Set(vertices.map(o=>o.geometry)).size,1);
  for(const batch of b.root.children.filter(o=>o.isInstancedMesh)){assert.equal(batch.frustumCulled,false);batch.userData.cageMarkers.forEach((marker,i)=>{const actual=new THREE.Matrix4();batch.getMatrixAt(i,actual);const old=a.root.children.find(o=>o.userData.kind==='vertex'&&o.userData.index===marker.userData.index);old.updateMatrix();actual.elements.forEach((v,k)=>assert(Math.abs(v-old.matrix.elements[k])<1e-7));assert.equal(batch.material.name,old.material.name);});}
  assert.deepEqual(b.overlays,a.overlays);a.dispose();b.dispose();
 }
});
test('810 real Three raycasts preserve indexed edge, loop and vertex hits across camera positions and zoom',()=>{
 const a=runtime(mesh(),true,'vertex'),b=runtime(mesh(),false,'vertex'),ray=new THREE.Raycaster();ray.params.Line.threshold=.09;
 for(const cameraPosition of [[2,2,4],[-2,1,3],[0,0,1.5]]){
  for(const r of [a,b]){r.c.camera.position.set(...cameraPosition);r.c.camera.lookAt(0,0,0);r.c.camera.updateMatrixWorld(true);r.c.updateScreenSpaceSelection();r.root.updateMatrixWorld(true);}
  for(const kind of ['edge','vertex'])for(let y=-.8;y<=.8;y+=.08)for(let x=-.8;x<=.8;x+=.08){
   function hits(r){ray.setFromCamera(new THREE.Vector2(x,y),r.c.camera);return ray.intersectObjects(r.root.children.filter(o=>o.userData.kind===kind),false).map(h=>({index:h.object.userData.index,distance:Math.round(h.distance*1e7)/1e7,loop:h.object.userData.loopSlideGroup}));}
   assert.deepEqual(hits(b),hits(a));
  }
 }
 a.dispose();b.dispose();
});
test('810 instanced markers follow original screen sizing and clearGroup releases shared geometry and instance resources once',()=>{
 const r=runtime(mesh(),false,'vertex'),geometry=r.root.children.find(o=>o.userData.kind==='vertex').geometry;let disposed=0,instancesDisposed=0;
 geometry.addEventListener('dispose',()=>disposed++);const batches=r.root.children.filter(o=>o.isInstancedMesh);batches.forEach(o=>o.addEventListener('dispose',()=>instancesDisposed++));
 r.c.camera.position.multiplyScalar(2);r.c.renderer.domElement.clientHeight=400;r.c.updateScreenSpaceSelection();
 for(const batch of batches)batch.userData.cageMarkers.forEach((marker,i)=>{const m=new THREE.Matrix4();batch.getMatrixAt(i,m);assert(Math.abs(m.elements[0]-marker.scale.x)<1e-7);assert(Math.abs(m.elements[12]-marker.position.x)<1e-7);});
 r.dispose();assert.equal(disposed,1);assert.equal(instancesDisposed,batches.length);assert.equal(r.root.children.length,0);
});
test('810 mirror wire is one independent segment batch with unchanged endpoints',()=>{
 const m=mesh(),root=new THREE.Group(),material=new THREE.LineBasicMaterial();addMirrorCageBatch(root,m,material);assert.equal(root.children.length,1);assert.equal(root.children[0].userData.kind,'mirror-edge');
 const expected=m.edges().flatMap(e=>[...m.vertices[e.a].toArray(),...m.vertices[e.b].toArray()]);assert.deepEqual(Array.from(root.children[0].geometry.attributes.position.array),expected);root.children[0].geometry.dispose();material.dispose();
});
test('810 dense fixture bounds visible cage draw objects while keeping all canonical picking proxies',()=>{
 const vertices=[],faces=[],n=30;for(let y=0;y<=n;y++)for(let x=0;x<=n;x++)vertices.push([x/n,y/n,0]);for(let y=0;y<n;y++)for(let x=0;x<n;x++){const i=y*(n+1)+x;faces.push([i,i+1,i+n+2,i+n+1]);}
 const m=new EditableMesh(vertices,faces),r=runtime(m,false,'face',false);assert.equal(r.root.children.filter(o=>o.userData.kind==='edge').length,m.edges().length);assert.equal(r.root.children.filter(o=>o.userData.kind==='vertex').length,m.vertices.length);assert.equal(r.root.children.filter(o=>o.material.visible!==false).length,2);r.dispose();
});
test('810 actual bridge/edge registry and native visibility observer retain proxy IDs and suppress batches for groups and Boolean source views',()=>{
 const oldAdd=THREE.Group.prototype.add,oldProjection=THREE.PerspectiveCamera.prototype.updateProjectionMatrix;const oldState=globalThis.__boxlabBridgeState;globalThis.__boxlabBridgeState=undefined;globalThis.window={dispatchEvent(){}};
 try{
  installBridgeTopology(EditableMesh);const state=globalThis.__boxlabBridgeState;
  let show=true,group=false;const c={THREE,activeRoot:null,activeBody:null,saveActive(){},state:()=>state,activeShouldShow:()=>show,rebuildInactiveLayer(){},queueOutliner(){},queueMicrotask(){},__boxlabObjectSelection:{get wholeGroupId(){return group?1:null;}}};vm.createContext(c);
  const s=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8'),a=s.indexOf('function installRenderObserver()'),z=s.indexOf('\nfunction installUI()',a);vm.runInContext(s.slice(a,z)+'\ninstallRenderObserver();',c);
  for(const [visible,wholeGroup] of [[true,false],[false,false],[true,true]]){show=visible;group=wholeGroup;const root=new THREE.Group(),body=new THREE.Mesh(new THREE.BufferGeometry(),new THREE.MeshBasicMaterial());body.userData.kind='body';root.add(body);
   const r=runtime(mesh(),false,'edge');root.add(...r.root.children);assert.equal(state.edgeObjects.size,13);assert.equal(state.vertexObjects.size,9);
   assert.equal(state.edgeObjects.get(0).userData.index,0);assert.equal(state.vertexObjects.get(2).userData.selected,false);
   for(const item of root.children.filter(o=>['cage-edge-batch','cage-vertex-batch'].includes(o.userData.kind)))assert.equal(item.visible,visible&&!wholeGroup);
   r.dispose();body.geometry.dispose();body.material.dispose();
  }
 }finally{clearTimeout(globalThis.__boxlabBridgeState?.notifyTimer);THREE.Group.prototype.add=oldAdd;THREE.PerspectiveCamera.prototype.updateProjectionMatrix=oldProjection;delete THREE.Group.prototype.__boxlabBridgeObserverInstalled;delete THREE.Group.prototype.__boxlabMultiObjectInstalled;delete THREE.PerspectiveCamera.prototype.__boxlabCameraObserverInstalled;globalThis.__boxlabBridgeState=oldState;delete globalThis.window;}
});
test('810 existing rendered-marker Vertex assist and Lasso return the same indices including loose vertices',()=>{
 const a=runtime(mesh(),true,'vertex'),b=runtime(mesh(),false,'vertex');
 const assist=fs.readFileSync(new URL('../src/vertex-pick-assist.js',import.meta.url),'utf8'),lasso=fs.readFileSync(new URL('../src/lasso-select.js',import.meta.url),'utf8');
 function setup(r){
  const scene=new THREE.Scene();scene.add(r.root);const body=new THREE.Mesh(r.c.mesh.triangulatedGeometry(),new THREE.MeshBasicMaterial({side:THREE.DoubleSide}));body.userData.kind='body';r.root.add(body);scene.updateMatrixWorld(true);
  const c={THREE,state:()=>({scene,camera:r.c.camera}),canvas:{getBoundingClientRect:()=>({left:0,top:0,width:800,height:800})},PICK_RADIUS_PX:22,raycaster:new THREE.Raycaster(),visibilityRay:new THREE.Raycaster(),pointer:new THREE.Vector2(),world:new THREE.Vector3()};vm.createContext(c);
  vm.runInContext(assist.slice(assist.indexOf('function screenPoint('),assist.indexOf('function selected()')),c);
  const nearest=(x,y)=>c.nearestVertexAt(x,y)?.i??null;
  const functionLine=(s,name)=>{const i=s.indexOf(`function ${name}(`);return s.slice(i,s.indexOf('\n',i));};vm.runInContext(['screenPoint','pointInPoly','renderedVertexSelection'].map(name=>functionLine(lasso,name)).join('\n'),c);
  return{nearest,lasso:poly=>Array.from(c.renderedVertexSelection(poly)),body};
 }
 const x=setup(a),y=setup(b);let picks=0;
 for(let py=180;py<=620;py+=10)for(let px=180;px<=620;px+=10){const prior=x.nearest(px,py);assert.equal(y.nearest(px,py),prior);if(prior!==null)picks++;}assert(picks>0);
 for(const poly of [[{x:0,y:0},{x:800,y:0},{x:800,y:800},{x:0,y:800}],[{x:250,y:250},{x:450,y:250},{x:450,y:450},{x:250,y:450}]])assert.deepEqual(y.lasso(poly),x.lasso(poly));
 assert.equal(y.lasso([{x:0,y:0},{x:800,y:0},{x:800,y:800},{x:0,y:800}]).length,9);
 for(const r of [a,b])r.dispose();x.body.material.dispose();y.body.material.dispose();
});
