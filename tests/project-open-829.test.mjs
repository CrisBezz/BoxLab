import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
const method=source.slice(source.indexOf('    replaceBasicProjectScene('),source.indexOf('\n    addMesh(',source.indexOf('    replaceBasicProjectScene('))).trim().replace(/,$/,'');
const linkSource=source.slice(source.indexOf('function projectLinkedSources('),source.indexOf('function newLinkedSource('));
const copyMesh=source.slice(source.indexOf('function cloneLooseValue('),source.indexOf('\nfunction captureSettings('));
function mesh(value){return {value,clone(){return mesh(this.value);},edges(){}};}
function fixture(failAt){
 const original={id:1,mesh:mesh(1)},live=mesh(1),undo=[mesh(2)],redo=[mesh(3)];
 let throws=0;
 const c={live,original,linkedSources:new Map([[5,'source']]),objects:[original],activeId:1,soloId:1,nextId:10,nextSourceId:1,
 state:()=>({mesh:live}),history:()=>({undoStack:undo,redoStack:redo,clear(){undo.length=redo.length=0;}}),
 captureSettings:()=>({subd:false}),cloneSettings:s=>({...s}),restoreSettings(){if(failAt==='settings'&&!throws++)throw Error('settings failed');},
 forceRender(){if(failAt==='render'&&!throws++)throw Error('render failed');},renderOutliner(){if(failAt==='outliner'&&!throws++)throw Error('outliner failed');}};
 vm.createContext(c);vm.runInContext(copyMesh+linkSource+'\nconst api={'+method+'};globalThis.replace=api.replaceBasicProjectScene;',c);
 return {c,live,undo,redo};
}
const incoming=()=>[{id:40,name:'A',mesh:mesh(40),settings:{subd:true}},{id:41,name:'B',mesh:mesh(41),settings:{}}];
test('829 actual manager replacement stages independent meshes, clears history and advances allocator',()=>{
 const {c,live,undo,redo}=fixture(),input=incoming();assert.equal(c.replace(input,41),true);
 assert.equal(c.activeId,41);assert.equal(live.value,41);assert.equal(c.nextId,42);assert.equal(c.soloId,null);
 assert.equal(c.objects[0].name,'A');assert.notEqual(c.objects[0].mesh,input[0].mesh);input[0].mesh.value=99;assert.equal(c.objects[0].mesh.value,40);
 assert.equal(undo.length,0);assert.equal(redo.length,0);assert.equal(c.linkedSources.size,0);
});
test('829 settings/render/outliner failures restore live mesh, scene, IDs, sources and both histories',()=>{
 for(const stage of ['settings','render','outliner']){
  const {c,live,undo,redo}=fixture(stage);assert.equal(c.replace(incoming(),40),false,stage);
  assert.equal(live.value,1);assert.equal(c.objects[0],c.original);assert.equal(c.activeId,1);assert.equal(c.soloId,1);assert.equal(c.nextId,10);
  assert.equal(c.linkedSources.get(5),'source');assert.equal(undo[0].value,2);assert.equal(redo[0].value,3);
 }
});
test('829 malformed IDs, locked scene and clone failures refuse before mutation',()=>{
 const candidates=[[{...incoming()[0],id:Number.MAX_SAFE_INTEGER}],incoming().map(o=>({...o,id:40})),incoming().map(o=>({...o,locked:true})),[{...incoming()[0],mesh:{clone(){throw Error('bad clone');}}}]];
 for(const input of candidates){const {c,live,undo}=fixture();assert.equal(c.replace(input,40),false);assert.equal(live.value,1);assert.equal(c.nextId,10);assert.equal(undo.length,1);}
});

