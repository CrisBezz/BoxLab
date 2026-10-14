import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../src/mesh.js';
import {subdivide} from '../src/subdivision.js';
import {createArrayRecipe,evaluateArray,reopenArray} from '../src/live-array-core.js';
import {createArraySourceEditor} from '../src/live-array-source-core.js';
import {meshesNear} from '../src/instance-core.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {editableBooleanRuntime} from './helpers/editable-boolean-runtime.mjs';
const code=fs.readFileSync(new URL('../src/linear-array.js',import.meta.url),'utf8');
function fixture(){
 const r=editableBooleanRuntime(),{c,manager}=r;manager.activate(3);const object=manager.objects.find(o=>o.id===3);object.arrayRecipe=createArrayRecipe(EditableMesh.cube(1),4,[6,1,-2],{rotation:[0,90,20],scale:[2,1,.7]});manager.replaceActiveMesh(evaluateArray(object.arrayRecipe));c.restoreSettings({...object.settings,subd:true,subdLevel:2});manager.saveActive();
 const opened=reopenArray(object);Object.assign(c,{createArrayRecipe,evaluateArray,sessionSource:opened.source,previewObjectId:3,endpointLength:()=>opened.endpoint.length(),count:()=>5,liveInput:{checked:true},localEndpoint:()=>opened.endpoint.clone(),transformOptions:()=>opened,restoreResult(){},setStatus(){}});vm.runInContext(code.slice(code.indexOf('function applyArray('),code.indexOf('function installPenRange(')),c);
 const sourceEditor=createArraySourceEditor({manager:()=>manager,objectHistory:()=>c.__boxlabObjectHistory,history:()=>r.h});return {...r,object,opened,sourceEditor};
}
test('857 existing Live Array applies count/END edits with SubD retained through native history and .boxlab roundtrip',()=>{
 const r=fixture(),{c,manager,h}=r,before=r.object.mesh.clone(),size=manager.objects.length,n=h.undoStack.length;assert.equal(r.object.settings.subd,true);assert.equal(c.applyArray(),true);let o=manager.objects.find(o=>o.id===3);assert.equal(o.settings.subd,true);assert.equal(o.settings.subdLevel,2);assert.equal(o.arrayRecipe.count,5);assert.equal(manager.objects.length,size);assert.equal(h.undoStack.length,n+1);assert(meshesNear(o.mesh,evaluateArray(o.arrayRecipe)));
 const native=subdivide(o.mesh,2),expected=subdivide(evaluateArray(o.arrayRecipe),2);assert(meshesNear(native,expected));
 manager.replaceActiveMesh(h.undo(r.live));o=manager.objects.find(o=>o.id===3);assert.equal(o.settings.subd,true);assert.equal(o.settings.subdLevel,2);assert.equal(o.arrayRecipe.count,4);assert(meshesNear(o.mesh,before));manager.replaceActiveMesh(h.redo(r.live));o=manager.objects.find(o=>o.id===3);assert.equal(o.arrayRecipe.count,5);assert.equal(o.settings.subd,true);
 const data=encodeBoxlabScene(c.__boxlabObjectHistory.capture()),loaded=decodeBoxlabScene(JSON.parse(JSON.stringify(data)),(...args)=>new EditableMesh(...args)),restored=loaded.objects.find(o=>o.id===3);assert.equal(restored.settings.subd,true);assert.equal(restored.settings.subdLevel,2);assert.equal(reopenArray(restored).count,5);
});
test('857 SubD Live Array source edits Apply/Cancel with modifier/recipe/geometry and native history preserved',()=>{
 const r=fixture(),{sourceEditor,manager,c,h}=r,before=r.snapshot();assert.equal(sourceEditor.open(3).ok,true);assert.equal(manager.objects.find(o=>o.id===3).settings.subd,true);c.currentMode=()=> 'face';h.push(r.live);r.live.vertices[0].x+=.2;manager.saveActive();assert.equal(sourceEditor.cancel(),true);assert.deepEqual(r.snapshot(),before);
 assert.equal(sourceEditor.open(3).ok,true);h.push(r.live);r.live.extrudeFace(0,.1);manager.saveActive();const n=sourceEditor.state().undo.length;assert.equal(sourceEditor.apply().ok,true);let o=manager.objects.find(o=>o.id===3);assert.equal(o.settings.subd,true);assert.equal(o.settings.subdLevel,2);assert(meshesNear(o.mesh,evaluateArray(o.arrayRecipe)));assert.equal(h.undoStack.length,n+1);manager.replaceActiveMesh(h.undo(r.live));o=manager.objects.find(o=>o.id===3);assert.equal(o.settings.subd,true);assert.equal(o.arrayRecipe.count,4);manager.replaceActiveMesh(h.redo(r.live));assert.equal(manager.objects.find(o=>o.id===3).settings.subd,true);
});
test('857 conversion of existing SubD Live Array keeps modifier; new SubD creation and Mirror remain guarded',()=>{
 const r=fixture();assert.equal(r.c.applyArray({convert:true}),true);let o=r.manager.objects.find(o=>o.id===3);assert.equal(o.arrayRecipe,undefined);assert.equal(o.settings.subd,true);assert.equal(r.c.applyArray(),false);
 const mirror=fixture();mirror.c.restoreSettings({...mirror.object.settings,mirror:{x:true}});mirror.manager.saveActive();assert.equal(mirror.c.applyArray(),false);assert.equal(mirror.sourceEditor.open(3).ok,false);
});
