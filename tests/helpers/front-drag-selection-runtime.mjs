import * as THREE from 'three';import {EditableMesh} from '../../src/mesh.js';import {createSelectionInputOptions} from '../../src/selection-input-controls.js';import {pencilSelectionRuntime} from './pencil-selection-runtime.mjs';import {mainPickerRuntime} from './main-picker-runtime.mjs';
// Actual paint/Lasso/orbit and main picker owners with real Three raycasts.
// Face-selection bridge storage, UI and renderer are controlled doubles.
export function frontDragRuntime(){
 const vertices=[],faces=[];for(const z of [0,-1])for(let cell=0;cell<3;cell++){const x=cell-1.5,first=vertices.length;vertices.push([x,-.5,z],[x+1,-.5,z],[x+1,.5,z],[x,.5,z]);faces.push(z===0?[first,first+1,first+2,first+3]:[first+3,first+2,first+1,first]);}
 const mesh=new EditableMesh(vertices,faces),f=pencilSelectionRuntime(mesh);f.setMode('face');f.setIds([0]);
 const input=createSelectionInputOptions(f.context);f.context.__boxlabSelectionInput=input;
 const root=new THREE.Group(),all=[];f.state.faceObjects=new Map();faces.forEach((face,index)=>{const positions=[];for(let i=1;i<face.length-1;i++)for(const id of [face[0],face[i],face[i+1]])positions.push(...mesh.vertices[id].toArray());all.push(...positions);const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));const picker=new THREE.Mesh(g,new THREE.MeshBasicMaterial({side:THREE.DoubleSide}));picker.userData={kind:'face',index};root.add(picker);f.state.faceObjects.set(index,picker);});root.updateMatrixWorld(true);
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(all,3));const body=new THREE.Mesh(g,new THREE.MeshBasicMaterial({side:THREE.DoubleSide}));body.userData.kind='body';f.state.scene.add(body);f.state.scene.updateMatrixWorld(true);
 const picker=mainPickerRuntime({root,camera:f.state.camera,canvas:f.canvas});picker.context.__boxlabSelectionInput=input;f.context.__boxlabSelectionBridge.pick=picker.bridge.pick;f.context.__boxlabSelectionBridge.pickHits=picker.bridge.pickHits;
 const point=cell=>f.screen(new THREE.Vector3(cell-1,0,0)),pen=(type,cell,extra={})=>{const p=point(cell);return f.pointer(type,{clientX:p.x,clientY:p.y,...extra});};
 return {...f,input,picker,point,pen};
}
