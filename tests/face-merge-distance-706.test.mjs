import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {installLooseTopology} from '../src/loose-topology.js';
installLooseTopology(EditableMesh);

const source=name=>fs.readFileSync(new URL('../src/'+name,import.meta.url),'utf8').replace(/^import .*;\n/gm,'');
const seam=()=>new EditableMesh([[0,0,0],[1,0,0],[1,1,0],[0,1,0],[1.0001,0,0],[2,0,0],[2,1,0],[1.0001,1,0]],[[0,1,2,3],[4,5,6,7]]);
function fixture(m=seam()){
 const fields=new Map(),handlers=new Map(),calls=[],history=[],events=[];let mode='face',ids=[0],locked=false;
 const el=()=>({style:{},value:'',hidden:true,textContent:'',listeners:{},append(){},appendChild(){},addEventListener(t,f){this.listeners[t]=f;},dispatchEvent(){},querySelector(s){if(!fields.has(s))fields.set(s,el());return fields.get(s);}});
 const drawerInput={value:'0.001',addEventListener(){}},disabledTarget={disabled:true};
 const context={THREE,Set,Map,placeToolSessionPanel:p=>{p.style.left='50%';},document:{createElement:el,head:el(),querySelector:s=>s==='#app'?{classList:{contains:()=>locked}}:s==='#mergeByDistanceValue'?drawerInput:s==='#mergeByDistanceBtn'?disabledTarget:el(),querySelectorAll:()=>[],addEventListener(){}},window:{addEventListener:(t,f)=>handlers.set(t,f),dispatchEvent:e=>events.push(e)},CustomEvent:class{constructor(type,{detail}){Object.assign(this,{type,detail});}},Event:class{},queueMicrotask:f=>f(),setTimeout(){},requestAnimationFrame:()=>1,cancelAnimationFrame(){},__boxlabHistory:{push:m=>history.push(m)},__boxlabBridgeState:{mesh:m},__boxlabSelectionBridge:{mode:()=>mode,indices:()=>ids,set:(nextMode,next)=>{calls.push([nextMode,next]);mode=nextMode;ids=next;}}};
 vm.runInNewContext('{'+source('merge-by-distance.js')+'}',context);
 vm.runInNewContext('{'+source('select-mergeable-verts.js')+'}',context);
 vm.runInNewContext('{'+source('face-repair-viewport.js')+'}',context);
 const api=context.__boxlabFaceRepairViewportSession;
 const click=s=>fields.get(s).listeners.click({preventDefault(){},stopPropagation(){}});
 const distance=fields.get('input');
 return{context,api,fields,distance,click,history,calls,events,mode:()=>mode,ids:()=>ids,setMode:v=>{mode=v;},setIds:v=>{ids=v;},setLocked:v=>{locked=v;}};
}
test('Merge panel can open in Face despite disabled Vertex button; scanning and Cancel do not mutate',()=>{
 const m=seam(),before=m.clone(),f=fixture(m);assert.equal(f.api.available('Merge Dist'),true);
 assert.equal(f.api.openFromHub({tool:'Merge Dist'}),true);assert.equal(f.api.element.style.left,'50%');
 assert.equal(f.distance.value,'0.001');assert.equal(f.fields.get('.fr-apply').disabled,false);
 f.distance.value='0.00001';f.distance.listeners.input();assert.equal(f.fields.get('.fr-apply').disabled,true);
 f.click('.fr-cancel');assert.deepEqual(m,before);assert.equal(f.history.length,0);assert.deepEqual(f.ids(),[0]);assert.equal(f.mode(),'face');assert.equal(f.events.at(-1).detail.tool,'Merge Dist');
});
test('whole-object Apply welds outside selected Face, stays Face, clears stale IDs and adds one Undo snapshot',()=>{
 const m=seam(),before=m.clone(),f=fixture(m);f.api.openFromHub({tool:'Merge Dist'});f.click('.fr-apply');f.click('.fr-apply');
 assert.equal(m.vertices.length,6);assert.equal(m.faces.length,2);assert.equal(f.mode(),'face');assert.equal(f.ids().length,0);assert.equal(f.history.length,1);assert.deepEqual(f.history[0],before);assert.equal(f.api.active(),false);assert.equal(f.events.length,1);
});
test('invalid tolerance and unsafe triangle clusters preserve mesh, selection and history',()=>{
 const m=new EditableMesh([[0,0,0],[0.0001,0,0],[0,1,0]],[[0,1,2]]),before=m.clone(),f=fixture(m);f.api.openFromHub({tool:'Merge Dist'});
 assert.equal(f.fields.get('.fr-apply').disabled,true);assert.match(f.fields.get('.fr-result').textContent,/rejected/);
 for(const value of ['0','-1','NaN','']){f.distance.value=value;f.distance.listeners.input();f.click('.fr-apply');assert.equal(f.fields.get('.fr-apply').disabled,true);}
 assert.deepEqual(m,before);assert.deepEqual(f.ids(),[0]);assert.equal(f.history.length,0);assert.equal(f.api.active(),true);
});
test('scanner validates safe clusters together: separately valid welds that jointly duplicate Faces reject',()=>{
 const m=new EditableMesh([[0,0,0],[1,0,0],[0,1,0],[0.0001,0,0],[1.0001,0,0],[0.0001,1,0]],[[0,1,2],[3,4,5]]),before=m.clone(),f=fixture(m);
 const info=f.context.__boxlabSelectMergeableVerts.inspect(m,0.001);assert.equal(info.clusters.length,3);
 f.api.openFromHub({tool:'Merge Dist'});assert.equal(f.fields.get('.fr-apply').disabled,true);assert.match(f.fields.get('.fr-result').textContent,/duplicate/);f.click('.fr-apply');assert.deepEqual(m,before);assert.equal(f.history.length,0);
});
test('Apply rescans changed geometry and context; locked/changed mesh cannot weld',()=>{
 const m=seam(),f=fixture(m);f.api.openFromHub({tool:'Merge Dist'});m.vertices[4].x=4;m.vertices[7].x=4;const before=m.clone();f.click('.fr-apply');assert.deepEqual(m,before);assert.equal(f.history.length,0);
 f.context.__boxlabBridgeState.mesh=seam();f.click('.fr-apply');assert.equal(f.api.active(),false);assert.equal(f.history.length,0);
 f.setLocked(true);assert.equal(f.api.available('Merge Dist'),false);
});
test('existing Vertex Apply still selects welded results and keeps intentional loose topology',()=>{
 const m=seam();m.vertices.push(new THREE.Vector3(9,9,9));m.looseVertices=new Set([8]);const f=fixture(m);f.setMode('vertex');f.setIds([1,4,2,7]);
 const result=f.context.__boxlabMergeByDistance.apply();assert.equal(result.ok,true);assert.equal(f.mode(),'vertex');assert.equal(f.ids().length,2);assert.equal(f.history.length,1);assert.equal(m.looseVertices.size,1);assert.deepEqual(m.vertices[[...m.looseVertices][0]].toArray(),[9,9,9]);
});
test('radial click admits disabled Vertex target via contextual scope and delegates panel only',()=>{
 const s=fs.readFileSync(new URL('../src/total-gizmo.js',import.meta.url),'utf8');
 const start=s.indexOf("  button.addEventListener('click',event=>{",s.indexOf('toolSectors.forEach(button=>'));
 const end=s.indexOf('\n  });',start);let callback;
 const calls=[],button={disabled:false,textContent:'Merge Dist',dataset:{toolTarget:'#mergeByDistanceBtn'},closest:()=>({dataset:{ringMode:'face'}})};
 const context={button:{...button,addEventListener:(t,f)=>{callback=f;}},syncContextToolAvailability(){},currentMode:()=> 'face',document:{querySelector:()=>({disabled:true,click(){throw Error('Vertex target clicked');}})},globalThis:null,suspendedFaceTool:false,hubSuppressedKey:'',lastSelectionKey:'key',setHubState(){},root:{},gestureDebug(){},window:{dispatchEvent(){}},CustomEvent:class{},__boxlabFaceRepairViewportSession:{available:()=>true,openFromHub:o=>calls.push(o)}};context.globalThis=context;
 vm.runInNewContext(s.slice(start,end)+'\n  });',context);callback({preventDefault(){},stopPropagation(){}});assert.equal(calls.length,1);assert.equal(calls[0].tool,'Merge Dist');
});