import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {EditableMesh} from '../src/mesh.js';
const management=fs.readFileSync(new URL('../src/object-management.js',import.meta.url),'utf8');
const openSource=management.slice(management.indexOf('async function openBasicProject('),management.indexOf('\nfunction installProjectAudit('));
function openFixture(confirm=true){
 const calls=[];const c={encodeBoxlabScene,decodeBoxlabScene,EditableMesh,window:{confirm:()=>{calls.push('confirm');return confirm;}},manager:()=>({replaceBasicProjectScene:()=>{calls.push('replace');return true;}}),restoreGroupMetadata:()=>calls.push('groups'),updateUI:()=>calls.push('ui')};
 vm.createContext(c);vm.runInContext(openSource,c);return {c,calls};
}
function project(){return encodeBoxlabScene({activeId:40,selected:[40],groups:{names:[],collapsed:[]},objects:[{id:40,name:'Cube',settings:{mirror:{},subd:false,subdLevel:1,cage:true},mesh:EditableMesh.cube(2)}]});}
const file=data=>({name:'Scene.BOXLAB',size:100,text:async()=>JSON.stringify(data)});
test('829 actual Open Cancel leaves replacement and selection owners untouched; Confirm restores native mesh project',async()=>{
 const data=project(),reconstructed=decodeBoxlabScene(data,(...args)=>new EditableMesh(...args));
 assert.deepEqual(encodeBoxlabScene(reconstructed),data);
 const cancelled=openFixture(false),out={};await cancelled.c.openBasicProject(file(data),out);assert.deepEqual(cancelled.calls,['confirm']);assert.match(out.textContent,/cancelled/);
 const accepted=openFixture();await accepted.c.openBasicProject(file(data),out);assert.deepEqual(accepted.calls,['confirm','replace','groups','ui']);assert.match(out.textContent,/Opened basic/);
});
test('829 actual Open rejects malformed JSON, IDs, extensions and size before confirmation',async()=>{
 const bad=project();bad.objects[0].id=Number.MAX_SAFE_INTEGER;
 for(const input of [file(bad),{...file(project()),name:'Scene.obj'},{...file(project()),size:33*1024*1024},{...file(project()),text:async()=>'{'}]){
  const f=openFixture(),out={};await f.c.openBasicProject(input,out);assert.deepEqual(f.calls,[]);assert.match(out.textContent,/Open refused/);
 }
});

test('831 manager restores reference guides locked and never promotes a reference to editable active mesh',()=>{
 const {c,live}=fixture(),items=incoming();items[1]={...items[1],kind:'reference',locked:false,visible:false,groupId:5};
 assert.equal(c.replace(items,41),true);assert.equal(c.activeId,40);assert.equal(live.value,40);
 assert.equal(c.objects[1].kind,'reference');assert.equal(c.objects[1].locked,true);assert.equal(c.objects[1].visible,false);assert.equal(c.objects[1].groupId,5);
 const f=fixture();assert.equal(f.c.replace([{...items[1],locked:false}],41),false);assert.equal(f.live.value,1);assert.equal(f.undo.length,1);
});
test('831 reference project round trip preserves geometry, groups, lock and visibility; Open accepts mixed scene',async()=>{
 const data=project();data.objects.push({...structuredClone(data.objects[0]),id:41,name:'Guide',kind:'reference',locked:true,visible:false,groupId:5});data.groups={names:[[5,'Guides']],collapsed:[5]};
 const recovered=decodeBoxlabScene(data,(...args)=>new EditableMesh(...args));assert.deepEqual(encodeBoxlabScene(recovered),data);
 const f=openFixture(),out={};await f.c.openBasicProject(file(data),out);assert.deepEqual(f.calls,['confirm','replace','groups','ui']);assert.match(out.textContent,/Opened basic/);
 const cancel=openFixture(false);await cancel.c.openBasicProject(file(data),out);assert.deepEqual(cancel.calls,['confirm']);
});
test('831 Open refuses reference-only/unlocked guides; malformed linked data still refuses',async()=>{
 const ref=project();ref.objects[0].kind='reference';ref.objects[0].locked=true;
 const unlocked=structuredClone(ref);unlocked.objects[0].locked=false;
 const linked=project();linked.objects[0].sourceId=40;
 for(const data of [ref,unlocked,linked]){const f=openFixture(),out={};await f.c.openBasicProject(file(data),out);assert.deepEqual(f.calls,[]);assert.match(out.textContent,/Open refused/);}
});

