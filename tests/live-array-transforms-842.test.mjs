import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
import {EditableMesh} from '../src/mesh.js';
import {createArrayRecipe,evaluateArray,reopenArray,arrayItemMatrix} from '../src/live-array-core.js';
import {transformEditableMesh,meshesNear} from '../src/instance-core.js';
import {encodeBoxlabScene,decodeBoxlabScene} from '../src/boxlab-project-codec.js';
import {editableBooleanRuntime} from './helpers/editable-boolean-runtime.mjs';
const near=(a,b)=>assert(a.distanceTo(b)<1e-7,`${a.toArray()} vs ${b.toArray()}`);
const ui=fs.readFileSync(new URL('../src/linear-array.js',import.meta.url),'utf8');
test('842 progressive rotation and XYZ scale keep each centre on the path, original unchanged and full turns explicit',()=>{
 const source=EditableMesh.cube(1);source.vertices.forEach(v=>{v.multiply(new THREE.Vector3(1,2,3));v.add(new THREE.Vector3(7,4,-3));});
 const before=source.vertices.map(v=>v.toArray()),centre=new THREE.Vector3(7,4,-3);
 const options={rotation:[0,0,360],scale:[3,2,.5]},recipe=createArrayRecipe(source,5,[8,2,-4],options),result=evaluateArray(recipe);
 for(let i=0;i<5;i++){
  const t=i/4,c=centre.clone().add(new THREE.Vector3(8,2,-4).multiplyScalar(t));
  const rotation=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),Math.PI*2*t);
  const scale=new THREE.Vector3(1+2*t,1+t,1-.5*t);
  for(let v=0;v<8;v++)near(result.vertices[i*8+v],source.vertices[v].clone().sub(centre).multiply(scale).applyQuaternion(rotation).add(c));
  const actualCentre=result.vertices.slice(i*8,(i+1)*8).reduce((c,v)=>c.add(v),new THREE.Vector3()).multiplyScalar(1/8);near(actualCentre,c);
 }
 assert.deepEqual(source.vertices.map(v=>v.toArray()),before);assert.equal(recipe.rotation[2],360);
});
test('842 mixed endpoint transforms reopen after arbitrary whole-object affine placement and survive codec/count edits',()=>{
 const recipe=createArrayRecipe(EditableMesh.cube(1),4,[6,1,-2],{rotation:[30,45,120],scale:[2,.4,3]});
 const delta=new THREE.Matrix4().set(1.5,.2,0,3,0,.8,.1,-2,.2,0,2,1,0,0,0,1);
 const object={id:1,name:'Array',kind:'editable',mesh:transformEditableMesh(evaluateArray(recipe),delta),arrayRecipe:recipe};
 const opened=reopenArray(object),updated=createArrayRecipe(opened.source,opened.count,opened.endpoint.toArray(),opened);
 assert(meshesNear(evaluateArray(updated),object.mesh));
 const encoded=encodeBoxlabScene({activeId:1,objects:[{...object,arrayRecipe:updated}]}),decoded=decodeBoxlabScene(encoded,(...args)=>new EditableMesh(...args));
 assert.deepEqual(encodeBoxlabScene(decoded),encoded);assert(meshesNear(evaluateArray(decoded.objects[0].arrayRecipe),object.mesh));
 const countEdit=createArrayRecipe(opened.source,7,opened.endpoint.toArray(),opened),result=evaluateArray(countEdit);
 for(let v=0;v<8;v++){near(result.vertices[v],object.mesh.vertices[v]);near(result.vertices[48+v],object.mesh.vertices[24+v]);}
});
test('842 malformed endpoint transforms refuse without changing the source; legacy .841 defaults remain exact',()=>{
 const source=EditableMesh.cube(1),old=createArrayRecipe(source,3,[4,0,0]);
 assert.equal(old.rotation,undefined);assert.equal(old.placement,undefined);
 assert(meshesNear(evaluateArray(old),evaluateArray(createArrayRecipe(source,3,[4,0,0],{rotation:[0,0,0],scale:[1,1,1]}))));
 for(const options of [{rotation:[NaN,0,0]},{rotation:[3601,0,0]},{scale:[0,1,1]},{scale:[-1,1,1]},{scale:[1,21,1]},{placement:new THREE.Matrix4().makeScale(0,1,1).elements},{placement:Array(16).fill(1)}])assert.throws(()=>createArrayRecipe(source,3,[4,0,0],options));
});
function pointerFixture(transform='rotate',axis='z'){
 const source=EditableMesh.cube(1),scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(50,1000/700,.01,1000);camera.position.set(2,0,12);camera.lookAt(2,0,0);camera.updateMatrixWorld(true);
 const control={enabled:true},canvas={getBoundingClientRect:()=>({left:0,top:0,width:1000,height:700}),setPointerCapture(){},hasPointerCapture:()=>true,releasePointerCapture(){}};
 const c={THREE,preview:null,previewArmed:true,previewObjectId:1,endpointDrag:null,sessionSource:null,hiddenResult:null,sessionPlacement:new THREE.Matrix4(),endpoint:new THREE.Vector3(4,0,0),endRotation:[0,0,0],endScale:[1,1,1],endTransform:transform,moveMode:axis,liveInput:{checked:true},canvas,
 raycaster:new THREE.Raycaster(),pointer:new THREE.Vector2(),arrayItemMatrix,sourceMesh:()=>source,activeObject:()=>({id:1,mesh:source}),state:()=>({scene,camera}),camera:()=>camera,orbitControls:()=>control,count:()=>4,localEndpoint:()=>c.endpoint.clone(),transformOptions:()=>({rotation:c.endRotation,scale:c.endScale,placement:c.sessionPlacement.elements}),endpointCentre:()=>c.endpoint.clone(),axisVector:axis=>new THREE.Vector3(...({x:[1,0,0],y:[0,1,0],z:[0,0,1]}[axis])),syncEndTools(){},setStatus(){},endpointText:()=>'',cancelPreview(){throw Error('unexpected cancel');}};
 c.endAxis=c.axisVector;vm.createContext(c);
 vm.runInContext(ui.slice(ui.indexOf('function disposePreview(){'),ui.indexOf('function toolSession(){'))+ui.slice(ui.indexOf('function endEndpointDrag(){'),ui.indexOf('function restoreResult(){'))+ui.slice(ui.indexOf('function buildPreview(){'),ui.indexOf('function sync(){')),c);
 c.buildPreview();scene.updateMatrixWorld(true);
 const event=(point,id=10)=>{const p=point.clone().project(camera);return{target:canvas,pointerId:id,pointerType:'pen',isPrimary:true,button:0,clientX:(p.x+1)*500,clientY:(1-p.y)*350,preventDefault(){},stopPropagation(){},stopImmediatePropagation(){}};};
 return{c,scene,camera,source,control,event};
}
test('842 actual END ring gesture rotates gradually with preview/apply parity and releases navigation',()=>{
 const f=pointerFixture(),{c,source,control,event}=f,before=source.vertices.map(v=>v.toArray());
 const ring=c.preview.children.find(o=>o.geometry?.type==='TorusGeometry'),radius=ring.geometry.parameters.radius;
 assert.equal(c.beginEndpointDrag(event(new THREE.Vector3(4+radius,0,0))),true);assert.equal(control.enabled,false);
 c.moveEndpointDrag(event(new THREE.Vector3(4,radius,0)));
 assert(Math.abs(c.endRotation[2]-90)<1e-6);
 const recipe=createArrayRecipe(source,4,[4,0,0],c.transformOptions()),result=evaluateArray(recipe);
 const fill=c.preview.children.find(o=>o.userData.arrayIndex===2&&!o.material.wireframe);
 near(source.vertices[0].clone().applyMatrix4(fill.matrix),result.vertices[16]);
 assert.equal(c.finishEndpointDrag(event(new THREE.Vector3(4,radius,0))),true);assert.equal(control.enabled,true);assert.equal(c.endpointDrag,null);assert.deepEqual(source.vertices.map(v=>v.toArray()),before);
});
test('842 actual END scale gesture changes uniform/axis factors while leaving endpoint/source untouched',()=>{
 const f=pointerFixture('scale','free'),{c,event,source}=f,before=source.vertices.map(v=>v.toArray());
 const start=event(new THREE.Vector3(4,0,0));assert.equal(c.beginEndpointDrag(start),true);
 c.moveEndpointDrag({...start,clientX:start.clientX+Math.log(2)*100});
 c.endScale.forEach(v=>assert(Math.abs(v-2)<1e-8));near(c.endpoint,new THREE.Vector3(4,0,0));
 c.finishEndpointDrag(start);assert.deepEqual(source.vertices.map(v=>v.toArray()),before);
 const axis=pointerFixture('scale','x'),handle=axis.c.preview.children.find(o=>o.geometry?.type==='BoxGeometry');
 const down=axis.event(handle.position);assert.equal(axis.c.beginEndpointDrag(down),true);
 axis.c.moveEndpointDrag({...down,clientX:down.clientX+70});assert(axis.c.endScale[0]>1);assert.equal(axis.c.endScale[1],1);assert.equal(axis.c.endScale[2],1);
});
test('842 actual Live Apply records endpoint transforms in one scene history step; Undo/Redo restores them',()=>{
 const r=editableBooleanRuntime(),{c,manager,h}=r;manager.activate(3);
 Object.assign(c,{createArrayRecipe,evaluateArray,sessionSource:null,previewObjectId:3,endpoint:new THREE.Vector3(4,0,2),endpointLength:()=>Math.hypot(4,2),count:()=>4,liveInput:{checked:true},localEndpoint:()=>new THREE.Vector3(4,0,2),transformOptions:()=>({rotation:[0,90,0],scale:[3,3,3]}),restoreResult(){},setStatus(){}});
 vm.runInContext(ui.slice(ui.indexOf('function applyArray('),ui.indexOf('function installPenRange(')),c);
 const n=h.undoStack.length;assert.equal(c.applyArray(),true);assert.equal(h.undoStack.length,n+1);
 const applied=manager.objects.find(o=>o.id===3),result=applied.mesh.clone();assert.deepEqual(Array.from(applied.arrayRecipe.rotation),[0,90,0]);
 manager.replaceActiveMesh(h.undo(r.live));assert.equal(manager.objects.find(o=>o.id===3).arrayRecipe,undefined);
 manager.replaceActiveMesh(h.redo(r.live));assert(meshesNear(manager.objects.find(o=>o.id===3).mesh,result));assert.deepEqual(Array.from(manager.objects.find(o=>o.id===3).arrayRecipe.scale),[3,3,3]);
});
