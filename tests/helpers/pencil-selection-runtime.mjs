import * as THREE from 'three';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../../src/mesh.js';
import {vertexRuntime} from './vertex-extrude-runtime.mjs';

// Shared original .760/.766 whole gate/paint/Lasso fixture, real Three raycasts.
// Orbit callbacks and canvas selection-down adapter remain controlled doubles.
export function pencilSelectionRuntime(mesh=null){
 const m=mesh||new EditableMesh([[-1,0,0],[1,0,0],[-1,1,0],[1,1,0]],[]);if(!mesh){m.addLooseEdge(0,1);m.addLooseEdge(2,3);}
 const f=vertexRuntime(m,[]),c=f.context,logs=[];f.setMode('edge');let orbitDown=0,orbitMove=0;
 c.__boxlabGestureDebug={log:(stage,detail)=>logs.push({stage,detail})};
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
 const s=fs.readFileSync(new URL('../../src/main.js',import.meta.url),'utf8'),a=s.indexOf("window.addEventListener('boxlab-pencil-background-tap',event=>{"),b=s.indexOf("canvas.addEventListener('pointermove'",a);
 Object.assign(c,{backgroundTap:null,completedBackgroundRelease:null,completeBackgroundSelectionTap:()=>f.setIds([])});vm.runInContext(s.slice(a,b),c);
 f.canvas.addEventListener('pointerdown',e=>{if(c.__boxlabLasso?.isArmed())return;const p=c.__boxlabSelectionBridge.pick('edge',e);if(p&&!f.ids().includes(p.index))f.setIds([...f.ids(),p.index]);},true);
 return {...f,multi,depth,logs,orbit:()=>({down:orbitDown,move:orbitMove}),lasso(){f.load('lasso-select.js');c.__boxlabLasso.setArmed(true);},body(position=new THREE.Vector3(5,0,0)){const body=new THREE.Mesh(new THREE.BoxGeometry(2,2,1),new THREE.MeshBasicMaterial({side:THREE.DoubleSide}));body.position.copy(position);body.userData.kind='body';body.updateMatrixWorld();f.state.scene.add(body);return body;},lassoPoly(poly){this.lasso();const a=poly[0];f.pointer('pointerdown',{clientX:a.x,clientY:a.y});for(const p of poly.slice(1))f.pointer('pointermove',{clientX:p.x,clientY:p.y});const z=poly.at(-1);f.pointer('pointerup',{clientX:z.x,clientY:z.y});f.flush();}};
}