import {matrixForInstance,localMeshFromWorld,meshesNear,transformEditableMesh} from '../src/instance-core.js';
import * as THREE from 'three';
function linkedItems(){
 const base=EditableMesh.cube(2),a=new THREE.Matrix4().makeTranslation(2,0,0),b=new THREE.Matrix4().makeTranslation(-3,1,0);
 return [{id:40,name:'Source',kind:'editable',sourceId:'source-8',instanceMatrix:a.elements,mesh:transformEditableMesh(base,a),settings:{}},
 {id:41,name:'Copy',kind:'editable',sourceId:'source-8',instanceMatrix:b.elements,mesh:transformEditableMesh(base,b),settings:{}}];
}
function linkedFixture(stage){const f=fixture(stage);Object.assign(f.c,{matrixForInstance,localMeshFromWorld,meshesNear});return f;}
test('832 linked project reconstructs authoritative local source and keeps independent world placements',()=>{
 const f=linkedFixture(),items=linkedItems(),data=encodeBoxlabScene({activeId:41,selected:[40,41],multi:true,objects:items});
 const decoded=decodeBoxlabScene(data,(...args)=>new EditableMesh(...args));assert.equal(f.c.replace(decoded.objects,41),true);
 assert.equal(f.c.linkedSources.size,1);assert.equal(f.c.nextSourceId,9);
 vm.runInContext(source.slice(source.indexOf('function newLinkedSource('),source.indexOf('function ensureLinkedSource(')),f.c);
 assert.equal(f.c.newLinkedSource(EditableMesh.cube(1)),'source-9');assert.equal(f.c.linkedSources.size,2);
 const local=f.c.linkedSources.get('source-8').mesh;
 assert(meshesNear(local,EditableMesh.cube(2)));for(const item of items)assert(meshesNear(transformEditableMesh(local,matrixForInstance(item)),item.mesh));
 // Actual peer-sync owner propagates a component edit through independent matrices.
 const start=source.indexOf('function syncLinkedPeers('),end=source.indexOf('function evaluatedLinkedMesh(',start);
 Object.assign(f.c,{transformEditableMesh});vm.runInContext(source.slice(start,end),f.c);
 local.vertices[0].z+=.3;f.c.syncLinkedPeers('source-8');
 for(const item of f.c.objects)assert(meshesNear(item.mesh,transformEditableMesh(local,matrixForInstance(item))));
 assert.notDeepEqual(f.c.objects[0].mesh.vertices[0].toArray(),f.c.objects[1].mesh.vertices[0].toArray());
});
test('832 invalid placements or disagreeing linked geometry refuse before mutation; rollback restores source allocator',()=>{
 for(const change of [items=>items[1].mesh.vertices[0].z+=.2,items=>items[0].instanceMatrix[0]=0,items=>items[0].instanceMatrix[3]=.2,items=>items[0].sourceId='bad',items=>items[1].mesh.creases.set('0:1',1)]){
 const f=linkedFixture(),items=linkedItems();change(items);assert.equal(f.c.replace(items,40),false);assert.equal(f.c.nextSourceId,1);assert.equal(f.live.value,1);assert.equal(f.undo.length,1);
 }
 const f=linkedFixture('render');assert.equal(f.c.replace(linkedItems(),40),false);assert.equal(f.c.nextSourceId,1);assert.equal(f.c.linkedSources.get(5),'source');
});
test('832 actual Open linked prevalidation runs before confirmation and Cancel leaves scene alone',async()=>{
 const data=encodeBoxlabScene({activeId:40,selected:[40],objects:linkedItems()}),f=openFixture(),out={};
 const api={validateBasicProjectLinks:objects=>{const fixture=linkedFixture();try{fixture.c.projectLinkedSources(objects);return true;}catch{return false;}},replaceBasicProjectScene:()=>{f.calls.push('replace');return true;}};
 f.c.manager=()=>api;await f.c.openBasicProject(file(data),out);assert.deepEqual(f.calls,['confirm','replace','groups','ui']);assert.match(out.textContent,/Opened/);
 const cancelled=openFixture(false);cancelled.c.manager=()=>api;await cancelled.c.openBasicProject(file(data),out);assert.deepEqual(cancelled.calls,['confirm']);
});

test('832 actual Save validates linked scene before requesting download',()=>{
 const scene={activeId:40,selected:[40],objects:linkedItems()},files=[];
 for(const valid of [false,true]){
  const c={captureScene:()=>scene,manager:()=>({objects:scene.objects,saveActive(){},validateBasicProjectLinks:()=>valid}),encodeBoxlabScene,decodeBoxlabScene,EditableMesh,Blob,projectFileName:()=> 'Linked.boxlab',setTimeout(){},
   URL:{createObjectURL:()=> 'blob:test',revokeObjectURL(){}},document:{createElement:()=>({click(){files.push(this.download);},remove(){}}),body:{appendChild(){}}}};
  vm.createContext(c);vm.runInContext(management.slice(management.indexOf('function exportBasicProject('),management.indexOf('async function openBasicProject(')),c);
  const button={},out={};c.exportBasicProject(button,out);assert.equal(button.disabled,false);assert.match(out.textContent,valid?/download requested/:/Save refused/);
 }
 assert.deepEqual(files,['Linked.boxlab']);
});
