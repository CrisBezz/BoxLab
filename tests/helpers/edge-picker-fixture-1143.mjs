import * as THREE from 'three';
import {grid} from './cage-group-profile.mjs';
export function edgePickerFixture(n=16,{orthographic=false}={}){
 const mesh=grid(n),root=new THREE.Group(),canvas={getBoundingClientRect:()=>({left:40,top:30,width:800,height:800})};
 const camera=orthographic?new THREE.OrthographicCamera(-n*.8,n*.8,n*.8,-n*.8,.01,n*10):new THREE.PerspectiveCamera(45,1,.01,n*10);
 camera.position.set(n*.5,n*1.5,n*.5);camera.up.set(0,0,-1);camera.lookAt(n*.5,0,n*.5);camera.updateMatrixWorld();
 const body=new THREE.Mesh(mesh.triangulatedGeometry(),new THREE.MeshBasicMaterial({side:THREE.DoubleSide}));body.userData.kind='body';root.add(body);
 const material=new THREE.LineBasicMaterial({visible:false}),edges=mesh.edges();for(const [index,e]of edges.entries()){const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints([mesh.vertices[e.a],mesh.vertices[e.b]]),material);line.userData={kind:'edge',index};root.add(line);}root.updateMatrixWorld(true);
 const index=edges.findIndex(e=>e.a===Math.floor(n/2)*(n+1)+Math.floor(n/2)&&e.b===e.a+1),edge=edges[index],point=mesh.vertices[edge.a].clone().lerp(mesh.vertices[edge.b],.5).project(camera),event={clientX:40+(point.x*.5+.5)*800,clientY:30+(-point.y*.5+.5)*800};
 let rays=0;const raycast=body.raycast;body.raycast=function(...args){rays++;return raycast.apply(this,args);};
 return {mesh,root,canvas,camera,event,index,counts:()=>rays,reset:()=>rays=0,dispose(){for(const o of root.children)o.geometry.dispose();body.material.dispose();material.dispose();}};
}
