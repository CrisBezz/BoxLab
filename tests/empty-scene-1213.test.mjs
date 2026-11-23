import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
import {EditableMesh} from '../src/mesh.js';import {booleanSceneRuntime} from './helpers/boolean-scene-runtime.mjs';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
function runtime(){
 const f=booleanSceneRuntime(),c=f.c,source=fs.readFileSync(new URL('../src/multi-object.js',import.meta.url),'utf8');
 c.objects=f.manager.objects;c.activeId=f.manager.activeId;c.soloId=null;c.EditableMesh=EditableMesh;c.status={};
 c.state=()=>c.__boxlabBridgeState;c.restoreSettings=()=>{};c.clearComponentSelection=()=>{};c.renderOutliner=()=>{};
 c.replaceMeshInPlace=(target,source)=>{const copy=source.clone();for(const key of Object.keys(target))delete target[key];Object.assign(target,copy);};
 c.saveActive=()=>{const o=c.objects.find(o=>o.id===c.activeId);if(o)o.mesh=c.state().mesh.clone();};
 vm.runInContext(source.slice(source.indexOf('function restoreSceneObjects('),source.indexOf('function resetAll()')),c);
 Object.defineProperty(f.manager,'activeId',{get:()=>c.activeId,set:id=>{c.activeId=id;},configurable:true});
 f.manager.restoreSceneSnapshot=(objects,id)=>c.restoreSceneObjects(objects,id);
 // The production bridge wrapper in this fixture logs checkpoints; preserve its
 // optional mesh argument so inactive/empty carrier tokens are tested exactly.
 f.manager.objects.forEach(o=>{delete o.sourceId;delete o.instanceMatrix;});
 return{...f,c,remove:ids=>c.deleteObjects(ids),undo(){const r=f.history.undo(c.state().mesh);if(r)c.__boxlabBridgeState.mesh=r;return r;},redo(){const r=f.history.redo(c.state().mesh);if(r)c.__boxlabBridgeState.mesh=r;return r;}};
}
test('delete all objects is one reversible scene transaction including references and no active carrier',()=>{
 const f=runtime(),before=f.snapshot();assert.equal(f.remove(f.manager.objects.map(o=>o.id)),true);assert.equal(f.manager.objects.length,0);assert.equal(f.manager.activeId,null);assert.equal(f.c.state().mesh.vertices.length,0);assert.equal(f.history.undoStack.length,1);
 f.undo();assert.deepEqual(f.snapshot(),before);f.redo();assert.equal(f.manager.objects.length,0);assert.equal(f.manager.activeId,null);
});
test('deleting the last editable object leaves a locked reference-only scene without activating it',()=>{
 const f=runtime(),reference=f.manager.objects.find(o=>o.kind==='reference'),before=JSON.stringify(reference.mesh);f.remove(f.manager.objects.filter(o=>o.kind!=='reference').map(o=>o.id));
 assert.equal(f.manager.objects.length,1);assert.equal(f.manager.activeId,null);assert.equal(f.manager.objects[0].locked,true);assert.equal(JSON.stringify(f.manager.objects[0].mesh),before);assert.equal(f.c.state().mesh.faces.length,0);
 f.remove([reference.id]);assert.equal(f.manager.objects.length,0);f.undo();assert.equal(f.manager.objects.length,1);assert.equal(f.manager.activeId,null);
});
test('empty and reference-only project codecs round-trip; invalid empty active IDs or selections refuse',()=>{
 for(const objects of [[],[{id:7,name:'Ref',kind:'reference',locked:true,visible:true,mesh:EditableMesh.cube()}]]){
 const payload=encodeBoxlabScene({objects,activeId:null,selected:[],multi:false,groups:null});const decoded=decodeBoxlabScene(payload,(...args)=>new EditableMesh(...args));assert.deepEqual(encodeBoxlabScene(decoded),payload);
 }
 assert.throws(()=>encodeBoxlabScene({objects:[],activeId:1,selected:[]}));assert.throws(()=>decodeBoxlabScene({format:'boxlab',version:1,objects:[],activeId:null,selected:[1]},(...args)=>new EditableMesh(...args)));
});

test('first-object checkpoints from a null-active scene retain an empty carrier token',()=>{const f=runtime();f.remove(f.manager.objects.map(o=>o.id));const before=f.c.__boxlabObjectHistory.capture();f.c.__boxlabBridgeState.mesh=EditableMesh.cube();f.c.__boxlabObjectHistory.checkpointSnapshot(before);assert.equal(f.history.undoStack.at(-1).vertices.length,0);});
