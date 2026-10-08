import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../src/mesh.js';
import {vertexRuntime} from './helpers/vertex-extrude-runtime.mjs';
function fixture(){
 const m=new EditableMesh([[-1,0,0],[1,0,0],[-1,1,0],[1,1,0]],[]);m.addLooseEdge(0,1);m.addLooseEdge(2,3);
 const f=vertexRuntime(m,[]),c=f.context;f.setMode('edge');let orbitDown=0,orbitMove=0;
 c.document.createElementNS=c.document.createElement;c.document.body=f.fields.get('#viewportWrap');
 const multi=c.document.body.querySelector('multi');multi.checked=true;f.fields.set('#multiSelectToggle',multi);const depth=c.document.body.querySelector('depth');depth.dataset.paintDepth='visible';f.fields.set('#paintSelectDepth [data-paint-depth].active',depth);
 function lines(){f.state.edgeObjects=new Map(m.edges().map((e,i)=>{const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints([m.vertices[e.a],m.vertices[e.b]]),new THREE.LineBasicMaterial());line.userData={kind:'edge',index:i};line.updateMatrixWorld();return[i,line];}));}
 lines();f.fields.get('#cageToggle').addEventListener('change',lines);
 const ray=new THREE.Raycaster();ray.params.Line.threshold=.09;
 function hit(e,objects){const r=f.canvas.getBoundingClientRect();ray.setFromCamera(new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height*2-1)),f.state.camera);return ray.intersectObjects(objects,false)[0];}
 c.__boxlabSelectionBridge.pick=(mode,e)=>{const h=mode==='edge'?hit(e,[...f.state.edgeObjects.values()]):null;return h?{type:'edge',index:h.object.userData.index}:null;};
 c.__boxlabSelectionBridge.pickObject=e=>hit(e,f.state.scene.children.filter(o=>o.userData.kind==='body'))||null;
 c.__boxlabSelectionBridge.has=(type,i)=>f.ids().includes(i);c.__boxlabSelectionBridge.add=(type,i)=>f.setIds([...new Set([...f.ids(),i])]);
 c.__boxlabObjectManager.pickObject=c.__boxlabSelectionBridge.pickObject;
 f.load('pencil-orbit-gate.js');c.__boxlabPencilOrbitGate.beginOrbitRegistration();
 f.canvas.addEventListener('pointerdown',function onPointerDown(){orbitDown++;});f.canvas.addEventListener('pointermove',function onPointerMove(){orbitMove++;});f.canvas.addEventListener('pointerup',function onPointerUp(){});c.__boxlabPencilOrbitGate.endOrbitRegistration();
 f.load('edge-paint-select.js');
 // Actual main semantic listener; a generated background event would clear the tap.
 const s=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8'),a=s.indexOf("window.addEventListener('boxlab-pencil-background-tap',event=>{"),b=s.indexOf("canvas.addEventListener('pointermove'",a);
 Object.assign(c,{backgroundTap:null,completedBackgroundRelease:null,completeBackgroundSelectionTap:()=>f.setIds([])});vm.runInContext(s.slice(a,b),c);
 f.canvas.addEventListener('pointerdown',e=>{if(c.__boxlabLasso?.isArmed())return;const p=c.__boxlabSelectionBridge.pick('edge',e);if(p&&!f.ids().includes(p.index))f.setIds([...f.ids(),p.index]);},true);
 return {...f,multi,depth,orbit:()=>({down:orbitDown,move:orbitMove}),lasso(){f.load('lasso-select.js');c.__boxlabLasso.setArmed(true);},body(position=new THREE.Vector3(5,0,0)){const body=new THREE.Mesh(new THREE.BoxGeometry(2,2,1),new THREE.MeshBasicMaterial({side:THREE.DoubleSide}));body.position.copy(position);body.userData.kind='body';body.updateMatrixWorld();f.state.scene.add(body);return body;},lassoPoly(poly){this.lasso();const a=poly[0];f.pointer('pointerdown',{clientX:a.x,clientY:a.y});for(const p of poly.slice(1))f.pointer('pointermove',{clientX:p.x,clientY:p.y});const z=poly.at(-1);f.pointer('pointerup',{clientX:z.x,clientY:z.y});f.flush();}};
}
test('floating Edge tap survives physical Pencil release instead of semantic background clear',()=>{
 for(const body of [false,true]){const f=fixture();if(body)f.body();const p=f.screen(new THREE.Vector3());f.pointer('pointerdown',{clientX:p.x,clientY:p.y});assert.deepEqual(f.ids(),[0]);f.pointer('pointerup',{clientX:p.x,clientY:p.y});assert.deepEqual(f.ids(),[0]);assert.equal(f.events.some(e=>e.type==='boxlab-pencil-background-tap'),false);assert.equal(f.orbit().down,0);}
});
test('floating multi Edge paint gets horizontal/vertical movement before deferred orbit',()=>{
 const f=fixture(),p=f.screen(new THREE.Vector3());f.pointer('pointerdown',{clientX:p.x,clientY:p.y});assert.equal(f.context.__boxlabPaintSelectDebug.pending().pointerId,1);const q=f.screen(new THREE.Vector3(0,1,0));f.pointer('pointermove',{clientX:q.x,clientY:q.y});assert.ok(f.ids().includes(1));assert.equal(f.context.__boxlabPaintSelectDebug.active().type,'edge');assert.equal(f.orbit().down,0);assert.equal(f.events.some(e=>e.type==='boxlab-pencil-orbit-claim'),false);f.pointer('pointerup',{clientX:q.x,clientY:q.y});assert.equal(f.context.__boxlabPaintSelectDebug.active(),null);
});
test('floating held Edge yields to original horizontal/vertical modeless browser',()=>{
 for(const delta of [[70,0],[0,70]]){const f=fixture();f.multi.checked=false;let browsed=0;f.context.__boxlabModelessSelection={browsing:()=>true};f.canvas.addEventListener('pointermove',()=>browsed++,true);const p=f.screen(new THREE.Vector3());f.pointer('pointerdown',{clientX:p.x,clientY:p.y});f.pointer('pointermove',{clientX:p.x+delta[0],clientY:p.y+delta[1]});assert.equal(browsed,1);assert.equal(f.orbit().down,0);}
});
test('Visible Edge Lasso includes floating edge with no body under midpoint',()=>{
 const f=fixture();f.body();const a=f.screen(new THREE.Vector3(-1.2,-.2,0)),b=f.screen(new THREE.Vector3(1.2,.2,0));f.lassoPoly([{x:a.x,y:a.y},{x:b.x,y:a.y},{x:b.x,y:b.y},{x:a.x,y:b.y}]);assert.deepEqual(Array.from(f.ids()),[0]);assert.equal(f.orbit().down,0);assert.equal(f.context.__boxlabLasso.isArmed(),true);
});
test('Visible Edge Lasso keeps foreground loose rail but refuses edge hidden behind a body; Through includes it',()=>{
 for(const [z,depth,expected] of [[-2,'visible',[0]],[2,'visible',[]],[2,'through',[0]]]){const f=fixture();f.depth.dataset.paintDepth=depth;f.body(new THREE.Vector3(0,0,z));const a=f.screen(new THREE.Vector3(-1.2,-.2,0)),b=f.screen(new THREE.Vector3(1.2,.2,0));f.lassoPoly([{x:a.x,y:a.y},{x:b.x,y:a.y},{x:b.x,y:b.y},{x:a.x,y:b.y}]);assert.deepEqual(Array.from(f.ids()),expected);}
});
test('stationary floating Edge tap while Lasso armed keeps mode/selection; real empty tap still clears',()=>{
 const f=fixture();f.setIds([0]);f.lasso();const p=f.screen(new THREE.Vector3());f.pointer('pointerdown',{clientX:p.x,clientY:p.y});f.pointer('pointerup',{clientX:p.x,clientY:p.y});assert.equal(f.context.__boxlabLasso.isArmed(),true);assert.deepEqual(f.ids(),[0]);assert.equal(f.events.some(e=>e.type==='boxlab-pencil-background-tap'),false);
 f.pointer('pointerdown',{clientX:990,clientY:590});f.pointer('pointerup',{clientX:990,clientY:590});assert.equal(f.events.some(e=>e.type==='boxlab-pencil-background-tap'),true);
});
test('empty-space Pencil navigation and finger Orbit remain available around floating edges',()=>{
 const f=fixture();f.pointer('pointerdown',{clientX:990,clientY:590});assert.equal(f.orbit().down,1);f.pointer('pointermove',{clientX:940,clientY:550});assert.ok(f.orbit().move>0);f.pointer('pointerup',{clientX:940,clientY:550});f.pointer('pointerdown',{clientX:500,clientY:300,pointerType:'touch'});assert.equal(f.orbit().down,2);
});
