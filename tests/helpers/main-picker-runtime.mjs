import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';

// Execute actual main picker functions and its bridge assignment, with real Three
// objects/camera/raycasts. Selection/render/UI remain controlled dependencies;
// this is not the entire WebGL app or a native Safari pointer test.
const source=fs.readFileSync(new URL('../../src/main.js',import.meta.url),'utf8');
export function mainPickerRuntime({sourceTransform=s=>s,camera:providedCamera,canvas:providedCanvas,root:providedRoot}={}){
  const main=sourceTransform(source),start=main.indexOf('function setPointer(event)'),end=main.indexOf('function pick(event)',start);
  const assignment=main.split('\n').find(line=>line.startsWith('globalThis.__boxlabSelectionBridge='));
  if(start<0||end<=start||!assignment)throw new Error('main picker extraction contract changed');
  const root=providedRoot??new THREE.Group(),camera=providedCamera??new THREE.OrthographicCamera(-2,2,2,-2,.1,100);
  if(!providedCamera){camera.position.set(0,0,10);camera.lookAt(0,0,0);camera.updateMatrixWorld();}
  const events=[],canvas=providedCanvas??{getBoundingClientRect:()=>({left:100,top:50,width:800,height:400})};
  const context={THREE,root,camera,canvas,pointer:new THREE.Vector2(),raycaster:new THREE.Raycaster(),
    selectionMode:'face',selection:null,selectionHas:()=>false,selectionIndices:()=>[],makeSelection:(type,ids)=>({type,ids}),toggleSelection:()=>{},renderMesh:()=>{}};
  vm.createContext(context);vm.runInContext(main.slice(start,end)+'\n'+assignment,context);
  const bridge=context.__boxlabSelectionBridge;
  const setPointer=context.setPointer;
  context.setPointer=event=>{events.push(event);setPointer(event);};
  const add=(kind,index,z,x=0)=>{const object=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshBasicMaterial({side:THREE.DoubleSide}));object.position.set(x,0,z);object.userData={kind,index};root.add(object);root.updateMatrixWorld(true);return object;};
  const event={clientX:500,clientY:250,pointerId:22,pointerType:'pen'};
  return {bridge,root,camera,event,events,add};
}
