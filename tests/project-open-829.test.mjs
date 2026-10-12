import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
const method=source.slice(source.indexOf('    replaceBasicProjectScene('),source.indexOf('\n    addMesh(',source.indexOf('    replaceBasicProjectScene('))).trim().replace(/,$/,'');
const copyMesh=source.slice(source.indexOf('function cloneLooseValue('),source.indexOf('\nfunction captureSettings('));
function mesh(value){return {value,clone(){return mesh(this.value);},edges(){}};}
function fixture(failAt){
 const original={id:1,mesh:mesh(1)},live=mesh(1),undo=[mesh(2)],redo=[mesh(3)];
 let throws=0;
 const c={live,original,linkedSources:new Map([[5,'source']]),objects:[original],activeId:1,soloId:1,nextId:10,
 state:()=>({mesh:live}),history:()=>({undoStack:undo,redoStack:redo,clear(){undo.length=redo.length=0;}}),
 captureSettings:()=>({subd:false}),cloneSettings:s=>({...s}),restoreSettings(){if(failAt==='settings'&&!throws++)throw Error('settings failed');},
 forceRender(){if(failAt==='render'&&!throws++)throw Error('render failed');},renderOutliner(){if(failAt==='outliner'&&!throws++)throw Error('outliner failed');}};
 vm.createContext(c);vm.runInContext(copyMesh+'\nconst api={'+method+'};globalThis.replace=api.replaceBasicProjectScene;',c);
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
test('831 Open refuses reference-only or forged unlocked guides and still refuses linked resources',async()=>{
 const ref=project();ref.objects[0].kind='reference';ref.objects[0].locked=true;
 const unlocked=structuredClone(ref);unlocked.objects[0].locked=false;
 const linked=project();linked.objects[0].sourceId=40;
 for(const data of [ref,unlocked,linked]){const f=openFixture(),out={};await f.c.openBasicProject(file(data),out);assert.deepEqual(f.calls,[]);assert.match(out.textContent,/Open refused/);}
});
