import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {buildSweepProfile} from '../src/sweep-core.js';
const source=n=>fs.readFileSync(new URL('../src/'+n,import.meta.url),'utf8');
function fixture(mode){
 const fields=new Map(),jobs=[],windows=new Map(),begins=[];let ids=[0];
 const el=()=>({hidden:false,value:'',dataset:{},style:{},textContent:'',listeners:new Map(),classList:{toggle(){},contains:()=>false},appendChild(){},append(){},prepend(){},querySelector:q=>node(q),querySelectorAll:()=>[],setAttribute(){},getAttribute:()=>null,addEventListener(t,f){this.listeners.set(t,f);},dispatchEvent(){},getBoundingClientRect:()=>({left:0,top:0,width:1000,height:600})});
 function node(q){if(!fields.has(q))fields.set(q,el());return fields.get(q);}
 const mesh=EditableMesh.cube();if(mode==='edge'){const face=mesh.faces[0],edges=mesh.edges();ids=face.map((v,i)=>edges.findIndex(e=>mesh.edgeKey(e.a,e.b)===mesh.edgeKey(v,face[(i+1)%face.length])));}
 const camera=new THREE.PerspectiveCamera(45,1.5,.1,100);camera.position.set(4,3,6);camera.lookAt(0,0,0);camera.updateMatrixWorld();
 const state={mesh,camera,scene:new THREE.Group(),controls:{enabled:true}},objects=[{id:1,mesh,name:'Cube'}];
 const manager={activeId:1,objects,addMesh(plane,name){const o={id:2,name,mesh:plane.clone()};objects.push(o);this.activeId=2;state.mesh=plane.clone();mode='object';return o;},saveActive(){}};
 const c={THREE,EditableMesh,buildSweepProfile,document:{querySelector:node,querySelectorAll:()=>[],createElement:el,head:el()},window:{addEventListener:(t,f)=>windows.set(t,f),dispatchEvent(){}},Event:class{},CustomEvent:class{},requestAnimationFrame:()=>1,cancelAnimationFrame(){},queueMicrotask:f=>jobs.push(f),__boxlabBridgeState:state,__boxlabObjectManager:manager,__boxlabSelectionBridge:{mode:()=>mode,indices:()=>ids},__boxlabToolSession:{begin:o=>{begins.push(o);return true;},end(){}},__boxlabObjectHistory:{capture:()=>({original:true}),checkpointSnapshot(){}},__boxlabHistory:{undoStack:[],redoStack:[]}};
 vm.runInNewContext(source('sweep-path.js').replace(/^import .*;\n/gm,''),c);
 return{c,fields,begins,jobs,state,manager,original:mesh.clone()};
}
for(const mode of ['face','edge'])test('731 '+mode+' Sweep launches existing staged controls with captured profile after Object transition',()=>{
 const f=fixture(mode);assert.equal(f.c.__boxlabSweepPath.launchSelection(),true);assert.equal(f.begins.at(-1).id,'sweep');assert.equal(f.begins.at(-1).node.hidden,false);assert.equal(f.fields.get('#sweepPathPanel').hidden,false);assert.equal(f.manager.objects[1].sweepPath.selectionProfile.label,mode==='face'?'Face':'Edge Loop');for(const job of f.jobs)job();assert.equal(f.manager.objects[1].sweepPath.editPath,true);assert.equal(f.state.mesh.faces.length,1);assert.deepEqual(f.manager.objects[0].mesh.vertices,f.original.vertices);
});
test('731 shared session docks original Sweep controls for component mode too; no duplicate proxy popup',()=>{
 const s=source('tool-session-ui.js'),a=s.indexOf('function begin('),b=s.indexOf('\nfunction end(',a);let begin;const original={},host={dataset:{},replaceChildren:n=>{assert.equal(n,original);}},viewport={appendChild:n=>assert.equal(n,host)};const c={active:null,drawer:{dataset:{},open:false},host,summary:{textContent:'Active Tools'},contentRoot:{},document:{querySelector:q=>q==='#viewportWrap'?viewport:null},placeToolSessionPanel:n=>{n.placed=true;},window:{dispatchEvent(){}},CustomEvent:class{},__boxlabSelectionBridge:{mode:()=> 'face'}};vm.createContext(c);vm.runInContext(s.slice(a,b)+';globalThis.run=begin;',c);assert.equal(c.run({id:'sweep',title:'Sweep',node:original}),true);assert.equal(host.dataset.viewportDock,'true');assert.equal(host.hidden,false);assert.equal(host.placed,true);
 const proxy=source('selection-hub-sweep-session.js');assert.match(proxy,/palette.hidden=!active\|\|originalDock/);
});
