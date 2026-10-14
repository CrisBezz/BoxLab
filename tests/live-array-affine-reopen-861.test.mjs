import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {createArrayRecipe,evaluateArray,reopenArray,arrayTransforms} from '../src/live-array-core.js';
import {createArraySourceEditor} from '../src/live-array-source-core.js';
import {transformEditableMesh,deriveInstancePlacement,meshesNear} from '../src/instance-core.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {editableBooleanRuntime} from './helpers/editable-boolean-runtime.mjs';
const placement=()=>new THREE.Matrix4().compose(new THREE.Vector3(3,-2,1),new THREE.Quaternion().setFromEuler(new THREE.Euler(.017,.31,.27)),new THREE.Vector3(1.5,.8,2));
function objectFixture(){
 const arrayRecipe=createArrayRecipe(EditableMesh.cube(1),4,[6,1,-2],{rotation:[20,90,360],scale:[2,.7,1.3]});
 return {id:3,name:'Array',kind:'editable',arrayRecipe,mesh:transformEditableMesh(evaluateArray(arrayRecipe),placement())};
}
function editedRecipe(object,count=5){
 const opened=reopenArray(object);
 return createArrayRecipe(opened.source,count,opened.endpoint.toArray(),{...opened,rotation:[0,180,45],scale:[1.4,2,.8]});
}
test('861 internally inferred affine placement stays canonical through repeated arbitrary-angle count/END edits and project roundtrip',()=>{
 const object=objectFixture(),first=object.mesh.vertices.slice(0,8).map(v=>v.clone());
 object.arrayRecipe=editedRecipe(object);object.mesh=evaluateArray(object.arrayRecipe);
 // This real native frame inverse produced the .860 failure, without Duplicate.
 assert.notEqual(deriveInstancePlacement(evaluateArray(object.arrayRecipe),object.mesh).elements[15],1);
 const before=JSON.stringify(object.arrayRecipe);
 for(let i=0;i<12;i++){
  const opened=reopenArray(object);assert.deepEqual([3,7,11,15].map(j=>opened.placement[j]),[0,0,0,1]);
  const next=createArrayRecipe(opened.source,5+i%3,opened.endpoint.toArray(),opened);
  assert(meshesNear(evaluateArray(createArrayRecipe(opened.source,opened.count,opened.endpoint.toArray(),opened)),object.mesh));
  object.arrayRecipe=next;object.mesh=evaluateArray(next);
  first.forEach((v,j)=>assert(v.distanceTo(object.mesh.vertices[j])<1e-7));
 }
 assert.equal(JSON.parse(before).count,5);
 const encoded=encodeBoxlabScene({activeId:3,objects:[object]}),decoded=decodeBoxlabScene(JSON.parse(JSON.stringify(encoded)),(...a)=>new EditableMesh(...a));
 assert.deepEqual(encodeBoxlabScene(decoded),encoded);assert.equal(reopenArray(decoded.objects[0]).count,object.arrayRecipe.count);
});
test('861 actual Array Apply followed by source Cancel/Apply and UndoRedo keeps arbitrary affine placement and SubD',()=>{
 const r=editableBooleanRuntime(),{c,manager,h}=r;manager.activate(3);const initial=objectFixture(),o=manager.objects.find(o=>o.id===3);
 o.arrayRecipe=initial.arrayRecipe;manager.replaceActiveMesh(initial.mesh);c.restoreSettings({...o.settings,subd:true,subdLevel:2});manager.saveActive();
 const opened=reopenArray(o),code=fs.readFileSync(new URL('../src/linear-array.js',import.meta.url),'utf8');
 Object.assign(c,{createArrayRecipe,evaluateArray,sessionSource:opened.source,previewObjectId:3,endpointLength:()=>opened.endpoint.length(),count:()=>5,liveInput:{checked:true},localEndpoint:()=>opened.endpoint.clone(),transformOptions:()=>({...opened,rotation:[0,180,45],scale:[1.4,2,.8]}),restoreResult(){},setStatus(){}});
 vm.runInContext(code.slice(code.indexOf('function applyArray('),code.indexOf('function installPenRange(')),c);
 assert.equal(c.applyArray(),true);const before=r.snapshot(),controller=createArraySourceEditor({manager:()=>manager,objectHistory:()=>c.__boxlabObjectHistory,history:()=>h});
 assert.equal(controller.open(3).ok,true);c.currentMode=()=> 'face';h.push(r.live);r.live.vertices[0].x+=.2;manager.saveActive();assert.equal(controller.cancel(),true);assert.deepEqual(r.snapshot(),before);
 assert.equal(controller.open(3).ok,true);h.push(r.live);r.live.extrudeFace(0,.1);manager.saveActive();assert.equal(controller.apply().ok,true);
 let edited=manager.objects.find(o=>o.id===3);assert.equal(edited.settings.subd,true);assert.equal(edited.arrayRecipe.count,5);assert(meshesNear(edited.mesh,evaluateArray(edited.arrayRecipe)));assert.equal(reopenArray(edited).count,5);
 manager.replaceActiveMesh(h.undo(r.live));assert.equal(reopenArray(manager.objects.find(o=>o.id===3)).count,5);
 manager.replaceActiveMesh(h.redo(r.live));edited=manager.objects.find(o=>o.id===3);assert.equal(edited.settings.subdLevel,2);assert.equal(controller.open(3).ok,true);assert.equal(controller.cancel(),true);
});
test('861 external near-affine recipes remain strictly rejected and component edits still refuse reopening without mutation',()=>{
 const object=objectFixture(),before=JSON.stringify(object.arrayRecipe),mesh=object.mesh.clone();
 reopenArray(object);assert.equal(JSON.stringify(object.arrayRecipe),before);assert(meshesNear(mesh,object.mesh));
 const encoded=encodeBoxlabScene({activeId:3,objects:[object]});
 for(const [index,value] of [[3,Number.EPSILON],[7,-Number.EPSILON],[11,1e-9],[15,1+Number.EPSILON]]){
  const invalid=new THREE.Matrix4().elements;invalid[index]=value;
  assert.throws(()=>arrayTransforms({placement:invalid}));assert.throws(()=>createArrayRecipe(EditableMesh.cube(1),3,[4,0,0],{placement:invalid}));
  const data=JSON.parse(JSON.stringify(encoded));data.objects[0].arrayRecipe.placement=invalid;
  assert.throws(()=>decodeBoxlabScene(data,(...a)=>new EditableMesh(...a)));
 }
 object.mesh.vertices[0].x+=.1;const modified=object.mesh.clone();assert.throws(()=>reopenArray(object),/geometry changed/);assert(meshesNear(modified,object.mesh));assert.equal(JSON.stringify(object.arrayRecipe),before);
});
